import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove unused state variables
content = re.sub(r"const \[showAllBackgrounds, setShowAllBackgrounds\] = useState\(false\)\n\s*const gridRef = useRef<HTMLDivElement>\(null\)\n", "", content)

# Remove toggleBackgrounds function
content = re.sub(r"\s*const toggleBackgrounds = \(\) => \{[\s\S]*?\}\n", "", content)

# Define the new Backgrounds block
new_backgrounds_block = """<div style={{ padding: '60px 0' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 40 }}>Hintergründe</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40 }}>
          {/* Background 1: Silk */}
          <Reveal delay={600}>
            <div className="wc2" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', height: 800, overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Silk Flow</h3>
              <HoverBackground>
                <Silk
                    speed={5}
                    scale={1}
                    color={isDark ? '#1a1a1a' : '#ffffff'}
                    noiseIntensity={1.5}
                    rotation={0}
                  />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 2: Floating Lines */}
          <Reveal delay={700}>
            <div className="wc3" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', height: 800, overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Floating Lines</h3>
              <HoverBackground>
                <FloatingLines
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[10, 15, 20]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                    linesGradient={isDark ? ['#ff3a2d', '#c4c1bc'] : ['#ff3a2d', '#2a2a2a']}
                    mixBlendMode="normal"
                  />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 3: Pixel Blast */}
          <Reveal delay={800}>
            <div className="wc4" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: isDark ? 'var(--paper)' : '#f0f0f0', display: 'flex', flexDirection: 'column', height: 800, overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Pixel Blast</h3>
              <HoverBackground>
                <PixelBlast
                    variant="circle"
                    pixelSize={6}
                    color={isDark ? '#ff3a2d' : '#000000'}
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
            <div className="wc5" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: isDark ? '#000000' : '#ffffff', display: 'flex', flexDirection: 'column', height: 800, overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Line Waves</h3>
              <HoverBackground>
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
                    color2={isDark ? "#a3a3a3" : "#333333"}
                    color3={isDark ? "#2a2a2a" : "#666666"}
                    enableMouseInteraction={true}
                    mouseInfluence={2.5}
                  />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 5: Grid Distortion */}
          <Reveal delay={600}>
            <div className="wc11" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', height: 800, overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Grid Distortion</h3>
              <HoverBackground>
                <GridDistortion imageSrc={isDark ? "/forest-dark.png" : "/forest-bright.png"} />
              </HoverBackground>
            </div>
          </Reveal>

          {/* Background 6: Letter Glitch */}
          <Reveal delay={700}>
            <div className="wc13" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', height: 800, overflow: 'hidden', position: 'relative' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Letter Glitch</h3>
              <HoverBackground>
                <LetterGlitch isDark={isDark} glitchColors={isDark ? ['#2b4539', '#61dca3', '#61b3dc'] : ['#1a2a22', '#3a8a66', '#3a6b8a']} />
              </HoverBackground>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
"""

# Extract everything up to the Hintergründe section
start_pattern = r"<div style={{ padding: '60px 0' }} ref=\{gridRef\}>[\s\S]*?</section>\s*\)\s*\}"
content = re.sub(start_pattern, new_backgrounds_block, content)

# Clean up imports
imports_to_remove = ["Grainient", "Beams", "FaultyTerminal", "Dither", "DotField", "Ferrofluid"]
for imp in imports_to_remove:
    content = re.sub(rf"import {imp} from '\./{imp}'.*\n", "", content)

# Remove AnimatePresence from imports if not used elsewhere
# It is used in HoverBackground so keep it.

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated UIShowcase to keep only 6 backgrounds.")
