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
  
  return generateMetaTags(pageSpec);
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

  return (
    <div className="py-6 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb - Scrollable on mobile */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap pb-2">
          <a href="/" className="hover:text-primary-600">Home</a>
          <span className="mx-1.5 sm:mx-2">/</span>
          <a href={`/substitute/${ingredient.id}/`} className="hover:text-primary-600 capitalize">
            {ingredient.displayName}
          </a>
          <span className="mx-1.5 sm:mx-2">/</span>
          <span className="text-gray-900 truncate max-w-[150px] sm:max-w-none inline-block align-bottom">{params.slug}</span>
        </nav>

        {/* Header */}
        <header className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            {pageSpec.h1}
          </h1>
          
          {/* Subtitle - context-specific value prop */}
          <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-5">
            {pageSpec.context && pageSpec.diet 
              ? `${pageSpec.diet.charAt(0).toUpperCase() + pageSpec.diet.slice(1)}-friendly options for ${pageSpec.context.replace(/_/g, ' ')} with exact ratios`
              : pageSpec.context 
                ? `Tested ratios for perfect ${pageSpec.context.replace(/_/g, ' ')} every time`
                : pageSpec.diet
                  ? `${pageSpec.diet.charAt(0).toUpperCase() + pageSpec.diet.slice(1)}-friendly alternatives with precise measurements`
                  : `Exact conversion ratios for any recipe`
            }
          </p>

          {/* Intro */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {pageSpec.introTemplate}
          </p>
          
          {/* Last Updated */}
          <p className="text-xs text-gray-400 mt-3">
            Updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Calculator - Main Column */}
          <div className="lg:col-span-2 order-1">
            <Calculator pageSpec={pageSpec} />

            {/* When Not to Use */}
            <WhenNotToUse substitutes={ingredient.substitutes} />

            {/* FAQ Section */}
            <FAQSection faqItems={ingredient.faqItems} slug={params.slug} />
          </div>

          {/* Sidebar - Shows at bottom on mobile */}
          <aside className="lg:col-span-1 order-2 lg:order-2">
            {/* Quick Summary Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 lg:sticky lg:top-20">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Reference</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Replacing</span>
                  <div className="font-medium text-gray-900">{ingredient.displayName}</div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Default Unit</span>
                  <div className="font-medium text-gray-900 capitalize">{ingredient.defaultUnit}</div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Best Contexts</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ingredient.commonContexts.slice(0, 4).map(ctx => (
                      <span 
                        key={ctx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs capitalize"
                      >
                        {ctx.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Available Substitutes</span>
                  <div className="font-medium text-gray-900">{ingredient.substitutes.length} options</div>
                </div>
              </div>

              {/* Top 3 Substitutes Preview */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Top Substitutes</h4>
                <ul className="space-y-2">
                  {ingredient.substitutes.slice(0, 3).map((sub, i) => (
                    <li key={sub.id} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{sub.displayName}</span>
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
