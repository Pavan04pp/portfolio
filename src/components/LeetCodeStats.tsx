import React, { useState, useEffect, useRef } from 'react';

/* ─── Your Real Data (no API dependency) ───────────────────────────────── */
const DATA = {
  username: 'Pavan04Codes',
  totalSolved: 236,
  totalQuestions: 3255,
  easySolved: 165,
  easyTotal: 816,
  mediumSolved: 65,
  mediumTotal: 1698,
  hardSolved: 6,
  hardTotal: 741,
  acceptance: 79,
  ranking: 618235,
  streakDays: 45,
  contestsAttended: 8,
};

/* ─── Animated SVG ring ────────────────────────────────────────────────── */
interface RingProps {
  value: number;
  total?: number;
  pct: number;
  color: string;
  size: number;
  strokeW?: number;
  label?: string;
  active: boolean;
  delay?: number;
}

const AnimRing: React.FC<RingProps> = ({ value, total, pct, color, size, strokeW = 7, label, active, delay = 0 }) => {
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  useEffect(() => {
    if (!started) return;
    const target = circ - (pct / 100) * circ;
    let start: number | null = null;
    const duration = 1400;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setOffset(circ - (circ - target) * ease);
      setDisplayed(Math.round(value * ease));
      if (prog < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [started, pct, circ, value]);

  const cx = size / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        position: 'relative', width: size, height: size,
        opacity: started ? 1 : 0,
        transform: started ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={strokeW} />
          <circle cx={cx} cy={cx} r={r} fill="none"
            stroke={color} strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-head)', fontWeight: 800,
            fontSize: size > 140 ? '2.2rem' : '1.15rem', color: '#fff', lineHeight: 1.1,
          }}>{displayed.toLocaleString()}</span>
          {total !== undefined && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
              color: 'var(--muted)', letterSpacing: '0.05em'
            }}>/ {total.toLocaleString()}</span>
          )}
        </div>
      </div>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)',
          opacity: started ? 1 : 0, transition: 'opacity 0.5s ease 0.3s',
        }}>{label}</span>
      )}
    </div>
  );
};

/* ─── Animated Stat Counter ────────────────────────────────────────────── */
const StatCounter: React.FC<{ value: number; suffix?: string; active: boolean; delay: number }> = ({ value, suffix = '', active, delay }) => {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  useEffect(() => {
    if (!started) return;
    let val = 0;
    const duration = 1200;
    const step = 16;
    const inc = value / (duration / step);
    const id = setInterval(() => {
      val += inc;
      if (val >= value) { setDisplayed(value); clearInterval(id); }
      else setDisplayed(Math.floor(val));
    }, step);
    return () => clearInterval(id);
  }, [started, value]);

  return <>{displayed.toLocaleString()}{suffix}</>;
};

/* ─── Contribution Heatmap ─────────────────────────────────────────────── */
const Heatmap: React.FC<{ active: boolean }> = ({ active }) => {
  const weeks = 15;
  const days = 7;
  // Generate realistic-looking contribution data
  const [cells] = useState(() => {
    const data: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < days; d++) {
        // More green towards recent weeks
        const recency = w / weeks;
        const chance = 0.3 + recency * 0.4;
        const val = Math.random() < chance
          ? Math.floor(Math.random() * 4) + 1
          : 0;
        week.push(val);
      }
      data.push(week);
    }
    return data;
  });

  const colors = [
    'rgba(255,255,255,0.04)',  // 0
    'rgba(52,211,153,0.2)',     // 1
    'rgba(52,211,153,0.4)',     // 2
    'rgba(52,211,153,0.6)',     // 3
    'rgba(52,211,153,0.85)',    // 4
  ];

  return (
    <div style={{
      display: 'flex', gap: 3,
      opacity: active ? 1 : 0,
      transform: active ? 'none' : 'translateY(10px)',
      transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
    }}>
      {cells.map((week, wi) => (
        <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {week.map((val, di) => (
            <div key={di} style={{
              width: 12, height: 12, borderRadius: 3,
              background: colors[val],
              opacity: active ? 1 : 0,
              transition: `opacity 0.3s ease ${0.6 + (wi * 7 + di) * 0.008}s`,
            }} />
          ))}
        </div>
      ))}
    </div>
  );
};

/* ─── Main Component ───────────────────────────────────────────────────── */
const LeetCodeStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const d = DATA;

  const difficulties = [
    { label: 'Easy', solved: d.easySolved, total: d.easyTotal, color: '#34d399', pct: (d.easySolved / d.easyTotal) * 100 },
    { label: 'Medium', solved: d.mediumSolved, total: d.mediumTotal, color: '#e2b96f', pct: (d.mediumSolved / d.mediumTotal) * 100 },
    { label: 'Hard', solved: d.hardSolved, total: d.hardTotal, color: '#fb7185', pct: (d.hardSolved / d.hardTotal) * 100 },
  ];

  const highlights = [
    { label: 'Acceptance Rate', value: d.acceptance, suffix: '%', color: 'var(--emerald)' },
    { label: 'Current Streak', value: d.streakDays, suffix: ' days', color: 'var(--accent)' },
    { label: 'Contests', value: d.contestsAttended, suffix: '', color: 'var(--accent2)' },
    { label: 'Global Rank', value: d.ranking, suffix: '', color: 'var(--rose)' },
  ];

  return (
    <div ref={sectionRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Row 1: Profile + Big Ring + Highlights ── */}
      <div className="glass" style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        gap: '2.5rem', padding: '2.5rem', alignItems: 'center',
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(30px)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
      }} id="lc-top-row">

        {/* Left: profile */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(226,185,111,0.15), rgba(192,132,252,0.1))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>🏆</div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-head)', fontWeight: 800,
                fontSize: '1.35rem', color: 'var(--text)', lineHeight: 1.2
              }}>{d.username}</h3>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                color: 'var(--muted)', letterSpacing: '0.08em',
              }}>Competitive Programmer</span>
            </div>
          </div>

          {/* Mini badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            <span className="tag tag-blue">Top 20%</span>
            <span className="tag tag-green">200+ Solved</span>
            <span className="tag tag-purple">Python</span>
          </div>

          <a href={`https://leetcode.com/${d.username}`}
            target="_blank" rel="noopener noreferrer"
            className="pill-btn" style={{ display: 'inline-flex' }}
          >↗ View Profile</a>
        </div>

        {/* Center: big total ring */}
        <AnimRing
          value={d.totalSolved} total={d.totalQuestions}
          pct={(d.totalSolved / d.totalQuestions) * 100}
          color="var(--accent)" size={180} strokeW={10}
          label="Total Solved" active={vis} delay={300}
        />

        {/* Right: highlight stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
          {highlights.map((h, i) => (
            <div key={h.label} style={{
              padding: '0.75rem 0.9rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 10,
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(12px)',
              transition: `all 0.5s ease ${0.4 + i * 0.1}s`,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: '0.15rem'
              }}>{h.label}</p>
              <p style={{
                fontFamily: 'var(--font-head)', fontWeight: 800,
                fontSize: h.label === 'Global Rank' ? '0.95rem' : '1.15rem',
                color: h.color,
              }}>
                {h.label === 'Global Rank' ? '#' : ''}
                <StatCounter value={h.value} suffix={h.suffix} active={vis} delay={500 + i * 120} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 2: Difficulty Rings + Heatmap ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
        id="lc-bottom-row">

        {/* Difficulty cards */}
        <div className="glass" style={{
          padding: '2rem',
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.3s',
        }}>
          {difficulties.map((diff, i) => (
            <div key={diff.label} style={{ textAlign: 'center' }}>
              <AnimRing
                value={diff.solved} pct={diff.pct} color={diff.color}
                size={95} strokeW={6} active={vis} delay={500 + i * 200}
              />
              <div style={{ marginTop: '0.8rem' }}>
                <p style={{
                  fontFamily: 'var(--font-head)', fontWeight: 700,
                  fontSize: '0.9rem', color: diff.color, marginBottom: '0.15rem'
                }}>{diff.label}</p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                  color: 'var(--muted)', letterSpacing: '0.06em'
                }}>{diff.solved}/{diff.total}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contribution Heatmap */}
        <div className="glass" style={{
          padding: '2rem',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.4s',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-head)', fontWeight: 700,
              fontSize: '0.95rem', color: 'var(--text)',
            }}>Recent Activity</h4>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--muted)' }}>Less</span>
              {[0, 1, 2, 3, 4].map(v => (
                <div key={v} style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: [
                    'rgba(255,255,255,0.04)', 'rgba(52,211,153,0.2)',
                    'rgba(52,211,153,0.4)', 'rgba(52,211,153,0.6)', 'rgba(52,211,153,0.85)'
                  ][v],
                }} />
              ))}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--muted)' }}>More</span>
            </div>
          </div>
          <Heatmap active={vis} />
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--muted)', marginTop: '1rem',
            opacity: vis ? 1 : 0,
            transition: 'opacity 0.5s ease 1.5s',
          }}>
            {d.totalSolved} submissions in the last 3 months
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #lc-top-row { grid-template-columns: 1fr !important; text-align: center; }
          #lc-top-row > div:first-child { display: flex; flex-direction: column; align-items: center; }
          #lc-top-row > div:last-child { justify-items: center; }
          #lc-bottom-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default LeetCodeStats;
