# Ingredient Substitution Calculator

A production-ready, SEO-first ingredient substitution tool built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- 🧮 **Interactive Calculator** - Get exact conversion ratios for any quantity
- 📊 **Comparison Tables** - See texture, taste, and use-case differences at a glance
- 🥗 **Dietary Filters** - Filter by vegan, gluten-free, dairy-free, keto, and more
- 📱 **Responsive Design** - Works on all devices
- 🔍 **SEO Optimized** - JSON-LD schema, meta tags, and clean URLs
- ⚡ **Static Generation** - Fast page loads with pre-rendered content

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
├── data/                    # JSON data files
│   ├── egg.json
│   ├── milk_cream.json
│   └── flour_butter.json
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Homepage
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   ├── not-found.tsx    # 404 page
│   │   └── substitute/
│   │       └── [slug]/
│   │           └── page.tsx # Dynamic substitution pages
│   ├── components/          # React components
│   │   ├── Calculator.tsx   # Main calculator (client component)
│   │   ├── SearchBar.tsx    # Autocomplete search
│   │   ├── TextureTable.tsx # Comparison table
│   │   ├── FAQSection.tsx   # FAQ with JSON-LD
│   │   └── ...
│   └── lib/                 # Utility functions
│       ├── types.ts         # TypeScript types
│       ├── data.ts          # Data loading
│       ├── slugs.ts         # Page spec generation
│       ├── calculateSubstitution.ts # Calculation engine
│       ├── seo.ts           # SEO helpers
│       ├── faq.ts           # JSON-LD generation
│       ├── units.ts         # Unit conversion
│       └── internalLinks.ts # Related links
└── ...
```

## Page Types (~150 pages)

### Egg Cluster
- Base: `/substitute/egg/`
- Context: `/substitute/egg-in-cake/`, `/substitute/egg-in-cookies/`, etc.
- Goal: `/substitute/egg-for-binding/`, `/substitute/egg-for-fluffy/`, etc.
- Diet: `/substitute/vegan-egg-in-cake/`, `/substitute/vegan-egg-in-brownies/`
- Quantity: `/substitute/2-eggs-in-cake/`, `/substitute/3-eggs-in-brownies/`
- Exclusion: `/substitute/egg-substitute-without-banana/`

### Milk & Cream Cluster
- Base: `/substitute/milk/`, `/substitute/heavy-cream/`
- Context: `/substitute/milk-in-mac-and-cheese/`, `/substitute/heavy-cream-in-pasta/`
- Diet: `/substitute/dairy-free-milk-substitute/`, `/substitute/vegan-cream-substitute/`

### Flour & Butter Cluster
- Base: `/substitute/all-purpose-flour/`, `/substitute/butter/`
- Context: `/substitute/flour-in-cookies/`, `/substitute/butter-in-brownies/`
- Diet: `/substitute/gluten-free-flour-substitute/`, `/substitute/vegan-butter-substitute/`

## Calculator Logic

1. **Diet Filtering** - Hard filter by dietary requirements (vegan excludes yogurt)
2. **Context Matching** - Boost substitutes that work well in the specified recipe type
3. **Goal Matching** - Prefer substitutes that achieve the desired goal (binding, moisture, etc.)
4. **Warning Penalty** - Deprioritize substitutes with many warnings
5. **Taste Impact** - Prefer lower taste impact for tie-breaking

## SEO Features

- Unique title and meta description per page
- Canonical URLs
- OpenGraph tags
- JSON-LD FAQ schema
- Clean H1/H2 hierarchy
- Internal linking between related pages

## Data Model

Substitutes include:
- `baseRatio` - Standard conversion ratio
- `contextOverrides` - Context-specific ratio adjustments
- `dietTags` - Dietary compatibility
- `goals` - What this substitute is good for
- `bestIn` / `avoidIn` - Recipe context recommendations
- `tasteImpact` / `textureImpact` - Quality characteristics
- `whenNotToUse` - Important warnings
- `addOns` - Additional ingredients needed

## License

MIT
