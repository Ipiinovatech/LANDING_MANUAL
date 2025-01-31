"use client";

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Loader2, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleError = () => {
    setIsLoading(false);
    setError(language === "es" 
      ? "El video no está disponible en este momento" 
      : "The video is not available at this time");
    console.error(`Error loading video for ${title}:`, currentVideoUrl);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && playerContainerRef.current) {
        await playerContainerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  return (
    <div 
      ref={playerContainerRef}
      className="relative w-full h-full rounded-xl bg-black/5 overflow-hidden"
    >
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm z-10">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-blue)]" />
        </div>
      )}
      
      {error ? (
        <div className="flex flex-col items-center justify-center gap-4 text-white/80 h-full min-h-[300px]">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-center max-w-md px-4">
            {error}
          </p>
        </div>
      ) : (
        <div className="relative w-full h-full group">
          <ReactPlayer
            url={currentVideoUrl}
            width="100%"
            height="100%"
            controls={true}
            playsinline={true}
            onReady={() => {
              setIsLoading(false);
              setError(null);
            }}
            onError={handleError}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  playsInline: true,
                  webkitPlaysInline: true,
                  disablePictureInPicture: true,
                  className: 'w-full h-full rounded-xl'
                },
                forceVideo: true,
                forceFLV: false
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '250px',
              maxHeight: isFullscreen ? '100vh' : 'calc(90vh - 200px)'
            }}
            className="rounded-xl touch-manipulation"
          />
          
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2.5 bg-black/50 rounded-full text-white 
                     opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100
                     transition-opacity duration-300 hover:bg-black/70 z-20
                     touch-manipulation select-none
                     md:block hidden"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}