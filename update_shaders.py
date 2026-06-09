import os

# 1. Beams.jsx
path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\Beams.jsx"
with open(path, "r", encoding="utf-8") as f: c = f.read()
c = c.replace("export const Beams = forwardRef(({", "export const Beams = forwardRef(({ isDark = true, ")
c = c.replace("lightColor = '#ffffff',", "lightColor = isDark ? '#ffffff' : '#000000',")
c = c.replace("diffuse: new THREE.Color(...hexToNormalizedRGB('#000000'))", "diffuse: new THREE.Color(...hexToNormalizedRGB(isDark ? '#000000' : '#ffffff'))")
c = c.replace("<color attach=\"background\" args={['#000000']} />", "<color attach=\"background\" args={[isDark ? '#000000' : '#ffffff']} />")
with open(path, "w", encoding="utf-8") as f: f.write(c)

# 2. FaultyTerminal.jsx
path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\FaultyTerminal.jsx"
with open(path, "r", encoding="utf-8") as f: c = f.read()
c = c.replace("export default function FaultyTerminal({", "export default function FaultyTerminal({ isDark = true, ")
c = c.replace("gl.clearColor(0, 0, 0, 1);", "gl.clearColor(isDark ? 0 : 1, isDark ? 0 : 1, isDark ? 0 : 1, 1);")
with open(path, "w", encoding="utf-8") as f: f.write(c)

# 3. Dither.jsx
path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\Dither.jsx"
with open(path, "r", encoding="utf-8") as f: c = f.read()
c = c.replace("export default function Dither({", "export default function Dither({ isDark = true, ")
c = c.replace("uniform vec3 waveColor;", "uniform vec3 waveColor;\nuniform float uIsDark;")
c = c.replace("vec3 col = mix(vec3(0.0), waveColor, f);", "vec3 col = mix(vec3(uIsDark < 0.5 ? 1.0 : 0.0), waveColor, f);")
c = c.replace("waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),", "waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),\n      uIsDark: new THREE.Uniform(isDark ? 1.0 : 0.0),")
c = c.replace("if (!prevColor.current.every", "if (u.uIsDark) u.uIsDark.value = isDark ? 1.0 : 0.0;\n      if (!prevColor.current.every")
with open(path, "w", encoding="utf-8") as f: f.write(c)

# 4. LetterGlitch.jsx
path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\LetterGlitch.jsx"
with open(path, "r", encoding="utf-8") as f: c = f.read()
c = c.replace("const LetterGlitch = ({", "const LetterGlitch = ({ isDark = true, ")
c = c.replace("backgroundColor: '#000000'", "backgroundColor: isDark ? '#000000' : '#ffffff'")
c = c.replace("background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)'", "background: isDark ? 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)' : 'radial-gradient(circle, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 100%)'")
c = c.replace("background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'", "background: isDark ? 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)' : 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)'")
with open(path, "w", encoding="utf-8") as f: f.write(c)

# 5. Ferrofluid.jsx
path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\Ferrofluid.jsx"
with open(path, "r", encoding="utf-8") as f: c = f.read()
c = c.replace("export default function Ferrofluid({", "export default function Ferrofluid({ isDark = true, ")
c = c.replace("gl.clearColor(0, 0, 0, 0);", "gl.clearColor(isDark ? 0.1 : 1, isDark ? 0.1 : 1, isDark ? 0.1 : 1, 1);")
with open(path, "w", encoding="utf-8") as f: f.write(c)

print("Shaders updated successfully.")
