"use client";

import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLanguage } from "@/contexts/LanguageContext";
import { Maximize2, Minimize2 } from "lucide-react";
import screenfull from "screenfull";

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const handleFullscreen = () => {
      if (screenfull.isEnabled) {
        setIsFullscreen(screenfull.isFullscreen);
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on("change", handleFullscreen);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleFullscreen);
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
      className={`relative bg-black rounded-xl shadow-lg w-full aspect-video overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
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
              disablePictureInPicture: true
            }
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Error reproduciendo el video:", e);
        }}
      />

      {/* Botón de pantalla completa */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2.5 bg-black/60 rounded-full text-white z-20
                   transition-opacity duration-300 hover:bg-black/80
                   md:block hidden"
        aria-label={isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
      >
        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
    </div>
  );
}
