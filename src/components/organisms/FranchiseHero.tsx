import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const FranchiseHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_franchise.hero');
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 min-h-[560px] lg:h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="mr-2">★</span>
                {t('badge')}
              </div>
              <Heading level={1} className="leading-tight text-white">{t('title')} <span className="text-brand-gold">{t('highlight')}</span></Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">{t('ctaKit')}</Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold">{t('ctaVideo')}</Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-2">
              {[0,1,2].map((i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-brand-gold">{t(`stats.${i}.value`)}</div>
                  <div className="text-sm text-green-100">{t(`stats.${i}.label`)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-brand-green rounded-full mx-auto" />
                <Heading level={3} className="text-brand-green">{t('form.title')}</Heading>
                <p className="text-gray-600">{t('form.text')}</p>
                <form className="space-y-4">
                  <input type="text" placeholder={t('form.name')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                  <input type="email" placeholder={t('form.email')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                  <input type="tel" placeholder={t('form.phone')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent" />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent">
                    <option>{t('form.range')}</option>
                    {[0,1,2].map((i) => (
                      <option key={i}>{t(`form.ranges.${i}`)}</option>
                    ))}
                  </select>
                  <button type="submit" className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-brand-light-green transition-colors">{t('form.submit')}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


