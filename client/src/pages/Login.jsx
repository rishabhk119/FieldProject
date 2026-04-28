import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Flower2, AlertCircle, HandHeart, LogIn, ArrowLeft } from 'lucide-react'
import { loginUser } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
import '../styles/auth.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const res = await loginUser(form)
      const { user } = res.data.data
      login(user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
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
            Welcome Back to
            <span>Sai Tapovan</span>
          </h2>
          <p className="auth-left-quote">
            &ldquo;Before you speak, listen. Before you write, think. Before you spend, earn.
            Before you pray, forgive.&rdquo;
            <br /><br />
            <strong style={{ color: 'var(--saffron-400)', fontStyle: 'normal' }}>— Shirdi Sai Baba</strong>
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <img src="/logo.png" alt="Sai Tapovan Logo" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', clipPath: 'circle(48%)', filter: 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.5))', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
            <h1 className="auth-form-title">Sign In</h1>
            <p className="auth-form-subtitle">Access your Sai Tapovan account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="auth-error" role="alert">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account?{' '}
            <Link to="/register">Create one</Link>
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
