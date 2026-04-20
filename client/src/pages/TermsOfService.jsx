import { useEffect } from 'react'

const POLICY_STYLE = {
  paddingTop: '140px',
  paddingBottom: '100px',
  background: 'var(--dark-950)',
  minHeight: '100vh',
  color: 'var(--text-secondary)',
  lineHeight: '1.8'
}

export default function TermsOfService() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={POLICY_STYLE}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '32px' }}>Terms of Service</h1>
        <p style={{ marginTop: '20px' }}>Last Updated: April 20, 2026</p>
        
        <section style={{ marginTop: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>1. Acceptance of Terms</h3>
          <p>By using the Sai Tapovan Ashram portal, you agree to comply with all ethical and spiritual conduct guidelines of the Ashram while on premises or utilizing our digital services.</p>
        </section>

        <section style={{ marginTop: '30px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>2. Donation Integrity</h3>
          <p>All donations are voluntary. Users should ensure they are the rightful owners of the payment methods used.</p>
        </section>
      </div>
    </div>
  )
}
