/**
 * Priority Pages Configuration
 * High-intent core pages selected for enhanced SEO treatment.
 * These pages receive expanded intros, more FAQs, pro tips, and deeper internal linking.
 */

export const PRIORITY_PAGES = new Set([
  // Core egg context pages (highest search volume)
  'egg-in-cake',
  'egg-in-cookies',
  'egg-in-brownies',
  'egg-in-muffins',
  'egg-in-pancakes',
  'egg-in-banana-bread',
  
  // Vegan egg variants (high intent)
  'vegan-egg-in-cake',
  'vegan-egg-in-brownies',
  'vegan-egg-in-cookies',
  
  // Dairy context pages
  'milk-in-mac-and-cheese',
  'milk-in-pancakes',
  'heavy-cream-in-pasta',
  'heavy-cream-in-soup',
  'butter-in-cookies',
  'butter-in-cake',
  
  // Flour specialty pages
  'gluten-free-flour-substitute',
  'self-rising-flour-substitute',
  'cake-flour-substitute',
  
  // Base ingredient pages
  'egg',
  'milk',
  'butter',
  'heavy-cream',
  'all-purpose-flour',
]);

export function isPriorityPage(slug: string): boolean {
  return PRIORITY_PAGES.has(slug);
}

export function getPriorityPageCount(): number {
  return PRIORITY_PAGES.size;
}
