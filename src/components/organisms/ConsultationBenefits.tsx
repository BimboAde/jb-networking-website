import { getT, type Dict } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const ConsultationBenefits = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'consultation.benefits');

  const items = [0, 1, 2].map((i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.text`),
  }));

  return (
    <section className="py-16 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-brand-green rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


