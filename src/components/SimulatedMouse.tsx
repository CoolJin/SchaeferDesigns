import React, { useEffect, useRef, useState } from 'react';

const CursorSVG = () => (
  <svg 
    width="24" height="30" viewBox="0 0 24 30" 
    fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{
      filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))',
    }}
  >
    <path 
      d="M1 1L8.5 28L12.5 17.5L23 13.5L1 1Z" 
      fill="black" 
      stroke="white" 
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SimulatedMouse({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastHoveredElement = useRef<Element | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current || !cursorRef.current) return;

    let rafId: number;
    let time = 0;

    const animate = () => {
      time += 0.015;
      
      const rect = containerRef.current!.getBoundingClientRect();
      
      // Moving in a smooth Lissajous curve (figure 8 / sweep pattern)
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      
      const x = cx + Math.sin(time) * (rect.width * 0.45);
      const y = cy + Math.sin(time * 1.5) * (rect.height * 0.45);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      const clientX = rect.left + x;
      const clientY = rect.top + y;

      if (cursorRef.current) {
        cursorRef.current.style.pointerEvents = 'none';
      }

      const el = document.elementFromPoint(clientX, clientY);
      
      // Handle enter/leave
      if (el !== lastHoveredElement.current) {
        if (lastHoveredElement.current) {
          lastHoveredElement.current.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, cancelable: true, clientX, clientY }));
          lastHoveredElement.current.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, cancelable: true, clientX, clientY }));
        }
        if (el) {
          el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, cancelable: true, clientX, clientY }));
          el.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, cancelable: true, clientX, clientY }));
        }
        lastHoveredElement.current = el;
      }
      
      if (el) {
        const pointerEvent = new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX,
          clientY,
          pointerId: 999,
          pointerType: 'mouse'
        });
        const mouseEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX,
          clientY
        });
        
        el.dispatchEvent(pointerEvent);
        el.dispatchEvent(mouseEvent);
      }
      
      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, containerRef]);

  if (!isMobile) return null;

  return (
    <div 
      ref={cursorRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        pointerEvents: 'none', 
        zIndex: 9999,
        willChange: 'transform'
      }}
    >
      <CursorSVG />
    </div>
  );
}
