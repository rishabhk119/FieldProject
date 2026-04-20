import { useEffect } from 'react'
import '../styles/home.css'

const EVENTS = [
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
  },
  {
    date: '10 MAY',
    title: 'Spring Plantation Drive',
    time: '7:30 AM - 11:00 AM',
    location: 'Ashram Gardens',
    desc: 'A community initiative to plant 500 saplings within the Ashram premises.'
  }
]

export default function Events() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="events-page" style={{ paddingTop: '100px', background: 'var(--dark-950)', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-padding)', textAlign: 'center' }}>
        <span className="section-eyebrow">Collective Seva</span>
        <h1 className="section-title">Upcoming Events</h1>
        <p className="section-subtitle" style={{ margin: '20px auto' }}>
          Participate in our monthly events and be a part of the Ashram community.
        </p>
      </section>

      <section style={{ padding: '0 20px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: '20px' }}>
          {EVENTS.map(ev => (
            <div key={ev.title} className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>
              <div style={{ 
                background: 'var(--gradient-saffron)', 
                color: 'white', 
                padding: '30px', 
                textAlign: 'center', 
                minWidth: '140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', display: 'block' }}>{ev.date.split(' ')[0]}</span>
                <span style={{ fontSize: '14px', letterSpacing: '0.1em' }}>{ev.date.split(' ')[1]}</span>
              </div>
              <div style={{ padding: '30px', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '10px' }}>{ev.title}</h3>
                <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--gold-400)', marginBottom: '15px' }}>
                  <span>⏰ {ev.time}</span>
                  <span>📍 {ev.location}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{ev.desc}</p>
                <button className="btn-outline" style={{ marginTop: '20px', padding: '8px 20px', fontSize: '13px' }}>Notify Me</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
