import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.css'

/* ── Animated Counter ─────────────────────────────────── */
function AnimCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>
}

/* ── Scroll Reveal ────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const transforms = {
    up: 'translateY(30px)',
    left: 'translateX(-30px)',
    right: 'translateX(30px)',
    scale: 'scale(0.92)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ── MAIN HOME PAGE ───────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate()
  const [selectedTier, setSelectedTier] = useState(1)

  const programs = [
    {
      icon: '🧘',
      title: 'Spiritual Retreats',
      desc: 'Immersive meditation and yoga programs rooted in ancient Vedic traditions. Open to seekers of all backgrounds.',
      tags: ['Daily Satsang', 'Yoga', 'Meditation'],
    },
    {
      icon: '📚',
      title: 'Vedic Education',
      desc: 'Gurukul-style learning for children and adults — Sanskrit, scriptures, and life values in a nurturing environment.',
      tags: ['Sanskrit', 'Scriptures', 'Values'],
    },
    {
      icon: '🍱',
      title: 'Annadanam',
      desc: 'Free daily meals (prasad) served to hundreds of devotees, pilgrims, and those in need — a sacred act of giving.',
      tags: ['Daily', 'Free', 'For All'],
    },
    {
      icon: '🌿',
      title: 'Ayurvedic Healing',
      desc: 'Traditional herbal remedies, panchakarma therapies and wellness consultations by experienced practitioners.',
      tags: ['Herbal', 'Panchakarma', 'Wellness'],
    },
    {
      icon: '🎵',
      title: 'Cultural Programs',
      desc: 'Devotional music, classical dance, and festivals celebrating India\'s rich spiritual and artistic heritage.',
      tags: ['Bhajans', 'Dance', 'Festivals'],
    },
    {
      icon: '🤝',
      title: 'Community Service',
      desc: 'Healthcare camps, rural education drives, and women empowerment initiatives across nearby villages.',
      tags: ['Healthcare', 'Education', 'Women'],
    },
  ]

  const testimonials = [
    {
      quote: 'Three days at Sai Tapovan changed my perspective on life entirely. The peace I felt there is indescribable. I return every year.',
      name: 'Kavitha Menon',
      role: 'Software Engineer, Bengaluru',
      initial: 'K',
    },
    {
      quote: 'The Annadanam programme has been feeding our village children for over a decade. Swamiji\'s compassion is boundless.',
      name: 'Ramesh Patil',
      role: 'Farmer, Nashik',
      initial: 'R',
    },
    {
      quote: 'My children learned Sanskrit and values here that no school could teach. Gurukul education at its finest.',
      name: 'Dr. Priya Sharma',
      role: 'Pediatrician, Pune',
      initial: 'P',
    },
  ]

  const events = [
    {
      day: '14',
      month: 'May',
      name: 'Guru Purnima Mahotsav',
      location: 'Ashram Main Hall',
      time: '6:00 AM – 10:00 PM',
      tag: 'Annual',
    },
    {
      day: '21',
      month: 'May',
      name: 'Vedic Chanting Workshop',
      location: 'Yagnashala',
      time: '9:00 AM – 1:00 PM',
      tag: 'Workshop',
    },
    {
      day: '04',
      month: 'Jun',
      name: 'Free Health Camp',
      location: 'Village Panchayat Ground',
      time: '8:00 AM – 4:00 PM',
      tag: 'Service',
    },
    {
      day: '21',
      month: 'Jun',
      name: 'International Yoga Day',
      location: 'Ashram Gardens',
      time: '5:30 AM – 8:00 AM',
      tag: 'Wellness',
    },
  ]

  const donationTiers = [
    { amount: '₹501', label: 'Supporter' },
    { amount: '₹1,100', label: 'Devotee' },
    { amount: '₹5,100', label: 'Benefactor' },
    { amount: '₹11,000', label: 'Patron' },
  ]

  const galleryItems = [
    { icon: '🙏', caption: 'Morning Aarti' },
    { icon: '🧘', caption: 'Meditation Hall' },
    { icon: '📿', caption: 'Bhajan Sandhya' },
    { icon: '🌺', caption: 'Temple Flowers' },
    { icon: '🍱', caption: 'Annadanam' },
  ]

  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-bg-gradient" />
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 2 === 0 ? 'rgba(249,115,22,0.6)' : 'rgba(212,160,23,0.5)',
                animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Ubhari Foundation · Established 1995
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line1">SAI TAPOVAN</span>
            <span className="hero-title-line2">ASHRAM</span>
          </h1>

          <p className="hero-sanskrit">
            ॐ सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः
          </p>

          <p className="hero-description">
            A sacred sanctuary of peace, devotion, and selfless service nestled in the heart of nature.
            Come, find your path to inner peace and spiritual growth.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/programs')}>
              🌸 Explore Programs
            </button>
            <button className="btn-outline" onClick={() => navigate('/about')}>
              Learn Our Story
            </button>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────── */}
      <div className="stats-strip">
        <div className="stats-strip-inner">
          {[
            { target: 29, suffix: '+', label: 'Years of Service' },
            { target: 50000, suffix: '+', label: 'Lives Touched' },
            { target: 500, suffix: '+', label: 'Daily Meals Served' },
            { target: 12, suffix: '', label: 'Seva Programs' },
          ].map(({ target, suffix, label }) => (
            <div key={label} className="stat-item">
              <div className="stat-number">
                <AnimCounter target={target} suffix={suffix} />
              </div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="about-section">
        <div className="about-inner">
          <Reveal direction="left">
            <div className="about-visual">
              <div className="about-img-wrapper">
                <div className="about-icon-display">🏯</div>
              </div>
              <div className="about-accent-card">
                <div className="about-accent-number">1995</div>
                <div className="about-accent-label">Year Founded</div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="about-text">
              <div className="section-eyebrow">Who We Are</div>
              <h2>A Home for Every Seeking Soul</h2>
              <p>
                Founded under the loving guidance of Param Pujya Swamiji, Sai Tapovan Ashram
                has been a beacon of spiritual light for nearly three decades. Nestled amid
                lush greenery, our ashram is a living embodiment of Sai Baba&apos;s teachings —
                <em> love, service, and surrender.</em>
              </p>
              <p>
                We are a unit of the Ubhari Foundation, a registered nonprofit dedicated to
                holistic human development through spiritual, educational, and humanitarian
                service across Maharashtra.
              </p>

              <div className="about-pillars">
                {[
                  { icon: '🕊️', label: 'Peace & Harmony' },
                  { icon: '📖', label: 'Vedic Knowledge' },
                  { icon: '🤲', label: 'Selfless Service' },
                  { icon: '🌿', label: 'Holistic Wellness' },
                ].map(({ icon, label }) => (
                  <div key={label} className="pillar-item">
                    <span className="pillar-icon">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROGRAMS ─────────────────────────────────────── */}
      <section className="programs-section">
        <div className="programs-inner">
          <Reveal>
            <div className="section-header">
              <div className="section-eyebrow">Our Offerings</div>
              <h2 className="section-title">Programs & Seva Activities</h2>
              <p className="section-subtitle">
                Each program is rooted in the ancient tradition of seva — selfless service —
                and is open to all who seek growth, healing, and inner peace.
              </p>
            </div>
          </Reveal>

          <div className="programs-grid">
            {programs.map(({ icon, title, desc, tags }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="program-card" onClick={() => navigate('/programs')}>
                  <div className="program-icon">{icon}</div>
                  <div className="program-title">{title}</div>
                  <div className="program-desc">{desc}</div>
                  <div className="program-tags">
                    {tags.map((t) => (
                      <span key={t} className="program-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATION CTA ──────────────────────────────────── */}
      <section className="donate-cta-section">
        <div className="donate-cta-bg" />
        <div className="donate-cta-inner">
          <Reveal>
            <div className="section-eyebrow">Support Our Mission</div>
            <h2 className="donate-cta-title">Your Generosity Transforms Lives</h2>
            <p className="donate-cta-subtitle">
              Every contribution — big or small — directly funds meals, education, healthcare,
              and spiritual programs for thousands of people across our region.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="donation-tiers">
              {donationTiers.map(({ amount, label }, i) => (
                <div
                  key={label}
                  className={`donation-tier${selectedTier === i ? ' selected' : ''}`}
                  onClick={() => setSelectedTier(i)}
                >
                  <div className="tier-amount">{amount}</div>
                  <div className="tier-label">{label}</div>
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate('/donate')}>
                🙏 Donate Now · {donationTiers[selectedTier].amount}
              </button>
              <button className="btn-outline" onClick={() => navigate('/donate')}>
                Custom Amount
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────────────────────── */}
      <section className="gallery-section">
        <div className="gallery-inner">
          <Reveal>
            <div className="section-header">
              <div className="section-eyebrow">Life at the Ashram</div>
              <h2 className="section-title">Glimpses of Grace</h2>
            </div>
          </Reveal>

          <div className="gallery-grid">
            {galleryItems.map(({ icon, caption }, i) => (
              <Reveal key={caption} delay={i * 0.07}>
                <div className="gallery-item" onClick={() => navigate('/gallery')}>
                  <span style={{ fontSize: i === 0 ? 80 : 48 }}>{icon}</span>
                  <div className="gallery-overlay">
                    <span className="gallery-caption">{caption}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="testimonials-section">
        <div className="testimonials-inner">
          <Reveal>
            <div className="section-header">
              <div className="section-eyebrow">Stories of Grace</div>
              <h2 className="section-title">Lives Transformed</h2>
            </div>
          </Reveal>

          <div className="testimonials-grid">
            {testimonials.map(({ quote, name, role, initial }, i) => (
              <Reveal key={name} delay={i * 0.12}>
                <div className="testimonial-card">
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{initial}</div>
                    <div>
                      <div className="testimonial-name">{name}</div>
                      <div className="testimonial-role">{role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ───────────────────────────────── */}
      <section className="events-section">
        <div className="events-inner">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="section-eyebrow">What&apos;s Coming</div>
                <h2 className="section-title">Upcoming Events</h2>
              </div>
              <button className="btn-outline" onClick={() => navigate('/events')}>
                View All Events →
              </button>
            </div>
          </Reveal>

          <div className="events-list">
            {events.map(({ day, month, name, location, time, tag }, i) => (
              <Reveal key={name} delay={i * 0.07}>
                <div className="event-card" onClick={() => navigate('/events')}>
                  <div className="event-date">
                    <div className="event-day">{day}</div>
                    <div className="event-month">{month}</div>
                  </div>
                  <div className="event-info">
                    <div className="event-name">{name}</div>
                    <div className="event-meta">
                      <span>📍 {location}</span>
                      <span>🕐 {time}</span>
                    </div>
                  </div>
                  <span className="event-tag">{tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <Reveal direction="left">
            <div className="contact-info">
              <div className="section-eyebrow">Get In Touch</div>
              <h2>Visit Us or Reach Out</h2>
              <p>
                Our doors are always open. Whether you wish to attend a program,
                volunteer, or simply seek guidance — we welcome you with open arms.
              </p>

              <div className="contact-details">
                {[
                  { icon: '📍', label: 'Address', value: 'Sai Tapovan Ashram, Maharashtra, India' },
                  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
                  { icon: '✉️', label: 'Email', value: 'info@saitapovan.org' },
                  { icon: '🕐', label: 'Darshan Hours', value: 'Daily · 5:30 AM – 8:30 PM' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="contact-detail-item">
                    <div className="contact-detail-icon">{icon}</div>
                    <div>
                      <div className="contact-detail-label">{label}</div>
                      <div className="contact-detail-value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="contact-form-wrapper">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 24, letterSpacing: '0.03em' }}>
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}

/* ── Contact Form ──────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1400))
    setSent(true)
    setSending(false)
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="form-field">
          <label>Full Name</label>
          <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-field">
        <label>Subject</label>
        <select name="subject" value={form.subject} onChange={handleChange} required>
          <option value="">Select a subject</option>
          <option>Spiritual Retreat Enquiry</option>
          <option>Donation & Sponsorship</option>
          <option>Volunteer Opportunity</option>
          <option>Program Registration</option>
          <option>General Enquiry</option>
        </select>
      </div>
      <div className="form-field">
        <label>Message</label>
        <textarea name="message" placeholder="Write your message here..." value={form.message} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn-primary" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
        {sending ? <span className="spinner" /> : '🪷 Send Message'}
      </button>
    </form>
  )
}
