'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from '../molecules/LanguageSwitcher';

type NavItem = { label: string; href: string };

type Props = {
  companyName: string;
  tagline: string;
  about: NavItem;
  locations: NavItem;
  consultation: NavItem;
  individualServices: NavItem[];
  businessServices: NavItem[];
};

export function HeaderMobileMenu({ companyName, tagline, about, locations, consultation, individualServices, businessServices }: Props) {
  const [open, setOpen] = useState(false);
  const [openInd, setOpenInd] = useState(false);
  const [openBiz, setOpenBiz] = useState(false);

  return (
    <div className="lg:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 rounded-md border border-gray-200 text-gray-700">
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl p-5 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-brand-green font-bold">{companyName}</div>
                <div className="text-xs text-gray-500">{tagline}</div>
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md border border-gray-200 text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-brand-gray" onClick={() => setOpenInd((v) => !v)}>
                <span className="text-sm text-gray-800">Individuals</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openInd ? 'rotate-180' : ''}`} />
              </button>
              {openInd && (
                <div className="ml-3 mb-2 space-y-1">
                  {individualServices.map((it) => (
                    <Link key={it.href} href={it.href} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-brand-gray" onClick={() => setOpen(false)}>
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}

              <button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-brand-gray" onClick={() => setOpenBiz((v) => !v)}>
                <span className="text-sm text-gray-800">Businesses</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openBiz ? 'rotate-180' : ''}`} />
              </button>
              {openBiz && (
                <div className="ml-3 mb-2 space-y-1">
                  {businessServices.map((it) => (
                    <Link key={it.href} href={it.href} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-brand-gray" onClick={() => setOpen(false)}>
                      {it.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link href={about.href} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-brand-gray" onClick={() => setOpen(false)}>
                {about.label}
              </Link>
              <Link href={locations.href} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-brand-gray" onClick={() => setOpen(false)}>
                {locations.label}
              </Link>
              <Link href={consultation.href} className="block px-3 py-2 rounded-md text-sm text-brand-green font-semibold hover:bg-brand-gray" onClick={() => setOpen(false)}>
                {consultation.label}
              </Link>

              <div className="pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


