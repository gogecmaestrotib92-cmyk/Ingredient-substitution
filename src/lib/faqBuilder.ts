import type { PageSpec, Ingredient, FAQItem, DietTag, GoalTag, RecipeContext, Ratio, SubstituteOption } from './types';

/**
 * Builds 5-7 context-aware FAQ items with long-tail questions.
 * Includes context-specific, "without" questions, and texture goal questions.
 */
export function buildFAQs(pageSpec: PageSpec, ingredient: Ingredient): FAQItem[] {
  const { context, goal, diet, quantity, exclusion } = pageSpec;
  const ingredientName = ingredient.displayName.toLowerCase();
  const topSubs = ingredient.substitutes.slice(0, 3);
  
  const faqs: FAQItem[] = [];
  
  // 1. Always include base substitution question
  faqs.push(buildBaseQuestion(ingredientName, topSubs, ingredient));
  
  // 2. Context-specific questions
  if (context) {
    faqs.push(...buildContextQuestions(ingredientName, context as RecipeContext, topSubs, ingredient));
  }
  
  // 3. Diet-specific questions
  if (diet) {
    faqs.push(buildDietQuestion(ingredientName, diet as DietTag, topSubs, ingredient));
  }
  
  // 4. Goal-specific questions
  if (goal) {
    faqs.push(buildGoalQuestion(ingredientName, goal as GoalTag, ingredient));
  }
  
  // 5. Quantity-specific question
  if (quantity) {
    faqs.push(buildQuantityQuestion(ingredientName, String(quantity), topSubs));
  }
  
  // 6. Exclusion-specific question
  if (exclusion) {
    faqs.push(buildExclusionQuestion(ingredientName, exclusion, ingredient));
  }
  
  // 7. Add general questions to reach 5-7 total
  if (faqs.length < 5) {
    faqs.push(...buildGeneralQuestions(ingredientName, topSubs, ingredient, context as RecipeContext | undefined));
  }
  
  // Limit to 7 FAQs
  return faqs.slice(0, 7);
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

function buildBaseQuestion(
  ingredientName: string,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): FAQItem {
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  const sub3 = topSubs[2];
  
  return {
    question: `What are the best substitutes for ${ingredientName}?`,
    answer: `The top ${ingredientName} substitutes are ${sub1.displayName} (${formatRatio(sub1.baseRatio)}), ${sub2.displayName} (${formatRatio(sub2.baseRatio)}), and ${sub3?.displayName || 'commercial replacers'}. ${sub1.displayName} works best in ${formatList(sub1.bestIn.slice(0, 2))}. ${sub2.displayName} is ideal for ${formatList(sub2.bestIn.slice(0, 2))}. Each option has different texture impacts—use our calculator to compare exact ratios for your recipe.`
  };
}

function buildContextQuestions(
  ingredientName: string,
  context: RecipeContext,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): FAQItem[] {
  const ctxName = formatContext(context);
  const questions: FAQItem[] = [];
  
  // Get context-appropriate substitutes
  const contextSubs = topSubs.filter(s => 
    s.bestIn.some(b => b === context)
  );
  const sub1 = contextSubs[0] || topSubs[0];
  const sub2 = contextSubs[1] || topSubs[1];
  
  // Main context question
  questions.push({
    question: `Can I make ${ctxName} without ${ingredientName}?`,
    answer: `Yes, you can make ${ctxName} without ${ingredientName}. Use ${sub1.displayName} at ${getContextRatio(sub1, context)} for similar results. ${sub2.displayName} also works at ${formatRatio(sub2.baseRatio)}. In ${ctxName}, ${ingredientName} provides ${getContextRole(context)}, so choose substitutes rated for that texture goal. Our calculator shows context-adjusted ratios and texture impact for ${ctxName} specifically.`
  });
  
  // "How does X affect" question
  questions.push({
    question: `How does replacing ${ingredientName} affect ${ctxName} texture?`,
    answer: `Replacing ${ingredientName} in ${ctxName} may slightly change texture depending on your substitute choice. ${sub1.displayName} typically produces ${sub1.textureImpact} texture impact. ${sub2.displayName} creates ${sub2.textureImpact} changes. For ${ctxName} specifically, ${ingredientName} contributes ${getContextRole(context)}, so substitutes rated "similar" or "slightly different" will give the closest results.`
  });
  
  return questions;
}

function buildDietQuestion(
  ingredientName: string,
  diet: DietTag,
  topSubs: SubstituteOption[],
  ingredient: Ingredient
): FAQItem {
  const dietSubs = ingredient.substitutes.filter(s => s.dietTags.includes(diet));
  const sub1 = dietSubs[0] || topSubs[0];
  const sub2 = dietSubs[1] || topSubs[1];
  
  return {
    question: `What is the best ${diet} substitute for ${ingredientName}?`,
    answer: `The best ${diet} ${ingredientName} substitutes are ${sub1.displayName} (${formatRatio(sub1.baseRatio)}) and ${sub2.displayName} (${formatRatio(sub2.baseRatio)}). ${sub1.displayName} works especially well in ${formatList(sub1.bestIn.slice(0, 2))}. There are ${dietSubs.length} total ${diet} options available—filter by ${diet} in the calculator to see all alternatives with exact conversion ratios.`
  };
}

function buildGoalQuestion(
  ingredientName: string,
  goal: GoalTag,
  ingredient: Ingredient
): FAQItem {
  const goalSubs = ingredient.substitutes.filter(s => s.goals.includes(goal));
  const sub1 = goalSubs[0];
  const sub2 = goalSubs[1];
  
  return {
    question: `Which ${ingredientName} substitute is best for ${goal}?`,
    answer: `For ${goal}, the best ${ingredientName} substitutes are ${sub1?.displayName || 'flax egg'} and ${sub2?.displayName || 'chia egg'}. Out of ${ingredient.substitutes.length} total options, ${goalSubs.length} are rated for ${goal}. ${sub1?.displayName || 'The top option'} achieves ${goal} by ${getGoalMechanism(goal)}. Use the calculator to compare all ${goal}-rated substitutes with exact ratios for your quantity.`
  };
}

function buildQuantityQuestion(
  ingredientName: string,
  quantity: string,
  topSubs: SubstituteOption[]
): FAQItem {
  const num = parseInt(quantity) || 1;
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  
  const sub1Amount = calculateAmount(sub1.baseRatio, num);
  const sub2Amount = calculateAmount(sub2.baseRatio, num);
  
  return {
    question: `How do I replace ${quantity} ${ingredientName}${num > 1 ? 's' : ''} in a recipe?`,
    answer: `To replace ${quantity} ${ingredientName}${num > 1 ? 's' : ''}: use ${sub1Amount} of ${sub1.displayName}, or ${sub2Amount} of ${sub2.displayName}. For large batch recipes with ${num}+ ${ingredientName}${num > 1 ? 's' : ''}, ${sub1.displayName} maintains texture better because of its ${sub1.textureImpact} impact. The calculator automatically scales all ratios—just select your quantity and compare options.`
  };
}

function buildExclusionQuestion(
  ingredientName: string,
  exclusion: string,
  ingredient: Ingredient
): FAQItem {
  const excluded = exclusion.replace('without-', '');
  const excludedName = formatExclusion(excluded);
  
  const validSubs = ingredient.substitutes.filter(s => 
    !s.displayName.toLowerCase().includes(excluded.toLowerCase())
  );
  const sub1 = validSubs[0];
  const sub2 = validSubs[1];
  
  return {
    question: `What can I use instead of ${ingredientName} if I don't have ${excludedName}?`,
    answer: `If you can't use ${excludedName}, try ${sub1?.displayName || 'commercial egg replacer'} (${sub1 ? formatRatio(sub1.baseRatio) : '1 packet per egg'}) or ${sub2?.displayName || 'aquafaba'} (${sub2 ? formatRatio(sub2.baseRatio) : '3 tbsp per egg'}). There are ${validSubs.length} ${ingredientName} alternatives that don't require ${excludedName}. Each works differently—check the texture impact and "best in" notes in the calculator to find the right match for your recipe.`
  };
}

function buildGeneralQuestions(
  ingredientName: string,
  topSubs: SubstituteOption[],
  ingredient: Ingredient,
  context?: RecipeContext
): FAQItem[] {
  const questions: FAQItem[] = [];
  const sub1 = topSubs[0];
  const sub2 = topSubs[1];
  
  // Ratio question
  questions.push({
    question: `What is the ratio for substituting ${ingredientName}?`,
    answer: `Standard ${ingredientName} substitution ratios: ${sub1.displayName} uses ${formatRatio(sub1.baseRatio)}, while ${sub2.displayName} uses ${formatRatio(sub2.baseRatio)}. These ratios may vary by recipe type—our calculator adjusts amounts based on context (baking, cooking, sauces) and your specific quantity needs. Always check the texture impact rating when choosing between options.`
  });
  
  // Texture question
  questions.push({
    question: `Will my recipe taste different with a ${ingredientName} substitute?`,
    answer: `Taste and texture changes depend on your substitute choice. ${sub1.displayName} produces ${sub1.tasteImpact} taste impact with ${sub1.textureImpact} texture changes. ${sub2.displayName} has ${sub2.tasteImpact} taste impact. Substitutes rated "similar" or "neutral" taste closest to original. For best results, match the substitute to your recipe type—baked goods vs. cooking vs. sauces all have different recommendations.`
  });
  
  // When not to use question
  const sub1Avoid = sub1.avoidIn.slice(0, 2);
  questions.push({
    question: `When should I NOT use a ${ingredientName} substitute?`,
    answer: `Avoid using ${sub1.displayName} in ${formatList(sub1Avoid)} because it may affect texture negatively. ${sub1.whenNotToUse?.[0] || 'Some recipes rely heavily on the original ingredient.'} Check each substitute's "avoid in" list before choosing—our calculator shows warnings for recipe types that don't work well with specific alternatives.`
  });
  
  // Multiple substitutes question
  questions.push({
    question: `Can I use multiple ${ingredientName} substitutes in one recipe?`,
    answer: `Yes, combining substitutes can work, but requires careful ratio adjustments. For example, you might use half ${sub1.displayName} (${formatRatio(sub1.baseRatio)} ÷ 2) and half ${sub2.displayName} (${formatRatio(sub2.baseRatio)} ÷ 2) to balance texture and flavor. This works best when one substitute provides ${sub1.goals[0] || 'binding'} and another adds ${sub2.goals[0] || 'moisture'}. Start with small batches to test results.`
  });
  
  return questions;
}

// Helper functions
function formatContext(context: RecipeContext): string {
  const contextMap: Record<string, string> = {
    mac_and_cheese: 'mac and cheese',
    banana_bread: 'banana bread',
    mashed_potatoes: 'mashed potatoes',
  };
  return contextMap[context] || String(context).split('_').join(' ');
}

function formatList(items: RecipeContext[]): string {
  const strItems = items.map(i => String(i).replace(/_/g, ' '));
  if (strItems.length === 0) return 'various recipes';
  if (strItems.length === 1) return strItems[0];
  return strItems.slice(0, -1).join(', ') + ' and ' + strItems[strItems.length - 1];
}

function formatExclusion(excluded: string): string {
  const exclusionMap: Record<string, string> = {
    applesauce: 'applesauce',
    banana: 'banana',
    flax: 'flax',
    chia: 'chia seeds',
    yogurt: 'yogurt',
    aquafaba: 'aquafaba',
  };
  return exclusionMap[excluded] || excluded;
}

function getContextRole(context: RecipeContext): string {
  const roles: Record<string, string> = {
    cake: 'moisture and structure',
    cookies: 'binding and spread control',
    brownies: 'fudgy texture and binding',
    muffins: 'lift and moisture',
    pancakes: 'binding and fluffiness',
    banana_bread: 'moisture and binding',
    mac_and_cheese: 'creaminess',
    mashed_potatoes: 'creaminess and richness',
  };
  return roles[context] || 'structure and texture';
}

function getGoalMechanism(goal: GoalTag): string {
  const mechanisms: Record<string, string> = {
    binding: 'forming proteins that hold ingredients together when heated',
    leavening: 'creating air pockets that expand during baking',
    moisture: 'adding water content that keeps baked goods soft',
    richness: 'contributing fats that enhance flavor and mouthfeel',
    fluffy: 'incorporating air and providing lift during baking',
    chewy: 'developing structure that creates chew without being tough',
    browning: 'providing proteins and sugars for Maillard reaction',
    structure: 'creating a stable matrix that holds the recipe together',
    tenderness: 'preventing gluten formation for softer results',
  };
  return mechanisms[goal] || 'altering the recipe structure';
}

function calculateAmount(ratio: Ratio, quantity: number): string {
  const total = ratio.amount * quantity;
  
  const fractions: Record<number, string> = {
    0.25: '1/4',
    0.33: '1/3',
    0.5: '1/2',
    0.67: '2/3',
    0.75: '3/4',
  };
  
  if (total >= 1) {
    return `${total} ${ratio.unit}${total > 1 ? 's' : ''}`;
  }
  
  return `${fractions[total] || total.toFixed(2)} ${ratio.unit}`;
}

/**
 * Generate JSON-LD schema for FAQ section
 */
export function generateFAQJsonLd(faqs: FAQItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
