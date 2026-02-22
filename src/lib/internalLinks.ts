import type { PageSpec, RelatedLink, Cluster } from './types';
import { buildPageSpecs, getPageSpecBySlug } from './slugs';

// Cross-cluster mapping for internal linking
const crossClusterLinks: Record<Cluster, string[]> = {
  egg: ['milk-in-cake', 'butter-in-cookies', 'flour-in-cake'],
  milk_cream: ['egg-in-cake', 'flour-in-pancakes', 'butter-in-cake'],
  flour_butter: ['egg-in-cookies', 'milk-in-bread', 'egg-in-brownies'],
};

// Get related links for a page
export function getRelatedLinks(pageSpec: PageSpec): RelatedLink[] {
  const links: RelatedLink[] = [];
  const allSpecs = buildPageSpecs();
  
  // 1. Add base ingredient page (if not already on it)
  const baseSlugs: Record<string, string> = {
    egg: 'egg',
    milk: 'milk',
    heavy_cream: 'heavy-cream',
    half_and_half: 'half-and-half',
    whipping_cream: 'whipping-cream',
    all_purpose_flour: 'all-purpose-flour',
    self_rising_flour: 'self-rising-flour',
    cake_flour: 'cake-flour',
    bread_flour: 'bread-flour',
    butter: 'butter',
  };
  
  const baseSlug = baseSlugs[pageSpec.ingredientId];
  if (baseSlug && baseSlug !== pageSpec.slug) {
    const baseSpec = getPageSpecBySlug(baseSlug);
    if (baseSpec) {
      links.push({
        slug: baseSlug,
        title: baseSpec.h1,
        type: 'base',
      });
    }
  }
  
  // 2. Add 3 sibling context pages (same ingredient, different context)
  const siblingContexts = allSpecs
    .filter(spec => 
      spec.ingredientId === pageSpec.ingredientId &&
      spec.variant === 'context' &&
      spec.slug !== pageSpec.slug &&
      spec.context !== pageSpec.context
    )
    .slice(0, 3);
  
  siblingContexts.forEach(spec => {
    links.push({
      slug: spec.slug,
      title: spec.h1,
      type: 'context',
    });
  });
  
  // 3. Add 2 diet variant pages (if they exist)
  const dietPages = allSpecs
    .filter(spec =>
      spec.ingredientId === pageSpec.ingredientId &&
      (spec.variant === 'diet' || spec.diet) &&
      spec.slug !== pageSpec.slug
    )
    .slice(0, 2);
  
  dietPages.forEach(spec => {
    links.push({
      slug: spec.slug,
      title: spec.h1,
      type: 'diet',
    });
  });
  
  // 4. Add 2 cross-cluster recommendations
  const crossSlugs = crossClusterLinks[pageSpec.cluster] || [];
  const crossPages = crossSlugs
    .map(slug => getPageSpecBySlug(slug))
    .filter((spec): spec is PageSpec => spec !== undefined && spec.slug !== pageSpec.slug)
    .slice(0, 2);
  
  crossPages.forEach(spec => {
    links.push({
      slug: spec.slug,
      title: spec.h1,
      type: 'cross-cluster',
    });
  });
  
  return links;
}

// Get popular pages for homepage
export function getPopularPages(): Array<{ slug: string; title: string; category: string }> {
  return [
    { slug: 'egg-in-cake', title: 'Egg Substitute for Cake', category: 'Egg' },
    { slug: 'egg-in-cookies', title: 'Egg Substitute for Cookies', category: 'Egg' },
    { slug: 'vegan-egg-in-brownies', title: 'Vegan Egg in Brownies', category: 'Egg' },
    { slug: 'milk-in-mac-and-cheese', title: 'Milk Substitute for Mac & Cheese', category: 'Milk' },
    { slug: 'heavy-cream-in-pasta', title: 'Heavy Cream Substitute for Pasta', category: 'Cream' },
    { slug: 'dairy-free-cream-substitute', title: 'Dairy-Free Cream', category: 'Cream' },
    { slug: 'butter-in-cookies', title: 'Butter Substitute for Cookies', category: 'Butter' },
    { slug: 'vegan-butter-substitute', title: 'Vegan Butter', category: 'Butter' },
    { slug: 'gluten-free-flour-substitute', title: 'Gluten-Free Flour', category: 'Flour' },
    { slug: 'self-rising-flour-substitute', title: 'Self-Rising Flour', category: 'Flour' },
  ];
}

// Get cluster info for homepage
export function getClusters() {
  return [
    {
      id: 'egg',
      name: 'Egg Substitutes',
      description: 'Vegan and allergy-friendly egg replacements for baking',
      pages: ['egg', 'egg-in-cake', 'egg-in-cookies', 'vegan-egg-in-brownies'],
      icon: '🥚',
    },
    {
      id: 'milk_cream',
      name: 'Milk & Cream',
      description: 'Dairy-free alternatives for milk and heavy cream',
      pages: ['milk', 'heavy-cream', 'dairy-free-milk-substitute', 'heavy-cream-in-pasta'],
      icon: '🥛',
    },
    {
      id: 'flour_butter',
      name: 'Flour & Butter',
      description: 'Gluten-free flours and vegan butter options',
      pages: ['all-purpose-flour', 'butter', 'gluten-free-flour-substitute', 'vegan-butter-substitute'],
      icon: '🧈',
    },
  ];
}
