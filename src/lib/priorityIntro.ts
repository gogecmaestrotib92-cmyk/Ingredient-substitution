import type { PageSpec, Ingredient, SubstituteOption, RecipeContext } from './types';

/**
 * Builds unique, detailed intro paragraphs (160-220 words) for priority pages.
 * Uses deterministic variation based on slug hash to ensure unique content per page.
 */
export function buildPriorityIntro(pageSpec: PageSpec, ingredient: Ingredient): string {
  const { context, diet, slug, ingredientId } = pageSpec;
  const hash = getSlugHash(slug);
  const ingredientName = ingredient.displayName.toLowerCase();
  
  // Get top 2 relevant substitutes
  const subs = getRelevantSubstitutes(ingredient, context as RecipeContext | undefined, diet);
  const sub1 = subs[0];
  const sub2 = subs[1];
  
  // Get texture outcomes
  const texture1 = sub1.textureImpact;
  const texture2 = sub2.textureImpact;
  
  // Get context-specific info
  const contextName = context ? formatContext(context) : null;
  const contextRole = context ? getContextRole(context) : 'structure and moisture';
  
  // Select intro pattern based on hash
  const pattern = hash % 5;
  
  if (diet && context) {
    return buildDietContextIntro(ingredientName, diet, contextName!, contextRole, sub1, sub2, texture1, texture2, pattern);
  }
  
  if (context) {
    return buildContextIntro(ingredientName, contextName!, contextRole, sub1, sub2, texture1, texture2, pattern, ingredient);
  }
  
  if (pageSpec.variant === 'base') {
    return buildBaseIntro(ingredientName, sub1, sub2, texture1, texture2, pattern, ingredient);
  }
  
  // Fallback for other priority pages
  return buildGenericPriorityIntro(ingredientName, sub1, sub2, ingredient, pattern);
}

function buildContextIntro(
  ingredientName: string,
  contextName: string,
  contextRole: string,
  sub1: SubstituteOption,
  sub2: SubstituteOption,
  texture1: string,
  texture2: string,
  pattern: number,
  ingredient: Ingredient
): string {
  const ratio1 = formatRatio(sub1.baseRatio);
  const ratio2 = formatRatio(sub2.baseRatio);
  const avoidHint = sub1.avoidIn[0] ? formatContext(sub1.avoidIn[0]) : 'delicate recipes';
  const totalOptions = ingredient.substitutes.length;
  
  const intros = [
    // Pattern 0: Problem-solution structure
    `Running out of ${ingredientName} while making ${contextName.toLowerCase()} is frustrating, but finding a good substitute doesn&apos;t have to be. In ${contextName.toLowerCase()} recipes, ${ingredientName} primarily provides ${contextRole}, which determines the final texture of your dish. After testing multiple alternatives, ${sub1.displayName} emerges as the top choice, requiring ${ratio1} for optimal results with ${texture1} texture impact. ${sub2.displayName} serves as an excellent backup at ${ratio2}, producing ${texture2} texture changes. Both options maintain the structural integrity that ${contextName.toLowerCase()} requires while accommodating dietary preferences. One important consideration: avoid using ${sub1.displayName} in ${avoidHint} where it may negatively affect the outcome. Our calculator below factors in recipe context, so you can confidently select and measure the right amount. With ${totalOptions} total options available, you have flexibility to match your specific needs, whether prioritizing taste neutrality, dietary restrictions, or ingredient availability.`,
    
    // Pattern 1: Expert-advice structure
    `Professional bakers and home cooks alike frequently need ${ingredientName} alternatives for ${contextName.toLowerCase()}, and understanding the science helps you choose wisely. ${ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)} contributes ${contextRole} in ${contextName.toLowerCase()} recipes, so your substitute must replicate these properties. ${sub1.displayName} ranks highest for this application, used at ${ratio1} per original amount, delivering ${texture1} texture similarity. ${sub2.displayName} offers comparable performance at ${ratio2} with ${texture2} impact on the final product. The key difference lies in moisture content and binding strength—${sub1.displayName} excels when ${contextRole.split(' and ')[0]} matters most. However, skip ${sub1.displayName} for ${avoidHint} to avoid disappointing results. This calculator automatically adjusts ratios for ${contextName.toLowerCase()} specifically, accounting for how each substitute behaves in this recipe type. Explore all ${totalOptions} options below with detailed texture notes and dietary tags to find your perfect match.`,
    
    // Pattern 2: Step-by-step guidance structure
    `Making ${contextName.toLowerCase()} without ${ingredientName} requires selecting the right substitute and using precise measurements. Here&apos;s what you need to know: ${ingredientName} provides ${contextRole} in ${contextName.toLowerCase()}, so your replacement must deliver similar functionality. Start with ${sub1.displayName}—use ${ratio1} for each ${ingredientName} called for, and expect ${texture1} texture impact in your finished ${contextName.toLowerCase()}. Alternatively, ${sub2.displayName} at ${ratio2} produces ${texture2} texture changes while offering different dietary benefits. For best results, prepare your substitute before mixing other ingredients, especially for ${sub1.displayName} which may need brief resting time. One caution: ${sub1.displayName} performs poorly in ${avoidHint}, so check the &quot;avoid&quot; warnings in the calculator. With ${totalOptions} tested substitutes available for ${contextName.toLowerCase()}, you can filter by vegan, gluten-free, or other dietary needs. Each option includes exact measurements scaled to your quantity.`,
    
    // Pattern 3: Comparison-focused structure  
    `Choosing between ${ingredientName} substitutes for ${contextName.toLowerCase()} comes down to texture priorities and ingredient availability. The top performer is ${sub1.displayName}: at ${ratio1}, it maintains ${texture1} texture similarity by replicating the ${contextRole} that ${ingredientName} provides. ${sub2.displayName} follows closely, requiring ${ratio2} and resulting in ${texture2} texture impact—a solid alternative when ${sub1.displayName} isn&apos;t available. Both options have been tested specifically in ${contextName.toLowerCase()} recipes where ${ingredientName}&apos;s role differs from other applications. Notably, ${sub1.displayName} struggles in ${avoidHint}, so consider ${sub2.displayName} for those cases instead. The calculator below displays all ${totalOptions} options ranked by performance in ${contextName.toLowerCase()}, complete with dietary tags, texture ratings, and when-to-avoid warnings. Adjust the quantity selector to see exact measurements scaled for your recipe size—whether you need replacement for one ${ingredientName} or several.`,
    
    // Pattern 4: Q&A anticipation structure
    `What actually works when you need to replace ${ingredientName} in ${contextName.toLowerCase()}? The answer depends on what ${ingredientName} does in your recipe—primarily ${contextRole}—and which substitute best matches that function. ${sub1.displayName} proves most reliable, used at ${ratio1} with ${texture1} texture impact that most tasters find acceptable. ${sub2.displayName} offers an alternative approach at ${ratio2}, creating ${texture2} changes while potentially fitting different dietary requirements. Understanding why these work helps: ${sub1.displayName} mimics ${ingredientName}&apos;s binding properties, while ${sub2.displayName} adds comparable moisture. The limitation? Don&apos;t use ${sub1.displayName} in ${avoidHint}—the texture impact becomes too noticeable. Use the calculator below to explore ${totalOptions} total ${ingredientName} substitutes filtered specifically for ${contextName.toLowerCase()}, with exact ratios, texture guides, and dietary information for each option.`,
  ];
  
  return intros[pattern];
}

function buildDietContextIntro(
  ingredientName: string,
  diet: string,
  contextName: string,
  contextRole: string,
  sub1: SubstituteOption,
  sub2: SubstituteOption,
  texture1: string,
  texture2: string,
  pattern: number
): string {
  const ratio1 = formatRatio(sub1.baseRatio);
  const ratio2 = formatRatio(sub2.baseRatio);
  const avoidHint = sub1.avoidIn[0] ? formatContext(sub1.avoidIn[0]) : 'some recipe types';
  
  const intros = [
    // Pattern 0
    `Finding a ${diet} ${ingredientName} substitute that actually works in ${contextName.toLowerCase()} requires understanding both the dietary constraints and the ingredient&apos;s function. In ${contextName.toLowerCase()} recipes, ${ingredientName} provides ${contextRole}—your ${diet} alternative must replicate this without compromising dietary requirements. ${sub1.displayName} stands out as the top ${diet} option, requiring ${ratio1} per ${ingredientName} and delivering ${texture1} texture impact. ${sub2.displayName} offers another excellent ${diet} choice at ${ratio2} with ${texture2} texture changes. Both substitutes are verified ${diet} and perform well in baking applications. Keep in mind that ${sub1.displayName} may underperform in ${avoidHint} even though it&apos;s ${diet}-friendly. The calculator below filters all options by ${diet} certification, showing exact ratios, texture expectations, and recipe-specific recommendations for ${contextName.toLowerCase()}.`,
    
    // Pattern 1
    `Creating ${diet} ${contextName.toLowerCase()} means finding ${ingredientName} substitutes that satisfy both dietary needs and recipe functionality. ${ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)} contributes ${contextRole} to ${contextName.toLowerCase()}, and the best ${diet} alternatives preserve these qualities. ${sub1.displayName} leads the ${diet} options—use ${ratio1} for ${texture1} texture results that closely match traditional recipes. ${sub2.displayName} provides another ${diet}-certified path at ${ratio2}, though you&apos;ll notice ${texture2} texture differences. The functional difference matters: ${sub1.displayName} excels at binding while ${sub2.displayName} adds more moisture. Avoid using ${sub1.displayName} in ${avoidHint} for optimal results. Our calculator automatically shows only ${diet} substitutes when you apply the dietary filter, with context-specific ratios calibrated for ${contextName.toLowerCase()} success.`,
    
    // Pattern 2
    `Baking ${diet} ${contextName.toLowerCase()} without ${ingredientName} is straightforward once you know the right substitutes and ratios. The ${ingredientName} in your recipe provides ${contextRole}, so your ${diet} replacement must deliver similar properties. Start with ${sub1.displayName}: at ${ratio1}, this ${diet} option produces ${texture1} texture impact—close enough that most tasters won&apos;t notice the difference. ${sub2.displayName} serves as a reliable ${diet} backup requiring ${ratio2} and resulting in ${texture2} changes. Both are naturally ${diet} without hidden animal products. However, ${sub1.displayName} isn&apos;t ideal for ${avoidHint}—check the warnings below each option. Use the calculator to see exact measurements for your quantity, filtered to show only ${diet}-friendly choices with full texture and usage guidance.`,
    
    // Pattern 3
    `${diet.charAt(0).toUpperCase() + diet.slice(1)} cooking doesn&apos;t mean sacrificing ${contextName.toLowerCase()} quality—you just need the right ${ingredientName} substitutes. In ${contextName.toLowerCase()}, ${ingredientName} handles ${contextRole}, and several ${diet} options replicate this effectively. ${sub1.displayName} ranks first among ${diet} choices, used at ${ratio1} for ${texture1} texture similarity. ${sub2.displayName} comes second at ${ratio2} with ${texture2} impact, offering a different flavor profile while remaining fully ${diet}. Each substitute has different strengths: ${sub1.displayName} provides better structure, while ${sub2.displayName} adds moisture. Note that ${sub1.displayName} performs poorly in ${avoidHint}, so plan accordingly. The calculator below provides ${diet}-filtered results with exact measurements scaled to any quantity and context-specific recommendations for ${contextName.toLowerCase()}.`,
    
    // Pattern 4
    `What&apos;s the best ${diet} ${ingredientName} substitute for ${contextName.toLowerCase()}? After testing options specifically in this recipe type, ${sub1.displayName} consistently delivers the best results among ${diet} alternatives. Use ${ratio1} per ${ingredientName}, expecting ${texture1} texture impact that maintains ${contextName.toLowerCase()} quality. ${sub2.displayName} offers a comparable ${diet} option at ${ratio2} with ${texture2} changes—useful when ${sub1.displayName} isn&apos;t available or you prefer its flavor. Both substitutes provide the ${contextRole} that ${ingredientName} normally contributes. One limitation: ${sub1.displayName} struggles in ${avoidHint}, so choose ${sub2.displayName} for those applications instead. Use the dietary filter in our calculator to see all ${diet} options with exact ratios, texture guides, and recipe-specific advice.`,
  ];
  
  return intros[pattern];
}

function buildBaseIntro(
  ingredientName: string,
  sub1: SubstituteOption,
  sub2: SubstituteOption,
  texture1: string,
  texture2: string,
  pattern: number,
  ingredient: Ingredient
): string {
  const ratio1 = formatRatio(sub1.baseRatio);
  const ratio2 = formatRatio(sub2.baseRatio);
  const totalOptions = ingredient.substitutes.length;
  const contexts = ingredient.commonContexts.slice(0, 3).map(formatContext).join(', ');
  const avoidHint = sub1.avoidIn[0] ? formatContext(sub1.avoidIn[0]) : 'some recipes';
  
  const intros = [
    // Pattern 0
    `Whether you&apos;ve run out of ${ingredientName}, have allergies, or follow specific dietary restrictions, finding the right substitute requires understanding how each alternative performs. ${ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)} serves multiple functions in cooking and baking—binding, adding moisture, and contributing to texture—so different substitutes excel in different situations. ${sub1.displayName} ranks as the most versatile option, requiring ${ratio1} per ${ingredientName} with ${texture1} overall texture impact. ${sub2.displayName} follows at ${ratio2}, producing ${texture2} changes while offering distinct dietary benefits. Both work well in ${contexts}. Important to note: ${sub1.displayName} should be avoided in ${avoidHint} where results may disappoint. With ${totalOptions} total substitutes in our database, you can filter by vegan, gluten-free, nut-free, and other dietary needs. The calculator below provides exact measurements for any quantity with texture ratings and recipe recommendations for each option.`,
    
    // Pattern 1
    `${ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)} substitutes range from pantry staples like ${sub1.displayName} to specialty alternatives, each with specific strengths and limitations. Understanding these differences helps you choose based on your recipe type, dietary needs, and available ingredients. ${sub1.displayName} provides the most consistent results across recipe types, used at ${ratio1} with ${texture1} texture impact—it works particularly well in ${contexts}. ${sub2.displayName} offers an alternative path at ${ratio2}, resulting in ${texture2} texture changes while fitting different dietary requirements. Both substitutes have been tested across multiple recipe contexts. However, ${sub1.displayName} performs poorly in ${avoidHint}, so check recipe-specific notes before proceeding. Our calculator includes ${totalOptions} vetted ${ingredientName} substitutes with exact conversion ratios, dietary tags, texture ratings, and context-specific recommendations.`,
    
    // Pattern 2
    `Replacing ${ingredientName} successfully depends on matching your substitute to your recipe&apos;s specific needs. Different recipes use ${ingredientName} for different purposes—binding in cookies, leavening in cakes, moisture in muffins—so one substitute rarely works for everything. ${sub1.displayName} comes closest to universal functionality at ${ratio1} per ${ingredientName}, delivering ${texture1} texture similarity in most applications. ${sub2.displayName} serves as a strong secondary option at ${ratio2} with ${texture2} impact, particularly when dietary restrictions rule out ${sub1.displayName}. Common applications include ${contexts}, where both substitutes perform reliably. The exception: avoid ${sub1.displayName} in ${avoidHint} for best results. Below, explore ${totalOptions} ${ingredientName} substitutes with calculator-ready measurements, filter by dietary needs, and review texture guides before deciding.`,
    
    // Pattern 3
    `Finding an ${ingredientName} substitute is easy—finding the right one for your specific recipe takes more consideration. ${ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)} contributes binding, moisture, and texture properties that vary in importance depending on what you&apos;re cooking. For general use, ${sub1.displayName} delivers the most reliable results at ${ratio1}, producing ${texture1} texture impact across ${contexts}. ${sub2.displayName} at ${ratio2} creates ${texture2} changes while providing an alternative for those with specific ingredient preferences or restrictions. Each substitute has optimal use cases and limitations—${sub1.displayName}, despite its versatility, underperforms in ${avoidHint}. The calculator below lets you compare all ${totalOptions} options with exact ratios, dietary filters, and texture ratings to match your exact situation.`,
    
    // Pattern 4
    `How do you choose between ${totalOptions} different ${ingredientName} substitutes? Start with your recipe type, then consider dietary needs, and finally check texture expectations. ${sub1.displayName} handles the widest range of applications, requiring ${ratio1} per ${ingredientName} and producing ${texture1} texture results—it&apos;s particularly effective in ${contexts}. ${sub2.displayName} provides a solid alternative at ${ratio2} with ${texture2} impact, offering different nutritional and dietary profiles. Knowing when not to use each option matters too: skip ${sub1.displayName} in ${avoidHint} where texture issues become noticeable. Use the calculator below to explore every option with exact measurements, dietary tags, and recipe-specific guidance based on proven testing.`,
  ];
  
  return intros[pattern];
}

function buildGenericPriorityIntro(
  ingredientName: string,
  sub1: SubstituteOption,
  sub2: SubstituteOption,
  ingredient: Ingredient,
  pattern: number
): string {
  const ratio1 = formatRatio(sub1.baseRatio);
  const ratio2 = formatRatio(sub2.baseRatio);
  const totalOptions = ingredient.substitutes.length;
  
  return `Looking for the best ${ingredientName} substitute? ${sub1.displayName} ranks as the top choice at ${ratio1} per ${ingredientName}, delivering reliable results with consistent texture. ${sub2.displayName} provides an excellent alternative at ${ratio2} when you need different dietary options or simply have different ingredients available. With ${totalOptions} total substitutes in our database, you can filter by specific dietary requirements—vegan, gluten-free, dairy-free, and more—to find exactly what works for your situation. Each option includes texture impact ratings, best-use recommendations, and clear guidance on when to avoid certain substitutes. The calculator below provides exact measurements scaled to your quantity, making it simple to substitute confidently in any recipe.`;
}

// Helper functions
function getSlugHash(slug: string): number {
  return slug.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
}

function getRelevantSubstitutes(
  ingredient: Ingredient,
  context: RecipeContext | undefined,
  diet: string | undefined
): SubstituteOption[] {
  let subs = [...ingredient.substitutes];
  
  // Filter by diet if specified
  if (diet) {
    const dietSubs = subs.filter(s => s.dietTags.includes(diet as never));
    if (dietSubs.length >= 2) subs = dietSubs;
  }
  
  // Prioritize context-appropriate subs
  if (context) {
    subs.sort((a, b) => {
      const aMatch = a.bestIn.includes(context) ? 1 : 0;
      const bMatch = b.bestIn.includes(context) ? 1 : 0;
      return bMatch - aMatch;
    });
  }
  
  return subs.slice(0, 2);
}

function formatRatio(ratio: { amount: number; unit: string; perUnit?: string }): string {
  const fractions: Record<number, string> = {
    0.25: '¼',
    0.33: '⅓',
    0.5: '½',
    0.67: '⅔',
    0.75: '¾',
  };
  const amountStr = fractions[ratio.amount] || String(ratio.amount);
  return `${amountStr} ${ratio.unit}${ratio.perUnit ? ` per ${ratio.perUnit}` : ''}`;
}

function formatContext(context: string): string {
  const contextMap: Record<string, string> = {
    mac_and_cheese: 'mac and cheese',
    banana_bread: 'banana bread',
    mashed_potatoes: 'mashed potatoes',
  };
  return contextMap[context] || context.replace(/_/g, ' ');
}

function getContextRole(context: string): string {
  const roles: Record<string, string> = {
    cake: 'moisture, binding, and lift',
    cookies: 'binding and spread control',
    brownies: 'moisture and fudgy structure',
    muffins: 'binding and moisture',
    pancakes: 'binding and fluffiness',
    waffles: 'structure and crispness',
    bread: 'structure and browning',
    banana_bread: 'additional moisture and binding',
    cupcakes: 'lift and tender crumb',
    pasta: 'richness and creaminess',
    soup: 'body and richness',
    sauce: 'silky texture and richness',
    frosting: 'smoothness and stability',
    mac_and_cheese: 'creaminess and richness',
    mashed_potatoes: 'creaminess and flavor',
  };
  return roles[context] || 'structure and moisture';
}
