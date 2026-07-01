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

export default function SimulatedMouse({ containerRef, autoClick = false, invisible = false, xAmplitude = 0.35, yAmplitude = 0.35 }: { containerRef: React.RefObject<HTMLDivElement>, autoClick?: boolean, invisible?: boolean, xAmplitude?: number, yAmplitude?: number }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastHoveredElement = useRef<Element | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobileOrTouch = () => {
      if (typeof window === 'undefined') return false;
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      return window.innerWidth <= 900 || isTouch;
    };
    
    setIsMobile(checkIsMobileOrTouch());
    const onResize = () => setIsMobile(checkIsMobileOrTouch());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current || !cursorRef.current) return;

    let rafId: number;
    let time = 0;
    let lastClickTime = performance.now();
    let isClicking = false;

    const animate = () => {
      time += 0.015;
      
      const rect = containerRef.current!.getBoundingClientRect();
      
      // Moving in a smooth Lissajous curve (figure 8 / sweep pattern)
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      
      const x = cx + Math.sin(time) * (rect.width * xAmplitude);
      const y = cy + Math.sin(time * 2) * (rect.height * yAmplitude);

      const clientX = rect.left + x;
      const clientY = rect.top + y;

      if (cursorRef.current) {
        cursorRef.current.style.pointerEvents = 'none';
      }

      const el = document.elementFromPoint(clientX, clientY);
      
      // Handle enter/leave
      if (el !== lastHoveredElement.current) {
        if (lastHoveredElement.current) {
          lastHoveredElement.current.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, cancelable: true, clientX, clientY }));
          lastHoveredElement.current.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false, cancelable: true, clientX, clientY }));
          lastHoveredElement.current.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, cancelable: true, clientX, clientY }));
          lastHoveredElement.current.dispatchEvent(new PointerEvent('pointerleave', { bubbles: false, cancelable: true, clientX, clientY }));
        }
        if (el) {
          el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true, clientX, clientY }));
          el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, cancelable: true, clientX, clientY }));
          el.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, cancelable: true, clientX, clientY }));
          el.dispatchEvent(new PointerEvent('pointerenter', { bubbles: false, cancelable: true, clientX, clientY }));
        }
        lastHoveredElement.current = el;
      }
      
      let scale = 1;
      const now = performance.now();
      const timeSinceClick = now - lastClickTime;

      if (autoClick) {
        if (timeSinceClick > 2000) {
          lastClickTime = now;
          isClicking = true;
          if (lastHoveredElement.current) {
            lastHoveredElement.current.dispatchEvent(new PointerEvent('pointerdown', { 
              bubbles: true, cancelable: true, clientX, clientY, pointerId: 999, pointerType: 'mouse' 
            }));
          }
        }

        if (timeSinceClick < 150) {
          const progress = timeSinceClick / 150;
          scale = progress < 0.5 ? 1 - (progress * 2) * 0.3 : 0.7 + ((progress - 0.5) * 2) * 0.3;
        } else if (isClicking) {
          isClicking = false;
          if (lastHoveredElement.current) {
            lastHoveredElement.current.dispatchEvent(new PointerEvent('pointerup', { 
              bubbles: true, cancelable: true, clientX, clientY, pointerId: 999, pointerType: 'mouse' 
            }));
            lastHoveredElement.current.dispatchEvent(new MouseEvent('click', { 
              bubbles: true, cancelable: true, clientX, clientY 
            }));
          }
        }
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      }

      const pointerEvent = new PointerEvent('pointermove', {
        bubbles: true, cancelable: true, clientX, clientY, pointerId: 999, pointerType: 'mouse'
      });
      const mouseEvent = new MouseEvent('mousemove', {
        bubbles: true, cancelable: true, clientX, clientY
      });
      
      if (el) {
        el.dispatchEvent(pointerEvent);
        el.dispatchEvent(mouseEvent);
      }
      
      // ALWAYs dispatch to window to guarantee global listeners (like TextPressure) receive it
      // even if bubbling is stopped or elementFromPoint is acting weird on mobile Safari
      window.dispatchEvent(mouseEvent);
      
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
        willChange: 'transform',
        opacity: invisible ? 0 : 1
      }}
    >
      <CursorSVG />
    </div>
  );
}
