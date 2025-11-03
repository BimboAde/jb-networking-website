import { type Dict, getT } from '@/lib/i18n-server';
import { Check } from 'lucide-react';

type IndustryCardProps = {
  dict: Dict;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  Icon: React.ComponentType<{ className?: string }>;
};

export const IndustryCard = ({ dict, titleKey, descriptionKey, features, Icon }: IndustryCardProps) => {
  const t = getT(dict);
  return (
    <div className="bg-brand-gray rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-brand-green rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-white w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-3 font-poppins">{t(titleKey)}</h3>
      <p className="text-gray-600 mb-4">{t(descriptionKey)}</p>
      <ul className="space-y-2 text-sm text-gray-600">
        {features.map((f) => (
          <li key={f} className="flex items-center">
            <Check className="text-brand-green mr-2 w-4 h-4" />
            {t(f)}
          </li>
        ))}
      </ul>
    </div>
  );
};


