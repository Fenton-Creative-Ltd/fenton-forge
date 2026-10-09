# Fenton Forge — Phase 1 safe launch preview

This is a standalone static website for Fenton Creative Ltd. It has no server-side dependencies, payment features, remote AI calls or user accounts.

Included: responsive marketing page, local website-preview builder, standalone HTML export, preview privacy/terms and shared CSS.

## Publish on Hostinger without affecting The Guide

Create a separate Hostinger website or domain/subdomain. Upload the **contents** of launch/ into the website's document root (typically public_html). Do not change frith-haven.com or its existing deployment.

The document root must contain index.html, builder.html, builder.js, styles.css, privacy.html and terms.html. Links are relative and work from either a root domain or subdirectory.

If configuring Hostinger's Git integration, publish **launch/** only, not the whole repository. Do not expose api/, data/, server.js or .env files.

## Tests

Run: node --check launch/builder.js
Run: node --test tests/launch-preview.test.cjs

A GitHub Actions workflow runs these tests on the isolated launch branch and on pull requests.

## Deliberate phase-1 limits

- Browser-only preview, no network requests from the builder.
- Download is a simple, editable HTML file, not a production-hosted website.
- No persistent draft storage, account or cross-device sync.
- No paid orders, integrated email service, live contact forms, domain management or managed publishing.
- No AI generation and no website migrations.

The existing Express backend needs separate security hardening before it should be exposed publicly. Do not deploy the repository root as a server on this phase-1 website.

Release is incomplete until real HTTPS, mobile preview and downloaded file are manually verified.