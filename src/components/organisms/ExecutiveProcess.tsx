import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ProcessStep } from '../molecules/ProcessStep';
import { FaShieldAlt, FaUserTie, FaChartLine, FaHandshake, FaClock, FaHeadset } from 'react-icons/fa';

export const ExecutiveProcess = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_executive.process');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map((n) => (
            <ProcessStep key={n} dict={dict} stepKey={`solutions_executive.process.steps.${n}`} index={n} />
          ))}
        </div>
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <Heading level={3} className="text-brand-green">{t('why.title')}</Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[0,1,2].map((i) => {
                const Icon = [FaShieldAlt, FaUserTie, FaChartLine][i] || FaShieldAlt;
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-brand-green mb-2">{t(`why.items.${i}.title`)}</h4>
                      <p className="text-gray-600">{t(`why.items.${i}.text`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-6">
              {[3,4,5].map((i) => {
                const Icon = [FaHandshake, FaClock, FaHeadset][i - 3] || FaHandshake;
                return (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-brand-green mb-2">{t(`why.items.${i}.title`)}</h4>
                      <p className="text-gray-600">{t(`why.items.${i}.text`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


