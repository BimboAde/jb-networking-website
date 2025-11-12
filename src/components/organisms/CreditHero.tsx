import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { jotformUrls } from '@/data/images';
import { COMPANY } from '@/data/constants';
import Image from 'next/image';
import { images } from '@/data/images';

export const CreditHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_credit.hero');
  const tc = getT(dict, 'solutions_credit.common');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 pb-12 lg:pb-16 min-h-[520px] lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-brand-gold rounded-lg" />
              <div className="bg-brand-gold text-white px-4 py-2 rounded-full text-sm font-bold">{t('badge')}</div>
            </div> */}
            <Heading level={1} className="leading-tight mt-4">
              {t('title')}
               {/* <span className="text-brand-gold block">{t('highlight')}</span> */}
            </Heading>
            <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-4 text-lg font-semibold" href={jotformUrls.creditDebtJotformUrl} target="_blank">{tc('ctaAnalysis')}</Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold" href={`tel:${COMPANY.contact.phone}`}>{tc('ctaCall')}</Button>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={images.solutions.creditDebt.heroImage.src}
              alt={images.solutions.creditDebt.heroImage.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};


