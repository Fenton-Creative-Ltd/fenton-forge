const autoScraper = require('../scraper/auto-scraper');
const fs = require('fs-extra');
const { sendEmail } = require('../utils/email');

class ScrapeWorker {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.currentJob = null;
    }

    async addToQueue(migrationId, url, options = {}) {
        const job = {
            id: migrationId,
            url,
            options,
            status: 'queued',
            progress: 0,
            createdAt: new Date().toISOString()
        };

        this.queue.push(job);
        await this.saveQueue();

        console.log(`[Worker] Job ${migrationId} added to queue. Queue length: ${this.queue.length}`);

        // Start processing if not already running
        if (!this.processing) {
            this.processQueue();
        }

        return job;
    }

    async processQueue() {
        if (this.processing || this.queue.length === 0) {
            return;
        }

        this.processing = true;
        this.currentJob = this.queue.shift();

        try {
            console.log(`[Worker] Starting job ${this.currentJob.id}: ${this.currentJob.url}`);
            this.currentJob.status = 'processing';
            this.currentJob.startedAt = new Date().toISOString();
            await this.saveQueue();

            // Run the scraper
            const result = await autoScraper.scrapeWebsite(
                this.currentJob.id,
                this.currentJob.url,
                {
                    ...this.currentJob.options,
                    onProgress: (progress) => {
                        this.currentJob.progress = progress;
                        this.updateJob(this.currentJob);
                    }
                }
            );

            // Update with results
            this.currentJob.status = 'complete';
            this.currentJob.progress = 100;
            this.currentJob.result = result.result;
            this.currentJob.completedAt = new Date().toISOString();

            // Send completion email
            await this.sendCompletionEmail(this.currentJob);

            console.log(`[Worker] Job ${this.currentJob.id} complete`);

        } catch (error) {
            console.error(`[Worker] Job ${this.currentJob.id} failed:`, error);
            this.currentJob.status = 'failed';
            this.currentJob.error = error.message;
        }

        await this.updateJob(this.currentJob);
        this.processing = false;
        this.currentJob = null;

        // Process next job
        setImmediate(() => this.processQueue());
    }

    async updateJob(job) {
        // Update in-memory queue
        const index = this.queue.findIndex(j => j.id === job.id);
        if (index > -1) {
            this.queue[index] = job;
        }

        // Save to disk
        await this.saveQueue();

        // Save to migration file
        const migrationPath = `./data/migrations/${job.id}.json`;
        if (await fs.pathExists(migrationPath)) {
            const migration = await fs.readJson(migrationPath);
            migration.scrapeStatus = job.status;
            migration.scrapeProgress = job.progress;
            migration.scrapeResult = job.result;
            await fs.writeJson(migrationPath, migration);
        }
    }

    async saveQueue() {
        await fs.ensureDir('./data/queue');
        await fs.writeJson('./data/queue/scrape-worker.json', {
            queue: this.queue,
            currentJob: this.currentJob,
            updatedAt: new Date().toISOString()
        });
    }

    async loadQueue() {
        try {
            const data = await fs.readJson('./data/queue/scrape-worker.json');
            this.queue = data.queue || [];
            if (data.currentJob && data.currentJob.status === 'processing') {
                // Resume interrupted job
                data.currentJob.status = 'queued';
                this.queue.unshift(data.currentJob);
            }
            console.log(`[Worker] Loaded ${this.queue.length} jobs from queue`);
        } catch {
            this.queue = [];
        }
    }

    async sendCompletionEmail(job) {
        try {
            const migration = await fs.readJson(`./data/migrations/${job.id}.json`);
            
            const subject = `Your Fenton Forge Migration is Complete`;
            const body = `
Hello ${migration.requester.name},

Great news! We've successfully analysed and migrated ${job.url}.

📊 RESULTS:
• Pages scraped: ${job.result.pagesScraped}
• Assets optimised: ${job.result.assetsDownloaded}
• Data reduction: ${job.result.metrics.savings}
• New load time: ${job.result.metrics.newLoadTime}

🔗 PREVIEW YOUR SITE:
https://fenton-forge.com/api/preview/${job.id}

📦 DOWNLOAD PACKAGE:
https://fenton-forge.com/api/download/${job.id}

Ready to go live? Reply to this email or call us on 01234 567890.

Best regards,
Fenton Forge Migration Team
            `;

            await sendEmail(migration.requester.email, subject, body);
            console.log(`[Worker] Completion email sent for ${job.id}`);

        } catch (error) {
            console.error(`[Worker] Failed to send email:`, error);
        }
    }

    getStatus(jobId) {
        // Check current job
        if (this.currentJob && this.currentJob.id === jobId) {
            return this.currentJob;
        }
        
        // Check queue
        const queued = this.queue.find(j => j.id === jobId);
        if (queued) return queued;
        
        return { status: 'unknown' };
    }

    getQueueStatus() {
        return {
            processing: this.processing,
            queueLength: this.queue.length,
            currentJob: this.currentJob ? {
                id: this.currentJob.id,
                url: this.currentJob.url,
                progress: this.currentJob.progress
            } : null
        };
    }
}

// Singleton
const worker = new ScrapeWorker();

// Load queue on startup
worker.loadQueue().then(() => {
    console.log('📋 Scrape worker ready');
});

module.exports = worker;