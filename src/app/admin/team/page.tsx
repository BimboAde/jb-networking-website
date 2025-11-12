'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

type Member = {
  id?: string;
  name: string;
  role?: string;
  bio?: string;
  avatar_url?: string;
  order_index?: number;
};

export default function TeamAdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<Member>({ name: '', role: '', bio: '', avatar_url: '', order_index: 0 });
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => setToken(data.session?.access_token || ''));
    fetch('/api/v1/team-members').then((r) => r.json()).then((j) => setMembers(j.data || []));
  }, []);

  async function uploadAvatar(file: File) {
    setUploading(true);
    try {
      const sigRes = await fetch('/api/v1/uploads/cloudinary', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ folder: 'jbns/avatars' }) });
      if (!sigRes.ok) throw new Error('Failed to get signature');
      const { cloudName, apiKey, timestamp, folder, signature } = await sigRes.json();
      const formData = new FormData();
      formData.set('file', file);
      formData.set('api_key', apiKey);
      formData.set('timestamp', String(timestamp));
      formData.set('signature', signature);
      formData.set('folder', folder);
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: 'POST', body: formData });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok || !uploadJson.secure_url) throw new Error(uploadJson.error?.message || 'Upload failed');
      setForm((f) => ({ ...f, avatar_url: uploadJson.secure_url as string }));
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setLoading(true);
    const { data } = await supabaseBrowser.auth.getSession();
    const freshToken = data.session?.access_token || '';
    const res = await fetch('/api/v1/team-members', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${freshToken}` },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      const list = await fetch('/api/v1/team-members').then((r) => r.json());
      setMembers(list.data || []);
      setForm({ name: '', role: '', bio: '', avatar_url: '', order_index: 0 });
    } else {
      alert('Save failed');
    }
  }

  async function remove(id?: string) {
    if (!id) return;
    if (!confirm('Delete member?')) return;
    const { data } = await supabaseBrowser.auth.getSession();
    const freshToken = data.session?.access_token || '';
    await fetch(`/api/v1/team-members/${id}`, { method: 'DELETE', headers: { authorization: `Bearer ${freshToken}` } });
    const list = await fetch('/api/v1/team-members').then((r) => r.json());
    setMembers(list.data || []);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-bold text-brand-green">Add / Edit Member</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded p-3" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            <input className="border rounded p-3" placeholder="Avatar URL (auto after upload)" value={form.avatar_url || ''} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} />
            <label className="inline-flex items-center gap-2">
              <span className="text-sm text-gray-700">Upload Avatar</span>
              <input type="file" accept="image/*" onChange={(e) => e.target.files && e.target.files[0] && uploadAvatar(e.target.files[0])} disabled={uploading} />
            </label>
          </div>
          <textarea className="border rounded p-3 md:col-span-2" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <input className="border rounded p-3" type="number" placeholder="Order Index" value={form.order_index ?? 0} onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })} />
          <button disabled={loading} onClick={save} className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-light-green">
            {loading ? 'Saving...' : 'Save Member'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold text-brand-green mb-4">Team Members</h2>
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
              {members.map((m) => (
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


