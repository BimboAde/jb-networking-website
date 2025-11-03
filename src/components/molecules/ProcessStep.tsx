import { type Dict, getT } from '@/lib/i18n-server';

type ProcessStepProps = {
  dict: Dict;
  stepKey: string; // e.g., 'process.steps.1'
  index: number;
};

export const ProcessStep = ({ dict, stepKey, index }: ProcessStepProps) => {
  const t = getT(dict);
  const title = t(`${stepKey}.title`);
  const description = t(`${stepKey}.description`);
  const bullets = [0, 1, 2]
    .map((i) => t(`${stepKey}.bullets.${i}`))
    .filter((v) => typeof v === 'string');

  return (
    <div className="text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-brand-green rounded-full mx-auto flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">{index}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-center justify-center">
            <span className="text-brand-green mr-2">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


