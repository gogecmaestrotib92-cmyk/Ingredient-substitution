import Link from 'next/link';
import type { RelatedLink } from '@/lib/types';

interface RelatedLinksProps {
  links: RelatedLink[];
}

export function RelatedLinks({ links }: RelatedLinksProps) {
  if (!links.length) return null;

  // Group by type
  const baseLinks = links.filter(l => l.type === 'base');
  const contextLinks = links.filter(l => l.type === 'context');
  const dietLinks = links.filter(l => l.type === 'diet');
  const crossLinks = links.filter(l => l.type === 'cross-cluster');

  return (
    <section className="mt-8 sm:mt-12 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Related Substitution Guides
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Base & Context Links */}
        {(baseLinks.length > 0 || contextLinks.length > 0) && (
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
              Same Ingredient
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {baseLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-800 hover:underline text-sm sm:text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              {contextLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-800 hover:underline text-sm sm:text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diet Links */}
        {dietLinks.length > 0 && (
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
              Dietary Alternatives
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {dietLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-800 hover:underline text-sm sm:text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cross-cluster Links */}
        {crossLinks.length > 0 && (
          <div className="sm:col-span-2">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
              Related Ingredients
            </h3>
            <ul className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1.5 sm:gap-2">
              {crossLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-800 hover:underline text-sm sm:text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
