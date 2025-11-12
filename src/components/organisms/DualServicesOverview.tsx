import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ServiceFeatureCard } from '../molecules/ServiceFeatureCard';
import { Home, Shield } from 'lucide-react';

export const DualServicesOverview = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_real_estate.overview');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-6 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ServiceFeatureCard
            dict={dict}
            Icon={Home}
            titleKey={'solutions_real_estate.overview.realEstate.title'}
            descriptionKey={'solutions_real_estate.overview.realEstate.subtitle'}
            features={[
              'solutions_real_estate.overview.realEstate.bullets.0',
              'solutions_real_estate.overview.realEstate.bullets.1',
              'solutions_real_estate.overview.realEstate.bullets.2',
              'solutions_real_estate.overview.realEstate.bullets.3',
            ]}
          />
          <ServiceFeatureCard
            dict={dict}
            Icon={Shield}
            titleKey={'solutions_real_estate.overview.insurance.title'}
            descriptionKey={'solutions_real_estate.overview.insurance.subtitle'}
            features={[
              'solutions_real_estate.overview.insurance.bullets.0',
              'solutions_real_estate.overview.insurance.bullets.1',
              'solutions_real_estate.overview.insurance.bullets.2',
              'solutions_real_estate.overview.insurance.bullets.3',
            ]}
          />
        </div>
      </div>
    </section>
  );
};


