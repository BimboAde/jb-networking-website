import 'server-only';
import { getServerSupabase } from '@/lib/supabase/server';

export type WebsiteInfoRecord = {
  main_phone?: string | null;
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

export async function getWebsiteInfoServer(): Promise<WebsiteInfoRecord | null> {
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('website_info')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    if (error) return null;
    return (data as unknown) as WebsiteInfoRecord;
  } catch {
    return null;
  }
}


