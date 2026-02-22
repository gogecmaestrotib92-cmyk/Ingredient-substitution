import type { FAQItem } from './types';

const SITE_URL = 'https://ingredient-substitution.com';

interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export function generateFAQSchema(faqItems: FAQItem[], pageUrl: string): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateFAQJsonLd(faqItems: FAQItem[], slug: string): string {
  const schema = generateFAQSchema(faqItems, `${SITE_URL}/substitute/${slug}/`);
  return JSON.stringify(schema);
}

interface HowToSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  step: Array<{
    '@type': string;
    name: string;
    text: string;
    position: number;
  }>;
}

export function generateHowToSchema(
  title: string,
  description: string,
  steps: string[]
): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      name: `Step ${index + 1}`,
      text: step,
      position: index + 1,
    })),
  };
}
