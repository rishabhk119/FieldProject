import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

const ROLES = [
  { value: 'donor', icon: '🙏', label: 'Donor' },
  { value: 'volunteer', icon: '🤝', label: 'Volunteer' },
  { value: 'admin', icon: '⚙️', label: 'Admin' },
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
      const { user, token } = res.data.data
      login(user, token)
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
        <div className="auth-left-mandala">☸️</div>
        <div className="auth-left-content">
          <div className="auth-left-badge">🪷 Join Our Community</div>
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
            <div className="auth-logo-mark">☸️</div>
            <h1 className="auth-form-title">Create Account</h1>
            <p className="auth-form-subtitle">Join the Sai Tapovan family</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="auth-error" role="alert">
                <span>⚠️</span>
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

            <button
              id="register-submit"
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : '🌸 Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>

          <Link to="/" className="auth-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
