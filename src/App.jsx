
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Github, Linkedin, Mail, Phone, Download, Menu, X, ArrowUpRight, ExternalLink
} from 'lucide-react';

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const SKILLS = [
  { name: 'React.js',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Ruby on Rails', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg' },
  { name: 'Node.js',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'JavaScript',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'MongoDB',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Tailwind CSS',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Express.js',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Git',           logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'HTML5',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

const PROJECTS = [
  {
    title: 'Full-Stack E-Commerce',
    subtitle: 'Retail Platform',
    desc: 'Production-ready MERN e-commerce ecosystem with JWT authentication, role-based access control, product catalogue, cart & order REST APIs. React frontend with Node/MongoDB backend.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'JWT'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=900&h=500',
    link: 'https://github.com/Dharaneesh6/ecommerce'
  },
  {
    title: 'Coffee Shop Platform',
    subtitle: 'F&B Management App',
    desc: 'End-to-end coffee shop management with admin dashboard, JWT auth, product & event APIs, and reservation system. MongoDB and Express for backend, React for frontend.',
    stack: ['React.js', 'Express.js', 'MongoDB','JWT'],
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=900&h=500',
    link: 'https://github.com/Dharaneesh6/coffee-shop-frontend'
  },
];

const EXPERIENCE = [
  {
    role: 'Ruby on Rails Developer',
    company: 'Zolvit · formerly Vakilsearch',
    period: 'Dec 2025 – Present',
    active: true,
    bullets: [
      { tag: '10+ APIs',          text: 'Developed and enhanced 10+ RESTful APIs handling 5,000+ monthly requests to process frontend inputs and manage structured database storage.' },
      { tag: '30% less effort',   text: 'Built cross-sale ticket workflow integrating 5+ service types with conditional payment handling, reducing manual processing effort by 30%.' },
      { tag: '20% efficiency ↑',  text: 'Implemented dynamic payment popup form improving ticket creation efficiency by 20% and reducing payment-related errors.' },
      { tag: '15% cost saving',   text: 'Added email validation restrictions preventing internal domain misuse in CC/BCC, cutting email infrastructure costs by 15%.' },
      { tag: '60% automated',     text: 'Created automated TAT reporting via Rake tasks (4×/day), tracking 1,000+ active tickets and eliminating 60% of manual reporting effort.' },
      { tag: '70% faster',        text: 'Optimised tickets page with smarter DB queries — load time slashed from 5 s to 1.5 s, a 70% performance gain.' },
      { tag: 'Workflow design',   text: 'Implemented new ticket service workflow auto-assigning tickets to a common queue before routing to the correct service employee.' },
      { tag: 'UI Development', text: 'Developed a user-centric UI feature with CTAs using React/Next.js for a page used by over 600K users.'},

    ],
  },
];

/* ══════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function Portfolio() {
  const [loading,   setLoading]   = useState(true);
  const [percent,   setPercent]   = useState(0);
  const [navScrolled, setNav]     = useState(false);
  const [menuOpen,  setMenu]      = useState(false);

  /* Preloader */
  useEffect(() => {
    const iv = setInterval(() => {
      setPercent(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => setLoading(false), 400); return 100; }
        return p + 2;
      });
    }, 18);
    return () => clearInterval(iv);
  }, []);

  /* Scroll */
  useEffect(() => {
    const fn = () => setNav(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenu(false);
  };

  /* ── PRELOADER ── */
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="leading-none mb-6">
            <span
              className="text-[10rem] md:text-[14rem] font-black text-transparent select-none"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)', fontFamily: "'Syne', sans-serif" }}
            >
              {percent}
            </span>
            <span className="text-blue-500 text-5xl font-black">%</span>
          </div>
          <p className="text-gray-600 uppercase tracking-[0.5em] text-[10px]">Loading Portfolio</p>
          <div className="mt-8 w-48 mx-auto h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${percent}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, body { font-family:'DM Sans',sans-serif; }
        h1,h2,h3,.syne { font-family:'Syne',sans-serif !important; }
        ::selection { background:#2563eb; color:#fff; }
        ::-webkit-scrollbar { width:2px; background:#000; }
        ::-webkit-scrollbar-thumb { background:#333; border-radius:2px; }
        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.6)} 50%{box-shadow:0 0 0 6px rgba(59,130,246,0)} }
        .pulse-dot { animation:pulse-dot 2s infinite; }
        @keyframes bounce-y { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        .bounce-cue { animation:bounce-y 2.2s ease-in-out infinite; }
      `}</style>

      <div className="bg-[#050505] text-white overflow-x-hidden">

        {/* ══ NAV ══ */}
        <nav className={`fixed top-0 inset-x-0 z-[100] px-6 md:px-12 transition-all duration-500 ${
          navScrolled ? 'py-4 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5' : 'py-7'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => go('hero')}
              className="syne text-xl font-bold tracking-tight text-white bg-transparent border-none cursor-pointer">
              DHARANEESH<span className="text-blue-500">.</span>
            </button>

            <div className="hidden md:flex gap-10">
              {['About','Experience','Skills','Projects','Contact'].map(l => (
                <button key={l} onClick={() => go(l.toLowerCase())}
                  className="text-[16px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                  {l}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="https://drive.google.com/file/d/1QC07BvvC4bnVcNwpOPY8CSAOohN3u3Zk/view?usp=sharing"
                className="hidden sm:flex items-center gap-2 border border-white/10 hover:border-blue-500/50 px-5 py-2.5 rounded-full text-[14px] font-black uppercase tracking-widest transition-all hover:bg-blue-500/5">
                Resume <Download size={13} className="text-blue-500" />
              </a>
              <button onClick={() => go('contact')}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-[14px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(59,130,246,.35)] border-none cursor-pointer">
                Hire Me
              </button>
              <button onClick={() => setMenu(!menuOpen)}
                className="md:hidden p-2 bg-transparent border-none cursor-pointer text-white">
                {menuOpen ? <X size={22}/> : <Menu size={22}/>}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-50 bg-[#050505]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
              {['About','Experience','Skills','Projects','Contact'].map(l => (
                <button key={l} onClick={() => go(l.toLowerCase())}
                  className="syne text-3xl font-bold text-white hover:text-blue-500 transition-colors bg-transparent border-none cursor-pointer">
                  {l}
                </button>
              ))}
              <button onClick={() => setMenu(false)} className="mt-6 text-blue-500 bg-transparent border-none cursor-pointer">
                <X size={36}/>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ HERO ══ */}
        <section id="hero" className="relative min-h-screen flex items-center px-6 md:px-12 pt-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed brightness-[0.18]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000')" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage:'radial-gradient(#fff 1px,transparent 1px)', backgroundSize:'40px 40px' }} />

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                <span className="text-[11px] font-medium text-gray-400 tracking-wide">Available for full-time roles</span>
              </div>

              <p className="text-blue-500 font-bold tracking-[0.3em] text-xs uppercase mb-5">Web Stack Developer</p>

              <h1 className="syne text-6xl sm:text-7xl md:text-8xl lg:text-[5rem] font-bold leading-[1.02] mb-8">
                Building modern<br/>
                <span className="text-transparent font-extrabold" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>web applications</span>{' '}
                with scalable code<br/>
              </h1>

              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
                I am <span className="text-white font-semibold">Dharaneesh L S</span>, a Computer Science student at SSCE (CGPA: 8.03),
                currently I am building web applications at{' '}
                <span className="text-blue-400 font-semibold">Zolvit</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => go('projects')}
                  className="bg-blue-600 text-white px-7 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-[0_0_24px_rgba(59,130,246,.4)] hover:shadow-[0_0_32px_rgba(59,130,246,.5)] border-none cursor-pointer">
                  View My Work
                </button>
                <button onClick={() => go('contact')}
                  className="border border-white/15 backdrop-blur-sm text-white px-7 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:border-white/40 hover:bg-white/5 transition-all bg-transparent cursor-pointer">
                  Get In Touch
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 flex flex-wrap gap-10 md:gap-16 pb-6"
            >
              {[['10+','RESTful APIs Built'],['5K+','Monthly API Requests'],['70%','Page Load Improved']].map(([n,l]) => (
                <div key={l}>
                  <p className="syne text-4xl font-bold text-white">{n}</p>
                  <p className="text-xs text-gray-500 mt-1 tracking-wide">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="bounce-cue absolute bottom-8 left-1/2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <AboutSection go={go} />

        {/* ══ EXPERIENCE ══ */}
        <ExperienceSection />

        {/* ══ SKILLS ══ */}
        <SkillsSection />

        {/* ══ PROJECTS ══ */}
        <ProjectsSection />

        {/* ══ CONTACT ══ */}
        <ContactSection go={go} />

        {/* ══ FOOTER ══ */}
        <div className="border-t border-white/5 py-8 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-600">
            <span className="syne text-gray-400">© 2026 Dharaneesh L S — Engineering Excellence.</span>
            <div className="flex gap-8">
              <span>Tamil Nadu, India</span>
              <span>Built with React + Framer Motion</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

/* ══════════════════════════════════════
   ABOUT
══════════════════════════════════════ */
function AboutSection({ go }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={fadeUp}>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-4 block">01 / Profile</span>
              <h2 className="syne text-4xl md:text-5xl font-bold mb-8">
                Professional <span className="italic text-blue-500">Summary</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5 text-gray-400 text-[17px] leading-relaxed">
              <p>
                Web Developer with hands-on experience in building scalable web applications using{' '}
                <span className="text-white font-semibold">React.js, Express.js, Ruby on Rails, and JavaScript (ES6+)</span>.
                Skilled in crafting responsive UIs, integrating REST APIs, and developing robust database-driven backends.
              </p>
              <p>
                Currently at <span className="text-white font-semibold">Zolvit</span>, I engineer production-grade fintech solutions —
                from APIs handling <span className="text-white font-semibold">5,000+ monthly requests</span> to Rake-task automations
                that eliminate hundreds of hours of manual work every month.
              </p>
              <p>
                I thrive in cross-functional teams, collaborating with product, design, and ops to ship solutions that create measurable
                business impact. Detail-oriented with a strong focus on clean, scalable code and continuous performance improvement.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              {['REST APIs','MVC Architecture','Performance Optimisation','Agile / Scrum','Cross-functional Teams'].map(t => (
                <span key={t} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 text-gray-400 px-4 py-2 rounded-full hover:border-blue-500/40 hover:text-white transition-colors">
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="pt-4">
              <button onClick={() => go('contact')}
                className="flex items-center gap-2 text-blue-500 font-bold text-sm hover:gap-4 transition-all bg-transparent border-none cursor-pointer">
                Let's work together <ArrowUpRight size={16}/>
              </button>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-3">
            {[
              { emoji:'🎓', title:'Education', sub:'B.E. Computer Science · CGPA 8.03 · Sree Sowdambika College, Aruppukottai · 2022–2026' },
              { emoji:'🚀', title:'Current Role', sub:'Ruby on Rails Developer · Zolvit (formerly Vakilsearch) · Dec 2025 – Present' },
              { emoji:'⚡', title:'Performance Win', sub:'Tickets page load: 5 s → 1.5 s · 70% improvement via DB query optimisation' },
              { emoji:'📊', title:'Automation', sub:'TAT Rake system runs 4×/day · tracks 1,000+ tickets · saves 60% manual effort' },
              { emoji:'🔗', title:'API Scalability', sub:'10+ RESTful APIs built · 5,000+ monthly requests · structured database management' },
            ].map(({ emoji, title, sub }) => (
              <motion.div key={title}
                whileHover={{ x: 8, borderColor: 'rgba(59,130,246,0.3)' }}
                className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl flex items-start gap-4 transition-all hover:bg-white/[0.05]">
                <span className="text-2xl shrink-0">{emoji}</span>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════ */
function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-4 block">02 / Career</span>
          <h2 className="syne text-4xl md:text-5xl font-bold mb-16">
            Professional <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.35)' }}>Experience</span>
          </h2>
        </motion.div>

        {/* Timeline — single entry, no vertical line needed */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="max-w-5xl">
          {EXPERIENCE.map((job) => (
            <motion.div key={job.role} variants={fadeUp}
              className="bg-white/[0.03] border border-white/8 rounded-3xl p-8 md:p-10">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                <div>
                  <h3 className="syne text-2xl font-bold text-white">{job.role}</h3>
                  <p className="text-blue-400 font-bold text-sm uppercase tracking-widest mt-1">{job.company}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap self-start text-blue-400 bg-blue-500/10 border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  {job.period}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-white/5 mb-6" />

              {/* Bullets */}
              <ul className="space-y-4">
                {job.bullets.map(({ tag, text }) => (
                  <li key={tag} className="flex gap-10 text-sm text-gray-400 leading-relaxed">
                    <span className="shrink-0 self-start mr-1mt-0.5 text-[10px] font-black text-gray-900 bg-blue-500 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {tag}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   SKILLS
══════════════════════════════════════ */
function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-4 block">03 / Expertise</span>
          <h2 className="syne text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.35)' }}>Skills</span>
          </h2>
          <p className="text-gray-500 max-w-xl mb-14 leading-relaxed">
            Technologies I use daily — spanning frontend, backend, databases, and developer tooling.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-14">
          {SKILLS.map((s) => (
            <motion.div key={s.name} variants={fadeUp}
              whileHover={{ scale: 1.06, borderColor: 'rgba(59,130,246,0.4)' }}
              className="bg-white/95 border border-white/8 rounded-2xl p-5 flex flex-col items-center gap-3 transition-colors cursor-default">
              <img src={s.logo} alt={s.name} className="w-9 h-9 object-contain"
                onError={e => { e.currentTarget.style.opacity = '0'; }} />
              <span className="text-[11px] font-semibold text-gray-400 text-center leading-tight">{s.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex flex-wrap gap-3">
          {['Problem Solving','Collaboration','Communication','Detail-Oriented'].map(s => (
            <span key={s} className="text-[11px] font-bold text-gray-500 border border-white/8 px-4 py-2 rounded-full hover:border-blue-500/30 hover:text-white transition-colors">
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PROJECTS
══════════════════════════════════════ */
function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} className="py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-4 block">04 / Work</span>
          <h2 className="syne text-4xl md:text-5xl font-bold mb-4">
            Selected <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.35)' }}>Works</span>
          </h2>
          <p className="text-gray-500 max-w-xl mb-16 leading-relaxed">
            Full-stack applications built end-to-end — from DB design and REST APIs to responsive, accessible front-ends.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-[#0d0d0d] border border-white/8 rounded-3xl overflow-hidden cursor-pointer"
    >
      <div className="relative overflow-hidden" style={{ height: 240 }}>
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover brightness-75  transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 text-[10px] font-bold bg-black/60 backdrop-blur-sm text-gray-300 border border-white/10 px-3 py-1 rounded-full">
          {p.subtitle}
        </span>
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20">
          <ArrowUpRight size={15} className="text-white"/>
        </a>
      </div>

      <div className="p-7">
        <h3 className="syne text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{p.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.desc}</p>
        <div className="flex flex-wrap gap-2">
          {p.stack.map(s => (
            <span key={s} className="text-[9px] font-bold uppercase tracking-widest border border-white/10 text-gray-500 px-3 py-1 rounded-full group-hover:border-blue-500/25 transition-colors">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   CONTACT
══════════════════════════════════════ */
function ContactSection({ go }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="py-32 px-6 md:px-12 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <motion.div variants={fadeUp}>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-4 block">05 / Contact</span>
              <h2 className="syne text-4xl md:text-6xl font-bold leading-tight mb-6">
                Let's <span className="italic text-blue-500">Connect</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                Actively looking for entry-level web developer roles. If you're building something exciting or want to collaborate — reach out.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-10">
              {[
                { Icon: Mail,     label:'Email',    value:'dharaneesh2406@gmail.com', href:'mailto:dharaneesh2406@gmail.com' },
                { Icon: Phone,    label:'Phone',    value:'+91 93455 87582',           href:'tel:+919345587582' },
                { Icon: Linkedin, label:'LinkedIn', value:'linkedin.com/in/dharaneesh',href:'https://linkedin.com/in/dharaneesh-l-s-1447a9296' },
                { Icon: Github,   label:'GitHub',   value:'github.com/dharaneesh',     href:'https://github.com/dharaneesh6' },
              ].map(({ Icon, label, value, href }) => (
                <a key={label} href={href}
                  className="flex items-center gap-4 group no-underline">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all shrink-0">
                    <Icon size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors"/>
                  </div>
                  <div>
                    <p className="text-[15px] text-gray-600 uppercase tracking-widest font-bold mb-0.5">{label}</p>
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="space-y-4">
            <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-8">
              <h3 className="syne text-2xl font-bold text-white mb-2">Open to Opportunities</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Looking for a full-stack developer who ships fast, cares about quality, and delivers measurable impact? Let's talk.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  ['Web Developer','Entry-level · 3 months experience'],
                  ['Ruby on Rails / Express.js','Backend APIs'],
                  ['React.js','Responsive, accessible UIs'],
                  ['Remote or On-Site', 'Chennai / Tamil Nadu / India'],
                ].map(([title, sub]) => (
                  <div key={title} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"/>
                    <span className="text-white text-sm font-semibold">{title}</span>
                    <span className="text-gray-600 text-sm">· {sub}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:dharaneesh2406@gmail.com"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-blue-700 transition-colors no-underline shadow-[0_0_20px_rgba(59,130,246,.3)]">
                Send a Message <ArrowUpRight size={16}/>
              </a>
            </div>

            {/* <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 text-2xl">🎓</div>
              <div>
                <p className="text-white font-semibold text-sm">B.E. Computer Science &amp; Engineering</p>
                <p className="text-gray-500 text-xs mt-1">Sree Sowdambika College · Aruppukottai · 2022–2026 · CGPA 8.03</p>
              </div>
            </div> */}

            <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mb-4">Explore</p>
                  <ul className="space-y-3 text-sm text-gray-400">
                    {['About','Experience','Skills','Projects'].map(l => (
                      <li key={l}>
                        <button onClick={() => go(l.toLowerCase())}
                          className="hover:text-white transition-colors bg-transparent border-none cursor-pointer text-left text-sm text-gray-400">
                          {l}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mb-4">Network</p>
                  <ul className="space-y-3 text-sm text-gray-400">
                    {[['LinkedIn','https://linkedin.com/in/dharaneesh-l-s-1447a9296'],['GitHub','https://github.com/dharaneesh6'],['Email','mailto:dharaneesh2406@gmail.com']].map(([l, h]) => (
                      <li key={l}>
                        <a href={h} className="hover:text-white transition-colors flex items-center gap-2 no-underline text-gray-400">
                          {l} <ExternalLink size={12}/>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="https://drive.google.com/file/d/1QC07BvvC4bnVcNwpOPY8CSAOohN3u3Zk/view?usp=sharing" className="hover:text-white transition-colors flex items-center gap-2 no-underline text-gray-400">
                        Resume <Download size={12}/>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}