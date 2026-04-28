import { useState, useEffect } from 'react'
import { getCampaigns, createCampaign, deleteCampaign, getSettings, updateSettings, broadcastActivity } from '../../api/admin.api'
import { Plus, Trash2, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function AdminGodMode() {
  const [campaigns, setCampaigns] = useState([])
  const [settings, setSettings] = useState(null)
  
  const [newCampaign, setNewCampaign] = useState({ name: '', goal: '' })
  const [broadcast, setBroadcast] = useState({ message: '', color: '#f97316' })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [campRes, setRes] = await Promise.all([getCampaigns(), getSettings()])
      setCampaigns(campRes.data.data)
      setSettings(setRes.data.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateCampaign = async (e) => {
    e.preventDefault()
    if (!newCampaign.name || !newCampaign.goal) return
    try {
      await createCampaign(newCampaign)
      setNewCampaign({ name: '', goal: '' })
      fetchData()
    } catch (e) {
      alert('Error creating campaign')
    }
  }

  const handleDeleteCampaign = async (id) => {
    if (!window.confirm("Delete this campaign?")) return
    try {
      await deleteCampaign(id)
      fetchData()
    } catch (e) {
      alert('Error deleting campaign')
    }
  }

  const handleToggleSetting = async (key) => {
    try {
      const payload = { [key]: !settings[key] }
      await updateSettings(payload)
      fetchData()
    } catch (e) {
      alert('Error updating setting')
    }
  }

  const handleBroadcast = async (e) => {
    e.preventDefault()
    if (!broadcast.message) return
    try {
      await broadcastActivity(broadcast)
      setBroadcast({ message: '', color: '#f97316' })
      alert("Broadcast sent globally!")
    } catch (e) {
      alert("Failed to broadcast")
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Initializing System Controls...</div>

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      
      {/* 1. Kill Switches */}
      <div className="dash-card" style={{ border: '1px solid #ef4444' }}>
        <div className="dash-card-header" style={{ borderBottomColor: '#ef444433' }}>
          <span className="dash-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444' }}>
            <ShieldAlert size={18} /> Global System Toggles
          </span>
        </div>
        <div className="dash-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: 16 }}>Maintenance Mode</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Locks entire site except for admins</p>
                </div>
                <button 
                  className={`btn-${settings?.maintenanceMode ? 'primary' : 'outline'}`}
                  style={settings?.maintenanceMode ? { background: '#ef4444', boxShadow: '0 0 12px rgba(239,68,68,0.4)' } : {}}
                  onClick={() => handleToggleSetting('maintenanceMode')}
                >
                  {settings?.maintenanceMode ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </div>
            <div className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: 16 }}>Pause Donations</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Disables payment gateway globally</p>
                </div>
                <button 
                  className={`btn-${settings?.donationsPaused ? 'primary' : 'outline'}`}
                  style={settings?.donationsPaused ? { background: '#ef4444', boxShadow: '0 0 12px rgba(239,68,68,0.4)' } : {}}
                  onClick={() => handleToggleSetting('donationsPaused')}
                >
                  {settings?.donationsPaused ? 'ACTIVE' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-two-col">
        {/* 2. Global Broadcast */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={18} color="#f97316"/> Global Broadcast
            </span>
          </div>
          <div className="dash-card-body">
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Push a message instantly to the activity feed of every user on the platform.</p>
            <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input 
                type="text" 
                placeholder="Enter broadcast message..." 
                className="form-input-premium" 
                value={broadcast.message}
                onChange={e => setBroadcast({...broadcast, message: e.target.value})}
                required
              />
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input 
                  type="color" 
                  value={broadcast.color} 
                  onChange={e => setBroadcast({...broadcast, color: e.target.value})}
                  style={{ width: 40, height: 40, border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Push to All Users</button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. Campaign Engine */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Live Campaigns Engine</span>
          </div>
          <div className="dash-card-body" style={{ maxHeight: 400, overflowY: 'auto' }}>
            <form onSubmit={handleCreateCampaign} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <input 
                type="text" placeholder="Campaign Name" className="form-input-premium" style={{ flex: 2, padding: '10px 14px' }}
                value={newCampaign.name} onChange={e => setNewCampaign({...newCampaign, name: e.target.value})} required
              />
              <input 
                type="number" placeholder="Goal (₹)" className="form-input-premium" style={{ flex: 1, padding: '10px 14px' }}
                value={newCampaign.goal} onChange={e => setNewCampaign({...newCampaign, goal: e.target.value})} required
              />
              <button type="submit" className="btn-outline" style={{ padding: '0 14px', color: 'var(--saffron-400)' }}><Plus size={18} /></button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {campaigns.map(c => (
                <div key={c._id} className="glass-card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Goal: ₹{c.goal.toLocaleString()} | Raised: ₹{c.raised.toLocaleString()}</div>
                  </div>
                  <button onClick={() => handleDeleteCampaign(c._id)} className="btn-outline" style={{ padding: 6, color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
