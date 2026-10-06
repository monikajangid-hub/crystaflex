import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  Layers3,
  Mail,
  Menu,
  ShieldCheck,
  X,
  Zap,
} from 'lucide-react'
import './App.css'

const services = [
  {
    id: '01',
    icon: Mail,
    title: 'Enterprise email',
    platforms: 'GOOGLE WORKSPACE  /  MICROSOFT 365',
    description:
      'A better way to work starts in your inbox. We help teams migrate, manage and get more from their email.',
    tags: ['Workspace', 'Microsoft 365', 'Migration'],
    accent: 'mint',
  },
  {
    id: '02',
    icon: Code2,
    title: 'Web & mobile apps',
    platforms: 'DESIGN  /  ENGINEERING  /  DELIVERY',
    description:
      'Thoughtful digital products, built around the way your business and your customers actually work.',
    tags: ['MERN', 'React Native', 'Enterprise'],
    accent: 'blue',
  },
  {
    id: '03',
    icon: Cloud,
    title: 'Google Cloud',
    platforms: 'ARCHITECTURE  /  DATA  /  MIGRATION',
    description:
      'Make your cloud foundation a competitive advantage with architecture that is made to scale.',
    tags: ['Infrastructure', 'Analytics', 'Migration'],
    accent: 'yellow',
  },
  {
    id: '04',
    icon: Layers3,
    title: 'Microsoft Azure',
    platforms: 'CLOUD  /  DEVOPS  /  SECURITY',
    description:
      'Move forward with secure Azure infrastructure, dependable operations, and expert hands-on support.',
    tags: ['Azure', 'DevOps', 'Managed services'],
    accent: 'peach',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function App() {
  const [year] = useState(() => new Date().getFullYear())
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Crystaflex home">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>crysta<span className="brand-light">flex</span><small>PRIVATE LIMITED</small></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#partners" onClick={closeMenu}>Cloud solutions</a>
          <a href="#about" onClick={closeMenu}>About us</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="eyebrow-dot" /> CLOUD PARTNERS. REAL-WORLD THINKING.
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
              Empowering Enterprise Growth with Next-Gen Cloud &amp; Web Solutions
            </motion.h1>
            <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
              Official Google Cloud &amp; Microsoft Partners providing enterprise email solutions, web/app development, and cloud transformation.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.28 }}>
              <a className="button button-primary" href="#services">Explore our work <ArrowRight size={16} /></a>
              <a className="button button-text" href="#contact">Talk to an expert <ArrowUpRight size={15} /></a>
            </motion.div>
            <div className="partner-strip" aria-label="Cloud partners">
              <span className="partner-strip-label">AUTHORIZED CLOUD PARTNER</span>
              <div className="partner-names">
                <span className="mini-google"><span className="google-g">G</span>oogle Cloud</span>
                <span className="partner-divider" />
                <span className="mini-microsoft"><span className="ms-mark"><i /><i /><i /><i /></span>Microsoft</span>
              </div>
            </div>
          </div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85"
              alt="Illuminated servers in a modern cloud data center"
              fetchPriority="high"
            />
            <div className="visual-tint" />
            <div className="visual-grid" />
            <div className="visual-caption"><span className="live-indicator" /> BUILT ON A BETTER FOUNDATION</div>
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="visual-card">
              <span className="visual-card-icon"><Zap size={16} /></span>
              <span><strong>Ready for scale</strong><small>Cloud, without the guesswork.</small></span>
              <ArrowUpRight size={17} />
            </div>
            <span className="visual-index">01 <span>/ 04</span></span>
          </motion.div>
        </section>

        <div className="ticker" aria-label="Services overview">
          <div className="ticker-track"><span>CLOUD TRANSFORMATION</span><i>✳</i><span>PRODUCT ENGINEERING</span><i>✳</i><span>ENTERPRISE EMAIL</span><i>✳</i><span>MANAGED SERVICES</span><i>✳</i><span>CLOUD TRANSFORMATION</span><i>✳</i><span>PRODUCT ENGINEERING</span></div>
        </div>

        <section className="services-section section-wrap" id="services">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <div>
              <span className="section-kicker">WHAT WE DO</span>
              <h2>Good technology.<br /><span>Thoughtfully delivered.</span></h2>
            </div>
            <p>From your first conversation to the day-to-day, we bring the right people and platforms together.</p>
          </motion.div>
          <div className="service-grid">
            {services.map(({ id, icon: Icon, title, platforms, description, tags, accent }, index) => (
              <motion.article className={`service-item accent-${accent}`} key={id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.08 }}>
                <div className="service-top"><span className="service-icon"><Icon size={19} strokeWidth={1.7} /></span><span className="service-number">{id} / 04</span></div>
                <span className="service-platforms">{platforms}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a className="service-link" href="#contact" aria-label={`Ask us about ${title}`}><ArrowUpRight size={17} /></a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="partner-section" id="partners">
          <div className="section-wrap partner-layout">
            <motion.div className="partner-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              <span className="section-kicker">PARTNERED FOR POSSIBILITY</span>
              <h2>The right platform.<br /><span>The people to match.</span></h2>
              <p>We’re an authorized Google Cloud and Microsoft partner, giving your team experienced guidance across the tools you rely on every day.</p>
              <a className="button button-dark" href="#contact">Find your fit <ArrowRight size={16} /></a>
            </motion.div>
            <motion.div className="partner-proof" id="about" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <div className="partner-proof-heading"><ShieldCheck size={18} /><span>OUR PARTNER ECOSYSTEM</span><span className="proof-status"><Check size={12} /> VERIFIED PARTNER</span></div>
              <div className="partner-card">
                <div className="google-symbol"><span>G</span></div>
                <div className="partner-card-copy"><strong>Google Cloud</strong><span>Authorized Partner</span></div>
                <ArrowUpRight size={17} />
              </div>
              <div className="partner-card">
                <span className="azure-symbol"><Cloud size={23} /></span>
                <div className="partner-card-copy"><strong>Microsoft Azure</strong><span>Solutions Partner</span></div>
                <ArrowUpRight size={17} />
              </div>
              <div className="proof-note"><CheckCircle2 size={16} /> Platform expertise, backed by real partnership.</div>
            </motion.div>
          </div>
          <div className="section-wrap metrics-row">
            <div className="metric"><span className="metric-value">99.9<span>%</span></span><span className="metric-caption">CLOUD UPTIME TARGET</span></div>
            <div className="metric"><span className="metric-value">24<span>/7</span></span><span className="metric-caption">ENTERPRISE SUPPORT</span></div>
            <div className="metric"><span className="metric-value">End<span> to end</span></span><span className="metric-caption">MIGRATION EXPERTISE</span></div>
            <div className="metric metric-last"><span className="metric-value">Built<span> together</span></span><span className="metric-caption">YOUR TEAM, OUR EXPERTS</span></div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <motion.div className="contact-intro" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <span className="section-kicker">LET’S MAKE THE NEXT MOVE</span>
            <h2>Have a project<br />in <span>mind?</span></h2>
            <p>Tell us what you’re working toward. Email our sales team and we’ll connect you with the right person.</p>
            <div className="contact-emails">
              <a className="contact-email" href="mailto:sales@crystaflex.com"><span className="contact-email-icon"><Mail size={17} /></span> sales@crystaflex.com <ArrowUpRight size={15} /></a>
              <a className="contact-email" href="mailto:info@crystaflex.com"><span className="contact-email-icon"><Mail size={17} /></span> info@crystaflex.com <ArrowUpRight size={15} /></a>
            </div>
            <div className="contact-note"><span className="live-indicator" /> Direct to our sales team</div>
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main section-wrap">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
            <span>crysta<span className="brand-light">flex</span><small>PRIVATE LIMITED</small></span>
          </a>
          <p>Good technology starts<br />with good people.</p>
          <div className="footer-links"><span>EXPLORE</span><a href="#services">Services</a><a href="#partners">Cloud solutions</a><a href="#about">About us</a><a href="#contact">Contact</a></div>
          <div className="footer-links footer-connect"><span>GET IN TOUCH</span><a href="https://www.linkedin.com/company/crystaflex/" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn <BriefcaseBusiness size={13} /></a><a href="mailto:sales@crystaflex.com">sales@crystaflex.com <ArrowUpRight size={13} /></a><a href="mailto:info@crystaflex.com">info@crystaflex.com <ArrowUpRight size={13} /></a><span className="footer-location">India · Working worldwide</span></div>
        </div>
        <div className="footer-bottom section-wrap"><span>© {year} Crystaflex Pvt Ltd. All rights reserved.</span><div><a href="mailto:sales@crystaflex.com?subject=Privacy%20policy%20request">Privacy</a><a href="mailto:sales@crystaflex.com?subject=Terms%20of%20service%20request">Terms</a><span className="footer-built">INDEPENDENT THINKING. ENTERPRISE SCALE. <ArrowDown size={12} /></span></div></div>
      </footer>
    </div>
  )
}

export default App
