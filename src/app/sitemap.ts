import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/slugs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ingredientsub.com';
  
  // Get all substitute page slugs
  const slugs = getAllSlugs();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
  
  // Dynamic substitute pages
  const substitutePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/substitute/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  return [...staticPages, ...substitutePages];
}
