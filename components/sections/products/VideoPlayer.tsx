"use client";

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Loader2, AlertCircle, Maximize2, Minimize2, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import screenfull from "screenfull";
import { getVideoUrl, getImageUrl } from "../utils/assetHelpers"; // si no tienes esto, dime y lo ajusto

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideoUrl = getVideoUrl(language === "es" ? videoUrl.es : videoUrl.en);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (screenfull.isEnabled) {
        setIsFullscreen(screenfull.isFullscreen);
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange);
      }
    };
  }, []);

  const handleError = (e: any) => {
    console.error('Video error:', e);
    setIsLoading(false);
    setError(language === "es"
      ? "El video no está disponible en este momento"
      : "The video is not available at this time");
  };

  const toggleFullscreen = async () => {
    try {
      if (playerContainerRef.current && screenfull.isEnabled) {
        await screenfull.toggle(playerContainerRef.current);
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div
      ref={playerContainerRef}
      className={`relative w-full aspect-video bg-black/90 rounded-xl overflow-hidden shadow-lg ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
    >
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-blue)]" />
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center gap-4 text-white/80 h-full">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-center max-w-md px-4">{error}</p>
        </div>
      ) : (
        <div className="relative w-full h-full group">
          <ReactPlayer
            ref={playerRef}
            url={currentVideoUrl}
            width="100%"
            height="100%"
            controls
            playing={isPlaying}
            playsinline
            config={{
              file: {
                attributes: {
                  playsInline: true,
                  webkitPlaysinline: "true",
                  preload: 'auto',
                  controlsList: 'nodownload',
                  disablePictureInPicture: true,
                  poster: poster ? getImageUrl(poster) : undefined
                }
              }
            }}
            onReady={() => {
              setIsLoading(false);
              setError(null);
              setIsVideoReady(true);
            }}
            onError={handleError}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onBuffer={() => setIsLoading(true)}
            onBufferEnd={() => setIsLoading(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: isVideoReady ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
            className="rounded-xl"
          />

          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2.5 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-20 md:block hidden"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>

          {isIOS && !isPlaying && (
            <div
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer z-10"
              onClick={() => {
                if (playerRef.current) {
                  const videoElement = playerRef.current.getInternalPlayer();
                  videoElement.play();
                }
              }}
            >
              <Play className="h-16 w-16 text-white opacity-80" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
