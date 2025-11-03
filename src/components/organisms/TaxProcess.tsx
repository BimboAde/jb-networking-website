import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ProcessStep } from '../molecules/ProcessStep';

export const TaxProcess = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_tax.process');

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map((n) => (
            <ProcessStep key={n} dict={dict} stepKey={`solutions_tax.process.steps.${n}`} index={n} />
          ))}
        </div>
      </div>
    </section>
  );
};


