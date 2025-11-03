import { type Dict, getT } from '@/lib/i18n-server';

type InvestmentServiceCardProps = {
  dict: Dict;
  titleKey: string;
  descriptionKey: string;
  valueKey: string;
  valueLabelKey: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export const InvestmentServiceCard = ({ dict, titleKey, descriptionKey, valueKey, valueLabelKey, Icon }: InvestmentServiceCardProps) => {
  const t = getT(dict);
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
      <div className="w-16 h-16 bg-brand-green rounded-lg flex items-center justify-center mx-auto mb-4">
        <Icon className="text-white w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-brand-green mb-3 font-poppins">{t(titleKey)}</h3>
      <p className="text-gray-600 text-sm mb-4">{t(descriptionKey)}</p>
      <div className="text-brand-gold font-semibold text-2xl">{t(valueKey)}</div>
      <div className="text-gray-500 text-xs">{t(valueLabelKey)}</div>
    </div>
  );
};


