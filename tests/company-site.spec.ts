import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about/",
  "/platform/",
  "/what-we-do/",
  "/sports/",
  "/for-athletes/",
  "/for-organizers/",
  "/our-vision/",
  "/partners/",
  "/contact/",
  "/privacy/",
  "/terms/",
];

test("PlayTown narrative and claims are complete and honest", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(
    "PlayTown — Your game. Your people. Your community.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your PlayTown.",
  );
  for (const id of [
    "why-playtown",
    "about",
    "platform",
    "community",
    "impact",
    "vision",
    "contact",
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  for (const label of [
    "Athlete identity & discovery",
    "Sports Passport & achievements",
    "Tournament discovery",
    "Tournament & team management",
    "Fixtures, live scoring & results",
    "Athlete & team rankings",
    "Social sports engagement",
  ])
    await expect(page.getByText(label, { exact: true })).toBeVisible();
  await expect(page.locator("main")).not.toContainText(
    /EduNisi|trusted by|million athletes|our customers/i,
  );
  await expect(
    page.getByText(/Club rankings are not currently available/),
  ).toBeVisible();
  await expect(
    page.getByText(/current scoring workflow focuses on volleyball/),
  ).toBeVisible();
  await expect(page.locator(".app-showcase figcaption")).toContainText(
    "design concept, not a live account",
  );
  await expect(page.locator(".download-options")).toContainText(
    "Availability to be announced",
  );
  expect(await page.locator('a[href="#"]').count()).toBe(0);
  expect(errors).toEqual([]);
});

test("every public route fits mobile, tablet and desktop, has accessible landmarks and no broken images", async ({
  page,
}) => {
  test.setTimeout(150000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
  await page.goto("/");
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    });
    await Promise.all(Array.from(document.images).map((img) => img.decode()));
  });
  expect(
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.every((img) => (img as HTMLImageElement).naturalWidth > 0),
      ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: "test-results/home-viewport.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(mobileAxe.violations.map((v) => v.id)).toEqual([]);
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.screenshot({ path: "test-results/home-mobile-viewport.png" });
  await page
    .locator(".app-showcase")
    .screenshot({ path: "test-results/app-showcase-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .locator(".app-showcase")
    .screenshot({ path: "test-results/app-showcase-desktop.png" });
  await page
    .locator(".showcase-device")
    .screenshot({ path: "test-results/product-screen.png" });
  expect(errors).toEqual([]);
});

test("mobile menu supports focus, Escape, real destinations, and breakpoint changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu.getByRole("link", { name: "Our story" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await menu.getByRole("link", { name: "The platform" }).click();
  await expect(page).toHaveURL(/\/platform\/$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("metadata, social preview, schema, sitemap and legacy routes stay coherent", async ({
  page,
  request,
}) => {
  const titles = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    titles.add(await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://playtown.nisimin.com${route}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://playtown.nisimin.com${route}`,
    );
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "PlayTown",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const graph = JSON.parse(schemas[0])["@graph"];
    expect(
      graph.find((n: Record<string, unknown>) => n["@type"] === "WebSite").name,
    ).toBe("PlayTown");
    expect(
      graph.find((n: Record<string, unknown>) => n["@type"] === "Organization")
        .name,
    ).toBe("NISIMIN");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      route === "/privacy/" || route === "/terms/"
        ? /noindex/
        : /index, follow/,
    );
  }
  expect(titles.size).toBe(routes.length);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect((sitemap.match(/<loc>/g) || []).length).toBe(10);
  expect(sitemap).not.toContain("/privacy/");
  expect(sitemap).not.toContain("/products/");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://playtown.nisimin.com/sitemap.xml",
  );
  for (const [from, to] of [
    ["/products/", "/platform/"],
    ["/products/playtown/", "/"],
    ["/privacy-policy/", "/privacy/"],
    ["/terms-and-conditions/", "/terms/"],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(
      new URL(response.headers().location, "http://localhost").pathname,
    ).toBe(to);
  }
  const unknown = await page.goto("/does-not-exist/");
  expect(unknown?.status()).toBe(404);
  for (const tag of await page.locator('meta[name="robots"]').all())
    await expect(tag).toHaveAttribute("content", /noindex/);
  const preview = await request.get("/opengraph-image");
  expect(preview.status()).toBe(200);
  expect(preview.headers()["content-type"]).toContain("image/png");
});

test("email enquiries work without pretending to submit or subscribe", async ({
  page,
}) => {
  await page.goto("/contact/");
  await expect(page.locator(".contact-email")).toHaveAttribute(
    "href",
    "mailto:hello@nisimin.com?subject=PlayTown%20enquiry",
  );
  await expect(
    page.getByRole("button", { name: "Save my inquiry" }),
  ).toHaveCount(0);
  await expect(
    page.getByText(/does not automatically subscribe/),
  ).toBeVisible();
});

test("reduced motion and 200% text remain usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => {
    document.body.style.zoom = "2";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("inquiry API retains validation and rejects unconfigured delivery", async ({
  request,
}) => {
  const valid = {
    name: "Test organizer",
    email: "organizer@example.test",
    organization: "Test club",
    interest: "General inquiry",
    message: "A test inquiry for our local sports community.",
    consent: true,
    website: "",
  };
  expect((await request.post("/api/inquiry/", { data: valid })).status()).toBe(
    503,
  );
  for (const data of [
    { ...valid, email: "invalid" },
    { ...valid, consent: false },
    { ...valid, website: "https://spam.example" },
  ])
    expect((await request.post("/api/inquiry/", { data })).status()).toBe(400);
  expect(
    (
      await request.post("/api/inquiry/", {
        data: { ...valid, message: " ".repeat(15000) },
      })
    ).status(),
  ).toBe(413);
  expect(
    (
      await request.post("/api/inquiry/", {
        data: valid,
        headers: { Origin: "https://other.example" },
      })
    ).status(),
  ).toBe(403);
});
