import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TestimonialCard } from '../molecules/TestimonialCard';

export const RealEstateSuccessStories = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_real_estate.success');

  const items = [0,1].map((i) => ({
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    text: t(`items.${i}.quote`),
    avatarUrl: t(`items.${i}.avatar`),
    stats: [0,1,2].map((j) => ({
      value: t(`items.${i}.stats.${j}.value`),
      label: t(`items.${i}.stats.${j}.label`),
    })),
  }));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {items.map((it, idx) => (
            <div key={idx} className="bg-brand-gray rounded-2xl p-8">
              <TestimonialCard name={it.name} role={it.role} text={it.text} avatarUrl={it.avatarUrl} />
              <div className="grid grid-cols-3 gap-4 text-center mt-6">
                {it.stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold text-brand-green">{s.value}</div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


