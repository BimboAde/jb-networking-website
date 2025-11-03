import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../atoms/Button';
import { scaleIn } from '@/lib/animations';

type ServiceCardProps = {
  dict: Dict;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  featuresKey: string[];
  hasBadge?: boolean;
  badgeTextKey?: string;
};

export const ServiceCard = ({
  dict,
  icon: IconComponent,
  titleKey,
  descriptionKey,
  featuresKey,
  hasBadge = false,
  badgeTextKey,
}: ServiceCardProps) => {
  const t = getT(dict);
  const tCommon = getT(dict, 'common');

  return (
    <MotionDiv
      variants={scaleIn}
      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
      style={hasBadge ? { border: '2px solid #D4A853' } : undefined}
    >
      {hasBadge && badgeTextKey && (
        <div className="absolute -top-3 left-8 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">
          {t(badgeTextKey)}
        </div>
      )}
      <div className="w-16 h-16 bg-brand-green rounded-lg flex items-center justify-center mb-6">
        <IconComponent className="text-white w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">
        {t(titleKey)}
      </h3>
      <p className="text-gray-600 mb-6">{t(descriptionKey)}</p>
      <ul className="space-y-2 text-sm text-gray-600 mb-6">
        {featuresKey.map((featureKey) => (
          <li key={featureKey} className="flex items-center">
            <Check className="text-brand-green mr-2 w-4 h-4 flex-shrink-0" />
            <span>{t(featureKey)}</span>
          </li>
        ))}
      </ul>
      <Button variant="primary" className="text-brand-green font-semibold hover:text-brand-light-green bg-transparent hover:bg-transparent p-0">
        {tCommon('learnMore')} →
      </Button>
    </MotionDiv>
  );
};

