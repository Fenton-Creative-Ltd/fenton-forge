# Fenton Forge — 9 October 2026 Phase 1 preview acceptance

The separately deployed Hostinger **static preview** was tested by the owner in Safari and on iPhone on 9 October 2026. The browser-only homepage, animations, page builder (edit/preview), layout switching, standalone HTML export, Visual Lab, Showcase/Calm toggle and mobile display were reported working.

## Important: THIS BRANCH DOES NOT YET CONTAIN THE DEPLOYED BUILD

The live tested package is **FentonForge_Phase1_Tested_20261009.zip**, an allowlisted 11-file static release assembled from the original Fenton Forge Phase 1 preview and Visual Lab Showcase patch.

ZIP SHA-256: `8449c63255cb366ac848fa5c7076b47b93104ed405722e438455d06f6caf2147`.

The `launch/` files in this PR are an **earlier simplified preview** and MUST NOT be merged or used to overwrite the tested Hostinger site until replaced with the exact contents of that ZIP and checked. The current deployed site was published using Hostinger File Manager, **not** from this GitHub PR.

### Next action
1. Import **only** the 11 allowlisted public static files from the versioned ZIP into `launch/` on a reviewed branch.
2. Update CI and local tests to match those files; re-run.
3. Review the privacy/terms notices, accessibility and source licensing before formal public/commercial release.
4. Obtain approval before merging/redeploying. Do not include original `.env`, developer archives, scraper, payments or incomplete server-side AI/backend.

The temporary staging domain continues to carry `noindex,nofollow` directives and is not approved for paid customer usage.

## Verification done on release ZIP
ZIP integrity passed; 11-file allowlist checked; 3 JS syntax checks passed; local static-resource checks passed; 10 targeted builder escaping/validation tests passed.

Current PR CI status is not a substitute for these tests; earlier GitHub runners were not available. The user acceptance tests are not an independent penetration test or full WCAG audit.
