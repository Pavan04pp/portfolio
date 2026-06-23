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
    { value: 10, suffix: '+', label: 'Technologies' },
    { value: 236, suffix: '', label: 'LeetCode Solved' },
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

const StatItem: React.FC<{ stat: (typeof STATS)[0]; active: boolean; delay: number; idx: number }> = ({ stat, active, delay, idx }) => {
    const [started, setStarted] = useState(false);
    const count = useCountUp(stat.value, started);
    useEffect(() => {
        if (!active) return;
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [active, delay]);

    return (
        <div style={{
            textAlign: 'center',
            padding: '1.5rem 1rem',
            borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}>
            <div style={{
                fontFamily: 'var(--font-head)', fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                background: 'linear-gradient(135deg, var(--accent), var(--rose))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: started ? 1 : 0, transition: 'opacity 0.5s',
            }}>{count}{stat.suffix}</div>
            <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.35rem',
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
            overflow: 'hidden',
        }}>
            {/* Ambient mesh gradients */}
            <div style={{
                position: 'absolute', top: '-20%', left: '-10%',
                width: 700, height: 700,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(226,185,111,0.06), transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '-10%', right: '-5%',
                width: 500, height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(192,132,252,0.04), transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: 1200, margin: '0 auto', width: '100%',
            }}>
                {/* Eyebrow */}
                <div className="section-label" style={{
                    marginBottom: '1.25rem',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}>Hello, I'm</div>

                {/* Big staggered name */}
                <h1 style={{ overflow: 'hidden', lineHeight: 0.92, marginBottom: '1.5rem' }}>
                    {lines.map((line, i) => (
                        <div key={i} style={{ overflow: 'hidden' }}>
                            <span style={{
                                display: 'block',
                                fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                                fontFamily: 'var(--font-head)', fontWeight: 800,
                                transform: visible ? 'translateY(0)' : 'translateY(110%)',
                                transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                                ...(line.gradient ? {
                                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--rose) 50%, var(--accent2) 100%)',
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient-shift 4s ease-in-out infinite alternate',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                } : { color: 'var(--text)' }),
                            }}>{line.text}</span>
                        </div>
                    ))}
                </h1>

                {/* Typewriter role */}
                <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
                    color: 'var(--accent)',
                    letterSpacing: '0.05em', height: '1.6em',
                    marginBottom: '1.5rem',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.25s',
                }}>
                    {role}<span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>|</span>
                </div>

                {/* Subtitle */}
                <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                    color: 'var(--text-dim)', maxWidth: 520, lineHeight: 1.75,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(16px)',
                    transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                    marginBottom: '2.5rem',
                }}>
                    Computer Science student passionate about building innovative solutions
                    with AI, web technologies, and creative problem-solving.
                </p>

                {/* CTAs */}
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '1rem',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(12px)',
                    transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
                    marginBottom: '4rem',
                }}>
                    <a href="#projects" className="btn-filled">View My Work →</a>
                    <a href="#contact" className="btn-outlined">Get In Touch</a>
                </div>

                {/* Stats bar (Glassmorphic HUD) */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    background: 'rgba(17, 17, 19, 0.45)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    maxWidth: 520,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(20px)',
                    transition: 'opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                }}>
                    {STATS.map((s, i) => (
                        <StatItem key={s.label} stat={s} active={visible} delay={700 + i * 200} idx={i} />
                    ))}
                </div>

                {/* Scroll hint */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                    marginTop: '3rem',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.7s ease 1s',
                }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)',
                    }}>scroll to explore</span>
                    <div style={{
                        width: 40, height: 1,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.15), transparent)',
                    }} />
                </div>
            </div>

            <style>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
                @media (max-width: 768px) {
                    #home > div { text-align: center; }
                    #home .btn-filled, #home .btn-outlined { width: 100%; justify-content: center; }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
