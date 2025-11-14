import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidateTag } from 'next/cache';

export async function GET() {
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('website_info').select('*').order('updated_at', { ascending: false }).limit(1).single();
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: data || null });
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  const payload = await req.json();
  const supabase = getServerSupabase();
  // Upsert singleton (by first row if exists)
  const { data: existing } = await supabase.from('website_info').select('id').limit(1).maybeSingle();
  const updates = existing?.id ? { ...payload, id: existing.id, updated_at: new Date().toISOString() } : { ...payload };
  const { data, error } = await supabase.from('website_info').upsert(updates).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // Invalidate caches tagged for website-info
  try { revalidateTag('website-info', { expire: 0 }); } catch {}
  return NextResponse.json({ data, revalidated: true });
}


