'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useConfirm } from '@/components/molecules/ConfirmDialog';
import { CloudinaryUpload } from '@/components/molecules/CloudinaryUpload';

type Testimonial = {
  id?: string;
  name: string;
  role?: string;
  text: string;
  avatar_url?: string;
  order_index?: number;
};

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Testimonial>({ name: '', role: '', text: '', avatar_url: '', order_index: 0 });
  const { confirm, ConfirmDialog } = useConfirm();

  async function refresh() {
    const res = await fetch('/api/v1/testimonials');
    const j = await res.json();
    setItems(j.data || []);
  }

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch('/api/v1/testimonials');
      const j = await res.json();
      if (active) setItems(j.data || []);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function save() {
    const ok = await confirm({ title: 'Confirm Add', message: 'Add this testimonial?' });
    if (!ok) return;
    const { data } = await supabaseBrowser.auth.getSession();
    const token = data.session?.access_token || '';
    const res = await fetch('/api/v1/testimonials', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      alert('Save failed');
      return;
    }
    setForm({ name: '', role: '', text: '', avatar_url: '', order_index: 0 });
    refresh();
  }

  async function remove(id?: string) {
    if (!id) return;
    const ok = await confirm({ title: 'Confirm Delete', message: 'Delete this testimonial?' });
    if (!ok) return;
    const { data } = await supabaseBrowser.auth.getSession();
    const token = data.session?.access_token || '';
    await fetch(`/api/v1/testimonials/${id}`, { method: 'DELETE', headers: { authorization: `Bearer ${token}` } });
    refresh();
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-bold text-brand-green">Add Testimonial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded p-3" placeholder="Role" value={form.role || ''} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <textarea className="border rounded p-3 md:col-span-2" placeholder="Text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          <div className="md:col-span-2 grid grid-cols-1 gap-3 items-start">
            <CloudinaryUpload
              folder="jbns/testimonials"
              value={form.avatar_url}
              onChange={(val) => setForm((f) => ({ ...f, avatar_url: val.url }))}
              label="Upload Avatar"
            />
          </div>
          <input className="border rounded p-3" type="number" placeholder="Order Index" value={form.order_index ?? 0} onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })} />
          <button onClick={save} className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-light-green">Save Testimonial</button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-brand-green mb-4">Testimonials</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2">Name</th>
                <th className="py-2">Role</th>
                <th className="py-2">Order</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td className="py-2">{m.name}</td>
                  <td className="py-2">{m.role}</td>
                  <td className="py-2">{m.order_index}</td>
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



