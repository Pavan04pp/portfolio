import React, { useRef, useEffect, useState } from 'react';

const LINKS = [
  { label: 'pavankumarkm@gmail.com', href: 'mailto:pavankumarkm@gmail.com', icon: '✉' },
  { label: 'github.com/Pavan04pp', href: 'https://github.com/Pavan04pp', icon: '↗' },
  { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/pavankumarkm/', icon: '↗' },
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const [btnVis, setBtnVis] = useState<boolean[]>(new Array(LINKS.length).fill(false));

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Stagger buttons
  useEffect(() => {
    if (!vis) return;
    const timers = LINKS.map((_, i) =>
      setTimeout(() => setBtnVis(prev => { const n = [...prev]; n[i] = true; return n; }), 600 + i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [vis]);

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: '8rem 1.5rem', position: 'relative', zIndex: 1, textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Ambient gradient */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(226,185,111,0.04), transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        opacity: vis ? 1 : 0,
        transition: 'opacity 1.5s ease',
      }} />

      <div style={{ maxWidth: 650, margin: '0 auto', position: 'relative' }}>
        <span className="section-label" style={{
          display: 'block', textAlign: 'center', marginBottom: '1rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>Let's Connect</span>

        <h2 style={{
          fontSize: 'clamp(2.2rem, 6vw, 4rem)', marginBottom: '1rem',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(30px) scale(0.95)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }}>
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)', color: 'var(--text-dim)', fontSize: '1.05rem',
          lineHeight: 1.7, marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s',
        }}>
          Have a question or want to work together? I'm always open to new opportunities and interesting conversations.
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center',
        }}>
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="pill-btn"
              style={{
                opacity: btnVis[i] ? 1 : 0,
                transform: btnVis[i] ? 'none' : 'translateY(15px) scale(0.9)',
                transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.35s, color 0.35s, background 0.35s, box-shadow 0.35s',
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;