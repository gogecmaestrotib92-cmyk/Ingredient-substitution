import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Calculator } from '@/components/Calculator';
import { FAQSection } from '@/components/FAQSection';
import { RelatedLinks } from '@/components/RelatedLinks';
import { WhenNotToUse } from '@/components/WhenNotToUse';
import { ProductPlaceholder } from '@/components/ProductPlaceholder';
import { getAllSlugs, getPageSpecBySlug } from '@/lib/slugs';
import { getIngredientById } from '@/lib/data';
import { generateMetaTags } from '@/lib/seo';
import { getRelatedLinks } from '@/lib/internalLinks';
import { buildIntro } from '@/lib/intro';
import { buildFAQs, generateFAQJsonLd } from '@/lib/faqBuilder';

// Generate static params for all pages
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pageSpec = getPageSpecBySlug(params.slug);
  
  if (!pageSpec) {
    return { title: 'Not Found' };
  }
  
  const ingredient = getIngredientById(pageSpec.ingredientId);
  return generateMetaTags(pageSpec, ingredient || undefined);
}

export default function SubstitutePage({
  params,
}: {
  params: { slug: string };
}) {
  const pageSpec = getPageSpecBySlug(params.slug);
  
  if (!pageSpec) {
    notFound();
  }
  
  const ingredient = getIngredientById(pageSpec.ingredientId);
  
  if (!ingredient) {
    notFound();
  }
  
  const relatedLinks = getRelatedLinks(pageSpec);
  
  // Build dynamic intro and FAQs using context-aware builders
  const introText = buildIntro(pageSpec, ingredient);
  const faqItems = buildFAQs(pageSpec, ingredient);
  const faqJsonLd = generateFAQJsonLd(faqItems);

  return (
    <div className="py-8 md:py-14">
      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb - Scrollable on mobile */}
        <nav className="text-sm text-slate-500 mb-5 sm:mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
          <span className="mx-2 text-slate-300">/</span>
          <a href={`/substitute/${ingredient.id}/`} className="hover:text-primary-600 transition-colors capitalize">
            {ingredient.displayName}
          </a>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700 font-medium truncate max-w-[180px] sm:max-w-none inline-block align-bottom">{params.slug}</span>
        </nav>

        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight tracking-tight">
            {pageSpec.h1}
          </h1>
          
          {/* Subtitle - context-specific value prop */}
          <p className="text-base sm:text-lg text-slate-500 mb-5 sm:mb-6">
            {pageSpec.context && pageSpec.diet 
              ? `${pageSpec.diet.charAt(0).toUpperCase() + pageSpec.diet.slice(1)}-friendly options for ${pageSpec.context.replace(/_/g, ' ')} with exact ratios`
              : pageSpec.context 
                ? `Tested ratios for perfect ${pageSpec.context.replace(/_/g, ' ')} every time`
                : pageSpec.diet
                  ? `${pageSpec.diet.charAt(0).toUpperCase() + pageSpec.diet.slice(1)}-friendly alternatives with precise measurements`
                  : `Exact conversion ratios for any recipe`
            }
          </p>

          {/* Intro - now using dynamic context-aware intro */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
            {introText}
          </p>
          
          {/* Last Updated */}
          <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Calculator - Main Column */}
          <div className="lg:col-span-2 order-1">
            <Calculator pageSpec={pageSpec} />

            {/* When Not to Use */}
            <WhenNotToUse substitutes={ingredient.substitutes} />

            {/* FAQ Section - now using dynamically built FAQs */}
            <FAQSection faqItems={faqItems} slug={params.slug} />
          </div>

          {/* Sidebar - Shows at bottom on mobile */}
          <aside className="lg:col-span-1 order-2 lg:order-2">
            {/* Quick Summary Card */}
            <div className="card p-5 sm:p-6 lg:sticky lg:top-20">
              <h3 className="font-bold text-slate-900 text-lg mb-5">Quick Reference</h3>
              
              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Replacing</span>
                  <div className="font-semibold text-slate-900 mt-1">{ingredient.displayName}</div>
                </div>
                
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Default Unit</span>
                  <div className="font-semibold text-slate-900 capitalize mt-1">{ingredient.defaultUnit}</div>
                </div>
                
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Best For</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {ingredient.commonContexts.slice(0, 4).map(ctx => (
                      <span 
                        key={ctx}
                        className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium capitalize"
                      >
                        {ctx.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Available Options</span>
                  <div className="font-semibold text-slate-900 mt-1">{ingredient.substitutes.length} substitutes</div>
                </div>
              </div>

              {/* Top 3 Substitutes Preview */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Top Substitutes</h4>
                <ul className="space-y-2.5">
                  {ingredient.substitutes.slice(0, 3).map((sub, i) => (
                    <li key={sub.id} className="flex items-center gap-2.5 text-sm">
                      <span className="w-6 h-6 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-700 font-medium">{sub.displayName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product Placeholder */}
            <ProductPlaceholder />
          </aside>
        </div>

        {/* Related Links */}
        <RelatedLinks links={relatedLinks} />
      </div>
    </div>
  );
}
