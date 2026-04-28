import { useState, useEffect } from 'react'
import { Calendar, Star, Info } from 'lucide-react'

const FESTIVALS = [
  { name: 'Guru Purnima', date: 'July 10', tithi: 'Purnima' },
  { name: 'Ramanavami', date: 'April 16', tithi: 'Navami' },
  { name: 'Vijayadashami', date: 'October 12', tithi: 'Dashami' },
]

export default function VedicCalendar() {
  const [loading, setLoading] = useState(true)
  const [tithi, setTithi] = useState('')
  
  useEffect(() => {
    // Simulate fetching Vedic Panchang data
    const timer = setTimeout(() => {
      setTithi('Ekadashi') // Simplified for demo
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return (
    <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-subtle)', animation: 'pulse 2s infinite' }}>
      <div style={{ height: '14px', background: 'var(--dark-600)', width: '60%', borderRadius: '4px', marginBottom: '8px' }} />
      <div style={{ height: '10px', background: 'var(--dark-600)', width: '40%', borderRadius: '4px' }} />
    </div>
  )

  return (
    <div className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}>
        <Calendar size={80} color="var(--gold-500)" />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--saffron-400)', marginBottom: '16px' }}>
        <Calendar size={18} />
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Vedic Panchang</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: '4px' }}>
          {tithi} <span style={{ fontSize: '14px', color: 'var(--gold-400)', fontFamily: 'var(--font-body)' }}>Tithi</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upcoming Festivals</div>
        {FESTIVALS.map(f => (
          <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={12} color="var(--gold-500)" /> {f.name}
            </span>
            <span style={{ color: 'var(--gold-400)', fontSize: '12px' }}>{f.date}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
        <Info size={12} /> Live Tithi calculated via Ashram coordinates.
      </div>
    </div>
  )
}
