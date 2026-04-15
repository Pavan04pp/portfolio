import React, { useRef, useEffect, useState } from 'react';

/* ── Animated Score Ring ──────────────────────────────────────────── */
const ScoreRing: React.FC<{ value: number; color: string; active: boolean; delay: number }> = ({ value, color, active, delay }) => {
  const size = 70;
  const strokeW = 5;
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => {
      const target = circ - (value / 100) * circ;
      let start: number | null = null;
      const duration = 1200;
      const raf = (ts: number) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        setOffset(circ - (circ - target) * ease);
        setDisplayed(Math.round(value * ease));
        if (prog < 1) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, value, circ, delay]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={strokeW} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-head)', fontWeight: 800,
          fontSize: '0.95rem', color: color,
        }}>{displayed}%</span>
      </div>
    </div>
  );
};

/* ── Data ─────────────────────────────────────────────────────────── */
const educationItems = [
  {
    icon: '🎓',
    title: 'B.Tech in CSE',
    place: 'National Institute of Engineering',
    location: 'Mysore',
    period: '2024 – 2028',
    badgeLabel: 'Specializing in',
    badgeValue: 'AI & Machine Learning',
    color: '#e2b96f',
    isPercent: false,
  },
  {
    icon: '📚',
    title: '12th Grade',
    place: 'Akshara PU College',
    location: '',
    period: '2022 – 2024',
    badgeLabel: 'Score',
    badgeValue: '97%',
    color: '#34d399',
    isPercent: true,
    score: 97,
  },
  {
    icon: '🏫',
    title: '10th Grade',
    place: 'Pushpa English Medium School',
    location: '',
    period: '2021 – 2022',
    badgeLabel: 'Score',
    badgeValue: '96%',
    color: '#34d399',
    isPercent: true,
    score: 96,
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
        <span className="section-label" style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>Academic Background</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}>
          Education <span className="gradient-text">Journey</span>
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem'
        }}>
          {educationItems.map((item, i) => (
            <div key={item.title} className="glass" style={{
              padding: '2rem', position: 'relative', overflow: 'hidden',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(40px) scale(0.95)',
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`,
            }}>
              {/* Accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, height: 1,
                width: vis ? '100%' : '0%',
                background: `linear-gradient(90deg, ${item.color}, transparent)`,
                transition: `width 0.8s ease ${0.5 + i * 0.15}s`,
              }} />

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              }}>
                <div style={{ flex: 1 }}>
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
                    fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                    letterSpacing: '0.08em', color: item.color,
                  }}>{item.period}</p>
                </div>

                {/* Animated Score Ring for percentage items */}
                {item.isPercent && item.score && (
                  <div style={{
                    opacity: vis ? 1 : 0,
                    transform: vis ? 'none' : 'scale(0.5)',
                    transition: `all 0.6s ease ${0.6 + i * 0.15}s`,
                  }}>
                    <ScoreRing value={item.score} color={item.color} active={vis} delay={600 + i * 200} />
                  </div>
                )}
              </div>

              {/* Badge area for non-percent items */}
              {!item.isPercent && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, padding: '0.7rem 1rem', marginTop: '1.25rem',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.2rem'
                  }}>{item.badgeLabel}</p>
                  <p style={{
                    fontFamily: 'var(--font-head)', fontWeight: 700,
                    color: item.color, fontSize: '0.9rem'
                  }}>{item.badgeValue}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;