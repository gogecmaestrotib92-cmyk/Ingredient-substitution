import type {
  CalculatorInput,
  CalculatorOutput,
  SubstituteResult,
  SubstituteOption,
  PageSpec,
  RecipeContext,
  GoalTag,
  DietTag,
  Ratio,
} from './types';
import { getIngredientById } from './data';
import { formatFullAmount } from './units';

interface ScoredSubstitute {
  substitute: SubstituteOption;
  score: number;
  ratio: Ratio;
}

// Calculate substitution based on page spec and user inputs
export function calculateSubstitution(
  pageSpec: PageSpec,
  input: CalculatorInput
): CalculatorOutput {
  const ingredient = getIngredientById(pageSpec.ingredientId);
  
  if (!ingredient) {
    return {
      results: [],
      originalQuantity: input.quantity,
      originalUnit: input.unit,
      context: input.context,
    };
  }
  
  // Get applicable substitutes
  let substitutes = [...ingredient.substitutes];
  
  // Step 1: Hard filter by diet restrictions
  if (input.dietFilters.length > 0) {
    substitutes = substitutes.filter(sub => 
      input.dietFilters.every(diet => sub.dietTags.includes(diet))
    );
  }
  
  // Step 2: Filter by page-level exclusions (e.g., "without-banana")
  if (pageSpec.exclusion) {
    const exclusionName = pageSpec.exclusion.replace('without-', '').toLowerCase();
    substitutes = substitutes.filter(sub => 
      !sub.name.toLowerCase().includes(exclusionName) &&
      !sub.displayName.toLowerCase().includes(exclusionName)
    );
  }
  
  // Step 3: Score and rank substitutes
  const scored: ScoredSubstitute[] = substitutes.map(sub => {
    let score = 100;
    
    // Get the applicable ratio (context override or base)
    const contextOverride = sub.contextOverrides?.find(co => co.context === input.context);
    const ratio = contextOverride?.ratio || sub.baseRatio;
    
    // Boost for matching context
    if (sub.bestIn.includes(input.context)) {
      score += 30;
    }
    
    // Penalize for avoid context
    if (sub.avoidIn.includes(input.context)) {
      score -= 50;
    }
    
    // Boost for matching goal
    if (input.goal && sub.goals.includes(input.goal)) {
      score += 25;
    }
    
    // Penalize based on taste impact
    const tasteScores: Record<string, number> = {
      'none': 10,
      'low': 5,
      'medium': 0,
      'high': -10,
    };
    score += tasteScores[sub.tasteImpact] || 0;
    
    // Penalize for many warnings
    score -= sub.whenNotToUse.length * 3;
    
    return { substitute: sub, score, ratio };
  });
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  // Take top 3
  const top3 = scored.slice(0, 3);
  
  // Generate results
  const results: SubstituteResult[] = top3.map((item, index) => {
    const { substitute, ratio } = item;
    
    // Calculate the converted amount
    const computedAmount = ratio.amount * input.quantity;
    
    // Generate reasoning
    const reasoning = generateReasoning(substitute, input.context, input.goal);
    
    // Get context-specific add-ons
    const addOns = substitute.addOns || [];
    
    return {
      substitute,
      computedAmount,
      displayAmount: formatFullAmount(computedAmount, ratio.unit),
      unit: ratio.unit,
      reasoning,
      addOns,
      rank: index + 1,
    };
  });
  
  return {
    results,
    originalQuantity: input.quantity,
    originalUnit: input.unit,
    context: input.context,
  };
}

// Generate a short reasoning sentence
function generateReasoning(
  substitute: SubstituteOption,
  context: RecipeContext,
  goal?: GoalTag
): string {
  const contextName = context.replace(/_/g, ' ');
  
  // Check if this is ideal for the context
  if (substitute.bestIn.includes(context)) {
    if (goal && substitute.goals.includes(goal)) {
      return `${substitute.displayName} is excellent for ${contextName} when you need ${goal}. ${substitute.notes.split('.')[0]}.`;
    }
    return `${substitute.displayName} works great in ${contextName}. ${substitute.notes.split('.')[0]}.`;
  }
  
  // Check if this has warnings for the context
  if (substitute.avoidIn.includes(context)) {
    return `${substitute.displayName} is not ideal for ${contextName}, but can work in a pinch. Watch for: ${substitute.whenNotToUse[0] || 'texture changes'}.`;
  }
  
  // Default reasoning
  return `${substitute.displayName} provides ${substitute.goals.slice(0, 2).join(' and ')}. ${substitute.textureImpact}.`;
}

// Get default calculator input for a page
export function getDefaultInput(pageSpec: PageSpec): CalculatorInput {
  const ingredient = getIngredientById(pageSpec.ingredientId);
  
  return {
    quantity: pageSpec.quantity || 1,
    unit: ingredient?.defaultUnit || 'cup',
    context: pageSpec.context || 'general',
    goal: pageSpec.goal,
    dietFilters: pageSpec.diet ? [pageSpec.diet] : [],
  };
}
