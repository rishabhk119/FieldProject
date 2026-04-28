import { useState, useEffect } from 'react'
import { getContacts, updateContactStatus, deleteContact } from '../../api/contact.api'
import { Trash2, MessageSquare, Check, Mail } from 'lucide-react'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchContacts = async () => {
    try {
      const res = await getContacts()
      setContacts(res.data.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await updateContactStatus(id, status)
      fetchContacts()
    } catch (e) {
      alert(e.response?.data?.message || 'Error updating status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return
    try {
      await deleteContact(id)
      fetchContacts()
    } catch (e) {
      alert(e.response?.data?.message || 'Error deleting message')
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading messages...</div>

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span className="dash-card-title">Contact Messages</span>
      </div>
      <div className="dash-card-body">
        <div style={{ display: 'grid', gap: 16 }}>
          {contacts.map(c => (
            <div key={c._id} className="glass-card" style={{ padding: 20, borderLeft: c.status === 'new' ? '4px solid var(--saffron-500)' : '' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h4 style={{ fontSize: 16, marginBottom: 4 }}>{c.subject}</h4>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 16 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><UserIcon size={12}/> {c.name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12}/> {c.email}</span>
                    <span>{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <select 
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    className="form-input-premium"
                    style={{ padding: '4px 8px', fontSize: 12, marginTop: 0, width: 'auto' }}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button onClick={() => handleDelete(c._id)} className="btn-outline" style={{ padding: 6, color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 8, fontSize: 14, whiteSpace: 'pre-wrap' }}>
                {c.message}
              </div>
            </div>
          ))}
          {contacts.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No messages found.</p>}
        </div>
      </div>
    </div>
  )
}

function UserIcon({size}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
