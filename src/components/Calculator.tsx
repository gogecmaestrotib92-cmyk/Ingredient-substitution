'use client';

import { useState, useEffect } from 'react';
import type { PageSpec, CalculatorInput, CalculatorOutput, RecipeContext, GoalTag, DietTag, Unit } from '@/lib/types';
import { calculateSubstitution, getDefaultInput } from '@/lib/calculateSubstitution';
import { getIngredientById } from '@/lib/data';
import { SubstituteCard } from './SubstituteCard';
import { CompactSubstituteRow } from './CompactSubstituteRow';

interface CalculatorProps {
  pageSpec: PageSpec;
}

const RECIPE_CONTEXTS: { value: RecipeContext; label: string }[] = [
  { value: 'general', label: 'General / Any Recipe' },
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
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculate on input change (auto-update)
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
  
  // Hide unit selector for single-unit ingredients (e.g., eggs)
  const showUnitSelector = availableUnits.length > 1;

  return (
    <div className="space-y-6">
      {/* Calculator Inputs */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 px-5 sm:px-6 py-4 sm:py-5 border-b border-primary-100">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Substitution Calculator
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Automatically adjusts substitutes based on what you&apos;re making.
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* PRIMARY INPUT 1: How much? */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              How much are you replacing?
            </label>
            <div className={`grid gap-3 ${showUnitSelector ? 'grid-cols-2' : 'grid-cols-1'}`}>
              <input
                type="number"
                inputMode="decimal"
                min="0.25"
                step="0.25"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                onBlur={() => {
                  if (!quantityInput || parseFloat(quantityInput) <= 0) {
                    setQuantityInput('1');
                  }
                }}
                className="input text-lg font-medium"
                placeholder="1"
              />
              {showUnitSelector && (
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="input cursor-pointer"
                >
                  {availableUnits.map(u => (
                    <option key={u} value={u}>{u}{quantity !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* PRIMARY INPUT 2: What are you making? */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              What are you making?
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

          {/* PRIMARY INPUT 3: Dietary restrictions (chips) */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2.5">
              Any dietary restrictions?
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDietFilters([])}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all touch-manipulation ${
                  dietFilters.length === 0
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                None
              </button>
              {DIETS.map(diet => (
                <button
                  key={diet.value}
                  onClick={() => toggleDiet(diet.value)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all touch-manipulation ${
                    dietFilters.includes(diet.value)
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options (collapsed) */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              <svg 
                className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Advanced options
            </button>
            
            {showAdvanced && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Specific texture goal
                </label>
                <select
                  value={goal || ''}
                  onChange={(e) => setGoal(e.target.value as GoalTag || undefined)}
                  className="input cursor-pointer"
                >
                  <option value="">Any texture</option>
                  {GOALS.map(g => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Tip text */}
          <p className="text-xs text-slate-500 pt-1 italic">
            Tip: Changing what you&apos;re making may reorder substitutes by suitability.
          </p>
        </div>
      </div>

      {/* Results Section */}
      {output && output.results.length > 0 && (
        <div className="space-y-6">
          {/* Top 3 Section */}
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Best 3 Substitutes <span className="font-medium text-slate-500">(Ranked)</span>
                </h3>
                <span className="text-xs sm:text-sm text-slate-400 shrink-0">
                  for {quantity} {unit}{quantity !== 1 && !unit.endsWith('s') ? 's' : ''}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Showing the highest-rated options based on your recipe type and dietary preferences.
              </p>
            </div>
            
            <div className="space-y-4">
              {output.results.slice(0, 3).map((result) => (
                <SubstituteCard key={result.substitute.id} result={result} quantity={quantity} unit={unit} />
              ))}
            </div>
          </div>

          {/* Show All Substitutes - Expandable (only if more than 3) */}
          {output.results.length > 3 && (
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer select-none py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                <svg 
                  className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-90" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium text-slate-700">
                  Show all substitutes
                </span>
                <span className="text-sm text-slate-500">
                  ({output.results.length} total)
                </span>
              </summary>
              
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold text-slate-600 mb-3">
                  Other substitutes (ranked #{4}–#{output.results.length})
                </h4>
                <div className="space-y-2">
                  {output.results.slice(3).map((result) => (
                    <CompactSubstituteRow 
                      key={result.substitute.id} 
                      result={result} 
                      quantity={quantity} 
                      unit={unit} 
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3 italic">
                  These options ranked lower for your current selection but may work well in other contexts.
                </p>
              </div>
            </details>
          )}
        </div>
      )}

      {output && output.results.length === 0 && (
        <div className="card p-6 sm:p-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
            <p className="font-semibold text-slate-700 text-base sm:text-lg">No substitutes match your filters</p>
            <p className="text-slate-500 text-sm mt-1">Try removing some dietary restrictions</p>
          </div>
        </div>
      )}
    </div>
  );
}
