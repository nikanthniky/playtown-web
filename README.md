# PlayTown — Your game. Your people.

The customer-facing product website for PlayTown, a community-driven sports technology platform developed by NISIMIN. The owner confirmed `https://nisimin.com` as its canonical origin. This checkout is a PlayTown experience, with no other product catalogue.

## Run and verify

```sh
npm install
npm run dev
npm run lint
npm run build -- --webpack
npm run typecheck
npm test
```

`npm run build` uses Turbopack. In this restricted environment its process ports are blocked, including an attempted elevated build; the supported Webpack build succeeds. Run TypeScript after the build because Next generates route types during the build. Browser tests use the production server at port 3100 and installed Google Chrome on macOS. Install Playwright Chromium on other hosts.

## Product narrative and content

The homepage moves through community-sport challenges, the PlayTown solution, implemented platform capabilities, six audiences, intended community impact, a multi-sport vision and enquiries/availability. Claims are grounded in the read-only mobile/backend source, with provenance and limitations in [the audit](docs/playtown-audit.md). Source implementation does not establish public release availability.

Athlete identities/discovery, Sports Passport, tournament discovery/management, fixtures, volleyball scoring, eligible award/result rankings and text-based social engagement are covered. Dedicated club profiles/rankings, durable cross-event team profiles and broader scoring engines are explicitly future direction. Photo posting remains pending end-to-end release verification. No traction, testimonials, customers or partnerships are invented.

Original sports routes remain functional: `/about/`, `/what-we-do/`, `/our-vision/`, `/partners/`, `/sports/`, `/for-athletes/`, `/for-organizers/`, `/contact/`, and `/platform/`. The temporarily introduced `/products/` and `/products/playtown/` URLs permanently redirect to `/platform/` and `/`. Privacy/terms aliases also redirect permanently. Unknown paths return 404. No hostname/DNS redirects or deployment were performed.

## Configuration

Copy `.env.example` to `.env.local` only when changing deployment settings. Never commit credentials.

- `NEXT_PUBLIC_SITE_URL` defaults to the confirmed `https://nisimin.com`. Use the exact HTTPS origin, without paths. Explicitly empty/invalid values produce a noindex preview and empty sitemap; Vercel previews also remain noindex. Production metadata, canonicals, sitemap and schema use the same origin.
- `NEXT_PUBLIC_CONTACT_EMAIL` defaults to the published `hello@nisimin.com`. Optional official Instagram/LinkedIn URLs are validated before being shown.
- `NEXT_PUBLIC_PLAYTOWN_ANDROID_URL` and `NEXT_PUBLIC_PLAYTOWN_IOS_URL` accept real HTTPS Google Play/app details and Apple App Store listing URLs. Empty or invalid values show availability text, without fake download buttons.
- `INQUIRY_WEBHOOK_URL` and optional `INQUIRY_WEBHOOK_TOKEN` enable the existing server-side enquiry adapter. The form is displayed only when the receiver is configured. Email enquiries work immediately without it. Rebuild after changing configuration.

The receiver accepts POST JSON with `name`, `email`, `organization`, `interest`, `message`, `consent: true` and the retained `source: "playtown-company-website"`. The source identifier is preserved for receiver compatibility. Optional authorization is `Bearer <token>`. Confirm actual storage/delivery before launch. The adapter checks request origin, JSON, bounded body/field lengths, consent, category and honeypot, and only reports success after receiver acceptance. It does not log personal data. Configure hosting-edge/receiver rate limits and retention for production. No newsletter or waitlist is created.

## Brand and assets

The site uses PlayTown orange `#FC4C02`, white and charcoal. Approved white logo and icon come unchanged from `playtown/assets/brand/`, documented by the mobile project's `docs/ui-redesign/approved-branding.md`. Dark text on orange preserves normal-text contrast. Manrope is self-hosted; its SIL Open Font License remains in `app/fonts/OFL.txt`.

The phone showcase now uses `components/product-overview.tsx`: a clearly labelled illustrative athlete/community home-screen concept. It highlights athlete discovery, tournaments, rankings and sporting identity without invented account data or engagement counts. The original `public/images/playtown-fixtures.webp` simulator capture is retained as an unused source asset. Approved current app captures are still needed for other workflows.

Existing local photographs illustrate sporting participation, not members or endorsements:

- [Football in Kolkata — Subham Mitra / Pexels](https://www.pexels.com/photo/youth-playing-football-in-dusty-kolkata-field-33390340/).
- [Women's basketball — Joel De Leon / Pexels](https://www.pexels.com/photo/photo-of-women-playing-basketball-934083/).
- [Cricket in Pune — Sandeep Singh / Pexels](https://www.pexels.com/photo/a-boy-playing-cricket-13509631/).
- Retained original running photograph: [Pexels](https://www.pexels.com/photo/group-of-people-running-8556686/).

The hero and phone overview now use responsive product concepts centered on sporting identity, Sports Passport and rankings. `components/sport-identity-visual.tsx` keeps the visuals editable and accessible without bitmap UI screenshots or invented athlete data. Previously generated sports imagery is retained but no longer used in these placements; its provenance remains in [editorial-imagery.md](docs/editorial-imagery.md).

## Architecture and SEO

`components/sections.tsx` contains server-rendered narrative sections. `lib/capabilities.ts` is the feature/benefit content source. `components/company-page.tsx` composes the retained routes without duplicating the full homepage. Only navigation and the optional form need client state; decorative motion modules from the earlier implementation remain inactive and are not imported into the current pages.

`lib/site.ts` centralizes identity, configuration and page metadata. Page-specific titles/descriptions, self canonicals, Open Graph/Twitter previews, the generated social image, Organization/WebSite schema, sitemap and robots are coordinated. Legal pages remain clearly marked drafts and noindex until operational details and legal review are complete. No invented ratings, certifications or offers are added to schema.

See [verification results and outstanding information](docs/website-verification.md). Changes are local; deployment has not been performed.
