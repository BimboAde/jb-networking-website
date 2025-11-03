import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const ServiceAreas = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'locations_page.areas');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0,1,2].map((i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 bg-brand-green rounded-full mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-brand-green font-poppins mb-4">{t(`states.${i}.title`)}</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">{t(`states.${i}.areasTitle`)}</p>
                <ul className="text-sm space-y-1">
                  {[0,1,2,3,4,5].map((j) => (<li key={j}>{t(`states.${i}.items.${j}`)}</li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-brand-gray rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-brand-green font-poppins mb-4">{t('remote.title')}</h3>
            <p className="text-lg text-gray-600 mb-6">{t('remote.text')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0,1,2].map((i) => (
                <div key={i} className="flex items-center justify-center space-x-3">
                  <span className="text-brand-green">●</span>
                  <span className="text-gray-700">{t(`remote.items.${i}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


