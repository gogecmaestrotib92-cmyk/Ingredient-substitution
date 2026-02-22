import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { getPopularPages, getClusters } from '@/lib/internalLinks';
import { getHomePageMeta } from '@/lib/seo';

export const metadata = getHomePageMeta();

export default function HomePage() {
  const popularPages = getPopularPages();
  const clusters = getClusters();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50/80 via-white to-white py-16 sm:py-20 md:py-28">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(22,163,74,0.05)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Ingredient Substitution
            <span className="text-primary-600 block mt-1"> Calculator</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
            Find the perfect substitute for any ingredient with exact conversion ratios. 
            Vegan, gluten-free, and allergy-friendly options included.
          </p>
          
          {/* Trust line */}
          <p className="text-sm text-slate-500 mb-8 sm:mb-10">
            Trusted by home cooks worldwide • 100% free, no signup required
          </p>
          
          <div className="relative z-50">
            <SearchBar className="max-w-2xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Quick Chips - Scrollable on mobile */}
      <section className="relative z-10 py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <Link
              href="/substitute/egg/"
              className="chip chip-primary whitespace-nowrap shrink-0"
            >
              🥚 Egg
            </Link>
            <Link
              href="/substitute/milk/"
              className="chip chip-primary whitespace-nowrap shrink-0"
            >
              🥛 Milk
            </Link>
            <Link
              href="/substitute/heavy-cream/"
              className="chip chip-primary whitespace-nowrap shrink-0"
            >
              🍶 Heavy Cream
            </Link>
            <Link
              href="/substitute/butter/"
              className="chip chip-primary whitespace-nowrap shrink-0"
            >
              🧈 Butter
            </Link>
            <Link
              href="/substitute/all-purpose-flour/"
              className="chip chip-primary whitespace-nowrap shrink-0"
            >
              🌾 Flour
            </Link>
            <Link
              href="/substitute/self-rising-flour-substitute/"
              className="chip chip-primary whitespace-nowrap shrink-0"
            >
              🥄 Self-Rising
            </Link>
          </div>
        </div>
      </section>

      {/* Cluster Cards */}
      <section className="section bg-white">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3">
            Browse by Category
          </h2>
          <p className="text-slate-500 text-center mb-10 sm:mb-12 max-w-xl mx-auto">
            Select an ingredient to find the best substitutes for your recipe
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {clusters.map(cluster => (
              <div
                key={cluster.id}
                className="card-interactive p-5 sm:p-6"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4">
                  {cluster.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {cluster.name}
                </h3>
                <p className="text-slate-500 mb-4 text-sm sm:text-base leading-relaxed">{cluster.description}</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {cluster.pages.map(slug => (
                    <li key={slug}>
                      <Link
                        href={`/substitute/${slug}/`}
                        className="text-primary-600 hover:text-primary-700 text-sm sm:text-base inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:underline">
                          {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                        <span className="text-primary-400 group-hover:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Pages */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3">
            Popular Substitution Guides
          </h2>
          <p className="text-slate-500 text-center mb-10 sm:mb-12 max-w-xl mx-auto">
            Jump to our most-used conversion calculators
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {popularPages.map(page => (
              <Link
                key={page.slug}
                href={`/substitute/${page.slug}/`}
                className="card-interactive p-4 sm:p-5 group"
              >
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  {page.category}
                </span>
                <h3 className="text-slate-900 font-semibold mt-1 text-sm sm:text-base line-clamp-2 group-hover:text-primary-700 transition-colors">{page.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3">
            Why Use Our Calculator?
          </h2>
          <p className="text-slate-500 text-center mb-10 sm:mb-12 max-w-xl mx-auto">
            Precise measurements that actually work
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">Exact Ratios</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Get precise conversion amounts based on standard cooking ratios, not guesswork.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">Context-Aware</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Substitutes are ranked based on your specific recipe type and goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">Diet Filters</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Filter by vegan, gluten-free, dairy-free, keto, and more dietary needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Never Ruin a Recipe Again
          </h2>
          <p className="text-primary-100 mb-8 sm:mb-10 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Get the exact substitute amounts you need with our free calculator. 
            Works for eggs, milk, butter, flour, and more.
          </p>
          <Link
            href="/substitute/egg/"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-all shadow-lg hover:shadow-xl text-base sm:text-lg group"
          >
            Try the Egg Calculator
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
