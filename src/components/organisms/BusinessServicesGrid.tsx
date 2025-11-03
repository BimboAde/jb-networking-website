import { type Dict } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { BusinessServiceCard } from '../molecules/BusinessServiceCard';
import { Calculator, LineChart, Briefcase, Store } from 'lucide-react';

export const BusinessServicesGrid = ({ dict }: { dict: Dict }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{"Complete Business Financial Services"}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{"Everything your business needs to succeed, from formation to expansion, all under one roof with personalized support."}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <BusinessServiceCard
            dict={dict}
            icon={Calculator}
            titleKey={'solutions_business.services.tax.title'}
            descriptionKey={'solutions_business.services.tax.description'}
            featuresKey={[
              'solutions_business.services.tax.features.0',
              'solutions_business.services.tax.features.1',
              'solutions_business.services.tax.features.2',
              'solutions_business.services.tax.features.3',
              'solutions_business.services.tax.features.4',
              'solutions_business.services.tax.features.5',
            ]}
            ctaPrimaryKey={'solutions_business.services.tax.ctaPrimary'}
            ctaSecondaryKey={'solutions_business.services.tax.ctaSecondary'}
          />

          <BusinessServiceCard
            dict={dict}
            icon={LineChart}
            titleKey={'solutions_business.services.credit.title'}
            descriptionKey={'solutions_business.services.credit.description'}
            featuresKey={[
              'solutions_business.services.credit.features.0',
              'solutions_business.services.credit.features.1',
              'solutions_business.services.credit.features.2',
              'solutions_business.services.credit.features.3',
              'solutions_business.services.credit.features.4',
              'solutions_business.services.credit.features.5',
            ]}
            ctaPrimaryKey={'solutions_business.services.credit.ctaPrimary'}
            ctaSecondaryKey={'solutions_business.services.credit.ctaSecondary'}
          />

          <BusinessServiceCard
            dict={dict}
            icon={Briefcase}
            titleKey={'solutions_business.services.corporate.title'}
            descriptionKey={'solutions_business.services.corporate.description'}
            featuresKey={[
              'solutions_business.services.corporate.features.0',
              'solutions_business.services.corporate.features.1',
              'solutions_business.services.corporate.features.2',
              'solutions_business.services.corporate.features.3',
              'solutions_business.services.corporate.features.4',
              'solutions_business.services.corporate.features.5',
            ]}
            ctaPrimaryKey={'solutions_business.services.corporate.ctaPrimary'}
            ctaSecondaryKey={'solutions_business.services.corporate.ctaSecondary'}
          />

          <BusinessServiceCard
            dict={dict}
            icon={Store}
            titleKey={'solutions_business.services.franchise.title'}
            descriptionKey={'solutions_business.services.franchise.description'}
            featuresKey={[
              'solutions_business.services.franchise.features.0',
              'solutions_business.services.franchise.features.1',
              'solutions_business.services.franchise.features.2',
              'solutions_business.services.franchise.features.3',
              'solutions_business.services.franchise.features.4',
              'solutions_business.services.franchise.features.5',
            ]}
            ctaPrimaryKey={'solutions_business.services.franchise.ctaPrimary'}
            ctaSecondaryKey={'solutions_business.services.franchise.ctaSecondary'}
            badgeText={'Featured Opportunity'}
            accent={'gold'}
          />
        </div>
      </div>
    </section>
  );
};


