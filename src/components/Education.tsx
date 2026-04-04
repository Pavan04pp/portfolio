import React, { useRef, useEffect, useState } from 'react';

const educationItems = [
  {
    icon: '🎓',
    title: 'B.Tech in CSE',
    place: 'National Institute of Engineering',
    location: 'Mysore',
    period: '2024 – 2028',
    badgeLabel: 'Specializing in',
    badgeValue: 'AI & Machine Learning',
    color: 'var(--accent)',
  },
  {
    icon: '📚',
    title: '12th Grade',
    place: 'Akshara PU College',
    location: '',
    period: '2022 – 2024',
    badgeLabel: 'Score',
    badgeValue: '97%',
    color: 'var(--green)',
  },
  {
    icon: '🏫',
    title: '10th Grade',
    place: 'Pushpa English Medium School',
    location: '',
    period: '2021 – 2022',
    badgeLabel: 'Score',
    badgeValue: '96%',
    color: 'var(--green)',
  },
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">Academic Background</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>Education Journey</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {educationItems.map((item, i) => (
            <div key={item.title} className="glass" style={{
              padding: '2rem', position: 'relative', overflow: 'hidden',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(30px)',
              transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
            }}>
              {/* Accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: item.color,
              }} />

              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem',
                color: 'var(--text)', marginBottom: '0.4rem'
              }}>{item.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: 'var(--text-dim)', marginBottom: item.location ? '0.2rem' : '0.5rem'
              }}>{item.place}</p>
              {item.location && <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                color: 'var(--muted)', marginBottom: '0.5rem'
              }}>{item.location}</p>}
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.08em', color: item.color, marginBottom: '1.25rem'
              }}>{item.period}</p>

              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(79,142,247,0.1)',
                borderRadius: 8, padding: '0.6rem 0.9rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.2rem'
                }}>
                  {item.badgeLabel}
                </p>
                <p style={{
                  fontFamily: 'var(--font-head)', fontWeight: 700,
                  color: item.color, fontSize: item.badgeValue.includes('%') ? '1.4rem' : '0.9rem'
                }}>
                  {item.badgeValue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;