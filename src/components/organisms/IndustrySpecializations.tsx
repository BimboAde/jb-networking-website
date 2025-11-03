import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { IndustryCard } from '../molecules/IndustryCard';
import { Utensils, Home, Truck, Laptop, HeartPulse, ShoppingCart } from 'lucide-react';

export const IndustrySpecializations = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business.industries');

  const items = [
    { Icon: Utensils, base: 'solutions_business.industries.items.0' },
    { Icon: Home, base: 'solutions_business.industries.items.1' },
    { Icon: Truck, base: 'solutions_business.industries.items.2' },
    { Icon: Laptop, base: 'solutions_business.industries.items.3' },
    { Icon: HeartPulse, base: 'solutions_business.industries.items.4' },
    { Icon: ShoppingCart, base: 'solutions_business.industries.items.5' },
  ] as const;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(({ Icon, base }) => (
            <IndustryCard
              key={base}
              dict={dict}
              Icon={Icon}
              titleKey={`${base}.title`}
              descriptionKey={`${base}.text`}
              features={[`${base}.features.0`, `${base}.features.1`, `${base}.features.2`]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


