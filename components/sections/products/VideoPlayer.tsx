"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, AlertCircle } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: {
    es: string;
    en: string;
  };
  title: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  return (
    <div className="relative w-full aspect-video max-w-4xl mx-auto">
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-center max-w-md px-4">
            {error}
          </p>
        </div>
      ) : (
        <ReactPlayer
          url={currentVideoUrl}
          width="100%"
          height="100%"
          controls
          playsinline
          playing={false}
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
        />
      )}
    </div>
  );
}
