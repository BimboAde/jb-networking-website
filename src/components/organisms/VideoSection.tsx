import { getT, type Dict } from '@/lib/i18n-server';
import { MotionDiv } from '../atoms/Motion';
import { Heading } from '../atoms/Heading';
import { VideoPlayer } from '../molecules/VideoPlayer';
import { fadeInUp } from '@/lib/animations';
import { videos } from '@/data/images';

export const VideoSection = ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'video');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <Heading level={2} className="mb-4 text-brand-green">
            {t('title')}
          </Heading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('description')}</p>
        </MotionDiv>

        <MotionDiv
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-5xl mx-auto"
        >
          <VideoPlayer
            videoSrc={videos.videoUrl}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%232D5016'/%3E%3Cg fill='white' opacity='0.1'%3E%3Ccircle cx='300' cy='200' r='50'/%3E%3Ccircle cx='900' cy='400' r='80'/%3E%3C/g%3E%3Ctext x='600' y='350' text-anchor='middle' fill='white' font-size='48' font-family='Inter'%3EJB Networking Systems LLC%3C/text%3E%3C/svg%3E"
            // overlayLabel={t('watchOurStory')}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center bg-brand-gray rounded-lg p-6">
              <div className="text-3xl font-bold text-brand-green mb-2">17+</div>
              <div className="text-gray-600">{t('stats.yearsOfExcellence')}</div>
            </div>
            <div className="text-center bg-brand-gray rounded-lg p-6">
              <div className="text-3xl font-bold text-brand-green mb-2">5000+</div>
              <div className="text-gray-600">{t('stats.satisfiedClients')}</div>
            </div>
            <div className="text-center bg-brand-gray rounded-lg p-6">
              <div className="text-3xl font-bold text-brand-green mb-2">3</div>
              <div className="text-gray-600">{t('stats.stateLocations')}</div>
            </div>
            <div className="text-center bg-brand-gray rounded-lg p-6">
              <div className="text-3xl font-bold text-brand-green mb-2">100%</div>
              <div className="text-gray-600">{t('stats.moneyBackGuarantee')}</div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

