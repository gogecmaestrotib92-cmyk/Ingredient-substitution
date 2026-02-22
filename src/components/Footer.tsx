import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-12 sm:mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <Image 
                src="/icon.svg" 
                alt="IngredientSub" 
                width={24} 
                height={24}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
              <span className="font-bold text-lg sm:text-xl text-white">
                Ingredient<span className="text-primary-500">Sub</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm">
              Free ingredient substitution calculator with exact conversion ratios for any recipe.
            </p>
          </div>

          {/* Egg Substitutes */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Egg Substitutes</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
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
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Dairy Substitutes</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
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
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Flour Substitutes</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-1.5 sm:space-y-2 text-xs sm:text-sm">
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
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-xs sm:text-sm text-center">
          <p>© {new Date().getFullYear()} IngredientSub. All rights reserved.</p>
          <p className="mt-2 text-gray-500">
            Data is for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
