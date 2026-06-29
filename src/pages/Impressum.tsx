import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import Footer from '../components/Footer'
import impressumText from '../content/impressum.txt?raw'

export default function Impressum() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '160px 5% 120px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 60 }}>Impressum</h1>
        <div className="legal-text-content" style={{ 
          opacity: 0.8, 
          lineHeight: 1.7, 
          fontSize: '1.05rem',
          color: 'var(--ink)'
        }}>
          <ReactMarkdown>{impressumText}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}
