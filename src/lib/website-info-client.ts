'use client';

export type WebsiteInfo = {
  main_phone?: string;
  fax?: string;
  main_email?: string;
  main_address_line1?: string;
  main_address_line2?: string;
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
const BUST_KEY = '__jbns_cache_bust__';
const TTL_MS = 1000 * 60 * 60; // 1 hour
let listenerAttached = false;

export function clearWebsiteInfoCache() {
  try { localStorage.removeItem(KEY); } catch {}
}

export function broadcastCacheBust() {
  try {
    localStorage.setItem(BUST_KEY, String(Date.now()));
  } catch {}
}

export async function ensureWebsiteInfoCached(): Promise<WebsiteInfo | null> {
  try {
    if (typeof window !== 'undefined' && !listenerAttached) {
      listenerAttached = true;
      window.addEventListener('storage', (e) => {
        if (e.key === BUST_KEY) {
          try { localStorage.removeItem(KEY); } catch {}
        }
      });
    }
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


