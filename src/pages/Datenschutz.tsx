import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import datenschutzText from '../content/datenschutz.txt?raw'

export default function Datenschutz() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '160px 48px 120px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 60 }}>Datenschutzerklärung</h1>
        <div style={{ 
          opacity: 0.8, 
          lineHeight: 1.6, 
          whiteSpace: 'pre-wrap', 
          fontFamily: 'inherit' 
        }}>
          {datenschutzText}
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}
