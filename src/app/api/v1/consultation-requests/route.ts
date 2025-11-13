import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('ok' in auth === false) return auth as NextResponse;
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { db: { schema: 'api' } });
  const { data, error } = await supabase
    .from('consultation_requests')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = ['firstName', 'lastName', 'email', 'phone', 'location'];
    for (const key of required) {
      if (!body?.[key]) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
    }
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { db: { schema: 'api' } });
    const { error } = await supabase.from('consultation_requests').insert({
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      preferred_location: body.location,
      preferred_language: body.language || null,
      services: Array.isArray(body.services) ? body.services : [],
      preferred_date: body.date || null,
      preferred_time: body.time || null,
      about: body.about || null,
      is_military: !!body.isMilitary,
      marketing_consent: !!body.marketing,
      free_consent: !!body.freeConsent,
    });
    if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


