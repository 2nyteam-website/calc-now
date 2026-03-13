import type { MetadataRoute } from "next";

const BASE_URL = "https://www.calcnow.cc";

const CALCULATORS = [
  "compound-interest", "loan", "mortgage", "percentage", "bmi",
  "salary", "tip", "age", "discount", "unit-converter",
  "auto-loan", "roi", "margin-markup", "tdee", "body-fat",
  "date", "gpa", "password-generator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/all-calculators`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.2 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.2 },
  ];

  const toolPages = CALCULATORS.map((slug) => ({
    url: `${BASE_URL}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
