'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/icon.svg" 
              alt="IngredientSub" 
              width={32} 
              height={32}
              className="w-8 h-8 group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              Ingredient<span className="text-primary-600">Sub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/substitute/egg/"
              className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
            >
              Egg
            </Link>
            <Link
              href="/substitute/milk/"
              className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
            >
              Milk
            </Link>
            <Link
              href="/substitute/butter/"
              className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
            >
              Butter
            </Link>
            <Link
              href="/substitute/all-purpose-flour/"
              className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium"
            >
              Flour
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 -mr-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-lg">
          <nav className="px-3 py-3 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </Link>
            <Link
              href="/substitute/egg/"
              className="flex items-center gap-3 py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">🥚</span>
              <span>Egg Substitutes</span>
            </Link>
            <Link
              href="/substitute/milk/"
              className="flex items-center gap-3 py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">🥛</span>
              <span>Milk Substitutes</span>
            </Link>
            <Link
              href="/substitute/butter/"
              className="flex items-center gap-3 py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">🧈</span>
              <span>Butter Substitutes</span>
            </Link>
            <Link
              href="/substitute/all-purpose-flour/"
              className="flex items-center gap-3 py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">🌾</span>
              <span>Flour Substitutes</span>
            </Link>
            <Link
              href="/substitute/heavy-cream/"
              className="flex items-center gap-3 py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg">🍶</span>
              <span>Heavy Cream Substitutes</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
