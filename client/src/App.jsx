import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileTaskbar from './components/MobileTaskbar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import About from './pages/About'
import Seva from './pages/Seva'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Donations from './pages/Donations'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import RefundPolicy from './pages/RefundPolicy'

/* Pages that should NOT show the Navbar/Footer (full-screen layouts) */
const NO_CHROME_ROUTES = ['/login', '/register', '/dashboard']

function AppShell({ children }) {
  const location = useLocation()
  const hideChrome = NO_CHROME_ROUTES.some((r) => location.pathname.startsWith(r))

  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <MobileTaskbar />}
      {!hideChrome && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/seva" element={<Seva />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donations />} />
            <Route path="/programs" element={<Navigate to="/seva" replace />} />
            <Route path="/events" element={<Navigate to="/seva" replace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* Dashboard (Guest-aware) */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </AuthProvider>
    </BrowserRouter>
  )
}
