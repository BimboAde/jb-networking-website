'use client';

import { useRef, useState } from 'react';

type VideoPlayerProps = {
  videoSrc?: string;
  cloudPublicId?: string;
  poster?: string;
  overlayLabel?: string;
};

export const VideoPlayer = ({ videoSrc, cloudPublicId, poster }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleClick = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          onClick={handleClick}
        >
          {(() => {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const src =
              videoSrc ||
              (cloudPublicId && cloudName
                ? `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${cloudPublicId}.mp4`
                : undefined);
            return src ? <source src={src} type="video/mp4" /> : null;
          })()}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

