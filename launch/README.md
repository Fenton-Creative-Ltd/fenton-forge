# Fenton Forge — Early-access release candidate

This branch is a separate, controlled early-access release candidate only. It contains the launch application, not production deployment.

## Release intent

- **Discover:** choose a website starting point and understand the clear scope.
- **Imagine:** enter three words.
- **Transform:** turn those words into a deterministic visual result.
- **Customise:** edit the name, headline, description, services, contact, colours, layout, motion and speed.
- **Export:** download one self-contained HTML file.

## What is deliberately not included

- No accounts.
- No remote AI generation.
- No payment processing or subscription.
- No managed hosting or publishing.
- No external requests from the launch application.
- No Hostinger deployment in this pull request.

## Deployment plan

When explicitly approved, publish only the contents of `launch/` to a new, separate Hostinger website or subdomain. Keep the existing production website, repository baseline and all protected Hostinger services untouched.

If a problem appears after controlled rollout, restore the previous launch folder contents from the last verified Hostinger copy. Do not publish the repository root, `api/`, `data/`, Node dependencies, environment variables or any administrative files.

## Verification

Run from the repository root:

```
node --check launch/builder.js
node --test tests/forge-journey.test.cjs
```

The automated tests cover:
- full journey structure,
- deterministic words,
- independent export,
- escaping and input limits,
- absence of external requests,
- absence of secret-like strings,
- reduced-motion and mobile affordances.

Manual checks still required before controlled release: Safari, iPhone, keyboard traversal, screen reader, contrast and real network/device conditions.