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
        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '10px' }}>Refund & Cancellation</h1>
        <p style={{ marginBottom: '40px', fontSize: '14px', color: 'var(--text-muted)' }}>Effective Date: April 20, 2026</p>
        
        <p style={{ marginBottom: '30px' }}>
          At Sai Tapovan Ashram (Ubhari Foundation), we strive to ensure a smooth experience for our devotees and donors. 
          Please read our refund and cancellation policies carefully.
        </p>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>1. Donation Refunds</h3>
          <p>
            As per the Indian Trust Act, donations once made towards a charitable cause are generally non-refundable. 
            Once a donation is processed, the funds are immediately allocated to our active Seva programs (Annadan, Healthcare, Education).
          </p>
          <p style={{ marginTop: '10px' }}>
            <strong>Exceptions:</strong> In the event of a technical error (e.g., double-charge or unauthorized transaction), 
            donors must notify us at info@ubharifoundation.org within 48 hours. Upon verification, the refund will be processed 
            within 7-10 working days via the original payment method.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>2. Spiritual Retreats & Workshops</h3>
          <p>Registration fees for residential programs at the Ashram are subject to the following cancellation terms:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li><strong>7+ Days Before Start:</strong> 90% refund (10% administrative fee deducted).</li>
            <li><strong>3-7 Days Before Start:</strong> 50% refund.</li>
            <li><strong>Less than 3 Days:</strong> No refund possible due to prior logistical arrangements.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>3. General Provisions</h3>
          <p>
            Any approved refund will be credited back to the original source of payment. For international donations, 
            currency conversion rates at the time of refund will apply, and we are not liable for any bank-side 
            transaction fees or losses due to exchange rate fluctuations.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>4. Contact for Grievances</h3>
          <p>For any issues related to payments, please reach out to our Finance Department at finance@saitapovan.org with your transaction ID.</p>
        </section>
      </div>
    </div>
  )
}
