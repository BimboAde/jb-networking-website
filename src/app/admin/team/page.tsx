'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { CloudinaryUpload } from '@/components/molecules/CloudinaryUpload';
import { useToast } from '@/components/molecules/ToastProvider';
import { broadcastCacheBust } from '@/lib/website-info-client';

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
  const { showToast } = useToast();

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => setToken(data.session?.access_token || ''));
    fetch('/api/v1/team-members').then((r) => r.json()).then((j) => setMembers(j.data || []));
  }, []);

  // CloudinaryUpload widget will handle upload; we only need to store URL via onChange.

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
      showToast(form.id ? 'Member updated' : 'Member added');
      try { broadcastCacheBust(); } catch {}
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
    showToast('Member deleted');
    try { broadcastCacheBust(); } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-bold text-brand-green">Add / Edit Member</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded p-3" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <div className="md:col-span-2 grid grid-cols-1 gap-3 items-start">
            <CloudinaryUpload
              folder="jbns/team"
              value={form.avatar_url}
              onChange={(val) => {
                setForm((f) => ({ ...f, avatar_url: val.url }));
                showToast('Image uploaded');
              }}
              label="Upload Avatar"
            />
          </div>
          <textarea className="border rounded p-3 md:col-span-2" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <input className="border rounded p-3" type="number" placeholder="Order Index" value={form.order_index ?? 0} onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })} />
          <div className="flex gap-3">
            <button disabled={loading} onClick={save} className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-light-green">
              {loading ? 'Saving...' : form.id ? 'Update Member' : 'Save Member'}
            </button>
            {form.id ? (
              <button
                type="button"
                onClick={() => setForm({ name: '', role: '', bio: '', avatar_url: '', order_index: 0 })}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            ) : null}
          </div>
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


