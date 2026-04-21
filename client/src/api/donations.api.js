import api from './api'

export const getMyDonations = () => api.get('donations/my')

export const downloadReceipt = (donationId) => {
  // We use window.open for direct download behavior
  const url = `${api.defaults.baseURL}/donations/${donationId}/receipt`
  window.open(url, '_blank')
}
