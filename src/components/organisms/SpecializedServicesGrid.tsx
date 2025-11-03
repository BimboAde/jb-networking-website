import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ServiceCard } from '../molecules/ServiceCard';
import { Search, LineChart, FileText, Home, HeartPulse, Umbrella } from 'lucide-react';

export const SpecializedServicesGrid = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_real_estate.services');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ServiceCard
            dict={dict}
            icon={Search}
            titleKey={'solutions_real_estate.services.propertySearch.title'}
            descriptionKey={'solutions_real_estate.services.propertySearch.description'}
            featuresKey={[
              'solutions_real_estate.services.propertySearch.features.0',
              'solutions_real_estate.services.propertySearch.features.1',
              'solutions_real_estate.services.propertySearch.features.2',
              'solutions_real_estate.services.propertySearch.features.3',
            ]}
          />
          <ServiceCard
            dict={dict}
            icon={LineChart}
            titleKey={'solutions_real_estate.services.investmentConsulting.title'}
            descriptionKey={'solutions_real_estate.services.investmentConsulting.description'}
            featuresKey={[
              'solutions_real_estate.services.investmentConsulting.features.0',
              'solutions_real_estate.services.investmentConsulting.features.1',
              'solutions_real_estate.services.investmentConsulting.features.2',
              'solutions_real_estate.services.investmentConsulting.features.3',
            ]}
          />
          <ServiceCard
            dict={dict}
            icon={FileText}
            titleKey={'solutions_real_estate.services.transactionSupport.title'}
            descriptionKey={'solutions_real_estate.services.transactionSupport.description'}
            featuresKey={[
              'solutions_real_estate.services.transactionSupport.features.0',
              'solutions_real_estate.services.transactionSupport.features.1',
              'solutions_real_estate.services.transactionSupport.features.2',
              'solutions_real_estate.services.transactionSupport.features.3',
            ]}
          />
          <ServiceCard
            dict={dict}
            icon={Home}
            titleKey={'solutions_real_estate.services.homeownersInsurance.title'}
            descriptionKey={'solutions_real_estate.services.homeownersInsurance.description'}
            featuresKey={[
              'solutions_real_estate.services.homeownersInsurance.features.0',
              'solutions_real_estate.services.homeownersInsurance.features.1',
              'solutions_real_estate.services.homeownersInsurance.features.2',
              'solutions_real_estate.services.homeownersInsurance.features.3',
            ]}
          />
          <ServiceCard
            dict={dict}
            icon={HeartPulse}
            titleKey={'solutions_real_estate.services.lifeInsurance.title'}
            descriptionKey={'solutions_real_estate.services.lifeInsurance.description'}
            featuresKey={[
              'solutions_real_estate.services.lifeInsurance.features.0',
              'solutions_real_estate.services.lifeInsurance.features.1',
              'solutions_real_estate.services.lifeInsurance.features.2',
              'solutions_real_estate.services.lifeInsurance.features.3',
            ]}
          />
          <ServiceCard
            dict={dict}
            icon={Umbrella}
            titleKey={'solutions_real_estate.services.umbrellaInsurance.title'}
            descriptionKey={'solutions_real_estate.services.umbrellaInsurance.description'}
            featuresKey={[
              'solutions_real_estate.services.umbrellaInsurance.features.0',
              'solutions_real_estate.services.umbrellaInsurance.features.1',
              'solutions_real_estate.services.umbrellaInsurance.features.2',
              'solutions_real_estate.services.umbrellaInsurance.features.3',
            ]}
          />
        </div>
      </div>
    </section>
  );
};


