# Fenton Forge release ledger — 15 October 2026

## Scope

- Target: controlled early access on Friday 16 October 2026.
- Success path: `Discover → Imagine → Transform → Customise → Export`.
- Output: one independent HTML file.
- Excluded from this release: accounts, remote AI, managed hosting, subscriptions, payment processing.

## Implemented

- Browser-only launch application.
- Three-word deterministic starter style.
- Transform and customise controls for palette, layout, accent, motion, speed, content and contact details.
- Full local preview in a sandboxed frame.
- Independent HTML export with inline styles and inline SVG.
- Strict exported-page policy and escaped text.
- Mobile and reduced-motion styles.
- Automated regression tests.

## Confirmed in this branch

- The launch application is in `launch/`.
- The builder is browser-only and does not call Fenton services.
- The release notes and deployment plan are explicit about unavailable features.

## Verified after push

- To be filled from local and automated checks.

## Unverified

- Real Safari behaviour.
- Real iPhone/iPad behaviour.
- Full keyboard traversal and screen-reader behaviour.
- Contrast across every custom palette.
- Production network performance and sustained motion performance.
- Final brand/legal wording approval.

## Blockers

- Product-owner approval is required for any deployment.
- Merge into `main` requires separate approval.
- Staging URL availability and Hostinger rollout decision require separate approval.