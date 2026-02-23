'use client';

interface QuantityTipsProps {
  tips: string[];
  quantity: number;
  ingredientName: string;
}

export default function QuantityTips({ tips, quantity, ingredientName }: QuantityTipsProps) {
  const unitName = quantity === 1 ? ingredientName : `${ingredientName}s`;
  
  return (
    <section className="mt-10 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {quantity}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Tips When Replacing {quantity} {unitName}
        </h2>
      </div>
      
      <ul className="space-y-3">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-amber-400 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
              {idx + 1}
            </span>
            <p className="text-gray-700 leading-relaxed">{tip}</p>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 pt-4 border-t border-amber-200">
        <p className="text-sm text-amber-700 italic">
          💡 These tips are specific to replacing {quantity} {unitName}. Results may vary at different quantities.
        </p>
      </div>
    </section>
  );
}
