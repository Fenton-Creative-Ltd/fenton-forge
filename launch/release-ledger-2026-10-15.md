# Fenton Forge release ledger

## Scope

- Target date: next controlled early-access after product-owner approval.
- Success path: Discover → Imagine → Transform → Customise → Export.
- Final output: one independent HTML file with no external runtime dependencies.
- Excluded from this release: accounts, remote AI generation, managed hosting, subscriptions, payment processing.

## Implemented

- Browser-only launch application.
- Three-word deterministic starter style.
- Transform and customise controls for palette, layout, accent, motion, speed, content and contact details.
- Full live preview in a sandboxed editor frame.
- Independent HTML export with self-contained styles and visual data.
- Strict export policy, escaping and input limits.
- Mobile and reduced-motion styles.
- Accessibility affordances including skip link, visible focus and live status text.
- Automated journey, safety and dependency tests.

## Confirmed

- The branch contains the actual launch application, not an earlier prototype.
- The builder is browser-only and makes no network requests.
- Export is a standalone HTML file.
- Automated tests pass.
- Basic browser review confirms launch, Discover, Imagine, Transform, Customise, Export and independent offline rendering.
- Mobile responsiveness and reduced-motion support are present.
- No external requests or exposed secrets were detected in the launch payload.

## Unverified

- Real Safari behaviour on macOS.
- Real iPhone or iPad behaviour.
- Complete keyboard traversal and screen-reader review.
- Contrast across every custom palette.
- Production network performance and older-device performance.
- Final legal and brand wording approval.

## Blockers

- Explicit product-owner approval is required for any deployment.
- Merge into main requires separate approval.
- Staging domain and Hostinger rollout require separate approval.
- A final independent file should be opened outside the builder after the user confirms the preferred example state.

## Controlled rollout plan

1. Review and approve the release candidate.
2. Provide or confirm a dedicated staging subdomain.
3. Publish only the contents of `launch/` to that location.
4. Smoke-test the site over HTTPS, then run Safari and iPhone journeys.
5. If approved, send controlled links and keep `index,follow` until full approval.
6. If anything goes wrong, restore the previous Hostinger website package and leave repository unchanged.

This plan does not change Hostinger services until the product-owner gives explicit approval.