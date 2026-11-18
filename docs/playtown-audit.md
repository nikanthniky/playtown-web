# PlayTown product website audit — 17 November 2026

This audit supersedes the earlier corporate-site direction in `website-audit.md`. The current brief is a standalone PlayTown product website, with NISIMIN acknowledged as its developer. No deployment, DNS, application/backend writes or changes to the sibling NISIMIN repository are included.

## Before implementation

The interrupted corporate-site work made this checkout a NISIMIN site, introduced EduNisi, and pointed canonicals to nisimin.com. That conflicts with the current product brief. The earlier sports implementation contained useful responsive navigation, a validated optional enquiry webhook, local Manrope, sport photographs and legal/SEO foundations, but long repetitive company sections obscured actual product capabilities. Its custom P symbol also differs from the approved logo now available in the mobile repository.

Reuse: Next.js App Router, local variable font, enquiry validation/API, optional delivery configuration, accessible controls, metadata routes, local grassroots photography, and approved mobile brand assets. Replace the active corporate homepage/components with a product narrative; preserve existing sports URLs as meaningful PlayTown pages. Corporate-only product paths become compatibility redirects, never active EduNisi content.

## Capability evidence

Evidence is the current local mobile/backend implementation and its reports, not proof of production deployment or general availability. Newer source/reports supersede the older route inventory where they differ.

| Capability                              | Evidence in sibling `playtown` checkout                                                                                 | Website treatment                                                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Athlete sporting identity and discovery | `docs/athlete-discovery.md`, `docs/athlete-profile-experience.md`, `src/api/athletes.ts`, athlete search/profile routes | Implemented; public visibility subject to privacy/eligibility. No scouting contract or guaranteed discovery.                                    |
| Sporting records and achievements       | `docs/sports-passport.md`, `docs/achievements-rankings.md`, Passport routes                                             | Implemented; distinguish self-reported records from reviewed achievements. No federation certification claim.                                   |
| Tournament discovery                    | `docs/discover-play-next.md`, Discover routes and matches API                                                           | Implemented; actual event facts and registration eligibility, no invented coverage.                                                             |
| Tournament management and teams         | `docs/organizer-home.md`, create/manage/register/staff routes                                                           | Implemented tournament entries/rosters, approvals and permissions. Persistent cross-event team identity is not established.                     |
| Fixtures and scoring                    | `docs/viewer-screens.md`, fixtures/live/score routes, lifecycle report                                                  | Implemented; canonical scoring focuses on volleyball. Do not imply every sport has a scoring engine.                                            |
| Rankings                                | `docs/rankings-implementation.md`, `docs/achievements-rankings.md`                                                      | Implemented eligible award/result rankings; no universal skill rating or club leaderboard.                                                      |
| Social engagement                       | `docs/athlete-discovery.md`, `docs/social-posts.md`, current social routes/API                                          | Athlete follows, text posts, likes/comments implemented. Photo posting remains pending end-to-end verification. No per-tournament follow claim. |
| Clubs                                   | `src/app/club/index.tsx`                                                                                                | Standalone club profiles unavailable; label planned direction, present clubs as beneficiaries of tournament/community workflows.                |
| Multi-sport ecosystem                   | Current sport discovery plus `docs/achievements-rankings.md` scoring limitations                                        | Long-term direction; explicitly distinguish from current volleyball scoring focus.                                                              |

## Assets

Approved artwork: `playtown/assets/brand/playtown-logo-white.png` and `playtown-icon.png`, with provenance in `docs/ui-redesign/approved-branding.md`. Reuse unchanged. Existing local sports photographs retain their original attribution (see README); depicted people are illustrative, not customers or endorsers.

One authentic iOS simulator capture is available at `/private/tmp/playtown-button-expansion-after.png`. It shows a tournament's upcoming matches using explicitly labelled demo teams. Publish an optimized copy with an equally explicit caption; these are not customer counts or live events. The October UI-reference images under `playtown_ui:ux` contain outdated/demo designs and are not shipped as current app captures. More approved current athlete/Passport/Discover/rankings/scoring screenshots remain desirable.

## Business and release information still needed

Approved store links/platform availability; launch status/date; supported release sports/regions; reviewed screenshots for other workflows; final legal operator, address, retention/provider details and policy review. Existing published NISIMIN contact email supplies immediate enquiries. No waitlist subscription or submission success is invented.

The owner confirmed `nisimin.com` as the public origin during implementation. Canonicals now default to `https://nisimin.com`; setting NEXT_PUBLIC_SITE_URL explicitly empty gives a noindex preview. No domain cutover was performed.
