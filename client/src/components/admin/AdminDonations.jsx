import { useState, useEffect } from 'react'
import { getAllDonations, overrideDonationStatus } from '../../api/admin.api'
import { downloadReceipt } from '../../api/donations.api'
import { FileText, Edit2 } from 'lucide-react'

export default function AdminDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDonations = async () => {
    try {
      const res = await getAllDonations()
      setDonations(res.data.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  const handleOverride = async (id, currentStatus) => {
    const newStatus = prompt(`Override status for this donation?\nCurrent: ${currentStatus}\nEnter new status (completed, pending, failed):`, currentStatus)
    if (!newStatus || newStatus === currentStatus) return
    if (!['completed', 'pending', 'failed'].includes(newStatus)) return alert("Invalid status")
    
    try {
      await overrideDonationStatus(id, newStatus)
      fetchDonations()
    } catch (e) {
      alert(e.response?.data?.message || 'Error overriding donation')
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading donations...</div>

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span className="dash-card-title">All Donations</span>
      </div>
      <div className="dash-card-body">
        <div className="dash-table-container">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Donor</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d._id}>
                  <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td>
                    {d.donor ? (
                      <div>
                        <div style={{ fontWeight: 600 }}>{d.donor.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.donor.email}</div>
                      </div>
                    ) : 'Guest'}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--saffron-400)' }}>₹{d.amount}</td>
                  <td style={{ textTransform: 'capitalize' }}>{d.type.replace('_', ' ')}</td>
                  <td>
                    <span className={`dash-status-pill status-${d.status}`}>
                      {d.status}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button 
                      className="btn-outline"
                      style={{ padding: '6px', fontSize: 11 }}
                      onClick={() => handleOverride(d._id, d.status)}
                      title="Override Status"
                    >
                      <Edit2 size={12} />
                    </button>
                    {d.status === 'completed' && (
                      <button 
                        className="btn-outline"
                        style={{ padding: '6px 12px', fontSize: 11, display: 'flex', alignItems: 'center', gap: '6px' }}
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
      </div>
    </div>
  )
}
