import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { PricingCard } from '../molecules/PricingCard';

export const BusinessCreditPricing = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_credit.pricing');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard dict={dict} baseKey={'solutions_business_credit.pricing.starter'} />
          <PricingCard dict={dict} baseKey={'solutions_business_credit.pricing.professional'} highlightKey={'solutions_business_credit.pricing.mostPopular'} containerClassName={'bg-white border-2 border-brand-gold'} />
          <PricingCard dict={dict} baseKey={'solutions_business_credit.pricing.premium'} containerClassName={'bg-brand-green text-white'} />
        </div>
        <div className="text-center mt-12">
          <div className="bg-brand-gray rounded-2xl p-8 max-w-4xl mx-auto">
            <Heading level={3} className="mb-4 text-brand-green">{t('guarantee.title')}</Heading>
            <p className="text-gray-600 mb-6">{t('guarantee.text')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0,1,2].map((i) => (
                <div key={i} className="text-center">
                  <div className="text-brand-green text-3xl mb-2">★</div>
                  <h4 className="font-semibold text-brand-green">{t(`guarantee.items.${i}.title`)}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


