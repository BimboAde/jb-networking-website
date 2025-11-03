import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const TerritoryRequirements = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_franchise.territory');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Heading level={3} className="text-brand-green mb-8">Available Markets</Heading>
            <div className="space-y-8">
              <div className="border-2 border-brand-green rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-brand-green">{t('priority.title')}</h4>
                  <span className="bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-medium">{t('priority.badge')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="font-medium text-brand-green">Georgia</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {[0,1,2,3].map((i) => (<li key={i}>• {t(`priority.ga.${i}`)}</li>))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-medium text-brand-green">Alabama</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {[0,1,2,3].map((i) => (<li key={i}>• {t(`priority.al.${i}`)}</li>))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-brand-green">{t('secondary.title')}</h4>
                  <span className="bg-brand-green text-white px-3 py-1 rounded-full text-sm font-medium">{t('secondary.badge')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="font-medium text-brand-green">Texas</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {[0,1,2,3].map((i) => (<li key={i}>• {t(`secondary.tx.${i}`)}</li>))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-medium text-brand-green">Florida</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {[0,1,2,3].map((i) => (<li key={i}>• {t(`secondary.fl.${i}`)}</li>))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-brand-gray rounded-xl p-6">
                <Heading level={4} className="text-brand-green mb-4">{t('protection.title')}</Heading>
                <ul className="space-y-3 text-gray-600">
                  {[0,1,2,3].map((i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="text-brand-green mt-1">✓</span>
                      <span>{t(`protection.items.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-brand-green rounded-xl p-6">
              <Heading level={4} className="text-brand-green mb-6">{t('financial.title')}</Heading>
              <div className="space-y-4">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b last:border-b-0 border-gray-200">
                    <span className="font-medium">{t(`financial.items.${i}.label`)}</span>
                    <span className="text-brand-green font-bold">{t(`financial.items.${i}.value`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-gray rounded-xl p-6">
              <Heading level={4} className="text-brand-green mb-4">{t('candidate.title')}</Heading>
              <div className="space-y-4">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-1"><span className="text-white text-xs font-bold">✓</span></div>
                    <div>
                      <p className="text-sm text-gray-600">{t(`candidate.items.${i}`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-xl p-6 text-white">
              <Heading level={4} className="mb-4 text-white">{t('timeline.title')}</Heading>
              <div className="space-y-3 text-sm">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 ${i===4 ? 'bg-brand-gold' : 'bg-white'} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className={`${i===4 ? 'text-white' : 'text-brand-green'} text-xs font-bold`}>{i+1}</span>
                    </div>
                    <span>{t(`timeline.steps.${i}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


