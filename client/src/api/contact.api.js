import api from './api'

export const submitContact = (data) => api.post('/contacts', data)
export const getContacts = (params) => api.get('/contacts', { params })
export const updateContactStatus = (id, status) => api.patch(`/contacts/${id}/status`, { status })
export const deleteContact = (id) => api.delete(`/contacts/${id}`)
