import type { PageSpec, Ingredient, SubstituteOption } from './types';

/**
 * Detect if a slug is a quantity-based page
 * Patterns: "egg-for-2-eggs", "egg-for-3-eggs", "2-eggs-in-cake"
 */
export function isQuantityPage(slug: string): boolean {
  // Pattern: ingredient-for-N-unit (e.g., egg-for-2-eggs)
  const forPattern = /-for-(\d+)-/;
  // Pattern: N-units-in-context (e.g., 2-eggs-in-cake)
  const numPattern = /^(\d+)-\w+-in-/;
  
  return forPattern.test(slug) || numPattern.test(slug);
}

/**
 * Extract quantity from slug
 */
export function extractQuantityFromSlug(slug: string): number {
  // Pattern: ingredient-for-N-unit
  const forMatch = slug.match(/-for-(\d+)-/);
  if (forMatch) return parseInt(forMatch[1], 10);
  
  // Pattern: N-units-in-context
  const numMatch = slug.match(/^(\d+)-/);
  if (numMatch) return parseInt(numMatch[1], 10);
  
  return 1;
}

/**
 * Extract unit name from slug for display
 */
export function extractUnitFromSlug(slug: string, ingredientId: string): string {
  const unitMap: Record<string, string> = {
    egg: 'egg',
    milk: 'cup',
    heavy_cream: 'cup',
    butter: 'cup',
    all_purpose_flour: 'cup',
  };
  return unitMap[ingredientId] || 'unit';
}

/**
 * Build a direct, specific intro for quantity pages (120-160 words)
 */
export function buildQuantityIntro(pageSpec: PageSpec, ingredient: Ingredient): string {
  const quantity = pageSpec.quantity || extractQuantityFromSlug(pageSpec.slug);
  const ingredientName = ingredient.displayName.toLowerCase();
  const unitName = quantity === 1 ? ingredientName : `${ingredientName}s`;
  
  // Get top 2 substitutes
  const sub1 = ingredient.substitutes[0];
  const sub2 = ingredient.substitutes[1];
  
  // Get context if specified
  const context = pageSpec.context;
  const contextName = context ? context.replace(/_/g, ' ') : 'baking';
  
  // Calculate amounts for top substitutes
  const sub1Amount = formatAmount(sub1.baseRatio.amount * quantity, sub1.baseRatio.unit);
  const sub2Amount = formatAmount(sub2.baseRatio.amount * quantity, sub2.baseRatio.unit);
  
  // Get texture impacts
  const texture1 = sub1.textureImpact;
  const texture2 = sub2.textureImpact;
  
  // Get avoid warning
  const avoidContext = sub1.avoidIn[0] ? sub1.avoidIn[0].replace(/_/g, ' ') : 'delicate recipes';
  
  // Build intro based on pattern variation
  const hash = pageSpec.slug.length % 3;
  
  const intros = [
    // Pattern 0: Problem-solution
    `Need to replace ${quantity} ${unitName} in your recipe? You have several reliable options. For most ${contextName} recipes, ${sub1.displayName} works best—use ${sub1Amount} and expect ${texture1} texture results. Alternatively, ${sub2.displayName} at ${sub2Amount} provides ${texture2} texture impact with a different nutritional profile. When replacing ${quantity} ${unitName}, the key is matching your substitute to your recipe type. Each option behaves differently depending on whether you&apos;re making cakes, cookies, or savory dishes. Important note: avoid ${sub1.displayName} in ${avoidContext} where texture changes become more noticeable. The calculator below automatically scales all ratios for ${quantity} ${unitName} so you can compare options and find the perfect match for your specific recipe.`,
    
    // Pattern 1: Direct guidance
    `Replacing ${quantity} ${unitName} requires more than simply doubling a single-${ingredientName} ratio. At higher quantities, some substitutes perform better than others due to how they interact with other ingredients. ${sub1.displayName} remains the top choice—use ${sub1Amount} for ${texture1} texture similarity in most recipes. ${sub2.displayName} at ${sub2Amount} offers ${texture2} results and works particularly well when you want additional moisture. For ${contextName} specifically, both options maintain structure while accommodating dietary needs. One caution: ${sub1.displayName} can struggle in ${avoidContext}, so consider ${sub2.displayName} for those applications. Use the calculator below to see exact amounts for all ${ingredient.substitutes.length} substitutes, scaled precisely for ${quantity} ${unitName}.`,
    
    // Pattern 2: Expert advice
    `When a recipe calls for ${quantity} ${unitName}, choosing the right substitute becomes even more important. At this quantity, texture and binding differences become more pronounced. ${sub1.displayName} is the most reliable option—${sub1Amount} provides ${texture1} results in most ${contextName} recipes. For a different approach, ${sub2.displayName} at ${sub2Amount} delivers ${texture2} texture while adding distinct nutritional benefits. The key is understanding that ${quantity} ${unitName} contribute significant structure and moisture to your recipe, so your substitute must replicate both functions. Skip ${sub1.displayName} in ${avoidContext} where other options perform better. Our calculator below displays exact measurements for ${quantity} ${unitName}, with texture ratings and recipe-specific recommendations for each option.`,
  ];
  
  return intros[hash];
}

/**
 * Build quantity-specific tips
 */
export function buildQuantityTips(pageSpec: PageSpec, ingredient: Ingredient): string[] {
  const quantity = pageSpec.quantity || extractQuantityFromSlug(pageSpec.slug);
  const ingredientName = ingredient.displayName.toLowerCase();
  const tips: string[] = [];
  
  // Quantity-specific tips
  if (quantity === 2) {
    tips.push(`For cakes: add ½ teaspoon extra baking powder when replacing 2 ${ingredientName}s to maintain lift.`);
    tips.push(`For cookies: reduce liquid by 1 tablespoon to prevent excessive spread.`);
    tips.push(`For brownies: expect slightly denser texture—this often improves fudginess.`);
    tips.push(`For muffins: let batter rest 3-5 minutes after mixing for better binding.`);
    tips.push(`Avoid using banana for both ${ingredientName}s in fluffy cakes—flavor becomes too strong.`);
  } else if (quantity === 3) {
    tips.push(`For cakes: add ¾ teaspoon extra baking powder when replacing 3 ${ingredientName}s.`);
    tips.push(`For cookies: consider using two different substitutes (1.5 each) for better results.`);
    tips.push(`For brownies: oil-based substitutes maintain moisture better at this quantity.`);
    tips.push(`For large batches: mix substitutes separately before adding to dry ingredients.`);
    tips.push(`At 3 ${ingredientName}s, flax egg may need extra resting time (5-7 minutes) to gel properly.`);
  } else if (quantity === 4) {
    tips.push(`For cakes: add 1 teaspoon extra baking powder when replacing 4 ${ingredientName}s.`);
    tips.push(`Consider combining two substitutes for better texture at this quantity.`);
    tips.push(`Commercial ${ingredientName} replacers often work best for 4+ ${ingredientName} recipes.`);
    tips.push(`For structure-critical recipes, aquafaba provides the most reliable binding.`);
    tips.push(`Reduce oven temperature by 25°F—larger batches with substitutes need gentler heat.`);
  } else {
    tips.push(`Adjust baking powder proportionally: add ¼ tsp per ${ingredientName} replaced.`);
    tips.push(`For best results, prepare your substitute before measuring other ingredients.`);
    tips.push(`Oil-based substitutes work better for moist recipes, fruit-based for dense ones.`);
    tips.push(`Let batter rest 2-3 minutes after mixing to allow binding agents to hydrate.`);
    tips.push(`Start with smaller test batches when scaling new recipes.`);
  }
  
  // Add context-specific tip if context is specified
  if (pageSpec.context) {
    const ctx = pageSpec.context.replace(/_/g, ' ');
    tips.push(`For ${ctx} specifically: check texture ratings in the calculator to find the best match.`);
  }
  
  return tips.slice(0, 5);
}

/**
 * Build quantity-specific H1
 */
export function buildQuantityH1(pageSpec: PageSpec, ingredient: Ingredient): string {
  const quantity = pageSpec.quantity || extractQuantityFromSlug(pageSpec.slug);
  const ingredientName = ingredient.displayName;
  const unitName = quantity === 1 ? ingredientName : `${ingredientName}s`;
  
  if (pageSpec.context) {
    const contextName = pageSpec.context.replace(/_/g, ' ');
    return `Replacing ${quantity} ${unitName} in ${capitalize(contextName)}? Best Substitutes`;
  }
  
  return `Replacing ${quantity} ${unitName}? Here Are the Best Substitutes`;
}

/**
 * Build quantity-specific FAQs
 */
export function buildQuantityFAQs(
  pageSpec: PageSpec, 
  ingredient: Ingredient
): Array<{ question: string; answer: string }> {
  const quantity = pageSpec.quantity || extractQuantityFromSlug(pageSpec.slug);
  const ingredientName = ingredient.displayName.toLowerCase();
  const unitName = quantity === 1 ? ingredientName : `${ingredientName}s`;
  const sub1 = ingredient.substitutes[0];
  const sub2 = ingredient.substitutes[1];
  const sub1Amount = formatAmount(sub1.baseRatio.amount * quantity, sub1.baseRatio.unit);
  const sub2Amount = formatAmount(sub2.baseRatio.amount * quantity, sub2.baseRatio.unit);
  
  return [
    {
      question: `Can I replace ${quantity} ${unitName} with applesauce?`,
      answer: `Yes, use ${formatAmount(0.25 * quantity, 'cup')} applesauce for ${quantity} ${unitName}. Applesauce works best in moist cakes and muffins. It adds subtle sweetness, so reduce sugar by 1-2 tablespoons. Avoid in recipes requiring significant rise.`
    },
    {
      question: `What is the best substitute for ${quantity} ${unitName} in cake?`,
      answer: `${sub1.displayName} works best for cake—use ${sub1Amount}. It provides ${sub1.textureImpact} texture results. Add ¼ teaspoon extra baking powder per ${ingredientName} replaced to maintain lift. ${sub2.displayName} at ${sub2Amount} is a solid alternative.`
    },
    {
      question: `Will replacing ${quantity} ${unitName} affect texture?`,
      answer: `Texture may change slightly depending on your substitute. ${sub1.displayName} produces ${sub1.textureImpact} results—most tasters find this acceptable. ${sub2.displayName} creates ${sub2.textureImpact} changes. At ${quantity} ${unitName}, differences become more noticeable than single-${ingredientName} recipes.`
    },
    {
      question: `Can I use yogurt instead of ${quantity} ${unitName}?`,
      answer: `Yes, use ${formatAmount(0.25 * quantity, 'cup')} yogurt for ${quantity} ${unitName}. Greek yogurt provides better binding than regular yogurt. It works well in cakes and muffins but may make cookies cakey. Use plain, unsweetened yogurt for best results.`
    },
    {
      question: `What if I need to replace ${quantity} ${unitName} in cookies?`,
      answer: `For cookies, ${sub1.displayName} at ${sub1Amount} works well. Chill dough 30 minutes longer than usual to control spread. Reduce liquid by 1 tablespoon if using fruit-based substitutes. Expect slightly different texture—many find this acceptable for homestyle cookies.`
    },
    {
      question: `How do I replace ${quantity} ${unitName} for vegan baking?`,
      answer: `The best vegan options for ${quantity} ${unitName} are flax egg (${formatAmount(quantity, 'tbsp')} ground flax + ${formatAmount(quantity * 3, 'tbsp')} water) or commercial vegan ${ingredientName} replacer. Let flax mixture gel 5 minutes before use. Both work well in most baking applications.`
    },
  ];
}

// Helper functions
function formatAmount(amount: number, unit: string): string {
  const fractions: Record<number, string> = {
    0.25: '¼',
    0.33: '⅓',
    0.5: '½',
    0.67: '⅔',
    0.75: '¾',
  };
  
  if (amount >= 1) {
    const whole = Math.floor(amount);
    const frac = amount - whole;
    if (frac > 0 && fractions[frac]) {
      return `${whole > 0 ? whole + ' ' : ''}${fractions[frac]} ${unit}`;
    }
    return `${amount} ${unit}${amount > 1 ? 's' : ''}`;
  }
  
  return `${fractions[amount] || amount} ${unit}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
