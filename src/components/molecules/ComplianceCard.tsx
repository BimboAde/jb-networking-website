import { type Dict, getT } from '@/lib/i18n-server';

type ComplianceCardProps = {
  dict: Dict;
  titleKey: string;
  textKey: string;
  price?: string;
  period?: string;
  ctaKey?: string;
};

export const ComplianceCard = ({ dict, titleKey, textKey, price, period, ctaKey }: ComplianceCardProps) => {
  const t = getT(dict);
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg text-center">
      <div className="w-16 h-16 bg-brand-green rounded-full mx-auto mb-4" />
      <h4 className="text-lg font-semibold text-brand-green mb-3">{t(titleKey)}</h4>
      <p className="text-gray-600 text-sm mb-4">{t(textKey)}</p>
      {price && (
        <>
          <div className="text-2xl font-bold text-brand-green mb-2">{price}</div>
          {period && <div className="text-sm text-gray-500 mb-4">{period}</div>}
        </>
      )}
      {ctaKey && (
        <button className="w-full bg-brand-green text-white py-2 rounded-lg text-sm hover:bg-brand-light-green transition-colors">
          {t(ctaKey)}
        </button>
      )}
    </div>
  );
};


