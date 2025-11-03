import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
// import Link from 'next/link';

export const TaxChecklist = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_tax.checklist');
  const sections = ['personal', 'income', 'deductions', 'investments'] as const;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {sections.map((s) => (
            <div key={s} className="bg-brand-gray rounded-xl p-8">
              <Heading level={3} className="text-brand-green mb-6">{t(`${s}.title`)}</Heading>
              <div className="space-y-4">
                {([0,1,2,3,4] as const).map((i) => {
                  const item = t(`${s}.items.${i}`);
                  if (item === `${s}.items.${i}`) return null;
                  return (
                    <div key={i} className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-brand-green rounded" />
                      <label className="text-gray-700">{item}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-2xl p-8 text-white">
            <Heading level={3} className="mb-4">{t('cta.title')}</Heading>
            <p className="text-green-100 mb-6">{t('cta.description')}</p>
            <Link href="/en/consultation" className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              {t('cta.button')}
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
};


