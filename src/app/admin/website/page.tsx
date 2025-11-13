'use client';

import { useEffect, useState } from 'react';
import { useConfirm } from '@/components/molecules/ConfirmDialog';
import { supabaseBrowser } from '@/lib/supabase/client';

type WebsiteInfo = {
  id?: string;
  main_phone?: string;
  main_email?: string;
  linkedin?: string;
  x_url?: string;
  facebook?: string;
  instagram?: string;
  pinterest?: string;
  weekday_hours?: string;
  weekend_hours?: string;
  service_booking_links?: Array<{ service: string; url: string }>;
};

export default function WebsiteInfoAdminPage() {
  const [info, setInfo] = useState<WebsiteInfo>({});
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => {
    let active = true;
    (async () => {
      const r = await fetch('/api/v1/website-info', { cache: 'no-store' });
      const j = await r.json();
      if (active) setInfo(j.data || {});
    })();
    return () => {
      active = false;
    };
  }, []);

  async function save() {
    const ok = await confirm({ title: 'Confirm Update', message: 'Save website information?' });
    if (!ok) return;
    const { data } = await supabaseBrowser.auth.getSession();
    const token = data.session?.access_token || '';
    const up = await fetch('/api/v1/website-info', { method: 'PUT', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify(info) });
    if (!up.ok) {
      alert('Save failed');
      return;
    }
    // refetch after save
    const r2 = await fetch('/api/v1/website-info', { cache: 'no-store' });
    const j2 = await r2.json();
    setInfo(j2.data || {});
  }

  function updateBooking(index: number, field: 'service' | 'url', value: string) {
    const arr = Array.isArray(info.service_booking_links) ? [...info.service_booking_links] : [];
    arr[index] = { ...(arr[index] || { service: '', url: '' }), [field]: value };
    setInfo({ ...info, service_booking_links: arr });
  }
  function addBooking() {
    const arr = Array.isArray(info.service_booking_links) ? [...info.service_booking_links] : [];
    arr.push({ service: '', url: '' });
    setInfo({ ...info, service_booking_links: arr });
  }
  function removeBooking(index: number) {
    const arr = Array.isArray(info.service_booking_links) ? [...info.service_booking_links] : [];
    arr.splice(index, 1);
    setInfo({ ...info, service_booking_links: arr });
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog />
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-bold text-brand-green">Website Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" placeholder="Main Phone" value={info.main_phone || ''} onChange={(e) => setInfo({ ...info, main_phone: e.target.value })} />
          <input className="border rounded p-3" placeholder="Main Email" value={info.main_email || ''} onChange={(e) => setInfo({ ...info, main_email: e.target.value })} />
          <input className="border rounded p-3" placeholder="LinkedIn URL" value={info.linkedin || ''} onChange={(e) => setInfo({ ...info, linkedin: e.target.value })} />
          <input className="border rounded p-3" placeholder="X (Twitter) URL" value={info.x_url || ''} onChange={(e) => setInfo({ ...info, x_url: e.target.value })} />
          <input className="border rounded p-3" placeholder="Facebook URL" value={info.facebook || ''} onChange={(e) => setInfo({ ...info, facebook: e.target.value })} />
          <input className="border rounded p-3" placeholder="Instagram URL" value={info.instagram || ''} onChange={(e) => setInfo({ ...info, instagram: e.target.value })} />
          <input className="border rounded p-3" placeholder="Pinterest URL" value={info.pinterest || ''} onChange={(e) => setInfo({ ...info, pinterest: e.target.value })} />
          <input className="border rounded p-3" placeholder="Weekday Hours" value={info.weekday_hours || ''} onChange={(e) => setInfo({ ...info, weekday_hours: e.target.value })} />
          <input className="border rounded p-3" placeholder="Weekend Hours" value={info.weekend_hours || ''} onChange={(e) => setInfo({ ...info, weekend_hours: e.target.value })} />
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <h3 className="text-lg font-semibold text-brand-green">Service Booking Links</h3>
        <div className="space-y-3">
          {(info.service_booking_links && info.service_booking_links.length > 0 ? info.service_booking_links : [{ service: '', url: '' }]).map((row, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[240px_1fr_auto] gap-3 items-center">
              <input className="border rounded p-3" placeholder="Service" value={row?.service || ''} onChange={(e) => updateBooking(i, 'service', e.target.value)} />
              <input className="border rounded p-3" placeholder="URL" value={row?.url || ''} onChange={(e) => updateBooking(i, 'url', e.target.value)} />
              <button onClick={() => removeBooking(i)} className="text-red-600 hover:underline">Remove</button>
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={addBooking} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50">Add Link</button>
          <button onClick={save} className="bg-brand-green text-white px-4 py-2 rounded hover:bg-brand-light-green">Save Changes</button>
        </div>
      </div>
    </div>
  );
}


