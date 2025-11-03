import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const IndustryExpertise = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_tax.industries');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0,1,2,3,4,5].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-brand-green rounded-lg mb-4" />
              <h3 className="text-lg font-bold text-brand-green mb-3 font-poppins">{t(`items.${i}.title`)}</h3>
              <p className="text-gray-600 text-sm mb-4">{t(`items.${i}.text`)}</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {[0,1,2].map((j) => (<li key={j}>• {t(`items.${i}.bullets.${j}`)}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


