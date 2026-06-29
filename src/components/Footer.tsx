import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer" style={{ display: 'block', padding: '80px 5%', background: 'var(--paper)', color: 'var(--ink)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
        
        {/* Column 1: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>SchaeferDesigns</div>
          <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.6, margin: 0, maxWidth: 300 }}>
            Studio für digitale Erlebnisse. Konzept, Design und Entwicklung.
          </p>
          <a href="mailto:hello@schaeferdesigns.de" style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 500, display: 'inline-block', marginTop: 12 }}>
            hello@schaeferdesigns.de
          </a>
        </div>

        {/* Column 2: Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 8 }}>Sitemap</div>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Start</Link>
          <Link to="/work" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Projekte</Link>
          <Link to="/process" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Prozess</Link>
          <Link to="/about" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Über mich</Link>
          <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Kontakt</Link>
        </div>

        {/* Column 3: Rechtliches */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 8 }}>Rechtliches</div>
          <Link to="/impressum" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Impressum</Link>
          <Link to="/datenschutz" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Datenschutz</Link>
          <Link to="/agb" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>AGB</Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ maxWidth: 1400, margin: '80px auto 0', paddingTop: 30, borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: '32px', opacity: 0.5, fontSize: '0.85rem' }}>
        <span>&copy; {new Date().getFullYear()} SchaeferDesigns</span>
        <span>Alle Rechte vorbehalten</span>
      </div>
    </footer>
  )
}
