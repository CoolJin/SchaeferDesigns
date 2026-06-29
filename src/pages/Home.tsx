import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import TextPressure from '../components/TextPressure'
import UIShowcase from '../components/UIShowcase'
import MagnetLines from '../components/MagnetLines'
import logoBreit from '../assets/LogoBreit.svg'
import LineWaves from '../components/LineWaves'
import GlassSurface from '../components/GlassSurface'
import TextMarquee from '../components/TextMarquee'
import TiltedCard from '../components/TiltedCard'
import { useTheme } from '../hooks/useTheme'

const MARQUEE_ITEMS = ['Konzept','Design','Entwicklung','Strategie','Motion','Branding','UX','Identity']

/*
const PROJECTS = [
  { num: '001', title: 'Hyperion Platform', cat: 'Web / Branding', cls: 'wc1' },
  { num: '002', title: 'Meridian Studio', cat: 'Motion / Identität', cls: 'wc2' },
  { num: '003', title: 'Vertex Labs', cat: 'Produkt / UX', cls: 'wc3' },
  { num: '004', title: 'Neon Collective', cat: 'Kampagne / Digital', cls: 'wc4' },
  { num: '005', title: 'Forma Studio', cat: 'Web / Motion', cls: 'wc5' },
  { num: '006', title: 'Pulse Agency', cat: 'Marke / Strategie', cls: 'wc6' },
]
*/

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const theme = useTheme()
  const isDark = theme === 'dark'

  // Fade out the scroll indicator on scroll
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY
      if (scrollRef.current) {
        scrollRef.current.style.opacity = String(0.4 - s / 200)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Pause LineWaves when hero is out of view
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      setHeroVisible(entry.isIntersecting)
    }, { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* ── HERO SECTION ── */}
      <section className="hero-section" ref={heroRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {heroVisible && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.5 }}>
            <LineWaves 
              speed={0.15}
              innerLineCount={32}
              outerLineCount={36}
              warpIntensity={1.2}
              rotation={-25}
              edgeFadeWidth={0.2}
              colorCycleSpeed={0.5}
              brightness={isDark ? 0.3 : 0.5}
              color1={isDark ? "#ffffff" : "#000000"}
              color2={isDark ? "#eeeeee" : "#111111"}
              color3={isDark ? "#050505" : "#a0a0a0"}
              enableMouseInteraction={true}
              mouseInfluence={2.5}
            />
          </div>
        )}
        <style>{`
          .scroll-line-anim {
            width: 2px;
            height: 60px;
            background: ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
            margin: 10px auto 0;
            animation: scroll-line-keyframes 2s infinite cubic-bezier(0.65, 0, 0.35, 1);
          }
          @keyframes scroll-line-keyframes {
            0% { transform: scaleY(0); transform-origin: top; }
            50% { transform: scaleY(1); transform-origin: top; }
            50.1% { transform: scaleY(1); transform-origin: bottom; }
            100% { transform: scaleY(0); transform-origin: bottom; }
          }
        `}</style>
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-12vh' }}>
          <div style={{ marginBottom: 40, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <TiltedCard
              imageSrc={logoBreit}
              altText="SchaeferDesigns Logo"
              containerWidth="clamp(300px, 75vw, 1000px)"
              containerHeight="clamp(130px, 25vw, 320px)"
              imageWidth="100%"
              imageHeight="100%"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              transparent={true}
              disableCursorTarget={true}
              imgStyle={{ filter: isDark ? 'invert(1)' : 'none', maxWidth: '90vw' }}
            />
          </div>
          <div style={{ marginBottom: 40, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ width: '100%', maxWidth: 420 }}>
              <TextPressure text="DESIGN" flex={true} alpha={false} stroke={false} width={true} weight={true} italic={true} textColor={isDark ? '#ffffff' : '#000000'} strokeColor={isDark ? '#ff0000' : '#ff0000'} minFontSize={36} />
            </div>
            <div style={{ width: '100%', maxWidth: 630 }}>
              <TextPressure text="DAS WIRKT" flex={true} alpha={false} stroke={false} width={true} weight={true} italic={true} textColor={isDark ? '#ffffff' : '#000000'} strokeColor={isDark ? '#ff0000' : '#ff0000'} minFontSize={36} />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 60 }}>
            <div className="cursor-target" style={{ width: 180, height: 56, borderRadius: 28, overflow: 'hidden', position: 'relative' }}>
               <GlassSurface />
               <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, pointerEvents: 'none', color: isDark ? '#fff' : '#000' }}>Portfolio</div>
            </div>
            <div className="cursor-target" style={{ width: 180, height: 56, borderRadius: 28, overflow: 'hidden', position: 'relative' }}>
               <GlassSurface />
               <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10, pointerEvents: 'none', color: isDark ? '#fff' : '#000' }}>Kontakt</div>
            </div>
          </div>
        </div>
        
        <div ref={scrollRef} style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', opacity: 0.6, textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: 3, textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>Scroll</span>
          <div className="scroll-line-anim" />
        </div>
      </section>

      <TextMarquee />

      {/* ── ÜBER MICH ── */}
      <section style={{ padding: '140px 5%', maxWidth: 1400, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-start' }}>
            <div className="section-label" style={{ margin: 0 }}>// über mich</div>
            
            <div style={{ maxWidth: '850px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', lineHeight: 1.4, margin: '0 0 32px 0', fontWeight: 400, letterSpacing: '-0.02em' }}>
                <span style={{ color: isDark ? '#fff' : '#000', fontWeight: 600 }}>Ich entwickle moderne und funktionierende Webseiten,</span>{' '}
                <span style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
                  die genau auf Ihr Unternehmen zugeschnitten sind. Da mir höchste Qualität und Details wichtig sind, nehme ich mir für Ihr Projekt die Zeit, die es braucht.
                </span>
              </h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 40, height: 2, background: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }} />
                <p style={{ margin: 0, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)', fontWeight: 500 }}>
                  Mein Ziel ist erst erreicht, wenn Sie mit dem fertigen Produkt zufrieden sind.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <UIShowcase />

      {/* ── SELECTED WORK (HIDDEN FOR NOW) ── */}
      {/*
      <section className="work-section">
        <Reveal>
          <div className="section-label">// ausgewählte arbeiten</div>
          <h2 className="section-heading">Ausgewählte<br />Arbeiten_</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="work-grid">
            {PROJECTS.map(p => (
              <div className="work-item" key={p.num}>
                <div className={`work-bg ${p.cls}`}>
                  <div className="work-shape" style={{ width: 180, height: 180, background: '#fff', top: -40, right: -40 }} />
                  <div className="work-shape" style={{ width: 100, height: 100, background: '#000', bottom: 20, left: 20 }} />
                </div>
                <div className="work-num">{p.num}</div>
                <div className="work-link">
                  <svg viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </div>
                <div className="work-info">
                  <div className="work-title">{p.title}</div>
                  <div className="work-cat">{p.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <Link to="/work" className="btn btn-outline"><span>Alle Projekte ansehen</span></Link>
        </div>
      </section>
      */}

      {/* ── PROCESS TEASER ── */}
      <section className="process-section">
        <div className="process-inner">
          <Reveal>
            <h2 className="process-heading">Wie ich<br /><em>arbeite</em></h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="steps-grid">
              {[
                { n: '01 —', t: 'Kontakt', d: 'Sie melden sich, oder ich baue proaktiv eine erste Demo Ihrer neuen Seite.' },
                { n: '02 —', t: 'Konzept', d: 'Wir besprechen die Demo, passen Texte und Design an und klären alle Details.' },
                { n: '03 —', t: 'Entwickeln', d: 'Ich entwickle Ihre Seite mithilfe von KI bis Alles perfekt funktioniert.' },
                { n: '04 —', t: 'Support', d: 'Nach dem Veröffentlichen der Seite bleibe ich Ihr direkter Ansprechpartner für Fragen und Updates.' },
              ].map(s => (
                <div className="step" key={s.n}>
                  <div className="step-num">{s.n}</div>
                  <div className="step-title">{s.t}</div>
                  <div className="step-text">{s.d}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ marginTop: 60, textAlign: 'center' }}>
              <Link to="/process" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--paper)' }}>
                <span style={{ color: 'inherit' }}>Details zum Ablauf</span>
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="bg-word">WIE</div>
      </section>

      <section className="contact-section">
        <Reveal>
          <div className="section-label" style={{ textAlign: 'center' }}>// bereit?</div>
          <h2 className="contact-heading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span>Lassen Sie</span>
            <span style={{ whiteSpace: 'nowrap' }}>uns sprechen.</span>
          </h2>
          <p className="contact-sub">Gemeinsam machen wir Ihre Ideen zur Realität.</p>
          <Link to="/contact" className="btn"><span>Projekt starten</span></Link>
        </Reveal>
      </section>

      <Footer />
    </motion.div>
  )
}
