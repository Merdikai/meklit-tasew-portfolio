import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { certificatesAndHonors } from '../../data/portfolioData';
import RealisticCertificateCard from '../RealisticCertificateCard';

export default function ThreeCertificatesCarousel({ onSelectCert }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const prevCard = () => {
    setActiveIndex((prev) => (prev === 0 ? certificatesAndHonors.length - 1 : prev - 1));
  };

  const nextCard = () => {
    setActiveIndex((prev) => (prev === certificatesAndHonors.length - 1 ? 0 : prev + 1));
  };

  // Subtle 3D mouse parallax
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setMouseOffset({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full py-8 overflow-hidden flex flex-col items-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* 3D Cylindrical Arc Stage */}
      <div
        className="relative w-full max-w-4xl h-[460px] flex items-center justify-center"
        style={{ 
          perspective: '1300px', 
          transformStyle: 'preserve-3d',
        }}
      >
        {certificatesAndHonors.map((cert, idx) => {
          let offset = idx - activeIndex;
          if (offset > Math.floor(certificatesAndHonors.length / 2)) {
            offset -= certificatesAndHonors.length;
          } else if (offset < -Math.floor(certificatesAndHonors.length / 2)) {
            offset += certificatesAndHonors.length;
          }

          const isActive = offset === 0;
          const isDirectNeighbor = Math.abs(offset) === 1;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // 3D positioning on cylindrical arc
          const rotateY = offset * 26 + (isActive ? mouseOffset.x * 0.5 : 0);
          const rotateX = isActive ? mouseOffset.y * 0.5 : 0;
          const translateX = offset * 250;
          const translateZ = -Math.abs(offset) * 130 + (isActive ? 45 : 0);
          const scale = isActive ? 1.05 : isDirectNeighbor ? 0.88 : 0.72;
          const opacity = isActive ? 1.0 : isDirectNeighbor ? 0.75 : 0.35;

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
              className={`absolute w-[340px] sm:w-[380px] h-[410px] transition-all duration-500 ease-out cursor-pointer flex flex-col items-center group ${
                isActive ? 'z-30' : isDirectNeighbor ? 'z-20' : 'z-10'
              }`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
                opacity: opacity,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Realistic Certificate Card */}
              <div className="w-full h-[360px]">
                <RealisticCertificateCard cert={cert} isActive={isActive} />
              </div>

              {/* Realistic Dark Glossy Floor Reflection (as seen in v1_frame_07 & v2_frame_06) */}
              <div 
                className="w-full h-16 pointer-events-none overflow-hidden opacity-30 mt-[-8px] blur-[1px] transform scale-y-[-1] mask-radial"
                style={{
                  maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 85%)',
                  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 85%)',
                }}
              >
                <div className="w-full h-[360px] opacity-40">
                  <RealisticCertificateCard cert={cert} isActive={false} />
                </div>
              </div>

              {/* Hover Inspect Pill on active card */}
              {isActive && (
                <div className="absolute bottom-10 px-3.5 py-1 rounded-full bg-court-darkest/90 border border-court-gold text-court-goldLight text-[11px] font-mono flex items-center gap-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5 text-court-gold" />
                  <span>Click to Inspect High-Res Record</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6 mt-4 z-40">
        <button
          onClick={prevCard}
          className="p-3 rounded-full bg-court-card/90 border border-court-gold/40 hover:border-court-gold text-court-gold hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-md"
          aria-label="Previous Certificate"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Numbered Indicators */}
        <div className="flex items-center gap-2">
          {certificatesAndHonors.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === i
                  ? 'w-7 bg-gradient-to-r from-court-gold to-amber-300 shadow-[0_0_10px_rgba(200,164,93,0.7)]'
                  : 'w-2 bg-court-border hover:bg-court-gold/40'
              }`}
              aria-label={`Jump to ${c.title}`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="p-3 rounded-full bg-court-card/90 border border-court-gold/40 hover:border-court-gold text-court-gold hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-md"
          aria-label="Next Certificate"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
