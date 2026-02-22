import type { SubstituteOption } from '@/lib/types';

interface TextureTableProps {
  substitutes: SubstituteOption[];
}

export function TextureTable({ substitutes }: TextureTableProps) {
  // Format context list
  const formatContexts = (contexts: string[]) => {
    return contexts.slice(0, 3).map(c => c.replace(/_/g, ' ')).join(', ');
  };

  // Taste impact badge
  const getTasteClass = (impact: string) => {
    switch (impact) {
      case 'none':
        return 'bg-green-100 text-green-700';
      case 'low':
        return 'bg-green-50 text-green-600';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <>
      {/* Mobile Cards View */}
      <div className="md:hidden space-y-3 p-3">
        {substitutes.map((sub) => (
          <div 
            key={sub.id}
            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <h4 className="font-semibold text-gray-900">{sub.displayName}</h4>
              <span className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${getTasteClass(sub.tasteImpact)}`}>
                {sub.tasteImpact}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gray-500 w-16 shrink-0">Best for:</span>
                <div className="flex flex-wrap gap-1">
                  {sub.goals.slice(0, 2).map(goal => (
                    <span key={goal} className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-gray-500 w-16 shrink-0">Works in:</span>
                <span className="text-gray-700 capitalize">{formatContexts(sub.bestIn)}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-gray-500 w-16 shrink-0">Texture:</span>
                <span className="text-gray-600">{sub.textureImpact}</span>
              </div>
              
              {sub.whenNotToUse[0] && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 w-16 shrink-0">Avoid:</span>
                  <span className="text-red-600 text-xs">{sub.whenNotToUse[0]}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Substitute</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Best For</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Taste</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Texture Impact</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Works In</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Avoid When</th>
            </tr>
          </thead>
          <tbody>
            {substitutes.map((sub, index) => (
              <tr 
                key={sub.id}
                className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50/50' : ''}`}
              >
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900">{sub.displayName}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {sub.goals.slice(0, 2).map(goal => (
                      <span key={goal} className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                        {goal}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTasteClass(sub.tasteImpact)}`}>
                    {sub.tasteImpact}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 max-w-[200px]">
                  {sub.textureImpact}
                </td>
                <td className="py-3 px-4 text-gray-600 capitalize">
                  {formatContexts(sub.bestIn)}
                </td>
                <td className="py-3 px-4 text-gray-500 text-xs max-w-[150px]">
                  {sub.whenNotToUse[0] || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
