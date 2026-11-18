export const inquiryInterests = [
  "Community & participation",
  "Schools, clubs & associations",
  "Partnerships & sponsorship",
  "Investment conversation",
  "General inquiry",
  "PlayTown enquiry",
] as const;
export type Inquiry = {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
  consent: boolean;
  website?: string;
};
export function validateInquiry(
  value: unknown,
): { data: Inquiry } | { error: string } {
  if (!value || typeof value !== "object")
    return { error: "Please complete the inquiry form." };
  const raw = value as Record<string, unknown>;
  const field = (key: string) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
  const name = field("name"),
    email = field("email"),
    organization = field("organization"),
    interest = field("interest"),
    message = field("message"),
    website = field("website");
  if (name.length < 2 || name.length > 100)
    return { error: "Please enter a name between 2 and 100 characters." };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Please enter a valid email address." };
  if (organization.length > 150)
    return { error: "Please shorten the organization name to 150 characters." };
  if (!inquiryInterests.some((item) => item === interest))
    return { error: "Please choose the subject of your inquiry." };
  if (message.length < 20 || message.length > 3000)
    return { error: "Please write a message between 20 and 3,000 characters." };
  if (raw.consent !== true)
    return {
      error:
        "Please confirm that we may use your details to respond to this inquiry.",
    };
  return {
    data: {
      name,
      email,
      organization,
      interest,
      message,
      consent: true,
      website,
    },
  };
}
