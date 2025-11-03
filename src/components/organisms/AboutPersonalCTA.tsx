import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { COMPANY } from '@/data/constants';

export const AboutPersonalCTA = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.cta');
  return (
    <section className="py-20 bg-gradient-to-r from-brand-green to-brand-light-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} className="mb-6 text-white">{t('title')}</Heading>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">{t('description')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[0,1,2].map((i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t(`features.${i}.title`)}</h3>
                <p className="text-green-100">{t(`features.${i}.text`)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-brand-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">{t('buttons.primary')}</button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-green transition-colors">{`Call ${COMPANY.contact.phone}`}</button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-green-100">{t('badges.0')} | {t('badges.1')} | {t('badges.2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};


