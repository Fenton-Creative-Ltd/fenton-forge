# Venice media integration — bounded feasibility review
12 October 2026. Isolated prototype. No paid provider jobs, production credentials, deployment or merge.

## Decision
The hybrid approach merits a one-scene, separately approved motion trial. Keep instant v4 personalisation free of remote dependencies. Optional generation should be an explicit customer choice, with a confirmed quote. Venice is a useful multi-model gateway; downloading its SDK does not reduce inference charges or establish that it is cheaper than the originating provider.

## Demonstration delivered
Three words change palette, light, engine intensity, motion speed and deterministic seed. **Instant world** reveals the procedural atmosphere. **Use prepared AI image** applies the already-created Glass Tide artwork; it makes no generation request. **Preview animation** demonstrates browser movement on that still, explicitly labelled as a simulation, not generated video. The selected stage and settings survive editable content and independent single-file export. The authored image composition does not regenerate from the words.

The page is an editable website example, not a second implementation of the entire Forge builder. C.3's complete builder remains untouched on its separate review branch. The Signature scene has a bounded editor for name, headline and description. Integrating this scene into every existing builder template remains a controlled-integration task after approval.

## Comparable costs
Published USD rates retrieved 12 October 2026; taxes, currency conversion, storage, transcoding and repeated rejected outputs excluded. No authenticated Venice quote or actual billed quality benchmark was obtained. Prices below are tariffs and calculations, not actual project charges.

| Output | Venice gateway | Originating provider / other route | Interpretation |
|---|---|---|---|
| One FLUX.2 Pro image | $0.03 listed per image | BFL direct from $0.03, dependent on pixel dimensions | No demonstrated saving; pin identical dimensions before comparing |
| One FLUX.2 Max image | $0.09 listed | BFL direct from $0.07 | Direct base price is lower; exact resolution charge still required |
| One Seedream 5 Lite image | $0.05 | Runway $0.04 | Runway is another gateway for this model, not its originating provider |
| One Runway Gen-4 image | Model-specific catalog/quote required | Runway direct $0.05 at 720p; $0.08 at 1080p | Different image models cannot be treated as identical quality |
| Five-second Gen-4 Turbo animation | Authenticated video quote required | Runway direct $0.25 | 5 credits/sec × $0.01 × 5 sec |
| Five-second Gen-4.5 animation | Authenticated video quote required | Runway direct $0.60 | 12 credits/sec × $0.01 × 5 sec |
| Silent Veo 3.1 animation | Authenticated video quote required | Through Runway $0.20/sec; Fast $0.10/sec | Google direct also offers Veo; exact direct billing unit and allowed duration must be confirmed |

Image comparison profile: one landscape image, approximately 1MP, no upscaling, one prompt and pinned model version. Video profile: same reference image, landscape 16:9, 720p, silent, one supported short clip. Five seconds is an arithmetic comparison for supported Runway models, not a promise that every model accepts five seconds. Google’s currently retrieved pricing table renders units as “1 count”; do not silently interpret that as per second. Resolve the SKU before a like-for-like Google quote.

Venice video prices are variable. Its authenticated `/video/quote` endpoint must be called with the exact model, duration, resolution, aspect ratio and audio setting; the documentation's example quote is not a real price. Compare the resulting USD amount with a direct-provider quote before queuing. Cap both individual attempts and total trial spend. Ten identical five-second Turbo attempts would cost $2.50 at the listed Runway tariff; ten Gen-4.5 attempts $6.00, before image/processing costs. Cost per *accepted loop* remains unknown until quality review.

Sources: [Venice rates](https://docs.venice.ai/overview/pricing), [Venice quote](https://docs.venice.ai/api-reference/endpoint/video/quote), [Runway rates](https://docs.dev.runwayml.com/guides/pricing/), [BFL rates](https://docs.bfl.ai/quick_start/pricing), [Google rates](https://cloud.google.com/vertex-ai/generative-ai/pricing).

## Quality and model selection
Shortlist FLUX.2 Pro/Max for photographic texture and controllable landscape imagery; Gen-4 Image for a coherent Runway image-to-video workflow. Shortlist Gen-4 Turbo for inexpensive motion trials and Gen-4.5/Veo 3.1 as cinematic alternatives. These are candidates, not a tested ranking or a claim of reliable results in Forge. Venice exposes multiple models but cannot remove their deformation, drift or looping limitations.

Use the same approved image and motion prompt across routes. Review water/foliage realism, glass geometry, camera stability, text-safe framing, first/last-frame seam and mobile crop. Reject implausible faces or recognisable likenesses. Compare accepted clips per dollar, generation latency and reproducibility, not vendor showreels. Seeds and pinned settings preserve the request; they do not guarantee identical remote outputs.

## Commercial rights
Runway's usage guidance permits commercial use and says users retain rights between the parties. That is useful, but does not alone establish exclusivity or resolve third-party claims. [Runway rights](https://help.runwayml.com/hc/en-us/articles/18927776141715-Usage-rights).

BFL's website/FLUX terms disclaim ownership of user content and permit its use subject to restrictions; similar outputs are possible. API service terms and the applicable model agreement must also be reviewed. Local open-weight licences are separate from paid API permissions. [BFL terms](https://bfl.ai/legal/terms-of-service), [API terms](https://bfl.ai/legal/flux-api-service-terms).

Venice's current Service licence includes personal/non-commercial wording and separate API obligations. This raises a clarification requirement for Forge's commercial customer export and asset redistribution, rather than proving that every Venice output is prohibited commercially. Obtain written confirmation of the applicable account/model agreement before customer distribution. [Venice terms](https://venice.ai/legal/tos).

For every asset retain provider/model/version, prompt, reference provenance, generation date, modifications, terms snapshot and explicit customer-export clearance. Do not claim exclusive rights or guaranteed copyright. Current built-in generated studies are review assets; commercial collection clearance is incomplete.

## Secure provider-independent proposal
Keep a static browser preview and export runtime. A separately approved server-side media gateway would own credentials, adapters and generation jobs; no provider SDK or key belongs in exported HTML. This proposal is not wired to the public website.

A normalised request carries owner, scene configuration version, provider/model, prompt, reference asset hash, duration, resolution, aspect ratio and audio flag. Adapters expose capabilities, quote, submit, poll, cancel-if-supported and retrieve. UI sees a Forge job ID, never a secret or provider download credential.

Require explicit approved provider/model lists and a request-bound, expiring quote. Reserve spend in a durable transactional ledger before submission. Bind idempotency keys and job IDs to the authenticated owner; enforce ownership on poll/download/cancel. Apply CSRF protection, quotas and audit events. Never retry a submission blindly after timeout: reconcile its idempotency/job record first. No silent model fallback; any changed model or price needs a new quote. Use bounded polling and circuit breakers, and account for retries/failures according to the provider's billing policy.

Retrieve approved media into controlled storage before marking a job ready. Restrict remote retrieval hosts, redirects, protocols, file types and byte limits; reject private-network addresses to prevent SSRF. Verify decoded dimensions/duration, strip secrets from logs, retain provenance and checksum, create a compressed poster and web video. A portable export embeds small assets or bundles `index.html` and relative `assets/` paths. It must never rely on a presigned URL, API request or Forge session.

`integration-contract.cjs` is an offline validation exercise with six passing assertions. It checks approval, allowed model, quote expiry/request binding, owner/idempotency fields and cost ceiling. It has no outbound implementation. Durable ledger, authentication, storage and adapters are proposed, not implemented.

## Existing-code reuse audit
The Mac copilot archive/repository has not been supplied or located: **audit pending**. No claim is made that its code or configuration was inspected.

A related PSAP v2.4.1b server was inspected read-only. Useful patterns: server-side environment keys, prompt bounds, timeouts, model discovery and bounded retries. Do not reuse its character identity/continuity system. Its in-memory request counter is not a durable monetary spend ledger. Image fallback can select other models or an unspecified default; reject that behaviour for a quoted Forge request. The inspected video route queues without a quote/spend reservation, and retrieval accepts a client-supplied model and queue ID; add persisted owner-bound job lookup before reuse. No related server code, credentials or backend has been copied into the prototype.

## Remaining evidence and constraints
No generated AI-video sample, seam test, authenticated Venice quote, measured provider latency, billed accepted-loop cost or commercial redistribution clearance. Real Safari/iPhone, screen-reader, keyboard/contrast audit, sustained mobile GPU/energy and field CWV remain manual tests. This exercise should stop at review, then seek approval for one capped trial; no full collection or commercial feature expansion.
