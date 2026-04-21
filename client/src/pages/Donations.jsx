import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'
import '../styles/home.css'

function Reveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      filter: visible ? 'blur(0px)' : 'blur(10px)',
      transform: visible ? 'none' : direction === 'up' ? 'translateY(40px)' : 'scale(0.95)',
      transition: `all 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`
    }}>{children}</div>
  )
}

export default function Donations() {
  const [amount, setAmount] = useState('1000')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    // Load Razorpay Script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { if (document.body.contains(script)) document.body.removeChild(script) }
  }, [])

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      const { data } = await api.post('donations/create-order', {
        amount: Number(amount),
        currency: 'INR',
        type: 'general'
      })

      const options = {
        key: 'rzp_test_SfVPoQsLmK2Y4y',
        amount: data.data.amount,
        currency: 'INR',
        name: 'Sai Tapovan Ashram',
        description: 'Sacred Donation / Seva',
        order_id: data.data.id,
        handler: async function (response) {
          try {
            await api.post('donations/verify', response)
            alert('🙏 Jai Sai Ram! Donation successful. Thank you for your kindness.')
          } catch (e) {
            alert('Verification failed. Please contact support.')
          }
        },
        prefill: {
          name: 'Ashram Devotee',
          email: 'devotee@example.com'
        },
        theme: {
          color: '#f97316'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
       console.error(error)
       alert('Transaction initiation failed.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="donation-page" style={{ paddingTop: '120px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: '40px 20px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <span className="section-eyebrow">Abhaya Dana</span>
          <h1 className="section-title" style={{ marginTop: 12 }}>Pure Intent, <span style={{ color: 'var(--saffron-500)' }}>Great Impact</span></h1>
          <p className="section-subtitle" style={{ marginTop: '24px', marginInline: 'auto' }}>
            Your contribution supports our continuous Seva programs including daily Annadan, 
            Vedic education, and free healthcare for the rural community.
          </p>
        </Reveal>

        <Reveal delay={0.2} direction="scale">
          <div className="glass-card" style={{ marginTop: '60px', padding: '60px', textAlign: 'left', borderTop: '4px solid var(--saffron-500)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 32, color: 'var(--text-primary)' }}>Select Contribution Amount</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {['501', '1001', '2501', '5001', '11000'].map(val => (
                <button 
                  key={val}
                  onClick={() => setAmount(val)}
                  style={{ 
                    padding: '20px', 
                    borderRadius: '16px', 
                    border: amount === val ? '1px solid var(--saffron-500)' : '1px solid var(--border-subtle)',
                    background: amount === val ? 'rgba(249, 115, 22, 0.1)' : 'rgba(255,255,255,0.02)',
                    color: amount === val ? 'var(--saffron-400)' : 'var(--text-secondary)',
                    fontWeight: '700',
                    transition: '0.2s',
                    fontSize: 18
                  }}
                >
                  ₹{val}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', marginBottom: 40 }}>
               <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 24, color: 'var(--text-muted)' }}>₹</span>
               <input 
                type="number" 
                placeholder="Enter Custom Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '24px 24px 24px 45px', 
                  background: 'rgba(0,0,0,0.4)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '22px',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', height: 64, fontSize: '20px', letterSpacing: '0.05em' }}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? <span className="spinner" /> : '🙏 PROCEED TO SECURE PAYMENT'}
            </button>
            
            <div style={{ marginTop: 40, borderTop: '1px solid var(--border-subtle)', paddingTop: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                 <div style={{ width: 40, height: 40, background: 'rgba(212,160,23,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-400)' }}>🛡️</div>
                 <div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>Razorpay Secure</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>256-bit SSL Encryption</div>
                 </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
                <Link to="/refund-policy" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Refund Policy</Link>
                <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
