import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16 sm:mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <Image 
                src="/icon.svg" 
                alt="IngredientSub" 
                width={28} 
                height={28}
                className="w-7 h-7 group-hover:scale-105 transition-transform"
              />
              <span className="font-bold text-xl text-white tracking-tight">
                Ingredient<span className="text-primary-500">Sub</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Free ingredient substitution calculator with exact conversion ratios for any recipe.
            </p>
          </div>

          {/* Egg Substitutes */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Egg</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/substitute/egg/" className="hover:text-white transition-colors">
                  Egg Substitute Guide
                </Link>
              </li>
              <li>
                <Link href="/substitute/egg-in-cake/" className="hover:text-white transition-colors">
                  Egg in Cake
                </Link>
              </li>
              <li>
                <Link href="/substitute/egg-in-cookies/" className="hover:text-white transition-colors">
                  Egg in Cookies
                </Link>
              </li>
              <li>
                <Link href="/substitute/vegan-egg-in-brownies/" className="hover:text-white transition-colors">
                  Vegan Egg in Brownies
                </Link>
              </li>
            </ul>
          </div>

          {/* Dairy Substitutes */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Dairy</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/substitute/milk/" className="hover:text-white transition-colors">
                  Milk Substitute Guide
                </Link>
              </li>
              <li>
                <Link href="/substitute/heavy-cream/" className="hover:text-white transition-colors">
                  Heavy Cream
                </Link>
              </li>
              <li>
                <Link href="/substitute/butter/" className="hover:text-white transition-colors">
                  Butter Substitute
                </Link>
              </li>
              <li>
                <Link href="/substitute/dairy-free-milk-substitute/" className="hover:text-white transition-colors">
                  Dairy-Free Milk
                </Link>
              </li>
            </ul>
          </div>

          {/* Flour Substitutes */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Flour</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/substitute/all-purpose-flour/" className="hover:text-white transition-colors">
                  All-Purpose Flour
                </Link>
              </li>
              <li>
                <Link href="/substitute/gluten-free-flour-substitute/" className="hover:text-white transition-colors">
                  Gluten-Free Flour
                </Link>
              </li>
              <li>
                <Link href="/substitute/self-rising-flour-substitute/" className="hover:text-white transition-colors">
                  Self-Rising Flour
                </Link>
              </li>
              <li>
                <Link href="/substitute/cake-flour-substitute/" className="hover:text-white transition-colors">
                  Cake Flour
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about/" className="hover:text-white transition-colors">
                  About IngredientSub
                </Link>
              </li>
              <li>
                <Link href="/methodology/" className="hover:text-white transition-colors">
                  Our Methodology
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Substitution Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 sm:mt-12 pt-8 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-slate-300">© {new Date().getFullYear()} IngredientSub. All rights reserved.</p>
              <p className="mt-1 text-slate-500 text-xs">
                Data is for informational purposes only. Always consider allergies and dietary restrictions.
              </p>
            </div>
            <div className="flex gap-4 text-xs text-slate-500">
              <Link href="/about/" className="hover:text-white transition-colors">About</Link>
              <span className="text-slate-700">•</span>
              <Link href="/methodology/" className="hover:text-white transition-colors">Methodology</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
