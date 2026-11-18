export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { absoluteUrl, indexable } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    ...(indexable ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
