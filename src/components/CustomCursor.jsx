import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let isVisible = false;
    let isPointer = false;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (glowRef.current) glowRef.current.style.opacity = '0.22';
        if (ringRef.current) ringRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }

      const target = e.target;
      const clickable = target && target.closest('button, a, input, textarea, select, [role="button"], .clickable');
      const nextIsPointer = !!clickable;

      if (nextIsPointer !== isPointer) {
        isPointer = nextIsPointer;
        if (ringRef.current) {
          if (isPointer) {
            ringRef.current.style.width = '48px';
            ringRef.current.style.height = '48px';
            ringRef.current.style.backgroundColor = 'rgba(200, 164, 93, 0.16)';
            ringRef.current.style.borderColor = '#E5C483';
          } else {
            ringRef.current.style.width = '32px';
            ringRef.current.style.height = '32px';
            ringRef.current.style.backgroundColor = 'transparent';
            ringRef.current.style.borderColor = 'rgba(200, 164, 93, 0.55)';
          }
        }
        if (dotRef.current) {
          dotRef.current.style.width = isPointer ? '8px' : '5px';
          dotRef.current.style.height = isPointer ? '8px' : '5px';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const renderLoop = () => {
      // Direct hardware-accelerated transform interpolation (0 React re-renders)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Ambient background glow spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-30 w-[420px] h-[420px] rounded-full opacity-0 blur-[90px] mix-blend-screen transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, #C8A45D 0%, rgba(37, 78, 153, 0.4) 60%, transparent 100%)',
        }}
      />

      {/* Trailing golden ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-court-gold/60 w-[32px] h-[32px] opacity-0 transition-[width,height,background-color,border-color] duration-150 will-change-transform"
      />

      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-court-gold w-[5px] h-[5px] opacity-0 shadow-[0_0_10px_#C8A45D] will-change-transform"
      />
    </>
  );
}
