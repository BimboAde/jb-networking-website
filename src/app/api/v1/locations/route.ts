import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidateTag } from 'next/cache';

type Location = {
  id?: string;
  slug: string;
  name: string;
  manager?: string;
  area?: string;
  address_line1?: string;
  address_line2?: string;
  phone?: string;
  email?: string;
  hours?: string[] | null;
  specialties?: string[] | null;
};

export async function GET() {
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('locations').select('*').order('slug', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  const body = (await req.json()) as Location | Location[];
  const records = Array.isArray(body) ? body : [body];
  if (!records.length || records.some((r) => !r.slug || !r.name)) {
    return NextResponse.json({ error: 'Invalid payload: slug and name are required' }, { status: 400 });
  }
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('locations').upsert(records).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  try { revalidateTag('locations', { expire: 0 }); } catch {}
  return NextResponse.json({ data, revalidated: true }, { status: 201 });
}


