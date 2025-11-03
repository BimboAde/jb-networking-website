'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

type NavigationDropdownProps = {
  label: string;
  items: Array<{
    label: string;
    href: string;
  }>;
};

export const NavigationDropdown = ({ label, items }: NavigationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-gray-700 hover:text-brand-green px-3 py-2 text-sm font-medium flex items-center">
        {label}
        <ChevronDown className="ml-1 w-3 h-3" />
      </button>
      <div
        className={`absolute top-full left-0 mt-1 w-64 bg-white shadow-xl rounded-lg transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="py-2">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-gray hover:text-brand-green"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

