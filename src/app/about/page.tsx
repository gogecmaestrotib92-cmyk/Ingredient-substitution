import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About IngredientSub – Free Ingredient Substitution Calculator',
  description: 'Learn about IngredientSub, a free tool providing exact conversion ratios for ingredient substitutes. Discover how we determine ratios and our commitment to accuracy.',
  alternates: {
    canonical: 'https://ingredientsub.com/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700 font-medium">About</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            About IngredientSub
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            A free, practical tool for home cooks who need ingredient substitutions that actually work.
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-slate prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What Is IngredientSub?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              IngredientSub is a free ingredient substitution calculator designed for home bakers and cooks. 
              When you&apos;re mid-recipe and realize you&apos;re missing an ingredient—or cooking for someone with 
              dietary restrictions—you need reliable alternatives with exact measurements, not vague suggestions.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              We cover the most commonly substituted ingredients: eggs, milk, heavy cream, butter, and various 
              flour types. Each substitute includes precise conversion ratios, texture impact ratings, and 
              recipe-specific recommendations so you can make informed decisions quickly.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The tool is completely free, requires no signup, and works on any device. We don&apos;t track your 
              recipes or sell your data—just straightforward substitution help when you need it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Determine Ratios</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our conversion ratios come from multiple sources: established culinary references, food science 
              research, and practical testing. We prioritize ratios that have been validated across different 
              recipe contexts rather than one-size-fits-all numbers.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              For each substitute, we evaluate:
            </p>
            <ul className="text-slate-600 space-y-2 mb-4">
              <li><strong>Base ratio:</strong> The standard conversion for general use</li>
              <li><strong>Context adjustments:</strong> Modified ratios for specific recipe types (cakes vs. cookies vs. sauces)</li>
              <li><strong>Texture impact:</strong> How closely the result matches the original ingredient</li>
              <li><strong>Best/avoid recommendations:</strong> Which recipes work well and which to skip</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              See our <Link href="/methodology/" className="text-primary-600 hover:text-primary-700 underline">Methodology</Link> page 
              for detailed information about our ranking system and data sources.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              IngredientSub was created by a small team of developers and food enthusiasts who got tired of 
              Googling &quot;egg substitute for brownies&quot; and getting 2,000-word blog posts that bury the actual 
              answer. We built the tool we wanted to use: fast, accurate, and focused on practical results.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The project is independently maintained and not affiliated with any food brand or ingredient 
              manufacturer. Our recommendations are based on functionality, not commercial relationships.
            </p>
          </section>

          <section className="mb-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <h2 className="text-xl font-bold text-amber-900 mb-3">⚠️ Important Disclaimer</h2>
            <p className="text-amber-800 leading-relaxed mb-3">
              <strong>This tool is for informational purposes only.</strong> Ingredient substitutions may affect 
              taste, texture, appearance, and nutritional content of your recipes. Results can vary based on 
              specific brands, recipe proportions, and cooking methods.
            </p>
            <p className="text-amber-800 leading-relaxed mb-3">
              <strong>Always consider food allergies and dietary restrictions.</strong> If you or someone you&apos;re 
              cooking for has a food allergy, verify all ingredients carefully. Cross-contamination and hidden 
              allergens may not be reflected in our data.
            </p>
            <p className="text-amber-800 leading-relaxed">
              <strong>Professional dietary advice:</strong> For medical dietary requirements, consult a registered 
              dietitian or healthcare provider. This tool is not a substitute for professional nutritional guidance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Have feedback, corrections, or suggestions? We welcome input that helps improve the tool&apos;s accuracy 
              and usefulness. Reach out through our GitHub repository or the contact information in the footer.
            </p>
          </section>
        </article>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/methodology/" 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Our Methodology
            </Link>
            <Link 
              href="/substitute/egg/" 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Egg Substitutes
            </Link>
            <Link 
              href="/substitute/milk/" 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Milk Substitutes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
