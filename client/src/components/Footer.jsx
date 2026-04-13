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
              <a href="https://www.instagram.com/sai_tapovan_ashram" target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
                📸
              </a>
              <a href="#" className="social-btn" title="Facebook">📘</a>
              <a href="#" className="social-btn" title="YouTube">▶️</a>
              <a href="#" className="social-btn" title="WhatsApp">💬</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="footer-col">
            <h4>Get Involved</h4>
            <ul className="footer-links">
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/register">Volunteer</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li><a href="#">📍 Maharashtra, India</a></li>
              <li><a href="tel:+919876543210">📞 +91 98765 43210</a></li>
              <li><a href="mailto:info@saitapovan.org">✉️ info@saitapovan.org</a></li>
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
            <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--saffron-400)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}>
              Privacy Policy
            </a>
            <a href="#" style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--saffron-400)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}>
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
