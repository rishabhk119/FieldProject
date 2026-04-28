import { useState, useEffect } from 'react'
import { getUsers, changeUserRole, deleteUser, impersonateUser } from '../../api/admin.api'
import { Trash2, Shield, User as UserIcon, LogIn } from 'lucide-react'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await getUsers()
      setUsers(res.data.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRoleChange = async (id, role) => {
    try {
      await changeUserRole(id, role)
      fetchUsers()
    } catch (e) {
      alert(e.response?.data?.message || 'Error changing role')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await deleteUser(id)
      fetchUsers()
    } catch (e) {
      alert(e.response?.data?.message || 'Error deleting user')
    }
  }

  const handleImpersonate = async (id, name) => {
    if (!window.confirm(`Are you sure you want to impersonate ${name}? Your current session will be replaced.`)) return
    try {
      await impersonateUser(id)
      window.location.href = '/dashboard' // Hard refresh to load new token
    } catch (e) {
      alert(e.response?.data?.message || 'Error impersonating user')
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading users...</div>

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span className="dash-card-title">User Management</span>
      </div>
      <div className="dash-card-body">
        <div className="dash-table-container">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <select 
                      value={u.role} 
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="form-input-premium"
                      style={{ padding: '6px 12px', width: 'auto', display: 'inline-block', marginTop: 0 }}
                    >
                      <option value="donor">Donor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button 
                        onClick={() => handleImpersonate(u._id, u.name)}
                        className="btn-outline"
                        style={{ padding: '6px', color: '#6366f1', borderColor: 'rgba(99,102,241,0.2)' }}
                        title="Impersonate User"
                      >
                        <LogIn size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(u._id)}
                        className="btn-outline"
                        style={{ padding: '6px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
