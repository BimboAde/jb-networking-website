import { type Dict, getT } from '@/lib/i18n-server';

type StateRequirementCardProps = {
  dict: Dict;
  baseIndex: number; // solutions_corporate.states.cards.N
};

export const StateRequirementCard = ({ dict, baseIndex }: StateRequirementCardProps) => {
  const t = getT(dict);
  const base = `solutions_corporate.states.cards.${baseIndex}`;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-brand-green text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded" />
          <h3 className="text-2xl font-bold font-poppins">{t(`${base}.state`)}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {[0,1,2,3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-gray-600">{t(`${base}.fees.${i}.label`)}</span>
              <span className="font-semibold text-brand-green">{t(`${base}.fees.${i}.value`)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold text-brand-green mb-3">Key Requirements:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {[0,1,2,3].map((i) => (
              <li key={i} className="flex items-center"><span className="text-brand-green mr-2">✓</span>{t(`${base}.requirements.${i}`)}</li>
            ))}
          </ul>
        </div>
        <button className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold mt-6 hover:bg-brand-light-green transition-colors">
          {t(`${base}.cta`)}
        </button>
      </div>
    </div>
  );
};


