"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VideoPlayerProps {
  videoUrl: {
    es: string;
    en: string;
  };
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  return (
    <div className="relative w-full max-w-[720px] mx-auto aspect-video rounded-xl overflow-hidden">
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-blue)]" />
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center gap-4 text-white/80 h-full">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-center max-w-md px-4">
            {error}
          </p>
        </div>
      ) : (
        <div className="absolute inset-0">
          <ReactPlayer
            url={currentVideoUrl}
            width="100%"
            height="100%"
            controls
            playing={false}
            playsinline
            config={{
              file: {
                attributes: {
                  preload: "auto",
                  playsInline: true,
                  webkitPlaysinline: "true",
                  controlsList: "nodownload",
                },
              },
            }}
            onReady={() => setIsLoading(false)}
            onError={(e) => {
              console.error("Video error:", e);
              setIsLoading(false);
              setError(
                language === "es"
                  ? "El video no está disponible en este momento"
                  : "The video is not available at this time"
              );
            }}
            className="rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
