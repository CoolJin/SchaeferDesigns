import { InfiniteSlider } from './InfiniteSlider';
import { ProgressiveBlur } from './ProgressiveBlur';
import { useTheme } from '../hooks/useTheme';

const items = [
  "Konzept", "Design", "Entwicklung", "Strategie", "Motion", "Branding", "UX", "Identity"
];

// Repeat to ensure it's wide enough for the slider
const repeatedItems = [...items, ...items, ...items, ...items];

export default function TextMarquee() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      position: 'relative', 
      width: '100%', 
      padding: '24px 0', 
      overflow: 'hidden',
      background: isDark ? '#0a0a0a' : '#ffffff'
    }}>
      {/* Top Border Line */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', borderTop: '1.5px solid var(--border)', pointerEvents: 'none' }} />

      <InfiniteSlider gap={60} duration={150} durationOnHover={300}>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
          {repeatedItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '1rem', 
                color: 'var(--ink)', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase', 
                whiteSpace: 'nowrap',
                fontWeight: 600,
                opacity: 0.8
              }}>
                {item}
              </span>
              <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>✦</span>
            </div>
          ))}
        </div>
      </InfiniteSlider>

      {/* Left Blur */}
      <ProgressiveBlur
        blurIntensity={2}
        direction="left"
        className="marquee-blur-left"
        style={{
          position: 'absolute', top: 0, left: 0, height: '100%', width: '150px', pointerEvents: 'none', zIndex: 10
        }}
      />
      {/* Right Blur */}
      <ProgressiveBlur
        blurIntensity={2}
        direction="right"
        className="marquee-blur-right"
        style={{
          position: 'absolute', top: 0, right: 0, height: '100%', width: '150px', pointerEvents: 'none', zIndex: 10
        }}
      />

      {/* Bottom Border Line */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', borderBottom: '1.5px solid var(--border)', pointerEvents: 'none' }} />
    </div>
  );
}
