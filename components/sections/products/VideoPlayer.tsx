"use client";

import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  const isIOS =
    typeof window !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (screenfull.isEnabled) {
        setIsFullscreen(screenfull.isFullscreen);
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on("change", handleFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleFullscreenChange);
      }
    };
  }, []);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
      {isIOS ? (
        <video
          ref={videoRef}
          src={currentVideoUrl}
          controls
          playsInline
          webkit-playsinline="true"
          poster={poster}
          preload="auto"
          className="w-full h-full object-contain rounded-xl"
        />
      ) : (
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
                poster: poster || undefined,
                playsInline: true,
                webkitPlaysinline: "true",
                preload: "auto",
                controlsList: "nodownload",
                disablePictureInPicture: true,
              },
            },
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Botón de pantalla completa */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white z-20 hover:bg-black/80"
        aria-label={
          isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"
        }
      >
        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
    </div>
  );
}
