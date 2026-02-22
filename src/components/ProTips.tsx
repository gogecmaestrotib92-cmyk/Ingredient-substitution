import type { PageSpec, Ingredient, RecipeContext } from '@/lib/types';

interface ProTip {
  tip: string;
  context: string;
}

// Context-specific tips database
const CONTEXT_TIPS: Record<string, ProTip[]> = {
  cake: [
    { tip: 'Add ¼ teaspoon extra baking powder when using egg substitutes to maintain lift.', context: 'leavening' },
    { tip: 'Reduce oven temperature by 25°F when using fruit-based substitutes to prevent over-browning.', context: 'temperature' },
    { tip: 'Let batter rest 2-3 minutes after mixing to allow binding agents to hydrate.', context: 'preparation' },
    { tip: 'Use room temperature ingredients for better emulsification with egg replacers.', context: 'temperature' },
    { tip: 'For delicate cakes, choose aquafaba over denser substitutes like banana.', context: 'texture' },
  ],
  cookies: [
    { tip: 'Chill dough 30 minutes longer when using egg substitutes to control spread.', context: 'preparation' },
    { tip: 'Reduce sugar by 1-2 tablespoons if using banana to balance sweetness.', context: 'sweetness' },
    { tip: 'Add 1 tablespoon extra flour if using applesauce to offset added moisture.', context: 'moisture' },
    { tip: 'For chewy cookies, flax egg outperforms other substitutes—let it gel 5 minutes first.', context: 'texture' },
    { tip: 'Underbake by 1-2 minutes as egg-free cookies firm up more while cooling.', context: 'timing' },
  ],
  brownies: [
    { tip: 'For fudgy brownies, use oil-based substitutes rather than fruit purees.', context: 'texture' },
    { tip: 'Increase cocoa by 1 tablespoon when using banana to mask its flavor.', context: 'flavor' },
    { tip: 'Let brownies cool completely in the pan—they set more than traditional recipes.', context: 'cooling' },
    { tip: 'Line pan with parchment for easier release since egg-free brownies are more delicate.', context: 'preparation' },
    { tip: 'Avoid overmixing which develops gluten and creates cakey rather than fudgy texture.', context: 'technique' },
  ],
  muffins: [
    { tip: 'Fill cups slightly higher than usual—egg-free batters rise less.', context: 'portioning' },
    { tip: 'Applesauce works exceptionally well here, adding moisture without affecting rise significantly.', context: 'substitute' },
    { tip: 'Add a splash of vinegar to activate baking soda for better lift.', context: 'leavening' },
    { tip: 'Check doneness with a toothpick—egg-free muffins may look done before centers set.', context: 'timing' },
    { tip: 'Brush tops with plant milk before baking for golden color.', context: 'appearance' },
  ],
  pancakes: [
    { tip: 'Let batter rest 5 minutes for flax or chia eggs to fully hydrate and bind.', context: 'preparation' },
    { tip: 'Cook on medium-low heat—egg-free pancakes need gentler heat to cook through.', context: 'temperature' },
    { tip: 'Add extra baking powder (¼ tsp per egg replaced) to compensate for lost lift.', context: 'leavening' },
    { tip: 'Flip when bubbles form and edges look set—don&apos;t wait for bubbles to pop.', context: 'timing' },
    { tip: 'Mashed banana adds natural sweetness—reduce added sugar accordingly.', context: 'sweetness' },
  ],
  banana_bread: [
    { tip: 'Egg substitutes are often unnecessary here—ripe bananas provide excellent binding.', context: 'substitute' },
    { tip: 'If using additional substitutes, reduce banana quantity slightly to avoid excess moisture.', context: 'moisture' },
    { tip: 'Bake at 325°F instead of 350°F for more even cooking without egg structure.', context: 'temperature' },
    { tip: 'Test doneness at the center—egg-free loaves may dome but remain underdone inside.', context: 'timing' },
    { tip: 'Cool in pan 15 minutes before removing to prevent crumbling.', context: 'cooling' },
  ],
  pasta: [
    { tip: 'When replacing heavy cream, whisk substitute gradually to prevent curdling.', context: 'technique' },
    { tip: 'Cashew cream creates the silkiest dairy-free pasta sauces.', context: 'substitute' },
    { tip: 'Reserve pasta water—starchier water helps plant-based sauces coat pasta better.', context: 'technique' },
    { tip: 'Add substitute off heat, then return to low to prevent separation.', context: 'temperature' },
    { tip: 'Nutritional yeast adds depth that mimics the richness of cream-based sauces.', context: 'flavor' },
  ],
  soup: [
    { tip: 'Blend cashews or silken tofu for cream-like thickness without dairy.', context: 'substitute' },
    { tip: 'Add cream substitutes at the end and avoid boiling to prevent separation.', context: 'technique' },
    { tip: 'Coconut milk works well but adds subtle sweetness—balance with extra salt.', context: 'flavor' },
    { tip: 'Puree a portion of the soup itself for body without adding cream.', context: 'technique' },
    { tip: 'Full-fat versions of plant milks provide better mouthfeel than light varieties.', context: 'texture' },
  ],
  mac_and_cheese: [
    { tip: 'Oat milk creates the creamiest dairy-free mac sauces due to its natural thickness.', context: 'substitute' },
    { tip: 'Add a tablespoon of cashew butter for richness without coconut flavor.', context: 'flavor' },
    { tip: 'Nutritional yeast is essential for cheesy flavor in dairy-free versions.', context: 'flavor' },
    { tip: 'Thicken plant milk sauces with a cornstarch slurry for silky consistency.', context: 'technique' },
    { tip: 'Use unsweetened milk alternatives to avoid sweet undertones in savory sauce.', context: 'ingredient' },
  ],
};

// Ingredient-specific tips
const INGREDIENT_TIPS: Record<string, ProTip[]> = {
  egg: [
    { tip: 'Ground flax needs 5 minutes to gel before use—mix with water first.', context: 'preparation' },
    { tip: 'Commercial egg replacers work best for recipes requiring significant lift.', context: 'substitute' },
    { tip: 'Aquafaba (chickpea water) whips like egg whites for meringues and mousses.', context: 'specialty' },
    { tip: 'One substitute rarely works for all purposes—match to your recipe&apos;s main egg function.', context: 'selection' },
  ],
  milk: [
    { tip: 'Oat milk is closest to dairy milk in baking performance and neutral flavor.', context: 'substitute' },
    { tip: 'Coconut milk adds richness but imparts subtle coconut flavor to baked goods.', context: 'flavor' },
    { tip: 'Use unsweetened versions to avoid affecting recipe sweetness.', context: 'ingredient' },
    { tip: 'Shake plant milks before using—separation is normal and doesn&apos;t affect quality.', context: 'preparation' },
  ],
  heavy_cream: [
    { tip: 'Full-fat coconut cream whips similarly to dairy cream when chilled overnight.', context: 'specialty' },
    { tip: 'Cashew cream provides neutral flavor for savory applications.', context: 'flavor' },
    { tip: 'Silken tofu blended smooth creates surprisingly creamy dessert bases.', context: 'substitute' },
    { tip: 'Reduce liquid slightly when using thinner substitutes like oat cream.', context: 'moisture' },
  ],
  butter: [
    { tip: 'Coconut oil solidifies when cold—use for recipes requiring cold butter.', context: 'temperature' },
    { tip: 'Vegan butter sticks work 1:1 but may contain more water—reduce other liquids slightly.', context: 'moisture' },
    { tip: 'For pie crusts, freeze coconut oil and grate it for flaky layers.', context: 'technique' },
    { tip: 'Neutral oils like canola work for cakes but won&apos;t create the same flakiness in pastry.', context: 'texture' },
  ],
  all_purpose_flour: [
    { tip: 'Gluten-free blends with xanthan gum perform most similarly to wheat flour.', context: 'substitute' },
    { tip: 'Add ¼ teaspoon xanthan gum per cup if your GF flour doesn&apos;t include it.', context: 'technique' },
    { tip: 'Let GF batters rest 10 minutes for starches to hydrate properly.', context: 'preparation' },
    { tip: 'Almond flour adds protein but doesn&apos;t provide structure—combine with starches.', context: 'texture' },
  ],
};

// Diet-specific tips
const DIET_TIPS: Record<string, ProTip[]> = {
  vegan: [
    { tip: 'Aquafaba (3 tbsp) replaces one egg white for vegan meringues and macarons.', context: 'specialty' },
    { tip: 'Flax and chia eggs work best in dense, moist baked goods like brownies.', context: 'texture' },
    { tip: 'Check sugar sources—some refined sugars use bone char in processing.', context: 'ingredient' },
  ],
  'gluten-free': [
    { tip: 'Measure GF flour by weight for consistent results—it packs differently than wheat.', context: 'measurement' },
    { tip: 'Expect slightly denser results—add an extra ¼ tsp baking powder for lift.', context: 'leavening' },
    { tip: 'Cool GF baked goods completely before cutting to prevent crumbling.', context: 'cooling' },
  ],
  'dairy-free': [
    { tip: 'Full-fat coconut milk provides the richest results in cream-based recipes.', context: 'substitute' },
    { tip: 'Plant butter may brown faster—watch carefully and reduce temperature if needed.', context: 'temperature' },
  ],
};

/**
 * Build contextual pro tips for a specific page
 */
export function buildProTips(pageSpec: PageSpec, ingredient: Ingredient): string[] {
  const tips: ProTip[] = [];
  const { context, diet, ingredientId } = pageSpec;
  
  // Add context-specific tips
  if (context && CONTEXT_TIPS[context]) {
    tips.push(...CONTEXT_TIPS[context].slice(0, 3));
  }
  
  // Add ingredient-specific tips
  if (INGREDIENT_TIPS[ingredientId]) {
    tips.push(...INGREDIENT_TIPS[ingredientId].slice(0, 2));
  }
  
  // Add diet-specific tips
  if (diet && DIET_TIPS[diet]) {
    tips.push(...DIET_TIPS[diet].slice(0, 2));
  }
  
  // Dedupe by context and limit to 5
  const seen = new Set<string>();
  const uniqueTips = tips.filter(t => {
    if (seen.has(t.context)) return false;
    seen.add(t.context);
    return true;
  });
  
  return uniqueTips.slice(0, 5).map(t => t.tip);
}

/**
 * ProTips component for priority pages
 */
export function ProTips({ tips }: { tips: string[] }) {
  if (tips.length === 0) return null;
  
  return (
    <section className="mt-10 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">💡</span>
        Pro Tips for Best Results
      </h2>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 sm:p-6">
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-3 text-slate-700">
              <span className="text-amber-500 font-bold shrink-0">✓</span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
