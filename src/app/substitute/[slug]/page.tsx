import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Calculator } from '@/components/Calculator';
import { FAQSection } from '@/components/FAQSection';
import { RelatedLinks } from '@/components/RelatedLinks';
import { WhenNotToUse } from '@/components/WhenNotToUse';
import { ProductPlaceholder } from '@/components/ProductPlaceholder';
import { ProTips, buildProTips } from '@/components/ProTips';
import QuantityTips from '@/components/QuantityTips';
import { getAllSlugs, getPageSpecBySlug } from '@/lib/slugs';
import { getIngredientById } from '@/lib/data';
import { generateMetaTags } from '@/lib/seo';
import { getRelatedLinks } from '@/lib/internalLinks';
import { buildIntro } from '@/lib/intro';
import { buildPriorityIntro } from '@/lib/priorityIntro';
import { isPriorityPage } from '@/lib/priorityPages';
import { buildFAQs, generateFAQJsonLd } from '@/lib/faqBuilder';
import { 
  isQuantityPage, 
  buildQuantityIntro, 
  buildQuantityH1, 
  buildQuantityTips, 
  buildQuantityFAQs 
} from '@/lib/quantityPages';

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
  
  // Determine if this is a priority page for enhanced content
  const isPriority = isPriorityPage(params.slug);
  
  // Determine if this is a quantity-specific page
  const isQuantity = isQuantityPage(params.slug);
  const quantity = pageSpec.quantity || 1;
  
  // Build dynamic intro - priority first, then quantity, then default
  const introText = isPriority 
    ? buildPriorityIntro(pageSpec, ingredient)
    : isQuantity
      ? buildQuantityIntro(pageSpec, ingredient)
      : buildIntro(pageSpec, ingredient);
  
  // Build headline - use quantity-specific H1 for quantity pages
  const headline = isQuantity 
    ? buildQuantityH1(pageSpec, ingredient) 
    : pageSpec.h1;
  
  // Build FAQs using context-aware builder, add quantity FAQs for quantity pages
  let faqItems = buildFAQs(pageSpec, ingredient);
  if (isQuantity) {
    const quantityFaqs = buildQuantityFAQs(pageSpec, ingredient);
    // Merge quantity FAQs with existing, avoiding duplicates
    const existingQuestions = new Set(faqItems.map(f => f.question.toLowerCase()));
    const newFaqs = quantityFaqs.filter(q => !existingQuestions.has(q.question.toLowerCase()));
    faqItems = [...faqItems, ...newFaqs].slice(0, 10); // Limit to 10 total
  }
  const faqJsonLd = generateFAQJsonLd(faqItems);
  
  // Build pro tips for priority pages
  const proTips = isPriority ? buildProTips(pageSpec, ingredient) : [];
  
  // Build quantity tips for quantity pages
  const quantityTips = isQuantity ? buildQuantityTips(pageSpec, ingredient) : [];

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
            {headline}
          </h1>
          
          {/* Subtitle - benefit-driven value prop */}
          <p className="text-base sm:text-lg text-slate-600 mb-5 sm:mb-6 font-medium">
            {isQuantity 
              ? `Exact measurements for ${quantity} ${ingredient.displayName.toLowerCase()}${quantity > 1 ? 's' : ''} · ${ingredient.substitutes.length} tested alternatives`
              : pageSpec.context && pageSpec.diet 
                ? `${pageSpec.diet.charAt(0).toUpperCase() + pageSpec.diet.slice(1)}-friendly for ${pageSpec.context.replace(/_/g, ' ')} · exact ratios + texture impact`
                : pageSpec.context 
                  ? `Exact ratios + texture impact for perfect ${pageSpec.context.replace(/_/g, ' ')}`
                  : pageSpec.diet
                    ? `${pageSpec.diet.charAt(0).toUpperCase() + pageSpec.diet.slice(1)}-friendly alternatives · precise measurements + best uses`
                    : `Exact ratios + texture impact for baking and cooking`
            }
          </p>
          
          {/* Quantity badge for quantity pages */}
          {isQuantity && (
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
                <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {quantity}
                </span>
                You are replacing {quantity} {ingredient.displayName.toLowerCase()}{quantity > 1 ? 's' : ''}
              </span>
            </div>
          )}

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
            
            {/* Pro Tips - Priority pages only */}
            {isPriority && proTips.length > 0 && (
              <ProTips tips={proTips} />
            )}
            
            {/* Quantity Tips - Quantity pages only */}
            {isQuantity && quantityTips.length > 0 && (
              <QuantityTips 
                tips={quantityTips} 
                quantity={quantity} 
                ingredientName={ingredient.displayName} 
              />
            )}

            {/* FAQ Section - now using dynamically built FAQs */}
            <FAQSection faqItems={faqItems} slug={params.slug} />
          </div>

          {/* Sidebar - Shows at bottom on mobile */}
          <aside className="lg:col-span-1 order-2 lg:order-2">
            {/* Quick Summary Card - Premium styling */}
            <div className="bg-gradient-to-b from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 sm:p-7 lg:sticky lg:top-20 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-6 pb-3 border-b border-slate-100">Quick Reference</h3>
              
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Replacing</span>
                  <div className="font-bold text-slate-900 text-lg mt-1">{ingredient.displayName}</div>
                </div>
                
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Default Unit</span>
                  <div className="font-semibold text-slate-800 capitalize mt-1">{ingredient.defaultUnit}</div>
                </div>
                
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Best For</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {ingredient.commonContexts.slice(0, 4).map(ctx => (
                      <span 
                        key={ctx}
                        className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold capitalize"
                      >
                        {ctx.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Available Options</span>
                  <div className="font-semibold text-slate-800 mt-1">{ingredient.substitutes.length} tested substitutes</div>
                </div>
              </div>

              {/* Top 3 Substitutes Preview */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Top Ranked</h4>
                <ul className="space-y-3">
                  {ingredient.substitutes.slice(0, 3).map((sub, i) => (
                    <li key={sub.id} className="flex items-center gap-3 text-sm">
                      <span className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold ring-1 ring-primary-200">
                        {i + 1}
                      </span>
                      <span className="text-slate-800 font-medium">{sub.displayName}</span>
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
