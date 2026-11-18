import { validateInquiry } from "@/lib/inquiry";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json(
      { error: "Please submit your inquiry from the PlayTown website." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json(
      { error: "Unsupported request format." },
      { status: 415 },
    );
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 14000)
    return Response.json(
      { error: "Your inquiry is too long." },
      { status: 413 },
    );
  // Read with a hard limit even when the client does not send Content-Length.
  const reader = request.body?.getReader();
  if (!reader)
    return Response.json(
      { error: "Please complete the inquiry form." },
      { status: 400 },
    );
  let total = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > 14000) {
      await reader.cancel();
      return Response.json(
        { error: "Your inquiry is too long." },
        { status: 413 },
      );
    }
    chunks.push(value);
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }
  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return Response.json(
      { error: "Please check your inquiry and try again." },
      { status: 400 },
    );
  }
  const result = validateInquiry(payload);
  if ("error" in result) return Response.json(result, { status: 400 });
  if (result.data.website)
    return Response.json(
      { error: "This inquiry could not be accepted." },
      { status: 400 },
    );
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;
  if (!endpoint?.startsWith("https://"))
    return Response.json(
      {
        error:
          "Online inquiries aren’t open yet. Please save your message or use our published business email.",
      },
      { status: 503 },
    );
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.INQUIRY_WEBHOOK_TOKEN)
      headers.Authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}`;
    const { website: ignored, ...inquiry } = result.data;
    void ignored;
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...inquiry, source: "playtown-company-website" }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok)
      return Response.json(
        {
          error:
            "We couldn’t confirm receipt. Please try again later or save your message.",
        },
        { status: 502 },
      );
    return Response.json({ received: true });
  } catch {
    return Response.json(
      {
        error:
          "We couldn’t confirm receipt. Please try again later or save your message.",
      },
      { status: 502 },
    );
  }
}
