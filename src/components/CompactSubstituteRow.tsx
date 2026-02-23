import type { SubstituteResult, Unit } from '@/lib/types';

interface CompactSubstituteRowProps {
  result: SubstituteResult;
  quantity: number;
  unit: Unit;
}

export function CompactSubstituteRow({ result, quantity, unit }: CompactSubstituteRowProps) {
  const { substitute, displayAmount, rank } = result;

  // Format best-in list (first 2)
  const bestFor = substitute.bestIn.slice(0, 2).map(b => 
    b.replace(/_/g, ' ')
  ).join(', ');

  // Texture description - short version
  const textureShort = substitute.textureImpact === 'similar' 
    ? 'Similar texture'
    : substitute.textureImpact === 'slightly different'
      ? 'Slight change'
      : substitute.textureImpact === 'noticeably different'
        ? 'Noticeable change'
        : 'Distinct texture';

  // Avoid warning (first one only)
  const avoidFirst = substitute.avoidIn[0]?.replace(/_/g, ' ') || '';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
      {/* Rank + Name + Amount */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
          {rank}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-slate-800 truncate">{substitute.displayName}</span>
            <span className="text-sm text-slate-500">→</span>
            <span className="text-sm font-medium text-primary-700">{displayAmount}</span>
          </div>
        </div>
      </div>

      {/* Quick info - hidden on very small screens */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-right pl-9 sm:pl-0">
        {bestFor && <span>Best for: <span className="capitalize">{bestFor}</span></span>}
        <span>{textureShort}</span>
        {avoidFirst && <span className="text-amber-600">Avoid: <span className="capitalize">{avoidFirst}</span></span>}
      </div>
    </div>
  );
}
