'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useToast } from '@/components/molecules/ToastProvider';
import { broadcastCacheBust } from '@/lib/website-info-client';

type Location = {
  id?: string;
  slug: string;
  name: string;
  area?: string;
  address_line1?: string;
  address_line2?: string;
  phone?: string;
  email?: string;
  hours?: string[];
  specialties?: string[];
};

export default function LocationsAdminPage() {
  const [items, setItems] = useState<Location[]>([]);
  const [form, setForm] = useState<Location>({ slug: '', name: '', area: '', address_line1: '', address_line2: '', phone: '', email: '' });
  const [token, setToken] = useState<string>('');
  const { showToast } = useToast();

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => setToken(data.session?.access_token || ''));
    fetch('/api/v1/locations').then((r) => r.json()).then((j) => setItems(j.data || []));
  }, []);

  async function save() {
    const { data } = await supabaseBrowser.auth.getSession();
    const freshToken = data.session?.access_token || '';
    const res = await fetch('/api/v1/locations', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${freshToken}` },
      body: JSON.stringify({ ...form, hours: form.hours || [], specialties: form.specialties || [] }),
    });
    if (res.ok) {
      const list = await fetch('/api/v1/locations').then((r) => r.json());
      setItems(list.data || []);
      setForm({ slug: '', name: '' } as Location);
      showToast(form.id ? 'Location updated' : 'Location added');
      try { broadcastCacheBust(); } catch {}
    } else {
      alert('Save failed');
    }
  }

  async function remove(id?: string) {
    if (!id) return;
    if (!confirm('Delete location?')) return;
    const { data } = await supabaseBrowser.auth.getSession();
    const freshToken = data.session?.access_token || '';
    await fetch(`/api/v1/locations/${id}`, { method: 'DELETE', headers: { authorization: `Bearer ${freshToken}` } });
    const list = await fetch('/api/v1/locations').then((r) => r.json());
    setItems(list.data || []);
    showToast('Location deleted');
    try { broadcastCacheBust(); } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-bold text-brand-green">Add Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <input className="border rounded p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded p-3 md:col-span-2" placeholder="Area" value={form.area || ''} onChange={(e) => setForm({ ...form, area: e.target.value })} />
          <input className="border rounded p-3" placeholder="Address Line 1" value={form.address_line1 || ''} onChange={(e) => setForm({ ...form, address_line1: e.target.value })} />
          <input className="border rounded p-3" placeholder="Address Line 2" value={form.address_line2 || ''} onChange={(e) => setForm({ ...form, address_line2: e.target.value })} />
          <input className="border rounded p-3" placeholder="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="border rounded p-3" placeholder="Email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="flex gap-3">
            <button onClick={save} className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-light-green">{form.id ? 'Update Location' : 'Save Location'}</button>
            {form.id ? (
              <button
                type="button"
                onClick={() => setForm({ slug: '', name: '' } as Location)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-brand-green mb-4">Locations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2">Name</th>
                <th className="py-2">Slug</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Email</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td className="py-2">{m.name}</td>
                  <td className="py-2">{m.slug}</td>
                  <td className="py-2">{m.phone}</td>
                  <td className="py-2">{m.email}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setForm({ ...m })}
                        className="text-brand-green hover:underline"
                      >
                        Edit
                      </button>
                      <button onClick={() => remove(m.id)} className="text-red-600 hover:underline">Delete</button>
                    </div>
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


