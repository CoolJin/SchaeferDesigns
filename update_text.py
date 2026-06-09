import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Update Section Label
c = c.replace("// Design & Code Capabilities", "// Design & Code Möglichkeiten")

# 2. Update Heading
c = re.sub(r"Endlose<br />\s*<em>.*?<\/em>", "Endlose<br />\n          Möglichkeiten", c)

# 3. Update Subtext
old_p_pattern = r"<p style={{ opacity: 0\.6, maxWidth: 600, fontSize: '1\.1rem', marginBottom: 60 }}>[\s\S]*?<\/p>"
new_p = "<p style={{ opacity: 0.6, maxWidth: 600, fontSize: '1.1rem', marginBottom: 60 }}>\n          Eine Auswahl an UI-Komponenten, Interaktionen und Effekten, welche zeigen, was im modernen Web machbar ist.\n        </p>"
c = re.sub(old_p_pattern, new_p, c)

# 4. Add Info Box at the bottom
end_pattern = r"          <\/Reveal>\n        <\/div>\n        <\/div>\n      <\/div>\n      <\/div>\n    <\/section>"
info_box = """          </Reveal>
        </div>
        </div>
      </div>
      
      <Reveal delay={200}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 20, opacity: 0.6, padding: '0 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <p style={{ fontSize: '0.95rem', maxWidth: 650, margin: 0, lineHeight: 1.6 }}>
            Die Möglichkeiten sind nicht auf die in der Galerie dargestellten Komponenten begrenzt. Wir konzipieren und entwickeln maßgeschneiderte, interaktive Elemente exklusiv für dein Projekt.
          </p>
        </div>
      </Reveal>
      
      </div>
    </section>"""
c = re.sub(end_pattern, info_box, c)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Text updated successfully")
