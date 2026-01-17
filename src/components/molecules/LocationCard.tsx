import { MapPin, Phone as PhoneIcon, Mail } from 'lucide-react';
import { Button } from '../atoms/Button';

type LocationCardProps = {
  title: string;
  area: string;
  address: string;
  phone: string;
  email: string;
  getDirectionsLabel: string;
  requestMeetingLabel?: string;
  requestMeetingHref?: string;
};

export const LocationCard = ({ title, area, phone, email, requestMeetingLabel, requestMeetingHref }: LocationCardProps) => {
  const phoneDigits = phone.replace(/[^\d]/g, '');

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg text-center">
      <div className="w-16 h-16 bg-brand-green rounded-full mx-auto flex items-center justify-center mb-6">
        <MapPin className="text-white w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{title}</h3>
      <div className="space-y-3 text-gray-600">
        <p className="font-medium">{area}</p>
        {phone && (
          <a
            href={`tel:${phoneDigits}`}
            className="flex items-center justify-center hover:text-brand-green transition-colors"
          >
            <PhoneIcon className="text-brand-green mr-2 w-4 h-4 flex-shrink-0" />
            {phone}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center hover:text-brand-green transition-colors group"
          >
            <Mail className="text-brand-green mr-2 w-4 h-4 flex-shrink-0" />
            <span className="break-all text-[clamp(0.75rem,2.5vw,1rem)]">{email}</span>
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 mt-6">
        {requestMeetingLabel && (
          <Button variant="primary" href={requestMeetingHref}>
            {requestMeetingLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

