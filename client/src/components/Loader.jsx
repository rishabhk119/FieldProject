import { motion } from 'framer-motion'

export default function Loader({ fullScreen = false, text = "Loading..." }) {
  return (
    <div style={{
      position: fullScreen ? 'fixed' : 'relative',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: fullScreen ? 'var(--dark-950)' : 'transparent',
      zIndex: fullScreen ? 9999 : 1,
      minHeight: fullScreen ? '100vh' : '200px'
    }}>
      {/* Mandala/Lotus Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        style={{ 
          fontSize: '3.5rem', 
          filter: 'drop-shadow(0 0 24px var(--saffron-glow))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        🪷
      </motion.div>
      
      {/* Pulsing Text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          marginTop: '1.5rem',
          color: 'var(--saffron-400)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.15em',
          fontSize: '1.1rem',
          textTransform: 'uppercase'
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}
