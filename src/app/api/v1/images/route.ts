import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

type ImageRecord = {
  id?: string;
  label: string;
  src: string;
  alt: string;
  width?: number | null;
  height?: number | null;
  category?: string | null;
};

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');
  const label = req.nextUrl.searchParams.get('label');
  const supabase = getServerSupabase();
  let query = supabase.from('images').select('*').order('created_at', { ascending: false });
  if (category) {
    query = query.eq('category', category);
  }
  if (label) {
    query = query.eq('label', label);
  }
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  const body = (await req.json()) as ImageRecord | ImageRecord[];
  const records = Array.isArray(body) ? body : [body];
  if (!records.length || records.some((r) => !r.label || !r.src || !r.alt)) {
    return NextResponse.json({ error: 'Invalid payload: label, src, alt are required' }, { status: 400 });
  }
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('images').upsert(records).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}


