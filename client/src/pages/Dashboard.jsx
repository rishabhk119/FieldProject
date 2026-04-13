import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getDashboardStats, getRecentActivity } from '../api/dashboard.api'
import Loader from '../components/Loader'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardTopbar from '../components/DashboardTopbar'
import '../styles/dashboard.css'

const ROLE_CONFIG = {
  admin: { label: 'Admin', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  donor: { label: 'Donor', color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  volunteer: { label: 'Volunteer', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
}

const NAV_SECTIONS = [
  {
    label: 'Main',
    links: [
      { id: 'overview', icon: '🏠', label: 'Overview' },
      { id: 'donations', icon: '💰', label: 'Donations', badge: '' },
      { id: 'volunteers', icon: '🤝', label: 'Volunteers' },
      { id: 'campaigns', icon: '📣', label: 'Campaigns' },
    ],
  },
  {
    label: 'Ashram',
    links: [
      { id: 'events', icon: '📅', label: 'Events' },
      { id: 'gallery', icon: '🖼️', label: 'Gallery' },
      { id: 'programs', icon: '📚', label: 'Programs' },
    ],
  },
  {
    label: 'Account',
    links: [
      { id: 'profile', icon: '👤', label: 'Profile' },
      { id: 'settings', icon: '⚙️', label: 'Settings' },
    ],
  },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  
  // Dashboard State
  const [dashboardData, setDashboardData] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Role Based Access: Only admins fetch site-wide stats
      if (user?.role !== 'admin') {
        setLoading(false)
        return
      }

      try {
        const [statsRes, activityRes] = await Promise.all([
          getDashboardStats(),
          getRecentActivity()
        ])
        
        setDashboardData(statsRes.data.data)
        setRecentActivity(activityRes.data.data)
      } catch (error) {
        console.error("Failed to load dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const role = ROLE_CONFIG[user?.role] ?? ROLE_CONFIG.donor

  const stats = [
    {
      icon: '💰',
      iconBg: 'rgba(249,115,22,0.12)',
      label: 'Total Donations',
      value: dashboardData?.totalDonations ? dashboardData.totalDonations : '₹0',
      trend: '—',
      trendType: 'neutral',
    },
    {
      icon: '🤝',
      iconBg: 'rgba(34,197,94,0.12)',
      label: 'Volunteers',
      value: dashboardData?.volunteers || '0',
      trend: '—',
      trendType: 'neutral',
    },
    {
      icon: '📣',
      iconBg: 'rgba(99,102,241,0.12)',
      label: 'Active Campaigns',
      value: dashboardData?.activeCampaigns || '0',
      trend: '—',
      trendType: 'neutral',
    },
    {
      icon: '🎯',
      iconBg: 'rgba(236,72,153,0.12)',
      label: 'Goals Met',
      value: dashboardData?.goalsMet ? `${dashboardData.goalsMet}%` : '0%',
      trend: '—',
      trendType: 'neutral',
    },
  ]

  const quickActions = [
    { icon: '🙏', label: 'Make Donation', action: () => navigate('/donate') },
    { icon: '📋', label: 'Register Event', action: () => navigate('/events') },
    { icon: '🤝', label: 'Volunteer', action: () => navigate('/volunteer') },
    { icon: '📖', label: 'Programs', action: () => navigate('/programs') },
  ]

  if (loading) {
    return <Loader fullScreen={true} text="Awakening Dashboard..." />
  }

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ──────────────────────────────────── */}
      <DashboardSidebar 
        user={user}
        role={role}
        logout={handleLogout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        NAV_SECTIONS={NAV_SECTIONS}
      />

      {/* ── Main ────────────────────────────────────── */}
      <main className="dash-main">
        {/* Topbar */}
        <DashboardTopbar 
          user={user}
          activeSection={activeSection}
          NAV_SECTIONS={NAV_SECTIONS}
        />

        {/* Content */}
        <div className="dash-content">
          {/* Welcome Banner */}
          <div className="dash-welcome-banner">
            <div className="dash-welcome-text">
              <h2>Jai Sai Ram, {user?.name?.split(' ')[0]} 🙏</h2>
              <p>
                Welcome to the Sai Tapovan Ashram portal. Here&apos;s your dashboard overview.
              </p>
            </div>
            <div className="dash-welcome-emoji">🪷</div>
          </div>

          {/* Stats - Admin Only */}
          {user?.role === 'admin' && (
            <section id="overview">
              <div className="dash-stats-grid">
                {stats.map(({ icon, iconBg, label, value, trend, trendType }, i) => (
                  <div
                    key={label}
                    className="dash-stat-card"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="dash-stat-top">
                      <div className="dash-stat-icon" style={{ background: iconBg }}>
                        {icon}
                      </div>
                      <span className={`dash-stat-trend trend-${trendType}`}>
                        {trend}
                      </span>
                    </div>
                    <div>
                      <div className="dash-stat-value">{value}</div>
                      <div className="dash-stat-label">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Two-column section */}
          <div className="dash-two-col">
            {/* Recent Activity - Admin Only */}
            {user?.role === 'admin' ? (
              <div className="dash-card">
                <div className="dash-card-header">
                  <span className="dash-card-title">Recent Activity</span>
                  <button className="dash-card-action">View all</button>
                </div>
                <div className="dash-card-body">
                  <div className="activity-list">
                    {recentActivity.map(({ dot, text, time }) => (
                      <div key={text} className="activity-item">
                        <div className="activity-dot" style={{ background: dot }} />
                        <div>
                          <div className="activity-text">{text}</div>
                          <div className="activity-time">{time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="dash-card">
                <div className="dash-card-header">
                  <span className="dash-card-title">Welcome Message</span>
                </div>
                <div className="dash-card-body" style={{ color: 'var(--text-muted)' }}>
                  As a {role.label}, your contributions help the Ashram thrive. Use the Quick Actions to get involved or view your profile details below.
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="dash-card">
              <div className="dash-card-header">
                <span className="dash-card-title">Quick Actions</span>
              </div>
              <div className="dash-card-body">
                <div className="quick-actions">
                  {quickActions.map(({ icon, label, action }) => (
                    <button key={label} className="quick-action-btn" onClick={action}>
                      <span className="quick-action-icon">{icon}</span>
                      <span className="quick-action-label">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="dash-card-title">Account Details</span>
              <button className="dash-card-action">Edit Profile</button>
            </div>
            <div className="dash-card-body">
              <div className="profile-info-list">
                {[
                  { label: 'Full Name', value: user?.name },
                  { label: 'Email', value: user?.email },
                  { label: 'Role', value: (
                    <span
                      className="dash-role-badge"
                      style={{ background: role.bg, color: role.color }}
                    >
                      {role.label}
                    </span>
                  )},
                  { label: 'Member ID', value: user?.id, mono: true },
                  { label: 'Member Since', value: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) },
                ].map(({ label, value, mono }) => (
                  <div key={label} className="profile-info-row">
                    <span className="profile-info-label">{label}</span>
                    <span className={`profile-info-value${mono ? ' mono' : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
