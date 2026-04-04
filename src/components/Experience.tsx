import React, { useRef, useEffect, useState } from 'react';

const items = [
  {
    icon: '⌨️',
    title: 'Beginning of Coding',
    period: '12th Grade',
    desc: 'My coding journey began during my 12th grade, where I first discovered my passion for programming. I started with C++, learning the fundamentals of programming and problem-solving.',
    badge: 'Mastered C++ Fundamentals',
    badgeColor: 'var(--accent)',
  },
  {
    icon: '🤖',
    title: 'AI & ML Discovery',
    period: 'College — Present',
    desc: 'As I progressed, I discovered Python and was immediately drawn to its potential in Artificial Intelligence and Machine Learning. This sparked my interest in AI/ML, leading me to start my journey in this exciting field.',
    badge: 'AI & Machine Learning',
    badgeColor: 'var(--accent2)',
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">My Journey</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>Coding Journey</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {items.map((item, i) => (
            <div key={item.title} className="glass" style={{
              padding: '2rem',
              borderLeft: `3px solid ${item.badgeColor}`,
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(28px)',
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: item.badgeColor, display: 'block', marginBottom: '0.5rem',
              }}>{item.period}</span>
              <h3 style={{
                fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem',
                color: 'var(--text)', marginBottom: '0.75rem'
              }}>{item.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '1.25rem'
              }}>{item.desc}</p>
              <span className="tag tag-blue">{item.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;