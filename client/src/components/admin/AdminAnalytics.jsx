import { useState, useEffect } from 'react'
import { getAnalytics } from '../../api/admin.api'
import { Activity, Users, IndianRupee, MessageSquare, TrendingUp } from 'lucide-react'

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics()
        setData(res.data.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading analytics...</div>

  const completedDonations = data.donations.byStatus.find(s => s._id === 'completed')

  return (
    <div>
      <div className="dash-stats-grid" style={{ marginBottom: 24 }}>
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon" style={{ background: 'rgba(249,115,22,0.12)' }}><Users size={22} color="var(--saffron-500)"/></div>
          </div>
          <div><div className="dash-stat-value">{data.users.total}</div><div className="dash-stat-label">Total Users</div></div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon" style={{ background: 'rgba(34,197,94,0.12)' }}><IndianRupee size={22} color="var(--forest-400)"/></div>
          </div>
          <div><div className="dash-stat-value">₹{completedDonations?.total || 0}</div><div className="dash-stat-label">Total Raised</div></div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon" style={{ background: 'rgba(99,102,241,0.12)' }}><TrendingUp size={22} color="#6366f1"/></div>
          </div>
          <div><div className="dash-stat-value">{completedDonations?.count || 0}</div><div className="dash-stat-label">Successful Donations</div></div>
        </div>
        <div className="dash-stat-card">
          <div className="dash-stat-top">
            <div className="dash-stat-icon" style={{ background: 'rgba(236,72,153,0.12)' }}><MessageSquare size={22} color="#ec4899"/></div>
          </div>
          <div>
            <div className="dash-stat-value">
              {data.contacts.reduce((acc, curr) => acc + curr.count, 0)}
            </div>
            <div className="dash-stat-label">Messages Received</div>
          </div>
        </div>
      </div>

      <div className="dash-two-col">
        <div className="dash-card">
          <div className="dash-card-header"><span className="dash-card-title">Donations by Type</span></div>
          <div className="dash-card-body">
             {data.donations.byType.map(t => (
               <div key={t._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                 <span style={{ textTransform: 'capitalize' }}>{t._id.replace('_', ' ')}</span>
                 <span style={{ fontWeight: 600, color: 'var(--saffron-400)' }}>₹{t.total} ({t.count} donations)</span>
               </div>
             ))}
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card-header"><span className="dash-card-title">User Roles</span></div>
          <div className="dash-card-body">
             {data.users.byRole.map(r => (
               <div key={r._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                 <span style={{ textTransform: 'capitalize' }}>{r._id}</span>
                 <span style={{ fontWeight: 600 }}>{r.count} users</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}
