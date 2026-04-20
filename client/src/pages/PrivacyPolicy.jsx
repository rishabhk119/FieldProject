import { useEffect } from 'react'

const POLICY_STYLE = {
  paddingTop: '140px',
  paddingBottom: '100px',
  background: 'var(--dark-950)',
  minHeight: '100vh',
  color: 'var(--text-secondary)',
  lineHeight: '1.8'
}

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={POLICY_STYLE}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '32px' }}>Privacy Policy</h1>
        <p style={{ marginTop: '20px' }}>Last Updated: April 20, 2026</p>
        
        <section style={{ marginTop: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>1. Data Collection</h3>
          <p>Sai Tapovan Ashram (Ubhari Foundation) collects minimal personal data required for donation processing and volunteer registration, including name, email, and PAN details for tax exemption certificates.</p>
        </section>

        <section style={{ marginTop: '30px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>2. Data Usage</h3>
          <p>We do not sell or share your data with third parties. Data is used exclusively for internal administration and providing you with spiritual program updates.</p>
        </section>
      </div>
    </div>
  )
}
