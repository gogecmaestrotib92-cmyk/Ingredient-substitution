'use client';

interface HowItWorksProps {
  title: string;
  paragraphs: string[];
}

export function HowItWorks({ title, paragraphs }: HowItWorksProps) {
  return (
    <section className="mt-10 sm:mt-14">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        {title}
      </h2>
      <div className="prose prose-slate max-w-none">
        {paragraphs.map((paragraph, idx) => (
          <p 
            key={idx} 
            className="text-slate-600 leading-relaxed mb-4 last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
