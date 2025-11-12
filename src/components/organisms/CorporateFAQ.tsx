import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { FaqItem } from '../molecules/FaqItem';
import { Button } from '../atoms/Button';
import { jotformUrls } from '@/data/images';

export const CorporateFAQ = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_corporate.faq');
  const items = [0,1,2,3,4,5,6,7].map((i) => ({ q: t(`items.${i}.q`), a: t(`items.${i}.a`) }));
  const tStill = getT(dict, 'solutions_corporate.faq.stillQuestions');
  return (
    <section className="py-20 bg-white">
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
        <div className="text-center mt-12">
          <div className="bg-brand-green rounded-2xl p-8 text-white">
            <Heading level={3} className="mb-4 text-white">{tStill('title')}</Heading>
            <p className="text-xl text-green-100 mb-6">{tStill('text')}</p>
            <div className="flex justify-center text-brand-green">
            <Button variant="secondary" className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors" href={jotformUrls.businessCorporateServicesJotformUrl }>{tStill('button')}</Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


