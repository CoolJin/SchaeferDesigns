import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const STEPS = [
  {
    n: '01', t: 'Entdeckung & Kontakt', d: 'Entweder kommst du mit einer Vision auf mich zu, oder ich sehe das Potenzial deiner aktuellen Seite und melde mich proaktiv. Der erste Schritt ist immer eine ehrliche und transparente Einschätzung.',
    sub: ['Vision', 'Potenzialanalyse', 'Ehrliche Beratung'],
  },
  {
    n: '02', t: 'Das Konzept (oder die Demo)', d: 'Wenn du eine neue Seite brauchst, besprechen wir deine Ziele im Detail. Oft baue ich sogar schon vorab eine erste Demo aus deinen bestehenden Inhalten, damit du sofort siehst, was möglich ist.',
    sub: ['Zieldefinition', 'Live-Prototyp', 'Kein Risiko'],
  },
  {
    n: '03', t: 'Feinschliff & Angebot', d: 'Wir gehen das Konzept gemeinsam durch. Wir passen Texte, Farben und Buttons an, bis alles zu 100% sitzt. Dazu gibt es ein glasklares Angebot ohne versteckte Kosten.',
    sub: ['Iteration', 'Transparenz', 'Detailarbeit'],
  },
  {
    n: '04', t: 'Entwicklung & Launch', d: 'Ich baue deine Seite mit modernster KI-Technologie und blitzschnellem Code. Alles wird strikt Mobile-First entwickelt, damit es auf dem Smartphone genauso beeindruckt wie auf dem Desktop. Nach intensiven Tests geht dein neues digitales Erlebnis live.',
    sub: ['Mobile-First', 'KI-Entwicklung', 'High-Performance'],
  },
  {
    n: '05', t: 'Laufender Support', d: 'Nach dem Launch lasse ich dich nicht allein. Ich bleibe dein direkter Ansprechpartner für Fragen, kleine Anpassungen und halte deine Seite technisch auf dem neuesten Stand.',
    sub: ['Persönlicher Support', 'Updates', 'Langfristige Partnerschaft'],
  },
  {
    n: '06', t: 'Mein Qualitätsversprechen', d: 'Du bezahlst für das makellose Ergebnis, nicht für den Weg. Ich nutze KI für extreme Effizienz, aber jede Zeile Code, jeder Button, jede Datenbank-Verbindung und API wird von mir manuell auf Sicherheit, Edge-Cases und perfekte Funktionalität (inkl. Mehrsprachigkeit) geprüft. 100% Perfektion, null Kompromisse.',
    sub: ['Manuelles QA', 'Security First', 'Pixel Perfect'],
  },
]

export default function Process() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// wie ich arbeite</div>
          <h1>Der<br />Prozess.</h1>
          <p>Kein Chaos. Keine Überraschungen. Fünf klare Phasen — von der ersten Idee bis zum Go-Live.</p>
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
        <div className="process-inner process-cta-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,4rem)', fontWeight: 900, letterSpacing: '-.04em' }}>
            Bereit<br />loszulegen?
          </h2>
          <a href="/contact" className="btn" style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,.25)', color: 'var(--paper)' }}>
            <span>Kontakt aufnehmen</span>
          </a>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
