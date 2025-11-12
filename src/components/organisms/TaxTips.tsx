import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { TaxTipCard } from '../molecules/TaxTipCard';
import { Receipt, PiggyBank, Home, GraduationCap, LineChart, Calendar } from 'lucide-react';
import { Button } from '../atoms/Button';
import { jotformUrls } from '@/data/images';

export const TaxTips = ({ dict, lang }: { dict: Dict; lang: string }) => {
  const t = getT(dict, 'solutions_tax.tips');
  const tc = getT(dict, 'solutions_tax.common');
  const withLang = (path: string) => `/${lang}${path.startsWith('/') ? path : '/' + path}`.replace(/\/+$/, '/');
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
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
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
              href={withLang('/consultation')}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="secondary"
            className="px-8 py-3 font-semibold"
            href={jotformUrls.individualTaxJotformUrl}
          >
            {tc('scheduleConsultation')}
          </Button>
        </div>
      </div>
    </section>
  );
};


