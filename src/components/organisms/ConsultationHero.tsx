import { getT, type Dict } from '@/lib/i18n-server';
import Image from 'next/image';
import { MotionDiv } from '../atoms/Motion';
import { getImageByLabel } from '@/lib/media';

export const ConsultationHero = async ({ dict }: { dict: Dict }) => {
  const t = getT(dict, 'consultation.hero');
  const img = await getImageByLabel('consultationPageImage');
  const heroImg = img?.src;
  const heroAlt = img?.alt || 'Consultation';

  return (
    <section className="relative overflow-hidden pt-24 lg:pt-0 pb-12 lg:pb-16 bg-gradient-to-br from-brand-green via-brand-green to-brand-light-green">
      {/* decorative background blob */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[520px] lg:h-[520px]">
          {/* Copy */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-white"
          >
            <div className="inline-flex items-center bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-gold mr-2" />
              <span>Hablamos Español • Expert Financial Consultation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
              {t('title')}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-green-100 max-w-2xl">
              {t('subtitle')}
            </p>
          </MotionDiv>

          {/* Image */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-[560px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              {heroImg && (
                <Image
                  src={heroImg}
                  alt={heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  priority={false}
                />
              )}
              {/* subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            {/* floating card */}
            <div className="absolute -bottom-6 -left-4 bg-white/90 backdrop-blur rounded-xl shadow-lg px-5 py-4 text-brand-navy hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green" />
              </div>
              {/* <div>
                <p className="text-sm font-semibold">24–48hr Turnaround</p>
                <p className="text-xs text-gray-600">Fast, secure e‑file & refund tracking</p>
              </div> */}
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};


