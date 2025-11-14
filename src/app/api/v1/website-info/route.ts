import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidateTag } from 'next/cache';

export async function GET() {
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('website_info').select('*').order('updated_at', { ascending: false }).limit(1).maybeSingle();
  if (error) {
    console.error('website-info GET: error', { message: error.message, code: error.code });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: data || null });
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  let payload: unknown;
  try {
    payload = await req.json();
  } catch (e) {
    // Log invalid JSON payloads explicitly
    console.error('website-info PUT: invalid JSON payload', e);
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  // Debug payload shape and fax value/type
  try {
    const keys = typeof payload === 'object' && payload ? Object.keys(payload as Record<string, unknown>) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const faxVal = (payload as any)?.fax;
    console.info('website-info PUT: payload keys', keys);
    console.info('website-info PUT: fax typeof/value', typeof faxVal, faxVal);
  } catch {}

  const supabase = getServerSupabase();
  // Upsert singleton (by first row if exists)
  const { data: existing, error: existingErr } = await supabase.from('website_info').select('id').limit(1).maybeSingle();
  if (existingErr) {
    console.error('website-info PUT: error fetching existing row', existingErr);
  }

  // Only allow known columns to avoid schema cache mismatch issues
  const allowed = new Set([
    'main_phone',
    'fax',
    'main_email',
    'linkedin',
    'x_url',
    'facebook',
    'instagram',
    'pinterest',
    'weekday_hours',
    'weekend_hours',
    'service_booking_links',
  ]);
  const src = payload as Record<string, unknown>;
  const filtered: Record<string, unknown> = {};
  Object.keys(src || {}).forEach((k) => {
    if (allowed.has(k)) filtered[k] = src[k];
  });

  const updates = existing?.id
    ? { ...filtered, id: existing.id, updated_at: new Date().toISOString() }
    : { ...filtered };
  console.info('website-info PUT: upserting with id', existing?.id || null);
  // Avoid logging the entire updates if it might contain PII; log keys instead
  try { console.info('website-info PUT: update keys', Object.keys(updates)); } catch {}
  const { data, error } = await supabase.from('website_info').upsert(updates).select('*').single();
  if (error) {
    // Log full supabase error object for diagnosis
    console.error('website-info PUT: upsert error', {
      message: error.message,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      details: (error as any)?.details,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hint: (error as any)?.hint,
      code: error.code,
    });
    if (error.code === 'PGRST204') {
      // Helpful hint to update the exposed api view or refresh PostgREST cache
      return NextResponse.json(
        {
          error: 'Schema out of date for api.website_info – please refresh PostgREST schema or recreate the api view to include the fax column.',
          hint:
            "Run in Supabase SQL editor:\nCREATE OR REPLACE VIEW api.website_info AS SELECT * FROM public.website_info;\n-- then refresh PostgREST schema (reload)",
          code: error.code,
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // Invalidate caches tagged for website-info
  try { revalidateTag('website-info', { expire: 0 }); } catch {}
  console.info('website-info PUT: upsert successful');
  return NextResponse.json({ data, revalidated: true });
}


