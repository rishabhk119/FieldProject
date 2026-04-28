import { Navigate } from 'react-router-dom'
import { Flower2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        background: 'var(--dark-950)',
      }}>
        <div style={{ animation: 'float 2s ease-in-out infinite', color: 'var(--saffron-500)' }}><Flower2 size={48} /></div>
        <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3, borderColor: 'rgba(249,115,22,0.2)', borderTopColor: 'var(--saffron-500)' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: 14, fontFamily: 'var(--font-serif)' }}>
          Jai Sai Ram...
        </p>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}
