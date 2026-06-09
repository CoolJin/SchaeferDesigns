import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function Datenschutz() {
  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '160px 48px 120px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 60 }}>Datenschutzerklärung</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, opacity: 0.8, lineHeight: 1.6 }}>
          <p>
            Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:<br />
            Max Mustermann<br />
            hello@schaeferdesigns.de
          </p>
          <h2>Erfassung allgemeiner Informationen</h2>
          <p>
            Wenn Sie auf unsere Website zugreifen, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet Service Providers und Ähnliches.
          </p>
          <p>Dies ist ein Platzhalter-Text für die Datenschutzseite von SchaeferDesigns. Bitte durch rechtssicheren Inhalt ersetzen.</p>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}
