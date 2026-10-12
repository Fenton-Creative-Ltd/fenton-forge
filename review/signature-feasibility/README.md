# Forge Signature Collection — isolated creative feasibility
12 October 2026. No deployment, merge or full collection build. Direction C.3 remains separate in PR #5. This exercise adds only review/signature-feasibility on a sibling review branch.

## Recommendation
Proceed to a small, product-owner-approved image-to-video trial for Glass Tide. The image + real v4 atmosphere proof already establishes a cohesive, exportable website direction. It does not establish the quality, loop reliability or exact cost of generated video. Approve that narrower experiment before producing a full collection.

## Three original concept studies

| Environment | Concept | Distinct visual language | Motion proposal, not implemented |
|---|---|---|---|
| A — Natural but Impossible | Glass Tide: forest and water, with falls becoming suspended glass ribbons | Emerald depth, warm-cyan light, convincing texture and impossible material | Locked camera; glass-light flow, gentle water/mist; first and last frames matched |
| B — Futuristic | Luminous architecture: nested ceramic arches and flowing energy channels | Monumental geometry, precise teal filaments, reflective darkness | Energy travels through architecture; construction subtly evolves without sudden geometry changes |
| C — Surreal Imagination | Cloud Matter: pigment terraces and anonymous face-like cloud formations | Rose/plum/cream, expressive organic abstraction | Cloud/pigment flow; minimise face deformation and reject disturbing or recognisable likenesses |

Three static AI concept images were generated with the built-in image generation tool. Only A is integrated and working; B and C are visual studies, not finished environments. They are newly generated studies, not a guarantee of exclusive legal rights. Prompts deliberately avoid existing designs, artists, brands and real-person references.

## What is actually working
Glass Tide is a complete example studio website, with its generated image extending through the header and hero. The page palette, interface accents, v4 atmosphere, continuous image drift and anchored light share one configuration. The environment has no rectangular video frame. It uses an AI-created still, actual v4 Canvas rendering and browser motion; it contains no AI-generated video and no live generation API calls.

Three words deterministically set palette, intensity, speed and seed. Light/intensity/motion controls immediately apply. Make it yours opens editable studio name, headline and description. Export embeds the image, selected configuration, original v4 source and motion logic in one independent HTML file; it removes prototype controls. The website works when opened separately, without Forge servers. API keys are unnecessary and none are embedded.

The exact v4 source matches C.3/Phase 1, SHA-256 7f9a77c0e777256ad40063e634afa861005364681d47bfda4bb110bc97858771. No engine fork or substitute CSS engine was introduced. Continuous browser animation avoids a hard video edit seam, but it is not a guarantee that every procedural frame repeats after a fixed period. The image's glass geometry itself remains static.

## Hybrid architecture to develop
Author image with text-safe space and identifiable focal forms → optional image-to-video generation with locked camera and constrained motion → human review of drift, deformation and seam → WebP/AVIF poster plus optimised silent MP4/WebM → v4 light/mist composition and shared interface tokens → portable configuration and export assets.

This proof embeds its roughly 159 KiB 1600×800 WebP image. The browser first presents text and a static scene, then activates v4 after two animation frames. Media bytes are already inside the file: this is progressive animation activation, not a separately streamed high-resolution asset. A production build should load a small poster first and lazy-load separately cached animation only when visible and motion is allowed.

For approved video, target approximately 5–10 seconds with a fixed camera and subtle changes. Match first and last reference frames where supported; otherwise edit/crossfade and inspect the seam, rejecting ghosts. Do not promise seamless AI video from a prompt alone. A muted clip and its poster must remain intact with motion disabled or playback unavailable. A 5–10 second H.264 clip at an assumed 1–3 Mbps would add roughly 0.6–3.8 MB before container overhead; that is a planning calculation, not an encoded asset measured here. Larger assets should export as HTML + local media with relative paths and licence metadata.

## Tool evaluation and estimated costs (USD, checked 12 October 2026)

| Approach | Assessment | Budget basis |
|---|---|---|
| Built-in image generation + v4 | Used for these concept studies and working proof; fast art direction, no remote service in delivered page | Actual metered generation cost is not exposed here; not claimed as free or a Venice charge |
| Venice image + image-to-video | Practical candidate for a future trial; model selection, quote-before-generation and first/last-frame options merit testing | Published Seedream V5 Lite image example: $0.05/image. Video price is model/duration/resolution dependent: obtain the exact Video Quote first |
| Runway Gen-4 Turbo / Gen-4.5 | Useful alternative for controlled image-to-video comparison; quality judgement remains untested by this exercise | Published API examples: credits $0.01 each; Turbo 5 credits/sec, Gen-4.5 12/sec |
| Browser-only v4 composition | Working low-bandwidth baseline, responsive and reproducible | No per-view AI generation cost; bandwidth/support remain real costs |

Planning arithmetic: ten five-second Runway Turbo takes cost $2.50; ten Gen-4.5 takes cost $6.00. Thirty takes across three scenes cost $7.50 or $18.00 respectively. Separate portrait versions roughly double those generation counts. Eighteen image studies at the quoted $0.05 image rate cost $0.90. These combine independent provider benchmarks, not a purchased bundle. Retries, different models, upscale, taxes, subscriptions and editing time are extra; successful takes per approved loop are unknown. A provisional $25–$75 direct-generation allowance for a controlled motion trial leaves room for iteration; it is a proposed budget, not spending approval. No Venice/Runway jobs or charges were initiated.

Sources: [Venice image pricing](https://docs.venice.ai/overview/pricing), [Venice video models and quoting](https://docs.venice.ai/models/video), [Runway API pricing](https://docs.dev.runwayml.com/guides/pricing/). Prices change; quote the chosen settings immediately before any paid generation.

## Rights and practical constraints
OpenAI's terms assign applicable output rights between the parties but explicitly say output may not be unique. Runway's usage guidance allows commercial use and retains users' rights between the parties. Neither statement by itself demonstrates exclusivity, absence of third-party claims, or the exact asset sublicensing terms needed by a website-template product. Venice's current Service licence includes personal, non-commercial wording, while it also documents end-user API obligations. Commercial customer export/redistribution needs clarification of the applicable provider/model/account agreement; do not infer permission from promotional model copy. Maintain a record per asset: provider, model, date, prompt, reference provenance, applicable terms, edits and intended customer-export rights. Do not market the collection as exclusive or copyright-guaranteed.

Sources: [OpenAI terms](https://openai.com/policies/terms-of-use/), [Runway usage rights](https://help.runwayml.com/hc/en-us/articles/18927776141715-Usage-rights), [Venice terms](https://venice.ai/legal/tos). This is a product-clearance issue to resolve before commercial redistribution, not a legal conclusion about all generated assets.

## Evidence
22 assertions passed in local headless Chromium: actual engine, embedded art, reproducible words, different recipes, shared palette/UI configuration, manual motion pause, safe text, editable headline, real download, independent animation/config/text, mobile overflow, reduced motion in both pages, key-pattern scan, no external requests and no errors. Desktop, mobile and export screenshots are included.

Measured local LCP 0.376s; CLS 0; HTML 258,247 bytes. Sampled drawing median 0.80ms, p95 1.00ms across 6 frames. These small local samples are not sustained FPS, memory, INP, field p75 CWV, throttled network or real Safari/mobile measurements.

Outstanding: real Mac/iPhone Safari, complete keyboard/screen-reader and custom-palette contrast audit, real mobile energy and frame rate, image crop approvals, real generated video quality and loop tests, exact quote, export redistribution clearance, and visitor judgement. The static concepts are coherent directions; the future/face concepts still need separate motion research. No full collection, backend, music, autonomous Guide, billing or publishing work was begun.

Approval question: does this feel like an extraordinary digital creation integrated with the website, and make you want to create? If yes, approve only the one-scene motion trial next. Keep C.3's functioning builder/export baseline intact.

## Run
Serve this directory with python3 -m http.server 8876. Run test-browser.cjs with Playwright installed; CODEX_PRIMARY_RUNTIME_NODE_MODULES and FORGE_BROWSER_EXECUTABLE select the runtime/browser in this environment. Do not start the experimental repository API server.

## Staged media integration update
See [MEDIA-INTEGRATION.md](MEDIA-INTEGRATION.md) for the completed provider comparison, code-reuse audit and secure adapter proposal. The optional image uses prepared artwork; optional animation is an explicitly labelled browser simulation. No paid AI video has been produced. Six offline request-contract assertions also pass.

## Motion correction — iteration 2
Initial 93-second drift was not perceptible in product-owner review. Replaced with a 16-second default cycle and larger camera movement; four-second timed checks record approximately 7.6% scale change and 25px horizontal movement in preview and export. Reduced motion remains static. All 22 browser assertions pass. Current run: local LCP 360ms, CLS 0; earlier measurements above belong to the previous iteration. See visible-motion-results.json and paired screenshots. User Safari perceptibility approval remains pending.

## Stationary-camera internal movement — iteration 3
The earlier zoom/pan was an animated still-image placeholder, not final environmental animation. The current camera is fixed. A dedicated Canvas compositing layer produces drifting mist and moving light motes inside the environment; the unchanged actual Visual Engine v4 provides its procedural atmosphere. The underlying AI artwork remains static: water, leaves and glass geometry do not physically animate. This demonstrates category 3 procedural scene movement, not category 2 AI video. Category 1 zoom/pan is now disabled.

The timed diagnostic checks unchanged image transform (`none`) and changed Canvas pixels/phase after four seconds, in both review and independent export. Reduced motion stops scene updates. Export includes the local scene renderer and artwork; no server/API dependency. Existing 22 browser assertions pass. New local LCP 420ms, CLS 0; Safari/mobile perception remains product-owner/manual testing. Genuine flowing-water image-to-video remains a separately approved trial.
