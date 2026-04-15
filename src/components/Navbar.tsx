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
  const [active, setActive] = useState('home');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map(i => i.name);
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      backdropFilter: 'blur(20px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
      background: scrolled ? 'rgba(9,9,11,0.85)' : 'rgba(9,9,11,0.4)',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', height: 64, gap: '2rem'
      }}>

        {/* Logo */}
        <a href="#home" style={{
          fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.3rem',
          background: 'linear-gradient(135deg, var(--accent), var(--rose))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', textDecoration: 'none', flexShrink: 0,
        }}>PK</a>

        {/* Center nav links */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }}
          className="nav-links-desktop">
          {navItems.map(it => (
            <a key={it.name} href={it.href} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: active === it.name ? 'var(--text)' : 'var(--muted)',
              textDecoration: 'none',
              transition: 'color 0.3s',
              position: 'relative',
              paddingBottom: '4px',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = active === it.name ? 'var(--text)' : 'var(--muted)'; }}
            >
              {it.name}
              <span style={{
                position: 'absolute',
                bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: active === it.name ? '100%' : '0%',
                height: '1px',
                background: 'var(--accent)',
                transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </a>
          ))}
        </div>

        {/* Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
          className="availability-badge">
          <div className="pulse-dot" />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            letterSpacing: '0.1em', color: 'var(--emerald)',
          }}>available</span>
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
          background: 'rgba(9,9,11,0.97)', padding: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {navItems.map(it => (
            <a key={it.name} href={it.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: active === it.name ? 'var(--text)' : 'var(--muted)',
                textDecoration: 'none',
                padding: '0.4rem 0',
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