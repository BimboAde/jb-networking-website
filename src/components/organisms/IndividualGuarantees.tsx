import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const IndividualGuarantees = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_individual.guarantees');

  const items = ['moneyBack', 'bilingual', 'military', 'support'] as const;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {items.map((k) => (
              <div key={k} className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-brand-green rounded-xl flex items-center justify-center flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-brand-green mb-3 font-poppins">{t(`${k}.title`)}</h3>
                  <p className="text-gray-600 mb-4">{t(`${k}.description`)}</p>
                  <div className="rounded-lg p-4 bg-brand-gray">{t(`${k}.highlight`)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-brand-green to-brand-light-green rounded-2xl p-8 text-white">
              <Heading level={3} className="mb-6">{t('stats.title')}</Heading>
              <div className="grid grid-cols-2 gap-6">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold text-brand-gold mb-2">{t(`stats.items.${i}.value`)}</div>
                    <div className="text-green-100">{t(`stats.items.${i}.label`)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-gray rounded-2xl p-8">
              <Heading level={3} className="mb-6">{t('included.title')}</Heading>
              <div className="space-y-4">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center mr-4"><span className="text-white text-sm">✓</span></div>
                    <span className="text-gray-700">{t(`included.items.${i}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


