import { useEffect } from 'react'

const POLICY_STYLE = {
  paddingTop: '140px',
  paddingBottom: '100px',
  background: 'var(--dark-950)',
  minHeight: '100vh',
  color: 'var(--text-secondary)',
  lineHeight: '1.8'
}

export default function RefundPolicy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={POLICY_STYLE}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '32px' }}>Refund & Cancellation</h1>
        <p style={{ marginTop: '20px' }}>Last Updated: April 20, 2026</p>
        
        <section style={{ marginTop: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>1. Donation Refunds</h3>
          <p>Donations made to Sai Tapovan Ashram (Ubhari Foundation) are non-refundable as they are used immediately for Seva activities (Annadan, Healthcare). In case of a technical double-charge, please contact us within 48 hours for a reconciliation.</p>
        </section>

        <section style={{ marginTop: '30px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>2. Event Cancellations</h3>
          <p>Registration fees for residential retreats are refundable up to 7 days before the event start date, minus a 10% administrative fee.</p>
        </section>
      </div>
    </div>
  )
}
