import { useState } from 'react'
import { Send, Heart } from 'lucide-react'
import { submitContact } from '../api/contact.api'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await submitContact(form)
      setSent(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Error sending message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', animation: 'scale-in 0.5s ease forwards' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Heart size={48} color="var(--saffron-500)" />
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)', marginBottom: 8 }}>
          Jai Sai Ram!
        </h4>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
          Your message has been received. We will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <div className="form-field">
          <label>Full Name</label>
          <input 
            name="name" 
            type="text" 
            placeholder="Your name" 
            value={form.name} 
            onChange={handleChange} 
            className="form-input-premium"
            required 
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input 
            name="email" 
            type="email" 
            placeholder="you@example.com" 
            value={form.email} 
            onChange={handleChange} 
            className="form-input-premium"
            required 
          />
        </div>
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Subject</label>
        <select 
          name="subject" 
          value={form.subject} 
          onChange={handleChange} 
          className="form-input-premium"
          required
        >
          <option value="">Select a subject</option>
          <option>Spiritual Retreat Enquiry</option>
          <option>Donation & Sponsorship</option>
          <option>Volunteer Opportunity</option>
          <option>Program Registration</option>
          <option>General Enquiry</option>
        </select>
      </div>
      <div className="form-field" style={{ marginTop: 16 }}>
        <label>Message</label>
        <textarea 
          name="message" 
          placeholder="Write your message here..." 
          value={form.message} 
          onChange={handleChange} 
          className="form-input-premium"
          rows="5"
          required 
        />
      </div>
      <button 
        type="submit" 
        className="btn-primary" 
        disabled={sending} 
        style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px', marginTop: 24, height: 56 }}
      >
        {sending ? <span className="spinner" /> : <><Send size={18} /> Send Message</>}
      </button>
    </form>
  )
}
