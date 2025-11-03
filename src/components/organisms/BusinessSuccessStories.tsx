import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TestimonialCard } from '../molecules/TestimonialCard';

export const BusinessSuccessStories = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business.success');
  const items = [0,1].map((i) => ({
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    text: t(`items.${i}.quote`),
    avatarUrl: t(`items.${i}.avatar`),
    stats: [0,1,2].map((j) => ({ value: t(`items.${i}.stats.${j}.value`), label: t(`items.${i}.stats.${j}.label`) })),
  }));

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {items.map((it, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg">
              <TestimonialCard name={it.name} role={it.role} text={it.text} avatarUrl={it.avatarUrl} />
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 mt-6">
                {it.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-brand-green">{s.value}</div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gradient-to-r from-brand-green to-brand-light-green rounded-2xl p-8 text-white text-center">
          <Heading level={3} className="mb-4 text-white">{t('cta.title')}</Heading>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">{t('cta.description')}</p>
          <button className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            {t('cta.button')}
          </button>
        </div>
      </div>
    </section>
  );
};


