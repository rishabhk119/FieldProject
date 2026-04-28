import { Link } from 'react-router-dom'
import { MessageCircle, MapPin, Phone, Mail, Clock, HandHeart } from 'lucide-react'
import VedicCalendar from './VedicCalendar'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom: 16 }}>
              <img src="/logo.png" alt="Sai Tapovan Logo" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '50%', clipPath: 'circle(48%)', filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.6))' }} />
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="http://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-btn" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.youtube.com/@ubharifoundation" target="_blank" rel="noopener noreferrer" className="social-btn" title="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://wa.me/919763649611" target="_blank" rel="noopener noreferrer" className="social-btn" title="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </div>

            {/* Trust Badges */}
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <div className="trust-badge-footer">
                <span className="badge-label">80G</span>
                <span className="badge-value">REG: 2026/UB/80G171</span>
              </div>
              <div className="trust-badge-footer">
                <span className="badge-label">12A</span>
                <span className="badge-value">REG: IT-SEC4/12A/92</span>
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
              <li><a href="#"><MapPin size={14} className="footer-icon-inline" /> Maharashtra, India</a></li>
              <li><a href="tel:+919763649611"><Phone size={14} className="footer-icon-inline" /> +91 97636 49611</a></li>
              <li><a href="mailto:info@ubharifoundation.org"><Mail size={14} className="footer-icon-inline" /> info@ubharifoundation.org</a></li>
              <li><a href="#"><Clock size={14} className="footer-icon-inline" /> 5:30 AM – 8:30 PM Daily</a></li>
            </ul>
          </div>

          {/* Vedic Calendar */}
          <div className="footer-col" style={{ gridColumn: 'span 1' }}>
            <VedicCalendar />
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} <span>Sai Tapovan Ashram</span> · Ubhari Foundation.
            All rights reserved. <HandHeart size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4, color: 'var(--saffron-500)' }} />
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
