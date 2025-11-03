import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { FormationServiceCard } from '../molecules/FormationServiceCard';

export const FormationServicesGrid = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_corporate.formation');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0,1,2,3,4,5].map((i) => (
            <FormationServiceCard key={i} dict={dict} baseIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
};


