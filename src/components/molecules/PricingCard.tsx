import { type Dict, getT } from '@/lib/i18n-server';

type PricingCardProps = {
  dict: Dict;
  baseKey: string; // e.g., 'pricing.taxEssentials'
  icon?: React.ReactNode;
  highlightKey?: string; // e.g., 'pricing.mostPopular'
  containerClassName?: string;
};

export const PricingCard = ({ dict, baseKey, icon, highlightKey, containerClassName }: PricingCardProps) => {
  const t = getT(dict);
  const title = t(`${baseKey}.title`);
  const price = t(`${baseKey}.price`);
  const period = t(`${baseKey}.period`);
  const features = [0, 1, 2, 3, 4]
    .map((i) => t(`${baseKey}.features.${i}`))
    .filter((v) => typeof v === 'string');
  const button = t(`${baseKey}.button`);
  const highlight = highlightKey ? t(highlightKey) : undefined;

  return (
    <div className={`bg-brand-gray rounded-xl p-8 hover:shadow-lg transition-shadow relative overflow-hidden ${containerClassName || ''}`}>
      {highlight && (
        <div className="absolute top-4 right-4 bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-bold">
          {highlight}
        </div>
      )}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-brand-green rounded-full mx-auto flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-brand-green mb-2 font-poppins">{title}</h3>
        <div className="text-3xl font-bold text-brand-green mb-2">{price}</div>
        <div className="text-gray-600">{period}</div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center text-gray-700">
            <span className="text-brand-green mr-3">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-brand-light-green transition-colors">
        {button}
      </button>
    </div>
  );
};


