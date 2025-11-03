import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { ComplianceCard } from '../molecules/ComplianceCard';

export const ComplianceServices = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_corporate.compliance');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Heading level={3} className="text-brand-green mb-6">{t('left.title')}</Heading>
            <p className="text-lg text-gray-600 mb-8">{t('left.text')}</p>
            <div className="space-y-6">
              {[0,1,2].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-green rounded-lg flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-brand-green mb-2">{t(`left.items.${i}.title`)}</h4>
                    <p className="text-gray-600">{t(`left.items.${i}.text`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <Heading level={4} className="text-brand-green mb-6">{t('checklist.title')}</Heading>
            <div className="space-y-4">
              {[0,1,2,3].map((i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-lg ${i===2 ? 'bg-yellow-50 border border-yellow-200' : 'bg-brand-gray'}`}>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xl ${i===2 ? 'text-yellow-600' : 'text-brand-green'}`}>✓</span>
                    <span className="font-medium text-gray-700">{t(`checklist.rows.${i}.label`)}</span>
                  </div>
                  <span className={`text-sm font-medium ${i===2 ? 'text-yellow-600' : 'text-brand-green'}`}>{t(`checklist.rows.${i}.status`)}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold mt-6 hover:bg-brand-light-green transition-colors">{t('checklist.cta')}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.0.title'} textKey={'solutions_corporate.compliance.tiles.0.text'} price={t('tiles.0.price')} period={t('tiles.0.period')} ctaKey={'common.addService'} />
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.1.title'} textKey={'solutions_corporate.compliance.tiles.1.text'} price={t('tiles.1.price')} period={t('tiles.1.period')} ctaKey={'common.addService'} />
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.2.title'} textKey={'solutions_corporate.compliance.tiles.2.text'} price={t('tiles.2.price')} period={t('tiles.2.period')} ctaKey={'common.addService'} />
          <ComplianceCard dict={dict} titleKey={'solutions_corporate.compliance.tiles.3.title'} textKey={'solutions_corporate.compliance.tiles.3.text'} price={t('tiles.3.price')} period={t('tiles.3.period')} ctaKey={'common.addService'} />
        </div>
      </div>
    </section>
  );
};


