import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const STEPS = [
  {
    n: '01', t: 'Kontakt', d: 'Sie kommen mit Ihrer Idee auf mich zu, oder ich sehe das Potenzial Ihrer aktuellen Seite und melde mich proaktiv.',
    sub: ['Vision', 'Potenzialanalyse', 'Erstes Feedback'],
  },
  {
    n: '02', t: 'Das Konzept / Die Demo', d: 'Brauchen Sie eine neue Seite, besprechen wir Ihre Ideen im Detail. Habe ich bereits eine neue Demo Ihrer aktuellen Seite gemacht, stelle ich Ihnen diese vor und wir passen sie gemeinsam an.',
    sub: ['Zieldefinition', 'Live-Prototyp', 'Besprechung'],
  },
  {
    n: '03', t: 'Angebot', d: 'Auf Basis unserer Besprechung erhalten Sie von mir ein glasklares Angebot sowie die Anzahlungsrechnung ohne versteckte Kosten.',
    sub: ['Transparenz', 'Fairer Preis', 'Klarheit'],
  },
  {
    n: '04', t: 'Setup & Zusammenarbeit', d: 'Nach Vertragsannahme und Eingang der Zahlung arbeiten wir gemeinsam an Ihrem Projekt. Ich entwickle Ihre Seite und Sie liefern mir die benötigten Materialien und Zugangsdaten. Mit gezielter Zusammenarbeit erreichen wir Ihr Ziel schneller und besser.',
    sub: ['Struktur', 'Teamwork', 'Effizienz'],
  },
  {
    n: '05', t: 'Feinschliff & Launch', d: 'In zwei Feedbackschleifen passen wir die Details an, bis alles perfekt funktioniert und exakt Ihren Vorstellungen entspricht. Danach ist Ihre neue Webseite bereit für die Öffentlichkeit.',
    sub: ['Feedback', 'Detailarbeit', 'Go-Live'],
  },
]

export default function Process() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// wie ich arbeite</div>
          <h1>Der<br />Prozess</h1>
          <p>Kein Chaos. Keine Überraschungen. Fünf Schritte, von der ersten Idee bis zur fertigen Seite.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px 120px' }}>
        <div className="process-list">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="process-item">
                <div className="process-item-num">{s.n} —</div>
                <div>
                  <div className="process-item-title">{s.t}</div>
                  <div className="process-item-text">{s.d}</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
                    {s.sub.map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.15em', textTransform: 'uppercase', padding: '6px 14px', border: '1px solid var(--border)', color: 'var(--muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Dark CTA */}
      <section className="process-section cta-section">
        <div className="process-inner process-cta-inner" style={{ display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,4rem)', fontWeight: 900, letterSpacing: '-.04em' }}>
            Bereit<br />loszulegen?
          </h2>
          <Link to="/contact" className="btn" style={{ background: 'transparent', border: '1.5px solid rgba(var(--ink-rgb), 0.25)', color: 'var(--ink)' }}>
            <span>Kontakt aufnehmen</span>
          </Link>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
