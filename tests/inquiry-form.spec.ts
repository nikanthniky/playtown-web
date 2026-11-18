import { test, expect } from "@playwright/test";

test("enabled static contact form sends, reports failure and saves a local copy", async ({
  page,
}) => {
  test.skip(
    process.env.NEXT_PUBLIC_INQUIRIES_ENABLED !== "true",
    "Build with inquiries enabled to exercise sending UI",
  );
  await page.goto("/contact/");
  await page.getByLabel("Your name").fill("Test organizer");
  await page.getByLabel("Email address").fill("organizer@example.test");
  await page.getByLabel("Let’s talk about").selectOption("General inquiry");
  await page
    .getByLabel("Your message")
    .fill("A local test inquiry for our community sports event.");
  await page.getByRole("checkbox").check();

  await page.route("**/api/inquiry", async (route) => {
    expect(route.request().method()).toBe("POST");
    expect(route.request().postDataJSON()).toMatchObject({
      name: "Test organizer",
      consent: true,
    });
    await route.fulfill({
      status: 502,
      json: { error: "The test receiver could not confirm receipt." },
    });
  });
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator(".inquiry-form").getByRole("alert")).toContainText(
    "could not confirm receipt",
  );
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save a local copy instead" }).click();
  expect((await download).suggestedFilename()).toBe("PlayTown-inquiry.txt");
  await expect(page.locator(".form-feedback")).toContainText(
    "Nothing has been submitted",
  );

  await page.route("**/api/inquiry", async (route) => {
    await route.fulfill({ status: 200, json: { received: true } });
  });
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator(".form-feedback")).toContainText(
    "Your inquiry has been received",
  );
  await expect(page.getByLabel("Your name")).toHaveValue("");
});
