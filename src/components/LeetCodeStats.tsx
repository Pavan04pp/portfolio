import React, { useState, useEffect, useRef } from 'react';

interface LeetCodeData {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  acceptance: number;
  ranking: number;
}

const DEMO: LeetCodeData = {
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
};

/* ── Animated SVG ring ──────────────────────────────────────────────── */
interface RingProps {
  value: number;      // current number shown in center
  total?: number;     // total (shown as /total below)
  pct: number;        // 0–100 fill percentage
  color: string;      // stroke color
  size: number;       // svg size in px
  strokeW?: number;
  label?: string;
  active: boolean;    // trigger animation when true
}

const AnimRing: React.FC<RingProps> = ({ value, total, pct, color, size, strokeW = 7, label, active }) => {
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!active) return;
    // animate stroke
    const target = circ - (pct / 100) * circ;
    let start: number | null = null;
    const duration = 1300;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setOffset(circ - (circ - target) * ease);
      if (prog < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    // animate count
    let v = 0;
    const inc = value / (duration / 16);
    const id = setInterval(() => {
      v += inc;
      if (v >= value) { setDisplayed(value); clearInterval(id); }
      else setDisplayed(Math.floor(v));
    }, 16);
    return () => clearInterval(id);
  }, [active, pct, circ, value]);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeW} />
          {/* fill */}
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke={color} strokeWidth={strokeW}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'none', filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        {/* center text */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-head)', fontWeight: 800,
            fontSize: size > 140 ? '2rem' : '1.15rem', color: '#fff', lineHeight: 1.1,
          }}>{displayed.toLocaleString()}</span>
          {total !== undefined && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
              color: 'var(--muted)', letterSpacing: '0.05em'
            }}>/ {total}</span>
          )}
        </div>
      </div>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)'
        }}>
          {label}
        </span>
      )}
    </div>
  );
};

/* ── Main Component ──────────────────────────────────────────────────── */
const LeetCodeStats: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeData>(DEMO);
  const [loading, setLoading] = useState(false); // start false — DEMO is pre-loaded
  const sectionRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  const LEETCODE_USERNAME = 'Pavan04Codes';

  // Intersection observer for ring animations
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.25 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Fetch stats
  useEffect(() => {
    const fetch_ = async () => {
      try {
        const [solvedRes, profileRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`),
          fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`),
        ]);
        if (!solvedRes.ok || !profileRes.ok) throw new Error();
        const s = await solvedRes.json();
        const p = await profileRes.json();
        const subs = s.totalSubmissionNum || [];
        const easyTotal = subs.find((x: any) => x.difficulty === 'Easy')?.count || 816;
        const medTotal = subs.find((x: any) => x.difficulty === 'Medium')?.count || 1698;
        const hardTotal = subs.find((x: any) => x.difficulty === 'Hard')?.count || 741;
        const acAll = s.acSubmissionNum?.find((x: any) => x.difficulty === 'All');
        const totAll = s.totalSubmissionNum?.find((x: any) => x.difficulty === 'All');
        const acceptance = acAll && totAll && totAll.submissions > 0
          ? Math.round((acAll.submissions / totAll.submissions) * 100) : 79;
        setStats({
          username: p.username || LEETCODE_USERNAME,
          totalSolved: s.solvedProblem || 236,
          totalQuestions: easyTotal + medTotal + hardTotal,
          easySolved: s.easySolved || 165,
          easyTotal,
          mediumSolved: s.mediumSolved || 65,
          mediumTotal: medTotal,
          hardSolved: s.hardSolved || 6,
          hardTotal,
          acceptance,
          ranking: p.ranking || 618235,
        });
      } catch {
        setStats(DEMO);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  // Only start ring animations when section is in view
  const canAnimate = vis;
  const d = stats;

  const statMeta = [
    { label: 'Problems Solved', value: d.totalSolved.toLocaleString(), color: 'var(--accent)' },
    { label: 'Acceptance Rate', value: `${d.acceptance}%`, color: 'var(--green)' },
    { label: 'Ranking', value: `#${d.ranking.toLocaleString()}`, color: 'var(--accent2)' },
  ];

  const difficulties = [
    { label: 'Easy', solved: d.easySolved, total: d.easyTotal, color: '#00e5a0', pct: (d.easySolved / d.easyTotal) * 100 },
    { label: 'Medium', solved: d.mediumSolved, total: d.mediumTotal, color: '#ffd77a', pct: (d.mediumSolved / d.mediumTotal) * 100 },
    { label: 'Hard', solved: d.hardSolved, total: d.hardTotal, color: '#ff6b6b', pct: (d.hardSolved / d.hardTotal) * 100 },
  ];

  return (
    <div ref={sectionRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Top row: profile | big ring | stats ── */}
      <div className="glass" style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        gap: '2rem', padding: '2.5rem', alignItems: 'center',
      }} id="lc-top-row">

        {/* Left: profile info */}
        <div>
          <span className="section-label" style={{ marginBottom: '0.5rem' }}>LeetCode</span>
          <h3 style={{
            fontFamily: 'var(--font-head)', fontWeight: 800,
            fontSize: '1.6rem', color: 'var(--text)', marginBottom: '0.4rem'
          }}>
            {d.username}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            color: 'var(--muted)', marginBottom: '1.25rem'
          }}>
            Competitive Programmer
          </p>
          <a
            href={`https://leetcode.com/${d.username}`}
            target="_blank" rel="noopener noreferrer"
            className="pill-btn"
            style={{ display: 'inline-flex' }}
          >↗ View Profile</a>
        </div>

        {/* Center: big total ring */}
        <AnimRing
          value={d.totalSolved}
          total={d.totalQuestions}
          pct={(d.totalSolved / d.totalQuestions) * 100}
          color="var(--accent)"
          size={170}
          strokeW={10}
          label="Total Solved"
          active={canAnimate}
        />

        {/* Right: 3 stat rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {statMeta.map(s => (
            <div key={s.label} style={{
              padding: '0.75rem 1rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(79,142,247,0.07)',
              borderRadius: 10,
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: '0.2rem'
              }}>{s.label}</p>
              <p style={{
                fontFamily: 'var(--font-head)', fontWeight: 800,
                fontSize: '1.25rem', color: s.color
              }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom row: difficulty cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}
        id="lc-difficulty-row">
        {difficulties.map(d => (
          <div key={d.label} className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <AnimRing
              value={d.solved}
              pct={d.pct}
              color={d.color}
              size={110}
              strokeW={8}
              active={canAnimate}
            />
            <div style={{ marginTop: '1rem' }}>
              <p style={{
                fontFamily: 'var(--font-head)', fontWeight: 700,
                fontSize: '1rem', color: d.color, marginBottom: '0.2rem'
              }}>{d.label}</p>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                color: 'var(--muted)', letterSpacing: '0.08em'
              }}>
                {d.solved} / {d.total} · {Math.round(d.pct)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #lc-top-row { grid-template-columns: 1fr !important; text-align: center; }
          #lc-top-row > div:first-child { display: flex; flex-direction: column; align-items: center; }
          #lc-top-row > div:last-child { align-items: center; }
          #lc-difficulty-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default LeetCodeStats;
