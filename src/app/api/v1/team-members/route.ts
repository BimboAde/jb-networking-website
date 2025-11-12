import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth/requireAdmin';

type TeamMember = {
  id?: string;
  name: string;
  role?: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  email?: string;
  order_index?: number;
};

export async function GET() {
  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  const body = (await req.json()) as TeamMember | TeamMember[];
  const records = Array.isArray(body) ? body : [body];
  if (!records.length || records.some((r) => !r.name)) {
    return NextResponse.json({ error: 'Invalid payload: name is required' }, { status: 400 });
  }
  const supabase = getServerSupabase();
  const { data, error } = await supabase.from('team_members').upsert(records).select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}


