import { useState, useEffect } from 'react'
import api from '../api/api'

const MEAL_TIERS = [
  { id: 'breakfast', label: 'Breakfast Seva', amount: 5001, desc: 'Nourishing start for 100+ souls.' },
  { id: 'lunch', label: 'Mahaprasad Lunch', amount: 11000, desc: 'Full traditional lunch for all devotees.' },
  { id: 'dinner', label: 'Dinner Seva', amount: 11000, desc: 'Satvic evening meal for the community.' },
  { id: 'full_day', label: 'Full Day Annadan', amount: 25000, desc: 'Complete meals for the entire day.' },
]

export default function MealSponsorshipModal({ isOpen, onClose }) {
  const [selectedTier, setSelectedTier] = useState(MEAL_TIERS[1])
  const [dedication, setDedication] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Load Razorpay Script if not present
      if (!window.Razorpay) {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // 1. Create Order on Backend with specific type and metadata
      const { data } = await api.post('donations/create-order', {
        amount: selectedTier.amount,
        type: 'meal_sponsorship',
        metadata: {
          mealType: selectedTier.label,
          dedication: dedication || 'General Seva'
        }
      })

      const options = {
        key: 'rzp_test_SfVPoQsLmK2Y4y',
        amount: data.data.amount,
        currency: 'INR',
        name: 'Sai Tapovan Ashram',
        description: `Sponsorship: ${selectedTier.label}`,
        order_id: data.data.id,
        handler: async function (response) {
          try {
            await api.post('donations/verify', response)
            alert('🙏 Jai Sai Ram! Your meal sponsorship has been recorded. Our kitchen team will be notified.')
            onClose()
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
      alert('Failed to initiate sponsorship flow.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="meal-modal-overlay" onClick={onClose}>
      <div className="meal-modal-content" onClick={e => e.stopPropagation()}>
        <button 
          style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 24, cursor: 'pointer' }}
          onClick={onClose}
        >
          ×
        </button>

        <span className="section-eyebrow">Annadan Seva</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginTop: 8, color: 'var(--text-primary)' }}>Sponsor a Meal</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 12 }}>
          Your kindness ensures that no soul goes hungry at the Ashram. Select a meal tier to begin your Seva.
        </p>

        <div className="tier-selector">
          {MEAL_TIERS.map(tier => (
            <div 
              key={tier.id}
              className={`tier-option ${selectedTier.id === tier.id ? 'selected' : ''}`}
              onClick={() => setSelectedTier(tier)}
            >
              <span className="tier-amount">₹{tier.amount.toLocaleString('en-IN')}</span>
              <span className="tier-label">{tier.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 30 }}>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>DEDICATION / SANKALP (OPTIONAL)</label>
          <input 
            className="form-input-premium"
            placeholder="e.g. In memory of Guru, Birthday blessing..."
            value={dedication}
            onChange={e => setDedication(e.target.value)}
          />
        </div>

        <button 
          className="btn-primary" 
          style={{ width: '100%', justifyContent: 'center', height: 56, fontSize: 16 }}
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? 'Connecting to Secure Server...' : `Sponsor ${selectedTier.label} · ₹${selectedTier.amount.toLocaleString('en-IN')}`}
        </button>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 20 }}>
          🔒 Secure 80G compliant donation via Razorpay.
        </p>
      </div>
    </div>
  )
}
