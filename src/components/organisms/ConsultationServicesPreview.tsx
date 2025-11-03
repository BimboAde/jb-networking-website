import { getT, type Dict } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';

export const ConsultationServicesPreview = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'consultation.services');

  const items = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`items.${i}.title`),
    points: [0, 1, 2, 3]
      .map((p) => t(`items.${i}.points.${p}`))
      .filter((v) => typeof v === 'string'),
    highlight: t(`items.${i}.highlight`),
  }));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4 text-brand-green">{t('title')}</Heading>
          <p className="text-lg text-gray-600">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className={`bg-brand-gray rounded-lg p-6 hover:shadow-lg transition-shadow ${item.highlight ? 'border-2 border-brand-gold' : ''}`}>
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 ${item.highlight ? 'bg-brand-gold' : 'bg-brand-green'} rounded-lg mr-3`} />
                <div>
                  <h3 className="font-semibold text-brand-green">{item.title}</h3>
                  {item.highlight && <span className="text-xs bg-brand-gold text-white px-2 py-1 rounded-full">{item.highlight}</span>}
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {item.points.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


