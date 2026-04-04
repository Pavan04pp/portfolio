import React, { useState, useEffect } from 'react';

const navItems = [
  { name: 'home', href: '#home' },
  { name: 'about', href: '#about' },
  { name: 'skills', href: '#skills' },
  { name: 'experience', href: '#experience' },
  { name: 'education', href: '#education' },
  { name: 'projects', href: '#projects' },
  { name: 'contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: scrolled ? 'rgba(5,8,16,0.85)' : 'rgba(5,8,16,0.5)',
        borderBottom: '1px solid rgba(79,142,247,0.08)',
        transition: 'background 0.3s',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', height: 64, gap: '2rem'
      }}>

        {/* Logo */}
        <a href="#home" style={{
          fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.35rem',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', textDecoration: 'none', flexShrink: 0,
        }}>PK</a>

        {/* Center nav links – desktop */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }}
          className="nav-links-desktop">
          {navItems.map(it => (
            <a key={it.name} href={it.href} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--muted)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >{it.name}</a>
          ))}
        </div>

        {/* Right: availability badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
          className="availability-badge">
          <div className="pulse-dot" />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            letterSpacing: '0.1em', color: 'var(--green)',
          }}>available for opportunities</span>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(o => !o)} style={{
          display: 'none', background: 'none', border: 'none',
          color: 'var(--muted)', fontSize: '1.3rem', padding: '0.25rem',
        }} className="nav-hamburger">☰</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'rgba(5,8,16,0.97)', padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(79,142,247,0.08)',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {navItems.map(it => (
            <a key={it.name} href={it.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--muted)', textDecoration: 'none',
              }}>
              {it.name}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .availability-badge { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;