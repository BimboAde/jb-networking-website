import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const BusinessCreditServices = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_credit.services');
  const cards = [
    { base: 'setup' },
    { base: 'program' },
    { base: 'protection' },
  ] as const;

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(({ base }, idx) => (
            <div key={base} className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow ${base==='program' ? 'border-2 border-brand-gold relative' : ''}`}>
              {base==='program' && (
                <div className="absolute -top-3 left-8 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">{t('program.badge')}</div>
              )}
              <div className="w-16 h-16 bg-brand-green rounded-lg flex items-center justify-center mb-6" />
              <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{t(`${base}.title`)}</h3>
              <p className="text-gray-600 mb-6">{t(`${base}.description`)}</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                {[0,1,2,3].map((i) => (
                  <li key={i} className="flex items-center"><span className="text-brand-green mr-2">✓</span>{t(`${base}.features.${i}`)}</li>
                ))}
              </ul>
              <div className="bg-brand-gray rounded-lg p-4">
                <div className="text-sm font-medium text-brand-green">{t(`${base}.price`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


