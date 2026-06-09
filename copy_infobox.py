import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

# The current intro section:
old_intro_pattern = r"      <Reveal>\s*<div className=\"section-label\">// Design & Code Möglichkeiten<\/div>\s*<h2 className=\"section-heading\" style={{ marginBottom: 60 }}>\s*Endlose<br \/>\s*Möglichkeiten\s*<\/h2>\s*<p style={{ opacity: 0\.6, maxWidth: 600, fontSize: '1\.1rem', marginBottom: 60 }}>\s*Eine Auswahl an UI-Komponenten, Interaktionen und Effekten, welche zeigen, was im modernen Web machbar ist\.\s*<\/p>\s*<\/Reveal>"

new_intro = """      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 40 }}>
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
      </div>"""

c = re.sub(old_intro_pattern, new_intro, c)

with open(path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated intro successfully")
