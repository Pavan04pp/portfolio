import React, { useRef, useEffect, useState } from 'react';
import { SiPython, SiCplusplus, SiSharp, SiJavascript, SiHtml5, SiCss3, SiDjango, SiPytorch, SiNumpy, SiPandas, SiReact, SiTypescript, SiGit } from 'react-icons/si';

/* ── Marquee Icons ──────────────────────────────────────────────── */
const MARQUEE_ICONS = [
  { Icon: SiPython, name: 'Python', color: '#e2b96f' },
  { Icon: SiCplusplus, name: 'C++', color: '#c084fc' },
  { Icon: SiJavascript, name: 'JavaScript', color: '#e2b96f' },
  { Icon: SiPytorch, name: 'PyTorch', color: '#fb7185' },
  { Icon: SiReact, name: 'React', color: '#7dd3fc' },
  { Icon: SiTypescript, name: 'TypeScript', color: '#7dd3fc' },
  { Icon: SiDjango, name: 'Django', color: '#34d399' },
  { Icon: SiNumpy, name: 'NumPy', color: '#c084fc' },
  { Icon: SiPandas, name: 'Pandas', color: '#c084fc' },
  { Icon: SiHtml5, name: 'HTML5', color: '#fb7185' },
  { Icon: SiCss3, name: 'CSS3', color: '#7dd3fc' },
  { Icon: SiSharp, name: 'C#', color: '#c084fc' },
  { Icon: SiGit, name: 'Git', color: '#fb7185' },
];

/* ── Skill Categories with progress ──────────────────────────────── */
interface SkillItem {
  name: string;
  level: number;
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
}

interface Category {
  title: string;
  color: string;
  barColor: string;
  skills: SkillItem[];
}

const CATEGORIES: Category[] = [
  {
    title: 'Core Languages',
    color: 'var(--accent)',
    barColor: '#e2b96f',
    skills: [
      { name: 'Python', level: 90, Icon: SiPython },
      { name: 'C++', level: 80, Icon: SiCplusplus },
      { name: 'C#', level: 65, Icon: SiSharp },
      { name: 'JavaScript', level: 75, Icon: SiJavascript },
    ],
  },
  {
    title: 'AI / Machine Learning',
    color: 'var(--accent2)',
    barColor: '#c084fc',
    skills: [
      { name: 'PyTorch', level: 70, Icon: SiPytorch },
      { name: 'NumPy', level: 85, Icon: SiNumpy },
      { name: 'Pandas', level: 80, Icon: SiPandas },
    ],
  },
  {
    title: 'Web & Tools',
    color: 'var(--emerald)',
    barColor: '#34d399',
    skills: [
      { name: 'Django', level: 60, Icon: SiDjango },
      { name: 'HTML5', level: 85, Icon: SiHtml5 },
      { name: 'CSS3', level: 80, Icon: SiCss3 },
    ],
  },
];

/* ── Animated Progress Bar with counter ──────────────────────────── */
const ProgressBar: React.FC<{ level: number; color: string; active: boolean; delay: number }> = ({ level, color, active, delay }) => {
  const [width, setWidth] = useState(0);
  const [displayedPct, setDisplayedPct] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      setWidth(level);
      // Animate the counter
      let val = 0;
      const duration = 1000;
      const step = 16;
      const inc = level / (duration / step);
      const id = setInterval(() => {
        val += inc;
        if (val >= level) { setDisplayedPct(level); clearInterval(id); }
        else setDisplayedPct(Math.floor(val));
      }, step);
    }, delay);
    return () => clearTimeout(t);
  }, [active, level, delay]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{
        flex: 1, height: 4, borderRadius: 2,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${width}%`,
          height: '100%',
          borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}90)`,
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        color: 'var(--muted)', minWidth: '2.5rem', textAlign: 'right',
      }}>{displayedPct}%</span>
    </div>
  );
};

/* ── Main Skills Component ───────────────────────────────────────── */
const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const [cardVis, setCardVis] = useState<boolean[]>(new Array(CATEGORIES.length).fill(false));

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Stagger cards
  useEffect(() => {
    if (!vis) return;
    const timers = CATEGORIES.map((_, i) =>
      setTimeout(() => setCardVis(prev => { const n = [...prev]; n[i] = true; return n; }), 500 + i * 200)
    );
    return () => timers.forEach(clearTimeout);
  }, [vis]);

  const marqueeItems = [...MARQUEE_ICONS, ...MARQUEE_ICONS];

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '6rem 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <span className="section-label" style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>What I Work With</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}>
          Skills & <span className="gradient-text">Tools</span>
        </h2>
      </div>

      {/* ── Infinite Scrolling Marquee ── */}
      <div style={{
        overflow: 'hidden',
        marginBottom: '4rem',
        padding: '1.5rem 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(15px)',
        transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
      }}>
        <div style={{
          display: 'flex',
          gap: '3rem',
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}>
          {marqueeItems.map((item, i) => (
            <div key={`${item.name}-${i}`} style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              flexShrink: 0,
              opacity: 0.5,
              transition: 'opacity 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <item.Icon style={{ fontSize: '1.4rem', color: item.color }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.05em', color: 'var(--text-dim)',
                whiteSpace: 'nowrap',
              }}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Categorized Skill Cards with Progress ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {CATEGORIES.map((cat, ci) => (
          <div key={cat.title} className="glass" style={{
            padding: '2rem',
            opacity: cardVis[ci] ? 1 : 0,
            transform: cardVis[ci] ? 'none' : 'translateY(40px) scale(0.95)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            {/* Category header with animated left bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              marginBottom: '1.75rem',
            }}>
              <div style={{
                width: 3, borderRadius: 2,
                height: cardVis[ci] ? 24 : 0,
                background: cat.barColor,
                transition: 'height 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }} />
              <h3 style={{
                fontFamily: 'var(--font-head)', fontWeight: 700,
                fontSize: '1.1rem', color: 'var(--text)',
              }}>{cat.title}</h3>
            </div>

            {/* Skills list with animated progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cat.skills.map((skill, si) => (
                <div key={skill.name}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}>
                    <skill.Icon style={{ fontSize: '1rem', color: cat.barColor }} />
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                      color: 'var(--text)',
                    }}>{skill.name}</span>
                  </div>
                  <ProgressBar
                    level={skill.level}
                    color={cat.barColor}
                    active={cardVis[ci]}
                    delay={200 + si * 150}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;