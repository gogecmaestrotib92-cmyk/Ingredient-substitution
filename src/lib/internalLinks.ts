import type { PageSpec, RelatedLink, Cluster } from './types';
import { buildPageSpecs, getPageSpecBySlug } from './slugs';
import { isPriorityPage } from './priorityPages';
import { isQuantityPage } from './quantityPages';

// Cross-cluster mapping for internal linking - expanded with more relevant links
const crossClusterLinks: Record<Cluster, string[]> = {
  egg: ['milk-in-cake', 'butter-in-cookies', 'flour-in-cake', 'dairy-free-milk-substitute', 'vegan-butter-substitute'],
  milk_cream: ['egg-in-cake', 'flour-in-pancakes', 'butter-in-cake', 'vegan-egg-in-brownies', 'flour-in-muffins'],
  flour_butter: ['egg-in-cookies', 'milk-in-bread', 'egg-in-brownies', 'heavy-cream-in-pasta', 'milk-in-mac-and-cheese'],
};

// Priority contexts for each ingredient (most searched)
const priorityContexts: Record<string, string[]> = {
  egg: ['cake', 'cookies', 'brownies', 'pancakes', 'muffins'],
  milk: ['mac_and_cheese', 'cake', 'pancakes', 'mashed_potatoes', 'bread'],
  heavy_cream: ['pasta', 'soup', 'sauce', 'coffee', 'dessert'],
  butter: ['cookies', 'cake', 'pie', 'bread', 'frosting'],
  all_purpose_flour: ['cake', 'cookies', 'bread', 'muffins', 'pancakes'],
};

// Get related links for a page
// Priority pages get: base + 3 context + 2 diet + 2 cross-cluster = 8 links
// Quantity pages get: base + 2 quantity + 2 context + 1 diet + 1 cross-cluster = 7 links
// Standard pages get: base + 2 context + 1 diet + 1 cross-cluster = 5 links
export function getRelatedLinks(pageSpec: PageSpec): RelatedLink[] {
  const links: RelatedLink[] = [];
  const allSpecs = buildPageSpecs();
  const isPriority = isPriorityPage(pageSpec.slug);
  const isQuantity = isQuantityPage(pageSpec.slug);
  
  // 1. ALWAYS add base ingredient page (if not already on it)
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
        priority: 1,
      });
    }
  }
  
  // 1.5. For quantity pages, add other quantity variants (2 eggs, 3 eggs, 4 eggs)
  if (isQuantity) {
    const currentQuantity = pageSpec.quantity || 1;
    const quantitySiblings = allSpecs
      .filter(spec =>
        spec.ingredientId === pageSpec.ingredientId &&
        spec.variant === 'quantity' &&
        spec.slug !== pageSpec.slug &&
        spec.quantity !== currentQuantity
      )
      .sort((a, b) => (a.quantity || 1) - (b.quantity || 1))
      .slice(0, 2); // Link to 2 other quantities
    
    quantitySiblings.forEach((spec, index) => {
      links.push({
        slug: spec.slug,
        title: spec.h1,
        type: 'quantity',
        priority: 1.5 + index * 0.1,
      });
    });
  }
  
  // 2. Add sibling context pages (same ingredient, different context)
  // Priority pages get 3, standard get 2
  const contextLimit = isPriority ? 3 : 2;
  const priority = priorityContexts[pageSpec.ingredientId] || [];
  const siblingContexts = allSpecs
    .filter(spec => 
      spec.ingredientId === pageSpec.ingredientId &&
      spec.variant === 'context' &&
      spec.slug !== pageSpec.slug &&
      spec.context !== pageSpec.context
    )
    .sort((a, b) => {
      const aIdx = priority.indexOf(a.context || '');
      const bIdx = priority.indexOf(b.context || '');
      if (aIdx === -1 && bIdx === -1) return 0;
      if (aIdx === -1) return 1;
      if (bIdx === -1) return -1;
      return aIdx - bIdx;
    })
    .slice(0, contextLimit);
  
  siblingContexts.forEach((spec, index) => {
    links.push({
      slug: spec.slug,
      title: spec.h1,
      type: 'context',
      priority: 2 + index,
    });
  });
  
  // 3. Add diet variant pages
  // Priority pages get 2, standard get 1
  const dietLimit = isPriority ? 2 : 1;
  const diets = ['vegan', 'dairy-free', 'gluten-free', 'paleo', 'keto'];
  const dietPages = allSpecs
    .filter(spec =>
      spec.ingredientId === pageSpec.ingredientId &&
      spec.diet &&
      spec.slug !== pageSpec.slug &&
      spec.diet !== pageSpec.diet
    )
    .sort((a, b) => {
      const aIdx = diets.indexOf(a.diet || '');
      const bIdx = diets.indexOf(b.diet || '');
      return aIdx - bIdx;
    })
    .slice(0, dietLimit);
  
  dietPages.forEach((spec, index) => {
    links.push({
      slug: spec.slug,
      title: spec.h1,
      type: 'diet',
      priority: 5 + index,
    });
  });
  
  // 4. Add cross-cluster recommendations
  // Priority pages get 2, standard get 1
  const crossLimit = isPriority ? 2 : 1;
  const crossSlugs = crossClusterLinks[pageSpec.cluster] || [];
  const crossPages = crossSlugs
    .map(slug => getPageSpecBySlug(slug))
    .filter((spec): spec is PageSpec => spec !== undefined && spec.slug !== pageSpec.slug)
    .slice(0, crossLimit);
  
  crossPages.forEach((spec, index) => {
    links.push({
      slug: spec.slug,
      title: spec.h1,
      type: 'cross-cluster',
      priority: 7 + index,
    });
  });
  
  // Sort by priority and return
  return links.sort((a, b) => (a.priority || 99) - (b.priority || 99));
}

// Get sibling pages within same cluster for breadcrumb/nav
export function getClusterSiblings(pageSpec: PageSpec): Array<{ slug: string; title: string }> {
  const allSpecs = buildPageSpecs();
  return allSpecs
    .filter(spec => 
      spec.cluster === pageSpec.cluster &&
      spec.variant === 'base' &&
      spec.slug !== pageSpec.slug
    )
    .map(spec => ({
      slug: spec.slug,
      title: spec.h1,
    }))
    .slice(0, 4);
}

// Get popular pages for homepage - updated with higher traffic terms
export function getPopularPages(): Array<{ slug: string; title: string; category: string }> {
  return [
    { slug: 'egg-in-cake', title: 'Egg Substitute for Cake', category: 'Egg' },
    { slug: 'egg-in-cookies', title: 'Egg Substitute for Cookies', category: 'Egg' },
    { slug: 'vegan-egg-substitute', title: 'Vegan Egg Substitutes', category: 'Egg' },
    { slug: 'egg-in-brownies', title: 'Egg Substitute for Brownies', category: 'Egg' },
    { slug: 'milk-in-mac-and-cheese', title: 'Milk Substitute for Mac & Cheese', category: 'Milk' },
    { slug: 'heavy-cream-in-pasta', title: 'Heavy Cream Substitute for Pasta', category: 'Cream' },
    { slug: 'dairy-free-milk-substitute', title: 'Dairy-Free Milk', category: 'Milk' },
    { slug: 'butter-in-cookies', title: 'Butter Substitute for Cookies', category: 'Butter' },
    { slug: 'vegan-butter-substitute', title: 'Vegan Butter', category: 'Butter' },
    { slug: 'gluten-free-flour-substitute', title: 'Gluten-Free Flour', category: 'Flour' },
    { slug: 'all-purpose-flour', title: 'Flour Substitutes', category: 'Flour' },
    { slug: 'egg', title: 'Egg Substitutes Overview', category: 'Egg' },
  ];
}

// Get cluster info for homepage
export function getClusters() {
  return [
    {
      id: 'egg',
      name: 'Egg Substitutes',
      description: 'Vegan and allergy-friendly egg replacements for baking and cooking',
      pages: ['egg', 'egg-in-cake', 'egg-in-cookies', 'egg-in-brownies', 'vegan-egg-substitute'],
      icon: '🥚',
      linkCount: 45,
    },
    {
      id: 'milk_cream',
      name: 'Milk & Cream',
      description: 'Dairy-free alternatives for milk, heavy cream, and half-and-half',
      pages: ['milk', 'heavy-cream', 'dairy-free-milk-substitute', 'heavy-cream-in-pasta', 'milk-in-mac-and-cheese'],
      icon: '🥛',
      linkCount: 38,
    },
    {
      id: 'flour_butter',
      name: 'Flour & Butter',
      description: 'Gluten-free flour options and vegan butter replacements',
      pages: ['all-purpose-flour', 'butter', 'gluten-free-flour-substitute', 'vegan-butter-substitute', 'butter-in-cookies'],
      icon: '🧈',
      linkCount: 42,
    },
  ];
}

// Get breadcrumb links for page
export function getBreadcrumbs(pageSpec: PageSpec): Array<{ label: string; href: string }> {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: getClusters().find(c => c.id === pageSpec.cluster)?.name || 'Substitutes', href: '/' },
  ];
  
  // Add base page if not on it
  const baseSlugs: Record<string, string> = {
    egg: 'egg',
    milk: 'milk',
    heavy_cream: 'heavy-cream',
    butter: 'butter',
    all_purpose_flour: 'all-purpose-flour',
  };
  
  const baseSlug = baseSlugs[pageSpec.ingredientId];
  if (baseSlug && baseSlug !== pageSpec.slug) {
    const baseSpec = getPageSpecBySlug(baseSlug);
    if (baseSpec) {
      breadcrumbs.push({
        label: baseSpec.h1.replace(' Substitutes', '').replace(' Substitute', ''),
        href: `/substitute/${baseSlug}/`,
      });
    }
  }
  
  // Current page
  breadcrumbs.push({
    label: pageSpec.h1,
    href: `/substitute/${pageSpec.slug}/`,
  });
  
  return breadcrumbs;
}
