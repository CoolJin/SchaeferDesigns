import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// lass uns reden</div>
          <h1>Kontakt.</h1>
          <p>Ein Projekt, eine Idee, oder einfach nur Hallo — ich freue mich auf jede Nachricht.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 48px 120px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        <Reveal>
          <div>
            <div className="section-label">// direkt</div>
            <div style={{ marginTop: 20 }}>
              {[
                { label: 'E-Mail', val: 'hello@schaeferdesigns.de' },
                { label: 'Telefon', val: '+49 711 000 000' },
                { label: 'Studio', val: 'Stuttgart, Deutschland' },
              ].map(item => (
                <div key={item.label} style={{ padding: '28px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{item.val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48 }}>
              <div className="section-label">// verfügbarkeit</div>
              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,.2)', animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.8rem', letterSpacing: '.1em' }}>Offen für neue Projekte — Q3 2026</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-.05em' }}>Danke.</div>
              <p style={{ color: '#888', marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: '.85rem' }}>Ich melde mich innerhalb von 4 Stunden.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} style={{ marginTop: 0 }}>
              <div className="form-field">
                <label>Name</label>
                <input type="text" required placeholder="Max Mustermann" />
              </div>
              <div className="form-field">
                <label>E-Mail</label>
                <input type="email" required placeholder="max@beispiel.de" />
              </div>
              <div className="form-field">
                <label>Projekt</label>
                <input type="text" placeholder="Kurze Beschreibung" />
              </div>
              <div className="form-field">
                <label>Nachricht</label>
                <textarea required placeholder="Erzähl mir mehr..." rows={5} />
              </div>
              <button type="submit" className="btn" style={{ marginTop: 8 }}><span>Nachricht senden</span></button>
            </form>
          )}
        </Reveal>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2)} 50%{box-shadow:0 0 0 8px rgba(34,197,94,.05)} }
      `}</style>
      <Footer />
    </motion.div>
  )
}
