// Core enums and types for the ingredient substitution tool

export type Cluster = 'egg' | 'milk_cream' | 'flour_butter';

export type DietTag = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'keto' | 'nut-free';

export type GoalTag = 'binding' | 'leavening' | 'moisture' | 'richness' | 'fluffy' | 'chewy' | 'browning' | 'structure' | 'tenderness';

export type Unit = 'egg' | 'eggs' | 'cup' | 'cups' | 'tbsp' | 'tsp' | 'ml' | 'g' | 'oz' | 'flax_egg' | 'chia_egg';

export type RecipeContext = 
  | 'cake' 
  | 'cookies' 
  | 'brownies' 
  | 'muffins' 
  | 'pancakes' 
  | 'waffles' 
  | 'bread' 
  | 'banana_bread'
  | 'cupcakes'
  | 'pasta' 
  | 'soup' 
  | 'sauce' 
  | 'mac_and_cheese' 
  | 'mashed_potatoes' 
  | 'frosting'
  | 'general';

export type TasteImpact = 'none' | 'low' | 'medium' | 'high';

export type SlugVariant = 
  | 'base' 
  | 'context' 
  | 'goal' 
  | 'diet' 
  | 'quantity' 
  | 'exclusion'
  | 'combined';

// Ratio for conversion calculations
export interface Ratio {
  amount: number;
  unit: Unit;
  perUnit?: Unit; // e.g., "per egg"
}

// Context-specific ratio override
export interface ContextOverride {
  context: RecipeContext;
  ratio: Ratio;
  notes?: string;
}

// A single substitute option for an ingredient
export interface SubstituteOption {
  id: string;
  name: string;
  displayName: string;
  baseRatio: Ratio;
  contextOverrides?: ContextOverride[];
  dietTags: DietTag[];
  goals: GoalTag[];
  bestIn: RecipeContext[];
  avoidIn: RecipeContext[];
  tasteImpact: TasteImpact;
  textureImpact: string;
  whenNotToUse: string[];
  notes: string;
  addOns?: string[];
  affiliateKeywords?: string[];
}

// Main ingredient data structure
export interface Ingredient {
  id: string;
  name: string;
  displayName: string;
  cluster: Cluster;
  defaultUnit: Unit;
  alternateUnits?: Unit[];
  substitutes: SubstituteOption[];
  commonContexts: RecipeContext[];
  faqItems: FAQItem[];
}

// FAQ for JSON-LD and display
export interface FAQItem {
  question: string;
  answer: string;
}

// Page specification for static generation
export interface PageSpec {
  slug: string;
  ingredientId: string;
  cluster: Cluster;
  variant: SlugVariant;
  context?: RecipeContext;
  goal?: GoalTag;
  diet?: DietTag;
  quantity?: number;
  exclusion?: string; // e.g., "without-banana"
  title: string;
  metaDescription: string;
  h1: string;
  introTemplate: string;
}

// Calculator input from user
export interface CalculatorInput {
  quantity: number;
  unit: Unit;
  context: RecipeContext;
  goal?: GoalTag;
  dietFilters: DietTag[];
}

// Calculator output result
export interface SubstituteResult {
  substitute: SubstituteOption;
  computedAmount: number;
  displayAmount: string;
  unit: Unit;
  reasoning: string;
  addOns: string[];
  rank: number;
}

export interface CalculatorOutput {
  results: SubstituteResult[];
  originalQuantity: number;
  originalUnit: Unit;
  context: RecipeContext;
}

// Related links for internal linking
export interface RelatedLink {
  slug: string;
  title: string;
  type: 'base' | 'context' | 'diet' | 'cross-cluster' | 'quantity';
  priority?: number; // Lower number = higher priority
}

// SEO metadata
export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}
