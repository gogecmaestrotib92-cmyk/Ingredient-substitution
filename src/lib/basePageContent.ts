import type { Ingredient } from './types';

/**
 * Short intro for base ingredient pages (80-120 words)
 * Displayed above the calculator for tool-first UX
 */
export function buildShortIntro(ingredient: Ingredient): string {
  const name = ingredient.displayName.toLowerCase();
  const subCount = ingredient.substitutes.length;
  const top1 = ingredient.substitutes[0]?.displayName || 'alternative';
  const top2 = ingredient.substitutes[1]?.displayName || 'option';

  const intros: Record<string, string> = {
    egg: `Need to replace eggs? The best substitute depends on what eggs do in your recipe—binding, leavening, or moisture. This calculator shows ${subCount} tested options with exact ratios for each. Top choices: ${top1} for binding, ${top2} for moisture. Select your quantity and recipe type below, then check texture impact ratings and "avoid in" warnings to pick the right one.`,

    milk: `Out of milk or need a dairy-free swap? This calculator ranks ${subCount} alternatives by recipe type—baking, cooking, or sauces. Top options: ${top1} for similar richness, ${top2} for lighter recipes. Milk provides fat and moisture, so the best substitute depends on what you're making. Enter your quantity and recipe context to see exact ratios and texture impact.`,

    butter: `No butter—or need a vegan option? The right substitute depends on what butter does: fat for flakiness, moisture for tenderness, or flavor. This calculator shows ${subCount} tested alternatives with ratios adjusted by recipe. Top choices: ${top1} and ${top2}. Select quantity and recipe type to get precise measurements plus texture and taste impact ratings.`,

    all_purpose_flour: `Need to swap flour for dietary or pantry reasons? This calculator covers ${subCount} alternatives ranked by recipe type. Top options: ${top1} for similar structure, ${top2} for gluten-free. Flour affects rise, density, and crumb—so substitutes work differently in cakes vs. bread vs. cookies. Enter quantity and recipe context for exact ratios and texture warnings.`,

    heavy_cream: `No heavy cream or avoiding dairy? This calculator shows ${subCount} alternatives ranked by use case—whipping, sauces, or cooking. Top choices: ${top1} for richness, ${top2} for lighter applications. Cream adds fat and body; substitutes vary in whipping ability. Select your quantity and recipe type for precise ratios and texture impact.`,
  };

  // Return ingredient-specific intro or generic fallback
  return intros[ingredient.id] || 
    `Need to replace ${name}? This calculator shows ${subCount} tested alternatives with exact ratios. Select your quantity and recipe type below to see the best options ranked by texture impact and dietary fit.`;
}

/**
 * Long explanation content for "How X Substitutes Work" section
 * Displayed below the calculator for SEO value
 */
export function buildLongExplanation(ingredient: Ingredient): {
  title: string;
  paragraphs: string[];
} {
  const name = ingredient.displayName.toLowerCase();
  const Name = ingredient.displayName;
  const subCount = ingredient.substitutes.length;
  const top1 = ingredient.substitutes[0];
  const top2 = ingredient.substitutes[1];
  const top3 = ingredient.substitutes[2];

  const explanations: Record<string, { title: string; paragraphs: string[] }> = {
    egg: {
      title: 'How Egg Substitutes Work',
      paragraphs: [
        `Eggs serve three main functions in recipes: binding (holding ingredients together), leavening (providing rise), and adding moisture. The best substitute depends on which function matters most. For binding-heavy recipes like cookies, ${top1?.displayName} works well. For cakes needing rise, aquafaba or commercial egg replacers perform better.`,
        `Texture impact varies significantly. ${top1?.displayName} produces a slightly denser crumb with less lift than real eggs—acceptable in brownies, less ideal in angel food cake. ${top2?.displayName} adds moisture but minimal structure, making it better for quick breads than delicate pastries.`,
        `Our calculator ranks all ${subCount} options by recipe context, showing texture ratings and specific warnings. Some substitutes work in nearly any recipe; others fail in specific applications. Check the "avoid in" notes before choosing.`,
      ],
    },

    milk: {
      title: 'How Milk Substitutes Work',
      paragraphs: [
        `Milk contributes fat, protein, and moisture to recipes. In baking, it creates tender crumb and helps with browning. In cooking, it provides creaminess and body. The best substitute depends on fat content and application—${top1?.displayName} works for most baking, while ${top2?.displayName} suits lighter uses.`,
        `Texture changes are generally subtle in baking but more noticeable in sauces and creamy dishes. Plant milks with higher fat (coconut, oat) perform closer to whole milk. Lower-fat options (almond, rice) work but may produce slightly drier results in cakes.`,
        `This calculator shows ${subCount} alternatives with ratios adjusted by recipe type. Dietary tags help filter for dairy-free, vegan, or other requirements. The texture impact column sets proper expectations for your finished dish.`,
      ],
    },

    butter: {
      title: 'How Butter Substitutes Work',
      paragraphs: [
        `Butter provides fat, flavor, and moisture. In pie crust and biscuits, cold butter creates flaky layers. In cookies, it controls spread and chewiness. In frosting, it adds richness. ${top1?.displayName} replicates fat content well; ${top2?.displayName} adds moisture but changes texture.`,
        `Substitutes affect texture differently by recipe type. Coconut oil creates similar flakiness in pie crust but adds slight flavor. Applesauce reduces fat while adding moisture—good for muffins, less ideal for butter-forward recipes like shortbread.`,
        `Our calculator ranks ${subCount} options with texture impact ratings and recipe-specific warnings. Some work universally; others fail in high-butter applications. Always check the "avoid in" notes for critical recipes.`,
      ],
    },

    all_purpose_flour: {
      title: 'How Flour Substitutes Work',
      paragraphs: [
        `Flour provides structure through gluten formation, affects density, and determines crumb texture. Substitutes work differently: ${top1?.displayName} mimics all-purpose flour closely, while gluten-free blends often need binding agents like xanthan gum to prevent crumbling.`,
        `Gluten-free flours behave differently in each recipe. Almond flour adds moisture and density—good for cookies, challenging for bread. Oat flour creates tender results but doesn't rise as well. Blends work most reliably across recipe types.`,
        `This calculator shows ${subCount} alternatives with ratios adjusted by context. Some substitutes require technique changes (resting batter, adjusting liquid). Check texture ratings and warnings before substituting in structure-critical recipes like bread or layer cake.`,
      ],
    },

    heavy_cream: {
      title: 'How Heavy Cream Substitutes Work',
      paragraphs: [
        `Heavy cream provides high fat content (36%+) for richness, body, and whipping ability. In sauces, it creates silky texture. In desserts, it whips into stable peaks. ${top1?.displayName} works for cooking applications; whipping requires specific alternatives like coconut cream.`,
        `Not all substitutes whip. Coconut cream (chilled) whips well; cashew cream stays liquid. For sauces, most alternatives work but may be thinner—simmer longer to reduce. In coffee, fat content matters for smooth blending without separation.`,
        `This calculator ranks ${subCount} options by use case with texture impact ratings. Dietary filters help find dairy-free or vegan alternatives. The "best in" notes indicate which substitutes work for whipping vs. cooking vs. coffee.`,
      ],
    },
  };

  // Return ingredient-specific explanation or generic
  return explanations[ingredient.id] || {
    title: `How ${Name} Substitutes Work`,
    paragraphs: [
      `${Name} serves specific functions in recipes that affect texture, structure, and flavor. The best substitute depends on your recipe type and which property matters most.`,
      `Our calculator shows ${subCount} tested alternatives ranked by recipe context. Each includes texture impact ratings showing how close the result will be to the original—from nearly identical to noticeable change.`,
      `Dietary tags help filter for vegan, gluten-free, dairy-free, or other requirements. Check "best in" recommendations and "avoid in" warnings before choosing to ensure the substitute works for your specific application.`,
    ],
  };
}

/**
 * Check if a page is a base ingredient page
 */
export function isBasePage(variant: string): boolean {
  return variant === 'base';
}
