import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const BusinessProcessTimeline = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_tax.process');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-brand-green hidden lg:block" />
          <div className="space-y-12">
            {[0,1,2,3].map((i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>
                <div className={`${i % 2 === 1 ? 'lg:w-1/2 lg:pl-12' : 'lg:w-1/2 lg:pr-12'} mb-8 lg:mb-0`}>
                  <div className="bg-brand-gray rounded-2xl p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-4">{i+1}</div>
                      <h3 className="text-xl font-bold text-brand-green font-poppins">{t(`steps.${i}.title`)}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{t(`steps.${i}.text`)}</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {[0,1,2].map((j) => (
                        <li key={j} className="flex items-center"><span className="text-brand-green mr-2">✓</span>{t(`steps.${i}.bullets.${j}`)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:w-1/2 lg:pr-12' : 'lg:w-1/2 lg:pl-12'}`}>
                  <div className="w-20 h-20 bg-brand-green rounded-full mx-auto lg:mx-0 mb-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


