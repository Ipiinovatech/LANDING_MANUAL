"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative bg-black w-full rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={currentVideoUrl}
        controls
        playsInline
        webkit-playsinline="true"
        poster={poster}
        preload="auto"
        className="w-full"
        style={{
          display: "block",
          backgroundColor: "black",
        }}
      />
    </div>
  );
}
