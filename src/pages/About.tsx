import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const VALUES = [
  { n: '01', t: 'Unvergleichliche Ästhetik', d: 'Design, das nicht nur funktioniert, sondern Kunden sprachlos macht. Visuelles Premium-Level.' },
  { n: '02', t: 'Extreme Geschwindigkeit', d: 'Ohne Meetings und Hierarchien setze ich Projekte in Rekordzeit um. Maximale Effizienz.' },
  { n: '03', t: 'Krankhafter Perfektionismus', d: 'Ich schleife an jeder Kurve, jedem Abstand und jeder Animation, bis es sich magisch anfühlt.' },
  { n: '04', t: 'Funktion & Magie', d: 'Eine Website muss extrem schnell konvertieren UND gleichzeitig aussehen wie digitale Kunst.' }
]

export default function About() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// über mich</div>
          <h1>Ich.</h1>
          <p>Keine Agentur. Kein Bullshit. Nur pure digitale Exzellenz und kompromissloses Premium-Design. Ich arbeite komplett alleine, extrem schnell und mit dem Anspruch, dass jedes Projekt am Ende atemberaubend ist.</p>
        </motion.div>
      </div>

      {/* Manifesto strip */}
      <div style={{ background: 'var(--section-contrast-bg)', color: 'var(--ink)', padding: '80px 48px', overflow: 'hidden', position: 'relative' }}>
        <Reveal>
          <p style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-.03em', maxWidth: 900 }}>
            Design ist keine Dekoration. Code ist kein Fließband. Eine Website ist ein <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Statement</em>.
          </p>
        </Reveal>
        <div className="bg-word" style={{ fontSize: '28vw', bottom: -80 }}>ME</div>
      </div>

      {/* Values */}
      <section style={{ padding: '100px 48px', maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <div className="section-label">// meine werte</div>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>Woran<br />ich glaube.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="about-values">
            {VALUES.map(v => (
              <div className="value-item" key={v.n}>
                <div className="value-num">{v.n} —</div>
                <div className="value-title">{v.t}</div>
                <div className="value-text">{v.d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Footer />
    </motion.div>
  )
}

