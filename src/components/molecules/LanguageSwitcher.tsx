'use client';

import { useState, useMemo } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  const currentLanguage = useMemo(() => {
    const seg = pathname?.split('/').filter(Boolean)[0] || 'en';
    return languages.find((l) => l.code === seg) || languages[0];
  }, [pathname]);

  const buildHref = (code: string) => {
    const segments = (pathname || '/').split('/').filter(Boolean);
    if (segments.length === 0) return `/${code}`;
    const [, ...rest] = segments; // drop existing locale
    return `/${code}/${rest.join('/')}`.replace(/\/$/, '');
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="bg-brand-gold text-white px-3 py-1 rounded-full font-medium text-sm flex items-center">
        <Globe className="mr-1 w-4 h-4" />
        {currentLanguage.label}
        <ChevronDown className="ml-1 w-3 h-3" />
      </button>
      <div
        className={`absolute top-full right-0 mt-1 w-32 bg-white shadow-xl rounded-lg transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="py-2">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={buildHref(lang.code)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-gray hover:text-brand-green"
            >
              {lang.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

