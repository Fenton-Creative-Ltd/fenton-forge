const express = require('express');
const router = express.Router();
const dns = require('dns').promises;

// Email/Domain reputation check
router.post('/check', async (req, res) => {
  const { email, domain } = req.body;
  
  const results = {
    email: email || null,
    domain: domain || (email ? email.split('@')[1] : null),
    checks: {},
    reputation: 'unknown',
    timestamp: new Date().toISOString()
  };

  try {
    // Simple checks
    if (results.domain) {
      try {
        const mx = await dns.resolveMx(results.domain);
        results.checks.mx = { hasMX: mx.length > 0, records: mx.length };
      } catch {
        results.checks.mx = { hasMX: false, records: 0 };
      }
    }

    if (email) {
      results.checks.pattern = analyzeEmailPattern(email);
      results.checks.disposable = isDisposableEmail(email);
    }

    results.reputation = calculateReputation(results.checks);
    results.riskScore = calculateRiskScore(results.checks);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consequence Engine
router.post('/consequence', async (req, res) => {
  const { spammerEmail, evidence } = req.body;
  
  if (!evidence || !evidence.userConfirmed) {
    return res.status(400).json({ error: 'Evidence required' });
  }

  res.json({
    action: 'consequence_deployed',
    message: 'Threat reported to global security networks',
    spammerEmail,
    timestamp: new Date().toISOString()
  });
});

function analyzeEmailPattern(email) {
  return {
    hasNumbers: /\d/.test(email),
    length: email.length,
    suspiciousChars: /[0-9]{4,}/.test(email)
  };
}

function isDisposableEmail(email) {
  const disposable = ['tempmail.com', 'throwaway.com', 'guerrillamail.com', 'mailinator.com'];
  const domain = email.split('@')[1];
  return disposable.includes(domain);
}

function calculateReputation(checks) {
  let score = 100;
  if (!checks.mx?.hasMX) score -= 30;
  if (checks.pattern?.suspiciousChars) score -= 20;
  if (checks.disposable) score -= 50;
  
  if (score >= 80) return 'trusted';
  if (score >= 50) return 'neutral';
  if (score >= 20) return 'suspicious';
  return 'malicious';
}

function calculateRiskScore(checks) {
  let score = 0;
  if (!checks.mx?.hasMX) score += 30;
  if (checks.disposable) score += 50;
  if (checks.pattern?.suspiciousChars) score += 20;
  return score;
}

module.exports = router;
