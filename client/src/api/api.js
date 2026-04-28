import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Remove token interceptor entirely as we now use HttpOnly cookies

// Handle 401 globally — only redirect from protected routes (dashboard)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const path = window.location.pathname
      // Only redirect if user is on a protected route, not public pages
      if (path.startsWith('/dashboard')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api
