import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import '../styles/home.css'
import { 
  Flower2, 
  ScrollText, 
  HandPlatter, 
  Sprout, 
  Music, 
  HeartHandshake,
  Bird,
  BookOpen,
  HandHeart,
  Leaf,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Heart,
  Send,
  Calendar,
  FileText
} from 'lucide-react'

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

  const stats = [
    { target: 29, suffix: '+', label: 'Years of Service', icon: <Calendar size={24} /> },
    { target: 12480, suffix: '+', label: 'Lives Touched', icon: <Heart size={24} /> },
    { target: 1540, suffix: '+', label: 'Daily Meals Served', icon: <HandPlatter size={24} /> },
    { target: 12, suffix: '', label: 'Seva Programs', icon: <Flower2 size={24} /> },
  ]

  const programs = [
    {
      icon: <Flower2 size={24} />,
      title: 'Spiritual Retreats',
      desc: 'Immersive meditation and yoga programs rooted in ancient Vedic traditions. Open to seekers of all backgrounds.',
      tags: ['Daily Satsang', 'Yoga', 'Meditation'],
    },
    {
      icon: <ScrollText size={24} />,
      title: 'Vedic Education',
      desc: 'Gurukul-style learning for children and adults — Sanskrit, scriptures, and life values in a nurturing environment.',
      tags: ['Sanskrit', 'Scriptures', 'Values'],
    },
    {
      icon: <HandPlatter size={24} />,
      title: 'Annadanam',
      desc: 'Free daily meals (prasad) served to hundreds of devotees, pilgrims, and those in need — a sacred act of giving.',
      tags: ['Daily', 'Free', 'For All'],
    },
    {
      icon: <Sprout size={24} />,
      title: 'Ayurvedic Healing',
      desc: 'Traditional herbal remedies, panchakarma therapies and wellness consultations by experienced practitioners.',
      tags: ['Herbal', 'Panchakarma', 'Wellness'],
    },
    {
      icon: <Music size={24} />,
      title: 'Cultural Programs',
      desc: 'Devotional music, classical dance, and festivals celebrating India\'s rich spiritual and artistic heritage.',
      tags: ['Bhajans', 'Dance', 'Festivals'],
    },
    {
      icon: <HeartHandshake size={24} />,
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

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY
      const heroImg = document.querySelector('.hero-bg img')
      if (heroImg) {
        heroImg.style.transform = `scale(1.1) translateY(${scroll * 0.3}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="home-page" style={{ paddingTop: '116px' }}>

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
          {/* Celestial Aura & Zen Ripples */}
          <div className="hero-aura-layer">
            <div className="hero-aura-source" />
            
            {/* Zen Ripples (Synchronized with 12s Aura Pulse) */}
            <div className="zen-ripple-container">
              <div className="zen-ripple" style={{ animationDelay: '0s' }} />
              <div className="zen-ripple" style={{ animationDelay: '12s' }} />
              <div className="zen-ripple" style={{ animationDelay: '24s' }} />
            </div>

            {/* Aura Particles (+40% Density & Size - Slower Drift) */}
            {[...Array(34)].map((_, i) => (
              <div 
                key={i}
                className="aura-particle"
                style={{
                  width: Math.random() * 6 + 3 + 'px',
                  height: Math.random() * 6 + 3 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `shimmering ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 5}s, drifting ${Math.random() * 15 + 20}s linear infinite`,
                  opacity: Math.random() * 0.5 + 0.3
                }}
              />
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="hero-logo-box" style={{ marginBottom: '2rem' }}>
              <img 
                src="/logo.png" 
                alt="Sai Tapovan Logo" 
                style={{ 
                  width: 120, 
                  height: 120, 
                  objectFit: 'cover', 
                  borderRadius: '50%',
                  clipPath: 'circle(48%)',
                  filter: 'drop-shadow(0 0 52px rgba(249, 115, 22, 0.95))',
                  animation: 'float 6s ease-in-out infinite',
                  display: 'block'
                }} 
              />
            </div>
          </Reveal>

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
              <button className="btn-primary" onClick={() => navigate('/programs')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} /> Explore Programs
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
          {stats.map(({ target, suffix, label, icon }) => (
            <div key={label} className="stat-item">
              <div className="stat-icon-wrap">{icon}</div>
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
                  { icon: <Bird size={20} />, label: 'Peace & Harmony' },
                  { icon: <BookOpen size={20} />, label: 'Vedic Knowledge' },
                  { icon: <HandHeart size={20} />, label: 'Selfless Service' },
                  { icon: <Leaf size={20} />, label: 'Holistic Wellness' },
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
              <button className="btn-primary" onClick={() => navigate('/donate')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HandHeart size={18} /> Donate Now · {donationTiers[selectedTier].amount}
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
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {time}</span>
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
                <FileText size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Annual Audit Reports and 80G Certificates are available for all donors upon request.
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
                  { icon: <MapPin size={18} />, label: 'Address', value: '78CV+38, Asole, Maharashtra 421401' },
                  { icon: <Phone size={18} />, label: 'Phone', value: '+91 97636 49611' },
                  { icon: <Mail size={18} />, label: 'Email', value: 'info@ubharifoundation.org' },
                  { icon: <Clock size={18} />, label: 'Darshan Hours', value: 'Daily · 5:30 AM – 8:30 PM' },
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

      {/* ── FLOATING SEVA BUTTON ─────────────────────────── */}
      <div className="floating-seva-btn" onClick={() => navigate('/donate')}>
        <div className="fab-inner">
          <HandHeart size={24} />
          <span className="fab-text">Quick Seva</span>
        </div>
        <div className="fab-ripple" />
      </div>

    </div>
  )
}

