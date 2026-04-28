import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Flower2, AlertCircle, HandHeart, UserPlus, ArrowLeft, HeartHandshake, Users } from 'lucide-react'
import { registerUser } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

const ROLES = [
  { value: 'donor', icon: <HeartHandshake size={20} />, label: 'Donor' },
  { value: 'volunteer', icon: <Users size={20} />, label: 'Volunteer' },
]

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'donor' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleRole = (role) => {
    setForm((prev) => ({ ...prev, role }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const res = await registerUser(form)
      const { user } = res.data.data
      login(user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      {/* Left - Visual */}
      <div className="auth-left">
        <div className="auth-left-pattern" />
        <div className="auth-left-mandala">
          <Flower2 size={280} />
        </div>
        <div className="auth-left-content">
          <div className="auth-left-badge"><HandHeart size={14} /> Jai Sai Ram</div>
          <h2 className="auth-left-title">
            Begin Your Journey
            <span>at Sai Tapovan</span>
          </h2>
          <p className="auth-left-quote">
            &ldquo;Hands that serve are holier than lips that pray.
            Let your actions speak the language of devotion.&rdquo;
            <br /><br />
            <strong style={{ color: 'var(--saffron-400)', fontStyle: 'normal' }}>— Ubhari Foundation</strong>
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <img src="/logo.png" alt="Sai Tapovan Logo" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', clipPath: 'circle(48%)', filter: 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.5))', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
            <h1 className="auth-form-title">Create Account</h1>
            <p className="auth-form-subtitle">Join the Sai Tapovan family</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="auth-error" role="alert">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="auth-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label>I&apos;m joining as</label>
              <div className="auth-role-grid">
                {ROLES.map(({ value, icon, label }) => (
                  <button
                    key={value}
                    type="button"
                    className={`role-option${form.role === value ? ' active' : ''}`}
                    onClick={() => handleRole(value)}
                    disabled={loading}
                  >
                    <span className="role-icon">{icon}</span>
                    <span className="role-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px', textAlign: 'center' }}>
              By creating an account, you agree to our 
              <Link to="/terms" style={{ color: 'var(--saffron-400)', margin: '0 4px' }}>Terms of Use</Link> 
              and 
              <Link to="/privacy-policy" style={{ color: 'var(--saffron-400)', margin: '0 4px' }}>Privacy Policy</Link>.
            </p>

            <button
              id="register-submit"
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>

          <Link to="/" className="auth-home-link">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="auth-legal-links" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '24px', fontSize: '12px', opacity: 0.6 }}>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refund-policy">Refunds</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
