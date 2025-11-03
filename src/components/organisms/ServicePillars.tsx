import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ServiceFeatureCard } from '../molecules/ServiceFeatureCard';
import { Calculator, TrendingUp, CreditCard, Home } from 'lucide-react';

export const ServicePillars = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_individual.pillars');
  const cards = [
    {
      titleKey: 'tax.title',
      descriptionKey: 'tax.description',
      features: ['tax.features.0', 'tax.features.1', 'tax.features.2', 'tax.features.3', 'tax.features.4', 'tax.features.5'],
      Icon: Calculator,
    },
    {
      titleKey: 'planning.title',
      descriptionKey: 'planning.description',
      features: ['planning.features.0', 'planning.features.1', 'planning.features.2', 'planning.features.3', 'planning.features.4', 'planning.features.5'],
      Icon: TrendingUp,
    },
    {
      titleKey: 'credit.title',
      descriptionKey: 'credit.description',
      features: ['credit.features.0', 'credit.features.1', 'credit.features.2', 'credit.features.3', 'credit.features.4', 'credit.features.5'],
      Icon: CreditCard,
      badgeText: t('credit.badge'),
      accent: 'gold' as const,
    },
    {
      titleKey: 'realEstate.title',
      descriptionKey: 'realEstate.description',
      features: ['realEstate.features.0', 'realEstate.features.1', 'realEstate.features.2', 'realEstate.features.3', 'realEstate.features.4', 'realEstate.features.5'],
      Icon: Home,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <ServiceFeatureCard
              key={i}
              dict={dict}
              titleKey={`solutions_individual.pillars.${c.titleKey}`}
              descriptionKey={`solutions_individual.pillars.${c.descriptionKey}`}
              features={c.features.map((f) => `solutions_individual.pillars.${f}`)}
              Icon={c.Icon}
              badgeText={c.badgeText}
              accent={c.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


