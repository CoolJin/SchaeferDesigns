import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f: c = f.read()

# 1. Update HoverBackground to accept hoverBg
c = c.replace(
    "const HoverBackground = ({ children }: any) => {",
    "const HoverBackground = ({ children, hoverBg }: any) => {"
)
c = c.replace(
    "style={{ width: '100%', height: '100%' }}",
    "style={{ width: '100%', height: '100%', backgroundColor: hoverBg || 'transparent' }}"
)

# 2. Change 800px height to 1:1 aspect ratio
c = c.replace("height: 800", "aspectRatio: '1 / 1'")

# 3. Floating Lines: Add isDark prop to FloatingLines and change gradient
c = c.replace(
    "<FloatingLines",
    "<FloatingLines isDark={isDark}"
)
c = c.replace(
    "linesGradient={isDark ? ['#606060', '#c4c1bc'] : ['#808080', '#2a2a2a']}",
    "linesGradient={isDark ? ['#606060', '#c4c1bc'] : ['#808080', '#2a2a2a']}"
)

# 4. Pixel Blast: Make pixels white in Dark Mode, and set hoverBg
c = c.replace(
    "color={isDark ? '#ff3a2d' : '#000000'}",
    "color={isDark ? '#ffffff' : '#000000'}"
)
# Reset card background to var(--paper) and pass hoverBg
c = c.replace(
    "background: isDark ? 'var(--paper)' : '#cccccc'",
    "background: 'var(--paper)'"
)
c = c.replace(
    "<HoverBackground>",
    "<HoverBackground hoverBg={isDark ? 'transparent' : '#cccccc'}>", 
    2 # Only for Pixel Blast and Letter Glitch? Wait, let's just replace all and then fix it.
)

# Actually, it's safer to use regex to specifically target Pixel Blast and Letter Glitch.
# Let's restore the original <HoverBackground> for now.
c = c.replace("<HoverBackground hoverBg={isDark ? 'transparent' : '#cccccc'}>", "<HoverBackground>")

pixel_blast_block = r"""<h3 style={{ fontFamily: 'var\(--font-mono\)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Pixel Blast</h3>\s*<HoverBackground>"""
c = re.sub(pixel_blast_block, """<h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Pixel Blast</h3>\n              <HoverBackground hoverBg={isDark ? 'transparent' : '#cccccc'}>""", c)

letter_glitch_block = r"""<h3 style={{ fontFamily: 'var\(--font-mono\)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Letter Glitch</h3>\s*<HoverBackground>"""
c = re.sub(letter_glitch_block, """<h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}>Letter Glitch</h3>\n              <HoverBackground hoverBg={isDark ? 'transparent' : '#cccccc'}>""", c)

# 5. Wrap the grid in a big bordered box
old_grid_start = r"""<div style={{ padding: '60px 0' }}>\s*<h3 style={{ fontFamily: 'var\(--font-mono\)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 40 }}>Hintergründe</h3>"""
new_grid_start = """<div style={{ padding: '60px 0' }}>
          <div style={{ position: 'relative', padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 40 }}>Hintergründe</h3>"""
c = re.sub(old_grid_start, new_grid_start, c)

# Add closing div for the big bordered box right before `</div>\n      </div>\n    </section>`
c = c.replace("""          </Reveal>\n        </div>\n      </div>\n      </div>\n    </section>""", """          </Reveal>\n        </div>\n        </div>\n      </div>\n      </div>\n    </section>""")

with open(path, "w", encoding="utf-8") as f: f.write(c)


# Now fix FloatingLines.jsx
fl_path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\FloatingLines.jsx"
with open(fl_path, "r", encoding="utf-8") as f: fl = f.read()

fl = fl.replace("export default function FloatingLines({", "export default function FloatingLines({ isDark = true, ")
fl = fl.replace("uniforms.lineGradient = { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] };", "uniforms.lineGradient = { value: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] };\n    uniforms.uIsDark = { value: isDark ? 1.0 : 0.0 };")
fl = fl.replace("if (linesGradient.length > 0) {", "if (uniforms.uIsDark) uniforms.uIsDark.value = isDark ? 1.0 : 0.0;\n    if (linesGradient.length > 0) {")

# Add uIsDark uniform to shader
fl = fl.replace("uniform vec3 lineGradient[3];", "uniform vec3 lineGradient[3];\nuniform float uIsDark;")

# Update background_color
fl = fl.replace("vec3 background_color(vec2 uv) {\n    vec3 col = vec3(0.0);", "vec3 background_color(vec2 uv) {\n    vec3 col = uIsDark > 0.5 ? vec3(0.0) : vec3(1.0);")
fl = fl.replace("vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);", "vec3 b = lineGradientCount > 0 ? (uIsDark > 0.5 ? vec3(0.0) : vec3(1.0)) : background_color(baseUv);")

with open(fl_path, "w", encoding="utf-8") as f: f.write(fl)
print("Applied tweaks")
