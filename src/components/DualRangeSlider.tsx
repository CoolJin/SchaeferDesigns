import React, { useState, useEffect, useRef } from 'react';
import './DualRangeSlider.css';

interface DualRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  onChange?: (minVal: number, maxVal: number) => void;
  disabled?: boolean;
}

export default function DualRangeSlider({
  min = 0,
  max = 10000,
  step = 100,
  defaultMinValue = 2000,
  defaultMaxValue = 5000,
  onChange,
  disabled = false
}: DualRangeSliderProps) {
  const [minVal, setMinVal] = useState(defaultMinValue);
  const [maxVal, setMaxVal] = useState(defaultMaxValue);
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (onChange) {
      onChange(minVal, maxVal);
    }
  }, [minVal, maxVal, onChange]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxVal - step);
    setMinVal(value);
    minValRef.current = value;
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minVal + step);
    setMaxVal(value);
    maxValRef.current = value;
  };

  return (
    <div className={`dual-slider-container ${disabled ? 'disabled' : ''}`}>
      <div className="dual-slider-labels">
        <span className="value-indicator">{minVal.toLocaleString()} €</span>
        <span className="value-indicator">{maxVal.toLocaleString()} €</span>
      </div>
      
      <div className="dual-slider-track-container">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="thumb thumb--left"
          disabled={disabled}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb thumb--right"
          disabled={disabled}
        />

        <div className="slider-track">
          <div ref={range} className="slider-range"></div>
        </div>
      </div>
    </div>
  );
}
