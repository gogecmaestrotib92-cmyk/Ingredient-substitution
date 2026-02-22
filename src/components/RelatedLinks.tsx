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
    <section className="mt-12 sm:mt-16">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Related Substitution Guides
      </h2>
      <p className="text-slate-500 mb-6 text-sm sm:text-base">
        Explore more substitution calculators
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Base & Context Links */}
        {(baseLinks.length > 0 || contextLinks.length > 0) && (
          <div className="card p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Same Ingredient
            </h3>
            <ul className="space-y-2">
              {baseLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-700 text-sm sm:text-base inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:underline">{link.title}</span>
                    <span className="text-primary-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </li>
              ))}
              {contextLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-700 text-sm sm:text-base inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:underline">{link.title}</span>
                    <span className="text-primary-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diet Links */}
        {dietLinks.length > 0 && (
          <div className="card p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Dietary Alternatives
            </h3>
            <ul className="space-y-2">
              {dietLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-700 text-sm sm:text-base inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:underline">{link.title}</span>
                    <span className="text-primary-400 group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cross-cluster Links */}
        {crossLinks.length > 0 && (
          <div className="card p-5 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Related Ingredients
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {crossLinks.map(link => (
                <li key={link.slug}>
                  <Link
                    href={`/substitute/${link.slug}/`}
                    className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:underline">{link.title}</span>
                    <span className="text-primary-400 group-hover:translate-x-0.5 transition-transform">→</span>
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
