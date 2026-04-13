import api from './api'

export const getDashboardStats = () => api.get('/dashboard/stats')
export const getRecentActivity = () => api.get('/dashboard/activity')
