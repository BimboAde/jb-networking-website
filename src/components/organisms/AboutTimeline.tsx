import { type Dict, getT } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const AboutTimeline = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'about_page.timeline');
  const items = [0,1,2,3,4,5,6].map((i) => ({
    year: t(`items.${i}.year`),
    title: t(`items.${i}.title`),
    text: t(`items.${i}.text`),
  }));
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center">
            <Heading level={3} className="mb-4 text-brand-green">{t('title')}</Heading>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-brand-green" />
            <div className="space-y-16">
              {items.map((it, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`w-1/2 pr-8 ${idx % 2 === 1 ? '' : 'text-right'}`}>{idx % 2 === 1 ? null : (
                    <div className="bg-white rounded-xl p-6 shadow-lg inline-block text-left">
                      <div className="text-2xl font-bold text-brand-green mb-2">{it.year}</div>
                      <h4 className="text-lg font-semibold text-brand-green mb-3">{it.title}</h4>
                      <p className="text-gray-600">{it.text}</p>
                    </div>
                  )}</div>
                  <div className="w-4 h-4 bg-brand-green rounded-full absolute left-1/2 -translate-x-1/2 border-4 border-white" />
                  <div className="w-1/2 pl-8">{idx % 2 === 1 ? (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-brand-green mb-2">{it.year}</div>
                      <h4 className="text-lg font-semibold text-brand-green mb-3">{it.title}</h4>
                      <p className="text-gray-600">{it.text}</p>
                    </div>
                  ) : null}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


