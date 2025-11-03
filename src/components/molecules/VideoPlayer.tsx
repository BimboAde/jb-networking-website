'use client';

import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

type VideoPlayerProps = {
  videoSrc?: string;
  cloudPublicId?: string;
  poster?: string;
  overlayLabel?: string;
};

export const VideoPlayer = ({ videoSrc, cloudPublicId, poster, overlayLabel }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowOverlay(false);
  };

  return (
    <div
      className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div className="aspect-video">
        <video
          className="w-full h-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
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

      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300">
          <div className="text-center text-white">
            <button
              onClick={handlePlayPause}
              className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all mb-4 mx-auto"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 ml-1" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
            <p className="text-lg font-medium">{overlayLabel}</p>
          </div>
        </div>
      )}
    </div>
  );
};

