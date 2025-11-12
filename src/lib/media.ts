import 'server-only';
import { getServerSupabase } from '@/lib/supabase/server';

type ImageRecord = {
  id: string;
  label: string;
  src: string;
  alt: string;
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


