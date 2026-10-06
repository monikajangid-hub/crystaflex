'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  CircleDollarSign,
  Cloud,
  CodeXml,
  Database,
  LockKeyhole,
  Mail,
  Menu,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  X,
} from 'lucide-react'

const platforms = [
  {
    id: 'aws',
    mark: 'aws',
    name: 'Amazon Web Services',
    short: 'AWS',
    category: 'CLOUD PLATFORM',
    tone: 'amber',
    icon: Cloud,
    focus: 'Scale, serverless & data pipelines',
    description:
      'Build resilient foundations for products that need room to grow, with the right services for your workload.',
    services: ['Cloud migration', 'EKS & microservices', 'S3 data lakes', 'Lambda & serverless'],
    note: 'AWS platform expertise',
  },
  {
    id: 'azure',
    mark: 'az',
    name: 'Microsoft Azure',
    short: 'Azure',
    category: 'MICROSOFT SOLUTIONS PARTNER',
    tone: 'blue',
    icon: Boxes,
    focus: 'Hybrid cloud, identity & security',
    description:
      'Extend the Microsoft tools your teams already use into secure, connected cloud operations.',
    services: ['Azure migration', 'AKS & Azure Arc', 'Entra ID', 'Sentinel & security'],
    note: 'Microsoft partner',
  },
  {
    id: 'gcp',
    mark: 'g',
    name: 'Google Cloud Platform',
    short: 'Google Cloud',
    category: 'GOOGLE CLOUD PARTNER',
    tone: 'multi',
    icon: Database,
    focus: 'Analytics, AI & modern applications',
    description:
      'Turn data into a clearer advantage with analytics and application platforms designed for scale.',
    services: ['BigQuery analytics', 'Vertex AI', 'Cloud Run', 'GKE & Anthos'],
    note: 'Google Cloud partner',
  },
]

const capabilities = [
  {
    number: '01',
    icon: ArrowDownRight,
    title: 'Cloud migration',
    copy: 'Move applications and data with a phased plan, clear dependencies, and rollback paths.',
    tags: ['Discovery', 'Cutover planning'],
  },
  {
    number: '02',
    icon: CodeXml,
    title: 'DevOps & CI/CD',
    copy: 'Automate the path from commit to production with repeatable infrastructure and delivery.',
    tags: ['IaC', 'Delivery pipelines'],
  },
  {
    number: '03',
    icon: CircleDollarSign,
    title: 'FinOps',
    copy: 'Make cloud spending easier to understand, forecast, and improve across teams.',
    tags: ['Cost visibility', 'Optimization'],
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Managed cloud & security',
    copy: 'Keep environments healthy with ongoing observability, access controls, and response plans.',
    tags: ['24/7 options', 'Zero-trust practices'],
  },
]

const incidents = [
  { time: '09:42:18', title: 'Latency threshold cleared', service: 'api-gateway / us-east-1', tone: 'green' },
  { time: '09:37:04', title: 'Backup completed', service: 'prod-data / europe-west1', tone: 'blue' },
  { time: '09:31:52', title: 'Policy drift detected', service: 'iam-baseline / tenant-03', tone: 'amber' },
]

const numberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function BrandMark() {
  return (
    <a className="brand" href="#home" aria-label="Crystaflex home">
      <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-word">crysta<span>flex</span><small>PRIVATE LIMITED</small></span>
    </a>
  )
}

function SectionLabel({ children, index }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <i />
      {children}
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('crystaflex-theme')
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark'
    document.documentElement.dataset.theme = initialTheme
    if (initialTheme === 'light') {
      // oxlint-disable-next-line react/set-state-in-effect -- Restore the saved theme after hydration.
      setTheme(initialTheme)
    }
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('crystaflex-theme', nextTheme)
    setTheme(nextTheme)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandMark />
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#platforms" onClick={closeMenu}>Cloud services <ChevronDown size={13} /></a>
          <a href="#solutions" onClick={closeMenu}>Solutions</a>
          <a href="#architecture" onClick={closeMenu}>Cloud matrix</a>
          <a href="#operations" onClick={closeMenu}>Operations</a>
          <a className="nav-cta" href="mailto:sales@crystaflex.com?subject=Cloud%20audit%20request" onClick={closeMenu}>
            Get a cloud audit <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="header-tools">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'light'}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="signal-dot" />
          CLOUD PARTNERSHIP. ENGINEERING THAT SHIPS.
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
          Architecting next-gen <span>multi-cloud scale.</span>
        </motion.h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.17 }}>
          Design, migrate, optimize, and manage cloud environments across AWS, Azure, and Google Cloud. Built around your workloads, your people, and what comes next.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>
          <a className="button button-primary" href="mailto:sales@crystaflex.com?subject=Cloud%20audit%20request">Schedule a cloud audit <ArrowRight size={16} /></a>
          <a className="button button-quiet" href="#architecture">Explore cloud matrix <ArrowDownRight size={16} /></a>
        </motion.div>
        <div className="partner-rail" aria-label="Cloud platforms and partnerships">
          <span className="partner-rail-label">CLOUD PARTNERSHIPS & CAPABILITIES</span>
          <div className="partner-rail-items">
            <span className="rail-partner"><i className="google-g">G</i> Google Cloud</span>
            <span className="rail-divider" />
            <span className="rail-partner"><i className="microsoft-mark"><b /><b /><b /><b /></i> Microsoft</span>
            <span className="rail-divider" />
            <span className="rail-partner rail-aws"><span>aws</span> platform expertise</span>
          </div>
        </div>
      </div>

      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.12 }}>
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85"
          alt="Illuminated cloud infrastructure in a modern data center"
          fetchPriority="high"
        />
        <div className="hero-image-shade" />
        <div className="image-coordinate">INFRASTRUCTURE / 37.7749° N</div>
        <div className="hero-console">
          <div className="console-top"><span><i /> PLATFORM STATUS</span><span className="console-live">DESIGN PREVIEW</span></div>
          <div className="console-main">
            <div className="console-mesh" aria-hidden="true"><span /><span /><span /><i /><i /><i /><b /><b /></div>
            <div><strong>One view.</strong><p>Across every cloud.</p></div>
          </div>
          <div className="console-platforms"><span><i className="platform-dot dot-aws" /> AWS</span><span><i className="platform-dot dot-azure" /> AZURE</span><span><i className="platform-dot dot-gcp" /> GOOGLE CLOUD</span></div>
        </div>
        <span className="hero-serial">CF—01 <i /> MULTI-CLOUD SYSTEMS</span>
      </motion.div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section className="platform-section section-wrap" id="platforms">
      <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        <div><SectionLabel index="01">CLOUD PLATFORMS</SectionLabel><h2>Three clouds.<br /><span>One clear strategy.</span></h2></div>
        <p>Choose the right services for the work at hand. Bring environments together when it makes sense.</p>
      </motion.div>
      <div className="platform-grid">
        {platforms.map(({ id, mark, name, category, tone, icon: Icon, focus, description, services: offerings, note }, index) => (
          <motion.article className={`platform-card platform-${tone}`} key={id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} transition={{ delay: index * 0.08 }}>
            <div className="platform-card-top"><span className={`platform-mark mark-${mark}`}>{mark === 'multi' ? <i className="google-g">G</i> : mark}</span><span className="platform-category">{category}</span></div>
            <h3>{name}</h3>
            <p className="platform-focus"><Icon size={15} /> {focus}</p>
            <p className="platform-description">{description}</p>
            <ul>{offerings.map((item) => <li key={item}><Check size={13} />{item}</li>)}</ul>
            <div className="platform-card-bottom"><span>{note}</span><ArrowUpRight size={15} /></div>
          </motion.article>
        ))}
      </div>
      <p className="platform-disclaimer">Google Cloud and Microsoft partnership references describe Crystaflex’s stated partner relationships. AWS is listed as a supported platform capability; no AWS Partner Network status is implied.</p>
    </section>
  )
}

function CapabilitySection() {
  return (
    <section className="capability-section" id="solutions">
      <div className="section-wrap">
        <div className="capability-head">
          <div><SectionLabel index="02">CORE CAPABILITIES</SectionLabel><h2>From first move<br />to <span>steady state.</span></h2></div>
          <p>Practical cloud work, from the first whiteboard to ongoing operations. Scope flexes with your team.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map(({ number, icon: Icon, title, copy, tags }, index) => (
            <motion.article className="capability-item" key={number} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.06 }}>
              <div className="capability-meta"><span>{number}</span><Icon size={19} strokeWidth={1.65} /></div>
              <h3>{title}</h3><p>{copy}</p>
              <div className="capability-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </motion.article>
          ))}
        </div>
        <div className="adjacent-services">
          <span>ALSO FROM CRYSTAFLEX</span>
          <a href="mailto:sales@crystaflex.com?subject=Enterprise%20email%20solutions"><Mail size={16} /> Enterprise email · Google Workspace &amp; Microsoft 365 <ArrowUpRight size={13} /></a>
          <a href="mailto:sales@crystaflex.com?subject=Web%20and%20mobile%20development"><CodeXml size={16} /> Custom web &amp; mobile app development <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </section>
  )
}

function ArchitectureExplorer() {
  const [activeCloud, setActiveCloud] = useState('aws')
  const selected = platforms.find(({ id }) => id === activeCloud)

  return (
    <section className="architecture-section section-wrap" id="architecture">
      <div className="section-heading architecture-heading">
        <div><SectionLabel index="03">INTERACTIVE CLOUD MATRIX</SectionLabel><h2>Connected by design.<br /><span>Controlled by you.</span></h2></div>
        <p>Select a cloud to explore how shared identity, policy, and observability can connect a multi-cloud environment.</p>
      </div>
      <div className="architecture-layout">
        <div className="architecture-board" aria-label="Illustrative multi-cloud architecture diagram">
          <div className="board-topline"><span><Network size={14} /> REFERENCE ARCHITECTURE</span><span>ILLUSTRATIVE</span></div>
          <div className="architecture-stage">
            <svg className="architecture-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="18" y1="22" x2="50" y2="50" /><line x1="82" y1="22" x2="50" y2="50" /><line x1="50" y1="84" x2="50" y2="50" />
              <line x1="18" y1="22" x2="82" y2="22" /><line x1="18" y1="22" x2="50" y2="84" /><line x1="82" y1="22" x2="50" y2="84" />
              <circle cx="50" cy="50" r="1.4" /><circle cx="18" cy="22" r="1" /><circle cx="82" cy="22" r="1" /><circle cx="50" cy="84" r="1" />
            </svg>
            <button className={`arch-node node-aws ${activeCloud === 'aws' ? 'is-active' : ''}`} type="button" onClick={() => setActiveCloud('aws')} aria-pressed={activeCloud === 'aws'}>
              <span className="arch-node-mark node-mark-aws">aws</span><span><strong>Amazon Web Services</strong><small>Workloads · us-east-1</small></span><ArrowUpRight size={14} />
            </button>
            <button className={`arch-node node-azure ${activeCloud === 'azure' ? 'is-active' : ''}`} type="button" onClick={() => setActiveCloud('azure')} aria-pressed={activeCloud === 'azure'}>
              <span className="arch-node-mark node-mark-azure"><Cloud size={18} /></span><span><strong>Microsoft Azure</strong><small>Identity · eastus</small></span><ArrowUpRight size={14} />
            </button>
            <button className={`arch-node node-gcp ${activeCloud === 'gcp' ? 'is-active' : ''}`} type="button" onClick={() => setActiveCloud('gcp')} aria-pressed={activeCloud === 'gcp'}>
              <span className="arch-node-mark node-mark-gcp">G</span><span><strong>Google Cloud</strong><small>Data · europe-west1</small></span><ArrowUpRight size={14} />
            </button>
            <div className="security-hub"><span><ShieldCheck size={21} /></span><strong>Identity &amp; policy</strong><small>Shared control plane</small></div>
            <div className="board-label board-label-top">ENCRYPTED TRAFFIC</div>
            <div className="board-label board-label-bottom">CENTRALIZED VISIBILITY</div>
          </div>
          <div className="board-legend"><span><i className="legend-line" /> Private connectivity</span><span><i className="legend-hub" /> Shared controls</span></div>
        </div>
        <motion.aside className={`architecture-detail detail-${selected.tone}`} key={selected.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          <div className="detail-icon"><selected.icon size={20} /></div>
          <span className="detail-kicker">SELECTED CLOUD</span>
          <h3>{selected.name}</h3>
          <p>{selected.focus}. Connect this environment to shared identity, policy, and telemetry patterns.</p>
          <div className="detail-list"><span><Check size={13} /> Least-privilege identity</span><span><Check size={13} /> Central audit visibility</span><span><Check size={13} /> Segmented network paths</span></div>
          <a href="mailto:sales@crystaflex.com?subject=Multi-cloud%20architecture%20review">Discuss this architecture <ArrowRight size={15} /></a>
        </motion.aside>
      </div>
    </section>
  )
}

function FinOpsEstimator() {
  const [servers, setServers] = useState(40)
  const [monthlyCost, setMonthlyCost] = useState(950)
  const [savingsRate, setSavingsRate] = useState(24)
  const currentSpend = servers * monthlyCost
  const monthlySavings = Math.round(currentSpend * savingsRate / 100)

  return (
    <section className="estimator-section" id="calculator">
      <div className="section-wrap estimator-layout">
        <motion.div className="estimator-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <SectionLabel index="04">FINOPS SCENARIO PLANNER</SectionLabel>
          <h2>Find your<br /><span>optimization range.</span></h2>
          <p>Shape a quick scenario using your server count and estimated monthly server spend. Adjust the savings assumption to see how the range moves.</p>
          <div className="estimate-caveat"><ShieldCheck size={16} /><span>Planning illustration, not a quote or savings guarantee. Actual results depend on architecture, usage, licensing, and region.</span></div>
        </motion.div>
        <div className="estimator-panel">
          <div className="estimator-panel-top"><span><CircleDollarSign size={16} /> CLOUD SPEND SCENARIO</span><span>USD / MONTH</span></div>
          <label className="range-control"><span><span>Current server count</span><strong>{servers}</strong></span><input type="range" min="1" max="500" value={servers} onChange={(event) => setServers(Number(event.target.value))} /><span className="range-labels"><span>1 server</span><span>500 servers</span></span></label>
          <label className="range-control spend-control"><span><span>Estimated spend per server</span><strong>{numberFormat.format(monthlyCost)}</strong></span><input type="range" min="250" max="5000" step="50" value={monthlyCost} onChange={(event) => setMonthlyCost(Number(event.target.value))} /><span className="range-labels"><span>$250</span><span>$5,000</span></span></label>
          <label className="range-control savings-control"><span><span>Optimization scenario</span><strong>{savingsRate}%</strong></span><input type="range" min="5" max="40" value={savingsRate} onChange={(event) => setSavingsRate(Number(event.target.value))} /><span className="range-labels"><span>5%</span><span>40%</span></span></label>
          <div className="estimate-result"><div><span>Illustrative monthly opportunity</span><strong>{numberFormat.format(monthlySavings)}<small> / mo</small></strong></div><div className="result-detail"><span>Current modeled spend</span><strong>{numberFormat.format(currentSpend)} / mo</strong></div></div>
          <div className="estimator-panel-bottom"><span><Activity size={13} /> Change the inputs to explore a scenario</span><a href="mailto:sales@crystaflex.com?subject=FinOps%20review">Talk FinOps <ArrowUpRight size={13} /></a></div>
        </div>
      </div>
    </section>
  )
}

function OperationsSection() {
  return (
    <section className="operations-section section-wrap" id="operations">
      <div className="section-heading operations-heading">
        <div><SectionLabel index="05">MANAGED OPERATIONS</SectionLabel><h2>Calm, even when<br /><span>systems are moving.</span></h2></div>
        <p>A preview of the signals a managed cloud practice can bring together. This dashboard uses sample data, not live Crystaflex telemetry.</p>
      </div>
      <div className="noc-dashboard">
        <div className="noc-sidebar">
          <div className="noc-brand"><span className="noc-mark"><Radar size={18} /></span><span>OPS / CONTROL<small>REFERENCE VIEW</small></span></div>
          <div className="noc-nav"><span className="noc-nav-active"><Activity size={15} /> Overview</span><span><Cloud size={15} /> Environments</span><span><Bell size={15} /> Incidents</span><span><LockKeyhole size={15} /> Security posture</span></div>
          <div className="noc-region"><span><i /> SAMPLE ENVIRONMENT</span><strong>multi-cloud / prod</strong><small>Illustrative data only</small></div>
        </div>
        <div className="noc-main">
          <div className="noc-topbar"><div><span className="noc-crumb">OPERATIONS</span><strong>Service overview</strong></div><span className="sample-badge"><i /> SAMPLE DATA</span></div>
          <div className="noc-metrics">
            <div><span>AVAILABILITY TARGET</span><strong>99.99<small>%</small></strong><small>Target only · not an SLA</small></div>
            <div><span>ENVIRONMENTS</span><strong>03</strong><small>AWS · Azure · Google Cloud</small></div>
            <div><span>SECURITY SIGNALS</span><strong className="metric-clear">MONITORED</strong><small>Example status · not live</small></div>
          </div>
          <div className="noc-lower">
            <div className="activity-panel"><div className="noc-panel-heading"><span>RECENT SIGNALS</span><span>LAST 15 MIN · SAMPLE</span></div>{incidents.map((incident) => <div className="incident-row" key={incident.time}><i className={`incident-indicator ${incident.tone}`} /><div><strong>{incident.title}</strong><span>{incident.service}</span></div><time>{incident.time}</time></div>)}</div>
            <div className="uptime-panel"><div className="noc-panel-heading"><span>HEALTH SIGNAL</span><span><Activity size={12} /> SAMPLE</span></div><div className="health-score"><span>Service checks</span><strong>All nominal</strong></div><div className="health-bars" aria-label="Illustrative service health visualization">{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ height: `${28 + ((index * 19 + 13) % 57)}%` }} />)}</div><div className="health-foot"><span>−15m</span><span>NOW</span></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="trust-section">
      <div className="section-wrap trust-layout">
        <div><SectionLabel index="06">SECURITY &amp; COMPLIANCE</SectionLabel><h2>Built to support<br /><span>your control framework.</span></h2></div>
        <div className="trust-content"><p>Identity, encryption, audit trails, and operating procedures can be designed to support your existing ISO 27001 and SOC 2 programs.</p><div className="trust-points"><span><ShieldCheck size={15} /> Least privilege</span><span><LockKeyhole size={15} /> Encryption in transit</span><span><Radar size={15} /> Observable by default</span></div><small>Crystaflex certification status is not represented here. Controls and attestations depend on the agreed scope and provider environment.</small></div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contact-section section-wrap" id="contact">
      <div className="contact-orbit" aria-hidden="true"><span /><span /><i /></div>
      <div className="contact-copy"><SectionLabel index="07">START WITH A CONVERSATION</SectionLabel><h2>Make your next<br />cloud move <span>clear.</span></h2><p>Bring us the messy diagram, the rising bill, or the big migration. We’ll start with the questions that matter.</p>
        <div className="contact-actions"><a className="button button-primary" href="mailto:sales@crystaflex.com?subject=Cloud%20strategy%20conversation">Email sales <ArrowUpRight size={15} /></a><a className="button button-outline" href="mailto:info@crystaflex.com">Email info <ArrowUpRight size={15} /></a></div>
      </div>
      <div className="contact-coordinate"><Sparkles size={16} /> PRACTICAL CLOUD. HUMAN PARTNERSHIP.</div>
    </section>
  )
}

function Footer() {
  const [year] = useState(() => new Date().getFullYear())

  return (
    <footer className="site-footer">
      <div className="footer-main section-wrap"><BrandMark /><p>Cloud infrastructure, made clearer.<br />Crystaflex Pvt Ltd</p><div className="footer-links"><span>EXPLORE</span><a href="#platforms">Cloud platforms</a><a href="#solutions">Capabilities</a><a href="#calculator">FinOps planner</a><a href="#operations">Operations preview</a></div><div className="footer-links footer-contact"><span>GET IN TOUCH</span><a href="mailto:sales@crystaflex.com">sales@crystaflex.com <ArrowUpRight size={13} /></a><a href="mailto:info@crystaflex.com">info@crystaflex.com <ArrowUpRight size={13} /></a><span>India · Working worldwide</span></div></div>
      <div className="footer-bottom section-wrap"><span>© {year} Crystaflex Pvt Ltd. All rights reserved.</span><span>Illustrative calculator and dashboard only. No performance guarantee or certification claim.</span></div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div className="site-shell min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="signal-ribbon"><div className="section-wrap"><span>ARCHITECT</span><i /><span>MIGRATE</span><i /><span>OPTIMIZE</span><i /><span>MANAGE</span><span className="ribbon-note">A BETTER CLOUD, BY DESIGN</span></div></div>
        <PlatformSection />
        <CapabilitySection />
        <ArchitectureExplorer />
        <FinOpsEstimator />
        <OperationsSection />
        <TrustSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}