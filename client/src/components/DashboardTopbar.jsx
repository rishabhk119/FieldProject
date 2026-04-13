export default function DashboardTopbar({ user, activeSection, NAV_SECTIONS }) {
  const currentLabel = NAV_SECTIONS
    .flatMap((s) => s.links)
    .find((l) => l.id === activeSection)?.label ?? 'Dashboard';

  return (
    <header className="dash-topbar">
      <div className="dash-topbar-title">
        {currentLabel}
      </div>
      <div className="dash-topbar-right">
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
        <div className="sidebar-avatar" style={{ width: 36, height: 36, fontSize: 14 }}>
          {user?.name?.[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  )
}
