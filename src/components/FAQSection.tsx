import type { FAQItem } from '@/lib/types';
import { generateFAQJsonLd } from '@/lib/faq';

interface FAQSectionProps {
  faqItems: FAQItem[];
  slug: string;
}

export function FAQSection({ faqItems, slug }: FAQSectionProps) {
  if (!faqItems.length) return null;

  const jsonLd = generateFAQJsonLd(faqItems, slug);

  return (
    <section className="mt-8 sm:mt-12">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {faqItems.map((item, index) => (
          <details
            key={index}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors touch-manipulation">
              <span className="font-medium text-gray-900 pr-3 sm:pr-4 text-sm sm:text-base">
                {item.question}
              </span>
              <svg
                className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3 sm:pt-4 text-sm sm:text-base">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
