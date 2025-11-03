import { type Dict, getT } from '@/lib/i18n-server';
import { Button } from '../atoms/Button';

type ResourceCardProps = {
  dict: Dict;
  titleKey: string;
  descriptionKey: string;
  ctaKey: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export const ResourceCard = ({ dict, titleKey, descriptionKey, ctaKey, Icon }: ResourceCardProps) => {
  const t = getT(dict);
  return (
    <div className="bg-brand-gray rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-brand-green rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-white w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-3 font-poppins">{t(titleKey)}</h3>
      <p className="text-gray-600 mb-4">{t(descriptionKey)}</p>
      <Button variant="primary" className="bg-transparent text-brand-green hover:text-brand-light-green">
        {t(ctaKey)} →
      </Button>
    </div>
  );
};


