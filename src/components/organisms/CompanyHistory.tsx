import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import Image from 'next/image';
import { getImageByLabel } from '@/lib/media';

export const CompanyHistory = async ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.history');
  const img = await getImageByLabel('aboutPageImage1');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div>
              <Heading level={2} className="mb-6 text-brand-green">{t('title')}</Heading>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{t('p1')}</p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{t('p2')}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t('p3')}</p>
            </div>
            <div className="bg-brand-gray rounded-2xl p-8">
              <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{t('principlesTitle')}</h3>
              <ul className="space-y-3">
                {[0,1,2,3].map((i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-brand-green mt-1">✓</span>
                    <span className="text-gray-700">{t(`principles.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-64 overflow-hidden rounded-2xl relative">
              <Image fill src={img?.src || '/jblogo.png'} alt={img?.alt || 'About'} className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[0,1,2,3].map((i) => (
                <div key={i} className={`${i===1?'bg-brand-navy':'bg-brand-green'} rounded-xl p-6 text-white text-center`}>
                  <div className="text-3xl font-bold mb-2">{t(`stats.${i}.value`)}</div>
                  <div className="text-sm text-green-100">{t(`stats.${i}.label`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


