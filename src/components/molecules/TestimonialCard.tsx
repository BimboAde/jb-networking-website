import Image from 'next/image';
import { MotionDiv } from '../atoms/Motion';
import { Star } from 'lucide-react';
import { scaleIn } from '@/lib/animations';

type TestimonialCardProps = {
  name: string;
  role: string;
  text: string;
  avatarUrl: string;
};

export const TestimonialCard = ({ name, role, text, avatarUrl }: TestimonialCardProps) => {
  return (
    <MotionDiv
      variants={scaleIn}
      className="bg-brand-gray rounded-xl p-8 shadow-lg"
    >
      <div className="flex items-center mb-6">
        <Image
          src={avatarUrl}
          alt={name}
          width={64}
          height={64}
          className="rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-brand-green">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
          <div className="flex text-brand-gold text-sm mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">{text}</p>
    </MotionDiv>
  );
};

