import { MapPin, Phone as PhoneIcon, Mail } from 'lucide-react';
import { Button } from '../atoms/Button';
import Link from 'next/link';

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

export const LocationCard = ({ title, area, address, phone, email, getDirectionsLabel, requestMeetingLabel, requestMeetingHref }: LocationCardProps) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg text-center">
      <div className="w-16 h-16 bg-brand-green rounded-full mx-auto flex items-center justify-center mb-6">
        <MapPin className="text-white w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-4 font-poppins">{title}</h3>
      <div className="space-y-3 text-gray-600">
        <p className="font-medium">{area}</p>
        <p className="whitespace-pre-line">{address}</p>
        <p className="flex items-center justify-center">
          <PhoneIcon className="text-brand-green mr-2 w-4 h-4" />
          {phone}
        </p>
        <p className="flex items-center justify-center">
          <Mail className="text-brand-green mr-2 w-4 h-4" />
          {email}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-6">
      
        {requestMeetingLabel && (
          <Button variant="primary" href={requestMeetingHref}>
            <Link href="/en/consultation"> {requestMeetingLabel} </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

