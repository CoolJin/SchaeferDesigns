import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import GlassSurface from './GlassSurface'
import LineWaves from './LineWaves'
import { useTheme } from '../hooks/useTheme'
import { ButtonColorful } from './ButtonColorful'
import { MagneticButton } from './MagneticButton'
import { GetStartedButton } from './GetStartedButton'
import TiltedCard from './TiltedCard'
import BorderGlow from './BorderGlow'
import ChromaGrid from './ChromaGrid'
import TextPressure from './TextPressure'
import TrueFocus from './TrueFocus'
import ScrambledText from './ScrambledText'
import RotatingText from './RotatingText'
import VariableProximity from './VariableProximity'
import Silk from './Silk'
import FloatingLines from './FloatingLines'
import PixelBlast from './PixelBlast'
import GridDistortion from './GridDistortion'
import LetterGlitch from './LetterGlitch'
import SimulatedMouse from './SimulatedMouse'

// Images
import forestDark from '../assets/forest-dark.png'
import forestBright from '../assets/forest-bright.png'
let hoverBgCounter = 0;

const HoverBackground = ({ children, hoverBg = 'transparent', simulateMouse = false }: { children: React.ReactNode, hoverBg?: string, simulateMouse?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  const ref = useRef<HTMLDivElement>(null)
  
  // Assign a unique id to each instance
  const [id] = useState(() => `hover-bg-${++hoverBgCounter}`);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const handleCloseOthers = (e: any) => {
      if (e.detail !== id) setIsHovered(false);
    };
    window.addEventListener('close-other-backgrounds', handleCloseOthers);
    return () => window.removeEventListener('close-other-backgrounds', handleCloseOthers);
  }, [id]);

  useEffect(() => {
    const handleGlobalClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsHovered(false);
      }
    };
    if (isHovered && isMobile) {
      // Small timeout to prevent immediate close on the opening click
      setTimeout(() => window.addEventListener('click', handleGlobalClick), 0);
      return () => window.removeEventListener('click', handleGlobalClick);
    }
  }, [isHovered, isMobile]);

  useEffect(() => {
    if (!isMobile) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsHovered(false)
        }
      },
      { rootMargin: '50px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isMobile])

  const handleClick = () => {
    if (!isMobile) return;
    setIsHovered(prev => {
      const next = !prev;
      if (next) window.dispatchEvent(new CustomEvent('close-other-backgrounds', { detail: id }));
      return next;
    });
  };

  return (
    <div 
      ref={ref}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, cursor: 'crosshair', zIndex: 0 }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleClick}
    >
      {isMobile && !isHovered && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5, pointerEvents: 'none' }}>
          <div style={{ padding: '8px 16px', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 100, fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            Tippe, um aufzudecken
          </div>
        </div>
      )}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: '100%', height: '100%', backgroundColor: hoverBg || 'transparent' }}
          >
            {isMobile && simulateMouse && <SimulatedMouse containerRef={ref} />}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function UIShowcase() {
  const [buttonsHovered, setButtonsHovered] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  
  const ref = useRef<HTMLDivElement>(null)
  const proximityRef = useRef<HTMLDivElement>(null)
  const kartenRef = useRef<HTMLDivElement>(null)
  const typografieRef = useRef<HTMLDivElement>(null)
  
  const borderGlowRef = useRef<HTMLDivElement>(null)
  const tiltedCardRef = useRef<HTMLDivElement>(null)
  const chromaGridRef = useRef<HTMLDivElement>(null)
  
  const trueFocusRef = useRef<HTMLDivElement>(null)
  const textPressureRef = useRef<HTMLDivElement>(null)
  const scrambledTextRef = useRef<HTMLDivElement>(null)
  const rotatingTextRef = useRef<HTMLDivElement>(null)
  
  const theme = useTheme()
  const isDark = theme === 'dark'
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isMobile) setButtonsHovered(isInView)
  }, [isMobile, isInView])
  
  const forestImg = isDark ? forestDark : forestBright

  // Unmount glass when scrolled out of view; also used for idle-fps gating
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '120px 0px' } // small buffer so it's ready before fully visible
    )
    observer.observe(el)
    
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 5%', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 40 }}>
        <Reveal>
          <div className="section-label">// Design & Code Möglichkeiten</div>
          <h2 className="section-heading" style={{ marginBottom: 20 }}>
            Endlose<br />
            Möglichkeiten
          </h2>
          <p style={{ opacity: 0.6, maxWidth: 600, fontSize: '1.1rem', margin: 0 }}>
            Eine Auswahl an UI-Komponenten, Interaktionen und Effekten, welche zeigen, was im modernen Web machbar ist.
          </p>
        </Reveal>
        
        <Reveal delay={100}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 0.6, maxWidth: 500, paddingBottom: 6 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Die Möglichkeiten sind nicht auf die in der Galerie dargestellten Komponenten begrenzt. Wir konzipieren und entwickeln gerne maßgeschneiderte, interaktive Elemente exklusiv für Ihr Projekt.
            </p>
          </div>
        </Reveal>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        
        {/* Buttons */}
        <Reveal delay={100}>
          <div 
            ref={sectionRef}
            style={{ position: 'relative', padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320, overflow: 'hidden' }}
            onMouseEnter={() => setButtonsHovered(true)}
            onMouseLeave={() => setButtonsHovered(false)}
          >
            {/* Background for Glass Refraction — only rendered when in view */}
            {isInView && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: buttonsHovered ? (isDark ? 0.7 : 0.4) : 0, transition: 'opacity 0.5s ease', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, transform: 'scale(1.5)', transformOrigin: 'center center' }}>
                  <LineWaves
                  pause={!buttonsHovered}
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
                  enableMouseInteraction={!isMobile}
                  mouseInfluence={2.5}
                  />
                </div>
              </div>
            )}

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 40 }}>Buttons & Actions</h3>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <button className="btn cursor-target"><span>Primary Button</span></button>
                <button className="btn btn-outline cursor-target"><span>Outline Button</span></button>

                {/*
                  forceMode switches between 'high' (SVG backdrop-filter, 60 fps compositing) on hover
                  and 'low' (pure CSS blur, ~0 GPU cost on static background) when idle.
                  The SVG element stays mounted always so refs never break — only the CSS class changes.
                  When not in view at all, the whole block is unmounted via isInView above.
                */}
                {isInView && (
                  <GlassSurface
                    className="cursor-target"
                    forceMode={buttonsHovered ? 'high' : 'low'}
                    width={220} height={60} borderRadius={100}
                    backgroundOpacity={0.1}
                    distortionScale={-180}
                    displace={0.8}
                  >
                    <span style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Lens Glass</span>
                  </GlassSurface>
                )}

                <GlassSurface className="cursor-target" forceMode="low" width={220} height={60} borderRadius={100} backgroundOpacity={0.1}>
                  <span style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Frosted Glass</span>
                </GlassSurface>
                
                <button className="btn btn-link cursor-target"><span>Text Link</span></button>

                {/* Gradient Glow Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', marginTop: 12 }}>
                  <ButtonColorful label="Explore Components" />
                </div>

                {/* Magnetic Button - hidden on mobile */}
                {!isMobile && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', marginTop: 12 }}>
                    <MagneticButton distance={0.7}>
                      <button className="cursor-target" style={{ background: 'var(--ink)', color: 'var(--paper)', border: 'none', padding: '14px 32px', borderRadius: 100, fontSize: '0.95rem', fontWeight: 600, cursor: 'none', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                        Magnetic Button
                      </button>
                    </MagneticButton>
                  </div>
                )}

                {/* Sliding Chevron Button - hidden on mobile */}
                {!isMobile && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', marginTop: 12 }}>
                    <GetStartedButton label="Get Started" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>


        {/* Cards & Hover Effects */}
        <Reveal delay={200}>
          <div ref={kartenRef} style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, overflow: 'hidden', background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320 }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 40 }}>Karten & Hover</h3>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <div ref={borderGlowRef} style={{ position: 'relative', width: isMobile ? '100%' : 300, height: 300 }} className="cursor-target">
                <SimulatedMouse containerRef={borderGlowRef} />
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor={isDark ? "0 0 100" : "0 0 0"}
                  backgroundColor={isDark ? "#202020" : "#e2dfd8"}
                  borderRadius={15}
                  glowRadius={60}
                  glowIntensity={2.0}
                  coneSpread={50}
                  animated={!isMobile}
                  colors={['#c084fc', '#f472b6', '#38bdf8']}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: 300,
                    overflow: 'hidden',
                    borderRadius: 15
                  }}>
                    {/* Background Image */}
                    <img 
                      src={forestImg} 
                      alt="Forest Background" 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0
                      }}
                    />
                    
                    {/* Frosted Glass Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                      padding: 30,
                      background: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      zIndex: 1
                    }}>
                      {/* Grain Effect */}
                      <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        opacity: isDark ? 0.08 : 0.06,
                        mixBlendMode: isDark ? 'screen' : 'multiply',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                      }} />
                      
                      <div style={{ position: 'relative', zIndex: 2, color: isDark ? '#ffffff' : '#000000' }}>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Leuchtender Rand</h4>
                        <p style={{ opacity: 0.8, fontSize: '0.85rem', lineHeight: 1.5 }}>Ein dynamischer Glow, der dem Cursor am Rand folgt.</p>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </div>

              <div ref={tiltedCardRef} style={{ position: 'relative', width: isMobile ? '100%' : 300 }}>
                <SimulatedMouse containerRef={tiltedCardRef} />
                <TiltedCard
                  imageSrc={forestImg}
                  altText="Forest Landscape"
                  captionText=""
                  containerHeight="300px"
                  containerWidth="100%"
                  imageHeight="300px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  imageOverlay={
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
                      pointerEvents: 'none'
                    }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        opacity: isDark ? 0.15 : 0.12,
                        mixBlendMode: 'normal',
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
                      }} />
                    </div>
                  }
                  overlayContent={
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                      padding: 30,
                      color: isDark ? '#ffffff' : '#000000'
                    }}>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Interaktive Karte</h4>
                      <p style={{ opacity: 0.8, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>Eine interaktive Karte, die sich flüssig zur Maus neigt.</p>
                    </div>
                  }
                />
              </div>

              {/* ChromaGrid (Single Card) */}
              <div ref={chromaGridRef} style={{ position: 'relative', width: isMobile ? '100%' : 300, height: 300 }} className="cursor-target">
                <SimulatedMouse containerRef={chromaGridRef} />
                <ChromaGrid 
                  items={[{
                    image: forestImg,
                    title: "Chroma-Raster",
                    subtitle: "Fokussierter Graustufen-Hover mit Farbeffekt",
                  }]}
                  radius={220}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>

            </div>
          </div>
        </Reveal>

        {/* Typography */}
        <Reveal delay={400}>
          <div ref={typografieRef} style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320, overflow: 'hidden' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 40 }}>Typografie</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
              
              {/* TextPressure */}
              <div ref={textPressureRef} style={{ position: 'relative', height: 'auto', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
                <SimulatedMouse containerRef={textPressureRef} />
                <TextPressure
                  text="DYNAMIK"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor={isDark ? "#ffffff" : "#000000"}
                  strokeColor="#ff0000"
                  minFontSize={36}
                />
              </div>

              {/* TrueFocus */}
              <div ref={trueFocusRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <TrueFocus 
                  sentence="Fokus Behalten"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="var(--accent)"
                  glowColor="rgba(255, 0, 0, 0.4)"
                  animationDuration={1}
                  pauseBetweenAnimations={1}
                />
              </div>

              {/* ScrambledText */}
              <div ref={scrambledTextRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', textAlign: 'center', color: isDark ? '#fff' : '#000' }}>
                <SimulatedMouse containerRef={scrambledTextRef} />
                <ScrambledText
                  radius={80}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                  style={{ margin: 0, padding: 0 }}
                >
                  Fahre mit der Maus über diesen Text, um ihn zu mischen.
                </ScrambledText>
              </div>

              {/* RotatingText */}
              <div ref={rotatingTextRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 'clamp(1.2rem, 5vw, 2rem)', fontWeight: 800, whiteSpace: 'nowrap' }}>
                <span>Modernes </span>
                <RotatingText
                  texts={['Design', 'Layout', 'Branding', 'Web']}
                  mainClassName=""
                  splitLevelClassName="overflow-hidden"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                  style={{ 
                    background: 'var(--accent)', 
                    color: isDark ? '#fff' : '#000', 
                    marginLeft: 12, 
                    padding: '4px 16px', 
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'inline-flex'
                  }}
                />
              </div>

              {/* VariableProximity */}
              <div ref={proximityRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', textAlign: 'center', position: 'relative' }}>
                <SimulatedMouse containerRef={proximityRef} />
                <VariableProximity
                  label="Bewege den Cursor"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  radius={120}
                  falloff='gaussian'
                  containerRef={proximityRef}
                  style={{ color: isDark ? '#fff' : '#000', marginBottom: '8px' }}
                />
                <VariableProximity
                  label="in die Nähe dieses Textes"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  radius={120}
                  falloff='gaussian'
                  containerRef={proximityRef}
                  style={{ color: isDark ? '#fff' : '#000' }}
                />
              </div>

            </div>
          </div>
        </Reveal>

        <div style={{ padding: '60px 0' }}>
          <div style={{ position: 'relative', padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 10, textAlign: isMobile ? 'center' : 'left' }}>Hintergründe</h3>
            {isMobile && (
              <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: 30, textAlign: 'center' }}>
                Tippen Sie auf die Karten, um die Hintergründe aufzudecken.
              </p>
            )}
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 40 }}>
          {/* Background 1: Silk */}
          <Reveal delay={600}>
            <div className="wc2" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10, textAlign: isMobile ? 'center' : 'left' }}>Silk Flow</h3>
              <HoverBackground simulateMouse={true}>
                <Silk
                    speed={5}
                    scale={1}
                    color={isDark ? '#3a3a3a' : '#ffffff'}
                    noiseIntensity={1.5}
                    rotation={0}
                  />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 2: Floating Lines */}
          <Reveal delay={700}>
            <div className="wc3" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10, textAlign: isMobile ? 'center' : 'left' }}>Floating Lines</h3>
              <HoverBackground simulateMouse={true}>
                <FloatingLines isDark={isDark}
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[10, 15, 20]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                    linesGradient={isDark ? ['#606060', '#c4c1bc'] : ['#808080', '#2a2a2a']}
                    mixBlendMode="normal"
                  />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 3: Pixel Blast */}
          <Reveal delay={800}>
            <div className="wc4" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10, textAlign: isMobile ? 'center' : 'left' }}>Pixel Blast</h3>
              <HoverBackground hoverBg={isDark ? 'transparent' : '#cccccc'} simulateMouse={true}>
                <PixelBlast
                    variant="circle"
                    pixelSize={6}
                    color={isDark ? '#ffffff' : '#000000'}
                    patternScale={3}
                    patternDensity={1.2}
                    pixelSizeJitter={0.5}
                    enableRipples={true}
                    rippleSpeed={0.4}
                    rippleThickness={0.12}
                    rippleIntensityScale={1.5}
                    liquid={true}
                    liquidStrength={0.12}
                    liquidRadius={1.2}
                    liquidWobbleSpeed={5}
                    speed={0.6}
                    edgeFade={0.25}
                    transparent={true}
                  />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 4: Line Waves */}
          <Reveal delay={900}>
            <div className="wc5" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10, textAlign: isMobile ? 'center' : 'left' }}>Line Waves</h3>
              <HoverBackground simulateMouse={true}>
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
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 5: Grid Distortion */}
          <Reveal delay={600}>
            <div className="wc11" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10, textAlign: isMobile ? 'center' : 'left' }}>Grid Distortion</h3>
              <HoverBackground simulateMouse={true}>
                <GridDistortion imageSrc={forestImg} />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 6: Letter Glitch */}
          <Reveal delay={700}>
            <div className="wc13" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', aspectRatio: '1 / 1', overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10, textAlign: isMobile ? 'center' : 'left' }}>Letter Glitch</h3>
              <HoverBackground hoverBg={isDark ? 'transparent' : '#cccccc'} simulateMouse={true}>
                <LetterGlitch isDark={isDark} glitchColors={isDark ? ['#2b4539', '#61dca3', '#61b3dc'] : ['#1a2a22', '#3a8a66', '#3a6b8a']} />
              </HoverBackground>
            </div>
          </Reveal>
        </div>
        </div>
      </div>
      
      <Reveal delay={200}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: -4, opacity: 0.6, padding: '0 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <p style={{ fontSize: '0.95rem', maxWidth: 650, margin: 0, lineHeight: 1.6 }}>
            Die Möglichkeiten sind nicht auf die in der Galerie dargestellten Komponenten begrenzt. Wir konzipieren und entwickeln gerne maßgeschneiderte, interaktive Elemente exklusiv für Ihr Projekt.
          </p>
        </div>
      </Reveal>
      
      </div>
    </section>
  )
}
