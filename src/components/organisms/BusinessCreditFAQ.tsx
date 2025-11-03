import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { FaqItem } from '../molecules/FaqItem';

export const BusinessCreditFAQ = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_business_credit.faq');
  const items = [0,1,2,3,4,5,6,7].map((i) => ({ q: t(`items.${i}.q`), a: t(`items.${i}.a`) }));
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((it, idx) => (
            <FaqItem key={idx} question={it.q} answer={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
};


