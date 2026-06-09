import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const VALUES = [
  { n: '01', t: 'Klarheit', d: 'Gutes Design kommuniziert. Kein unnötiger Lärm, keine leeren Gesten. Jede Entscheidung hat einen Grund.' },
  { n: '02', t: 'Präzision', d: 'Ich liebe Details. Die richtigen Abstände, die perfekte Kurve, das exakte Timing einer Animation.' },
  { n: '03', t: 'Ehrlichkeit', d: 'Ich sage was ich denke — auch wenn es unbequem ist. Starke digitale Produkte brauchen Vertrauen und klare Kante.' },
  { n: '04', t: 'Neugier', d: 'Ich lerne ständig dazu. Neue Technologien, Designtrends, Industrieentwicklungen — um für dich immer ganz vorne zu sein.' },
  { n: '05', t: 'Perfektionismus', d: 'Du zahlst für das Ergebnis, nicht den Weg. Ich nutze KI, um rasant zu entwickeln – aber ich teste jeden Button, jedes Pixel und jede API-Schnittstelle extrem penibel auf alle Edge-Cases und Sicherheit.' },
  { n: '06', t: 'Wirkung', d: 'Am Ende zählt nicht nur, wie es aussieht, sondern was es bewirkt. Schönheit und Funktion kompromisslos vereint.' },
]

const EXPERTISE = [
  { title: 'UI/UX Design', tag: 'Interface', desc: 'Intuitive, nutzerzentrierte digitale Erlebnisse, die begeistern.' },
  { title: 'Web Development', tag: 'Code', desc: 'High-End Frontend: React, Vite, Framer Motion & absolut flüssige 60fps.' },
  { title: 'Creative Direction', tag: 'Vision', desc: 'Von der ersten Skizze bis zur finalen Brand-Identity.' },
  { title: 'Motion Design', tag: 'Interaktion', desc: 'Mikro-Interaktionen und fließende Übergänge, die lebendig wirken.' },
]

export default function About() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// über mich</div>
          <h1>Independent<br />Studio.</h1>
          <p>Ein Solo-Studio mit kompromisslosem Anspruch. Ich arbeite komplett allein und nutze modernste KI, um Code zu schreiben. Ich starte frisch – keine alten Projekte, keine Legacy-Systeme. Nur purer Fokus auf digitale Exzellenz und echte Ergebnisse für dein Vorhaben.</p>
        </motion.div>
      </div>

      {/* Manifesto strip */}
      <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '80px 48px', overflow: 'hidden', position: 'relative' }}>
        <Reveal>
          <p style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-.03em', maxWidth: 900 }}>
            Ich glaube daran, dass <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>Design denkt</em>, Code <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>fühlt</em> und jedes Projekt die Chance ist, etwas zu bauen, das wirklich <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>bleibt</em>.
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

      {/* Expertise */}
      <section style={{ padding: '0 48px 120px', maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <div className="section-label">// meine disziplinen</div>
          <h2 className="section-heading">Fokus &<br />Expertise.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, marginTop: 56, background: 'var(--border)' }}>
            {EXPERTISE.map((e, i) => (
              <div key={e.title} style={{ background: 'var(--paper)', padding: '48px 32px', transition: 'background .3s, color .3s' }}
                onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.background = 'var(--ink)'; (ev.currentTarget as HTMLElement).style.color = 'var(--paper)' }}
                onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.background = 'var(--paper)'; (ev.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
              >
                <div style={{ width: 60, height: 60, background: `hsl(${i * 60 + 200},60%,50%)`, borderRadius: '50%', marginBottom: 24, opacity: .7 }} />
                <div style={{ fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-.02em' }}>{e.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--accent)', margin: '6px 0 10px' }}>{e.tag}</div>
                <div style={{ fontSize: '.85rem', opacity: .5, lineHeight: 1.6 }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Footer />
    </motion.div>
  )
}

