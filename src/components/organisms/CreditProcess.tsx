import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ProcessStep } from '../molecules/ProcessStep';

export const CreditProcess = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_credit.process');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-6">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map((n) => (
            <ProcessStep key={n} dict={dict} stepKey={`solutions_credit.process.steps.${n}`} index={n} />
          ))}
        </div>
        <div className="mt-16 bg-brand-gray rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Heading level={3} className="text-brand-green mb-4">{t('timeline.title')}</Heading>
              <div className="space-y-4">
                {[0,1,2].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 ${i===2?'bg-brand-gold':'bg-brand-green'} rounded-full flex items-center justify-center flex-shrink-0`} />
                    <div>
                      <h4 className="font-semibold text-brand-green">{t(`timeline.items.${i}.title`)}</h4>
                      <p className="text-gray-600 text-sm">{t(`timeline.items.${i}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <Heading level={4} className="text-brand-green mb-4">{t('results.title')}</Heading>
                <div className="grid grid-cols-2 gap-4">
                  {[0,1,2,3].map((i) => (
                    <div key={i}>
                      <div className="text-3xl font-bold text-brand-green">{t(`results.items.${i}.value`)}</div>
                      <div className="text-sm text-gray-600">{t(`results.items.${i}.label`)}</div>
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


