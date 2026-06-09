import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export function ButtonColorful({ label = 'Explore Components', style, className = '', ...props }: ButtonColorfulProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      className={`cursor-target ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        height: 44,
        padding: '0 20px',
        overflow: 'hidden',
        background: 'var(--ink)',
        border: 'none',
        borderRadius: 6,
        cursor: 'none',
        ...style,
      }}
      {...props}
    >
      {/* Gradient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
        opacity: hovered ? 0.85 : 0.4,
        filter: 'blur(6px)',
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Label */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: '#fff',
        fontWeight: 600,
        fontSize: '0.9rem',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}>
        <span>{label}</span>
        <ArrowUpRight size={14} style={{ opacity: 0.9 }} />
      </div>
    </button>
  )
}
