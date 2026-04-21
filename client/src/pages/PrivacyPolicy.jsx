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
        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '10px' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '40px', fontSize: '14px', color: 'var(--text-muted)' }}>Effective Date: April 20, 2026</p>
        
        <p style={{ marginBottom: '30px' }}>
          Sai Tapovan Ashram (a unit of Ubhari Foundation) is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our portal or make a donation.
        </p>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>1. Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li><strong>Personal Identifiers:</strong> Name, address, and contact details.</li>
            <li><strong>Financial Information:</strong> Payment details (processed securely via Razorpay), PAN number for tax-exemption receipts.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>2. How We Use Your Data</h3>
          <p>Your data is used solely for the following purposes:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>Processing donations and issuing 80G tax exemption certificates.</li>
            <li>Communicating ashram updates, event invitations, and spiritual programs.</li>
            <li>Maintaining internal records for legal and audit compliance in accordance with Indian Law.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>3. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your data. All financial transactions are encrypted 
            and handled by authorized payment gateways. We do not store credit card or bank login information on our servers.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>4. Third-Party Sharing</h3>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties 
            except for trusted third parties who assist us in operating our website and conducting our business, 
            so long as those parties agree to keep this information confidential.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>5. Contact Us</h3>
          <p>If you have any questions regarding this privacy policy, you may contact our Grievance Officer at info@saitapovan.org.</p>
        </section>
      </div>
    </div>
  )
}
