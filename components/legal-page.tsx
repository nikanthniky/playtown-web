import { Eyebrow } from "./ui";
const sections = {
  privacy: [
    [
      "About this draft",
      "This draft describes the intended approach to privacy on the PlayTown product website. It requires a review of the deployed website, hosting configuration, applicable law, and the responsible operator’s details before it can become a final privacy notice.",
    ],
    [
      "Information you choose to share",
      "You can contact hello@nisimin.com using an email link. When online enquiries are enabled, the form also collects your name, email address, optional organization, subject, message, and consent to respond. Submitted enquiries are sent to our configured delivery provider. Please avoid sending sensitive information in an initial enquiry.",
    ],
    [
      "Hosting and website analytics",
      "A hosting provider may process technical request information to deliver and protect the website. No application analytics script is included in this implementation. The final notice must confirm the actual hosting and analytics settings, relevant providers, purposes, and any applicable retention periods.",
    ],
    [
      "Cookies and browser storage",
      "The current application code does not create accounts, set application cookies, or persist visitor data in local storage. Hosting services, analytics configuration, and future features must be checked before publishing a final statement about cookies or similar technologies.",
    ],
    [
      "Your questions and choices",
      "For privacy questions, email hello@nisimin.com. The final notice must identify the responsible operator, explain applicable rights and request procedures, and confirm any required contact or jurisdiction details.",
    ],
    [
      "Product-specific privacy",
      "The PlayTown application requires its own privacy notice when made available. This website draft does not describe or authorize data processing within the app.",
    ],
  ],
  terms: [
    [
      "About this draft",
      "These draft website terms require founder and legal review. They are not a finalized agreement. The responsible operator, applicable jurisdiction, and any necessary consumer provisions must be confirmed before adoption.",
    ],
    [
      "Purpose of the website",
      "This website introduces PlayTown, a sports technology platform developed by NISIMIN. Product descriptions explain current direction and development status. They are not a promise that planned functionality is available or that a product will launch on a particular date.",
    ],
    [
      "Product availability",
      "PlayTown is preparing for launch. Public access, functionality, availability, and any future commercial terms will be communicated separately. No purchase or account registration is offered on this website.",
    ],
    [
      "Website materials and branding",
      "PlayTown branding and website materials are presented for company and product information. The website uses the approved PlayTown artwork supplied by the brand owner; trademark registration status has not been verified. This draft makes no representation about trademark registration. Any final intellectual property terms require review.",
    ],
    [
      "Responsible use",
      "Visitors are asked to use the website lawfully and avoid attempts to interfere with its operation or security. Any enforceable restrictions, remedies, or liability provisions must be assessed in the final legal review.",
    ],
    [
      "Contact and future updates",
      "Questions about the website can be sent to hello@nisimin.com. App store links, when available, lead to external services with their own terms and privacy notices. Product-specific terms will be separate from these product website terms. The final version must confirm how updates and any required notices will be handled.",
    ],
  ],
};
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  return (
    <>
      <section className="page-hero container">
        <Eyebrow>WEBSITE INFORMATION · DRAFT</Eyebrow>
        <h1>{kind === "privacy" ? "Privacy notice" : "Website terms"}</h1>
        <p className="lead">
          A transparent starting point. Pending founder and legal review.
        </p>
      </section>
      <div className="container">
        <article className="legal">
          <div className="draft-notice">
            <strong>Draft — review required.</strong> This content is not a
            finalized legal policy. Operational details and applicable legal
            requirements must be verified before public launch.
          </div>
          {sections[kind].map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          <p>
            Contact: <a href="mailto:hello@nisimin.com">hello@nisimin.com</a>
          </p>
        </article>
      </div>
    </>
  );
}
