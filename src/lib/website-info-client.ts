'use client';

export type WebsiteInfo = {
  main_phone?: string;
  main_email?: string;
  linkedin?: string;
  x_url?: string;
  facebook?: string;
  instagram?: string;
  pinterest?: string;
  weekday_hours?: string;
  weekend_hours?: string;
  service_booking_links?: Array<{ service: string; url: string }>;
};

const KEY = 'website_info';
const TTL_MS = 1000 * 60 * 60; // 1 hour

export async function ensureWebsiteInfoCached(): Promise<WebsiteInfo | null> {
  try {
    const cached = typeof window !== 'undefined' ? localStorage.getItem(KEY) : null;
    if (cached) {
      const { value, ts } = JSON.parse(cached) as { value: WebsiteInfo; ts: number };
      if (Date.now() - ts < TTL_MS) return value;
    }
    const res = await fetch('/api/v1/website-info', { cache: 'no-store' });
    const j = await res.json();
    const value = (j?.data || null) as WebsiteInfo | null;
    if (value) {
      localStorage.setItem(KEY, JSON.stringify({ value, ts: Date.now() }));
    }
    return value;
  } catch {
    return null;
  }
}

export function getWebsiteInfoFromCache(): WebsiteInfo | null {
  try {
    const cached = localStorage.getItem(KEY);
    if (!cached) return null;
    const { value } = JSON.parse(cached) as { value: WebsiteInfo; ts: number };
    return value || null;
  } catch {
    return null;
  }
}


