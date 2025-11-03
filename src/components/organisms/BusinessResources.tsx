import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ResourceCard } from '../molecules/ResourceCard';
import { Calculator, FileText, BarChart3, CreditCard, Book, Video } from 'lucide-react';

export const BusinessResources = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business.resources');
  const entries = [
    { Icon: Calculator, base: 'solutions_business.resources.items.0' },
    { Icon: FileText, base: 'solutions_business.resources.items.1' },
    { Icon: BarChart3, base: 'solutions_business.resources.items.2' },
    { Icon: CreditCard, base: 'solutions_business.resources.items.3' },
    { Icon: Book, base: 'solutions_business.resources.items.4' },
    { Icon: Video, base: 'solutions_business.resources.items.5' },
  ] as const;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map(({ Icon, base }) => (
            <ResourceCard
              key={base}
              dict={dict}
              Icon={Icon}
              titleKey={`${base}.title`}
              descriptionKey={`${base}.text`}
              ctaKey={`${base}.cta`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


