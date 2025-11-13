import 'server-only';
import { getServerSupabase } from '@/lib/supabase/server';

type ImageRecord = {
  id: string;
  page_slug?: string | null;
  image_location?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  width?: number | null;
  height?: number | null;
  category?: string | null;
};

export async function getImageByLabel(label: string): Promise<ImageRecord | null> {
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase.from('images').select('*').eq('label', label).limit(1);
    if (!error && data && data.length > 0) return data[0] as ImageRecord;
    return null;
  } catch {
    return null;
  }
}

export async function getImageByLocation(pageSlug: string, imageLocation: string): Promise<ImageRecord | null> {
  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('image_location', imageLocation)
      .order('created_at', { ascending: false })
      .limit(1);
    if (!error && data && data.length > 0) return data[0] as ImageRecord;
    return null;
  } catch {
    return null;
  }
}


