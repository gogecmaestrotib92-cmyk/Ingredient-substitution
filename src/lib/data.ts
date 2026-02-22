import type { Ingredient } from './types';

// Import JSON data
import eggData from '@/data/egg.json';
import milkCreamData from '@/data/milk_cream.json';
import flourButterData from '@/data/flour_butter.json';

// Type the imported data
const allIngredients: Ingredient[] = [
  ...eggData.ingredients as Ingredient[],
  ...milkCreamData.ingredients as Ingredient[],
  ...flourButterData.ingredients as Ingredient[],
];

// Get all ingredients
export function getAllIngredients(): Ingredient[] {
  return allIngredients;
}

// Get ingredient by ID
export function getIngredientById(id: string): Ingredient | undefined {
  return allIngredients.find(ing => ing.id === id);
}

// Get ingredients by cluster
export function getIngredientsByCluster(cluster: string): Ingredient[] {
  return allIngredients.filter(ing => ing.cluster === cluster);
}

// Search ingredients
export function searchIngredients(query: string): Ingredient[] {
  const lowerQuery = query.toLowerCase();
  return allIngredients.filter(ing => 
    ing.name.toLowerCase().includes(lowerQuery) ||
    ing.displayName.toLowerCase().includes(lowerQuery)
  );
}
