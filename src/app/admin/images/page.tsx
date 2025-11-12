'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

type Img = {
  id?: string;
  label: string;
  src: string;
  alt: string;
  category?: string;
};

export default function ImagesAdminPage() {
  const [items, setItems] = useState<Img[]>([]);
  const [form, setForm] = useState<Img>({ label: '', src: '', alt: '', category: 'app' });
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => setToken(data.session?.access_token || ''));
    fetch('/api/v1/images').then((r) => r.json()).then((j) => setItems(j.data || []));
  }, []);

  async function save() {
    const res = await fetch('/api/v1/images', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const list = await fetch('/api/v1/images').then((r) => r.json());
      setItems(list.data || []);
      setForm({ label: '', src: '', alt: '', category: 'app' });
    } else {
      alert('Save failed');
    }
  }

  async function remove(id?: string) {
    if (!id) return;
    if (!confirm('Delete image?')) return;
    await fetch(`/api/v1/images/${id}`, { method: 'DELETE', headers: { authorization: `Bearer ${token}` } });
    const list = await fetch('/api/v1/images').then((r) => r.json());
    setItems(list.data || []);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-bold text-brand-green">Add Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          <input className="border rounded p-3" placeholder="Category" value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="border rounded p-3 md:col-span-2" placeholder="Image URL" value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} />
          <input className="border rounded p-3 md:col-span-2" placeholder="Alt Text" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
          <button onClick={save} className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-light-green">Save Image</button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-brand-green mb-4">Images</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2">Label</th>
                <th className="py-2">Category</th>
                <th className="py-2">Alt</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td className="py-2">{m.label}</td>
                  <td className="py-2">{m.category}</td>
                  <td className="py-2">{m.alt}</td>
                  <td className="py-2">
                    <button onClick={() => remove(m.id)} className="text-red-600 hover:underline">Delete</button>
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



