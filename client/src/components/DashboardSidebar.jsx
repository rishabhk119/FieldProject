import { Link } from 'react-router-dom'
import { LogOut, ExternalLink } from 'lucide-react'

export default function DashboardSidebar({ 
  user, 
  role, 
  logout, 
  activeSection, 
  setActiveSection, 
  NAV_SECTIONS 
}) {
  return (
    <aside className="dash-sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand" style={{ textDecoration: 'none' }}>
          <img src="/logo.png" alt="Sai Tapovan Logo" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '50%', clipPath: 'circle(48%)', filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.6))' }} />
          <div>
            <div className="sidebar-brand-name">SAI TAPOVAN</div>
            <div className="sidebar-brand-sub">Ashram Portal</div>
          </div>
        </Link>

        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div className="sidebar-username">{user?.name}</div>
            <span
              className="dash-role-badge"
              style={{ background: role.bg, color: role.color }}
            >
              {role.label}
            </span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map(({ label, links }) => (
          <div key={label}>
            <div className="sidebar-section-label">{label}</div>
            {links.map(({ id, icon, label: linkLabel, badge, path }) => {
              const handleClick = () => {
                if (path) {
                  window.open(path, '_blank')
                } else {
                  setActiveSection(id)
                }
              }

              return (
                <button
                  key={id}
                  className={`sidebar-link${activeSection === id ? ' active' : ''}`}
                  onClick={handleClick}
                  style={id.startsWith('admin-') ? { borderLeft: '2px solid var(--saffron-500)', paddingLeft: '12px' } : {}}
                >
                  <span className="sidebar-icon">{icon}</span>
                  {linkLabel}
                  {path && <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
                  {badge !== undefined && (
                    <span className="sidebar-link-badge">{badge || 'New'}</span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button id="logout-btn" className="sidebar-logout" onClick={logout}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
