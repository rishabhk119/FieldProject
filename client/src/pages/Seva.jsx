import { useState, useEffect } from 'react'
import '../styles/home.css'
import MealSponsorshipModal from '../components/MealSponsorshipModal'

const PROGRAMS = [
  {
    title: 'Vedic Education',
    desc: 'Preserving ancient wisdom through modern educational frameworks for the youth.',
    icon: '📖'
  },
  {
    title: 'Healthcare Seva',
    desc: 'Mobile clinics and medical camps providing essential care to remote villages.',
    icon: '🏥'
  },
  {
    title: 'Sustainable Living',
    desc: 'Organic farming and eco-conscious initiatives within the Ashram premises.',
    icon: '🌿'
  }
]

const EVENTS = [
  {
    date: '21 APR',
    title: 'Daily Mahaprasad Seva',
    time: '12:30 PM - 2:30 PM',
    location: 'Annapurna Dining Hall',
    desc: 'Serving sanctified vegetarian meals to all devotees and seekers. Prepared with devotion and prayer.',
    isLive: true,
    tag: 'Live Now'
  },
  {
    date: '25 APR',
    title: 'Maha Satsang & Bhajan',
    time: '6:00 PM - 9:00 PM',
    location: 'Main Prayer Hall',
    desc: 'Join us for an evening of soulful Bhajans and spiritual discourse followed by Mahaprasad.'
  },
  {
    date: '02 MAY',
    title: 'Free Medical Camp',
    time: '9:00 AM - 4:00 PM',
    location: 'Ashram Clinic',
    desc: 'Providing free health checkups and medicines to the nearby village community.'
  }
]

export default function Seva() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="seva-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: 'var(--section-padding)', textAlign: 'center' }}>
        <span className="section-eyebrow">Service & Devotion</span>
        <h1 className="section-title">Seva & Events</h1>
        <p className="section-subtitle" style={{ margin: '20px auto' }}>
          Explore our daily initiatives and upcoming spiritual events.
        </p>
      </section>

      {/* Daily Initiatives Section */}
      <section style={{ padding: '0 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '40px', fontSize: '32px' }}>🌿 Our Daily Initiatives</h2>
        
        {/* Featured Annadan Card */}
        <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', padding: '10px', overflow: 'hidden', marginBottom: '40px' }}>
          <div style={{ height: '400px', overflow: 'hidden', borderRadius: '12px' }}>
            <img src="/annadan_service_scene_1776636979610.png" alt="Annadan Seva" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-eyebrow" style={{ textAlign: 'left' }}>Daily Annadan</span>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '28px', marginBottom: '20px' }}>Feeding the Soul</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '30px' }}>
              Our daily Annadan program serves over 500 sanctified meals to devotees and those in need, embodying the principle of "Sabka Malik Ek."
            </p>
            <button className="btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => setIsModalOpen(true)}>
              🙏 Sponsor a Meal
            </button>
          </div>
        </div>

        {/* Other Programs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {PROGRAMS.map(p => (
            <div key={p.title} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '12px' }}>{p.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section style={{ padding: '80px 20px 100px', background: 'var(--dark-900)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '60px', fontSize: '32px' }}>📅 Upcoming & Live Events</h2>
          
          <div style={{ display: 'grid', gap: '30px' }}>
            {EVENTS.map((ev, i) => (
              <div 
                key={ev.title} 
                className={`glass-card event-card-animate ${ev.isLive ? 'live-glow' : ''}`}
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  overflow: 'hidden', 
                  animationDelay: `${i * 0.15}s`,
                  border: ev.isLive ? '1px solid var(--saffron-500)' : '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ 
                  background: ev.isLive ? 'var(--gradient-saffron)' : 'var(--dark-800)', 
                  color: 'white', 
                  padding: '40px', 
                  textAlign: 'center', 
                  minWidth: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {ev.isLive && <div className="live-pulse-ring" />}
                  <span style={{ fontSize: '32px', fontWeight: 'bold', display: 'block', position: 'relative' }}>{ev.date.split(' ')[0]}</span>
                  <span style={{ fontSize: '15px', letterSpacing: '0.2em', position: 'relative' }}>{ev.date.split(' ')[1]}</span>
                </div>
                <div style={{ padding: '40px', flex: 1, position: 'relative' }}>
                  {ev.isLive && (
                    <div className="live-indicator">
                      <span className="live-dot" /> LIVE NOW
                    </div>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', marginBottom: '12px', color: ev.isLive ? 'var(--saffron-400)' : 'var(--text-primary)' }}>
                    {ev.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--gold-400)', marginBottom: '20px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🕒 {ev.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>📍 {ev.location}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.7' }}>{ev.desc}</p>
                  <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                     <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
                       {ev.isLive ? '🙏 Remote Darshan' : 'Remind Me'}
                     </button>
                     {ev.isLive && (
                       <button className="btn-outline" style={{ padding: '10px 24px', fontSize: '14px' }} onClick={() => setIsModalOpen(true)}>
                         Sponsor Mahaprasad
                       </button>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MealSponsorshipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
