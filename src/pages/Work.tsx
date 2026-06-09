import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const ALL_PROJECTS = [
  { num: '001', title: 'Hyperion Platform', cat: 'Web / Markenaufbau', year: '2025', cls: 'wc1', desc: 'B2B SaaS-Interface mit vollständiger Designsprache und Animationssystem.' },
  { num: '002', title: 'Meridian Studio', cat: 'Motion / Identität', year: '2025', cls: 'wc2', desc: 'Komplettes Rebranding inkl. Motion-Guidelines und Logoanimation.' },
  { num: '003', title: 'Vertex Labs', cat: 'Produkt / UX', year: '2024', cls: 'wc3', desc: 'End-to-End Produktdesign für ein KI-gestütztes Analytics-Tool.' },
  { num: '004', title: 'Neon Collective', cat: 'Kampagne / Digital', year: '2024', cls: 'wc4', desc: 'Interaktive Kampagnenseite mit WebGL-Hintergrund und Scroll-Storytelling.' },
  { num: '005', title: 'Forma Studio', cat: 'Web / Motion', year: '2024', cls: 'wc5', desc: 'Portfolio-Site für ein Architekturbüro — minimalistisch, typografisch.' },
  { num: '006', title: 'Pulse Agency', cat: 'Marke / Strategie', year: '2023', cls: 'wc6', desc: 'Markenaufbau von Grund auf: Logo, Sprache, Website, Social Templates.' },
  { num: '007', title: 'Orbit Finance', cat: 'Web App / UX', year: '2023', cls: 'wc1', desc: 'Dashboard-Design für ein Fintech-Startup mit Dark-Mode-System.' },
  { num: '008', title: 'Nova Creative', cat: 'Identität / Print', year: '2023', cls: 'wc5', desc: 'Visuelle Identität für eine kreative Agentur, inkl. Printmaterialien.' },
  { num: '009', title: 'Flux Platform', cat: 'Web / Produkt', year: '2022', cls: 'wc3', desc: 'Skalierbares Designsystem für eine Multi-Tenant SaaS-Plattform.' },
]

export default function Work() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// alle projekte</div>
          <h1>Ausgewählte<br />Arbeiten_</h1>
          <p>Neun Projekte. Hunderte Entscheidungen. Ein Anspruch: besser als gestern.</p>
        </motion.div>
      </div>

      <section className="work-section" style={{ paddingTop: 80 }}>
        <div className="work-grid">
          {ALL_PROJECTS.map((p, i) => (
            <Reveal key={p.num} delay={i * 60}>
              <div className="work-item" style={{ marginTop: i % 2 === 1 ? 40 : 0 }}>
                <div className={`work-bg ${p.cls}`}>
                  <div className="work-shape" style={{ width: 200, height: 200, background: '#fff', top: -60, right: -60 }} />
                  <div className="work-shape" style={{ width: 80, height: 80, background: '#000', bottom: 30, left: 30 }} />
                </div>
                <div className="work-num">{p.num}</div>
                <div className="work-link">
                  <svg viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
                <div className="work-info">
                  <div className="work-title">{p.title}</div>
                  <div className="work-cat">{p.cat} — {p.year}</div>
                  <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.4)', marginTop: 8, lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
