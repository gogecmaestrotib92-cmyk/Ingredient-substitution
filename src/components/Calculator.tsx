'use client';

import { useState, useEffect } from 'react';
import type { PageSpec, CalculatorInput, CalculatorOutput, RecipeContext, GoalTag, DietTag, Unit } from '@/lib/types';
import { calculateSubstitution, getDefaultInput } from '@/lib/calculateSubstitution';
import { getIngredientById } from '@/lib/data';
import { SubstituteCard } from './SubstituteCard';

interface CalculatorProps {
  pageSpec: PageSpec;
}

const RECIPE_CONTEXTS: { value: RecipeContext; label: string }[] = [
  { value: 'cake', label: 'Cake' },
  { value: 'cookies', label: 'Cookies' },
  { value: 'brownies', label: 'Brownies' },
  { value: 'muffins', label: 'Muffins' },
  { value: 'pancakes', label: 'Pancakes' },
  { value: 'waffles', label: 'Waffles' },
  { value: 'bread', label: 'Bread' },
  { value: 'banana_bread', label: 'Banana Bread' },
  { value: 'cupcakes', label: 'Cupcakes' },
  { value: 'pasta', label: 'Pasta' },
  { value: 'soup', label: 'Soup' },
  { value: 'sauce', label: 'Sauce' },
  { value: 'mac_and_cheese', label: 'Mac & Cheese' },
  { value: 'mashed_potatoes', label: 'Mashed Potatoes' },
  { value: 'frosting', label: 'Frosting' },
  { value: 'general', label: 'General' },
];

const GOALS: { value: GoalTag; label: string }[] = [
  { value: 'binding', label: 'Binding' },
  { value: 'leavening', label: 'Leavening / Rise' },
  { value: 'moisture', label: 'Moisture' },
  { value: 'richness', label: 'Richness' },
  { value: 'fluffy', label: 'Fluffy' },
  { value: 'chewy', label: 'Chewy' },
  { value: 'browning', label: 'Browning' },
  { value: 'structure', label: 'Structure' },
  { value: 'tenderness', label: 'Tenderness' },
];

const DIETS: { value: DietTag; label: string }[] = [
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'keto', label: 'Keto' },
];

export function Calculator({ pageSpec }: CalculatorProps) {
  const ingredient = getIngredientById(pageSpec.ingredientId);
  const defaultInput = getDefaultInput(pageSpec);
  
  const [quantityInput, setQuantityInput] = useState(String(defaultInput.quantity));
  const [unit, setUnit] = useState<Unit>(defaultInput.unit);
  
  // Parse quantity for calculations (default to 1 if invalid)
  const quantity = parseFloat(quantityInput) || 1;
  const [context, setContext] = useState<RecipeContext>(defaultInput.context);
  const [goal, setGoal] = useState<GoalTag | undefined>(defaultInput.goal);
  const [dietFilters, setDietFilters] = useState<DietTag[]>(defaultInput.dietFilters);
  const [output, setOutput] = useState<CalculatorOutput | null>(null);

  // Calculate on input change
  useEffect(() => {
    const input: CalculatorInput = {
      quantity,
      unit,
      context,
      goal,
      dietFilters,
    };
    
    const result = calculateSubstitution(pageSpec, input);
    setOutput(result);
  }, [quantity, unit, context, goal, dietFilters, pageSpec]);

  // Toggle diet filter
  const toggleDiet = (diet: DietTag) => {
    setDietFilters(prev =>
      prev.includes(diet)
        ? prev.filter(d => d !== diet)
        : [...prev, diet]
    );
  };

  // Get available units for this ingredient
  const availableUnits: Unit[] = ingredient
    ? [ingredient.defaultUnit, ...(ingredient.alternateUnits || [])]
    : ['cup'];

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 px-5 sm:px-6 py-4 sm:py-5 border-b border-primary-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Substitution Calculator
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Enter your recipe details to get exact conversion amounts
        </p>
      </div>

      <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
        {/* Quantity and Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0.25"
              step="0.25"
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
              onBlur={() => {
                // Reset to 1 if empty or invalid on blur
                if (!quantityInput || parseFloat(quantityInput) <= 0) {
                  setQuantityInput('1');
                }
              }}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="input cursor-pointer"
            >
              {availableUnits.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipe Context */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Recipe Type
          </label>
          <select
            value={context}
            onChange={(e) => setContext(e.target.value as RecipeContext)}
            className="input cursor-pointer"
          >
            {RECIPE_CONTEXTS.map(ctx => (
              <option key={ctx.value} value={ctx.value}>{ctx.label}</option>
            ))}
          </select>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Primary Goal <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <select
            value={goal || ''}
            onChange={(e) => setGoal(e.target.value as GoalTag || undefined)}
            className="input cursor-pointer"
          >
            <option value="">Any</option>
            {GOALS.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>

        {/* Dietary Filters */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Dietary Requirements
          </label>
          <div className="flex flex-wrap gap-2">
            {DIETS.map(diet => (
              <button
                key={diet.value}
                onClick={() => toggleDiet(diet.value)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all touch-manipulation ${
                  dietFilters.includes(diet.value)
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {output && output.results.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50/50 p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-5">
            Top {output.results.length} Substitutes for {quantity} {unit}
            {quantity !== 1 ? 's' : ''}
          </h3>
          <div className="space-y-4">
            {output.results.map((result) => (
              <SubstituteCard key={result.substitute.id} result={result} />
            ))}
          </div>
        </div>
      )}

      {output && output.results.length === 0 && (
        <div className="border-t border-slate-200 p-5 sm:p-6">
          <div className="text-center py-8 sm:py-10">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
            <p className="font-semibold text-slate-700 text-base sm:text-lg">No substitutes match your filters</p>
            <p className="text-slate-500 text-sm sm:text-base mt-1">Try removing some dietary restrictions</p>
          </div>
        </div>
      )}
    </div>
  );
}
