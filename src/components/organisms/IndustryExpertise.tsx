import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import Image from 'next/image';
import { images, jotformUrls } from '@/data/images';
import {
  FaStore,
  FaHome,
  FaUtensils,
  FaTruck,
  FaStethoscope,
  FaHardHat,
} from 'react-icons/fa';

export const IndustryExpertise = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_tax.industries');
  const itemImages = images.solutions.businessAccounting.industriesofexpertise.map((item) => item.image);
  const itemIcons = [FaStore, FaHome, FaUtensils, FaTruck, FaStethoscope, FaHardHat];
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0,1,2,3,4,5].map((i) => {
            const img = itemImages[i % itemImages.length];
            const Icon = itemIcons[i % itemIcons.length];
            return (
              <a
                key={i}
                href={jotformUrls.businessAccountingJotformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-lg transition duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green will-change-transform"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 bg-brand-green rounded-lg mb-4 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 will-change-transform">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-green mb-3 font-poppins">{t(`items.${i}.title`)}</h3>
                  <p className="text-gray-600 text-sm mb-4">{t(`items.${i}.text`)}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {[0,1,2].map((j) => (<li key={j}>• {t(`items.${i}.bullets.${j}`)}</li>))}
                  </ul>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};


