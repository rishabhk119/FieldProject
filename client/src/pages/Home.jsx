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
function Reveal({ children, delay = 0, direction = 'up', className = '', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const transforms = {
    up: 'translateY(60px) rotateX(10deg)',
    left: 'translateX(-60px) rotateY(-10deg)',
    right: 'translateX(60px) rotateY(10deg)',
    scale: 'scale(0.9) translateY(20px)',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        filter: visible ? 'blur(0px)' : 'blur(10px)',
        transform: visible ? 'none' : transforms[direction],
        transition: `opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, 
                     transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s,
                     filter 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
        perspective: '1000px'
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
      quote: 'Visited last month during Guru Purnima. The morning Aarti and the overall aura of the ashram is incredibly peaceful. Very well maintained and the volunteers are so humble. Jai Sai Ram!',
      name: 'Kavitha Chouhan',
      role: 'Software Engineer, Bengaluru',
      initial: 'K',
    },
    {
      quote: 'अन्नदानम् परम् दानम्। यहाँ का अन्नदान पिछले कई सालों से हमारे गाँवों के लिए एक वरदान है। जो निस्वार्थ सेवा यहाँ हो रही है, वह सच में अद्भुत है। मन को बहुत शांति मिली।',
      name: 'Ramesh Patil',
      role: 'Local Farmer, Nashik',
      initial: 'R',
    },
    {
      quote: 'We admitted our son to the weekend Gurukul. It is beautiful to see kids chanting shlokas and learning sanskaras which are completely missing in modern schools. Highly recommended.',
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
    { img: '/gallery_aarti.png', caption: 'Morning Aarti' },
    { img: '/gallery_meditation.png', caption: 'Meditation Hall' },
    { img: '/gallery_bhajan.png', caption: 'Bhajan Sandhya' },
    { img: '/gallery_flowers.png', caption: 'Temple Flowers' },
    { img: '/gallery_annadanam.png', caption: 'Annadanam Seva' },
  ]

  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg">
          <img 
            src="/hero_ashram_main_1776636945138.png" 
            alt="Sai Tapovan Ashram" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
          <div className="hero-bg-gradient" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Ubhari Foundation · 80G/12A Registered
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
              <div className="about-img-wrapper" style={{ overflow: 'hidden' }}>
                 <img src="/meditation_hall_serene_1776636961886.png" alt="Meditation Hall" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="about-accent-card">
                <div className="about-accent-number">29+</div>
                <div className="about-accent-label">Years of Seva</div>
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

              {/* Trust Badges */}
              <div style={{ marginTop: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div className="glass-card" style={{ padding: '16px 24px', borderLeft: '4px solid var(--gold-500)', flex: '1', minWidth: '180px' }}>
                  <div style={{ color: 'var(--gold-400)', fontWeight: 'bold', fontSize: '20px' }}>80G</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Income Tax Exemption</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>Reg No: AAATU0000AX20214</div>
                </div>
                <div className="glass-card" style={{ padding: '16px 24px', borderLeft: '4px solid var(--gold-500)', flex: '1', minWidth: '180px' }}>
                  <div style={{ color: 'var(--gold-400)', fontWeight: 'bold', fontSize: '20px' }}>12A</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Charitable Trust Registration</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>Reg No: 12A/PN/2021/8892</div>
                </div>
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
            {galleryItems.map(({ img, caption }, i) => (
              <Reveal 
                key={caption} 
                delay={i * 0.07}
                style={{
                  gridRow: i === 0 ? 'span 2' : 'auto',
                  aspectRatio: i === 0 ? undefined : '1',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <div 
                  className="gallery-item" 
                  onClick={() => navigate('/gallery')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                  <img src={img} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <Reveal key={name} delay={i * 0.12} style={{ height: '100%' }}>
                <div className="testimonial-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>
                  <div className="testimonial-author" style={{ marginTop: 'auto' }}>
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

      {/* ── TRANSPARENCY & IMPACT ─────────────────────────── */}
      <section style={{ padding: '100px 20px', background: 'var(--dark-900)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div className="section-header">
              <div className="section-eyebrow">Financial Integrity</div>
              <h2 className="section-title">Trust Through Transparency</h2>
              <p className="section-subtitle">
                We maintain the highest standards of financial accountability. 
                95% of every rupee goes directly toward Seva activities.
              </p>
            </div>
          </Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 48 }}>
            {[
              { label: 'Healthcare & Medical Seva', value: '42%', desc: 'Funding free health camps and village clinics.' },
              { label: 'Annadan (Free Meals)', value: '38%', desc: 'Providing nutritional prasad to 500+ souls daily.' },
              { label: 'Education & Gurukul', value: '15%', desc: 'Supporting Sanskrit studies and value education.' },
              { label: 'Ops & Administration', value: '5%', desc: 'Critical infrastructure and maintenance costs.' }
            ].map(item => (
              <div key={item.label} className="glass-card" style={{ padding: 32, borderTop: '2px solid var(--saffron-500)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                  <div style={{ fontSize: 36, fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{item.value}</div>
                </div>
                <div style={{ color: 'var(--saffron-400)', fontWeight: '600', fontSize: 15, marginBottom: 8 }}>{item.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div style={{ marginTop: 48, padding: 32, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border-subtle)', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                📑 Annual Audit Reports and 80G Certificates are available for all donors upon request.
                <Link to="/contact" style={{ color: 'var(--gold-400)', marginLeft: 8, textDecoration: 'underline' }}>Request Documents</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INTERACTIVE MAP ────────────────────────────────── */}
      <section style={{ height: '450px', position: 'relative' }}>
         <iframe 
           title="Ashram Location"
           src="https://maps.google.com/maps?q=78CV%2B38%2C+Asole%2C+Maharashtra+421401&t=&z=13&ie=UTF8&iwloc=&output=embed" 
           width="100%" 
           height="100%" 
           style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
           allowFullScreen="" 
           loading="lazy" 
         />
         <div style={{ 
           position: 'absolute', 
           bottom: 30, 
           left: 30, 
           background: 'var(--dark-950)', 
           border: '1px solid var(--border-subtle)', 
           padding: '24px', 
           borderRadius: 16,
           maxWidth: 320,
           boxShadow: 'var(--shadow-lg)'
         }}>
           <h4 style={{ color: 'var(--text-primary)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>Visit the Ashram</h4>
           <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
             Sai Tapovan Ashram, <br/>78CV+38, Asole, Maharashtra 421401. 
             <br/>Daily Darshan: 5:30 AM - 8:30 PM.
           </p>
           <a 
             href="https://maps.google.com/maps?q=78CV%2B38%2C+Asole%2C+Maharashtra+421401" 
             target="_blank"  rel="noreferrer"
             style={{ display: 'inline-block', marginTop: 16, fontSize: 12, color: 'var(--gold-400)', fontWeight: '600', letterSpacing: '0.05em' }}
           >
             GET DIRECTIONS ↗
           </a>
         </div>
      </section>

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
                  { icon: '📍', label: 'Address', value: '78CV+38, Asole, Maharashtra 421401' },
                  { icon: '📞', label: 'Phone', value: '+91 97636 49611' },
                  { icon: '✉️', label: 'Email', value: 'info@ubharifoundation.org' },
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
