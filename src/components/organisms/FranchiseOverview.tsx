import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const FranchiseOverview = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_franchise.overview');
  const tStreams = getT(dict, 'solutions_franchise.overview.streams');
  const tRev = getT(dict, 'solutions_franchise.overview.revenue');
  const tInv = getT(dict, 'solutions_franchise.overview.investment');

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[0,1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-brand-green rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{t(`features.${i}.title`)}</h3>
              <p className="text-gray-600">{t(`features.${i}.text`)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heading level={3} className="text-brand-green mb-6">{tStreams('title')}</Heading>
              <p className="text-xl text-gray-600 mb-8">{tStreams('text')}</p>
              <div className="space-y-6">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-brand-green rounded-lg flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-brand-green mb-2">{tStreams(`items.${i}.title`)}</h4>
                      <p className="text-gray-600">{tStreams(`items.${i}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-brand-green to-brand-light-green rounded-xl p-8 text-white">
                <Heading level={4} className="mb-4 text-white">{tRev('title')}</Heading>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{tRev('year1')}</span>
                    <span className="font-bold text-brand-gold">$120K - $180K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{tRev('year2')}</span>
                    <span className="font-bold text-brand-gold">$180K - $250K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{tRev('year3')}</span>
                    <span className="font-bold text-brand-gold">$250K+</span>
                  </div>
                  <div className="border-t border-green-300 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{tRev('margin')}</span>
                      <span className="font-bold text-brand-gold text-xl">35-45%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-gray rounded-xl p-8">
                <Heading level={4} className="text-brand-green mb-6">{tInv('title')}</Heading>
                <div className="space-y-4 text-gray-600">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <span>{tInv(`items.${i}.label`)}</span>
                      <span className="font-semibold">{tInv(`items.${i}.value`)}</span>
                    </div>
                  ))}
                  <div className="border-top border-gray-300 pt-4">
                    <div className="flex justify-between text-brand-green font-bold text-lg">
                      <span>{tInv('items.4.label')}</span>
                      <span>{tInv('items.4.value')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


