import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const origin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://playtown.nisimin.com";
const routes = [
  "",
  "about",
  "platform",
  "what-we-do",
  "sports",
  "for-athletes",
  "for-organizers",
  "our-vision",
  "partners",
  "contact",
  "privacy",
  "terms",
];
for (const route of routes) {
  const path = join("out", route, "index.html");
  assert(existsSync(path), `Missing page: ${path}`);
  const html = readFileSync(path, "utf8");
  if (origin) {
    const url = `${origin}/${route ? `${route}/` : ""}`;
    assert(
      html.includes(`rel="canonical" href="${url}"`),
      `Canonical: ${route || "/"}`,
    );
    assert(
      html.includes(`property="og:url" content="${url}"`),
      `Open Graph: ${route || "/"}`,
    );
    assert(
      html.includes(`${origin}/#website`),
      `WebSite schema: ${route || "/"}`,
    );
  }
  assert(
    !html.includes("/_next/image?"),
    "Next image optimizer requires a server",
  );
  for (const match of html.matchAll(
    /(?:src|href)="(\/(?:_next\/static|images|brand)\/[^"?#]+)[^"]*"/g,
  )) {
    assert(
      existsSync(join("out", decodeURI(match[1]))),
      `Missing asset: ${match[1]}`,
    );
  }
}
for (const asset of [
  "404.html",
  "favicon.ico",
  "apple-touch-icon.png",
  "opengraph-image",
  "robots.txt",
  "sitemap.xml",
  "_redirects",
  "_routes.json",
  "_headers",
]) {
  assert(existsSync(join("out", asset)), `Missing ${asset}`);
}
assert(
  readFileSync("out/opengraph-image")
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  "Social image must be PNG",
);
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const noindex =
  process.env.NEXT_PUBLIC_NOINDEX === "true" ||
  !origin ||
  process.env.VERCEL_ENV === "preview";
assert.equal((sitemap.match(/<loc>/g) ?? []).length, noindex ? 0 : 10);
if (!noindex)
  assert(
    readFileSync("out/robots.txt", "utf8").includes(`${origin}/sitemap.xml`),
  );
assert.deepEqual(JSON.parse(readFileSync("out/_routes.json", "utf8")).include, [
  "/api/inquiry",
  "/api/inquiry/",
]);
let files = 0;
function inspect(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) inspect(path);
    else {
      files++;
      assert(
        statSync(path).size < 25 * 1024 * 1024,
        `Pages asset too large: ${path}`,
      );
      if (/\.(?:html|js|txt|json|xml)$/.test(path)) {
        const text = readFileSync(path, "utf8");
        assert(
          !text.includes("INQUIRY_WEBHOOK_TOKEN") &&
            !text.includes("INQUIRY_WEBHOOK_URL"),
          `Runtime binding in static output: ${path}`,
        );
        for (const key of ["INQUIRY_WEBHOOK_TOKEN", "INQUIRY_WEBHOOK_URL"]) {
          const value = process.env[key];
          if (value)
            assert(
              !text.includes(value),
              `Runtime secret in static output: ${path}`,
            );
        }
      }
    }
  }
}
inspect("out");
assert(
  readdirSync("out/_next/static/media").some((name) =>
    /\.(woff2?|ttf)$/.test(name),
  ),
  "Missing self-hosted font",
);
console.log(
  `Verified ${routes.length} HTML pages, SEO, PNG social image, local assets/fonts, Pages routing, and ${files} files with no webhook bindings/secrets in static output.`,
);
