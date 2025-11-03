import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const LocationsMap = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'locations_page.map');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative h-[600px] bg-gradient-to-br from-brand-gray to-gray-200">
            <div className="absolute top-6 left-6 bg-white rounded-lg shadow-lg p-4 z-10">
              <h3 className="text-lg font-semibold text-brand-green mb-3 font-poppins">Quick Filters</h3>
              <div className="space-y-2">
                {[0,1,2].map((i) => (
                  <label key={i} className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-brand-green" defaultChecked />
                    <span className="ml-2 text-sm">{t(`filters.${i}`)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 z-10">
              <h4 className="text-sm font-semibold text-brand-green mb-2">{t('legend.title')}</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center"><div className="w-3 h-3 bg-brand-green rounded-full mr-2" />{t('legend.main')}</div>
                <div className="flex items-center"><div className="w-3 h-3 bg-brand-gold rounded-full mr-2" />{t('legend.partners')}</div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-brand-green rounded-full mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-brand-green mb-4 font-poppins">{t('overlayTitle')}</h3>
                <p className="text-gray-600 max-w-md mx-auto">{t('overlayText')}</p>
                <div className="relative mt-8">
                  <div className="absolute top-0 left-0 cursor-pointer">
                    <a href="#georgia" className="block text-xs text-white bg-brand-green px-2 py-1 rounded">{t('markers.0')}</a>
                  </div>
                  <div className="absolute top-14 left-12 cursor-pointer">
                    <a href="#alabama" className="block text-xs text-white bg-brand-green px-2 py-1 rounded">{t('markers.1')}</a>
                  </div>
                  <div className="absolute top-24 right-8 cursor-pointer">
                    <a href="#texas" className="block text-xs text-white bg-brand-green px-2 py-1 rounded">{t('markers.2')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


