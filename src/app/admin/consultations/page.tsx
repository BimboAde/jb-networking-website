'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useConfirm } from '@/components/molecules/ConfirmDialog';

type ConsultationRequest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_location?: string | null;
  preferred_language?: string | null;
  services?: unknown;
  preferred_date?: string | null;
  preferred_time?: string | null;
  about?: string | null;
  is_military?: boolean | null;
  marketing_consent?: boolean | null;
  free_consent?: boolean | null;
  created_at: string;
};

export default function ConsultationsAdminPage() {
  const [items, setItems] = useState<ConsultationRequest[]>([]);
  const { confirm, ConfirmDialog } = useConfirm();

  async function authFetch(input: RequestInfo | URL, init?: RequestInit) {
    const { data } = await supabaseBrowser.auth.getSession();
    const token = data.session?.access_token || '';
    return fetch(input, {
      ...(init || {}),
      headers: {
        ...(init?.headers || {}),
        authorization: `Bearer ${token}`,
      },
    });
  }

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await authFetch('/api/v1/consultation-requests');
      const j = await res.json();
      if (active) setItems(j.data || []);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function remove(id: string) {
    const ok = await confirm({ title: 'Confirm Delete', message: 'Delete this consultation request?' });
    if (!ok) return;
    await authFetch(`/api/v1/consultation-requests/${id}`, { method: 'DELETE' });
    const res = await authFetch('/api/v1/consultation-requests');
    const j = await res.json();
    setItems(j.data || []);
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-brand-green mb-4">Consultation Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2">Created</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Location</th>
                <th className="py-2">Language</th>
                <th className="py-2">Services</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2 text-sm text-gray-600">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="py-2">{r.first_name} {r.last_name}</td>
                  <td className="py-2">{r.email}</td>
                  <td className="py-2">{r.phone}</td>
                  <td className="py-2">{r.preferred_location || ''}</td>
                  <td className="py-2">{r.preferred_language || ''}</td>
                  <td className="py-2 text-sm text-gray-700">
                    {Array.isArray(r.services) ? (r.services as string[]).join(', ') : ''}
                  </td>
                  <td className="py-2">
                    <button onClick={() => remove(r.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


