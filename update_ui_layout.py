import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add gridRef
if "const gridRef = useRef<HTMLDivElement>(null)" not in content and "const gridRef = useRef(null)" not in content:
    content = content.replace("const [showAllBackgrounds, setShowAllBackgrounds] = useState(false)", 
                              "const [showAllBackgrounds, setShowAllBackgrounds] = useState(false)\n  const gridRef = useRef<HTMLDivElement>(null)")

# 2. Add toggle function
toggle_func = """
  const toggleBackgrounds = () => {
    if (showAllBackgrounds && gridRef.current) {
      const topPos = gridRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
    setShowAllBackgrounds(!showAllBackgrounds);
  }
"""
if "const toggleBackgrounds" not in content:
    content = content.replace("return (", toggle_func + "\n  return (")

# 3. Replace the button onClick
content = content.replace("onClick={() => setShowAllBackgrounds(!showAllBackgrounds)}", "onClick={toggleBackgrounds}")

# 4. Wrap Backgrounds 1-3 in Grid
bg13_start = r"\{/\* Background 1: Silk \*/\}"
bg13_end = r"\{showAllBackgrounds && \(<>"

# we need to extract bg1-3 chunks and wrap them
content = content.replace("{/* Background 1: Silk */}", """<div style={{ padding: '60px 0' }} ref={gridRef}>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: 40 }}>Hintergründe</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, marginBottom: showAllBackgrounds ? 40 : 0 }}>
          {/* Background 1: Silk */}""")

content = content.replace("{showAllBackgrounds && (<>", """</div>
        
        <AnimatePresence initial={false}>
          {showAllBackgrounds && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, paddingBottom: 40 }}>
""")

content = content.replace("</>)}", """</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>""")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated UIShowcase layout structure.")
