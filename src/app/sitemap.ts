import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: siteUrl.toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/projects", siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: [new URL(project.hero, siteUrl).toString()],
    })),
  ];
}
