import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import Stepper, { Step } from '../components/Stepper'
import ElasticSlider from '../components/ElasticSlider'
import { ChevronDown } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  
  // Step 1 State
  const [projectType, setProjectType] = useState('')
  const [noProjectType, setNoProjectType] = useState(false)
  const [budget, setBudget] = useState(5000)
  const [noBudget, setNoBudget] = useState(false)
  
  // Step 2 State
  const [description, setDescription] = useState('')
  const [otherInfo, setOtherInfo] = useState('')
  
  // Step 3 State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleFinalSubmit = () => {
    // Hier würde der echte API-Call passieren
    console.log({ projectType, budget, description, otherInfo, name, email, phone })
    setSent(true)
  }

  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero" style={{ minHeight: '60vh', paddingBottom: 0 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// lass uns reden</div>
          <h1>Kontakt.</h1>
          <p>Ein Projekt, eine Idee, oder einfach nur Hallo — ich freue mich auf jede Nachricht.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px 80px', display: 'flex', flexDirection: 'column', gap: 60 }}>
        {/* Contact Details Top */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40 }}>
            {[
              { label: 'E-Mail', val: 'hello@schaeferdesigns.de' },
              { label: 'Telefon', val: '+49 711 000 000' },
              { label: 'Studio', val: 'Stuttgart, Deutschland' },
            ].map(item => (
              <div key={item.label} style={{ padding: '24px 0', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{item.val}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Multi-Step Form */}
        <Reveal delay={100}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '120px 0', border: '1px solid var(--border)', borderRadius: '2rem', background: 'var(--paper)' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-.05em' }}>Danke.</div>
              <p style={{ color: 'var(--muted)', marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: '.85rem' }}>Ich melde mich innerhalb von 4 Stunden.</p>
            </div>
          ) : (
            <Stepper
              initialStep={1}
              onFinalStepCompleted={handleFinalSubmit}
              backButtonText="Zurück"
              nextButtonText="Weiter"
            >
              <Step>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: 8, letterSpacing: '-0.03em' }}>Was brauchst du?</h2>
                  <p style={{ color: 'var(--muted)' }}>Erzähl mir grob, worum es geht.</p>
                </div>
                
                <div className="form-field" style={{ marginBottom: 40 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
                    <label style={{ margin: 0 }}>Projektart</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'none', letterSpacing: 'normal' }}>
                      <input type="checkbox" checked={noProjectType} onChange={(e) => setNoProjectType(e.target.checked)} />
                      Keine Angabe
                    </label>
                  </div>
                  <div style={{ position: 'relative', opacity: noProjectType ? 0.5 : 1, pointerEvents: noProjectType ? 'none' : 'auto', transition: 'all 0.3s' }}>
                    <select 
                      value={projectType} 
                      onChange={(e) => setProjectType(e.target.value)}
                      style={{ width: '100%', padding: '16px', background: 'transparent', border: '1.5px solid var(--border)', borderRadius: 12, color: 'var(--ink)', fontSize: '1rem', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Bitte wählen...</option>
                      <option value="Neue Webseite">Neue Webseite</option>
                      <option value="Redesign">Redesign</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Automatisierung">Automatisierung</option>
                      <option value="Wartung">Wartung / Sonstiges</option>
                    </select>
                    <ChevronDown size={20} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)' }} />
                  </div>
                </div>

                <div className="form-field">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
                    <label style={{ margin: 0 }}>Budgetrahmen</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'none', letterSpacing: 'normal' }}>
                      <input type="checkbox" checked={noBudget} onChange={(e) => setNoBudget(e.target.checked)} />
                      Keine Angabe
                    </label>
                  </div>
                  <ElasticSlider 
                    startingValue={0}
                    defaultValue={5000}
                    maxValue={10000}
                    isStepped={true}
                    stepSize={100}
                    onChange={(val) => setBudget(val)}
                    disabled={noBudget}
                  />
                </div>
              </Step>

              <Step>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: 8, letterSpacing: '-0.03em' }}>Die Details</h2>
                  <p style={{ color: 'var(--muted)' }}>Lass mich wissen, was du im Kopf hast.</p>
                </div>

                <div className="form-field" style={{ marginBottom: 32 }}>
                  <label>Projektbeschreibung</label>
                  <textarea 
                    placeholder="Erzähl mir mehr über deine Idee..." 
                    rows={4} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Sonstige Infos (Optional)</label>
                  <textarea 
                    placeholder="Gibt es noch etwas, das ich wissen sollte?" 
                    rows={2} 
                    value={otherInfo}
                    onChange={(e) => setOtherInfo(e.target.value)}
                  />
                </div>
              </Step>

              <Step>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: 8, letterSpacing: '-0.03em' }}>Fast geschafft!</h2>
                  <p style={{ color: 'var(--muted)' }}>Wie kann ich dich erreichen?</p>
                </div>

                <div className="form-field" style={{ marginBottom: 24 }}>
                  <label>Voller Name</label>
                  <input 
                    type="text" 
                    placeholder="Max Mustermann" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-field" style={{ marginBottom: 24 }}>
                  <label>E-Mail</label>
                  <input 
                    type="email" 
                    placeholder="max@beispiel.de" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Telefon (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+49 123 456789" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </Step>
            </Stepper>
          )}
        </Reveal>
      </div>

      <Footer />
    </motion.div>
  )
}

