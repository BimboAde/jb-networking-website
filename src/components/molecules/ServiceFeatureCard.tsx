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
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isGold
          ? 'bg-gradient-to-br from-brand-gold to-yellow-600 text-white'
          : 'bg-white/80 backdrop-blur border border-gray-200 text-inherit'
      } p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-brand-green/20 focus-within:ring-2 focus-within:ring-brand-green/30 h-full flex flex-col`}
    >
      {badgeText && (
        <div
          className={`${
            isGold
              ? 'absolute top-4 right-4 bg-white/20 text-white'
              : 'absolute top-4 right-4 bg-brand-green text-white'
          } px-4 py-1 rounded-full text-xs sm:text-sm font-semibold`}
        >
          {badgeText}
        </div>
      )}
      <div className="flex-1 flex flex-col items-center text-center">
        <div
          className={`${
            isGold ? 'bg-white/20' : 'bg-brand-green'
          } w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className={`${isGold ? 'text-white' : 'text-white'} w-8 h-8 sm:w-10 sm:h-10`} />
        </div>
        <h3
          className={`mt-6 text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-poppins ${
            isGold ? '' : 'text-brand-green'
          }`}
        >
          {t(titleKey)}
        </h3>
        <p className={`${isGold ? 'text-yellow-100' : 'text-gray-600'} mb-5 sm:mb-6 text-base sm:text-lg`}>
          {t(descriptionKey)}
        </p>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 justify-items-center">
            {features.map((f) => (
              <div
                key={f}
                className={`flex items-center justify-center ${isGold ? 'text-yellow-100' : 'text-brand-green'} transition-transform duration-200 group-hover:translate-x-[1px]`}
              >
                <Check className={`mr-3 ${isGold ? 'text-yellow-200' : 'text-brand-green'} w-4 h-4 sm:w-5 sm:h-5`} />
                <span className="font-medium text-sm sm:text-base">{t(f)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


