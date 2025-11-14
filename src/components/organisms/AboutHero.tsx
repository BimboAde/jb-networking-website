import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { CalendarCheck } from 'lucide-react';

export const AboutHero = ({ dict, lang, bookLink }: { dict: Dict; lang: string; bookLink?: string }) => {
  const t = getT(dict, 'about_page.hero');
  const tCommon = getT(dict, 'common');
  const bookHref = bookLink || `/${lang}/consultation`;
  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 pb-12 lg:pb-16 min-h-[520px] lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Heading level={1} className="leading-tight text-white">{t('title')} <span className="text-brand-gold">{t('highlight')}</span></Heading>
            <p className="text-xl text-green-100 leading-relaxed max-w-4xl mx-auto">{t('description')}</p>
          </div>
          {/* <div>
            <Button
              variant="secondary"
              className="px-8 py-4 text-lg font-semibold"
              href={bookHref}
              icon={<CalendarCheck className="w-5 h-5" />}
            >
              {tCommon('scheduleFreeConsultation')}
            </Button>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[0,1,2].map((i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-brand-gold mb-2">{t(`stats.${i}.value`)}</div>
                <div className="text-green-100">{t(`stats.${i}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


