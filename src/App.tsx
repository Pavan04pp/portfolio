import React, { useEffect, useRef, useState } from 'react';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';

import AnimatedBackground from './components/AnimatedBackground';
import LeetCodeStats from './components/LeetCodeStats';
import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

/* ─── Real Projects ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    category: 'AI Tool',
    title: 'LegalEase AI',
    description:
      'Simplify legal documents with fast, AI-powered summaries, risk analysis and key-clause detection. Upload PDFs or text to get instant insights — secure and privacy-first.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Firebase'],
    link: 'https://legalease-ai-swart.vercel.app/',
  },
];

/* ─── Projects Section ───────────────────────────────────────────────────── */
const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label" style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>What I've Built</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}>
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {PROJECTS.map((project, i) => (
            <div key={project.title} className="project-card" style={{
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(40px) scale(0.95)',
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s`,
            }}>
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--emerald)',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  <span style={{ color: 'var(--muted)' }}>—</span> {project.category}
                </span>
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--muted)',
                  textDecoration: 'none', lineHeight: 1,
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.borderColor = 'rgba(226,185,111,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >↗</a>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-head)', fontWeight: 800,
                fontSize: '1.4rem', color: 'var(--text)', marginBottom: '0.75rem'
              }}>{project.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '1.5rem'
              }}>{project.description}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.stack.map(tech => (
                  <span key={tech} className="tag tag-blue">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── LeetCode Section ───────────────────────────────────────────────────── */
const LeetCodeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="leetcode" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label" style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>Competitive Coding</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}>
          Coding Challenge <span className="gradient-text">Progress</span>
        </h2>
        <LeetCodeStats />
      </div>
    </section>
  );
};

/* ─── App ────────────────────────────────────────────────────────────────── */
const App: React.FC = () => (
  <div style={{ position: 'relative', minHeight: '100vh' }}>
    <AnimatedBackground />
    <CustomCursor />
    <Navbar />
    <ScrollProgress />

    <main>
      <HeroSection />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Education />
      <div className="section-divider" />
      <LeetCodeSection />

      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>

    <ChatBot />
  </div>
);

export default App;