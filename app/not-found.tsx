import type { Metadata } from "next";
import { Button, Eyebrow } from "@/components/ui";
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <section className="page-hero container">
      <Eyebrow>404 · PAGE NOT FOUND</Eyebrow>
      <h1>Let’s find your way back.</h1>
      <p className="lead">
        Explore the PlayTown platform, meet the community, or contact us for
        help.
      </p>
      <Button href="/platform/">Explore PlayTown</Button>
    </section>
  );
}
