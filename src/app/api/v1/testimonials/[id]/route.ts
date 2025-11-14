import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidateTag } from 'next/cache';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  const updates = await req.json();
  const { id } = await params;
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('testimonials').update(updates).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  try { revalidateTag('testimonials', { expire: 0 }); } catch {}
  return NextResponse.json({ data, revalidated: true });
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const admin = await requireAdmin(_req);
  if (admin instanceof NextResponse) return admin;
  const { id } = await params;
  const supabase = getServerSupabase();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  try { revalidateTag('testimonials', { expire: 0 }); } catch {}
  return NextResponse.json({ ok: true, revalidated: true });
}



