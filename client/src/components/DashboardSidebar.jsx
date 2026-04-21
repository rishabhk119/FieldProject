import { Link } from 'react-router-dom'

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
          <img src="/logo.png" alt="Sai Tapovan Logo" style={{ width: 42, height: 42, objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))' }} />
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
                >
                  <span className="sidebar-icon">{icon}</span>
                  {linkLabel}
                  {path && <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.5 }}>↗</span>}
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
          <span>↩</span> Sign Out
        </button>
      </div>
    </aside>
  )
}
