import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Sparkles, HandHeart } from 'lucide-react'
import '../styles/navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Seva & Events', href: '/seva' },
  { label: 'Donation', href: '/donate' },
  { label: 'Volunteer', href: '/register' },
  { label: 'Gallery', href: '/gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location])

  const isActive = (href) => location.pathname === href

  return (
    <>
      {/* ── GLOBAL MANTRA TICKER ─────────────────────────── */}
      <div className="mantra-ticker-fixed">
        <div className="mantra-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mantra-item">
              ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥ 
              <Sparkles size={14} className="mantra-sep" />
              सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
              <Sparkles size={14} className="mantra-sep" />
            </span>
          ))}
        </div>
      </div>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img src="/logo.png" alt="Sai Tapovan Logo" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '50%', clipPath: 'circle(48%)', filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.6))' }} />
            <div className="logo-text-block">
              <span className="logo-title">SAI TAPOVAN</span>
              <span className="logo-subtitle">Ashram · Est. 1995</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="navbar-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  className={`nav-link-aesthetic ${isActive(href) ? 'active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <button
                className="navbar-btn"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  className="navbar-login"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
                <button
                  className="navbar-btn"
                  onClick={() => navigate('/donate')}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <HandHeart size={18} /> Donate
                </button>
              </>
            )}

            {/* Hamburger */}
            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '', transition: '0.2s' }} />
              <span style={{ opacity: mobileOpen ? 0 : 1, transition: '0.2s' }} />
              <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '', transition: '0.2s' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className={isActive(href) ? 'active' : ''}
          >
            {label}
          </Link>
        ))}
        <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
          {isAuthenticated ? (
            <button className="navbar-btn" style={{ flex: 1 }} onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
          ) : (
            <>
              <button className="navbar-login" style={{ flex: 1 }} onClick={() => navigate('/login')}>
                Sign In
              </button>
              <button className="navbar-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => navigate('/donate')}>
                <HandHeart size={18} /> Donate
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
