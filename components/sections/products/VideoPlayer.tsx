"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import screenfull from "screenfull";
import { Maximize2, Minimize2 } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: {
    es: string;
    en: string;
  };
  title: string;
  poster?: string;
}

export function VideoPlayer({ videoUrl, title, poster }: VideoPlayerProps) {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black w-full aspect-video overflow-hidden rounded-xl shadow-lg`}
    >
      <video
        ref={videoRef}
        src={currentVideoUrl}
        controls
        playsInline
        webkit-playsinline="true"
        poster={poster}
        preload="metadata"
        className="w-full h-full object-contain"
        style={{
          display: 'block',
          maxWidth: '100%',
          height: '100%',
          margin: '0 auto',
          backgroundColor: 'black'
        }}
      />

      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white z-20 hover:bg-black/80"
        aria-label="Pantalla completa"
      >
        <Maximize2 className="h-5 w-5" />
      </button>
    </div>
  );
}
