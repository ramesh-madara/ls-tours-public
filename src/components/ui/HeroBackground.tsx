import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  videoSrc: string;
  fallbackImageSrc: string;
  posterSrc?: string;
}

/**
 * HeroBackground - Premium video background with fallbacks
 * 
 * Video requirements:
 * - Target file size: < 8-12MB for good performance
 * - Resolution: 1080p recommended
 * - Format: H.264 MP4 for best browser compatibility
 * - Duration: 10-20 seconds, seamless loop preferred
 */
export const HeroBackground = ({
  videoSrc,
  fallbackImageSrc,
  posterSrc,
}: HeroBackgroundProps) => {
  const [useImageFallback, setUseImageFallback] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for data saver mode
    const connection = (navigator as any).connection;
    const saveData = connection?.saveData || false;
    const slowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    
    if (prefersReducedMotion || saveData || slowConnection) {
      setUseImageFallback(true);
      return;
    }

    // Try to play video and fallback if it fails
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setUseImageFallback(true);
      });
    }
  }, []);

  const handleVideoError = () => {
    setUseImageFallback(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Background */}
      {!useImageFallback && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc || fallbackImageSrc}
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Image Fallback with Ken Burns effect */}
      {(useImageFallback || !isVideoLoaded) && (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          className="absolute inset-0 motion-reduce:animate-none"
          style={{
            backgroundImage: `url(${fallbackImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Strong dark gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/80" />
      
      {/* Top gradient for navbar blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/90 to-transparent" />

      {/* Brand-tinted overlay - teal to warm gold travel vibe (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(222 47% 5% / 0.5) 100%)',
        }}
      />
    </div>
  );
};
