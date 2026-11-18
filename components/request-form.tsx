"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download, LoaderCircle } from "lucide-react";
import { inquiryInterests, validateInquiry, type Inquiry } from "@/lib/inquiry";
import { Button } from "./ui/button";
function saveInquiry(inquiry: Inquiry) {
  const text = `PLAYTOWN — PRODUCT ENQUIRY\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nOrganization: ${inquiry.organization || "Not specified"}\nSubject: ${inquiry.interest}\n\n${inquiry.message}\n\nThis is a local copy. It has not been submitted to NISIMIN.\n`;
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "PlayTown-inquiry.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function RequestForm({ enabled = false }: { enabled?: boolean }) {
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "saved" | "error"
  >("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const requestRef = useRef(false);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("interest");
    const input = formRef.current?.elements.namedItem("interest");
    if (input instanceof HTMLSelectElement) {
      if (value === "investment") input.value = inquiryInterests[3];
      if (value === "playtown") input.value = "PlayTown enquiry";
      if (value === "partnership") input.value = inquiryInterests[2];
    }
  }, []);
  function readInquiry() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return null;
    const fields = new FormData(form);
    const result = validateInquiry({
      name: fields.get("name"),
      email: fields.get("email"),
      organization: fields.get("organization"),
      interest: fields.get("interest"),
      message: fields.get("message"),
      website: fields.get("website"),
      consent: fields.get("consent") === "on",
    });
    if ("error" in result) {
      setError(result.error);
      setState("error");
      return null;
    }
    return result.data;
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestRef.current) return;
    const inquiry = readInquiry();
    if (!inquiry) return;
    if (!enabled) {
      saveInquiry(inquiry);
      setState("saved");
      return;
    }
    requestRef.current = true;
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.received !== true)
        throw new Error(
          result.error ||
            "We couldn’t confirm receipt. Please try again or save your message.",
        );
      setState("sent");
      formRef.current?.reset();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "We couldn’t confirm receipt. Please try again.",
      );
      setState("error");
    } finally {
      requestRef.current = false;
    }
  }
  return (
    <form
      ref={formRef}
      className="inquiry-form"
      onSubmit={submit}
      onChange={() => {
        if (state !== "sending") setState("idle");
      }}
      aria-describedby="inquiry-note"
    >
      <div className="form-heading">
        <span className="eyebrow">LET’S START SOMETHING</span>
        <span className="form-required">* Required</span>
      </div>
      <fieldset disabled={state === "sending"}>
        <legend className="sr-only">Your PlayTown inquiry</legend>
        <div className="form-row">
          <label htmlFor="inquiry-name">
            Your name <span>*</span>
            <input
              id="inquiry-name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Full name"
            />
          </label>
          <label htmlFor="inquiry-email">
            Email address <span>*</span>
            <input
              id="inquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@organization.com"
            />
          </label>
        </div>
        <div className="form-row">
          <label htmlFor="inquiry-organization">
            Organization <span className="optional">(optional)</span>
            <input
              id="inquiry-organization"
              name="organization"
              autoComplete="organization"
              maxLength={150}
              placeholder="Your company, club or school"
            />
          </label>
          <label htmlFor="inquiry-interest">
            Let’s talk about <span>*</span>
            <select
              id="inquiry-interest"
              name="interest"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select an area
              </option>
              {inquiryInterests.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>
        <label htmlFor="inquiry-message">
          Your message <span>*</span>
          <textarea
            id="inquiry-message"
            name="message"
            required
            minLength={20}
            maxLength={3000}
            rows={4}
            placeholder="Tell us a little about your community, idea, or how you’d like to work together."
          />
        </label>
        <div className="form-honeypot" aria-hidden="true">
          <label>
            Leave this field empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent-label">
          <input name="consent" type="checkbox" required />
          <span>
            {enabled
              ? "I agree that NISIMIN may use these details to respond to my inquiry."
              : "I understand this saves a local copy of my inquiry and does not send it to NISIMIN."}
          </span>
        </label>
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              Sending inquiry <LoaderCircle className="spin" size={16} />
            </>
          ) : enabled ? (
            <>
              Send inquiry <ArrowUpRight size={16} />
            </>
          ) : (
            <>
              Save my inquiry <Download size={16} />
            </>
          )}
        </Button>
        {enabled && state === "error" && (
          <button
            type="button"
            className="form-save"
            onClick={() => {
              const inquiry = readInquiry();
              if (inquiry) {
                saveInquiry(inquiry);
                setState("saved");
              }
            }}
          >
            Save a local copy instead <Download size={13} />
          </button>
        )}
      </fieldset>
      <p id="inquiry-note" className="form-note">
        {enabled
          ? "Your details will only be used to respond to this inquiry. We won’t add you to a marketing list."
          : "Online inquiries aren’t open yet. You can save your message for later; nothing will be sent."}{" "}
        <a href="/privacy/">Read our privacy notice</a>.
      </p>
      <div className="form-feedback" aria-live="polite" aria-atomic="true">
        {state === "error" && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {state === "saved" && (
          <p className="form-saved">
            <Check size={15} /> Your local copy is ready to save. Nothing has
            been submitted.
          </p>
        )}
        {state === "sent" && (
          <p className="form-success">
            <Check size={15} /> Your inquiry has been received. Thank you for
            reaching out.
          </p>
        )}
      </div>
    </form>
  );
}
