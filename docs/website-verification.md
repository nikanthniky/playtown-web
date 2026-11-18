# PlayTown implementation and verification — 17 November 2026

## Outcome

This repository now presents PlayTown as the customer-facing sports product, with NISIMIN acknowledged as its developer. The owner confirmed `https://nisimin.com` as the canonical origin. There is no other product catalogue and no duplicated corporate homepage. No deployment or DNS change was performed.

The homepage follows the requested narrative: why grassroots sport needs better visibility and coordination; what PlayTown is; seven implemented capability groups and their benefits; athletes, organizers, teams, clubs, supporters and institutions; intended community outcomes; a longer-term multi-sport direction; and app availability/enquiries. The approved mobile artwork, orange/white/charcoal palette, local grassroots photography and self-hosted Manrope replace the superseded corporate design.

Capabilities are grounded in the mobile/backend source, with evidence in [the audit](playtown-audit.md). The site distinguishes source implementation from public rollout, tournament team entries from permanent team identities, individual award rankings from general skill ratings, current volleyball scoring from multi-sport aspirations, and unavailable club features from today's workflows. Photo posting remains explicitly pending end-to-end release verification. No fabricated metrics, endorsements, partnerships or launch dates were added.

An authentic simulator screenshot is captioned as demo tournament/team data. Other supplied October images are design references, not verified current captures, and were excluded. More approved current app captures would strengthen the showcase.

## Preserved behavior and integrations

- All original sports/company paths remain meaningful PlayTown pages; `/platform/` now directly explains the product.
- Temporary corporate catalogue paths `/products/` and `/products/playtown/` redirect permanently to `/platform/` and `/`. Legal aliases redirect permanently; unknown URLs return actual 404 responses.
- Earlier homepage anchors for about, what-we-do, community, growth, partners, vision and contact are preserved.
- Existing optional enquiry API, payload/source identifier, validation and delivery token handling are retained. Email contact works without a receiver; an unconfigured form is not advertised as a working submission channel.
- Official store URL slots are validated. Until approved listings are configured, Android/iOS show availability notices. No newsletter or waitlist exists.
- Shared metadata uses PlayTown identity, per-page titles/descriptions, HTTPS canonicals, Open Graph/Twitter metadata, a generated social image and linked Organization/WebSite schema. The sitemap has ten indexable pages. Legal drafts remain crawlable but noindex and excluded from the sitemap.
- Explicit empty/invalid origin configuration or a Vercel preview sets noindex; normal builds default to the owner-confirmed origin.

## Checks actually run

| Check                        | Result                                                                                                                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build -- --webpack` | Passed production build; 21 prerendered outputs including metadata, redirects and not-found output; enquiry remains a server route.                                                      |
| `npm run lint`               | Passed.                                                                                                                                                                                  |
| `npm run typecheck`          | Passed after build-generated route types were available.                                                                                                                                 |
| `npm test`                   | All 8 tests passed.                                                                                                                                                                      |
| `git diff --check`           | Passed.                                                                                                                                                                                  |
| Responsive browser checks    | All 12 content/legal routes fit 320, 390, 768, 1024 and 1440px widths without horizontal document overflow.                                                                              |
| Automated accessibility      | Axe WCAG 2 A/AA and 2.1 AA found no violations across all 12 routes at desktop width and on the mobile homepage.                                                                         |
| Keyboard/behavior            | Mobile menu initial focus, Escape/return focus, navigation and breakpoint close passed; reduced motion and 200% zoom passed.                                                             |
| Metadata/routing             | Unique page titles, corresponding canonical/OG URLs, robots directives, schema identity, sitemap membership, legal/compatibility redirects, real 404 and generated PNG preview passed.   |
| Enquiries                    | Unconfigured delivery and invalid/oversized/cross-origin/honeypot requests rejected; existing mocked receiver tests confirm success only after acceptance and preserve failure handling. |
| Rendering                    | One main landmark and H1 per public page, no client errors in checked routes, images decode, screenshot review completed.                                                                |

The ordinary Turbopack build was attempted and retried with elevated execution. This host still blocked its internal process-port binding. The installed Next.js supported Webpack path succeeded. An initial favicon encoding problem was corrected. During the first Turbopack attempt the framework also reported a security upgrade advisory for installed Next.js 16.4.3. No dependency upgrade was performed; review the advisory and update the dependency before a production release.

The initial browser runs found a 404 test assumption (Next injects its own noindex tag in addition to page metadata) and a timing-sensitive breakpoint assertion. The final test checks every 404 robots tag and waits for the mobile menu's actual removal, and the navigation also checks the current breakpoint immediately when its handler attaches. The final suite passes.

Screenshots are in ignored `test-results/home-desktop.png`, `home-viewport.png`, `home-mobile.png`, and `home-mobile-viewport.png`.

## Performance

The final local simulated-mobile Lighthouse summary is in [performance-summary.json](performance-summary.json). This is one localhost lab measurement, not production Core Web Vitals. Lighthouse was run using already installed tooling; no dependency was added to this repository. The full temporary report is `/tmp/playtown-lighthouse.json`.

The first run scored 95 performance and 100 for accessibility, best practices and SEO, with LCP 3.0s, TBT 20ms and CLS 0. It identified oversized logo delivery and missing explicit priority on the hero request. The final build uses responsive logo optimization, accurate hero image sizes, eager loading and high fetch priority. The final run scored **97 performance, 100 accessibility, 100 best practices, and 100 SEO**, with FCP **0.8s**, LCP **2.7s**, TBT **20ms**, and CLS **0**. Image-delivery and LCP request-discovery warnings were resolved. LCP remains above the 2.5s target in this lab; remaining opportunities are framework JavaScript, render-blocking CSS/font delivery and network dependencies. The back/forward-cache audit also remains flagged. These measurements do not establish production field performance.

Only the navigation and optional form require client state on current pages. Narrative content is server-rendered, image dimensions reserve layout space, font delivery stays local, and the previous decorative motion/network components are not imported into active page trees.

Safari/Firefox, physical iOS/Android devices, manual screen-reader review, production CDN/cache behavior, field INP and real delivery/storage at the configured enquiry receiver were not verified.

## Outstanding owner information

1. Approved store listings, platform/region availability and launch status/date.
2. Approved current screenshots for athlete profiles, Passport, discovery, scoring, rankings and social interaction.
3. Confirmation of release-ready capabilities, especially social media upload and any expanded sport support.
4. Legal operator/name/address/jurisdiction, privacy request procedure, retention/provider details and final privacy/terms review.
5. A real enquiry receiver if web-form submissions are desired; email is already available. Pricing, if intended, must be confirmed before adding it.

No production deployments, domain changes, store listings, payments, app accounts or subscriptions were created. The sibling mobile, backend, admin and corporate repositories were read only.

## Phone-screen revision

Following owner feedback, the fixtures screen inside the phone was replaced with an athlete/community overview concept. The HTML/CSS screen showcases supported product areas, uses the existing grassroots photograph, and contains no invented users, scores or engagement counts. The surrounding caption explicitly identifies it as a design concept rather than an authentic app capture. The existing fixture capture is retained but unused. Build (Webpack), lint, TypeScript and all eight browser/integration tests passed again. The new screen preview is `test-results/product-screen.png`. Earlier Lighthouse results above predate this revision.

## Editorial image refinement

The hero and mobile overview photos were replaced with two coordinated AI-generated illustrative volleyball team scenes: a cleaner court setting for the hero and a closer team moment for the phone. See [asset provenance and prompts](editorial-imagery.md). The hero alt text/caption and phone illustration label reflect their illustrative role. The two WebP assets are local and responsive. Earlier Lighthouse figures predate these asset changes.

## Identity and rankings direction

The owner subsequently requested product visuals instead of sport photography. Both the hero and the phone now present a sporting identity / Sports Passport / award-based rankings concept, implemented in `components/sport-identity-visual.tsx`. No athlete names, scores, ranks or account records are invented. Generated photos are retained as unused assets. A container-width breakpoint stacks the hero when high zoom reduces its available width. Earlier imagery and Lighthouse notes describe previous revisions.


## Phone proportions and light theme

The phone concept now has a fixed 9:19.5 frame and scales its internal layout with container units. The duplicate identity row was removed to keep the screen concise. A white header with a monochrome version of the approved logo, a pale-orange Passport panel and a light rankings panel restore the lighter app appearance. Build, lint, TypeScript and all eight browser tests passed; updated desktop/mobile previews were visually inspected, including the top camera cutout, bottom navigation and screen fit.
