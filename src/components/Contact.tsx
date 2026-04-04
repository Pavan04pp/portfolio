import React, { useRef, useEffect, useState } from 'react';

const LINKS = [
  { label: 'pavankumarkm@gmail.com', href: 'mailto:pavankumarkm@gmail.com', icon: '✉' },
  { label: 'github.com/Pavan04pp', href: 'https://github.com/Pavan04pp', icon: '↗' },
  { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/pavankumarkm/', icon: '↗' },
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: '8rem 1.5rem', position: 'relative', zIndex: 1, textAlign: 'center',
    }}>
      <div style={{ maxWidth: 650, margin: '0 auto' }}>
        <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
          Let's Connect
        </span>

        <h2 style={{
          fontSize: 'clamp(2.2rem, 6vw, 4rem)', marginBottom: '1rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)', color: 'var(--text-dim)', fontSize: '1rem',
          lineHeight: 1.7, marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
        }}>
          Have a question or want to work together? I'm always open to new opportunities and interesting conversations.
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
        }}>
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="pill-btn"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,92,252,0.05), transparent)',
      }} />
    </section>
  );
};

export default Contact;