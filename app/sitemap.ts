import type { MetadataRoute } from "next";
import { absoluteUrl, indexable } from "@/lib/site";
export const publicRoutes = [
  "/",
  "/about/",
  "/platform/",
  "/what-we-do/",
  "/sports/",
  "/for-athletes/",
  "/for-organizers/",
  "/our-vision/",
  "/partners/",
  "/contact/",
];
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable
    ? publicRoutes.map((path) => ({ url: absoluteUrl(path) }))
    : [];
}
