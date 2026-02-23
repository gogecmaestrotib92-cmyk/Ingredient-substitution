import type { SubstituteResult, Unit } from '@/lib/types';

interface SubstituteCardProps {
  result: SubstituteResult;
  quantity: number;
  unit: Unit;
}

export function SubstituteCard({ result, quantity, unit }: SubstituteCardProps) {
  const { substitute, displayAmount, reasoning, addOns, rank } = result;

  // Rank badge styles - larger and more visible
  const rankStyles = {
    1: 'bg-primary-600 text-white ring-2 ring-primary-200 shadow-sm',
    2: 'bg-primary-100 text-primary-700 ring-1 ring-primary-200',
    3: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  };

  // Format best-in list (first 3)
  const bestFor = substitute.bestIn.slice(0, 3).map(b => 
    b.replace(/_/g, ' ')
  ).join(', ');

  // Format avoid-in list (first 2)
  const avoidIn = substitute.avoidIn.slice(0, 2).map(a => 
    a.replace(/_/g, ' ')
  ).join(', ');

  // Texture description - more concrete and specific
  const textureDesc = substitute.textureImpact === 'similar' 
    ? 'Nearly identical structure and mouthfeel'
    : substitute.textureImpact === 'slightly different'
      ? 'Subtle softness; minimal impact on rise'
      : substitute.textureImpact === 'noticeably different'
        ? 'Denser crumb; adds moisture, less lift'
        : 'Distinct change; works best in specific recipes';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary-300 hover:shadow-md transition-all">
      {/* Header with rank and conversion */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Rank Badge - larger */}
          <div className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg ${rankStyles[rank as 1 | 2 | 3] || rankStyles[3]}`}>
            {rank}
          </div>

          <div className="flex-1 min-w-0">
            {/* Dominant conversion display */}
            <div className="mb-2">
              <span className="text-slate-500 text-sm">
                {quantity} {unit}{quantity !== 1 && !unit.endsWith('s') ? 's' : ''} →
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 ml-2">
                {displayAmount}
              </span>
              <span className="text-lg sm:text-xl font-semibold text-primary-700 ml-1.5">
                {substitute.displayName}
              </span>
            </div>

            {/* Quick info pills */}
            <div className="flex flex-wrap gap-1.5">
              {substitute.dietTags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details section with tinted background */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 sm:px-5 py-4 space-y-3">
        {/* Best for */}
        {bestFor && (
          <div className="flex gap-2 text-sm">
            <span className="font-semibold text-slate-700 shrink-0">Best for:</span>
            <span className="text-slate-600 capitalize">{bestFor}</span>
          </div>
        )}

        {/* Texture */}
        <div className="flex gap-2 text-sm">
          <span className="font-semibold text-slate-700 shrink-0">Texture:</span>
          <span className="text-slate-600">{textureDesc}</span>
        </div>

        {/* Avoid if */}
        {avoidIn && (
          <div className="flex gap-2 text-sm">
            <span className="font-semibold text-amber-700 shrink-0">Avoid in:</span>
            <span className="text-amber-600 capitalize">{avoidIn}</span>
          </div>
        )}

        {/* Pro Tips (if any) */}
        {addOns.length > 0 && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">💡</span>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Pro Tip</span>
                <p className="text-sm text-amber-700 mt-0.5 leading-snug">{addOns[0]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
