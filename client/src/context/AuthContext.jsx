import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, logoutUser } from '../api/auth.api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, verify auth with server
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await getMe()
        setUser(res.data.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const login = (userData) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch (e) {
      // Ignore errors on logout
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
