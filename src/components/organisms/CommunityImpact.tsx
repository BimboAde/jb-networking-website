import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import Image from 'next/image';
import { images } from '@/data/images';

export const CommunityImpact = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.community');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <div className="h-80 overflow-hidden rounded-2xl relative">
              <Image src={images.aboutPageImage2.src} alt={images.aboutPageImage2.alt} fill className="object-cover" />
            </div>
            <div className="bg-brand-gray rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-brand-green mb-6 font-poppins">{t('programsTitle')}</h3>
              <div className="space-y-4">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <span className="text-brand-green">●</span>
                    <span className="text-gray-700">{t(`programs.${i}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-brand-green to-brand-light-green rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 font-poppins">{t('reportTitle')}</h3>
              <div className="grid grid-cols-2 gap-6">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold mb-2">{t(`reportStats.${i}.value`)}</div>
                    <div className="text-sm text-green-100">{t(`reportStats.${i}.label`)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{t('charityTitle')}</h3>
              <div className="space-y-4">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="text-brand-gold">★</span>
                    <div>
                      <h4 className="font-semibold text-brand-green">{t(`charities.${i}.title`)}</h4>
                      <p className="text-sm text-gray-600">{t(`charities.${i}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-navy rounded-xl p-6 text-white text-center">
              <h4 className="text-lg font-bold mb-3">{t('involved.title')}</h4>
              <p className="text-blue-100 mb-4">{t('involved.text')}</p>
              <button className="bg-white text-brand-navy px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">{t('involved.button')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


