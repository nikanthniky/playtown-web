import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { site, absoluteUrl, indexable, productionOrigin } from "@/lib/site";
import "./globals.css";
const manrope = localFont({
  src: "./fonts/Manrope-Variable.ttf",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | PlayTown" },
  description: site.description,
  robots: { index: indexable, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        {productionOrigin && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://nisimin.com/#organization",
                  name: "NISIMIN",
                  url: site.parentUrl,
                  email: site.email,
                },
                {
                  "@type": "WebSite",
                  "@id": absoluteUrl("/#website"),
                  name: site.name,
                  url: site.url,
                  inLanguage: "en",
                  publisher: { "@id": "https://nisimin.com/#organization" },
                },
              ],
            }}
          />
        )}
      </body>
    </html>
  );
}
