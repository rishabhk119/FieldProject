import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getDashboardStats, getRecentActivity } from '../api/dashboard.api'
import { getMyDonations, downloadReceipt } from '../api/donations.api'
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
  {
    label: 'Legal',
    links: [
      { id: 'privacy', icon: '🔒', label: 'Privacy Policy', path: '/privacy-policy' },
      { id: 'terms', icon: '📝', label: 'Terms of Use', path: '/terms' },
      { id: 'refund', icon: '💰', label: 'Refund Policy', path: '/refund-policy' },
    ],
  },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  
  const [dashboardData, setDashboardData] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingDonations, setLoadingDonations] = useState(false)

  const fetchDonations = async () => {
    setLoadingDonations(true)
    try {
      const res = await getMyDonations()
      setDonations(res.data.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingDonations(false)
    }
  }

  useEffect(() => {
    if (activeSection === 'donations') fetchDonations()
  }, [activeSection])

  useEffect(() => {
    const fetchDashboardData = async () => {
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
    { icon: '💰', iconBg: 'rgba(249,115,22,0.12)', label: 'Total Donations', value: dashboardData?.totalDonations || '₹0', trend: '—', trendType: 'neutral' },
    { icon: '🤝', iconBg: 'rgba(34,197,94,0.12)', label: 'Volunteers', value: dashboardData?.volunteers || '0', trend: '—', trendType: 'neutral' },
    { icon: '📣', iconBg: 'rgba(99,102,241,0.12)', label: 'Active Campaigns', value: dashboardData?.activeCampaigns || '0', trend: '—', trendType: 'neutral' },
    { icon: '🎯', iconBg: 'rgba(236,72,153,0.12)', label: 'Goals Met', value: dashboardData?.goalsMet ? `${dashboardData.goalsMet}%` : '0%', trend: '—', trendType: 'neutral' },
  ]

  const quickActions = [
    { icon: '🙏', label: 'Make Donation', action: () => navigate('/donate') },
    { icon: '📋', label: 'Public Events', action: () => navigate('/events') },
    { icon: '🤝', label: 'Volunteer', action: () => setActiveSection('volunteers') },
    { icon: '📖', label: 'Ashram Programs', action: () => navigate('/programs') },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'donations':
        return (
          <div className="dash-card" style={{ animation: 'fade-in 0.4s ease' }}>
            <div className="dash-card-header">
              <span className="dash-card-title">Donation History</span>
              <button className="btn-outline" style={{ fontSize: 11, padding: '6px 12px' }} onClick={fetchDonations}>Refresh</button>
            </div>
            <div className="dash-card-body">
              {donations.length > 0 ? (
                <div className="dash-table-container">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((d) => (
                        <tr key={d._id}>
                          <td style={{ fontSize: 13 }}>{new Date(d.createdAt).toLocaleDateString()}</td>
                          <td style={{ fontWeight: 600, color: 'var(--saffron-400)' }}>₹{d.amount}</td>
                          <td>
                            <span className={`dash-status-pill status-${d.status}`}>
                              {d.status}
                            </span>
                          </td>
                          <td>
                            {d.status === 'completed' && (
                              <button 
                                className="btn-primary" 
                                style={{ fontSize: 11, padding: '6px 14px' }}
                                onClick={() => downloadReceipt(d._id)}
                              >
                                📄 Receipt
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
                  {loadingDonations ? 'Loading your contributions...' : 'No donation records found for this account.'}
                </p>
              )}
            </div>
          </div>
        )
      case 'volunteers':
        return (
          <div className="dash-card">
            <div className="dash-card-header"><span className="dash-card-title">Volunteer Network</span></div>
            <div className="dash-card-body"><p style={{ color: 'var(--text-muted)' }}>Registration for the July Seva batch is now open.</p></div>
          </div>
        )
      case 'campaigns':
        return (
          <div className="dash-card">
            <div className="dash-card-header"><span className="dash-card-title">Active Campaigns</span></div>
            <div className="dash-card-body">
              <div style={{ display: 'grid', gap: 20 }}>
                {['Rural Water Project', 'Vedic School Expansion'].map(c => (
                  <div key={c} className="glass-card" style={{ padding: 20, border: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ color: 'var(--saffron-400)', marginBottom: 8 }}>{c}</h4>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Status: Fundraising · Milestone: 65%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'events':
        return (
          <div className="dash-card">
            <div className="dash-card-header"><span className="dash-card-title">Internal Events</span></div>
            <div className="dash-card-body"><p style={{ color: 'var(--text-muted)' }}>Volunteer meets and internal planning sessions will appear here.</p></div>
          </div>
        )
      case 'gallery':
        return (
          <div className="dash-card">
            <div className="dash-card-header"><span className="dash-card-title">Media Management</span></div>
            <div className="dash-card-body"><p style={{ color: 'var(--text-muted)' }}>Upload photos from recent Ashram activities.</p></div>
          </div>
        )
      case 'programs':
        return (
          <div className="dash-card">
            <div className="dash-card-header"><span className="dash-card-title">Course Enrollment</span></div>
            <div className="dash-card-body"><p style={{ color: 'var(--text-muted)' }}>You are not currently enrolled in any spiritual education programs.</p></div>
          </div>
        )
      case 'profile':
      case 'settings':
        return (
          <div className="dash-card">
            <div className="dash-card-header"><span className="dash-card-title">{activeSection === 'profile' ? 'My Profile' : 'Settings'}</span></div>
            <div className="dash-card-body">
              <div style={{ display: 'grid', gap: 20, maxWidth: 400 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Preferred Communication</label>
                  <button className="btn-outline" style={{ fontSize: 12 }}>WhatsApp & Email</button>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Timezone</label>
                  <button className="btn-outline" style={{ fontSize: 12 }}>IST (UTC+5:30)</button>
                </div>
                <button className="btn-primary" style={{ marginTop: 20 }}>Save Changes</button>
              </div>
            </div>
          </div>
        )
      case 'overview':
      default:
        return (
          <>
            {user?.role === 'admin' && (
              <section id="overview">
                <div className="dash-stats-grid">
                  {stats.map(({ icon, iconBg, label, value, trend, trendType }, i) => (
                    <div key={label} className="dash-stat-card" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="dash-stat-top">
                        <div className="dash-stat-icon" style={{ background: iconBg }}>{icon}</div>
                        <span className={`dash-stat-trend trend-${trendType}`}>{trend}</span>
                      </div>
                      <div><div className="dash-stat-value">{value}</div><div className="dash-stat-label">{label}</div></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="dash-two-col">
              <div className="dash-card">
                <div className="dash-card-header"><span className="dash-card-title">Ashram Activity</span></div>
                <div className="dash-card-body">
                  <div className="activity-list">
                    {recentActivity.length > 0 ? (
                      recentActivity.map(({ dot, text, time }, i) => (
                        <div key={`${text}-${i}`} className="activity-item">
                          <div className="activity-dot" style={{ background: dot }} />
                          <div><div className="activity-text">{text}</div><div className="activity-time">{time}</div></div>
                        </div>
                      ))
                    ) : (<p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No recent activity to display.</p>)}
                  </div>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-header"><span className="dash-card-title">Quick Actions</span></div>
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
            <div className="dash-card">
              <div className="dash-card-header"><span className="dash-card-title">Account Details</span></div>
              <div className="dash-card-body">
                <div className="profile-info-list">
                  {[
                    { label: 'Full Name', value: user?.name || 'Guest User' },
                    { label: 'Email', value: user?.email || 'N/A' },
                    { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Not Joined' },
                  ].map(({ label, value }) => (
                    <div key={label} className="profile-info-row">
                      <span className="profile-info-label">{label}</span>
                      <span className="profile-info-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  if (loading) return <Loader fullScreen={true} text="Awakening Dashboard..." />

  return (
    <div className="dashboard-layout">
      <DashboardSidebar 
        user={user} role={role} logout={handleLogout}
        activeSection={activeSection} setActiveSection={setActiveSection}
        NAV_SECTIONS={NAV_SECTIONS}
      />
      <main className="dash-main">
        <DashboardTopbar user={user} activeSection={activeSection} NAV_SECTIONS={NAV_SECTIONS} />
        <div className="dash-content">
          <div className="dash-welcome-banner">
            <div className="dash-welcome-text">
              <h2>{user ? `Jai Sai Ram, ${user.name.split(' ')[0]} 🙏` : 'Jai Sai Ram, Guest 🙏'}</h2>
              <p>{user ? 'Welcome back to your Ashram portal.' : 'Welcome to the Sai Tapovan Ashram public portal.'}</p>
            </div>
            <div className="dash-welcome-emoji">🪷</div>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
