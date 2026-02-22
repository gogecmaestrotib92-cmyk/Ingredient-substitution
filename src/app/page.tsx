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
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-10 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Ingredient Substitution
            <span className="text-primary-600 block sm:inline"> Calculator</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Find the perfect substitute for any ingredient with exact conversion ratios. 
            Vegan, gluten-free, and allergy-friendly options included.
          </p>
          
          <SearchBar className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Quick Chips - Scrollable on mobile */}
      <section className="py-4 sm:py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <Link
              href="/substitute/egg/"
              className="px-3 sm:px-5 py-2 bg-primary-100 text-primary-700 rounded-full font-medium hover:bg-primary-200 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              🥚 Egg
            </Link>
            <Link
              href="/substitute/milk/"
              className="px-3 sm:px-5 py-2 bg-primary-100 text-primary-700 rounded-full font-medium hover:bg-primary-200 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              🥛 Milk
            </Link>
            <Link
              href="/substitute/heavy-cream/"
              className="px-3 sm:px-5 py-2 bg-primary-100 text-primary-700 rounded-full font-medium hover:bg-primary-200 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              🍶 Heavy Cream
            </Link>
            <Link
              href="/substitute/butter/"
              className="px-3 sm:px-5 py-2 bg-primary-100 text-primary-700 rounded-full font-medium hover:bg-primary-200 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              🧈 Butter
            </Link>
            <Link
              href="/substitute/all-purpose-flour/"
              className="px-3 sm:px-5 py-2 bg-primary-100 text-primary-700 rounded-full font-medium hover:bg-primary-200 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              🌾 Flour
            </Link>
            <Link
              href="/substitute/self-rising-flour-substitute/"
              className="px-3 sm:px-5 py-2 bg-primary-100 text-primary-700 rounded-full font-medium hover:bg-primary-200 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              🥄 Self-Rising
            </Link>
          </div>
        </div>
      </section>

      {/* Cluster Cards */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-10">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {clusters.map(cluster => (
              <div
                key={cluster.id}
                className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{cluster.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                  {cluster.name}
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{cluster.description}</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {cluster.pages.map(slug => (
                    <li key={slug}>
                      <Link
                        href={`/substitute/${slug}/`}
                        className="text-primary-600 hover:text-primary-800 hover:underline text-xs sm:text-sm"
                      >
                        {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
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
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-10">
            Popular Substitution Guides
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {popularPages.map(page => (
              <Link
                key={page.slug}
                href={`/substitute/${page.slug}/`}
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                  {page.category}
                </span>
                <h3 className="text-gray-900 font-medium mt-0.5 sm:mt-1 text-sm sm:text-base line-clamp-2">{page.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-10">
            Why Use Our Calculator?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Exact Ratios</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Get precise conversion amounts based on standard cooking ratios, not guesswork.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Context-Aware</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Substitutes are ranked based on your specific recipe type and goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">Diet Filters</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Filter by vegan, gluten-free, dairy-free, keto, and more dietary needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Never Ruin a Recipe Again
          </h2>
          <p className="text-primary-100 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Get the exact substitute amounts you need with our free calculator. 
            Works for eggs, milk, butter, flour, and more.
          </p>
          <Link
            href="/substitute/egg/"
            className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Try the Egg Calculator
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
