const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');

const migrations = new Map();

// Submit migration request
router.post('/request', async (req, res) => {
    try {
        const { currentUrl, name, email, platform, timeline, notes } = req.body;
        
        const migrationId = uuidv4();
        
        const migration = {
            id: migrationId,
            status: 'queued',
            url: currentUrl,
            platform,
            requester: { name, email },
            timeline,
            notes,
            createdAt: new Date().toISOString()
        };
        
        migrations.set(migrationId, migration);
        
        // Ensure data directory exists
        await fs.ensureDir('./data/migrations');
        await fs.writeJson(`./data/migrations/${migrationId}.json`, migration);
        
        // Start scraping in background
        setTimeout(() => analyseSite(migrationId), 1000);
        
        res.json({
            success: true,
            migrationId,
            message: 'Migration analysis queued. You will receive an email report within 24 hours.'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Analyse site (background job)
async function analyseSite(migrationId) {
    const migration = migrations.get(migrationId);
    if (!migration) return;
    
    migration.status = 'analysing';
    console.log(`[${migrationId}] Analysing ${migration.url}...`);
    
    // TODO: Run actual scraper here
    // For now, simulate analysis
    setTimeout(() => {
        migration.status = 'complete';
        migration.report = {
            pagesFound: 12,
            imagesFound: 45,
            estimatedSize: '2.4MB → 240KB (90% reduction)',
            complexity: 'medium',
            estimatedTime: '48 hours',
            price: migration.timeline === 'asap' ? 99 : 49
        };
        
        console.log(`[${migrationId}] Analysis complete`);
    }, 5000);
}

// Get migration status
router.get('/status/:id', (req, res) => {
    const migration = migrations.get(req.params.id);
    if (!migration) return res.status(404).json({ error: 'Not found' });
    
    res.json({
        id: migration.id,
        status: migration.status,
        report: migration.report
    });
});

module.exports = router;