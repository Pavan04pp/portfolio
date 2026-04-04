import React, { useEffect, useRef, useState } from 'react';

/* ── Animated role text cycling ─────────────────────────────────── */
const ROLES = ['AI / ML Engineer', 'Deep Learning', 'NLP Enthusiast', 'Computer Vision'];

function useTypewriter(words: string[], speed = 60, pause = 1800) {
    const [display, setDisplay] = useState('');
    const [wordIdx, setWordIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIdx];
        const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;

        const t = setTimeout(() => {
            if (!deleting && charIdx < current.length) {
                setDisplay(current.slice(0, charIdx + 1));
                setCharIdx(c => c + 1);
            } else if (!deleting && charIdx === current.length) {
                setDeleting(true);
            } else if (deleting && charIdx > 0) {
                setDisplay(current.slice(0, charIdx - 1));
                setCharIdx(c => c - 1);
            } else {
                setDeleting(false);
                setWordIdx(i => (i + 1) % words.length);
            }
        }, delay);
        return () => clearTimeout(t);
    }, [charIdx, deleting, wordIdx, words, speed, pause]);

    return display;
}

/* ── Stats count-up ─────────────────────────────────────────────── */
const STATS = [
    { value: 3, suffix: '+', label: 'Projects Built' },
    { value: 10, suffix: '+', label: 'Technologies Mastered' },
    { value: 236, suffix: '', label: 'LeetCode Problems' },
];

function useCountUp(target: number, active: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let val = 0;
        const duration = 1400;
        const step = 16;
        const inc = target / (duration / step);
        const id = setInterval(() => {
            val += inc;
            if (val >= target) { setCount(target); clearInterval(id); }
            else setCount(Math.floor(val));
        }, step);
        return () => clearInterval(id);
    }, [active, target]);
    return count;
}

const StatItem: React.FC<{ stat: (typeof STATS)[0]; active: boolean; delay: number }> = ({ stat, active, delay }) => {
    const [started, setStarted] = useState(false);
    const count = useCountUp(stat.value, started);
    useEffect(() => {
        if (!active) return;
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [active, delay]);

    return (
        <div style={{ padding: '1.1rem 0', borderBottom: '1px solid rgba(79,142,247,0.1)' }}>
            <div style={{
                fontFamily: 'var(--font-head)', fontWeight: 800,
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: started ? 1 : 0, transition: 'opacity 0.4s',
            }}>{count}{stat.suffix}</div>
            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.2rem',
            }}>{stat.label}</div>
        </div>
    );
};

/* ── Hero Section ───────────────────────────────────────────────── */
const HeroSection: React.FC = () => {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const role = useTypewriter(ROLES);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const lines = [
        { text: 'Pavan Kumar', gradient: false },
        { text: 'K M.', gradient: true },
    ];

    return (
        <section id="home" ref={ref} style={{
            position: 'relative', minHeight: '100vh',
            display: 'flex', alignItems: 'center',
            padding: '6rem 1.5rem 4rem', zIndex: 1,
        }}>
            <div style={{
                maxWidth: 1200, margin: '0 auto', width: '100%',
                display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center',
            }}>

                {/* ── Left block ── */}
                <div>
                    {/* Eyebrow */}
                    <div className="section-label" style={{ marginBottom: '1rem' }}>Hello, I'm</div>

                    {/* Big staggered name */}
                    <h1 style={{ overflow: 'hidden', lineHeight: 0.95, marginBottom: '1.25rem' }}>
                        {lines.map((line, i) => (
                            <div key={i} style={{ overflow: 'hidden' }}>
                                <span style={{
                                    display: 'block',
                                    fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                                    fontFamily: 'var(--font-head)', fontWeight: 800,
                                    transform: visible ? 'translateY(0)' : 'translateY(110%)',
                                    transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                                    ...(line.gradient ? {
                                        background: 'linear-gradient(135deg, #4f8ef7 0%, #7c5cfc 50%, #00e5a0 100%)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    } : { color: 'var(--text)' }),
                                }}>{line.text}</span>
                            </div>
                        ))}
                    </h1>

                    {/* Typewriter role — warm accent color */}
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                        color: '#ffd77a',               /* warm yellow — distinct from blue/purple accent */
                        letterSpacing: '0.04em', height: '1.6em',
                        marginBottom: '1.5rem',
                        opacity: visible ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.3s',
                    }}>
                        {role}<span style={{ animation: 'blink 1s step-end infinite', opacity: 1 }}>|</span>
                    </div>

                    {/* Subtitle */}
                    <p style={{
                        fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                        color: 'var(--muted)', maxWidth: 500, lineHeight: 1.75,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'none' : 'translateY(16px)',
                        transition: 'opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s',
                        marginBottom: '2rem',
                    }}>
                        Computer Science student passionate about building innovative solutions
                        with AI, web technologies, and creative problem-solving.
                    </p>

                    {/* CTAs */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '1rem',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'none' : 'translateY(12px)',
                        transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
                        marginBottom: '2.5rem',
                    }}>
                        <a href="#projects" className="btn-filled">View My Work</a>
                        <a href="#contact" className="btn-outlined">Get In Touch</a>
                    </div>

                    {/* Scroll hint */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.8rem',
                        opacity: visible ? 1 : 0,
                        transition: 'opacity 0.7s ease 0.8s',
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                            letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)',
                        }}>scroll to explore</span>
                        <div style={{ width: 48, height: 1, background: 'var(--muted)', opacity: 0.4 }} />
                    </div>
                </div>

                {/* ── Right: stats stacked ── */}
                <div style={{
                    minWidth: 175,
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.8s ease 0.5s',
                }}>
                    {STATS.map((s, i) => (
                        <StatItem key={s.label} stat={s} active={visible} delay={i * 350} />
                    ))}
                </div>
            </div>

            {/* Radial glow */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(79,142,247,0.06), transparent)',
            }} />

            <style>{`
        @media (max-width: 768px) {
          #home > div > div {
            grid-template-columns: 1fr !important;
          }
          #home > div > div > div:last-child {
            display: none;
          }
        }
      `}</style>
        </section>
    );
};

export default HeroSection;
