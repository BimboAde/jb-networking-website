import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';

export const NextStepsFranchiseCTA = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'solutions_franchise.cta');
  return (
    <section className="py-20 bg-gradient-to-r from-brand-green to-brand-light-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} className="mb-6 text-white">{t('title')}</Heading>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">{t('description')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[0,1,2].map((i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t(`features.${i}.title`)}</h3>
                <p className="text-green-100">{t(`features.${i}.text`)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">{t('buttons.kit')}</Button>
            <Button variant="outline" className="px-8 py-4 text-lg font-semibold">{t('buttons.call')}</Button>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold mb-4">Limited Time Incentives</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[0,1,2,3].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="text-brand-gold">★</span>
                  <span>{t(`incentives.${i}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


