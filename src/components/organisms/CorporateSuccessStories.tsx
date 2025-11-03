import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TestimonialCard } from '../molecules/TestimonialCard';

export const CorporateSuccessStories = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_corporate.success');
  const items = [0,1,2].map((i) => ({
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    text: t(`items.${i}.quote`),
    avatarUrl: t(`items.${i}.avatar`),
  }));
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((s, i) => (
            <TestimonialCard key={i} name={s.name} role={s.role} text={s.text} avatarUrl={s.avatarUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};


