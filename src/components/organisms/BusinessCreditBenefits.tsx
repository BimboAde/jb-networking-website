import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const BusinessCreditBenefits = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_credit.benefits');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[0,1,2,3,4,5,6,7].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-brand-green rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-brand-green mb-3 font-poppins">{t(`items.${i}.title`)}</h3>
              <p className="text-gray-600 text-sm">{t(`items.${i}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


