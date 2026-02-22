import type { SubstituteResult } from '@/lib/types';

interface SubstituteCardProps {
  result: SubstituteResult;
}

export function SubstituteCard({ result }: SubstituteCardProps) {
  const { substitute, displayAmount, reasoning, addOns, rank } = result;

  // Badge colors based on rank
  const rankColors = {
    1: 'bg-primary-500 text-white',
    2: 'bg-primary-100 text-primary-700',
    3: 'bg-gray-100 text-gray-700',
  };

  // Taste impact colors
  const tasteColors = {
    none: 'text-green-600 bg-green-50',
    low: 'text-green-600 bg-green-50',
    medium: 'text-amber-600 bg-amber-50',
    high: 'text-red-600 bg-red-50',
  };

  return (
    <div className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-primary-300 transition-colors">
      <div className="flex items-start gap-2.5 sm:gap-4">
        {/* Rank Badge */}
        <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${rankColors[rank as 1 | 2 | 3] || rankColors[3]}`}>
          #{rank}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
            <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
              {substitute.displayName}
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium self-start sm:self-auto ${tasteColors[substitute.tasteImpact]}`}>
              {substitute.tasteImpact === 'none' ? 'No' : substitute.tasteImpact.charAt(0).toUpperCase() + substitute.tasteImpact.slice(1)} taste impact
            </span>
          </div>

          {/* Amount */}
          <div className="bg-primary-50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 mb-2.5 sm:mb-3">
            <div className="text-xs sm:text-sm text-primary-700 font-medium mb-0.5 sm:mb-1">Use:</div>
            <div className="text-xl sm:text-2xl font-bold text-primary-900">{displayAmount}</div>
          </div>

          {/* Reasoning */}
          <p className="text-gray-600 text-xs sm:text-sm mb-2.5 sm:mb-3">{reasoning}</p>

          {/* Diet Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
            {substitute.dietTags.map(tag => (
              <span
                key={tag}
                className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Add-ons */}
          {addOns.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-2.5 sm:px-3 py-2">
              <div className="text-xs font-medium text-amber-800 mb-0.5 sm:mb-1">💡 Pro Tip:</div>
              <ul className="text-xs sm:text-sm text-amber-700 space-y-0.5">
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
