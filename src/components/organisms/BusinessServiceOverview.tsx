import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { FaCalculator, FaHandHoldingUsd, FaClipboardCheck, FaRocket } from 'react-icons/fa';

export const BusinessServiceOverview = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_tax.overview');
  const icons = [FaCalculator, FaHandHoldingUsd, FaClipboardCheck, FaRocket];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[0,1,2,3].map((i) => {
            const Icon = icons[i];
            return (
            <div key={i} className="text-center group transition-transform duration-300 ease-out hover:-translate-y-1">
              <div className="w-20 h-20 bg-brand-green rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Icon className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{t(`items.${i}.title`)}</h3>
              <p className="text-gray-600">{t(`items.${i}.text`)}</p>
            </div>
          )})}
        </div>
        {/* <div className="bg-brand-gray rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-brand-green font-poppins mb-4">{t('why.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0,1,2].map((i) => (
              <div key={i} className="flex items-center space-x-4 text-left justify-center md:justify-start">
                <div className="w-12 h-12 bg-brand-green rounded-lg flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-brand-green">{t(`why.items.${i}.title`)}</h4>
                  <p className="text-gray-600 text-sm">{t(`why.items.${i}.text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};


