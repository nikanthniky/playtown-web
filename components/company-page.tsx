import { notFound } from "next/navigation";
import { companyPages } from "@/lib/company-pages";
import {
  WhyPlayTown,
  IntroducingPlayTown,
  Capabilities,
  WhoWeEmpower,
  CommunityImpact,
  Vision,
  ContactSection,
  PageHero,
} from "./sections";
export function CompanyPage({ slug }: { slug: string }) {
  const p = companyPages[slug];
  if (!p) notFound();
  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.heading}
        description={p.description}
      />
      {slug === "about" && (
        <>
          <WhyPlayTown />
          <IntroducingPlayTown />
          <CommunityImpact />
        </>
      )}
      {(slug === "platform" || slug === "what-we-do") && <Capabilities />}
      {(slug === "for-athletes" || slug === "for-organizers") && (
        <>
          <WhoWeEmpower />
          <Capabilities />
        </>
      )}
      {(slug === "our-vision" || slug === "sports") && <Vision />}
      <ContactSection />
    </>
  );
}
