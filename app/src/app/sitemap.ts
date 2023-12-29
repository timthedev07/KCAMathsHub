import { MetadataRoute } from "next";
import prisma from "../db";
import { PROD_HOST } from "../lib/hostAddr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const qs = await prisma.question.findMany({
    select: { id: true, editedAt: true, timestamp: true },
    orderBy: {
      timestamp: "desc",
    },
  });
  return [
    {
      url: `${PROD_HOST}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${PROD_HOST}/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...["CAS", "legislation", "the-credit-system", "your-role"].map((each) => ({
      url: `${PROD_HOST}/docs/guide/${each}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as "monthly",
      priority: 0.6,
    })),
    ...qs.map((each) => ({
      url: `${PROD_HOST}/questions/${each.id}`,
      lastModified: each.editedAt || each.timestamp,
      changeFrequency: "weekly" as "weekly",
      priority: 0.8,
    })),
  ];
}
