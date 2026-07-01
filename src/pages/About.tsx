import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const VALUES = [
  { n: '01', t: 'Ästhetik', d: 'Premium-Design, das sofort überzeugt und Ihre Marke stärkt.' },
  { n: '02', t: 'Perfektionismus', d: 'Keine halben Sachen. Jedes Detail und jede Animation sitzt exakt.' },
  { n: '03', t: 'Verkaufspsychologie', d: 'Strategisch aufgebaut, um aus Besuchern echte Kunden zu machen.' },
  { n: '04', t: 'Handhabung', d: 'Eine mühelose und logische Nutzerführung für jeden.' },
  { n: '05', t: 'Leistung', d: 'Extrem schnelle Ladezeiten und sauberer Code auf allen Geräten.' },
  { n: '06', t: 'Vertrauen', d: 'Ein professioneller Auftritt, der ab der ersten Sekunde Sicherheit vermittelt.' }
]

export default function About() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// über mich</div>
          <h1>Ich.</h1>
          <p>Als unabhängiges Studio entwickle ich Webseiten, die herausragend aussehen, schnell laden und messbar verkaufen. Keine Agentur-Umwege, sondern direkte Zusammenarbeit und kompromisslose Qualität für Ihr Projekt.</p>
        </motion.div>
      </div>

      {/* Manifesto strip */}
      <div style={{ background: 'var(--section-contrast-bg)', color: 'var(--ink)', padding: '80px 48px', overflow: 'hidden', position: 'relative' }}>
        <Reveal>
          <p style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-.03em', maxWidth: 900 }}>
            Ihre Website ist Ihr <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>digitaler Status</em>. Und Sie haben nur den <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>besten verdient</em>.
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

