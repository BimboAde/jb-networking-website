import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import Link from 'next/link';

export const BusinessHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business.hero');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 pb-12 lg:pb-16 min-h-[520px] lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Heading level={1} className="leading-tight text-white">
                {t('title')} <span className="text-brand-gold">{t('highlight')}</span>
              </Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-3 font-semibold"> <Link href="/en/consultation">{t('ctaStart')}</Link></Button>
              <Button variant="outline" className="px-8 py-3 font-semibold">{t('ctaTax')}</Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 bg-brand-green rounded-full mx-auto" />
              <Heading level={3} className="text-brand-green">{t('card.title')}</Heading>
              <p className="text-gray-600">{t('card.description')}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-4 bg-brand-gray rounded-lg">
                  <div className="text-2xl font-bold text-brand-green mb-1">{t('card.stat0.value')}</div>
                  <div className="text-xs text-gray-600">{t('card.stat0.label')}</div>
                </div>
                <div className="text-center p-4 bg-brand-gray rounded-lg">
                  <div className="text-2xl font-bold text-brand-green mb-1">{t('card.stat1.value')}</div>
                  <div className="text-xs text-gray-600">{t('card.stat1.label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


