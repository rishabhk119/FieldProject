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
        <h1 className="section-title" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '10px' }}>Terms of Service</h1>
        <p style={{ marginBottom: '40px', fontSize: '14px', color: 'var(--text-muted)' }}>Effective Date: April 20, 2026</p>
        
        <p style={{ marginBottom: '30px' }}>
          Welcome to the Sai Tapovan Ashram digital portal. By accessing this website, you agree to be bound by these Terms of Service 
          and all applicable laws and regulations of the Republic of India.
        </p>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>1. Use of Content</h3>
          <p>
            All spiritual content, including text, images, and audio/video material on this site, is the intellectual property of 
            Ubhari Foundation. You may use this for personal, non-commercial spiritual growth but may not redistribute, 
            modify, or use it for commercial purposes without written consent.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>2. Donation Policy</h3>
          <p>
            Donations made through this portal are voluntary and non-refundable (subject to our Refund Policy). 
            Donors are responsible for providing accurate information for the issuance of 80G tax exemption certificates. 
            All donations are processed in Indian Rupees (INR).
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>3. User Conduct</h3>
          <p>
            Users agree to use the portal in a manner consistent with the spiritual and ethical values of Sai Tapovan Ashram. 
            Any attempt to disrupt services, upload malicious code, or misrepresent identity will result in immediate termination 
            of access and potential legal action.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>4. Limitation of Liability</h3>
          <p>
            Sai Tapovan Ashram and Ubhari Foundation shall not be liable for any direct, indirect, incidental, or consequential damages 
            resulting from the use or inability to use our digital services or any unauthorized access to your data.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', fontFamily: 'var(--font-display)' }}>5. Governing Law</h3>
          <p>These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Maharashtra/Bengaluru.</p>
        </section>
      </div>
    </div>
  )
}
