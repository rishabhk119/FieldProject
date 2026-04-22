import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom: 16 }}>
              <div className="logo-icon" style={{ fontSize: 22, width: 44, height: 44, animation: 'none' }}>🪷</div>
              <div className="logo-text-block">
                <span className="logo-title" style={{ fontSize: 17 }}>SAI TAPOVAN</span>
                <span className="logo-subtitle">Ashram</span>
              </div>
            </div>
            <p className="footer-tagline">
              A sanctuary of peace, devotion, and selfless service rooted in the eternal teachings of Shirdi Sai Baba.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/ubharifoundation?igsh=b2R4cHluZnhjZ2J0" target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
                📸
              </a>
              <a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-btn" title="Facebook">📘</a>
              <a href="https://www.youtube.com/@ubharifoundation" target="_blank" rel="noopener noreferrer" className="social-btn" title="YouTube">▶️</a>
              <a href="https://wa.me/919763649611" target="_blank" rel="noopener noreferrer" className="social-btn" title="WhatsApp">💬</a>
            </div>

            {/* Trust Badges */}
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <div style={{ border: '1px solid var(--gold-500)', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', color: 'var(--gold-400)', textAlign: 'center', lineHeight: 1.2 }}>
                <span style={{ fontWeight: 'bold', display: 'block' }}>80G</span>
                <span>REG: 2026/UB/80G171</span>
              </div>
              <div style={{ border: '1px solid var(--gold-500)', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', color: 'var(--gold-400)', textAlign: 'center', lineHeight: 1.2 }}>
                <span style={{ fontWeight: 'bold', display: 'block' }}>12A</span>
                <span>REG: IT-SEC4/12A/92</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/seva">Seva & Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="footer-col">
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li><Link to="/donate">Make a Donation</Link></li>
              <li><Link to="/register">Become a Volunteer</Link></li>
              <li><Link to="/seva">Daily Announcements</Link></li>
              <li><Link to="/login">Account Partner</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li><a href="#">📍 Maharashtra, India</a></li>
              <li><a href="tel:+919763649611">📞 +91 97636 49611</a></li>
              <li><a href="mailto:info@ubharifoundation.org">✉️ info@ubharifoundation.org</a></li>
              <li><a href="#">🕐 5:30 AM – 8:30 PM Daily</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} <span>Sai Tapovan Ashram</span> · Ubhari Foundation.
            All rights reserved. 🙏
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/privacy-policy" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Terms of Use</Link>
            <Link to="/refund-policy" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
