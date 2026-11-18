import { metadata } from "./site";
export const companyPages: Record<
  string,
  { title: string; eyebrow: string; heading: string; description: string }
> = {
  about: {
    title: "Our story",
    eyebrow: "THE REASON BEHIND PLAYTOWN",
    heading: "For the game beyond the spotlight.",
    description:
      "PlayTown is a community-driven sports technology platform developed by NISIMIN. We’re building around the people who play, organize and support grassroots sport.",
  },
  "what-we-do": {
    title: "What PlayTown does",
    eyebrow: "COMMUNITY SPORT. CONNECTED.",
    heading: "Bring your sporting journey together.",
    description:
      "Athlete identity, sporting records, tournament discovery and competition workflows, connected around the people behind the game.",
  },
  "our-vision": {
    title: "Our vision",
    eyebrow: "START LOCAL. THINK LONG TERM.",
    heading: "A more connected future for sport.",
    description:
      "Our ambition is a multi-sport ecosystem that makes participation, visibility and recognition more accessible. A direction we’re working towards, one useful product capability at a time.",
  },
  partners: {
    title: "Community enquiries",
    eyebrow: "FOR THE PEOPLE WHO BRING SPORT TOGETHER",
    heading: "Let’s talk about your community.",
    description:
      "Organize tournaments, represent a club or institution, or support local sport? Tell us about your needs and explore where PlayTown could help.",
  },
  contact: {
    title: "Contact PlayTown",
    eyebrow: "LET’S START A CONVERSATION",
    heading: "What does your sporting community need?",
    description:
      "Ask about PlayTown, tournament workflows or app availability. Our team at NISIMIN can help you explore the next step.",
  },
  sports: {
    title: "Sports on PlayTown",
    eyebrow: "A MULTI-SPORT DIRECTION",
    heading: "Different games. A shared sense of belonging.",
    description:
      "PlayTown’s ambition spans community sport. Current canonical scoring workflows focus on volleyball; broader sport-specific support remains part of the longer-term direction.",
  },
  "for-athletes": {
    title: "For athletes",
    eyebrow: "YOUR GAME HAS A STORY",
    heading: "Give your sporting journey a place.",
    description:
      "Build a sporting identity, discover public athletes and published competitions, and connect eligible achievements to your Sports Passport.",
  },
  "for-organizers": {
    title: "For tournament organizers",
    eyebrow: "FOR THE PEOPLE BEHIND MATCH DAY",
    heading: "You bring the game to life.",
    description:
      "Connect tournament creation, team entries, staff responsibilities, fixtures and results in a workflow built around the people making competition possible.",
  },
  platform: {
    title: "The PlayTown platform",
    eyebrow: "FROM IDENTITY TO MATCH DAY",
    heading: "Your sport. More connected.",
    description:
      "Explore PlayTown’s implemented capabilities and understand their current scope, release status and future direction.",
  },
};
export function companyMetadata(slug: string) {
  const p = companyPages[slug];
  return metadata(p.title, p.description, `/${slug}/`);
}
