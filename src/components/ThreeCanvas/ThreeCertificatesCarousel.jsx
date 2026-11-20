import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, Play, Pause, Sparkles, Award } from 'lucide-react';
import { certificatesAndHonors } from '../../data/portfolioData';
import RealisticCertificateCard from '../RealisticCertificateCard';

export default function ThreeCertificatesCarousel({ onSelectCert }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);

  const total = certificatesAndHonors.length;

  const prevCard = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextCard = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Gentle, continuous slow auto-rotation (infinite carousel cycle)
  useEffect(() => {
    if (!isAutoPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4200); // Stately 4.2s pacing: unhurried and dignified

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, isHovered, total]);

  // Subtle 3D mouse parallax
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setMouseOffset({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      className="relative w-full py-8 overflow-hidden flex flex-col items-center select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* 3D Cylindrical Arc Stage: Expanded to max-w-6xl for spacious breathing room */}
      <div
        className="relative w-full max-w-6xl h-[470px] sm:h-[490px] flex items-center justify-center"
        style={{ 
          perspective: '1400px', 
          transformStyle: 'preserve-3d',
        }}
      >
        {certificatesAndHonors.map((cert, idx) => {
          let offset = idx - activeIndex;
          if (offset > Math.floor(total / 2)) {
            offset -= total;
          } else if (offset < -Math.floor(total / 2)) {
            offset += total;
          }

          const isActive = offset === 0;
          const isDirectNeighbor = Math.abs(offset) === 1;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // Spacious 3D positioning: expanded offset from 250px -> 360px
          const rotateY = offset * 22 + (isActive ? mouseOffset.x * 0.4 : 0);
          const rotateX = isActive ? mouseOffset.y * 0.4 : 0;
          const translateX = offset * 360;
          const translateZ = -Math.abs(offset) * 140 + (isActive ? 50 : 0);
          const scale = isActive ? 1.05 : isDirectNeighbor ? 0.86 : 0.70;
          const opacity = isActive ? 1.0 : isDirectNeighbor ? 0.65 : 0.28;

          return (
            <div
              key={cert.id}
              onClick={() => {
                if (isActive) {
                  onSelectCert(cert);
                } else {
                  setActiveIndex(idx);
                }
              }}
              className={`absolute w-[330px] sm:w-[370px] h-[410px] transition-all duration-700 ease-out cursor-pointer flex flex-col items-center group ${
                isActive ? 'z-30' : isDirectNeighbor ? 'z-20' : 'z-10'
              }`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
                opacity: opacity,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Realistic Certificate Card */}
              <div className="w-full h-[360px] relative">
                <RealisticCertificateCard cert={cert} isActive={isActive} />

                {/* Subtle luminous halo on active certificate */}
                {isActive && (
                  <div className="absolute -inset-2 rounded-2xl bg-court-gold/15 blur-xl pointer-events-none -z-10" />
                )}
              </div>

              {/* High-Performance Lightweight Glossy Floor Reflection */}
              <div 
                className="w-[85%] h-12 pointer-events-none rounded-[100%] transition-opacity duration-500 mt-1"
                style={{
                  background: isActive 
                    ? 'radial-gradient(ellipse at center, rgba(212,175,55,0.38) 0%, rgba(200,164,93,0.12) 50%, transparent 80%)'
                    : 'radial-gradient(ellipse at center, rgba(200,164,93,0.15) 0%, transparent 70%)',
                  filter: 'blur(6px)',
                  transform: 'scaleY(0.4)',
                }}
              />

              {/* Hover Inspect Pill on active card */}
              {isActive && (
                <div className="absolute bottom-10 px-4 py-1.5 rounded-full bg-court-darkest/95 border border-court-gold text-court-goldLight text-xs font-mono flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                  <Eye className="w-3.5 h-3.5 text-court-gold" />
                  <span>Click to Inspect Official Parchment Record</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation & Rotation Controls */}
      <div className="flex flex-col items-center gap-3 mt-4 z-40">
        
        {/* Navigation Bar */}
        <div className="flex items-center gap-4 sm:gap-6 px-4 py-2 rounded-full bg-court-card/85 border border-court-gold/30 shadow-xl backdrop-blur-md">
          
          <button
            onClick={prevCard}
            className="p-2.5 rounded-full hover:bg-court-gold/15 text-court-gold hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous Certificate"
            title="Previous Certificate"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Numbered Indicators */}
          <div className="flex items-center gap-2">
            {certificatesAndHonors.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-7 bg-gradient-to-r from-court-gold to-amber-300 shadow-[0_0_10px_rgba(200,164,93,0.8)]'
                    : 'w-2 bg-court-border hover:bg-court-gold/40'
                }`}
                aria-label={`Jump to ${c.title}`}
                title={c.title}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="p-2.5 rounded-full hover:bg-court-gold/15 text-court-gold hover:scale-110 active:scale-95 transition-all"
            aria-label="Next Certificate"
            title="Next Certificate"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Auto-Rotation Play/Pause Toggle */}
          <div className="h-4 w-[1px] bg-court-border" />
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="p-2 rounded-full hover:bg-court-gold/15 text-court-goldLight hover:text-court-gold transition-colors text-xs flex items-center gap-1.5"
            title={isAutoPlaying ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
          >
            {isAutoPlaying ? (
              <Pause className="w-3.5 h-3.5 text-court-gold" />
            ) : (
              <Play className="w-3.5 h-3.5 text-court-gold" />
            )}
            <span className="text-[11px] font-mono hidden sm:inline">
              {isAutoPlaying ? "Rotating" : "Paused"}
            </span>
          </button>
        </div>

        {/* Active Certificate Commendation Label */}
        <div className="text-center px-4 max-w-xl">
          <span className="font-crest text-xs sm:text-sm font-semibold text-slate-200">
            {certificatesAndHonors[activeIndex].title}
          </span>
          <span className="text-xs text-court-gold ml-2 font-mono">
            ({certificatesAndHonors[activeIndex].year})
          </span>
        </div>

      </div>

    </div>
  );
}
