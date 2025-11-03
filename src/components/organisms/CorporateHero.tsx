import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
// import { Button } from '../atoms/Button';

export const CorporateHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_corporate.hero');
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
         
            <Heading level={1} className="leading-tight text-white mt-4">{t('title')} <span className="text-brand-gold">{t('highlight')}</span></Heading>
            <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-3 font-semibold">{t('ctaStart')}</Button>
              <Button variant="outline" className="px-8 py-3 font-semibold">{t('ctaGuide')}</Button>
            </div> */}
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <Heading level={3} className="text-brand-green mb-4">{t('card.title')}</Heading>
              <div className="space-y-4">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-green rounded-full" />
                    <span className="text-gray-700">{t(`card.items.${i}`)}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold mt-6 hover:bg-brand-light-green transition-colors">{t('card.cta')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


