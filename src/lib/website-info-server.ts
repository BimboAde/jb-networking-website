import 'server-only';
import { getServerSupabase } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';

export type WebsiteInfoRecord = {
  main_phone?: string | null;
  fax?: string | null;
  main_email?: string | null;
  linkedin?: string | null;
  x_url?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  pinterest?: string | null;
  weekday_hours?: string | null;
  weekend_hours?: string | null;
  service_booking_links?: Array<{ service: string; url: string }>;
};

const getWebsiteInfoCached = unstable_cache(
  async () => {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('website_info')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    if (error) return null;
    return (data as unknown) as WebsiteInfoRecord;
  },
  ['website-info-singleton'],
  { tags: ['website-info'], revalidate: false }
);

export async function getWebsiteInfoServer(): Promise<WebsiteInfoRecord | null> {
  try {
    return await getWebsiteInfoCached();
  } catch {
    return null;
  }
}


