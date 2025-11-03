import { getT, type Dict } from '@/lib/i18n-server';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { Youtube } from 'lucide-react';
import { images } from '@/data/images';

export const YouTubeTeaser = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'youtube_teaser');
  const channelUrl = images?.youtubeChannelUrl || '#';

  return (
    <section className="py-16 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white">
              <Youtube className="w-8 h-8" />
            </div>
            <div>
              <Heading level={2} className="text-brand-green mb-2">{t('title')}</Heading>
              <p className="text-gray-600 max-w-xl">{t('description')}</p>
            </div>
          </div>
          <div className="shrink-0">
            <Button href={channelUrl} variant="primary" className="px-6 py-3" >
              {t('buttonLabel')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};


