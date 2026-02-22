import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Ingredient Substitution Calculator | IngredientSub',
    template: '%s | IngredientSub',
  },
  description: 'Free ingredient substitution calculator with exact conversion ratios for any recipe. Find egg, milk, flour, and butter replacements with precise measurements.',
  keywords: ['ingredient substitute', 'baking substitute', 'egg replacement', 'milk substitute', 'gluten-free flour', 'vegan baking'],
  authors: [{ name: 'IngredientSub' }],
  creator: 'IngredientSub',
  metadataBase: new URL('https://ingredientsub.com'),
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'IngredientSub',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
