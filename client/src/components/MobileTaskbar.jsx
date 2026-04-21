import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/mobile-taskbar.css'

export default function MobileTaskbar() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  
  const isActive = (path) => location.pathname === path

  const navItems = [
    { label: 'Home', icon: '🏠', path: '/' },
    { label: 'Seva', icon: '🧘', path: '/seva' },
    { label: 'Donate', icon: '🙏', path: '/donate' },
    { label: 'Account', icon: '👤', path: isAuthenticated ? '/dashboard' : '/login' },
  ]

  return (
    <nav className="mobile-taskbar">
      {navItems.map((item) => (
        <Link 
          key={item.label}
          to={item.path} 
          className={`taskbar-item ${isActive(item.path) ? 'active' : ''}`}
        >
          <span className="taskbar-icon">{item.icon}</span>
          <span className="taskbar-label">{item.label}</span>
          {isActive(item.path) && <div className="taskbar-indicator" />}
        </Link>
      ))}
    </nav>
  )
}
