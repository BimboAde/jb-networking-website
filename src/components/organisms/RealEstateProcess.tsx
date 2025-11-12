import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ProcessStep } from '../molecules/ProcessStep';

export const RealEstateProcess = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_real_estate.process');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-6 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map((n) => (
            <ProcessStep key={n} dict={dict} stepKey={`solutions_real_estate.process.steps.${n}`} index={n} />
          ))}
        </div>
        <div className="mt-16 bg-brand-gray rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Heading level={3} className="text-brand-green mb-4">{t('reasonsTitle')}</Heading>
              <ul className="space-y-4 text-gray-600">
                {[0,1,2].map((i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-green mt-1 mr-3">✓</span>
                    <div>
                      <strong>{t(`reasons.${i}.title`)}</strong> {t(`reasons.${i}.text`)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Heading level={4} className="text-brand-green mb-4">{t('statsTitle')}</Heading>
                <div className="grid grid-cols-2 gap-4">
                  {[0,1,2,3].map((i) => (
                    <div key={i}>
                      <div className="text-3xl font-bold text-brand-green">{t(`stats.items.${i}.value`)}</div>
                      <div className="text-sm text-gray-600">{t(`stats.items.${i}.label`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


