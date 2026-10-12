# Fenton Forge Direction C — Living Showcase prototype

## Baseline reality
- The tested Hostinger static baseline remains **FentonForge_Phase1_Tested_20261009.zip**. It is still live and untouched.
- Direction B remains reserved for comparison in `../fenton-forge-direction-b/index.html`.
- The existing Hostinger design remains available for comparison in its current live location.
- Nothing here is deployed, published or merged.

## What is in this folder
- `index.html` — self-contained Direction C Living Showcase prototype.
- `check-prototypes.mjs` — local checks for size, accessibility, boundaries and honest claims.
- `favicon.svg` — lightweight local icon.
- `README.md` — test, approval and commercial-path notes.

## How to view the visual preview
Open `review/direction-c/index.html` in a browser. The page is self-contained and has no external requests.

## How to run checks
From the repository root run:

```sh
node review/direction-c/check-prototypes.mjs
```

## Evaluation
- Fast: one HTML file, local CSS/JS, no web fonts, no images, no network calls.
- First five seconds: headline, local visual proof, and CTA are immediately visible on desktop and mobile.
- Navigation: main nav, CTA and in-page anchors are present and keyboard accessible.
- Accessibility: skip link, landmarks, focus states, `aria-live` status, responsive grids and reduced-motion support.
- Truthful: no AI generation, accounts, payments, subscriptions, managed hosting or publishing claims.

## Recommendation
Use Direction C as the next homepage direction for a controlled first-impression test. It can demonstrate three visual styles while remaining honest about what is not yet live. If the five-second clarity test is weaker than Direction B, retain Direction B as the clearer public default and use Direction C as a premium visual showcase route.

## Acceptance criteria for integration
1. Content paints immediately; target LCP ≤ 2.5 seconds at p75.
2. The first screen states what Forge does in five seconds.
3. Desktop and mobile CTA remain above the fold.
4. Skip link, nav, focus states, landmarks and reduced-motion support remain intact.
5. No external fonts, images or third-party homepage calls.
6. Copy only describes verified reality.
7. AI creation, accounts, payments, subscriptions, managed hosting and publishing remain explicit non-claims.
8. CTA points to the existing tested builder path after integration.

## Practical quick customer test
1. Show the prototype for five seconds.
2. Ask: “What does this help you make?”
3. Ask: “Would you click the primary CTA?”
4. Ask: “Which visual style feels most trustworthy?”
5. Record clarity, CTA intent and preferred style against Direction B and the existing Hostinger design.

## Shortest subsequent path to managed AI creation/export with usage limits
- Integrate the approved homepage direction into the tested static release.
- Add real authentication and durable project/version storage.
- Add server-side AI creation behind explicit consent and usage limits.
- Add export/download confirmation and support path.
- Add subscription billing and credit/top-up accounting.
- Keep website hosting/publishing deferred.
- Publish the tested package after a separate deployment approval; do not merge PR #1 automatically.

## Approval path
1. Review the visual preview and run the checks.
2. Run the five-second clarity test against Direction B and the live Hostinger baseline.
3. Record a single preferred direction and any copy edits.
4. Create an isolated integration branch containing the approved homepage plus the tested 11-file static release.
5. Only then prepare a separate deployment PR after explicit approval.