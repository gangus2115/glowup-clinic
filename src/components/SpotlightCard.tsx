'use client';

import { useRef, useState, type ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export default function SpotlightCard({
  children,
  className = '',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y, opacity: 1 });
  }

  function handleMouseLeave() {
    setSpot(s => ({ ...s, opacity: 0 }));
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bento-card relative overflow-hidden ${className}`}
    >
      {/* Spotlight layer — sits above background, below content */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          opacity: spot.opacity,
          transition: 'opacity 0.4s ease',
          background: `radial-gradient(
            280px circle at ${spot.x}% ${spot.y}%,
            rgba(212, 175, 55, 0.09) 0%,
            rgba(192, 192, 192, 0.05) 40%,
            transparent 70%
          )`,
          zIndex: 1,
        }}
      />
      {/* Content sits above the spotlight */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
