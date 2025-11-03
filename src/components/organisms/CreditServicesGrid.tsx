import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ServiceFeatureCard } from '../molecules/ServiceFeatureCard';
import { Wrench, Minimize2, GraduationCap, Eye, MessageSquare, User } from 'lucide-react';

export const CreditServicesGrid = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_credit.services');
  const cards = [
    { key: 'repair', Icon: Wrench },
    { key: 'consolidation', Icon: Minimize2 },
    { key: 'education', Icon: GraduationCap },
    { key: 'monitoring', Icon: Eye },
    { key: 'settlement', Icon: MessageSquare },
    { key: 'counseling', Icon: User },
  ];

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-6">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(({ key, Icon }, i) => (
            <ServiceFeatureCard
              key={i}
              dict={dict}
              titleKey={`solutions_credit.services.${key}.title`}
              descriptionKey={`solutions_credit.services.${key}.description`}
              features={[0,1,2,3].map((n) => `solutions_credit.services.${key}.features.${n}`)}
              Icon={Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


