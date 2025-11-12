'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AdminHome() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabaseBrowser.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold text-brand-green">Admin Dashboard</h1>
        <p className="text-gray-600">Signed in as: {email ?? 'Unknown'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: '/admin/team', title: 'Team Members', desc: 'Manage team directory' },
          { href: '/admin/locations', title: 'Locations', desc: 'Manage offices' },
          { href: '/admin/images', title: 'Images', desc: 'Manage global images' },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
            <div className="text-lg font-semibold text-brand-green">{c.title}</div>
            <div className="text-sm text-gray-600">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}



