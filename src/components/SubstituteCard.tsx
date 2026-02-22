import type { SubstituteResult } from '@/lib/types';

interface SubstituteCardProps {
  result: SubstituteResult;
}

export function SubstituteCard({ result }: SubstituteCardProps) {
  const { substitute, displayAmount, reasoning, addOns, rank } = result;

  // Badge colors based on rank
  const rankStyles = {
    1: 'bg-primary-600 text-white ring-2 ring-primary-200',
    2: 'bg-primary-100 text-primary-700',
    3: 'bg-slate-100 text-slate-600',
  };

  // Taste impact colors
  const tasteColors = {
    none: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    low: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    medium: 'text-amber-700 bg-amber-50 border-amber-100',
    high: 'text-red-700 bg-red-50 border-red-100',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-primary-300 hover:shadow-sm transition-all">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Rank Badge */}
        <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base ${rankStyles[rank as 1 | 2 | 3] || rankStyles[3]}`}>
          {rank}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mb-3">
            <h4 className="font-bold text-slate-900 text-lg sm:text-xl">
              {substitute.displayName}
            </h4>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold self-start sm:self-auto border ${tasteColors[substitute.tasteImpact]}`}>
              {substitute.tasteImpact === 'none' ? 'No' : substitute.tasteImpact.charAt(0).toUpperCase() + substitute.tasteImpact.slice(1)} taste change
            </span>
          </div>

          {/* Amount - highlighted */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl px-4 sm:px-5 py-3 sm:py-4 mb-3 sm:mb-4 border border-primary-100">
            <div className="text-xs sm:text-sm text-primary-600 font-semibold mb-0.5 uppercase tracking-wide">Use</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary-800">{displayAmount}</div>
          </div>

          {/* Reasoning */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">{reasoning}</p>

          {/* Diet Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {substitute.dietTags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Add-ons / Pro Tips */}
          {addOns.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 sm:px-4 py-3">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-800 mb-1">
                <span className="text-base">💡</span>
                Pro Tip
              </div>
              <ul className="text-sm text-amber-800 space-y-0.5">
                {addOns.map((addon, i) => (
                  <li key={i}>{addon}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
