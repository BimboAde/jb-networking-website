import { jotformUrls } from '@/data/images';
import { type Dict, getT } from '@/lib/i18n-server';
import { FaHandshake, FaBuilding, FaUsers, FaShieldAlt, FaPenNib, FaLightbulb } from 'react-icons/fa';
import { Button } from '../atoms/Button';

type FormationServiceCardProps = {
  dict: Dict;
  baseIndex: number; // index in solutions_corporate.formation.cards
  bookingLink?: string | undefined;
};

export const FormationServiceCard = ({ dict, baseIndex, bookingLink }: FormationServiceCardProps) => {
  const t = getT(dict);
  const base = `solutions_corporate.formation.cards.${baseIndex}`;
  const iconKey = t(`${base}.icon`) as string;
  const title = t(`${base}.title`);
  const text = t(`${base}.text`);
  const button = t(`${base}.button`);
  const badge = t(`${base}.badge`);
  const Icon =
    {
      handshake: FaHandshake,
      building: FaBuilding,
      users: FaUsers,
      shield: FaShieldAlt,
      pen: FaPenNib,
      lightbulb: FaLightbulb,
    }[iconKey] || FaHandshake;
  return (
    <div className={`bg-brand-gray rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow ${badge ? 'border-2 border-brand-gold relative' : ''}`}>
      {badge && (
        <div className="absolute -top-3 left-8 bg-brand-gold text-white px-4 py-1 rounded-full text-sm font-medium">{badge}</div>
      )}
      <div className="w-16 h-16 bg-brand-green rounded-lg flex items-center justify-center mb-6 text-white">
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{title}</h3>
      <p className="text-gray-600 mb-6">{text}</p>
      <ul className="space-y-2 text-sm text-gray-600 mb-6">
        {[0,1,2,3].map((i) => (
          <li key={i} className="flex items-center"><span className="text-brand-green mr-2">✓</span>{t(`${base}.features.${i}`)}</li>
        ))}
      </ul>
      <div className="border-t pt-4">
        {/* <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">{priceLabel}</span>
          <span className="text-2xl font-bold text-brand-green">{price}</span>
        </div> */}
        <Button variant="primary" className="w-full bg-brand-green text-white py-2 rounded-lg font-medium hover:bg-brand-light-green transition-colors" href={bookingLink || jotformUrls.businessCorporateServicesJotformUrl}>{button}</Button>
      </div>
    </div>
  );
};


