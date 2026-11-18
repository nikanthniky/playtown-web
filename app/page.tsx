import {
  Hero,
  WhyPlayTown,
  IntroducingPlayTown,
  Capabilities,
  WhoWeEmpower,
  CommunityImpact,
  Vision,
  ContactSection,
} from "@/components/sections";
import { metadata, site } from "@/lib/site";
export const generateMetadata = () =>
  metadata(site.title, site.description, "/", { absoluteTitle: true });
export default function Home() {
  return (
    <>
      <Hero />
      <WhyPlayTown />
      <IntroducingPlayTown />
      <Capabilities />
      <WhoWeEmpower />
      <CommunityImpact />
      <Vision />
      <ContactSection />
    </>
  );
}
