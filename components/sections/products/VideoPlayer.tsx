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
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

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
      className={`relative bg-black w-full aspect-video rounded-xl overflow-hidden shadow-lg ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
    >
      <ReactPlayer
        ref={playerRef}
        url={currentVideoUrl}
        width="100%"
        height="100%"
        controls
        playing
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
        onError={(e) => {
          console.error("Error reproduciendo el video:", e);
        }}
      />

      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white z-10 hover:bg-black/80"
        aria-label={isFullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}
      >
        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
    </div>
  );
}
