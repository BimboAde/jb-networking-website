import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TimelineStep } from '../molecules/TimelineStep';

export const CorporateProcessTimeline = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_corporate.timeline');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-brand-green rounded-full" />
          <div className="space-y-12 relative">
            {[0,1,2,3,4].map((i) => (
              <TimelineStep key={i} dict={dict} baseKey={`solutions_corporate.timeline.steps.${i}`} align={i % 2 === 0 ? 'left' : 'right'} />
            ))}
          </div>
        </div>
        <div className="text-center mt-16">
          <div className="bg-brand-green rounded-2xl p-8 text-white">
            <Heading level={3} className="mb-4 text-white">{t('total.title')}</Heading>
            <p className="text-xl text-green-100 mb-6">{t('total.subtitle')}</p>
            <button className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
              {t('total.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


