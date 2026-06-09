import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function AGB() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '160px 48px 120px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 60 }}>Allgemeine Geschäftsbedingungen</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, opacity: 0.8, lineHeight: 1.6 }}>
          <h2>§1 Geltungsbereich</h2>
          <p>Für alle Geschäftsbeziehungen zwischen SchaeferDesigns und dem Kunden gelten ausschließlich diese Allgemeinen Geschäftsbedingungen.</p>
          
          <h2>§2 Vertragsschluss</h2>
          <p>Die Darstellung unserer Leistungen stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.</p>
          
          <p>Dies ist ein Platzhalter-Text für die AGB von SchaeferDesigns. Bitte durch rechtsgültigen Inhalt ersetzen.</p>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}
