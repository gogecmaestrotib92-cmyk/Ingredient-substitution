import type { PageSpec, SEOData, Ingredient } from './types';
import { isPriorityPage } from './priorityPages';

const SITE_URL = 'https://ingredientsub.com';
const SITE_NAME = 'IngredientSub';

// Benefit phrases for title variation
const BENEFIT_PHRASES = [
  'Exact Ratios + Texture Guide',
  'Calculator & Pro Tips',
  'Tested Ratios + Results',
  'Perfect Results Every Time',
  'With Exact Measurements',
];

// Get deterministic benefit phrase based on slug hash
function getBenefitPhrase(slug: string): string {
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return BENEFIT_PHRASES[hash % BENEFIT_PHRASES.length];
}

// Build SEO-optimized title with keyword + benefit phrase
export function buildTitle(pageSpec: PageSpec, ingredient?: Ingredient): string {
  const { ingredientId, context, goal, diet, quantity, exclusion, variant, slug } = pageSpec;
  const ingredientName = formatIngredientName(ingredientId);
  const isPriority = isPriorityPage(slug);
  
  // Get substitute count for social proof
  const subCount = ingredient?.substitutes.length || 8;
  
  // Priority pages get enhanced titles
  if (isPriority) {
    if (diet && context) {
      const ctxName = formatContextName(context);
      return `Best ${capitalize(diet)} ${ingredientName} Substitute for ${ctxName} (${getBenefitPhrase(slug)})`;
    }
    
    if (context) {
      const ctxName = formatContextName(context);
      const differentiator = context === 'cake' || context === 'cookies' 
        ? 'Moist & Tender Results' 
        : context === 'brownies' 
          ? 'Fudgy Texture Guide'
          : getBenefitPhrase(slug);
      return `Best ${ingredientName} Substitute for ${ctxName} (${differentiator})`;
    }
    
    if (variant === 'base') {
      return `${ingredientName} Substitutes: ${subCount} Alternatives with Calculator & Texture Guide`;
    }
    
    if (goal) {
      const goalPhrase = getGoalPhrase(goal);
      return `${ingredientName} Substitutes for ${capitalize(goal)} – ${goalPhrase} | Calculator`;
    }
  }
  
  // Standard titles for non-priority pages
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

// Build SEO-optimized meta description (max 155-160 chars)
export function buildDescription(pageSpec: PageSpec, ingredient?: Ingredient): string {
  const { ingredientId, context, goal, diet, quantity, exclusion, slug } = pageSpec;
  const ingredientName = formatIngredientName(ingredientId).toLowerCase();
  const isPriority = isPriorityPage(slug);
  
  // Get top substitutes for specificity
  const topSubs = ingredient?.substitutes.slice(0, 2).map(s => s.displayName).join(' or ') || 'flax egg or applesauce';
  const topSub = ingredient?.substitutes[0]?.displayName || 'flax egg';
  
  // Priority pages get enhanced, unique descriptions
  if (isPriority) {
    if (diet && context) {
      const ctxName = formatContextName(context).toLowerCase();
      return `${capitalize(diet)} ${ingredientName} substitute for ${ctxName}: ${topSub} works best. Free calculator with exact ratios, texture impact, and ${diet} options.`;
    }
    
    if (context) {
      const ctxName = formatContextName(context).toLowerCase();
      const textureHint = context === 'cake' ? 'moist' : context === 'cookies' ? 'chewy' : context === 'brownies' ? 'fudgy' : 'perfect';
      return `Best ${ingredientName} substitute for ${ctxName}: try ${topSub}. Calculator shows exact ratios for ${textureHint} results. Vegan & allergy options included.`;
    }
    
    if (pageSpec.variant === 'base') {
      const count = ingredient?.substitutes.length || 8;
      return `${count} ${ingredientName} substitutes ranked with exact ratios. Calculator for any quantity. Texture guide, dietary filters, recipe tips included.`;
    }
  }
  
  // Standard descriptions
  if (diet && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Find ${diet} ${ingredientName} substitutes for ${ctxName}. Try ${topSubs}. Calculator gives exact ratios, texture impact, and pro tips for perfect results.`;
  }
  
  if (quantity && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Replace ${quantity} ${ingredientName}s in ${ctxName}: get exact amounts for ${topSubs}. Calculator shows ratios, texture changes, and when to avoid.`;
  }
  
  if (context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Best ${ingredientName} substitutes for ${ctxName}. Compare ${topSubs} with exact ratios, texture impact, and dietary tags. Free calculator.`;
  }
  
  if (goal) {
    return `${ingredientName} substitutes for ${goal}: ${topSubs} and more. See which alternatives provide the best ${goal} with exact conversion ratios.`;
  }
  
  if (diet) {
    return `${capitalize(diet)} ${ingredientName} alternatives: ${topSubs} and more. Calculator with exact ratios, texture notes, and recipe context filters.`;
  }
  
  if (exclusion) {
    const excluded = exclusion.replace('without-', '');
    return `${ingredientName} substitutes without ${excluded}. Try ${topSubs}. Calculator shows exact ratios, texture impact, and best recipe contexts.`;
  }
  
  return `${ingredientName} substitutes: ${topSubs} and more. Free calculator with exact ratios, texture comparisons, dietary filters, and recipe tips.`;
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
