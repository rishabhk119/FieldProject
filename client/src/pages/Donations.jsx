import { useState, useEffect } from 'react'
import api from '../api/api'
import '../styles/home.css'

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
    return () => document.body.removeChild(script)
  }, [])

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // 1. Create Order on Backend
      const { data } = await api.post('donations/create-order', {
        amount: Number(amount),
        currency: 'INR'
      })

      const options = {
        key: 'rzp_test_SfVPoQsLmK2Y4y', // Updated with provided test key
        amount: data.data.amount,
        currency: 'INR',
        name: 'Sai Tapovan Ashram',
        description: 'Sacred Donation / Seva',
        order_id: data.data.id,
        handler: async function (response) {
          // 2. Verify Payment on Backend
          try {
            await api.post('donations/verify', response)
            alert('Jai Sai Ram! Donation successful. Thank you for your kindness.')
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
      alert('Failed to initiate payment. Check console.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="donation-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding)', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <span className="section-eyebrow">Annadan & Seva</span>
        <h1 className="section-title">Support Our Mission</h1>
        <p className="section-subtitle" style={{ marginTop: '20px' }}>
          Every contribution, large or small, helps us provide food, shelter, and medical care to those in need.
        </p>

        <div className="glass-card" style={{ marginTop: '60px', padding: '40px', textAlign: 'left' }}>
          <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '12px', fontSize: '14px' }}>Select Donation Amount (₹)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {['501', '1001', '5001'].map(val => (
              <button 
                key={val}
                onClick={() => setAmount(val)}
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: amount === val ? '1px solid var(--saffron-500)' : '1px solid var(--border-subtle)',
                  background: amount === val ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                  color: amount === val ? 'var(--saffron-400)' : 'var(--text-primary)',
                  fontWeight: '600'
                }}
              >
                ₹{val}
              </button>
            ))}
          </div>

          <input 
            type="number" 
            placeholder="Custom Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: 'rgba(0,0,0,0.2)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '12px',
              color: 'white',
              fontSize: '18px',
              marginBottom: '32px'
            }}
          />

          <button 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', fontSize: '18px' }}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Secure Payment'}
          </button>
          
          <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
            🔒 Secured by Razorpay. All donations are tax-exempt.
          </p>
        </div>
      </section>
    </div>
  )
}
