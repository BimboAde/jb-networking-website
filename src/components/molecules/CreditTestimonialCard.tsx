import Image from 'next/image';

type CreditTestimonialCardProps = {
  name: string;
  role: string;
  text: string;
  avatarUrl: string;
  beforeScore: number;
  afterScore: number;
  days: number;
};

export const CreditTestimonialCard = ({ name, role, text, avatarUrl, beforeScore, afterScore, days }: CreditTestimonialCardProps) => {
  const delta = Math.max(0, afterScore - beforeScore);
  const pct = Math.min(100, Math.max(0, Math.round(((afterScore - 300) / (850 - 300)) * 100)));

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="flex items-center mb-6">
        <Image src={avatarUrl} alt={name} width={64} height={64} className="rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-semibold text-brand-green">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
          <div className="flex text-brand-gold text-sm">★★★★★</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-red-600 font-bold">Before: {beforeScore}</span>
          <span className="text-brand-green font-bold">After: {afterScore}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-gradient-to-r from-red-500 to-brand-green h-3 rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-center mt-2">
          <span className="text-brand-green font-bold">+{delta} Points in {days} Days</span>
        </div>
      </div>
      <p className="text-gray-600 italic">{text}</p>
    </div>
  );
};


