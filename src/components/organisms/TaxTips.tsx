import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TaxTipCard } from '../molecules/TaxTipCard';
import { Receipt, PiggyBank, Home, GraduationCap, LineChart, Calendar } from 'lucide-react';

export const TaxTips = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_tax.tips');
  const tips = [
    { key: 'recordKeeping', Icon: Receipt },
    { key: 'retirement', Icon: PiggyBank },
    { key: 'homeOffice', Icon: Home },
    { key: 'educationCredits', Icon: GraduationCap },
    { key: 'investment', Icon: LineChart },
    { key: 'yearEnd', Icon: Calendar },
  ];

  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map(({ key, Icon }) => (
            <TaxTipCard
              key={key}
              icon={<Icon className="text-white" />}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              readMoreLabel={t('readMore')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


