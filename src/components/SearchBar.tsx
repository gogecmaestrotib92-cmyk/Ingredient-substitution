'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getAllSlugs, getPageSpecBySlug } from '@/lib/slugs';

interface SearchResult {
  slug: string;
  title: string;
  h1: string;
}

export function SearchBar({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Get all page specs on mount
  const [allPages, setAllPages] = useState<SearchResult[]>([]);
  
  useEffect(() => {
    const slugs = getAllSlugs();
    const pages = slugs.map(slug => {
      const spec = getPageSpecBySlug(slug);
      return spec ? { slug, title: spec.title, h1: spec.h1 } : null;
    }).filter((p): p is SearchResult => p !== null);
    setAllPages(pages);
  }, []);

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = allPages.filter(page =>
      page.slug.includes(lowerQuery) ||
      page.title.toLowerCase().includes(lowerQuery) ||
      page.h1.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);

    setResults(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [query, allPages]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/substitute/${results[selectedIndex].slug}/`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && results.length > 0 && setIsOpen(true)}
          placeholder="Search (e.g., 'egg in cake')"
          className="w-full px-5 sm:px-6 py-4 sm:py-5 text-base sm:text-lg bg-white border-2 border-slate-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all pr-12 sm:pr-14 shadow-sm hover:border-slate-300"
          aria-label="Search for ingredient substitutes"
          aria-expanded={isOpen}
          aria-controls="search-results"
          role="combobox"
        />
        <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          ref={resultsRef}
          id="search-results"
          className="absolute z-50 w-full mt-3 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-[60vh] overflow-y-auto"
          role="listbox"
        >
          {results.map((result, index) => (
            <Link
              key={result.slug}
              href={`/substitute/${result.slug}/`}
              className={`block px-5 py-3.5 hover:bg-primary-50 transition-colors touch-manipulation border-b border-slate-100 last:border-0 ${
                index === selectedIndex ? 'bg-primary-50' : ''
              }`}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => setIsOpen(false)}
            >
              <div className="font-semibold text-slate-900 text-base truncate">{result.h1}</div>
              <div className="text-sm text-slate-500 truncate mt-0.5">/substitute/{result.slug}/</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
