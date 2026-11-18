# Cloudflare Pages deployment

Production origin: **https://playtown.nisimin.com**. No deployment or DNS changes are made by preparing this checkout.

## Build and hosting settings

- Framework preset: **Next.js (Static HTML Export)**, or **None** with the settings below. Do not use a Workers/OpenNext or `next-on-pages` server preset.
- Root directory: the directory containing this package.json and the root `functions/` directory.
- Build command: `npm run build`.
- Build output directory: **out** (also declared as `pages_build_output_dir` in `wrangler.jsonc`).
- Node.js: **22** (`NODE_VERSION=22` in the Pages build environment).
- Install from the committed lockfile with `npm ci`.

`output: "export"` produces HTML, RSC navigation payloads, JS, CSS, local images, local Manrope font files, sitemap, robots, 404 and a prerendered PNG social image. Cache Components, partial prefetching and the custom Turbopack loader were removed from production configuration. The build uses the supported Webpack compiler, avoiding the local Turbopack port restriction. The original image files are served without Next's runtime optimizer. Styling, content, sizing and local font loading are preserved.

Legacy product and legal paths live in `public/_redirects` and return permanent **301** redirects, including slash and non-slash aliases. `public/_headers` preserves the PNG content type for the extensionless generated social image. `_routes.json` invokes Functions only for `/api/inquiry` and `/api/inquiry/`; all pages/assets remain static. Unknown URLs use the exported `404.html`.

## Environment variables

| Variable | Where | Value / purpose |
| --- | --- | --- |
| `NODE_VERSION` | Pages build | `22` |
| `NEXT_PUBLIC_SITE_URL` | Pages build | `https://playtown.nisimin.com` (also the code default) |
| `NEXT_PUBLIC_INQUIRIES_ENABLED` | Pages build | `true` to render sending forms **after runtime delivery is configured**; unset/`false` preserves email-only contact |
| `NEXT_PUBLIC_NOINDEX` | Pages build | `false` for production; **`true` for Preview** to emit noindex metadata, a disallow-all robots file and an empty sitemap |
| `INQUIRY_WEBHOOK_URL` | Pages Function runtime secret | Required for online delivery: the existing compatible HTTPS inquiry receiver |
| `INQUIRY_WEBHOOK_TOKEN` | Pages Function runtime secret | Optional Bearer token, as required by the receiver |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Pages build, optional | Defaults to `hello@nisimin.com` |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL` | Pages build, optional | Official profile URLs only |
| `NEXT_PUBLIC_PLAYTOWN_ANDROID_URL`, `NEXT_PUBLIC_PLAYTOWN_IOS_URL` | Pages build, optional | Approved store listings; leave empty to keep availability notices |

Set build variables in Pages settings for Production and Preview separately. Set webhook values as encrypted runtime bindings/secrets for the Pages project. Do **not** prefix credentials with `NEXT_PUBLIC_`, commit `.dev.vars`, or place secrets in `wrangler.jsonc`. The Next application never reads webhook bindings; only the Function does. Public build-variable changes require a rebuild. The production HTML always canonicalizes to the custom domain; preview indexing is controlled separately by the explicit flag. The NISIMIN Organization URL and publisher ID intentionally remain at `https://nisimin.com`; the PlayTown WebSite identity, canonicals, sitemap and social URLs use the subdomain.

## Inquiry delivery

`functions/api/inquiry.ts` replaces the Next POST Route Handler at the same URL. The form still calls `/api/inquiry` with JSON. The Function validates same-origin submissions, media type, a streaming 14 KB body limit, field lengths, consent, category and honeypot. It sends the original receiver payload and `source: "playtown-company-website"`, with optional Bearer authorization, a 10-second timeout and redirect rejection. It reports success only after receiver acceptance; unconfigured delivery returns 503 and receiver failures return 502. No secrets or submitted personal data are logged or embedded in the client. No database or Next/Node server is required by the adapter.

The receiver must actually deliver/store messages. Local tests use a mocked receiver; verify real receipt once production credentials are configured. Email links and local message saving on delivery failure remain available. Configure any receiver/edge rate limits in Cloudflare or the receiver; none are added here.

## Local verification

```sh
npm ci
npm run typecheck
npm run build
npm run verify:export
npm test
```

`npm start` runs `wrangler pages dev out`, serving the exported site and Pages Function. For local sending, set `NEXT_PUBLIC_INQUIRIES_ENABLED=true` for the build and copy `.dev.vars.example` to ignored `.dev.vars` with the runtime receiver values. Use a dedicated local receiver, not production, when testing. Next dev by itself only previews the static UI; it does not run Pages Functions or Pages redirects.

The automated browser suite launches Wrangler at port 3100. It checks every public route at 320/390/768/1024/1440 pixels, images, accessibility, mobile navigation, SEO/schema, redirects, social image response, 404 and inquiry validation. Handler tests exercise accepted/rejected/failed delivery without sending real messages. Default browser tests assume sending is disabled and no real runtime secrets are configured.

`npm run verify:export` verifies 12 public/legal HTML pages, their canonical and social URLs, local image/CSS/JS references, emitted fonts, 404, PNG social image, sitemap, robots and Pages config. It also checks asset sizes and that webhook bindings/values are absent from static output.

## Publish and custom domain

After successful local checks, use the Pages Git integration with the settings above, or run `npx wrangler pages deploy out --project-name <actual-pages-project-name>` from this repository root. Root `functions/` must be included in the deployment workflow; uploading only the `out` folder through dashboard drag-and-drop does not deploy Functions. `wrangler.jsonc` currently uses `playtown-web`; match that name to the existing Pages project before deploying if it differs.

In the Pages project, add **playtown.nisimin.com** under **Custom domains**, then follow Cloudflare's DNS instructions (typically a `playtown` CNAME to the actual `<project>.pages.dev` hostname). Add the domain through Pages before pointing DNS. Wait for domain/certificate activation. No account project, production branch, webhook credentials, DNS or certificate status is assumed or changed here.

References: [Pages routing](https://developers.cloudflare.com/pages/functions/routing/), [redirects](https://developers.cloudflare.com/pages/configuration/redirects/), [runtime bindings](https://developers.cloudflare.com/pages/functions/bindings/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Preparation results and changed files

Local `npm ci`, TypeScript validation, the production static build and export verification passed. The default Wrangler browser/handler suite passed all nine checks. A separate enabled-form build was scanned with dummy webhook values to confirm they did not enter static output; the sending UI was tested with intercepted responses rather than real delivery. The final artifact is rebuilt with the default email-only setting. The dependency installation reported 16 audit advisories (7 moderate, 9 high); dependency upgrades beyond adding Wrangler are outside this deployment change.

Changed/added files:

- `next.config.ts`: static export, disable Cache Components, unoptimized local images, remove server redirects and experimental server settings.
- `package.json`, `package-lock.json`: reproducible Wrangler dependency, build/start/export verification commands.
- `wrangler.jsonc`: Pages project defaults, output directory and compatibility date.
- `functions/api/inquiry.ts`: migrated inquiry handler and runtime bindings.
- `app/api/inquiry/route.ts`: removed after migration to Pages Functions.
- `app/products/page.tsx`, `app/products/playtown/page.tsx`: removed server redirect pages, superseded by edge redirect rules.
- `public/_redirects`, `public/_routes.json`, `public/_headers`: legacy routes, Function invocation scope and social image MIME type.
- `lib/site.ts`: custom-domain metadata origin, explicit inquiry form and preview-indexing build switches.
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`: prerender metadata routes as static files.
- `.env.example`, `.dev.vars.example`, `.gitignore`: documented public settings, separate runtime secret template and ignored local Cloudflare state.
- `scripts/verify-export.mjs`: export integrity, SEO, asset and secret checks.
- `playwright.config.ts`: run the exported site under Wrangler.
- `tests/company-site.spec.ts`: new production origin and Pages redirect expectations.
- `tests/inquiry-delivery.spec.ts`: runtime binding, receiver and validation tests.
- `tests/inquiry-form.spec.ts`: optional enabled-form browser test covering failed delivery, local save and success.
- `README.md`, `docs/cloudflare-pages.md`: setup, deployment, environment, domain and verification guidance.

To rerun the enabled-form browser check, build with `NEXT_PUBLIC_INQUIRIES_ENABLED=true`, then run `NEXT_PUBLIC_INQUIRIES_ENABLED=true npm test -- tests/inquiry-form.spec.ts`. Rebuild with the intended production settings afterwards. Without the flag this optional check is skipped; the default suite still exercises the Function's HTTP endpoint and delivery handler.
