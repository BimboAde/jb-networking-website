import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { BusinessServiceCard } from '../molecules/BusinessServiceCard';
import { Building2, Users, Presentation } from 'lucide-react';

export const ExecutiveServicesGrid = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_executive.services');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <BusinessServiceCard
            dict={dict}
            icon={Building2}
            titleKey={'solutions_executive.services.office.title'}
            descriptionKey={'solutions_executive.services.office.description'}
            featuresKey={[
              'solutions_executive.services.office.features.0',
              'solutions_executive.services.office.features.1',
              'solutions_executive.services.office.features.2',
              'solutions_executive.services.office.features.3',
              'solutions_executive.services.office.features.4',
              'solutions_executive.services.office.features.5',
            ]}
            ctaPrimaryKey={'solutions_executive.services.office.ctaPrimary'}
            ctaSecondaryKey={'solutions_executive.services.office.ctaSecondary'}
          />
          <BusinessServiceCard
            dict={dict}
            icon={Users}
            titleKey={'solutions_executive.services.virtual.title'}
            descriptionKey={'solutions_executive.services.virtual.description'}
            featuresKey={[
              'solutions_executive.services.virtual.features.0',
              'solutions_executive.services.virtual.features.1',
              'solutions_executive.services.virtual.features.2',
              'solutions_executive.services.virtual.features.3',
              'solutions_executive.services.virtual.features.4',
              'solutions_executive.services.virtual.features.5',
            ]}
            ctaPrimaryKey={'solutions_executive.services.virtual.ctaPrimary'}
            ctaSecondaryKey={'solutions_executive.services.virtual.ctaSecondary'}
          />
          <BusinessServiceCard
            dict={dict}
            icon={Presentation}
            titleKey={'solutions_executive.services.training.title'}
            descriptionKey={'solutions_executive.services.training.description'}
            featuresKey={[
              'solutions_executive.services.training.features.0',
              'solutions_executive.services.training.features.1',
              'solutions_executive.services.training.features.2',
              'solutions_executive.services.training.features.3',
              'solutions_executive.services.training.features.4',
              'solutions_executive.services.training.features.5',
            ]}
            ctaPrimaryKey={'solutions_executive.services.training.ctaPrimary'}
            ctaSecondaryKey={'solutions_executive.services.training.ctaSecondary'}
          />
        </div>
      </div>
    </section>
  );
};


