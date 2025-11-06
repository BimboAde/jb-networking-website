import { type Dict, getT } from '@/lib/i18n-server';
import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';
import { Button } from '../atoms/Button';

type BusinessServiceCardProps = {
  dict: Dict;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  featuresKey: string[];
  ctaPrimaryKey: string;
  ctaSecondaryKey: string;
  badgeText?: string;
  accent?: 'default' | 'gold';
};

export const BusinessServiceCard = ({
  dict,
  icon: Icon,
  titleKey,
  descriptionKey,
  featuresKey,
  ctaPrimaryKey,
  badgeText,
  accent = 'default',
}: BusinessServiceCardProps) => {
  const t = getT(dict);
  const isGold = accent === 'gold';

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl transition-all duration-300 ${
        isGold
          ? 'bg-gradient-to-br from-brand-gold to-yellow-100 border-2 border-brand-gold'
          : 'bg-white/90 backdrop-blur border border-gray-200'
      } shadow-sm hover:shadow-xl hover:-translate-y-1 hover:ring-2 hover:ring-brand-green/20 focus-within:ring-2 focus-within:ring-brand-green/30 h-full flex flex-col`}
    >
      <div className={`${isGold ? 'bg-white/30' : 'bg-brand-green/10'} absolute inset-x-0 top-0 h-1.5`} />
      {badgeText && (
        <div className="absolute -top-3 left-8 bg-brand-gold text-white px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
          {badgeText}
        </div>
      )}
      <div className="p-8 sm:p-10 flex-1 flex flex-col">
        <div className="text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-green rounded-2xl flex items-center justify-center mx-auto shadow-md transition-transform duration-300 group-hover:scale-105">
            <Icon className="text-white w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="mt-4 text-xl sm:text-2xl font-bold text-brand-green font-poppins">{t(titleKey)}</h3>
          <p className="mt-2 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">{t(descriptionKey)}</p>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {[0,1].map((col) => (
            <div key={col} className="space-y-3">
              {featuresKey
                .filter((_, idx) => idx % 2 === col)
                .map((fk) => (
                  <div key={fk} className="flex items-start text-sm sm:text-base">
                    <Check className="text-brand-green mt-0.5 mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-gray-700">{t(fk)}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 pt-2 flex items-center justify-center mt-auto">
          <Button variant="primary" className="px-8 py-3">{t(ctaPrimaryKey)}</Button>
        </div>
      </div>
    </div>
  );
};


