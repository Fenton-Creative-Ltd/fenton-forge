
// Stripe integration
app.use('/api/stripe', require('./api/stripe'));

// Venice API key storage endpoint
app.post('/api/user/venice-key', async (req, res) => {
  const { apiKey } = req.body;
  // Add your database logic here to save the key
  res.json({ success: true });
});

// Showcase submission endpoint
app.post('/api/showcase/submit', async (req, res) => {
  const { siteName, siteUrl, email, category, description } = req.body;
  // Add your database logic here to save submission
  console.log('Showcase submission:', { siteName, siteUrl, email, category, description });
  res.json({ success: true });
});
