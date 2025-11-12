import Image from 'next/image';
import { Shield } from 'lucide-react';
import { images } from '@/data/images';
import Link from 'next/link';

type LogoProps = {
  companyName: string;
  tagline: string;
  src?: string;
  alt?: string;
  type?: 'light' | 'dark';
};

export const Logo = ({ companyName, tagline, src, alt, type = 'light' }: LogoProps) => {
  const imageSrc = src || images?.logo?.src || '';
  const imageAlt = alt || images?.logo?.alt || companyName;

  return (
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
        {imageSrc ? (
          <Link href="/">
            <Image src={imageSrc} alt={imageAlt} width={100} height={48} className="object-fit w-12 h-12 scale-150" />
          </Link>
        ) : (
          <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center">
            <Shield className="text-white w-6 h-6" />
          </div>
        )}
      </div>
      <div>
        <h1 className={`text-xl font-bold ${type === 'dark' ? 'text-white' : 'text-brand-green'} font-poppins`}>{companyName}</h1>
        <p className={`text-sm ${type === 'dark' ? 'text-brand-gold' : 'text-brand-gold'}`}>{tagline}</p>
      </div>
    </div>
  );
};

