import { useEffect } from 'react'
import '../styles/home.css'

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="contact-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding)', textAlign: 'center' }}>
        <span className="section-eyebrow">Connect With Us</span>
        <h1 className="section-title">Get In Touch</h1>
      </section>

      <section style={{ padding: '0 20px 100px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {/* Info Cards */}
        <div style={{ display: 'grid', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ color: 'var(--saffron-400)', marginBottom: '15px' }}>📍 Ashram Address</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Sai Tapovan Ashram, Whitefield Main Road,<br />
              Near HP Campus, Bengaluru,<br />
              Karnataka 560066, India
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ color: 'var(--saffron-400)', marginBottom: '15px' }}>📞 Contact Details</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>Phone: +91 98765 43210</p>
            <p style={{ color: 'var(--text-secondary)' }}>Email: contact@saitapovan.org</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card" style={{ padding: '40px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '25px', color: 'var(--text-primary)' }}>Send us a Message</h3>
          <div style={{ display: 'grid', gap: '20px' }}>
            <input type="text" placeholder="Your Name" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', padding: '15px', borderRadius: '8px', color: 'white' }} />
            <input type="email" placeholder="Your Email" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', padding: '15px', borderRadius: '8px', color: 'white' }} />
            <textarea placeholder="Your Message" rows="4" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', padding: '15px', borderRadius: '8px', color: 'white' }}></textarea>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
          </div>
        </div>
      </section>
    </div>
  )
}
