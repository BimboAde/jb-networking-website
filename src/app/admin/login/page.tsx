'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error || !data.session) {
      setError(error?.message || 'Login failed');
      return;
    }
    router.replace('/admin');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-gray">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-brand-green text-center">Admin Login</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border rounded-md p-3" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border rounded-md p-3" required />
        </div>
        <button disabled={loading} type="submit" className="w-full bg-brand-green text-white py-3 rounded-md font-semibold hover:bg-brand-light-green transition-colors">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}



