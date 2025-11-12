import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { FaBullseye, FaEye, FaHandshake, FaHeart, FaAward, FaUsers, FaFlag } from 'react-icons/fa';

export const MissionValues = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.mission');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-brand-green to-brand-light-green rounded-2xl p-8 text-white">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg mb-6 flex items-center justify-center">
                <FaBullseye className="text-3xl text-brand-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-poppins">{t('mission.title')}</h3>
              <p className="text-lg text-green-100 leading-relaxed">{t('mission.text')}</p>
            </div>
            <div className="bg-gradient-to-br from-brand-navy to-blue-800 rounded-2xl p-8 text-white">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg mb-6 flex items-center justify-center">
                <FaEye className="text-3xl text-brand-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-poppins">{t('vision.title')}</h3>
              <p className="text-lg text-blue-100 leading-relaxed">{t('vision.text')}</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-brand-green font-poppins mb-6">{t('valuesTitle')}</h3>
            {[0,1,2,3,4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex-shrink-0 text-white flex items-center justify-center">
                    {i === 0 && <FaHandshake className="text-xl" />}
                    {i === 1 && <FaHeart className="text-xl" />}
                    {i === 2 && <FaAward className="text-xl" />}
                    {i === 3 && <FaUsers className="text-xl" />}
                    {i === 4 && <FaFlag className="text-xl" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-green mb-2">{t(`values.${i}.title`)}</h4>
                    <p className="text-gray-600">{t(`values.${i}.text`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


