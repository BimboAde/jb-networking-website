'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.replace('/admin/login');
  };

  useEffect(() => {
    // Allow unauthenticated access to the login page
    if (pathname === '/admin/login') return;
    let active = true;
    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        router.replace('/admin/login');
      } else {
        setReady(true);
      }
    });
    return () => {
      active = false;
    };
  }, [router, pathname]);

  // Expose supabase client for quick debugging in DevTools: window.supabase
  useEffect(() => {
    (globalThis as typeof window & { supabase?: typeof supabaseBrowser }).supabase = supabaseBrowser;
  }, []);

  if (!ready && pathname !== '/admin/login') return null;

  return (
    <div className="min-h-screen bg-brand-gray">
      {/* Topbar (mobile) */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            aria-label="Open menu"
            className="p-2 rounded-md border border-gray-200 text-brand-navy"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
          <h1 className="text-base font-semibold text-brand-navy">Admin</h1>
          <div className="w-9" />
        </div>
      </header>

      {/* Sidebar (desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block bg-brand-navy text-white p-6 space-y-4 min-h-screen">
          <h2 className="text-xl font-bold">Admin</h2>
          <nav className="flex flex-col space-y-2">
            <Link className="hover:underline" href="/admin">Dashboard</Link>
            <Link className="hover:underline" href="/admin/team">Team Members</Link>
            <Link className="hover:underline" href="/admin/locations">Locations</Link>
            <Link className="hover:underline" href="/admin/images">Images</Link>
            <Link className="hover:underline" href="/admin/testimonials">Testimonials</Link>
            <Link className="hover:underline" href="/admin/website">Website Info</Link>
            <Link className="hover:underline" href="/admin/consultations">Consultation Requests</Link>
            <button
              onClick={handleLogout}
              className="mt-4 text-left bg-white/10 hover:bg-white/20 text-white rounded px-3 py-2"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        {/* Panel */}
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-brand-navy text-white p-6 space-y-4 transform transition-transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Admin</h2>
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md border border-white/20"
            >
              <span className="block w-4 h-0.5 bg-white rotate-45 translate-y-[1px]" />
              <span className="block w-4 h-0.5 bg-white -rotate-45 -translate-y-[1px]" />
            </button>
          </div>
          <nav className="flex flex-col space-y-3">
            <Link className="hover:underline" href="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <Link className="hover:underline" href="/admin/team" onClick={() => setMenuOpen(false)}>Team Members</Link>
            <Link className="hover:underline" href="/admin/locations" onClick={() => setMenuOpen(false)}>Locations</Link>
            <Link className="hover:underline" href="/admin/images" onClick={() => setMenuOpen(false)}>Images</Link>
            <Link className="hover:underline" href="/admin/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link>
            <Link className="hover:underline" href="/admin/website" onClick={() => setMenuOpen(false)}>Website Info</Link>
            <Link className="hover:underline" href="/admin/consultations" onClick={() => setMenuOpen(false)}>Consultation Requests</Link>
            <button
              onClick={async () => {
                setMenuOpen(false);
                await handleLogout();
              }}
              className="mt-2 text-left bg-white/10 hover:bg-white/20 text-white rounded px-3 py-2"
            >
              Logout
            </button>
          </nav>
        </aside>
      </div>
    </div>
  );
}


