const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

// In-memory store (use Redis in production)
const verifications = new Map();

// Submit verification request
router.post('/submit', async (req, res) => {
    try {
        const { orgName, orgType, registrationNumber, website, contactEmail, contactName, annualTurnover, missionStatement } = req.body;
        
        // Validation
        if (!orgName || !orgType || !contactEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const verificationId = uuidv4();
        const verificationCode = crypto.randomInt(100000, 999999).toString();
        
        const verification = {
            id: verificationId,
            code: verificationCode,
            status: 'pending',
            submittedAt: new Date().toISOString(),
            orgData: { orgName, orgType, registrationNumber, website, contactEmail, contactName, annualTurnover, missionStatement }
        };
        
        verifications.set(verificationId, verification);
        
        // Send email (simulate)
        console.log(`Verification code for ${contactEmail}: ${verificationCode}`);
        
        res.json({
            success: true,
            verificationId,
            message: 'Verification submitted. Check your email for the code.'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify code
router.post('/verify-code', async (req, res) => {
    const { verificationId, code } = req.body;
    const verification = verifications.get(verificationId);
    
    if (!verification) {
        return res.status(404).json({ error: 'Verification not found' });
    }
    
    if (verification.code !== code) {
        return res.status(400).json({ error: 'Invalid code' });
    }
    
    // Auto-approve for demo (in production, check Charity Commission API)
    verification.status = 'approved';
    
    res.json({
        success: true,
        status: 'approved',
        message: 'Verification successful!',
        account: {
            tier: 'voluntary-verified',
            maxPages: 10,
            features: ['customDomain', 'ssl', 'dataprune', 'shieldpost', 'analytics']
        }
    });
});

// Get status
router.get('/status/:id', (req, res) => {
    const verification = verifications.get(req.params.id);
    if (!verification) return res.status(404).json({ error: 'Not found' });
    
    res.json({
        id: verification.id,
        status: verification.status,
        orgName: verification.orgData.orgName
    });
});

module.exports = router;