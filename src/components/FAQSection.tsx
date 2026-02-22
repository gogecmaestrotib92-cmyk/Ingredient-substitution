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
    <section className="mt-10 sm:mt-14">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-slate-500 mb-5 sm:mb-6 text-sm sm:text-base">
        Quick answers to common questions about these substitutes
      </p>

      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <details
            key={index}
            className="group card overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-5 sm:px-6 py-4 hover:bg-slate-50 transition-colors touch-manipulation select-none">
              <span className="font-semibold text-slate-800 pr-4 text-sm sm:text-base leading-snug">
                {item.question}
              </span>
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                <svg
                  className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform duration-200"
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
              </div>
            </summary>
            <div className="px-5 sm:px-6 pb-5 text-slate-600 leading-relaxed text-sm sm:text-base">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
