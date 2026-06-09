import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Start' },
  { to: '/work', label: 'Projekte' },
  { to: '/process', label: 'Prozess' },
  { to: '/about', label: 'Über mich' },
  { to: '/contact', label: 'Kontakt' },
]

export default function Nav() {
  const location = useLocation()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null)
  const [hoverRect, setHoverRect] = useState<{ left: number; width: number } | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  })

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Track active pill position (using offset to ignore scale transform)
  useEffect(() => {
    const updateActive = () => {
      const activeEl = linkRefs.current.find((_, i) => {
        const to = links[i].to
        if (to === '/') return location.pathname === '/'
        return location.pathname.startsWith(to)
      })
      if (activeEl && navRef.current) {
        setActiveRect({ left: activeEl.offsetLeft, width: activeEl.offsetWidth })
      } else {
        setActiveRect(null)
      }
    }
    const id = setTimeout(updateActive, 50)
    return () => clearTimeout(id)
  }, [location.pathname, scrolled])

  const handleMouseEnter = (i: number) => {
    setHoveredIdx(i)
    const el = linkRefs.current[i]
    if (el && navRef.current) {
      setHoverRect({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }

  const handleMouseLeave = () => {
    setHoveredIdx(null)
    setHoverRect(null)
  }

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <div className={`nav-pill-outer ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-pill" ref={navRef} onMouseLeave={handleMouseLeave}>
        {/* Hover background */}
        <AnimatePresence>
          {hoverRect && hoveredIdx !== null && (
            <motion.div
              className="nav-hover-bg"
              key="hover"
              initial={{ opacity: 0, left: hoverRect.left, width: hoverRect.width }}
              animate={{ opacity: 1, left: hoverRect.left, width: hoverRect.width }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>

        {/* Active pill */}
        {activeRect && (
          <motion.div
            className="nav-active-pill"
            animate={{ left: activeRect.left, width: activeRect.width }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          />
        )}

        {links.map((l, i) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            ref={el => { linkRefs.current[i] = el }}
            className={({ isActive }) => `nav-pill-link${isActive ? ' active' : ''}`}
            onMouseEnter={() => handleMouseEnter(i)}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        )}
      </button>
    </div>
  )
}
