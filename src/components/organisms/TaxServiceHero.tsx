import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import Link from 'next/link';
import { downloads } from '@/data/images';
import { jotformUrls } from '@/data/images';
import { images } from '@/data/images';
import Image from 'next/image';
import { COMPANY } from '@/data/constants';

export const TaxServiceHero = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_tax.hero');
  const tc = getT(dict, 'solutions_tax.common');

  return (
    <section className="bg-gradient-to-br from-brand-green to-brand-light-green text-white pt-24 lg:pt-0 pb-12 lg:pb-16 min-h-[520px] lg:h-[500px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Heading level={1} className="leading-tight">
                {t('title')} 
                {/* <span className="text-brand-gold">{t('highlight')}</span> */}
              </Heading>
              <p className="text-xl text-green-100 leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="px-8 py-3 font-semibold"> <Link href={jotformUrls.individualTaxJotformUrl} target="_blank">{tc('scheduleConsultation')}</Link></Button>
              {/* <Button variant="outline" className="px-8 py-3 font-semibold"> <Link href={downloads.taxChecklistDownloadUrl} target="_blank">{tc('callUs')}</Link></Button> */}
              <Button variant="outline" className="px-8 py-3 font-semibold"> <Link href={`tel:${COMPANY.contact.phone}`}>{tc('callUs')}</Link></Button>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={images.solutions.taxServices.heroImage.src}
              alt={images.solutions.taxServices.heroImage.alt}
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


