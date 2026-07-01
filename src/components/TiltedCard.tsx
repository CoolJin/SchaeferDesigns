import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TiltedCard.css';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  imageHeight?: string | number;
  imageWidth?: string | number;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  imageOverlay?: React.ReactNode;
  transparent?: boolean;
  imgStyle?: React.CSSProperties;
  disableCursorTarget?: boolean;
}

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  imageOverlay = null,
  transparent = false,
  imgStyle = {},
  disableCursorTarget = false
}: TiltedCardProps) {
  const ref = useRef<HTMLFigureElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    // Removed mobile loop
  }, []);

  function handleMouse(e: React.PointerEvent<HTMLElement>) {
    if (!ref.current || e.pointerType === 'touch') return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType === 'touch') return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType === 'touch') return;
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${disableCursorTarget ? '' : 'cursor-target'}`}
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onPointerMove={handleMouse}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
          boxShadow: transparent ? 'none' : undefined,
          borderRadius: transparent ? 0 : undefined,
          background: transparent ? 'transparent' : undefined
        }}
      >
        <div style={{ width: imageWidth, height: imageHeight, borderRadius: transparent ? 0 : 15, overflow: 'hidden', position: 'absolute', top: 0, left: 0 }}>
          <motion.img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: transparent ? 'contain' : 'cover',
              filter: displayOverlayContent ? 'blur(4px)' : 'none',
              transform: displayOverlayContent ? 'scale(1.05)' : 'none',
              ...imgStyle
            }}
          />
          {imageOverlay}
        </div>

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
