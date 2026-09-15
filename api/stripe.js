const router = require('express').Router();

// Only initialize Stripe if key exists
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

router.post('/create-migration-session', async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }
  
  const { tier, siteUrl, email } = req.body;
  const prices = {
    standard: 'price_standard_49',
    express: 'price_express_99',
    whiteglove: 'price_white_299'
  };
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: prices[tier], quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/migration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/migration/cancel`,
      customer_email: email,
      metadata: { siteUrl, tier, service: 'migration' }
    });
    
    res.json({ sessionId: session.id, url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/create-venice-subscription', async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }
  
  const { email, userId } = req.body;
  
  try {
    const customer = await stripe.customers.create({ email });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'price_venice_29_monthly' }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: { userId }
    });
    
    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;