'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useConfirm } from '@/components/molecules/ConfirmDialog';
import { CloudinaryUpload } from '@/components/molecules/CloudinaryUpload';
import { broadcastCacheBust } from '@/lib/website-info-client';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cloudinary?: any;
  }
}

type Img = {
  id?: string;
  page_slug: string;
  image_location: string;
  image_url: string;
  image_alt: string;
  width?: number | null;
  height?: number | null;
};

export default function ImagesAdminPage() {
  const [items, setItems] = useState<Img[]>([]);
  const [form, setForm] = useState<Img>({ page_slug: '', image_location: '', image_url: '', image_alt: '', width: null, height: null });
  const [token, setToken] = useState<string>('');
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => setToken(data.session?.access_token || ''));
    fetch('/api/v1/images').then((r) => r.json()).then((j) => setItems(j.data || []));
  }, []);

  async function save() {
    const ok = await confirm({ title: 'Confirm Add', message: 'Add this image?' });
    if (!ok) return;
    const res = await fetch('/api/v1/images', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const list = await fetch('/api/v1/images').then((r) => r.json());
      setItems(list.data || []);
      setForm({ page_slug: '', image_location: '', image_url: '', image_alt: '', width: null, height: null });
      try { broadcastCacheBust(); } catch {}
    } else {
      alert('Save failed');
    }
  }

  async function remove(id?: string) {
    if (!id) return;
    const ok = await confirm({ title: 'Confirm Delete', message: 'Delete this image?' });
    if (!ok) return;
    await fetch(`/api/v1/images/${id}`, { method: 'DELETE', headers: { authorization: `Bearer ${token}` } });
    const list = await fetch('/api/v1/images').then((r) => r.json());
    setItems(list.data || []);
    try { broadcastCacheBust(); } catch {}
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-bold text-brand-green">Add Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Page Slug (e.g. home)" value={form.page_slug} onChange={(e) => setForm({ ...form, page_slug: e.target.value })} />
          <input className="border rounded p-3" placeholder="Image Location (e.g. hero)" value={form.image_location} onChange={(e) => setForm({ ...form, image_location: e.target.value })} />
          <div className="md:col-span-2">
            <CloudinaryUpload
              folder="jbns/images"
              value={form.image_url}
              onChange={(val) => setForm((f) => ({ ...f, image_url: val.url, width: val.width ?? null, height: val.height ?? null, image_alt: f.image_alt || '' }))}
              label="Upload Image"
            />
          </div>
          <input className="border rounded p-3 md:col-span-2" placeholder="Alt Text" value={form.image_alt} onChange={(e) => setForm({ ...form, image_alt: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="border rounded p-3" type="number" placeholder="Width" value={form.width ?? ''} onChange={(e) => setForm({ ...form, width: Number(e.target.value) || null })} />
            <input className="border rounded p-3" type="number" placeholder="Height" value={form.height ?? ''} onChange={(e) => setForm({ ...form, height: Number(e.target.value) || null })} />
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-light-green">{form.id ? 'Update Image' : 'Save Image'}</button>
            <button onClick={() => setForm({ page_slug: '', image_location: '', image_url: '', image_alt: '', width: null, height: null })} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Reset</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-brand-green mb-4">Images</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="py-2">Page</th>
                <th className="py-2">Location</th>
                <th className="py-2">Alt</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td className="py-2">{m.page_slug}</td>
                  <td className="py-2">{m.image_location}</td>
                  <td className="py-2">{m.image_alt}</td>
                  <td className="py-2">
                    <button onClick={() => setForm({ ...m })} className="text-brand-green hover:underline mr-3">Edit</button>
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



