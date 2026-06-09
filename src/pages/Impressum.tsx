import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function Impressum() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '160px 48px 120px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 60 }}>Impressum</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, opacity: 0.8, lineHeight: 1.6 }}>
          <p>
            <strong>Angaben gemäß § 5 TMG</strong><br />
            Max Mustermann<br />
            Musterstraße 1<br />
            12345 Musterstadt
          </p>
          <p>
            <strong>Kontakt</strong><br />
            Telefon: +49 (0) 123 44 55 66<br />
            E-Mail: hello@schaeferdesigns.de
          </p>
          <p>
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Max Mustermann
          </p>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}
