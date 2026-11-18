import { test, expect } from "@playwright/test";
import { handleInquiry, onRequest } from "../functions/api/inquiry";
const inquiry = {
  name: "Test organizer",
  email: "test@example.test",
  organization: "Test club",
  interest: "General inquiry",
  message: "We are interested in a community sports conversation.",
  consent: true,
  website: "",
};

test("delivery reports success only after the configured receiver accepts", async () => {
  const originalFetch = globalThis.fetch;
  const env = {
    INQUIRY_WEBHOOK_URL: "https://receiver.example.test/inquiry",
    INQUIRY_WEBHOOK_TOKEN: "test-token",
  };
  const request = () =>
    new Request("https://playtown.example.test/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://playtown.example.test",
      },
      body: JSON.stringify(inquiry),
    });
  try {
    globalThis.fetch = async (_url, options) => {
      expect(options?.redirect).toBe("error");
      expect(options?.headers).toMatchObject({
        Authorization: "Bearer test-token",
      });
      expect(JSON.parse(String(options?.body))).toMatchObject({
        name: inquiry.name,
        source: "playtown-company-website",
      });
      return new Response(null, { status: 204 });
    };
    const accepted = await handleInquiry(request(), env);
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toEqual({ received: true });
    globalThis.fetch = async () => new Response(null, { status: 500 });
    const rejected = await handleInquiry(request(), env);
    expect(rejected.status).toBe(502);
    expect(await rejected.json()).not.toHaveProperty("received");
    globalThis.fetch = async () => {
      throw new Error("Connection lost");
    };
    expect((await handleInquiry(request(), env)).status).toBe(502);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Pages Function preserves validation, same-origin checks and safe failure", async () => {
  const request = (
    payload: unknown = inquiry,
    origin = "https://playtown.nisimin.com",
  ) =>
    new Request("https://playtown.nisimin.com/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: origin },
      body: JSON.stringify(payload),
    });
  expect((await onRequest({ request: request(), env: {} })).status).toBe(503);
  expect(
    (
      await onRequest({
        request: request(inquiry, "https://other.test"),
        env: {},
      })
    ).status,
  ).toBe(403);
  for (const payload of [
    { ...inquiry, consent: false },
    { ...inquiry, website: "spam" },
    { ...inquiry, message: "short" },
  ]) {
    expect(
      (await onRequest({ request: request(payload), env: {} })).status,
    ).toBe(400);
  }
  expect(
    (
      await onRequest({
        request: request({ ...inquiry, message: "x".repeat(15000) }),
        env: {},
      })
    ).status,
  ).toBe(413);
  const method = await onRequest({
    request: new Request("https://playtown.nisimin.com/api/inquiry"),
    env: {},
  });
  expect(method.status).toBe(405);
  expect(method.headers.get("Allow")).toBe("POST");
});
