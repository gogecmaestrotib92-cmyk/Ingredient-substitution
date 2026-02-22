'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🥄</span>
            <span className="font-bold text-lg sm:text-xl text-gray-900">
              SubstituteCalc
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              Home
            </Link>
            <Link
              href="/substitute/egg/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              Egg
            </Link>
            <Link
              href="/substitute/milk/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              Milk
            </Link>
            <Link
              href="/substitute/butter/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              Butter
            </Link>
            <Link
              href="/substitute/all-purpose-flour/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              Flour
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link
              href="/substitute/egg/"
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🥚 Egg Substitutes
            </Link>
            <Link
              href="/substitute/milk/"
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🥛 Milk Substitutes
            </Link>
            <Link
              href="/substitute/butter/"
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🧈 Butter Substitutes
            </Link>
            <Link
              href="/substitute/all-purpose-flour/"
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🌾 Flour Substitutes
            </Link>
            <Link
              href="/substitute/heavy-cream/"
              className="block py-2.5 px-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🍶 Heavy Cream Substitutes
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
