import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  LayoutDashboard, IndianRupee, Users, Megaphone, Calendar, 
  Image as ImageIcon, BookOpen, User as UserIcon, Settings, 
  ShieldCheck, FileText, Target, HandHeart, ClipboardList, Flower2, Sprout, ShieldAlert 
} from 'lucide-react'
import { getDashboardStats, getRecentActivity } from '../api/dashboard.api'
import { getMyDonations, downloadReceipt } from '../api/donations.api'
import { getCampaigns } from '../api/admin.api'
import Loader from '../components/Loader'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardTopbar from '../components/DashboardTopbar'
import AdminUsers from '../components/admin/AdminUsers'
import AdminDonations from '../components/admin/AdminDonations'
import AdminContacts from '../components/admin/AdminContacts'
import AdminAnalytics from '../components/admin/AdminAnalytics'
import AdminGodMode from '../components/admin/AdminGodMode'
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
      { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
      { id: 'donations', icon: <IndianRupee size={18} />, label: 'Donations', badge: '' },
      { id: 'volunteers', icon: <Users size={18} />, label: 'Volunteers' },
      { id: 'campaigns', icon: <Megaphone size={18} />, label: 'Campaigns' },
    ],
  },
  {
    label: 'Ashram',
    links: [
      { id: 'events', icon: <Calendar size={18} />, label: 'Events' },
      { id: 'gallery', icon: <ImageIcon size={18} />, label: 'Gallery' },
      { id: 'programs', icon: <BookOpen size={18} />, label: 'Programs' },
    ],
  },
  {
    label: 'Account',
    links: [
      { id: 'profile', icon: <UserIcon size={18} />, label: 'Profile' },
      { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { id: 'privacy', icon: <ShieldCheck size={18} />, label: 'Privacy Policy', path: '/privacy-policy' },
      { id: 'terms', icon: <FileText size={18} />, label: 'Terms of Use', path: '/terms' },
      { id: 'refund', icon: <IndianRupee size={18} />, label: 'Refund Policy', path: '/refund-policy' },
    ],
  },
]

const ADMIN_SECTIONS = [
  {
    label: 'Administration',
    links: [
      { id: 'admin-users', icon: <Users size={18} />, label: 'User Management' },
      { id: 'admin-donations', icon: <IndianRupee size={18} />, label: 'All Donations' },
      { id: 'admin-contacts', icon: <Megaphone size={18} />, label: 'Messages' },
      { id: 'admin-analytics', icon: <Target size={18} />, label: 'Analytics' },
      { id: 'admin-godmode', icon: <ShieldAlert size={18} />, label: 'System Controls' },
    ],
  }
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  
  const [dashboardData, setDashboardData] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [donations, setDonations] = useState([])
  const [campaignsList, setCampaignsList] = useState([])
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
        const [statsRes, activityRes, campRes] = await Promise.all([
          getDashboardStats(),
          getRecentActivity(),
          getCampaigns()
        ])
        setDashboardData(statsRes.data.data)
        setRecentActivity(activityRes.data.data)
        setCampaignsList(campRes.data.data)
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
    { icon: <IndianRupee size={22} />, iconBg: 'rgba(249,115,22,0.12)', label: 'Total Donations', value: dashboardData?.totalDonations || '₹0', trend: '—', trendType: 'neutral' },
    { icon: <Users size={22} />, iconBg: 'rgba(34,197,94,0.12)', label: 'Volunteers', value: dashboardData?.volunteers || '0', trend: '—', trendType: 'neutral' },
    { icon: <Megaphone size={22} />, iconBg: 'rgba(99,102,241,0.12)', label: 'Active Campaigns', value: dashboardData?.activeCampaigns || '0', trend: '—', trendType: 'neutral' },
    { icon: <Target size={22} />, iconBg: 'rgba(236,72,153,0.12)', label: 'Goals Met', value: dashboardData?.goalsMet ? `${dashboardData.goalsMet}%` : '0%', trend: '—', trendType: 'neutral' },
  ]

  const quickActions = [
    { icon: <HandHeart size={20} />, label: 'Make Donation', action: () => navigate('/donate') },
    { icon: <ClipboardList size={20} />, label: 'Public Events', action: () => navigate('/events') },
    { icon: <Users size={20} />, label: 'Volunteer', action: () => setActiveSection('volunteers') },
    { icon: <BookOpen size={20} />, label: 'Ashram Programs', action: () => navigate('/programs') },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'admin-users':
        return <AdminUsers />
      case 'admin-donations':
        return <AdminDonations />
      case 'admin-contacts':
        return <AdminContacts />
      case 'admin-analytics':
        return <AdminAnalytics />
      case 'admin-godmode':
        return <AdminGodMode />
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
                                style={{ fontSize: 11, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                                onClick={() => downloadReceipt(d._id)}
                              >
                                <FileText size={12} /> Receipt
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
            <div className="dash-card-header">
              <span className="dash-card-title">Active Campaigns</span>
              <button className="dash-card-action">View All</button>
            </div>
            <div className="dash-card-body">
              <div style={{ display: 'grid', gap: 24 }}>
                {campaignsList.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No active campaigns at the moment.</p>
                ) : campaignsList.map(c => {
                  const percent = Math.min(Math.round((c.raised / c.goal) * 100), 100)
                  return (
                    <div key={c._id} className="glass-card" style={{ padding: 24, border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h4 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 16 }}>
                          <Sprout size={16} /> {c.name}
                        </h4>
                        <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{percent}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
                        <div style={{ width: `${percent}%`, height: '100%', background: c.color, borderRadius: 3, boxShadow: `0 0 12px ${c.color}66` }} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                        <span>Raised: ₹{c.raised.toLocaleString()}</span>
                        <span>Goal: ₹{c.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })}
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

  const sections = user?.role === 'admin' ? [...ADMIN_SECTIONS, ...NAV_SECTIONS] : NAV_SECTIONS

  return (
    <div className="dashboard-layout">
      <DashboardSidebar 
        user={user} role={role} logout={handleLogout}
        activeSection={activeSection} setActiveSection={setActiveSection}
        NAV_SECTIONS={sections}
      />
      <main className="dash-main">
        <DashboardTopbar user={user} activeSection={activeSection} NAV_SECTIONS={sections} />
        <div className="dash-content">
          <div className="dash-welcome-banner">
            <div className="dash-welcome-text">
              <h2>{user ? `Jai Sai Ram, ${user.name.split(' ')[0]} ` : 'Jai Sai Ram, Guest '}</h2>
              <p>{user ? 'Welcome back to your Ashram portal.' : 'Welcome to the Sai Tapovan Ashram public portal.'}</p>
            </div>
            <div className="dash-welcome-emoji"><Flower2 size={48} color="var(--saffron-500)" /></div>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
