import React, { useEffect, useRef, useState } from 'react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}

export default function TextPressure({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false, // Ignoriert in dieser robusten Version zur Fehlervermeidung
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 24
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      cursorRef.current.x = e.touches[0].clientX;
      cursorRef.current.y = e.touches[0].clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    // Initiale Position auf Mitte setzen
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.x = cx;
      mouseRef.current.y = cy;
      cursorRef.current.x = cx;
      cursorRef.current.y = cy;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      if (w > 0) {
        // Robustere Berechnung: Nutzt die verfügbare Breite
        const calculated = Math.max(minFontSize, w / (chars.length * 0.45));
        setFontSize(calculated);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Poll für den Fall, dass Container sich nach Mount ändert / Font lädt
    const interval = setInterval(updateSize, 250);
    setTimeout(() => clearInterval(interval), 2500);

    return () => {
      window.removeEventListener('resize', updateSize);
      clearInterval(interval);
    };
  }, [chars.length, minFontSize]);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      // Lerp mouse
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.1;

      if (titleRef.current && spansRef.current.length > 0) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2 || 300;

        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const cx = rect.x + rect.width / 2;
          const cy = rect.y + rect.height / 2;
          
          const dx = cx - mouseRef.current.x;
          const dy = cy - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const getVal = (min: number, max: number) => {
            const val = max - Math.abs((max * dist) / maxDist);
            return Math.max(min, val + min);
          };

          const wdth = width ? Math.floor(getVal(5, 200)) : 100;
          const wght = weight ? Math.floor(getVal(100, 900)) : 400;
          const ital = italic ? getVal(0, 1).toFixed(2) : '0';
          const alp = alpha ? getVal(0, 1).toFixed(2) : '1';

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
          if (alpha) {
            span.style.opacity = alp;
          }
        });
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [width, weight, italic, alpha]);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative', overflow: 'visible' }}>
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}') format('woff2');
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
        }
      `}</style>
      <h1
        ref={titleRef}
        className={className}
        style={{
          fontFamily,
          fontSize,
          margin: 0,
          display: flex ? 'flex' : 'block',
          justifyContent: 'space-between',
          textTransform: 'uppercase',
          textAlign: 'center',
          color: stroke ? 'transparent' : textColor,
          WebkitTextStroke: stroke ? `2px ${strokeColor}` : 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 0.9,
          padding: '10px 0',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
