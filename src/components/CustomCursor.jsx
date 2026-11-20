import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop / pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      const clickable = target.closest('button, a, input, textarea, select, [role="button"], .clickable');
      setIsPointer(!!clickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Smooth lagging trailing ring
  useEffect(() => {
    let animationFrame;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrame = requestAnimationFrame(updateTrailing);
    };
    animationFrame = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ambient background glow spotlight */}
      <div
        className="pointer-events-none fixed z-30 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-20 blur-[90px] mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: 'radial-gradient(circle, #C8A45D 0%, rgba(37, 78, 153, 0.4) 60%, transparent 100%)',
        }}
      />

      {/* Trailing golden ring */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-court-gold/60 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-200"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          backgroundColor: isPointer ? 'rgba(200, 164, 93, 0.15)' : 'transparent',
          borderColor: isPointer ? '#E5C483' : 'rgba(200, 164, 93, 0.5)',
        }}
      />

      {/* Center sharp dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full bg-court-gold -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#C8A45D]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '8px' : '5px',
          height: isPointer ? '8px' : '5px',
        }}
      />
    </>
  );
}
