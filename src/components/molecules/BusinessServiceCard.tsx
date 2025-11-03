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
  ctaSecondaryKey,
  badgeText,
  accent = 'default',
}: BusinessServiceCardProps) => {
  const t = getT(dict);
  const isGold = accent === 'gold';

  return (
    <div className={`${isGold ? 'bg-gradient-to-br from-brand-gold to-yellow-100 border-2 border-brand-gold' : 'bg-gradient-to-br from-brand-gray to-white border border-gray-200'} rounded-2xl p-8 shadow-lg relative`}>
      {badgeText && (
        <div className="absolute -top-3 left-8 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">
          {badgeText}
        </div>
      )}
      <div className="flex items-start space-x-6">
        <div className="w-16 h-16 bg-brand-green rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="text-white w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-brand-green mb-4 font-poppins">{t(titleKey)}</h3>
          <p className="text-gray-600 mb-6">{t(descriptionKey)}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[0,1].map((col) => (
              <div key={col} className="space-y-3">
                {featuresKey
                  .filter((_, idx) => idx % 2 === col)
                  .map((fk) => (
                    <div key={fk} className="flex items-center text-sm">
                      <Check className="text-brand-green mr-3 w-4 h-4" />
                      <span>{t(fk)}</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <Button variant="primary">{t(ctaPrimaryKey)}</Button>
            <Button variant="primary" className="bg-transparent border border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
              {t(ctaSecondaryKey)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


