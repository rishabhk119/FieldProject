import api from './api'

// Users
export const getUsers = (params) => api.get('/admin/users', { params })
export const changeUserRole = (id, role) => api.patch(`/admin/users/${id}/role`, { role })
export const deleteUser = (id) => api.delete(`/admin/users/${id}`)

// Donations (all)
export const getAllDonations = (params) => api.get('/admin/donations', { params })

// Analytics
export const getAnalytics = () => api.get('/admin/analytics')

// --- GOD MODE ---
export const impersonateUser = (id) => api.post(`/admin/impersonate/${id}`)
export const overrideDonationStatus = (id, status) => api.patch(`/admin/donations/${id}/override`, { status })
export const broadcastActivity = (data) => api.post('/admin/broadcast', data)

export const getCampaigns = () => api.get('/admin/campaigns')
export const createCampaign = (data) => api.post('/admin/campaigns', data)
export const updateCampaign = (id, data) => api.patch(`/admin/campaigns/${id}`, data)
export const deleteCampaign = (id) => api.delete(`/admin/campaigns/${id}`)

export const getSettings = () => api.get('/admin/settings')
export const updateSettings = (data) => api.patch('/admin/settings', data)
