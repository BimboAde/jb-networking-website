'use client';

import { useEffect, useState } from 'react';
import { X, Youtube } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../atoms/Button';
import { images } from '@/data/images';

type Strings = {
  title: string;
  description: string;
  buttonLabel: string;
};

export function YouTubeTeaserSticky({ strings }: { strings: Strings }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const closed = typeof window !== 'undefined' && sessionStorage.getItem('ytTeaserClosed') === '1';
    setHidden(closed);
  }, []);

  function close() {
    setHidden(true);
    try {
      sessionStorage.setItem('ytTeaserClosed', '1');
    } catch {}
  }

  if (hidden) return null;

  const channelUrl = images.youtubeChannelUrl || '#';
  const bannerUrl = images.youtubeBannerUrl || '';

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <div className="w-80 max-w-[90vw] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="relative">
          {bannerUrl ? (
            <Image src={bannerUrl} alt={strings.title} width={320} height={120} className="w-full h-24 object-cover" />
          ) : (
            <div className="w-full h-24 bg-red-600 flex items-center justify-center text-white">
              <Youtube className="w-10 h-10" />
            </div>
          )}
          <button aria-label="Close" onClick={close} className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1 shadow">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-brand-green font-semibold mb-1">{strings.title}</p>
          <p className="text-xs text-gray-600 mb-3 leading-snug">{strings.description}</p>
          <Button href={channelUrl} variant="primary" className="w-full py-2 text-sm">{strings.buttonLabel}</Button>
        </div>
      </div>
    </div>
  );
}


