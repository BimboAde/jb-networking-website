import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { InvestmentProfileCard } from '../molecules/InvestmentProfileCard';
import { Sprout, LineChart, Rocket } from 'lucide-react';

export const InvestmentOptions = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_financial.options');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <InvestmentProfileCard
            dict={dict}
            Icon={Sprout}
            titleKey={'solutions_financial.options.conservative.title'}
            riskKey={'solutions_financial.options.conservative.risk'}
            metrics={[{ labelKey: 'solutions_financial.options.labels.targetReturn', valueKey: 'solutions_financial.options.conservative.return' }, { labelKey: 'solutions_financial.options.labels.horizon', valueKey: 'solutions_financial.options.conservative.horizon' }]}
            composition={[
              { labelKey: 'solutions_financial.options.assets.govBonds', valueKey: 'solutions_financial.options.conservative.comp.0' },
              { labelKey: 'solutions_financial.options.assets.corpBonds', valueKey: 'solutions_financial.options.conservative.comp.1' },
              { labelKey: 'solutions_financial.options.assets.dividend', valueKey: 'solutions_financial.options.conservative.comp.2' },
              { labelKey: 'solutions_financial.options.assets.cash', valueKey: 'solutions_financial.options.conservative.comp.3' },
            ]}
            ctaKey={'solutions_financial.options.learnMore'}
          />
          <InvestmentProfileCard
            dict={dict}
            Icon={LineChart}
            isFeatured
            badgeTextKey={'solutions_financial.options.mostPopular'}
            titleKey={'solutions_financial.options.balanced.title'}
            riskKey={'solutions_financial.options.balanced.risk'}
            metrics={[{ labelKey: 'solutions_financial.options.labels.targetReturn', valueKey: 'solutions_financial.options.balanced.return' }, { labelKey: 'solutions_financial.options.labels.horizon', valueKey: 'solutions_financial.options.balanced.horizon' }]}
            composition={[
              { labelKey: 'solutions_financial.options.assets.largeCap', valueKey: 'solutions_financial.options.balanced.comp.0' },
              { labelKey: 'solutions_financial.options.assets.international', valueKey: 'solutions_financial.options.balanced.comp.1' },
              { labelKey: 'solutions_financial.options.assets.bonds', valueKey: 'solutions_financial.options.balanced.comp.2' },
              { labelKey: 'solutions_financial.options.assets.reits', valueKey: 'solutions_financial.options.balanced.comp.3' },
              { labelKey: 'solutions_financial.options.assets.cash', valueKey: 'solutions_financial.options.balanced.comp.4' },
            ]}
            ctaKey={'solutions_financial.options.learnMore'}
          />
          <InvestmentProfileCard
            dict={dict}
            Icon={Rocket}
            titleKey={'solutions_financial.options.aggressive.title'}
            riskKey={'solutions_financial.options.aggressive.risk'}
            metrics={[{ labelKey: 'solutions_financial.options.labels.targetReturn', valueKey: 'solutions_financial.options.aggressive.return' }, { labelKey: 'solutions_financial.options.labels.horizon', valueKey: 'solutions_financial.options.aggressive.horizon' }]}
            composition={[
              { labelKey: 'solutions_financial.options.assets.growth', valueKey: 'solutions_financial.options.aggressive.comp.0' },
              { labelKey: 'solutions_financial.options.assets.smallCap', valueKey: 'solutions_financial.options.aggressive.comp.1' },
              { labelKey: 'solutions_financial.options.assets.emerging', valueKey: 'solutions_financial.options.aggressive.comp.2' },
              { labelKey: 'solutions_financial.options.assets.alternatives', valueKey: 'solutions_financial.options.aggressive.comp.3' },
              { labelKey: 'solutions_financial.options.assets.bonds', valueKey: 'solutions_financial.options.aggressive.comp.4' },
            ]}
            ctaKey={'solutions_financial.options.learnMore'}
          />
        </div>
        <div className="bg-brand-gray rounded-2xl p-8">
          <Heading level={3} className="mb-6 text-center text-brand-green">{t('accounts.title')}</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0,1,2,3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center">
                <div className="text-brand-green text-3xl mb-4">★</div>
                <h4 className="font-bold text-brand-green mb-2">{t(`accounts.items.${i}.title`)}</h4>
                <p className="text-sm text-gray-600 mb-3">{t(`accounts.items.${i}.text`)}</p>
                <div className="text-brand-gold font-semibold">{t(`accounts.items.${i}.limit`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


