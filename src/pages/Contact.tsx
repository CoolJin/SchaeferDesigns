import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import Stepper, { Step } from '../components/Stepper'
import DualRangeSlider from '../components/DualRangeSlider'
import CustomSelect from '../components/CustomSelect'
import Checkbox from '../components/Checkbox'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  
  // Step 1 State
  const [projectType, setProjectType] = useState('')
  const [noProjectType, setNoProjectType] = useState(false)
  const [budgetMin, setBudgetMin] = useState(1500)
  const [budgetMax, setBudgetMax] = useState(5000)
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
    console.log({ projectType, budgetMin, budgetMax, description, otherInfo, name, email, phone })
    setSent(true)
  }

  const projectTypeOptions = [
    { value: 'Neue Webseite', label: 'Neue Webseite' },
    { value: 'Redesign', label: 'Redesign' },
    { value: 'E-Commerce', label: 'E-Commerce' },
    { value: 'Automatisierung', label: 'Automatisierung' },
    { value: 'Wartung', label: 'Wartung / Sonstiges' }
  ]

  // Validation Logic
  const isStep1Valid = noProjectType || projectType !== '';
  const isStep2Valid = description.trim().length >= 100;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isStep3Valid = name.trim() !== '' && isEmailValid;

  const isNextDisabled = 
    (activeStep === 1 && !isStep1Valid) ||
    (activeStep === 2 && !isStep2Valid) ||
    (activeStep === 3 && !isStep3Valid);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Nur Zahlen, Leerzeichen und das Plus-Zeichen erlauben
    const val = e.target.value.replace(/[^\d+ ]/g, '');
    setPhone(val);
  }

  return (
    <motion.div className="page-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="inner-hero" style={{ minHeight: '40vh', paddingBottom: 40 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="section-label">// lass uns reden</div>
          <h1>Kontakt.</h1>
          <p>Ein Projekt, eine Idee, oder einfach nur Hallo — ich freue mich auf jede Nachricht.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px 80px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        {/* Lange Hauptlinie unter dem Text */}
        <Reveal>
          <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border)' }}></div>
        </Reveal>

        {/* Contact Details Top */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40, marginTop: 16 }}>
            {[
              { label: 'E-Mail', val: 'hello@schaeferdesigns.de' },
              { label: 'Telefon', val: '+49 711 000 000' },
              { label: 'Studio', val: 'Stuttgart, Deutschland' },
            ].map(item => (
              <div key={item.label} style={{ padding: '24px 0' }}>
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
              onStepChange={setActiveStep}
              onFinalStepCompleted={handleFinalSubmit}
              backButtonText="Zurück"
              nextButtonText="Weiter"
              nextButtonProps={{
                disabled: isNextDisabled,
                style: { opacity: isNextDisabled ? 0.3 : 1, pointerEvents: isNextDisabled ? 'none' : 'auto' }
              }}
            >
              <Step>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: 8, letterSpacing: '-0.03em' }}>Was brauchst du?</h2>
                  <p style={{ color: 'var(--muted)' }}>Erzähl mir grob, worum es geht.</p>
                </div>
                
                <div className="form-field" style={{ marginBottom: 40 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
                    <label style={{ margin: 0 }}>Projektart <span style={{ color: 'var(--accent)' }}>*</span></label>
                    <Checkbox checked={noProjectType} onChange={setNoProjectType} label="Keine Angabe" />
                  </div>
                  <CustomSelect 
                    options={projectTypeOptions}
                    value={projectType}
                    onChange={setProjectType}
                    disabled={noProjectType}
                  />
                </div>

                <div className="form-field">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
                    <label style={{ margin: 0 }}>Budgetrahmen</label>
                    <Checkbox checked={noBudget} onChange={setNoBudget} label="Keine Angabe" />
                  </div>
                  <DualRangeSlider 
                    min={0}
                    max={10000}
                    step={50}
                    defaultMinValue={budgetMin}
                    defaultMaxValue={budgetMax}
                    onChange={(minVal, maxVal) => {
                      setBudgetMin(minVal);
                      setBudgetMax(maxVal);
                    }}
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
                  <label>Projektbeschreibung <span style={{ color: 'var(--accent)' }}>*</span></label>
                  <textarea 
                    placeholder="Erzähl mir mehr über deine Idee..." 
                    rows={4} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: description.trim().length >= 100 ? 'var(--ink)' : 'var(--muted)' }}>
                      {description.trim().length} / 100 Min. Zeichen
                    </span>
                  </div>
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
                  <label>Voller Name <span style={{ color: 'var(--accent)' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder="Max Mustermann" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ paddingRight: 40, borderColor: name.trim() !== '' ? 'var(--ink)' : 'var(--border)' }}
                    />
                    {name.trim() !== '' && (
                      <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-field" style={{ marginBottom: 24 }}>
                  <label>E-Mail <span style={{ color: 'var(--accent)' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email" 
                      placeholder="max@beispiel.de" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ paddingRight: 40, borderColor: email.length > 0 && isEmailValid ? 'var(--ink)' : (email.length > 0 && !isEmailValid ? 'red' : 'var(--border)') }}
                    />
                    {email.length > 0 && isEmailValid && (
                      <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </div>
                  {email.length > 0 && !isEmailValid && (
                    <span style={{ fontSize: '0.8rem', color: 'red', marginTop: 8, display: 'block' }}>Bitte eine gültige E-Mail Adresse eingeben.</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Telefon (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+49 123 456789" 
                    value={phone}
                    onChange={handlePhoneChange}
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

