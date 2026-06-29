import React from 'react';

interface SimulatedCursorProps {
  x: number;
  y: number;
  opacity?: number;
}

export default function SimulatedCursor({ x, y, opacity = 1 }: SimulatedCursorProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 8,
        top: y - 8,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.9)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        opacity: opacity,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
