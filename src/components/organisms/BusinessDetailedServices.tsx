import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

function ServiceBlock({ title, subtitle, items }: { title: string; subtitle: string; items: { title: string; text: string }[] }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-brand-green rounded-xl mr-4" />
        <div>
          <h3 className="text-2xl font-bold text-brand-green font-poppins">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="flex items-start space-x-3">
            <span className="text-brand-green mt-1">✓</span>
            <div>
              <h4 className="font-semibold text-brand-green">{it.title}</h4>
              <p className="text-gray-600 text-sm">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const BusinessDetailedServices = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_tax.services');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ServiceBlock
            title={t('tax.title')}
            subtitle={t('tax.subtitle')}
            items={[0,1,2,3,4].map((i) => ({ title: t(`tax.items.${i}.title`), text: t(`tax.items.${i}.text`) }))}
          />
          <ServiceBlock
            title={t('books.title')}
            subtitle={t('books.subtitle')}
            items={[0,1,2,3,4].map((i) => ({ title: t(`books.items.${i}.title`), text: t(`books.items.${i}.text`) }))}
          />
          <ServiceBlock
            title={t('payroll.title')}
            subtitle={t('payroll.subtitle')}
            items={[0,1,2,3,4].map((i) => ({ title: t(`payroll.items.${i}.title`), text: t(`payroll.items.${i}.text`) }))}
          />
          <ServiceBlock
            title={t('advisory.title')}
            subtitle={t('advisory.subtitle')}
            items={[0,1,2,3,4].map((i) => ({ title: t(`advisory.items.${i}.title`), text: t(`advisory.items.${i}.text`) }))}
          />
        </div>
      </div>
    </section>
  );
};


