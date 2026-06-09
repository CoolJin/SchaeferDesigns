import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f: c = f.read()

# 1. Floating Lines: Monochrome
c = c.replace(
    "linesGradient={isDark ? ['#ff3a2d', '#c4c1bc'] : ['#ff3a2d', '#2a2a2a']}",
    "linesGradient={isDark ? ['#606060', '#c4c1bc'] : ['#808080', '#2a2a2a']}"
)

# 2. Silk Flow: Dark mode color slightly lighter
c = c.replace(
    "color={isDark ? '#1a1a1a' : '#ffffff'}",
    "color={isDark ? '#3a3a3a' : '#ffffff'}"
)

# 3. Line Waves: Change background back to var(--paper)
c = c.replace(
    "background: isDark ? '#000000' : '#ffffff',",
    "background: 'var(--paper)',"
)

# 4. Pixel Blast: Make the bright mode background darker grey (#cccccc)
c = c.replace(
    "background: isDark ? 'var(--paper)' : '#f0f0f0',",
    "background: isDark ? 'var(--paper)' : '#cccccc',"
)

# 5. Letter Glitch Card background
c = c.replace(
    '''className="wc13" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: 'var(--paper)',''',
    '''className="wc13" style={{ padding: 60, border: '1.5px solid var(--border)', borderRadius: 24, background: isDark ? 'var(--paper)' : '#cccccc','''
)

with open(path, "w", encoding="utf-8") as f: f.write(c)

path_glitch = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\LetterGlitch.jsx"
with open(path_glitch, "r", encoding="utf-8") as f: c = f.read()

# Update Letter Glitch bright mode background from #ffffff to #cccccc
c = c.replace(
    "backgroundColor: isDark ? '#000000' : '#ffffff'",
    "backgroundColor: isDark ? '#000000' : '#cccccc'"
)
c = c.replace(
    "background: isDark ? 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)' : 'radial-gradient(circle, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 100%)'",
    "background: isDark ? 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)' : 'radial-gradient(circle, rgba(204,204,204,0) 60%, rgba(204,204,204,1) 100%)'"
)
c = c.replace(
    "background: isDark ? 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)' : 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)'",
    "background: isDark ? 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)' : 'radial-gradient(circle, rgba(204,204,204,0.8) 0%, rgba(204,204,204,0) 60%)'"
)

with open(path_glitch, "w", encoding="utf-8") as f: f.write(c)
print("Updated successfully")
