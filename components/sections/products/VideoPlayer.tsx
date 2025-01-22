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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  const handleError = () => {
    setIsLoading(false);
    setError(language === "es" 
      ? "El video no está disponible en este momento" 
      : "The video is not available at this time");
    console.error(`Error loading video for ${title}:`, currentVideoUrl);
  };

  return (
    <div className="relative w-full h-full rounded-xl bg-black/5">
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm z-10">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-blue)]" />
        </div>
      )}
      
      {error ? (
        <div className="flex flex-col items-center justify-center gap-4 text-white/80 h-full min-h-[300px]">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-center max-w-md">
            {error}
          </p>
        </div>
      ) : (
        <div className="w-full h-full">
          <ReactPlayer
            url={currentVideoUrl}
            width="100%"
            height="100%"
            controls={true}
            playing={false}
            onReady={() => {
              setIsLoading(false);
              setError(null);
            }}
            onError={handleError}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  preload: 'auto'
                },
                forceVideo: true
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '300px',
              maxHeight: 'calc(90vh - 200px)'
            }}
            className="rounded-xl"
          />
        </div>
      )}
    </div>
  );
}