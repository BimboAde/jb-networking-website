import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { PricingCard } from '../molecules/PricingCard';

export const CreditPricing = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_credit.pricing');

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-6">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <PricingCard dict={dict} baseKey="solutions_credit.pricing.basic" />
          <PricingCard dict={dict} baseKey="solutions_credit.pricing.premium" highlightKey="solutions_credit.pricing.mostPopular" />
          <PricingCard dict={dict} baseKey="solutions_credit.pricing.elite" />
        </div>
        <div className="bg-brand-gray rounded-2xl p-8 text-center">
          <Heading level={3} className="mb-4">{t('discounts.title')}</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0,1,2].map((i) => (
              <div key={i} className="flex items-center justify-center space-x-3">
                <div className={`w-12 h-12 ${i===2?'bg-brand-navy':'bg-brand-gold'} rounded-full`} />
                <div>
                  <div className="font-semibold text-brand-green">{t(`discounts.items.${i}.title`)}</div>
                  <div className="text-sm text-gray-600">{t(`discounts.items.${i}.text`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


