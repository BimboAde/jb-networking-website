import { type Dict, getT } from '@/lib/i18n-server';

type TimelineStepProps = {
  dict: Dict;
  baseKey: string; // e.g., solutions_corporate.timeline.steps.0
  align: 'left' | 'right';
  isLast?: boolean;
};

export const TimelineStep = ({ dict, baseKey, align }: TimelineStepProps) => {
  const t = getT(dict);
  return (
    <div className="flex items-center">
      <div className={`w-1/2 ${align === 'left' ? 'pr-8 text-right' : 'pr-8'}`}>{align==='left' && (
        <div className="bg-brand-gray rounded-xl p-6 shadow-lg inline-block text-left">
          <h3 className="text-xl font-bold text-brand-green mb-3 font-poppins">{t(`${baseKey}.title`)}</h3>
          <p className="text-gray-600 mb-4">{t(`${baseKey}.text`)}</p>
          <div className="flex items-center justify-end space-x-2 text-sm text-brand-green">
            <span>⏱</span>
            <span>{t(`${baseKey}.time`)}</span>
          </div>
        </div>
      )}</div>
      <div className="relative z-10">
        <div className={`w-16 h-16 ${align==='right' ? 'bg-brand-green' : 'bg-brand-green'} rounded-full`} />
      </div>
      <div className={`w-1/2 ${align === 'right' ? 'pl-8' : 'pl-8'}`}>{align==='right' && (
        <div className="bg-brand-gray rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-brand-green mb-3 font-poppins">{t(`${baseKey}.title`)}</h3>
          <p className="text-gray-600 mb-4">{t(`${baseKey}.text`)}</p>
          <div className="flex items-center space-x-2 text-sm text-brand-green">
            <span>⏱</span>
            <span>{t(`${baseKey}.time`)}</span>
          </div>
        </div>
      )}</div>
    </div>
  );
};


