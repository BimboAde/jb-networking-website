import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { PricingCard } from '../molecules/PricingCard';

export const BusinessPricingPlans = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_tax.pricing');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard dict={dict} baseKey="solutions_business_tax.pricing.startup" />
          <PricingCard
            dict={dict}
            baseKey="solutions_business_tax.pricing.growth"
            highlightKey="solutions_business_tax.pricing.mostPopular"
            containerClassName="bg-white border-2 border-brand-gold"
          />
          <PricingCard dict={dict} baseKey="solutions_business_tax.pricing.enterprise" />
        </div>
        <div className="text-center mt-12">
          <div className="bg-brand-gold bg-opacity-10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-brand-green font-poppins mb-4">{t('discounts.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0,1].map((i) => (
                <div key={i} className="flex items-center space-x-4 justify-center md:justify-start">
                  <div className={`w-12 h-12 ${i===0 ? 'bg-brand-navy' : 'bg-brand-gold'} rounded-lg`} />
                  <div className="text-left">
                    <h4 className="font-semibold text-brand-green">{t(`discounts.items.${i}.title`)}</h4>
                    <p className="text-gray-600">{t(`discounts.items.${i}.text`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


