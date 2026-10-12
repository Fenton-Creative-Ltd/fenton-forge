# Fenton Forge C.3 — Living Portal review

Review-only prototype, 12 October 2026. No deployment or merge. Hostinger, main, existing launch release and experimental backend unchanged.

Open index.html in a browser to interact. Open independent-nature-example.html separately to see the exported waterfall website; independent-example.html demonstrates the procedural export. Both export files include all required media and the actual engine and need no hosted Fenton services.

## What changed

Three environments: real waterfall footage with procedural lighting; original surreal SVG landscape with the v4 compositing layer; and a full v4 procedural scene. Three words map deterministically to environment, palette, lighting, engine mode, intensity, speed and seed. Known adjectives use structured mappings; other words use a stable hash. No live AI is claimed. Reset, palette, intensity, speed and motion controls work. A collapsed, optional Guide offers three local recipes and builder instructions, in normal document flow without covering content.

The builder preserves text editing, validated contact links, layout/accent controls, immediate preview and HTML download. Header links reveal their homepage sections while preserving edits, on desktop and mobile. The exported HTML embeds the engine and applicable media, including video playback logic and reduced-motion handling.

## Actual engine and media

The inline fc-visual-engine implementation matches the tested Phase 1 assets/js/fenton-visual-engine.js after stripping surrounding whitespace. SHA-256: 7f9a77c0e777256ad40063e634afa861005364681d47bfda4bb110bc97858771. It draws Canvas 2D frames, rather than merely switching CSS colours. Its nine procedural modes remain available in the builder.

Nature source: [Bigora waterfall by Termininja](https://commons.wikimedia.org/wiki/File:Bigora_waterfall.webm), CC0 1.0. Source checked 12 October 2026. Trimmed to eight seconds, resized to 1280×720, transcoded H.264 at 24 fps, audio removed, approximately 702 KiB. WebP poster is approximately 153 KiB. The art world is original SVG geometry created for this prototype. There are no runtime font, image, API or analytics requests to third parties.

The still scene appears first. Video source assignment and decoding wait until after the initial presentation and only play for a visible Nature scene. Video is silent, loops, follows motion controls and pauses off-screen or when the document is hidden. Reduced-motion uses a static image. Playback failure leaves the static scene. All media bytes are embedded: this is progressive activation/decoding, not separate network streaming. This makes the review roughly 1.24 MB and exports portable; a production release should evaluate separately cached assets.

## Verification

32 automated browser assertions passed in headless Chromium, 1440×1000 desktop and 390×844 mobile emulation. browser-results.json contains the exact results and measurements. Screenshots include all three worlds and both builder layouts. No browser errors or unexpected external requests were observed. Credential-pattern scanning found no common private-key/API-token patterns in the prototype. That is a scoped check, not a security audit of the older repository.

Measured local initial LCP: 1.188 seconds. CLS: 0. Sampled engine drawing: median 0.50 ms, p95 0.80 ms, 6 samples. These are local lab measurements, not real-device Safari, sustained frame-rate, field p75 Core Web Vitals or INP measurements.

| Mandatory scenario | Evidence |
|---|---|
| Three distinct worlds | Separate SVG, real video/poster and Canvas scenes; three desktop captures |
| Genuine v4 engine | Canvas/running assertion plus equality with Phase 1 source |
| Reproducible words | Repeated state comparison and different world/palette/lighting/speed |
| Actual gallery customisation | Engine palette assertion and motion pause test |
| Builder transfer | Environment and palette assertions |
| Navigation | Homepage desktop anchors; desktop/mobile builder anchors and repeated CTA |
| Editable content | Live input and exported headline assertion |
| Independent export | Real download plus file:// engine, media and silent video playback checks |
| Reduced motion | Engine stop, CSS stop and video pause checks |
| Network/credentials | Browser context requests plus scoped static credential scan |

## Remaining limits and manual tests

- Real Mac Safari and iPhone Safari, touch use, low-power mode and muted-autoplay policies remain untested.
- Screen-reader review, complete keyboard traversal, contrast auditing across all custom palettes, 200% zoom and older devices remain manual checks.
- Slow-network, CPU throttling, sustained frame rate, memory, INP and field CWV remain unmeasured.
- One real Nature clip is curated. Oceanic words map to waterfall footage with waves and explain that limitation. Unknown words produce deterministic visual variation, not semantic AI understanding.
- Video looping is functional but the seam may be perceptible. A seamless licensed clip and more Nature scenes would improve the finish.
- Music/ambience is deferred; no audio system or automatic sound is included.
- Edits are retained during navigation in the open session; no durable project storage is claimed.
- No hosted review URL was published. The supplied self-contained HTML is the interactive review; open it in Safari if the file viewer does not execute HTML.

## Comparison and refinement

| Direction | Strength | Tradeoff |
|---|---|---|
| B — Studio Editorial | Calm, daylight-friendly explanation | Less spectacle; CSS showcase and placeholder journey in inspected branch |
| Original tested Hostinger Phase 1 | Purpose-led copy, actual builder, restrained waves | Gallery and hero feel separate; no three-word worlds |
| C.3 — Living Portal | Real motion, three worlds and personalisation through to portable export | Larger payload; stronger media and Safari validation still needed |

Next: run the five-second clarity and desire-to-create test with visitors, measuring what Forge does, whether they notice Transform, and whether they enter the builder. Refine the mobile first screen, video loop and semantic scene matching in response. Keep the approval question central: does this immediately communicate the possibilities, impress visitors and make them want to create? This prototype supports creative review; it is not approved for production integration.

## Run tests

Install Playwright in a separate tool environment and its Chromium browser. Serve this directory with python3 -m http.server 8765, then run node test-browser.cjs. CODEX_PRIMARY_RUNTIME_NODE_MODULES can resolve the installed runtime; FORGE_BROWSER_EXECUTABLE can select an existing Chromium binary. Do not run the repository's experimental API server to review this prototype.
