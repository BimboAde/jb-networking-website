import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { CreditTestimonialCard } from '../molecules/CreditTestimonialCard';

export const CreditSuccessStories = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_credit.success');
  const items = [0,1,2].map((i) => ({
    name: t(`items.${i}.name`),
    role: t(`items.${i}.role`),
    text: t(`items.${i}.quote`),
    avatarUrl: t(`items.${i}.avatar`),
    before: Number(String(t(`items.${i}.before`)).replace(/[^0-9]/g,'')) || 500,
    after: Number(String(t(`items.${i}.after`)).replace(/[^0-9]/g,'')) || 700,
    days: Number(String(t(`items.${i}.days`)).replace(/[^0-9]/g,'')) || 60,
  }));

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-6">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {items.map((s, i) => (
            <CreditTestimonialCard key={i} name={s.name} role={s.role} text={s.text} avatarUrl={s.avatarUrl} beforeScore={s.before} afterScore={s.after} days={s.days} />
          ))}
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <Heading level={3} className="mb-6">{t('cta.title')}</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[0,1,2,3].map((i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-brand-green mb-2">{t(`cta.stats.${i}.value`)}</div>
                <div className="text-gray-600">{t(`cta.stats.${i}.label`)}</div>
              </div>
            ))}
          </div>
          <button className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-green transition-colors">
            {t('cta.button')}
          </button>
        </div>
      </div>
    </section>
  );
};


