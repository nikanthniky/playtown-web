import type { Metadata } from "next";
function publicOrigin(value: string | undefined) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
      ? url.origin
      : null;
  } catch {
    return null;
  }
}
export const productionOrigin = publicOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://playtown.nisimin.com",
);
export const indexable =
  Boolean(productionOrigin) &&
  process.env.NEXT_PUBLIC_NOINDEX !== "true" &&
  process.env.VERCEL_ENV !== "preview";
export const site = {
  name: "PlayTown",
  url: productionOrigin || "http://localhost:3000",
  email: "hello@nisimin.com",
  parentUrl: "https://nisimin.com",
  title: "PlayTown — Your game. Your people. Your community.",
  description:
    "PlayTown connects community sport: athlete identities, sporting achievements, tournament discovery, fixtures, scoring and the people behind the game. A product by NISIMIN.",
};
export const company = {
  name: site.name,
  tagline: "Your game. Your people.",
  description: site.description,
};
export function absoluteUrl(path: string) {
  return new URL(path, `${site.url}/`).href;
}
export function metadata(
  title: string,
  description: string,
  path: string,
  { absoluteTitle = false, index = true } = {},
): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | PlayTown`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(productionOrigin
      ? { alternates: { canonical: absoluteUrl(path) } }
      : {}),
    robots: { index: index && indexable, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      ...(productionOrigin ? { url: absoluteUrl(path) } : {}),
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "PlayTown — Your game. Your people. A product by NISIMIN.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
function email(value: string | undefined) {
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : site.email;
}
function officialSocial(value: string | undefined, hosts: string[]) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" &&
      hosts.includes(url.hostname) &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
export const contact = {
  email: email(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  linkedin: officialSocial(process.env.NEXT_PUBLIC_LINKEDIN_URL, [
    "linkedin.com",
    "www.linkedin.com",
  ]),
  instagram: officialSocial(process.env.NEXT_PUBLIC_INSTAGRAM_URL, [
    "instagram.com",
    "www.instagram.com",
  ]),
  inquiriesEnabled: process.env.NEXT_PUBLIC_INQUIRIES_ENABLED === "true",
};
export const navigation = [
  { label: "Our story", href: "/#why-playtown", section: "why-playtown" },
  { label: "The platform", href: "/platform/", section: "platform" },
  { label: "The community", href: "/#community", section: "community" },
  { label: "Our vision", href: "/#vision", section: "vision" },
];
function storeUrl(value: string | undefined, host: string) {
  try {
    const url = new URL(value || "");
    if (
      url.protocol !== "https:" ||
      url.hostname !== host ||
      url.username ||
      url.password ||
      url.port
    )
      return null;
    if (
      host === "play.google.com" &&
      (url.pathname !== "/store/apps/details" || !url.searchParams.get("id"))
    )
      return null;
    if (host === "apps.apple.com" && !/\/id\d+/.test(url.pathname)) return null;
    return url.href;
  } catch {
    return null;
  }
}
export const playtownDownloads = {
  android: storeUrl(
    process.env.NEXT_PUBLIC_PLAYTOWN_ANDROID_URL,
    "play.google.com",
  ),
  ios: storeUrl(process.env.NEXT_PUBLIC_PLAYTOWN_IOS_URL, "apps.apple.com"),
};
