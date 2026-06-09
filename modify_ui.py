path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove Ballpit import
content = content.replace("import Ballpit from './Ballpit'\n", "")

# 2. Transparent HoverBackground
content = content.replace(
    "background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'",
    "background: 'transparent'"
)

# 3. Add state
if "const [showAllBackgrounds" not in content:
    content = content.replace(
        "export default function UIShowcase() {\n  const [buttonsHovered, setButtonsHovered] = useState(false)",
        "export default function UIShowcase() {\n  const [buttonsHovered, setButtonsHovered] = useState(false)\n  const [showAllBackgrounds, setShowAllBackgrounds] = useState(false)"
    )

# 4. Change height 320 -> 800 for the backgrounds
# Only for the canvas containers
content = content.replace("height: 320", "height: 800")

# 5. Add borderRadius: 24, overflow: 'hidden' to the main showcase cards
# Buttons
content = content.replace(
    "style={{ position: 'relative', padding: 60, border: '1.5px solid var(--border)', background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320, overflow: 'hidden' }}",
    "style={{ position: 'relative', padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320, overflow: 'hidden' }}"
)
# Formulare, Karten, Typografie
content = content.replace(
    "style={{ padding: 60, border: '1.5px solid var(--border)', background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320 }}",
    "style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, overflow: 'hidden', background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320 }}"
)
content = content.replace(
    "style={{ padding: 60, border: '1.5px solid var(--border)', background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320, overflow: 'hidden' }}",
    "style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', minHeight: 320, overflow: 'hidden' }}"
)

# Background cards
content = content.replace(
    "style={{ border: '1.5px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'relative' }}",
    "style={{ border: '1.5px solid var(--border)', borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}"
)

# 6. Remove Ballpit section
import re
ballpit_pattern = r"\{/\*\s*Background 11: Ballpit\s*\*/\}(.*?)</Reveal>"
content = re.sub(ballpit_pattern, "", content, flags=re.DOTALL)

# 7. Wrap backgrounds from LineWaves onwards
# Look for "Background 4: Line Waves"
parts = content.split("{/* Background 4: Line Waves */}")
if len(parts) == 2:
    # Everything before is fine, everything after needs to be wrapped until the bottom link
    after_parts = parts[1].split('<div style={{ textAlign: \'center\', marginTop: 80 }}>')
    if len(after_parts) == 2:
        gallery_rest = "{showAllBackgrounds && (<>\n        {/* Background 4: Line Waves */}" + after_parts[0].strip() + "\n      </>)}\n\n      <Reveal delay={700}>\n        <div style={{ textAlign: 'center', marginTop: 80 }}>\n          <button onClick={() => setShowAllBackgrounds(!showAllBackgrounds)} className=\"btn btn-outline\">\n            <span>{showAllBackgrounds ? 'Weitere Hintergründe einklappen' : 'Alle Hintergründe anzeigen'}</span>\n          </button>\n        </div>\n      </Reveal>\n    </section>\n  )\n}"
        
        # Replace the end
        content = parts[0] + gallery_rest

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Modification complete.")
