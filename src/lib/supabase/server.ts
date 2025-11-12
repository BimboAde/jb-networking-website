import 'server-only';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

type CreateServerClientOptions = {
  supabaseUrl?: string;
  supabaseKey?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = ReturnType<typeof createSupabaseClient<any, any>>;
let cachedClient: Client | null = null;

export const getServerSupabase = (opts: CreateServerClientOptions = {}): Client => {
  if (cachedClient) return cachedClient;
  const supabaseUrl = opts.supabaseUrl || process.env.SUPABASE_URL;
  const serviceRoleKey = opts.supabaseKey || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cachedClient = createSupabaseClient<any, any>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    db: { schema: 'api' },
  });
  return cachedClient!;
};


