# Direction B — Studio Editorial selected prototype

This is a private internal review artifact. It is **not live**, **not published**, and **not connected to AI generation, accounts, payments, subscriptions or managed hosting**.

## What this is
- A bright, editorial homepage direction selected for the next implementation round.
- A self-contained HTML prototype with no external requests, iframes or network calls.
- A lightweight, accessible layout with visible focus states and reduced-motion support.

## Baseline reality
- The current live baseline is the tested Hostinger static preview: **FentonForge_Phase1_Tested_20261009.zip**.
- The current GitHub branch `fix/launch-readiness-20261009` is an **earlier simplified preview**, not the tested live build.
- Do **not** merge that branch without a fresh review.

## How to review
1. Open `index.html`.
2. Confirm the “Direction B · Selected · Not live” label.
3. Run the local checks.
4. If you approve Direction B, the next step is to integrate it into a reviewed branch containing the tested 11-file baseline.

## How to run checks
- `node check-prototypes.mjs`
- The prototype itself is static and network-free.