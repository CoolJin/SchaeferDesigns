import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update framer-motion import
content = content.replace("import { motion } from 'framer-motion'", "import { motion, AnimatePresence } from 'framer-motion'")

# 2. Rewrite HoverBackground
hover_bg_old = r"const HoverBackground = \(\{ children, isDark, label = \"HOVER TO RENDER\" \}: any\) => \{[\s\S]*?return \([\s\S]*?\}\s*\)\s*\}"
hover_bg_new = """const HoverBackground = ({ children }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, cursor: 'crosshair', zIndex: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: '100%', height: '100%' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}"""
content = re.sub(hover_bg_old, hover_bg_new, content)

# 3. Rewrite each Background card
# Regex to match the old background structure
card_pattern = r'<div className="(wc\d+)" style={{ border: \'1\.5px solid var\(--border\)\', borderRadius: 24, overflow: \'hidden\', display: \'flex\', flexDirection: \'column\', position: \'relative\' }}>\s*<div style={{ padding: 0, borderBottom: \'1\.5px solid var\(--border\)\', height: 800, position: \'relative\', overflow: \'hidden\' }}>\s*<HoverBackground [^>]*>\s*(<[A-Za-z]+[^>]*/>)\s*</HoverBackground>\s*</div>\s*<div style={{ padding: 24, display: \'flex\', justifyContent: \'space-between\', alignItems: \'center\' }}>\s*<span style={{ fontWeight: 600, fontSize: \'0\.9rem\' }}>([^<]+)</span>\s*<span style={{ fontSize: \'0\.8rem\', opacity: 0\.5 }}>[^<]+</span>\s*</div>\s*</div>'

def replace_card(match):
    class_name = match.group(1)
    component = match.group(2)
    title = match.group(3)
    
    return f"""<div className="{class_name}" style={{{{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)', display: 'flex', flexDirection: 'column', height: 800, overflow: 'hidden', position: 'relative' }}}}>
            <h3 style={{{{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, position: 'relative', zIndex: 10 }}}}>{title}</h3>
            <HoverBackground>
              {component}
            </HoverBackground>
          </div>"""

content = re.sub(card_pattern, replace_card, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated background structures in UIShowcase.tsx")
