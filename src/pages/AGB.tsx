import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import agbText from '../content/agb.txt?raw'

export default function AGB() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '160px 5% 120px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 60 }}>Allgemeine Geschäftsbedingungen</h1>
        <div style={{ 
          opacity: 0.8, 
          lineHeight: 1.6, 
          whiteSpace: 'pre-wrap', 
          fontFamily: 'inherit' 
        }}>
          {agbText}
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}
