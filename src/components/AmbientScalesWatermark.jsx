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

      // 1. In Hero section (< 550px scroll): 0 opacity (Hero has its own dedicated pedestal)
      if (scrollY < 450) {
        setOpacity(0);
        return;
      }

      // 2. Section-by-section dynamic calibration based on scroll offset
      // Identify which section is currently near center of viewport
      const jurisprudenceEl = document.getElementById('jurisprudence');
      const experienceEl = document.getElementById('experience');
      const certificatesEl = document.getElementById('certificates');
      const contactEl = document.getElementById('contact');

      const isElementInFocus = (el, buffer = 300) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4;
      };

      if (isElementInFocus(jurisprudenceEl) || isElementInFocus(experienceEl)) {
        // Text-heavy academic & judicial record sections: very faint so text is 100% crisp
        setOpacity(0.12);
      } else if (isElementInFocus(certificatesEl) || isElementInFocus(contactEl)) {
        // Visual accreditation & contact sections: slightly more golden presence
        setOpacity(0.20);
      } else {
        // Default stately presence for About, Skills, References
        setOpacity(0.15);
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
      <div className="relative w-[500px] sm:w-[620px] lg:w-[760px] aspect-square flex items-center justify-center select-none mix-blend-screen filter drop-shadow-[0_0_50px_rgba(200,164,93,0.35)]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/golden_pedestal_poster.png"
          className="w-full h-full object-contain pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 45%, transparent 88%)',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 45%, transparent 88%)',
            filter: 'brightness(1.04) contrast(1.12)',
          }}
        >
          <source src="/videos/golden_pedestal_alpha.webm" type="video/webm" />
          <source src="/videos/golden_pedestal_seamless.webm" type="video/webm" />
          <source src="/videos/golden_pedestal_seamless.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
