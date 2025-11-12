import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { jwtVerify, decodeJwt } from 'jose';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || '';

async function verifyAccessToken(token: string): Promise<{ sub: string } | null> {
  // Preferred: verify with project JWT secret
  if (SUPABASE_JWT_SECRET) {
    try {
      const enc = new TextEncoder();
      const { payload } = await jwtVerify(token, enc.encode(SUPABASE_JWT_SECRET));
      const sub = typeof payload.sub === 'string' ? payload.sub : '';
      if (!sub) return null;
      return { sub };
    } catch {
      // fall through to optional dev decode
    }
  }
  // Dev fallback: allow decoding without verification when secret is missing or verification fails
  if (process.env.NODE_ENV !== 'production') {
    try {
      const payload = decodeJwt(token);
      const sub = typeof payload.sub === 'string' ? payload.sub : '';
      if (!sub) return null;
      return { sub };
    } catch {
      return null;
    }
  }
  return null;
}

export async function requireAdmin(req: NextRequest): Promise<{ ok: true; userId: string } | NextResponse> {
  const authz = req.headers.get('authorization') || '';
  const token = authz.toLowerCase().startsWith('bearer ') ? authz.slice(7) : '';
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const verified = await verifyAccessToken(token);
  if (!verified) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { db: { schema: 'api' } });
  const { data: profile, error: profileErr } = await supabase.from('app_users').select('role').eq('auth_user_id', verified.sub).single();
  if (profileErr || !profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return { ok: true, userId: verified.sub };
}


