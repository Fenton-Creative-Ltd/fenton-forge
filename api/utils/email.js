// Simple email utility - replace with SendGrid/AWS SES in production

async function sendEmail(to, subject, body) {
    // For now, just log to console
    // In production, integrate with:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Postmark
    
    console.log(`
========== EMAIL ==========
To: ${to}
Subject: ${subject}
Body: ${body.substring(0, 500)}...
===========================
    `);
    
    // Example SendGrid implementation:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
        to,
        from: 'noreply@fenton-forge.com',
        subject,
        text: body
    });
    */
    
    return { success: true };
}

module.exports = { sendEmail };