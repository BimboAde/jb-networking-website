import Image from 'next/image';
import { images } from '@/data/images';

type FullWidthBannerProps = {
  src: string;
  alt: string;
};

export const FullWidthBanner = ({ src, alt }: FullWidthBannerProps) => {
  return (
    <section className="py-8 sm:py-12">
      <div className="relative w-full aspect-[21/9] sm:aspect-[16/9] lg:aspect-[3/1] overflow-hidden rounded-none sm:rounded-2xl shadow-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        <div className="pointer-events-none absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 w-[20%]">
          <div className="rounded-full bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 shadow-lg">
            <div className="relative aspect-square">
              <Image
                src={images.logo.src}
                alt={images.logo.alt}
                fill
                className="rounded-full object-contain animate-[pulse_3s_ease-in-out_infinite]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



