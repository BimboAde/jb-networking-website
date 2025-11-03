import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ServiceFeatureCard } from '../molecules/ServiceFeatureCard';
import { FileText, Home, LineChart, BookText, GraduationCap, Shield } from 'lucide-react';

export const TaxServicesGrid = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_tax.services');
  const cards = [
    { key: 'individual', Icon: FileText },
    { key: 'realEstate', Icon: Home },
    { key: 'investment', Icon: LineChart },
    { key: 'bookkeeping', Icon: BookText },
    { key: 'education', Icon: GraduationCap },
    { key: 'irs', Icon: Shield },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(({ key, Icon }, i) => (
            <ServiceFeatureCard
              key={i}
              dict={dict}
              titleKey={`solutions_tax.services.${key}.title`}
              descriptionKey={`solutions_tax.services.${key}.description`}
              features={[0,1,2,3].map((n) => `solutions_tax.services.${key}.features.${n}`)}
              Icon={Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


