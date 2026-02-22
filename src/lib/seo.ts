import type { PageSpec, SEOData } from './types';

const SITE_URL = 'https://ingredient-substitution.com';
const SITE_NAME = 'Ingredient Substitution Tool';

export function generateSEO(pageSpec: PageSpec): SEOData {
  return {
    title: pageSpec.title,
    description: pageSpec.metaDescription,
    canonical: `${SITE_URL}/substitute/${pageSpec.slug}/`,
    ogImage: `${SITE_URL}/og/${pageSpec.slug}.png`,
  };
}

export function generateMetaTags(pageSpec: PageSpec) {
  const seo = generateSEO(pageSpec);
  
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    alternates: {
      canonical: seo.canonical,
    },
  };
}

export function getHomePageMeta() {
  return {
    title: 'Ingredient Substitution Calculator | Find Perfect Recipe Alternatives',
    description: 'Free ingredient substitution calculator. Find exact ratios for egg, milk, flour, and butter replacements. Vegan, gluten-free, and dairy-free options with precise conversions.',
    openGraph: {
      title: 'Ingredient Substitution Calculator | Find Perfect Recipe Alternatives',
      description: 'Free ingredient substitution calculator with exact ratios for any recipe.',
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ingredient Substitution Calculator',
      description: 'Find exact ratios for egg, milk, flour, and butter replacements.',
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}
