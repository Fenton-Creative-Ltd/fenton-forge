#!/bin/bash
echo "Deploying Fenton Forge updates..."
git add .
git commit -m "Add Venice backgrounds, Stripe payments, animated footer, AI hero CTA"
git push origin main
echo "Done. Trigger manual deploy in Render dashboard."
