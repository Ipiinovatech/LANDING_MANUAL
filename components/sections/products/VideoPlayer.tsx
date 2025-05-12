"use client";

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Loader2, AlertCircle, Maximize2, Minimize2, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Hls from "hls.js";
import screenfull from "screenfull";

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideoUrl = language === "es" ? videoUrl.es : videoUrl.en;

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

  // Detect iOS devices
  const isIOS = typeof navigator !== 'undefined' && 
    /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !window.MSStream;

  // Initialize HLS if needed
  useEffect(() => {
    if (isIOS && Hls.isSupported() && currentVideoUrl.includes('.m3u8')) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
        highBufferWatchdogPeriod: 2,
        nudgeOffset: 0.1,
        nudgeMaxRetry: 5,
        maxFragLookUpTolerance: 0.25,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10,
        enableWebVTT: false,
        enableIMSC1: false,
        enableCEA708Captions: false,
        stretchShortVideoTrack: false,
        maxAudioFramesDrift: 1,
        forceKeyFrameOnDiscontinuity: true,
        abrEwmaFastLive: 3.0,
        abrEwmaSlowLive: 9.0,
        abrEwmaFastVoD: 3.0,
        abrEwmaSlowVoD: 9.0,
        abrBandWidthFactor: 0.95,
        abrBandWidthUpFactor: 0.7,
        abrMaxWithRealBitrate: false,
        maxStarvationDelay: 4,
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        emeEnabled: false,
        widevineLicenseUrl: undefined,
        drmSystemOptions: {}
      });
      
      if (playerRef.current) {
        const videoElement = playerRef.current.getInternalPlayer();
        if (videoElement) {
          hls.loadSource(currentVideoUrl);
          hls.attachMedia(videoElement);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play().catch(console.error);
          });
        }
      }

      return () => {
        hls.destroy();
      };
    }
  }, [currentVideoUrl, isIOS]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div 
      ref={playerContainerRef}
      className={`relative w-full aspect-video bg-black/90 rounded-xl overflow-hidden shadow-lg ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
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
        <div className="relative w-full h-full group">
          <ReactPlayer
            ref={playerRef}
            url={currentVideoUrl}
            width="100%"
            height="100%"
            controls={true}
            playing={false}
            playsinline
            onPlay={handlePlay}
            onPause={handlePause}
            config={{
              file: {
                attributes: {
                  playsInline: true,
                  webkitPlaysinline: "true",
                  controlsList: 'nodownload',
                  disablePictureInPicture: true,
                  preload: "metadata"
                },
                forceVideo: true,
                forceHLS: isIOS,
                forceFLV: false,
                hlsOptions: {
                  enableWorker: true,
                  autoStartLoad: true,
                  startPosition: -1,
                  debug: false,
                  maxBufferLength: 30,
                  maxMaxBufferLength: 600,
                  maxBufferSize: 60 * 1000 * 1000,
                  maxBufferHole: 0.5,
                  lowLatencyMode: true
                }
              }
            }}
            onReady={() => {
              setIsLoading(false);
              setError(null);
              setIsVideoReady(true);
            }}
            onError={handleError}
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
          
          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2.5 bg-black/50 rounded-full text-white 
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300 hover:bg-black/70 z-20
                     md:block hidden"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>

          {/* Video overlay for mobile devices */}
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