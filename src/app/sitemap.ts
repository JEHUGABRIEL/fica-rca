import type { MetadataRoute } from "next";
import { actualites } from "@/lib/institution";
import { univers } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/fica-mobile", "/ouverture-de-compte", "/la-fica", "/la-fica/gouvernance", "/actualites", "/mediatheque", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.8 })),
    ...univers.flatMap((u) => [
      { url: `${site.url}/services/${u.slug}`, priority: 0.7 },
      ...u.produits
        .filter((p) => !p.pageDediee)
        .map((p) => ({ url: `${site.url}/services/${u.slug}/${p.slug}`, priority: 0.6 })),
    ]),
    ...actualites.map((a) => ({ url: `${site.url}/actualites/${a.slug}`, lastModified: a.date, priority: 0.5 })),
  ];
}
