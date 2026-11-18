import { test, expect } from "@playwright/test";
import { POST } from "../app/api/inquiry/route";
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
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  const token = process.env.INQUIRY_WEBHOOK_TOKEN;
  process.env.INQUIRY_WEBHOOK_URL = "https://receiver.example.test/inquiry";
  process.env.INQUIRY_WEBHOOK_TOKEN = "test-token";
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
    const accepted = await POST(request());
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toEqual({ received: true });
    globalThis.fetch = async () => new Response(null, { status: 500 });
    const rejected = await POST(request());
    expect(rejected.status).toBe(502);
    expect(await rejected.json()).not.toHaveProperty("received");
    globalThis.fetch = async () => {
      throw new Error("Connection lost");
    };
    expect((await POST(request())).status).toBe(502);
  } finally {
    globalThis.fetch = originalFetch;
    if (endpoint === undefined) delete process.env.INQUIRY_WEBHOOK_URL;
    else process.env.INQUIRY_WEBHOOK_URL = endpoint;
    if (token === undefined) delete process.env.INQUIRY_WEBHOOK_TOKEN;
    else process.env.INQUIRY_WEBHOOK_TOKEN = token;
  }
});
