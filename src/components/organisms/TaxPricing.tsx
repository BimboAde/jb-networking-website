import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { PricingCard } from '../molecules/PricingCard';

export const TaxPricing = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_tax.pricing');

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PricingCard dict={dict} baseKey="solutions_tax.pricing.basic" />
          <PricingCard dict={dict} baseKey="solutions_tax.pricing.comprehensive" highlightKey="solutions_tax.pricing.mostPopular" />
          <PricingCard dict={dict} baseKey="solutions_tax.pricing.premium" />
        </div>
      </div>
    </section>
  );
};


