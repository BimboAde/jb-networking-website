import { type Dict, getT } from '@/lib/i18n-server';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ServiceFeatureCardProps = {
  dict: Dict;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  Icon: LucideIcon;
  badgeText?: string;
  accent?: 'default' | 'gold';
};

export const ServiceFeatureCard = ({ dict, titleKey, descriptionKey, features, Icon, badgeText, accent = 'default' }: ServiceFeatureCardProps) => {
  const t = getT(dict);
  const isGold = accent === 'gold';

  return (
    <div className={`${isGold ? 'bg-gradient-to-br from-brand-gold to-yellow-600 text-white' : 'bg-brand-gray text-inherit'} rounded-2xl p-10 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
      {badgeText && (
        <div className={`${isGold ? 'absolute top-4 right-4 bg-white bg-opacity-20' : 'hidden'} px-4 py-2 rounded-full font-bold text-sm`}>
          {badgeText}
        </div>
      )}
      <div className="flex items-start space-x-6">
        <div className={`${isGold ? 'bg-white bg-opacity-20' : 'bg-brand-green'} w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={`${isGold ? 'text-white' : 'text-white'} w-10 h-10`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-2xl font-bold mb-4 font-poppins ${isGold ? '' : 'text-brand-green'}`}>{t(titleKey)}</h3>
          <p className={`${isGold ? 'text-yellow-100' : 'text-gray-600'} mb-6 text-lg`}>{t(descriptionKey)}</p>
          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f} className={`flex items-center ${isGold ? 'text-yellow-100' : 'text-brand-green'}`}>
                <Check className={`mr-3 ${isGold ? 'text-yellow-200' : ''}`} />
                <span className="font-medium">{t(f)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


