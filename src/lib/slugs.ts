import type { PageSpec, Cluster, RecipeContext, GoalTag, DietTag, SlugVariant } from './types';

// Recipe contexts for each cluster
const eggContexts: RecipeContext[] = ['cake', 'cookies', 'brownies', 'muffins', 'pancakes', 'waffles', 'bread', 'banana_bread', 'cupcakes'];
const milkContexts: RecipeContext[] = ['cake', 'pancakes', 'bread', 'mac_and_cheese', 'mashed_potatoes', 'brownies', 'muffins'];
const creamContexts: RecipeContext[] = ['pasta', 'soup', 'sauce', 'frosting'];
const flourContexts: RecipeContext[] = ['cake', 'cookies', 'pancakes', 'bread', 'brownies', 'muffins'];
const butterContexts: RecipeContext[] = ['cookies', 'cake', 'brownies', 'frosting', 'bread'];

// Goals by cluster
const eggGoals: GoalTag[] = ['binding', 'leavening', 'moisture', 'fluffy', 'chewy'];
const milkGoals: GoalTag[] = ['moisture', 'richness', 'browning'];
const flourGoals: GoalTag[] = ['structure', 'tenderness', 'binding'];
const butterGoals: GoalTag[] = ['richness', 'moisture', 'browning'];

// Generate page specs programmatically
export function buildPageSpecs(): PageSpec[] {
  const specs: PageSpec[] = [];
  
  // ============ EGG CLUSTER ============
  
  // Base egg page
  specs.push(createPageSpec({
    slug: 'egg',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'base',
  }));
  
  // Quantity variants (2, 3, 4 eggs)
  [2, 3, 4].forEach(qty => {
    specs.push(createPageSpec({
      slug: `egg-for-${qty}-eggs`,
      ingredientId: 'egg',
      cluster: 'egg',
      variant: 'quantity',
      quantity: qty,
    }));
  });
  
  // Context variants
  eggContexts.forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `egg-in-${ctxSlug}`,
      ingredientId: 'egg',
      cluster: 'egg',
      variant: 'context',
      context: ctx,
    }));
  });
  
  // Goal variants
  eggGoals.forEach(goal => {
    specs.push(createPageSpec({
      slug: `egg-for-${goal}`,
      ingredientId: 'egg',
      cluster: 'egg',
      variant: 'goal',
      goal,
    }));
  });
  
  // Vegan egg in context
  ['cake', 'cookies', 'brownies', 'muffins', 'pancakes'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `vegan-egg-in-${ctxSlug}`,
      ingredientId: 'egg',
      cluster: 'egg',
      variant: 'combined',
      context: ctx as RecipeContext,
      diet: 'vegan',
    }));
  });
  
  // Exclusion variants
  specs.push(createPageSpec({
    slug: 'egg-substitute-without-banana',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'exclusion',
    exclusion: 'without-banana',
  }));
  
  specs.push(createPageSpec({
    slug: 'egg-substitute-without-applesauce',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'exclusion',
    exclusion: 'without-applesauce',
  }));
  
  // Quantity + context combos
  [2, 3].forEach(qty => {
    ['cake', 'cookies', 'brownies', 'muffins'].forEach(ctx => {
      const ctxSlug = ctx.replace(/_/g, '-');
      specs.push(createPageSpec({
        slug: `${qty}-eggs-in-${ctxSlug}`,
        ingredientId: 'egg',
        cluster: 'egg',
        variant: 'combined',
        context: ctx as RecipeContext,
        quantity: qty,
      }));
    });
  });
  
  // Additional egg exclusion variants
  specs.push(createPageSpec({
    slug: 'egg-substitute-without-flax',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'exclusion',
    exclusion: 'without-flax',
  }));
  
  specs.push(createPageSpec({
    slug: 'egg-substitute-without-soy',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'exclusion',
    exclusion: 'without-soy',
  }));
  
  // Egg substitute base page (alternate phrasing)
  specs.push(createPageSpec({
    slug: 'egg-substitute',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'egg-replacer',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'base',
  }));
  
  // Vegan egg additional contexts
  ['waffles', 'bread', 'cupcakes'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `vegan-egg-in-${ctxSlug}`,
      ingredientId: 'egg',
      cluster: 'egg',
      variant: 'combined',
      context: ctx as RecipeContext,
      diet: 'vegan',
    }));
  });
  
  // 4 eggs in context
  ['cake', 'brownies'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `4-eggs-in-${ctxSlug}`,
      ingredientId: 'egg',
      cluster: 'egg',
      variant: 'combined',
      context: ctx as RecipeContext,
      quantity: 4,
    }));
  });
  
  // ============ MILK & CREAM CLUSTER ============
  
  // Base milk page
  specs.push(createPageSpec({
    slug: 'milk',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Milk context variants
  milkContexts.forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `milk-in-${ctxSlug}`,
      ingredientId: 'milk',
      cluster: 'milk_cream',
      variant: 'context',
      context: ctx,
    }));
  });
  
  // Milk goal variants
  milkGoals.forEach(goal => {
    specs.push(createPageSpec({
      slug: `milk-for-${goal}`,
      ingredientId: 'milk',
      cluster: 'milk_cream',
      variant: 'goal',
      goal,
    }));
  });
  
  // Diet variants
  specs.push(createPageSpec({
    slug: 'dairy-free-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'diet',
    diet: 'dairy-free',
  }));
  
  specs.push(createPageSpec({
    slug: 'keto-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'diet',
    diet: 'keto',
  }));
  
  specs.push(createPageSpec({
    slug: 'vegan-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'diet',
    diet: 'vegan',
  }));
  
  // Heavy cream
  specs.push(createPageSpec({
    slug: 'heavy-cream',
    ingredientId: 'heavy_cream',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  creamContexts.forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `heavy-cream-in-${ctxSlug}`,
      ingredientId: 'heavy_cream',
      cluster: 'milk_cream',
      variant: 'context',
      context: ctx,
    }));
  });
  
  specs.push(createPageSpec({
    slug: 'dairy-free-cream-substitute',
    ingredientId: 'heavy_cream',
    cluster: 'milk_cream',
    variant: 'diet',
    diet: 'dairy-free',
  }));
  
  specs.push(createPageSpec({
    slug: 'vegan-cream-substitute',
    ingredientId: 'heavy_cream',
    cluster: 'milk_cream',
    variant: 'diet',
    diet: 'vegan',
  }));
  
  // Heavy cream goal variants
  ['richness', 'moisture'].forEach(goal => {
    specs.push(createPageSpec({
      slug: `heavy-cream-for-${goal}`,
      ingredientId: 'heavy_cream',
      cluster: 'milk_cream',
      variant: 'goal',
      goal: goal as GoalTag,
    }));
  });
  
  // Vegan milk in contexts
  ['cake', 'pancakes', 'mac-and-cheese'].forEach(ctx => {
    const context = ctx.replace(/-/g, '_') as RecipeContext;
    specs.push(createPageSpec({
      slug: `vegan-milk-in-${ctx}`,
      ingredientId: 'milk',
      cluster: 'milk_cream',
      variant: 'combined',
      context: context,
      diet: 'vegan',
    }));
  });
  
  // Dairy-free milk in contexts
  ['mashed-potatoes', 'brownies'].forEach(ctx => {
    const context = ctx.replace(/-/g, '_') as RecipeContext;
    specs.push(createPageSpec({
      slug: `dairy-free-milk-in-${ctx}`,
      ingredientId: 'milk',
      cluster: 'milk_cream',
      variant: 'combined',
      context: context,
      diet: 'dairy-free',
    }));
  });
  
  // Half and half
  specs.push(createPageSpec({
    slug: 'half-and-half',
    ingredientId: 'half_and_half',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'half-and-half-substitute',
    ingredientId: 'half_and_half',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Whipping cream
  specs.push(createPageSpec({
    slug: 'whipping-cream',
    ingredientId: 'whipping_cream',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'whipping-cream-substitute',
    ingredientId: 'whipping_cream',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // ============ FLOUR & BUTTER CLUSTER ============
  
  // All-purpose flour
  specs.push(createPageSpec({
    slug: 'all-purpose-flour',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  flourContexts.forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `flour-in-${ctxSlug}`,
      ingredientId: 'all_purpose_flour',
      cluster: 'flour_butter',
      variant: 'context',
      context: ctx,
    }));
  });
  
  // Gluten-free flour
  specs.push(createPageSpec({
    slug: 'gluten-free-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'diet',
    diet: 'gluten-free',
  }));
  
  specs.push(createPageSpec({
    slug: 'keto-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'diet',
    diet: 'keto',
  }));
  
  // Gluten-free flour in contexts
  ['cake', 'cookies', 'brownies', 'pancakes'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `gluten-free-flour-in-${ctxSlug}`,
      ingredientId: 'all_purpose_flour',
      cluster: 'flour_butter',
      variant: 'combined',
      context: ctx as RecipeContext,
      diet: 'gluten-free',
    }));
  });
  
  // Self-rising flour
  specs.push(createPageSpec({
    slug: 'self-rising-flour',
    ingredientId: 'self_rising_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'self-rising-flour-substitute',
    ingredientId: 'self_rising_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Cake flour
  specs.push(createPageSpec({
    slug: 'cake-flour',
    ingredientId: 'cake_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'cake-flour-substitute',
    ingredientId: 'cake_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Bread flour
  specs.push(createPageSpec({
    slug: 'bread-flour',
    ingredientId: 'bread_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'bread-flour-substitute',
    ingredientId: 'bread_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Butter
  specs.push(createPageSpec({
    slug: 'butter',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  butterContexts.forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `butter-in-${ctxSlug}`,
      ingredientId: 'butter',
      cluster: 'flour_butter',
      variant: 'context',
      context: ctx,
    }));
  });
  
  // Goal variants for butter
  specs.push(createPageSpec({
    slug: 'butter-for-browning',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'goal',
    goal: 'browning',
  }));
  
  specs.push(createPageSpec({
    slug: 'butter-for-moisture',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'goal',
    goal: 'moisture',
  }));
  
  // Vegan butter
  specs.push(createPageSpec({
    slug: 'vegan-butter-substitute',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'diet',
    diet: 'vegan',
  }));
  
  specs.push(createPageSpec({
    slug: 'dairy-free-butter-substitute',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'diet',
    diet: 'dairy-free',
  }));
  
  // Vegan butter in contexts
  ['cookies', 'cake', 'brownies', 'frosting'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `vegan-butter-in-${ctxSlug}`,
      ingredientId: 'butter',
      cluster: 'flour_butter',
      variant: 'combined',
      context: ctx as RecipeContext,
      diet: 'vegan',
    }));
  });
  
  // Additional butter variants
  specs.push(createPageSpec({
    slug: 'butter-substitute',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'butter-for-richness',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'goal',
    goal: 'richness',
  }));
  
  // Keto butter
  specs.push(createPageSpec({
    slug: 'keto-butter-substitute',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'diet',
    diet: 'keto',
  }));
  
  // Dairy-free butter in contexts
  ['cookies', 'cake'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `dairy-free-butter-in-${ctxSlug}`,
      ingredientId: 'butter',
      cluster: 'flour_butter',
      variant: 'combined',
      context: ctx as RecipeContext,
      diet: 'dairy-free',
    }));
  });
  
  // Additional flour pages
  specs.push(createPageSpec({
    slug: 'all-purpose-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Almond flour pages
  specs.push(createPageSpec({
    slug: 'almond-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'diet',
    diet: 'keto',
  }));
  
  // Flour goal variants
  ['structure', 'tenderness'].forEach(goal => {
    specs.push(createPageSpec({
      slug: `flour-for-${goal}`,
      ingredientId: 'all_purpose_flour',
      cluster: 'flour_butter',
      variant: 'goal',
      goal: goal as GoalTag,
    }));
  });
  
  // Keto flour in contexts
  ['cookies', 'pancakes', 'brownies'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `keto-flour-in-${ctxSlug}`,
      ingredientId: 'all_purpose_flour',
      cluster: 'flour_butter',
      variant: 'combined',
      context: ctx as RecipeContext,
      diet: 'keto',
    }));
  });
  
  // Self-rising flour in contexts
  ['cake', 'pancakes', 'muffins'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `self-rising-flour-in-${ctxSlug}`,
      ingredientId: 'self_rising_flour',
      cluster: 'flour_butter',
      variant: 'context',
      context: ctx as RecipeContext,
    }));
  });
  
  // Cake flour in contexts
  ['cupcakes'].forEach(ctx => {
    const ctxSlug = ctx.replace(/_/g, '-');
    specs.push(createPageSpec({
      slug: `cake-flour-in-${ctxSlug}`,
      ingredientId: 'cake_flour',
      cluster: 'flour_butter',
      variant: 'context',
      context: ctx as RecipeContext,
    }));
  });
  
  // Additional vegan egg pages
  specs.push(createPageSpec({
    slug: 'vegan-egg-substitute',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'diet',
    diet: 'vegan',
  }));
  
  // Egg white substitute
  specs.push(createPageSpec({
    slug: 'egg-white-substitute',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'base',
  }));
  
  // Buttermilk substitute (using milk data)
  specs.push(createPageSpec({
    slug: 'buttermilk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Sour cream substitute
  specs.push(createPageSpec({
    slug: 'sour-cream-substitute',
    ingredientId: 'heavy_cream',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Cream cheese substitute
  specs.push(createPageSpec({
    slug: 'cream-cheese-substitute',
    ingredientId: 'heavy_cream',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Evaporated milk substitute
  specs.push(createPageSpec({
    slug: 'evaporated-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Condensed milk substitute
  specs.push(createPageSpec({
    slug: 'condensed-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Coconut milk substitute
  specs.push(createPageSpec({
    slug: 'coconut-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  // Whole wheat flour substitute
  specs.push(createPageSpec({
    slug: 'whole-wheat-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Cornstarch substitute
  specs.push(createPageSpec({
    slug: 'cornstarch-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Oil as butter substitute
  specs.push(createPageSpec({
    slug: 'oil-instead-of-butter',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Applesauce as butter substitute
  specs.push(createPageSpec({
    slug: 'applesauce-for-butter',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  // Additional long-tail pages
  specs.push(createPageSpec({
    slug: 'flax-egg-substitute',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'chia-egg-substitute',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'aquafaba-egg-substitute',
    ingredientId: 'egg',
    cluster: 'egg',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'oat-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'almond-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'soy-milk-substitute',
    ingredientId: 'milk',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'coconut-cream-substitute',
    ingredientId: 'heavy_cream',
    cluster: 'milk_cream',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'coconut-oil-for-butter',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'greek-yogurt-for-butter',
    ingredientId: 'butter',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'oat-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'rice-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  specs.push(createPageSpec({
    slug: 'tapioca-flour-substitute',
    ingredientId: 'all_purpose_flour',
    cluster: 'flour_butter',
    variant: 'base',
  }));
  
  return specs;
}

// Helper to create page spec with proper metadata
interface CreatePageSpecInput {
  slug: string;
  ingredientId: string;
  cluster: Cluster;
  variant: SlugVariant;
  context?: RecipeContext;
  goal?: GoalTag;
  diet?: DietTag;
  quantity?: number;
  exclusion?: string;
}

function createPageSpec(input: CreatePageSpecInput): PageSpec {
  const { slug, ingredientId, cluster, variant, context, goal, diet, quantity, exclusion } = input;
  
  // Generate title
  const title = generateTitle(input);
  
  // Generate meta description
  const metaDescription = generateMetaDescription(input);
  
  // Generate H1
  const h1 = generateH1(input);
  
  // Generate intro template
  const introTemplate = generateIntroTemplate(input);
  
  return {
    slug,
    ingredientId,
    cluster,
    variant,
    context,
    goal,
    diet,
    quantity,
    exclusion,
    title,
    metaDescription,
    h1,
    introTemplate,
  };
}

function generateTitle(input: CreatePageSpecInput): string {
  const { ingredientId, context, goal, diet, quantity, exclusion } = input;
  const ingredientName = formatIngredientName(ingredientId);
  
  if (diet && context) {
    const ctxName = formatContextName(context);
    return `${capitalize(diet)} ${ingredientName} Substitute for ${ctxName} | Conversion Calculator`;
  }
  
  if (quantity && context) {
    const ctxName = formatContextName(context);
    return `Substitute for ${quantity} ${ingredientName}s in ${ctxName} | Calculator & Ratios`;
  }
  
  if (context) {
    const ctxName = formatContextName(context);
    return `${ingredientName} Substitute for ${ctxName} | Best Alternatives & Calculator`;
  }
  
  if (goal) {
    return `${ingredientName} Substitute for ${capitalize(goal)} | Calculator & Guide`;
  }
  
  if (diet) {
    return `${capitalize(diet)} ${ingredientName} Substitute | Calculator & Conversion Guide`;
  }
  
  if (quantity) {
    return `Substitute for ${quantity} ${ingredientName}s | Calculator & Ratios`;
  }
  
  if (exclusion) {
    const excluded = exclusion.replace('without-', '');
    return `${ingredientName} Substitute Without ${capitalize(excluded)} | Calculator`;
  }
  
  return `${ingredientName} Substitute | Calculator & Conversion Guide`;
}

function generateMetaDescription(input: CreatePageSpecInput): string {
  const { ingredientId, context, goal, diet, quantity, exclusion } = input;
  const ingredientName = formatIngredientName(ingredientId).toLowerCase();
  
  if (diet && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Find the best ${diet} ${ingredientName} substitutes for ${ctxName}. Use our calculator to get exact conversion ratios and amounts for your recipe.`;
  }
  
  if (quantity && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Need to replace ${quantity} ${ingredientName}s in your ${ctxName} recipe? Use our calculator for exact substitute amounts with step-by-step ratios.`;
  }
  
  if (context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Find the best ${ingredientName} substitutes for ${ctxName}. Calculator with exact ratios, texture comparisons, and pro tips for perfect results.`;
  }
  
  if (goal) {
    return `Best ${ingredientName} substitutes for ${goal} in baking. Use our calculator for exact conversions and find alternatives that match your recipe goals.`;
  }
  
  if (diet) {
    return `${capitalize(diet)} ${ingredientName} substitutes with exact conversion ratios. Use our calculator to find the perfect alternative for any recipe.`;
  }
  
  if (exclusion) {
    const excluded = exclusion.replace('without-', '');
    return `${capitalize(ingredientName)} substitutes without ${excluded}. Calculator with exact ratios and alternatives for your dietary needs.`;
  }
  
  return `Complete guide to ${ingredientName} substitutes with conversion calculator. Find exact ratios for any recipe with our interactive tool.`;
}

function generateH1(input: CreatePageSpecInput): string {
  const { ingredientId, context, goal, diet, quantity, exclusion } = input;
  const ingredientName = formatIngredientName(ingredientId);
  
  if (diet && context) {
    const ctxName = formatContextName(context);
    return `${capitalize(diet)} ${ingredientName} Substitutes for ${ctxName}`;
  }
  
  if (quantity && context) {
    const ctxName = formatContextName(context);
    return `How to Replace ${quantity} ${ingredientName}s in ${ctxName}`;
  }
  
  if (context) {
    const ctxName = formatContextName(context);
    return `Best ${ingredientName} Substitutes for ${ctxName}`;
  }
  
  if (goal) {
    return `${ingredientName} Substitutes for ${capitalize(goal)}`;
  }
  
  if (diet) {
    return `${capitalize(diet)} ${ingredientName} Substitutes`;
  }
  
  if (quantity) {
    return `How to Replace ${quantity} ${ingredientName}s`;
  }
  
  if (exclusion) {
    const excluded = exclusion.replace('without-', '');
    return `${ingredientName} Substitutes Without ${capitalize(excluded)}`;
  }
  
  return `${ingredientName} Substitutes`;
}

function generateIntroTemplate(input: CreatePageSpecInput): string {
  const { ingredientId, context, goal, diet, quantity, exclusion } = input;
  const ingredientName = formatIngredientName(ingredientId).toLowerCase();
  
  if (diet && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Looking for a ${diet} ${ingredientName} substitute for your ${ctxName}? Finding the right replacement matters for both texture and taste. Use our calculator below to get exact conversion amounts for ${diet}-friendly alternatives that work perfectly in ${ctxName} recipes.`;
  }
  
  if (quantity && context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Need to replace ${quantity} ${ingredientName}s in your ${ctxName} recipe? Scaling substitutes correctly is crucial for consistent results. Our calculator gives you precise amounts for each alternative, so your ${ctxName} turns out just right.`;
  }
  
  if (context) {
    const ctxName = formatContextName(context).toLowerCase();
    return `Finding the right ${ingredientName} substitute for ${ctxName} can make or break your recipe. Different alternatives work better depending on whether you need binding, moisture, or lift. Use our calculator to get exact conversion ratios tailored for ${ctxName}.`;
  }
  
  if (goal) {
    return `When you need a ${ingredientName} substitute specifically for ${goal}, not all alternatives are equal. Some excel at providing structure while others add moisture or lift. Our calculator helps you find the best option for your ${goal} needs with precise ratios.`;
  }
  
  if (diet) {
    return `Looking for ${diet} alternatives to ${ingredientName}? You have several great options that won't compromise your recipe. Use our calculator to find the perfect ${diet} substitute with exact conversion amounts for any quantity.`;
  }
  
  if (exclusion) {
    const excluded = exclusion.replace('without-', '');
    return `Need an ${ingredientName} substitute but can't use ${excluded}? No problem. There are plenty of alternatives that work great without it. Our calculator shows you the best options with exact ratios for your recipe.`;
  }
  
  return `Whether you're out of ${ingredientName} or have dietary restrictions, finding the right substitute is essential. Our calculator provides exact conversion ratios for the top alternatives, helping you choose the best option for your specific recipe.`;
}

// Helper functions
function formatIngredientName(id: string): string {
  return id.split('_').map(capitalize).join(' ');
}

function formatContextName(context: RecipeContext): string {
  return context.split('_').map(capitalize).join(' ');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Export all slugs
export function getAllSlugs(): string[] {
  return buildPageSpecs().map(spec => spec.slug);
}

// Get page spec by slug
export function getPageSpecBySlug(slug: string): PageSpec | undefined {
  return buildPageSpecs().find(spec => spec.slug === slug);
}

// Get page specs by cluster
export function getPageSpecsByCluster(cluster: Cluster): PageSpec[] {
  return buildPageSpecs().filter(spec => spec.cluster === cluster);
}
