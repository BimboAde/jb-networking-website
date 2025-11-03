import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const TrainingSupport = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_franchise.training');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-green rounded-full mx-auto mb-6" />
              <Heading level={3} className="text-brand-green mb-4">{t('initial.title')}</Heading>
              <p className="text-gray-600 mb-6">{t('initial.text')}</p>
            </div>
            {[0,1,2,3].map((i) => (
              <div key={i} className="bg-brand-gray rounded-xl p-6">
                <h4 className="font-semibold text-brand-green mb-4">{t(`initial.weeks.${i}.title`)}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[0,1,2,3].map((j) => (
                    <li key={j} className="flex items-center"><span className="text-brand-green mr-2">✓</span>{t(`initial.weeks.${i}.items.${j}`)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-gold rounded-full mx-auto mb-6" />
              <Heading level={3} className="text-brand-green mb-4">{t('support.title')}</Heading>
              <p className="text-gray-600 mb-6">{t('support.text')}</p>
            </div>
            <div className="bg-white border-2 border-brand-green rounded-xl p-8">
              <Heading level={4} className="text-brand-green mb-6 text-center">Support Features</Heading>
              <div className="space-y-4">
                {[0,1,2,3,4,5].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-brand-green rounded-lg flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-brand-green">{t(`support.features.${i}`)}</h5>
                      <p className="text-sm text-gray-600">&nbsp;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-navy rounded-full mx-auto mb-6" />
              <Heading level={3} className="text-brand-green mb-4">{t('launch.title')}</Heading>
              <p className="text-gray-600 mb-6">{t('launch.text')}</p>
            </div>
            <div className="bg-gradient-to-r from-brand-navy to-brand-green rounded-xl p-8 text-white">
              <Heading level={4} className="mb-6 text-white">{t('launch.package.title')}</Heading>
              <div className="space-y-3">
                {[0,1,2,3,4,5].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <span className="text-brand-gold">★</span>
                    <span>{t(`launch.package.items.${i}`)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-gray rounded-xl p-6">
              <Heading level={4} className="text-brand-green mb-4">{t('launch.timeline.title')}</Heading>
              <div className="space-y-4">
                {[0,1,2].map((i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-1"><span className="text-white text-xs font-bold">{i+1}</span></div>
                    <div>
                      <h5 className="font-medium text-brand-green">{t(`launch.timeline.phases.${i}.title`)}</h5>
                      <p className="text-sm text-gray-600">{t(`launch.timeline.phases.${i}.text`)}</p>
                    </div>
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


