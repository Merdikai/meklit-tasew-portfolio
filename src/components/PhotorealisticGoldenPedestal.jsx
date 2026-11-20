import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

/**
 * Photorealistic Golden Pedestal with Scales of Justice & Swirling Light Trails
 * Sourced directly from the authentic 3D raytraced master video.
 * Uses screen-blend transparency, soft radial edge feathering, and interactive 3D mouse parallax.
 */
export default function PhotorealisticGoldenPedestal({ className = '', isBackground = false }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Smooth mouse parallax effect (disabled in background mode for pure ambient elegance)
  const handleMouseMove = (e) => {
    if (isBackground || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 8,
      y: x * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isBackground && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${isBackground ? 'max-w-none aspect-square' : 'max-w-[540px] aspect-[520/430] cursor-pointer'} flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Golden Ambient Aura Behind Pedestal */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-court-gold/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isBackground ? 0.4 : isHovered ? 0.9 : 0.6,
          transform: `scale(${isHovered ? 1.08 : 1.0})`,
        }}
      />

      {/* Ground Plinth Reflection Shadow */}
      <div 
        className="absolute bottom-6 w-[360px] h-[36px] rounded-[100%] pointer-events-none transition-all duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.45) 0%, rgba(200,164,93,0.18) 45%, transparent 75%)',
          filter: 'blur(8px)',
          transform: `translateX(${tilt.y * 1.5}px) scaleX(${isHovered ? 1.1 : 1.0})`,
        }}
      />

      {/* 3D Parallax Interactive Container */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: isBackground 
            ? 'scale(1.05)' 
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
        }}
      >
        {/* Seamless Photorealistic Video Loop */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/golden_pedestal_poster.png"
          onLoadedData={() => setIsVideoLoaded(true)}
          className="w-full h-full object-contain pointer-events-none transition-opacity duration-500"
          style={{
            mixBlendMode: 'screen',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 50%, transparent 92%)',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 50%, transparent 92%)',
            filter: isBackground
              ? 'brightness(1.06) contrast(1.14)'
              : isHovered 
              ? 'brightness(1.08) drop-shadow(0 0 35px rgba(234,179,8,0.4))' 
              : 'brightness(1.02) drop-shadow(0 0 20px rgba(200,164,93,0.25))',
          }}
        >
          <source src="/videos/golden_pedestal_alpha.webm" type="video/webm" />
          <source src="/videos/golden_pedestal_seamless.webm" type="video/webm" />
          <source src="/videos/golden_pedestal_seamless.mp4" type="video/mp4" />
        </video>

        {/* Fallback Poster Image if video is initializing */}
        {!isVideoLoaded && (
          <img
            src="/videos/golden_pedestal_poster.png"
            alt="Photorealistic Golden Pedestal with Scales of Justice"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{
              mixBlendMode: 'screen',
              WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 50%, transparent 92%)',
              maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 50%, transparent 92%)',
            }}
          />
        )}

        {/* Floating Judicial Medallion Indicator (Only when not in background) */}
        {!isBackground && (
          <div 
            className="absolute -bottom-2 px-3.5 py-1 rounded-full bg-court-darkest/85 backdrop-blur-md border border-court-gold/30 text-[11px] font-mono text-court-goldLight flex items-center gap-1.5 shadow-lg pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0.75,
              transform: 'translateZ(30px)',
            }}
          >
            <Sparkles className="w-3 h-3 text-court-gold animate-pulse" />
            <span>Official Scales of Justice</span>
          </div>
        )}
      </div>
    </div>
  );
}
