'use client';
import { useEffect } from 'react';
import { ensureWebsiteInfoCached } from '@/lib/website-info-client';

export function WebsiteInfoBootstrap() {
  useEffect(() => {
    ensureWebsiteInfoCached();
  }, []);
  return null;
}


