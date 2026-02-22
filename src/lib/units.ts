import type { Unit } from './types';

// Convert decimal to friendly fraction string
export function toFraction(decimal: number): string {
  if (decimal === 0) return '0';
  
  // Handle whole numbers
  if (Number.isInteger(decimal)) {
    return decimal.toString();
  }
  
  const wholePart = Math.floor(decimal);
  const fractionalPart = decimal - wholePart;
  
  // Common fractions
  const fractions: Record<string, number> = {
    '1/8': 0.125,
    '1/4': 0.25,
    '1/3': 0.333,
    '3/8': 0.375,
    '1/2': 0.5,
    '5/8': 0.625,
    '2/3': 0.667,
    '3/4': 0.75,
    '7/8': 0.875,
  };
  
  // Find closest fraction
  let closestFraction = '';
  let minDiff = Infinity;
  
  for (const [fraction, value] of Object.entries(fractions)) {
    const diff = Math.abs(fractionalPart - value);
    if (diff < minDiff) {
      minDiff = diff;
      closestFraction = fraction;
    }
  }
  
  // If very close to a whole number, round
  if (minDiff > 0.1) {
    return decimal.toFixed(2).replace(/\.?0+$/, '');
  }
  
  if (wholePart === 0) {
    return closestFraction;
  }
  
  return `${wholePart} ${closestFraction}`;
}

// Format amount with appropriate precision
export function formatAmount(amount: number, unit: Unit): string {
  // For cups, tablespoons, teaspoons - use fractions
  if (['cup', 'cups', 'tbsp', 'tsp'].includes(unit)) {
    return toFraction(amount);
  }
  
  // For eggs - whole numbers
  if (['egg', 'eggs', 'flax_egg', 'chia_egg'].includes(unit)) {
    return Math.round(amount).toString();
  }
  
  // For ml and g - decimal with appropriate precision
  if (['ml', 'g', 'oz'].includes(unit)) {
    if (Number.isInteger(amount)) {
      return amount.toString();
    }
    return amount.toFixed(1).replace(/\.0$/, '');
  }
  
  return amount.toString();
}

// Get display unit (pluralize if needed)
export function getDisplayUnit(amount: number, unit: Unit): string {
  const singularToPlural: Partial<Record<Unit, string>> = {
    'cup': 'cups',
    'egg': 'eggs',
    'tbsp': 'tbsp',
    'tsp': 'tsp',
    'flax_egg': 'flax eggs',
    'chia_egg': 'chia eggs',
  };
  
  const pluralToSingular: Partial<Record<Unit, string>> = {
    'cups': 'cup',
    'eggs': 'egg',
  };
  
  if (amount === 1) {
    return pluralToSingular[unit] || unit;
  }
  
  return singularToPlural[unit] || unit;
}

// Format the full amount string
export function formatFullAmount(amount: number, unit: Unit): string {
  const formattedAmount = formatAmount(amount, unit);
  const displayUnit = getDisplayUnit(amount, unit);
  return `${formattedAmount} ${displayUnit}`;
}

// Unit conversion helpers
const ML_PER_CUP = 237;
const ML_PER_TBSP = 15;
const ML_PER_TSP = 5;
const G_PER_CUP_FLOUR = 125;
const G_PER_CUP_BUTTER = 227;

export function convertToMl(amount: number, unit: Unit): number {
  switch (unit) {
    case 'cup':
    case 'cups':
      return amount * ML_PER_CUP;
    case 'tbsp':
      return amount * ML_PER_TBSP;
    case 'tsp':
      return amount * ML_PER_TSP;
    case 'ml':
      return amount;
    default:
      return amount;
  }
}

export function convertFromMl(ml: number, targetUnit: Unit): number {
  switch (targetUnit) {
    case 'cup':
    case 'cups':
      return ml / ML_PER_CUP;
    case 'tbsp':
      return ml / ML_PER_TBSP;
    case 'tsp':
      return ml / ML_PER_TSP;
    case 'ml':
      return ml;
    default:
      return ml;
  }
}
