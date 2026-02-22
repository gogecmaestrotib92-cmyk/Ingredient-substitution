import type { SubstituteOption } from '@/lib/types';

interface WhenNotToUseProps {
  substitutes: SubstituteOption[];
}

export function WhenNotToUse({ substitutes }: WhenNotToUseProps) {
  // Collect all unique warnings
  const warningsMap = new Map<string, string[]>();
  
  substitutes.forEach(sub => {
    sub.whenNotToUse.forEach(warning => {
      if (!warningsMap.has(warning)) {
        warningsMap.set(warning, []);
      }
      warningsMap.get(warning)!.push(sub.displayName);
    });
  });

  // Convert to array and sort by number of affected substitutes
  const warnings = Array.from(warningsMap.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 8);

  if (warnings.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-14">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        ⚠️ When NOT to Use These Substitutes
      </h2>
      <p className="text-slate-500 mb-5 sm:mb-6 text-sm sm:text-base">
        Not every substitute works in every situation. Here are important warnings to keep in mind:
      </p>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 sm:p-6">
        <ul className="space-y-3 sm:space-y-4">
          {warnings.map(([warning, subs], index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-200 text-amber-700 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <span className="text-amber-900 font-semibold text-sm sm:text-base">{warning}</span>
                <span className="text-amber-700 text-xs sm:text-sm block mt-0.5">
                  Affects: {subs.slice(0, 3).join(', ')}{subs.length > 3 ? ` +${subs.length - 3} more` : ''}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
