import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Methodology – How IngredientSub Ranks Substitutes',
  description: 'Learn how IngredientSub determines substitute rankings, conversion ratios, and texture ratings. Understand our data sources, testing approach, and limitations.',
  alternates: {
    canonical: 'https://ingredientsub.com/methodology/',
  },
};

export default function MethodologyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700 font-medium">Methodology</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Our Methodology
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            How we rank substitutes, determine ratios, and evaluate texture impact.
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-slate prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ranking System</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Substitutes are ranked based on a weighted scoring system that considers multiple factors:
            </p>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Ranking Factors</h3>
              <ul className="text-slate-600 space-y-3 mb-0">
                <li>
                  <strong>Texture Similarity (40%):</strong> How closely the substitute replicates the 
                  original ingredient&apos;s texture contribution—binding, leavening, moisture, etc.
                </li>
                <li>
                  <strong>Versatility (25%):</strong> How well the substitute performs across different 
                  recipe types. Options that work in multiple contexts rank higher.
                </li>
                <li>
                  <strong>Accessibility (20%):</strong> How commonly available the substitute is in 
                  typical grocery stores. Exotic or specialty items rank lower.
                </li>
                <li>
                  <strong>Flavor Neutrality (15%):</strong> Whether the substitute introduces unwanted 
                  flavors. Neutral-tasting options rank higher for general use.
                </li>
              </ul>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              Rankings may be adjusted for specific contexts. For example, applesauce ranks higher for 
              cakes (where its moisture is beneficial) but lower for cookies (where it affects spread).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Conversion Ratios</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our conversion ratios are derived from three primary sources:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2">1. Culinary References</h3>
                <p className="text-slate-600 text-base mb-0">
                  Standard ratios from established culinary textbooks, professional baking guides, and 
                  food science publications. These provide the baseline for most conversions.
                </p>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2">2. Manufacturer Guidelines</h3>
                <p className="text-slate-600 text-base mb-0">
                  Recommended usage from product manufacturers (e.g., flax meal packaging, commercial 
                  egg replacers). These are cross-referenced with independent testing.
                </p>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2">3. Practical Testing</h3>
                <p className="text-slate-600 text-base mb-0">
                  Ratios validated through actual recipe testing. When published ratios conflict or 
                  produce inconsistent results, we test to determine optimal amounts.
                </p>
              </div>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              Context-specific ratios (e.g., &quot;for cakes&quot; vs. &quot;for cookies&quot;) reflect adjustments based 
              on how the original ingredient functions in that recipe type. Eggs in cakes primarily 
              provide moisture and binding, while in cookies they affect spread and chew—different 
              substitutes may require ratio modifications accordingly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Texture Impact Ratings</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Each substitute receives a texture impact rating indicating how closely results match 
              the original:
            </p>
            
            <div className="overflow-hidden rounded-xl border border-slate-200 mb-6">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Rating</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-700 font-medium">Similar</td>
                    <td className="px-4 py-3 text-slate-600">Results nearly indistinguishable from original</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-700 font-medium">Slightly Different</td>
                    <td className="px-4 py-3 text-slate-600">Minor texture variations, generally acceptable</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-700 font-medium">Noticeably Different</td>
                    <td className="px-4 py-3 text-slate-600">Clear texture change, may affect recipe perception</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-700 font-medium">Significantly Different</td>
                    <td className="px-4 py-3 text-slate-600">Major texture change, use only when necessary</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              These ratings are context-dependent. A substitute may have &quot;Similar&quot; texture impact for 
              muffins but &quot;Noticeably Different&quot; for meringue-based recipes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Dietary Tags</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We tag substitutes with dietary classifications when they meet standard definitions:
            </p>
            <ul className="text-slate-600 space-y-2 mb-4">
              <li><strong>Vegan:</strong> Contains no animal products or byproducts</li>
              <li><strong>Vegetarian:</strong> May contain dairy or eggs, no meat products</li>
              <li><strong>Gluten-Free:</strong> Contains no wheat, barley, rye, or derivatives</li>
              <li><strong>Dairy-Free:</strong> Contains no milk or milk-derived ingredients</li>
              <li><strong>Keto:</strong> Low-carbohydrate, suitable for ketogenic diets</li>
              <li><strong>Nut-Free:</strong> Contains no tree nuts or peanuts</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              <strong>Important:</strong> These tags reflect the substitute itself, not cross-contamination 
              risks. If you&apos;re cooking for someone with a severe allergy, verify all ingredient sources 
              and manufacturing processes.
            </p>
          </section>

          <section className="mb-12 p-6 bg-slate-100 rounded-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Known Limitations</h2>
            <ul className="text-slate-600 space-y-3 mb-0">
              <li>
                <strong>Brand Variation:</strong> Different brands of the same ingredient may behave 
                differently. Our ratios assume typical commercially available products.
              </li>
              <li>
                <strong>Recipe Complexity:</strong> Substitutions work best when only one ingredient is 
                changed. Multiple substitutions may interact unpredictably.
              </li>
              <li>
                <strong>Altitude & Climate:</strong> High altitude or humid conditions may require 
                additional adjustments not reflected in our ratios.
              </li>
              <li>
                <strong>Personal Taste:</strong> Texture and flavor perception is subjective. What one 
                person considers &quot;similar&quot; another may find &quot;noticeably different.&quot;
              </li>
              <li>
                <strong>Nutritional Changes:</strong> Substitutions may significantly alter nutritional 
                content. We don&apos;t provide nutritional guidance—consult appropriate resources if needed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Updates & Corrections</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We periodically review and update our data based on new sources, user feedback, and 
              additional testing. If you notice an inaccuracy or have tested a ratio that differs 
              from our recommendations, we welcome your input.
            </p>
            <p className="text-slate-600 leading-relaxed">
              All pages display a &quot;Last Updated&quot; date reflecting the most recent data review for 
              that content.
            </p>
          </section>
        </article>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/about/" 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              About IngredientSub
            </Link>
            <Link 
              href="/substitute/egg/" 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Egg Substitutes
            </Link>
            <Link 
              href="/" 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Calculator Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
