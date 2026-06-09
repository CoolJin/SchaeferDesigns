import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface GetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

export function GetStartedButton({ label = 'Get Started', style, className = '', ...props }: GetStartedButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      className={`cursor-target ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        height: 48,
        padding: '0 16px',
        overflow: 'hidden',
        background: 'var(--ink)',
        color: 'var(--paper)',
        border: 'none',
        borderRadius: 8,
        cursor: 'none',
        fontSize: '0.95rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        display: 'inline-flex',
        alignItems: 'center',
        ...style,
      }}
      {...props}
    >
      {/* Label — fades out on hover */}
      <span style={{
        marginRight: 36,
        opacity: hovered ? 0 : 1,
        transition: 'opacity 0.4s ease',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>

      {/* Sliding chevron block */}
      <span style={{
        position: 'absolute',
        top: 4,
        right: 4,
        bottom: 4,
        width: hovered ? 'calc(100% - 8px)' : '25%',
        borderRadius: 5,
        background: 'rgba(var(--paper-rgb), 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1,
      }}>
        <ChevronRight size={16} strokeWidth={2} />
      </span>
    </button>
  )
}
