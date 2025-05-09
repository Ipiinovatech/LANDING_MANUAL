"use client";

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, AlertCircle, Maximize2, Minimize2 } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: {
    es: string;
    en: string;
  };
  title: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const { language } = useLanguage();
  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden mx-auto"
      style={{
        aspectRatio: "16/9",
        maxWidth: "100%",
        background: "#000",
      }}
    >
      {/* Loading spinner */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Error fallback */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 z-10">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-center max-w-md px-4">{error}</p>
        </div>
      ) : (
        <div className="relative w-full h-full">
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
                  style: {
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  },
                },
              },
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            className="rounded-xl"
          />
        </div>
      )}

      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-10"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5" />
        ) : (
          <Maximize2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
