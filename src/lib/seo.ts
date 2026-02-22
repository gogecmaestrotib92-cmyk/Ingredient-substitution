import type { PageSpec, SEOData, Ingredient } from './types';

const SITE_URL = 'https://ingredientsub.com';
const SITE_NAME = 'IngredientSub';

// Build SEO-optimized title with keyword + benefit phrase
export function buildTitle(pageSpec: PageSpec, ingredient?: Ingredient): string {
  const { ingredientId, context, goal, diet, quantity, exclusion, variant } = pageSpec;
  const ingredientName = formatIngredientName(ingredientId);
  
  // Get substitute count for social proof
  const subCount = ingredient?.substitutes.length || 8;
  
  if (diet && context) {
    const ctxName = formatContextName(context);
    return `${capitalize(diet)} ${ingredientName} Substitutes for ${ctxName} – ${subCount} Options with Exact Ratios`;
  }
  
  if (quantity && context) {
    const ctxName = formatContextName(context);
    return `Replace ${quantity} ${ingredientName}s in ${ctxName} – Calculator & Texture Guide`;
  }
  
  if (context) {
    const ctxName = formatContextName(context);
    return `${ingredientName} Substitutes for ${ctxName} – Calculator & Exact Ratios`;
  }
  
  if (goal) {
    const goalPhrase = getGoalPhrase(goal);
    return `${ingredientName} Substitutes for ${capitalize(goal)} – ${goalPhrase}`;
  }
  
  if (diet) {
    return `${capitalize(diet)} ${ingredientName} Substitutes – ${subCount} Tested Alternatives`;
  }
  
  if (quantity) {
    return `Replace ${quantity} ${ingredientName}s – Conversion Calculator & Ratios`;
  }
  
  if (exclusion) {
    const excluded = exclusion.replace('without-', '');
    return `${ingredientName} Substitutes Without ${capitalize(excluded)} – Best Alternatives`;
  }
  
  // Base pages
  if (variant === 'base') {
    return `${ingredientName} Substitutes – ${subCount} Alternatives with Calculator`;
  }
  
  return `${ingredientName} Substitutes – Conversion Calculator | ${SITE_NAME}`;
}

// Build SEO-optimized meta description
export function buildDescription(pageSpec: PageSpec, ingredient?: Ingredient): string {
  const { ingredientId, context, goal, diet, quantity, exclusion } = pageSpec;
  const ingredientName = formatIngredientName(ingredientId).toLowerCase();
  
  // Get top substitutes for specificity
  const topSubs = ingredient?.substitutes.slice(0, 2).map(s => s.displayName).join(' or ') || 'flax egg or applesauce';
  
  if (diet && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Find ${diet} ${ingredientName} substitutes for ${ctxName}. Try ${topSubs}. Calculator gives exact ratios, texture impact, and pro tips for perfect results.`;
  }
  
  if (quantity && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Replace ${quantity} ${ingredientName}s in ${ctxName}: get exact amounts for ${topSubs}. Our calculator shows ratios, texture changes, and when to avoid each option.`;
  }
  
  if (context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Best ${ingredientName} substitutes for ${ctxName}. Compare ${topSubs} with exact ratios, texture impact, and dietary tags. Free calculator for any quantity.`;
  }
  
  if (goal) {
    return `${ingredientName} substitutes for ${goal}: compare ${topSubs} and more. See which alternatives provide the best ${goal} with exact conversion ratios.`;
  }
  
  if (diet) {
    return `${capitalize(diet)} ${ingredientName} alternatives: ${topSubs} and more. Calculator with exact ratios, texture notes, and recipe context filters.`;
  }
  
  if (exclusion) {
    const excluded = exclusion.replace('without-', '');
    return `${ingredientName} substitutes without ${excluded}. Try ${topSubs} instead. Calculator shows exact ratios, texture impact, and best recipe contexts.`;
  }
  
  return `${ingredientName} substitutes: ${topSubs} and more. Free calculator with exact ratios, texture comparisons, dietary filters, and recipe-specific recommendations.`;
}

// Generate canonical URL
export function canonical(slug: string): string {
  return `${SITE_URL}/substitute/${slug}/`;
}

export function generateSEO(pageSpec: PageSpec, ingredient?: Ingredient): SEOData {
  return {
    title: buildTitle(pageSpec, ingredient),
    description: buildDescription(pageSpec, ingredient),
    canonical: canonical(pageSpec.slug),
    ogImage: `${SITE_URL}/og-default.png`,
  };
}

export function generateMetaTags(pageSpec: PageSpec, ingredient?: Ingredient) {
  const seo = generateSEO(pageSpec, ingredient);
  
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: SITE_NAME,
      type: 'website' as const,
      locale: 'en_US',
      images: [{
        url: seo.ogImage || `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: pageSpec.h1,
      }],
    },
    twitter: {
      card: 'summary_large_image' as const,
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
    title: 'Ingredient Substitution Calculator – Exact Ratios for Eggs, Milk, Flour & Butter',
    description: 'Free ingredient substitution calculator. Get exact ratios for egg, milk, flour, and butter replacements. Filter by vegan, gluten-free, dairy-free. Texture guides included.',
    openGraph: {
      title: 'Ingredient Substitution Calculator – Exact Ratios for Any Recipe',
      description: 'Free calculator with exact conversion ratios for eggs, milk, flour, butter. Dietary filters, texture impact notes, and recipe-specific recommendations.',
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [{
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'IngredientSub Calculator',
      }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Ingredient Substitution Calculator – Exact Ratios',
      description: 'Find exact ratios for egg, milk, flour, and butter replacements. Dietary filters included.',
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

// Helper functions
function formatIngredientName(id: string): string {
  const nameMap: Record<string, string> = {
    egg: 'Egg',
    milk: 'Milk',
    heavy_cream: 'Heavy Cream',
    half_and_half: 'Half and Half',
    whipping_cream: 'Whipping Cream',
    all_purpose_flour: 'Flour',
    self_rising_flour: 'Self-Rising Flour',
    cake_flour: 'Cake Flour',
    bread_flour: 'Bread Flour',
    butter: 'Butter',
  };
  return nameMap[id] || id.split('_').map(capitalize).join(' ');
}

function formatContextName(context: string): string {
  const contextMap: Record<string, string> = {
    mac_and_cheese: 'Mac & Cheese',
    banana_bread: 'Banana Bread',
    mashed_potatoes: 'Mashed Potatoes',
  };
  return contextMap[context] || context.split('_').map(capitalize).join(' ');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getGoalPhrase(goal: string): string {
  const phrases: Record<string, string> = {
    binding: 'Best Options for Structure',
    leavening: 'Options That Add Lift',
    moisture: 'Keep Recipes Moist',
    richness: 'Maintain Rich Flavor',
    fluffy: 'Light & Airy Results',
    chewy: 'Perfect Chewy Texture',
    browning: 'Golden Brown Results',
    structure: 'Strong Structure Options',
    tenderness: 'Tender Baked Goods',
  };
  return phrases[goal] || 'Calculator & Guide';
}
