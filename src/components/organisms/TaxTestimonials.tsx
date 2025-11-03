import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TestimonialCard } from '../molecules/TestimonialCard';

export const TaxTestimonials = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_tax.testimonials');
  const stories = [0,1,2].map((i) => ({
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    text: t(`items.${i}.quote`),
    avatarUrl: t(`items.${i}.avatar`),
  }));

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-lg">
              <TestimonialCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


