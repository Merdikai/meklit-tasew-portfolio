import React, { useEffect, useState, useRef } from 'react';

/**
 * AmbientScalesWatermark
 * Persistent, stately background watermark of the Scales of Justice / Golden Pedestal
 * across all portfolio sections (About, Jurisprudence, Judicial Record, Certificates, Contact).
 * 
 * Features:
 * - Dynamic opacity calibration: Ultra-dimmed (10%) on reading-heavy sections, gently warming (18-20%) on visual sections.
 * - Fades away smoothly when scrolled to Hero (which has its own prominent right-shifted pedestal).
 * - Single GPU-accelerated video/poster layer with zero lag and zero multiple-stream overhead.
 */
export default function AmbientScalesWatermark() {
  const [opacity, setOpacity] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const calculateWatermarkOpacity = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = docHeight > 0 ? scrollY / docHeight : 0;

      // 1. In Hero section (< 350px scroll): 0 opacity (Hero has its own dedicated pedestal)
      if (scrollY < 320) {
        setOpacity(0);
        return;
      }

      // 2. Section-by-section dynamic calibration based on scroll offset
      const jurisprudenceEl = document.getElementById('jurisprudence');
      const experienceEl = document.getElementById('experience');
      const certificatesEl = document.getElementById('certificates');
      const contactEl = document.getElementById('contact');

      const isElementInFocus = (el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3;
      };

      if (isElementInFocus(jurisprudenceEl) || isElementInFocus(experienceEl)) {
        // Text-heavy academic & judicial record sections: very faint so text is 100% crisp
        setOpacity(0.11);
      } else if (isElementInFocus(certificatesEl) || isElementInFocus(contactEl)) {
        // Visual accreditation & contact sections: slightly more golden presence
        setOpacity(0.18);
      } else {
        // Default stately presence for About, Skills, References
        setOpacity(0.14);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateWatermarkOpacity();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateWatermarkOpacity();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center transition-opacity duration-700 ease-in-out"
      style={{ opacity }}
    >
      {/* Soft Ambient Golden Halo */}
      <div className="absolute w-[680px] lg:w-[880px] h-[680px] lg:h-[880px] rounded-full bg-court-gold/10 blur-[160px] pointer-events-none -translate-y-6" />

      {/* Atmospheric Scales of Justice Watermark */}
      <div className="relative w-[500px] sm:w-[620px] lg:w-[760px] aspect-square flex items-center justify-center select-none mix-blend-screen">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/golden_pedestal_alpha_poster.png"
          className="w-full h-full object-contain pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(circle 46% at 50% 50%, black 50%, transparent 92%)',
            maskImage: 'radial-gradient(circle 46% at 50% 50%, black 50%, transparent 92%)',
            filter: 'brightness(0.92) contrast(1.05)',
          }}
        >
          <source src="/videos/golden_pedestal_alpha.webm" type="video/webm" />
          <source src="/videos/golden_pedestal_court_navy.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
