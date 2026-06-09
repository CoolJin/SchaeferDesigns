import re

path = r"C:\Users\Colin\Desktop\.00000\ColinDesign\src\components\UIShowcase.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Silk
content = content.replace("color={isDark ? '#c4c1bc' : '#2a2a2a'}", "color={isDark ? '#1a1a1a' : '#ffffff'}")

# PixelBlast
content = content.replace("color={isDark ? '#ff3a2d' : '#ff3a2d'}", "color={isDark ? '#ff3a2d' : '#000000'}")

# LineWaves
content = content.replace('color1={isDark ? "#a3a3a3" : "#e0e0e0"}', 'color1={isDark ? "#ffffff" : "#000000"}')
content = content.replace('color2={isDark ? "#2a2a2a" : "#999999"}', 'color2={isDark ? "#a3a3a3" : "#333333"}')
content = content.replace('color3={isDark ? "#737373" : "#2a2a2a"}', 'color3={isDark ? "#2a2a2a" : "#666666"}')

# Grainient
content = content.replace("<Grainient />", "<Grainient color1={isDark ? '#2a2a2a' : '#f0f0f0'} color2={isDark ? '#000000' : '#ffffff'} color3={isDark ? '#1a1a1a' : '#e0e0e0'} />")

# Beams
content = content.replace("<Beams />", "<Beams isDark={isDark} />")

# FaultyTerminal
content = content.replace("<FaultyTerminal />", "<FaultyTerminal isDark={isDark} />")

# Dither
content = content.replace("<Dither />", "<Dither isDark={isDark} />")

# DotField
content = content.replace("<DotField />", "<DotField dotRadius={isDark ? 0.04 : 0.06} dotSpacing={isDark ? 0.2 : 0.25} gradientFrom={isDark ? '#ff3a2d' : '#000000'} gradientTo={isDark ? '#c4c1bc' : '#ffffff'} />")

# GridDistortion
content = content.replace("<GridDistortion />", '<GridDistortion imageSrc={isDark ? "/forest-dark.png" : "/forest-bright.png"} />')

# LetterGlitch
content = content.replace("<LetterGlitch />", "<LetterGlitch isDark={isDark} glitchColors={isDark ? ['#2b4539', '#61dca3', '#61b3dc'] : ['#1a2a22', '#3a8a66', '#3a6b8a']} />")

# Ferrofluid
content = content.replace("<Ferrofluid />", "<Ferrofluid isDark={isDark} />")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Props updated successfully.")
