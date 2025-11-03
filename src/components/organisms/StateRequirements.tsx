import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { StateRequirementCard } from '../molecules/StateRequirementCard';

export const StateRequirements = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_corporate.states');
  const tNot = getT(dict, 'solutions_corporate.states.notSure');
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[0,1,2].map((i) => (
            <StateRequirementCard key={i} dict={dict} baseIndex={i} />
          ))}
        </div>
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <Heading level={3} className="mb-4 text-brand-green">{tNot('title')}</Heading>
            <p className="text-gray-600">{tNot('text')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0,1,2].map((i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-brand-green rounded-full mx-auto mb-4" />
                <h4 className="font-semibold text-brand-green mb-2">{tNot(`tiles.${i}.title`)}</h4>
                <p className="text-sm text-gray-600">{tNot(`tiles.${i}.text`)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-light-green transition-colors">
              {tNot('cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


