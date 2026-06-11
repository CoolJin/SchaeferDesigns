import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';
import './ElasticSlider.css';

const MAX_OVERFLOW = 50;

interface ElasticSliderProps {
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  isStepped?: boolean;
  stepSize?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export default function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <Minus size={20} className="icon" />,
  rightIcon = <Plus size={20} className="icon" />,
  onChange,
  disabled = false,
}: ElasticSliderProps) {
  return (
    <div className={`slider-container ${className} ${disabled ? 'disabled' : ''}`}>
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

interface SliderProps extends ElasticSliderProps {}

function Slider({ defaultValue = 50, startingValue = 0, maxValue = 100, isStepped, stepSize = 1, leftIcon, rightIcon, onChange, disabled }: SliderProps) {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useMotionValueEvent(clientX, 'change', (latest) => {
    if (sliderRef.current && !disabled) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue;

      if (latest < left) {
        setRegion('left');
        newValue = left - latest;
      } else if (latest > right) {
        setRegion('right');
        newValue = latest - right;
      } else {
        setRegion('middle');
        newValue = 0;
      }

      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (disabled) return;
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);

      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }

      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      if (onChange) onChange(newValue);
      clientX.jump(e.clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    if (disabled) return;
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });
  };

  const getRangePercentage = () => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;
    return ((value - startingValue) / totalRange) * 100;
  };

  return (
    <>
      <motion.div
        onHoverStart={() => !disabled && animate(scale, 1.05)}
        onHoverEnd={() => !disabled && animate(scale, 1)}
        onTouchStart={() => !disabled && animate(scale, 1.05)}
        onTouchEnd={() => !disabled && animate(scale, 1)}
        style={{
          scale,
          opacity: disabled ? 0.5 : useTransform(scale, [1, 1.05], [0.8, 1])
        }}
        className="slider-wrapper"
      >
        <motion.div
          animate={{
            scale: region === 'left' && !disabled ? [1, 1.2, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'left' && !disabled ? -overflow.get() / scale.get() : 0))
          }}
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className="slider-root"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onLostPointerCapture={handlePointerUp}
          style={{ cursor: disabled ? 'not-allowed' : 'grab' }}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (sliderRef.current && !disabled) {
                  const { width } = sliderRef.current.getBoundingClientRect();
                  return 1 + overflow.get() / width;
                }
                return 1;
              }),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const { left, width } = sliderRef.current.getBoundingClientRect();
                  return clientX.get() < left + width / 2 ? 'right' : 'left';
                }
                return 'center';
              }),
              height: useTransform(scale, [1, 1.05], [6, 12]),
              marginTop: useTransform(scale, [1, 1.05], [0, -3]),
              marginBottom: useTransform(scale, [1, 1.05], [0, -3])
            }}
            className="slider-track-wrapper"
          >
            <div className="slider-track">
              <div className="slider-range" style={{ width: `${getRangePercentage()}%` }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === 'right' && !disabled ? [1, 1.2, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'right' && !disabled ? overflow.get() / scale.get() : 0))
          }}
        >
          {rightIcon}
        </motion.div>
      </motion.div>
      <p className="value-indicator" style={{ opacity: disabled ? 0.5 : 1 }}>{value.toLocaleString()} €</p>
    </>
  );
}

function decay(value: number, max: number) {
  if (max === 0) return 0;
  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
  return sigmoid * max;
}
