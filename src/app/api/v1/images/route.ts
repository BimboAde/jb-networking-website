import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

type ImageRecord = {
  id?: string;
  page_slug: string;
  image_location: string;
  image_url: string;
  image_alt: string;
  width?: number | null;
  height?: number | null;
};

export async function GET(req: NextRequest) {
  const pageSlug = req.nextUrl.searchParams.get('page_slug');
  const location = req.nextUrl.searchParams.get('image_location');
  const supabase = getServerSupabase();
  let query = supabase.from('images').select('*').order('created_at', { ascending: false });
  if (pageSlug) query = query.eq('page_slug', pageSlug);
  if (location) query = query.eq('image_location', location);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  const body = (await req.json()) as ImageRecord | ImageRecord[];
  const records = Array.isArray(body) ? body : [body];
  if (!records.length || records.some((r) => !r.page_slug || !r.image_location || !r.image_url || !r.image_alt)) {
    return NextResponse.json({ error: 'Invalid payload: page_slug, image_location, image_url, image_alt are required' }, { status: 400 });
  }
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('images').upsert(records).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

