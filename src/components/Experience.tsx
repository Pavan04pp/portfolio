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
  const [lineHeight, setLineHeight] = useState(0);
  const [cardVis, setCardVis] = useState<boolean[]>(new Array(items.length).fill(false));
  const [dotVis, setDotVis] = useState<boolean[]>(new Array(items.length).fill(false));

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Animate timeline: line grows → dots appear → cards slide in
  useEffect(() => {
    if (!vis) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Grow the line over 800ms
    timers.push(setTimeout(() => setLineHeight(100), 300));

    // Then show dots one by one
    items.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setDotVis(prev => { const n = [...prev]; n[i] = true; return n; });
      }, 700 + i * 400));

      // Then slide in cards
      timers.push(setTimeout(() => {
        setCardVis(prev => { const n = [...prev]; n[i] = true; return n; });
      }, 900 + i * 400));
    });

    return () => timers.forEach(clearTimeout);
  }, [vis]);

  return (
    <section id="experience" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label" style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>My Journey</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}>
          Coding <span className="gradient-text">Journey</span>
        </h2>

        {/* Timeline layout */}
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Timeline line — animated height */}
          <div style={{
            position: 'absolute', left: '7px', top: 0,
            width: 1,
            height: `${lineHeight}%`,
            background: 'linear-gradient(180deg, var(--accent), rgba(255,255,255,0.04))',
            transition: 'height 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />

          {items.map((item, i) => (
            <div key={item.title} style={{
              marginBottom: i < items.length - 1 ? '2.5rem' : 0,
              position: 'relative',
            }}>
              {/* Timeline dot — scale pop */}
              <div style={{
                position: 'absolute', left: '-2rem',
                top: '0.5rem',
                width: 14, height: 14,
                borderRadius: '50%',
                background: 'var(--bg)',
                border: `2px solid ${item.badgeColor}`,
                zIndex: 1,
                transform: dotVis[i] ? 'scale(1)' : 'scale(0)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }} />

              {/* Card — slide in from left */}
              <div className="glass" style={{
                padding: '2rem',
                marginLeft: '0.5rem',
                opacity: cardVis[i] ? 1 : 0,
                transform: cardVis[i] ? 'none' : 'translateX(-30px)',
                transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;