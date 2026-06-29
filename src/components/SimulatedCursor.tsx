import React from 'react';

interface SimulatedCursorProps {
  cursorRef: React.RefObject<HTMLDivElement | null>;
}

export default function SimulatedCursor({ cursorRef }: SimulatedCursorProps) {
  return (
    <div
      ref={cursorRef}
      style={{
        position: 'absolute',
        left: -8,
        top: -8,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.4)',
        border: '2px solid rgba(255, 255, 255, 0.9)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform'
      }}
    />
  );
}
