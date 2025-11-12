#!/usr/bin/env tsx
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
    db: { schema: 'api' },
  });

  // Create auth user (idempotent by email)
  const { data: existing, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) throw listErr;
  let user = existing.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { role: 'admin', seed: true },
    });
    if (error) throw error;
    user = data.user;
  }
  if (!user) throw new Error('Failed to create or fetch admin user');

  // Upsert app_users
  const { error: upsertErr } = await supabase.from('app_users').upsert(
    {
      auth_user_id: user.id,
      email: ADMIN_EMAIL,
      role: 'admin',
    },
    { onConflict: 'email' }
  );
  if (upsertErr) throw upsertErr;

  console.log(`Admin seeded: ${ADMIN_EMAIL}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


