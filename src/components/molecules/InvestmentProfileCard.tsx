import { type Dict, getT } from '@/lib/i18n-server';

type InvestmentProfileCardProps = {
  dict: Dict;
  titleKey: string;
  riskKey: string;
  metrics: { labelKey: string; valueKey: string }[];
  composition: Array<{ labelKey: string; valueKey: string }>;
  Icon: React.ComponentType<{ className?: string }>;
  badgeTextKey?: string;
  isFeatured?: boolean;
  ctaKey: string;
};

export const InvestmentProfileCard = ({ dict, titleKey, riskKey, metrics, composition, Icon, badgeTextKey, isFeatured = false, ctaKey }: InvestmentProfileCardProps) => {
  const t = getT(dict);
  return (
    <div className={`bg-brand-gray rounded-xl p-8 ${isFeatured ? 'border-2 border-brand-gold relative' : ''}`}>
      {isFeatured && badgeTextKey && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">
          {t(badgeTextKey)}
        </div>
      )}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-brand-green rounded-lg mx-auto flex items-center justify-center mb-4">
          <Icon className="text-white w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-brand-green font-poppins">{t(titleKey)}</h3>
        <div className="text-brand-gold font-semibold">{t(riskKey)}</div>
      </div>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg">
          {metrics.map((m, idx) => (
            <div key={idx} className={`flex justify-between items-center ${idx === 0 ? 'mb-2' : ''}`}>
              <span className="font-medium text-gray-700">{t(m.labelKey)}</span>
              <span className="text-brand-green font-semibold">{t(m.valueKey)}</span>
            </div>
          ))}
        </div>
        <h4 className="font-semibold text-brand-green">{t('solutions_financial.options.composition')}</h4>
        <ul className="space-y-2 text-sm">
          {composition.map((c, idx) => (
            <li key={idx} className="flex justify-between">
              <span className="text-gray-600">{t(c.labelKey)}</span>
              <span className="font-semibold">{t(c.valueKey)}</span>
            </li>
          ))}
        </ul>
        <button className="w-full bg-brand-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-light-green transition-colors">
          {t(ctaKey)}
        </button>
      </div>
    </div>
  );
};


