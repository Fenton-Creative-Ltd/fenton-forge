const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

// Import routes and worker
const verificationRoutes = require('./routes/verification');
const migrationRoutes = require('./routes/migration');
const scrapeWorker = require('./workers/scrape-worker');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"]
      }
    }
  }));
app.use(cors({
    origin: ['https://fenton-forge.com', 'http://localhost:3000', 'http://localhost:5500'],
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));

// Ensure directories exist
fs.ensureDirSync('./data/accounts');
fs.ensureDirSync('./data/migrations');
fs.ensureDirSync('./data/queue');
fs.ensureDirSync('./sites');

// Venice API integration
app.use('/api/stripe', require('./stripe'));

// Save Venice API key for user
app.post('/api/user/venice-key', express.json(), async (req, res) => {
  const { apiKey, userId } = req.body;
  // Add your database logic here
  console.log('Saving Venice API key for user:', userId);
  res.json({ success: true });
});

// Generate content with Venice
app.post('/api/ai/generate', express.json(), async (req, res) => {
  const { prompt, userId } = req.body;
  
  // Check if user has Venice API key or active subscription
  // Then call Venice API
  res.json({ 
    content: `Generated content for: ${prompt}`,
    status: 'success'
  });
});

// Showcase submission
app.post('/api/showcase/submit', express.json(), async (req, res) => {
  const { siteName, siteUrl, email, category, description } = req.body;
  console.log('Showcase submission:', { siteName, siteUrl, email, category });
  // Save to database for review
  res.json({ success: true, message: 'Submission received for review' });
});

// ========== ROUTES ==========

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        worker: scrapeWorker.processing ? 'busy' : 'idle'
    });
});

// Verification routes
app.use('/api/verification', verificationRoutes);

// Migration routes (with worker)
app.use('/api/migration', migrationRoutes);

// Scraper status
app.get('/api/scraper/status', (req, res) => {
    res.json({
        queueLength: scrapeWorker.queue.length,
        processing: scrapeWorker.processing,
        lastUpdate: new Date().toISOString()
    });
});

// Get migration status with progress
app.get('/api/migration/status/:id', (req, res) => {
    const status = scrapeWorker.getStatus(req.params.id);
    if (!status || status.status === 'unknown') {
        // Try to get from file
        try {
            const migration = fs.readJsonSync(`./data/migrations/${req.params.id}.json`);
            res.json({ ...migration, source: 'file' });
        } catch {
            res.status(404).json({ error: 'Not found' });
        }
    } else {
        res.json(status);
    }
});

// Download scraped site
app.get('/api/download/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const zipPath = `./temp/${jobId}-export.zip`;
    
    if (!await fs.pathExists(zipPath)) {
        return res.status(404).json({ error: 'Export not ready' });
    }
    
    res.download(zipPath, `fenton-forge-import-${jobId}.zip`);
});

// ========== ERROR HANDLING ==========

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ========== START SERVER ==========

app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════╗
    ║     FENTON FORGE™                        ║
    ║     Edge-Native Website Builder          ║
    ║                                          ║
    ║     Server running on port ${PORT}          ║
    ║     http://localhost:${PORT}                ║
    ╚══════════════════════════════════════════╝
    `);
    
    // Load any existing queue
    scrapeWorker.loadQueue().then(() => {
        if (scrapeWorker.queue.length > 0) {
            console.log(`📋 Loaded ${scrapeWorker.queue.length} jobs from queue`);
            scrapeWorker.processQueue();
        }
    });
});

module.exports = app;

// ========== SCRAPER API ENDPOINTS ==========

const autoScraper = require('./scraper/auto-scraper');

// Start scraping (queues for processing)
app.post('/api/scrape/start', async (req, res) => {
    const { url, options = {} } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL required' });
    }

    const jobId = uuidv4();
    
    try {
        // Add to worker queue
        scrapeWorker.addToQueue(jobId, url, options);
        
        res.json({
            success: true,
            jobId,
            status: 'queued',
            message: 'Scraping job queued. You will receive an email when complete.',
            checkStatus: `/api/scrape/status/${jobId}`
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get scrape status
app.get('/api/scrape/status/:jobId', (req, res) => {
    const status = scrapeWorker.getStatus(req.params.jobId);
    res.json(status);
});

// Get worker queue status
app.get('/api/scrape/queue', (req, res) => {
    res.json(scrapeWorker.getQueueStatus());
});

// Preview scraped site
app.get('/api/preview/:jobId', async (req, res) => {
    const previewPath = `./data/scrapes/${req.params.jobId}/preview.html`;
    
    if (!await fs.pathExists(previewPath)) {
        return res.status(404).send('Preview not ready');
    }
    
    res.sendFile(path.resolve(previewPath));
});

// Download scraped package
app.get('/api/download/:jobId', async (req, res) => {
    const zipPath = `./data/scrapes/${req.params.jobId}/fenton-forge-migration.zip`;
    
    if (!await fs.pathExists(zipPath)) {
        return res.status(404).json({ error: 'Package not ready' });
    }
    
    res.download(zipPath, `fenton-forge-migration-${req.params.jobId}.zip`);
});

// Direct scrape (for testing, not queued)
app.post('/api/scrape/direct', async (req, res) => {
    const { url } = req.body;
    const jobId = uuidv4();
    
    try {
        const result = await autoScraper.scrapeWebsite(jobId, url, {
            maxPages: 5,
            onProgress: (p) => console.log(`Progress: ${p}%`)
        });
        
        res.json({
            success: true,
            result: result.result
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

