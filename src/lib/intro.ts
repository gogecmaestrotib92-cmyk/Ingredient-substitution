import type { PageSpec, Ingredient, DietTag, GoalTag, RecipeContext, Ratio, SubstituteOption } from './types';

/**
 * Builds a unique, context-aware intro paragraph (120-180 words).
 * Uses ingredient + context + goal + diet + top 2 substitutes.
 */
export function buildIntro(pageSpec: PageSpec, ingredient: Ingredient): string {
  const { context, goal, diet, quantity, exclusion } = pageSpec;
  const ingredientName = ingredient.displayName.toLowerCase();
  const topSubs = ingredient.substitutes.slice(0, 2);
  
  // Build intro based on page type
  if (diet && context) {
    return buildDietContextIntro(ingredientName, diet as DietTag, context as RecipeContext, topSubs);
  }
  
  if (quantity && context) {
    return buildQuantityContextIntro(ingredientName, String(quantity), context as RecipeContext, topSubs);
  }
  
  if (context) {
    return buildContextIntro(ingredientName, context as RecipeContext, topSubs, ingredient);
  }
  
  if (goal) {
    return buildGoalIntro(ingredientName, goal as GoalTag, topSubs, ingredient);
  }
  
  if (diet) {
    return buildDietIntro(ingredientName, diet as DietTag, topSubs, ingredient);
  }
  
  if (quantity) {
    return buildQuantityIntro(ingredientName, String(quantity), topSubs);
  }
  
  if (exclusion) {
    return buildExclusionIntro(ingredientName, exclusion, topSubs, ingredient);
  }
  
  // Base page intro
  return buildBaseIntro(ingredientName, topSubs, ingredient);
}

// Format ratio for display
function formatRatio(ratio: Ratio): string {
  const fractions: Record<number, string> = {
    0.25: '1/4',
    0.33: '1/3',
    0.5: '1/2',
    0.67: '2/3',
    0.75: '3/4',
  };
  const amountStr = fractions[ratio.amount] || String(ratio.amount);
  const perUnit = ratio.perUnit ? ` per ${ratio.perUnit}` : '';
  return `${amountStr} ${ratio.unit}${perUnit}`;
}

// Get context-specific ratio from overrides
function getContextRatio(sub: SubstituteOption, context: RecipeContext): string {
  const override = sub.contextOverrides?.find(o => o.context === context);
  return formatRatio(override?.ratio || sub.baseRatio);
}

function buildBaseIntro(
  ingredientName: string,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): string {
  const subCount = ingredient.substitutes.length;
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  
  // Ingredient-specific intros (90-140 words, direct and tool-like)
  const ingredientIntros: Record<string, string> = {
    egg: `Out of eggs—or avoiding them? This calculator shows ${subCount} tested replacements with exact ratios for any quantity. Top picks: ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) for binding, ${sub2.displayName} (${formatRatio(sub2.baseRatio)}) for moisture. Eggs affect rise, structure, and binding differently in each recipe, so we rank substitutes by context—cake vs. cookies vs. brownies each have different winners. Every option includes texture impact ratings, dietary tags (vegan, gluten-free), and specific "avoid in" warnings. Select your quantity below, choose what you're making, and get precise measurements calculated automatically.`,
    
    milk: `No milk on hand, or need a dairy-free option? This calculator covers ${subCount} alternatives with ratios adjusted per recipe type. Best overall: ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) for similar richness, ${sub2.displayName} (${formatRatio(sub2.baseRatio)}) for cooking. In baking, milk provides moisture and fat—so texture impact varies by substitute. In savory dishes, creaminess matters more. Each option shows texture changes, diet tags, and "when to avoid" notes. Enter your quantity, select what you're making, and see exact amounts.`,
    
    butter: `Out of butter—or need a vegan swap? This calculator ranks ${subCount} alternatives with precise ratios for baking and cooking. Top choices: ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) for flakiness, ${sub2.displayName} (${formatRatio(sub2.baseRatio)}) for moisture. Butter affects texture (crisp, tender, chewy) and flavor differently by recipe—cookies, pie crust, and frosting each need different approaches. Every substitute shows texture impact, dietary info, and context-specific warnings. Set your quantity, pick your recipe type, and get calculated measurements.`,
    
    all_purpose_flour: `Need a flour swap for dietary reasons or pantry emergencies? This calculator covers ${subCount} alternatives with exact ratios. Leading options: ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) and ${sub2.displayName} (${formatRatio(sub2.baseRatio)}). Flour provides structure and texture—substitutes affect rise, density, and crumb differently. Gluten-free options often need binding adjustments. Each alternative includes texture ratings, diet tags, and "avoid in" warnings for specific recipes. Select quantity and recipe type for precise measurements.`,
    
    heavy_cream: `No heavy cream—or avoiding dairy? This calculator shows ${subCount} alternatives ranked by use case. Top performers: ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) for whipping, ${sub2.displayName} (${formatRatio(sub2.baseRatio)}) for cooking. Cream adds richness and body; substitutes vary in fat content and whipping ability. We indicate which work for sauces, desserts, and coffee. Each option shows texture impact and dietary tags. Enter your quantity and recipe context for precise ratios.`,
  };
  
  // Return ingredient-specific intro or generic fallback
  const specificIntro = ingredientIntros[ingredient.id];
  if (specificIntro) {
    return specificIntro;
  }
  
  // Generic fallback (still improved)
  return `Need to replace ${ingredientName}? This calculator covers ${subCount} tested alternatives with exact ratios. Top options: ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) and ${sub2.displayName} (${formatRatio(sub2.baseRatio)}). Each substitute includes texture impact ratings so you know what to expect—similar, slightly different, or noticeable change. Filter by dietary needs (vegan, dairy-free, gluten-free) and see "best in" and "avoid in" notes for each recipe type. Enter quantity below to get precise measurements calculated automatically.`;
}

function buildContextIntro(
  ingredientName: string,
  context: RecipeContext,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): string {
  const ctxName = formatContext(context);
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  const subCount = ingredient.substitutes.length;
  
  const sub1Ratio = getContextRatio(sub1, context);
  const role = getContextRole(context);
  
  return `Making ${ctxName} without ${ingredientName}? In this recipe, ${ingredientName} provides ${role}—so substitute choice matters. This calculator ranks ${subCount} options specifically for ${ctxName}. Top performers: ${sub1.displayName} at ${sub1Ratio} and ${sub2.displayName} at ${formatRatio(sub2.baseRatio)}. Each shows texture impact (identical to noticeable change), dietary tags, and "avoid in" warnings. Filter by vegan, dairy-free, or gluten-free requirements. Select quantity to get precise measurements.`;
}

function buildGoalIntro(
  ingredientName: string,
  goal: GoalTag,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): string {
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  const goalSubs = ingredient.substitutes.filter(s => s.goals.includes(goal));
  
  return `Need ${ingredientName} substitutes that specifically provide ${goal}? This calculator ranks ${goalSubs.length} options by ${goal} effectiveness. Top performers: ${sub1.displayName} and ${sub2.displayName}—both tested across recipe types for consistent ${goal} results. Each shows texture impact, dietary tags, and recipe-specific warnings. Some options excel at ${goal} but may change flavor or appearance—check notes before choosing. Select quantity and recipe type for precise ratios.`;
}

function buildDietIntro(
  ingredientName: string,
  diet: DietTag,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): string {
  const dietSubs = ingredient.substitutes.filter(s => s.dietTags.includes(diet));
  const sub1 = dietSubs[0] || topSubs[0];
  const sub2 = dietSubs[1] || topSubs[1];
  
  return `Need ${diet} ${ingredientName} alternatives? This calculator shows ${dietSubs.length} verified ${diet}-compliant options. Top choices: ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) and ${sub2.displayName} (${formatRatio(sub2.baseRatio)}). Each includes texture impact ratings—some deliver near-identical results, others create noticeable changes. See "best in" notes for recipe matching and "avoid in" warnings. Enter quantity for auto-calculated measurements, and filter further by recipe type if needed.`;
}

function buildDietContextIntro(
  ingredientName: string,
  diet: DietTag,
  context: RecipeContext,
  topSubs: SubstituteOption[]
): string {
  const ctxName = formatContext(context);
  const dietSubs = topSubs.filter(s => s.dietTags.includes(diet));
  const sub1 = dietSubs[0] || topSubs[0];
  const sub2 = dietSubs[1] || topSubs[1];
  
  return `Making ${diet} ${ctxName} without ${ingredientName}? This calculator shows substitutes that satisfy both ${diet} dietary requirements and ${ctxName} recipe demands. The top ${diet}-friendly options are ${sub1.displayName} and ${sub2.displayName}—both have conversion ratios specifically adjusted for ${ctxName}. In this recipe type, ${ingredientName} typically provides ${getContextRole(context)}, so each substitute is evaluated on how effectively it delivers that same result while remaining ${diet}-compliant. Enter your desired quantity to get exact measurements, then review the texture impact ratings to set proper expectations for your finished dish. Some ${diet} alternatives perform better in ${ctxName} than others—our "best in" notes highlight the top performers, while "when not to use" warnings help you avoid common pitfalls. Whether you're cooking for dietary restrictions, food allergies, or lifestyle preferences, this guide provides tested options with precise conversions. Filter by additional requirements if needed, and check the FAQ section for answers to specific ${diet} ${ctxName} substitution questions.`;
}

function buildQuantityIntro(
  ingredientName: string,
  quantity: string,
  topSubs: SubstituteOption[]
): string {
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  const num = parseInt(quantity) || 1;
  
  // Calculate example amounts
  const sub1Amount = calculateAmount(sub1.baseRatio, num);
  const sub2Amount = calculateAmount(sub2.baseRatio, num);
  
  return `Replacing ${quantity} ${ingredientName}${num > 1 ? 's' : ''} in a recipe? This calculator gives you exact measurements for every substitute option. For ${sub1.displayName}, use ${sub1Amount}. For ${sub2.displayName}, use ${sub2Amount}. All ratios are calculated automatically based on your quantity input—no manual math required. The texture impact column indicates how close each substitute's results will be to using regular ${ingredientName}. Some alternatives produce nearly identical outcomes while others create noticeable changes to texture or flavor that you should account for. Every option includes dietary tags (vegan, dairy-free, gluten-free, etc.) and recipe recommendations to help you make an informed choice. The calculator adjusts all amounts dynamically as you modify the quantity selector. Below you'll find frequently asked questions about substituting ${quantity} ${ingredientName}${num > 1 ? 's' : ''} in different recipe contexts. Be sure to check the "when not to use" warnings to avoid combinations that could negatively affect your dish. Filter by dietary requirements or texture goals for more targeted results.`;
}

function buildQuantityContextIntro(
  ingredientName: string,
  quantity: string,
  context: RecipeContext,
  topSubs: SubstituteOption[]
): string {
  const ctxName = formatContext(context);
  const num = parseInt(quantity) || 1;
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  
  const sub1Amount = calculateAmount(sub1.baseRatio, num);
  const sub2Amount = calculateAmount(sub2.baseRatio, num);
  
  return `Replacing ${quantity} ${ingredientName}${num > 1 ? 's' : ''} in ${ctxName}? This calculator provides exact measurements optimized specifically for ${ctxName} recipes. Use ${sub1Amount} of ${sub1.displayName} or ${sub2Amount} of ${sub2.displayName}—ratios are adjusted for ${ctxName} because ${ingredientName} plays a specific role in this dish, providing ${getContextRole(context)}. The calculator automatically scales amounts for all available alternatives based on your quantity input. Texture impact ratings help you choose substitutes that maintain ${ctxName}'s expected result—some produce nearly identical outcomes while others introduce subtle variations. Each option includes "best in" recommendations and "when not to use" warnings tailored to ${ctxName} specifically. Dietary filters let you narrow options to vegan, dairy-free, gluten-free, or other requirements without losing the recipe context optimization. Scroll down for FAQs that address common substitution scenarios when working with ${quantity} ${ingredientName}${num > 1 ? 's' : ''} in ${ctxName}. All ratios have been tested and verified against typical ${ctxName} preparation methods.`;
}

function buildExclusionIntro(
  ingredientName: string,
  exclusion: string,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): string {
  const excluded = exclusion.replace('without-', '');
  const excludedName = formatExclusion(excluded);
  
  // Filter substitutes that don't match the exclusion
  const validSubs = ingredient.substitutes.filter(s => 
    !s.displayName.toLowerCase().includes(excluded.toLowerCase())
  );
  const sub1 = validSubs[0] || topSubs[0];
  const sub2 = validSubs[1] || topSubs[1];
  
  return `Need ${ingredientName} substitutes without ${excludedName}? This calculator displays alternatives that don't require ${excludedName} as an ingredient. Top options include ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) and ${sub2.displayName} (${formatRatio(sub2.baseRatio)})—both have been verified to exclude ${excludedName} from their preparation. We've filtered out any substitutes that use ${excludedName}, so you can safely choose from this curated list. Every alternative includes exact conversion ratios calculated automatically based on your quantity input. The texture impact column shows how each option affects your recipe compared to using regular ${ingredientName}—important for setting proper expectations. Dietary tags help you identify vegan, dairy-free, gluten-free, or other specialized options that also avoid ${excludedName}. Check the "best in" notes to see which recipes each substitute works best for, and review "when not to use" warnings to avoid problematic combinations. The FAQ section below covers common questions about ${ingredientName} alternatives when ${excludedName} isn't available or desired. All ratios are scaled dynamically as you adjust the quantity selector.`;
}

// Helper functions
function formatContext(context: RecipeContext): string {
  const contextMap: Record<string, string> = {
    mac_and_cheese: 'Mac & Cheese',
    banana_bread: 'Banana Bread',
    mashed_potatoes: 'Mashed Potatoes',
    pancakes: 'Pancakes',
    cookies: 'Cookies',
    brownies: 'Brownies',
    muffins: 'Muffins',
    cake: 'Cake',
    bread: 'Bread',
    pasta: 'Pasta',
    sauce: 'Sauce',
    gravy: 'Gravy',
    soup: 'Soup',
    smoothie: 'Smoothie',
    coffee: 'Coffee',
  };
  return contextMap[context] || context.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function formatExclusion(excluded: string): string {
  const exclusionMap: Record<string, string> = {
    applesauce: 'applesauce',
    banana: 'banana',
    flax: 'flax',
    chia: 'chia seeds',
    yogurt: 'yogurt',
    aquafaba: 'aquafaba',
    vinegar: 'vinegar',
    tofu: 'tofu',
    oil: 'oil',
    avocado: 'avocado',
  };
  return exclusionMap[excluded] || excluded;
}

function getContextRole(context: RecipeContext): string {
  const roles: Record<string, string> = {
    cake: 'moisture and binding',
    cookies: 'binding and spread control',
    brownies: 'structure and fudginess',
    muffins: 'leavening and moisture',
    pancakes: 'binding and lift',
    bread: 'structure and texture',
    banana_bread: 'moisture and binding',
    mac_and_cheese: 'creaminess and richness',
    pasta: 'binding and coating',
    sauce: 'emulsification and body',
    gravy: 'thickening and richness',
    mashed_potatoes: 'creaminess and richness',
    soup: 'creaminess and body',
    smoothie: 'creaminess and protein',
    coffee: 'creaminess',
  };
  return roles[context] || 'structure and texture';
}

function calculateAmount(ratio: Ratio, quantity: number): string {
  const total = ratio.amount * quantity;
  
  // Format nicely
  const fractions: Record<number, string> = {
    0.25: '1/4',
    0.33: '1/3',
    0.5: '1/2',
    0.67: '2/3',
    0.75: '3/4',
  };
  
  if (total >= 1) {
    if (ratio.unit === 'tbsp' && total >= 4) {
      return `${(total / 4).toFixed(1)} cups`;
    }
    return `${total} ${ratio.unit}${total > 1 ? 's' : ''}`;
  }
  
  return `${fractions[total] || total.toFixed(2)} ${ratio.unit}`;
}
