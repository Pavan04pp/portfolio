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
      position: 'fixed', 
      top: '1.25rem', 
      left: '50%', 
      transform: 'translateX(-50%)',
      width: 'calc(100% - 2.5rem)', 
      maxWidth: 1200, 
      zIndex: 1000,
      backdropFilter: 'blur(24px) saturate(1.3)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
      background: scrolled ? 'rgba(17,17,19,0.75)' : 'rgba(17,17,19,0.3)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '999px',
      boxShadow: scrolled ? '0 20px 40px rgba(0, 0, 0, 0.5)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{
        padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', height: 56, gap: '2rem',
        justifyContent: 'space-between'
      }}>

        {/* Logo */}
        <a href="#home" style={{
          fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.2rem',
          background: 'linear-gradient(135deg, var(--accent), var(--rose))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', textDecoration: 'none', flexShrink: 0,
        }}>PK</a>

        {/* Center nav links styled as premium pill buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}
          className="nav-links-desktop">
          {navItems.map(it => {
            const isActive = active === it.name;
            return (
              <a key={it.name} href={it.href} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: isActive ? 'var(--text)' : 'var(--text-dim)',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: '0.45rem 1rem',
                borderRadius: '999px',
                background: isActive ? 'rgba(226,185,111,0.1)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(226,185,111,0.2)' : 'transparent'}`,
              }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-dim)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {it.name}
              </a>
            );
          })}
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
          color: 'var(--text-dim)', fontSize: '1.2rem', padding: '0.25rem',
          cursor: 'pointer',
        }} className="nav-hamburger">☰</button>
      </div>

      {/* Floating mobile dropdown menu */}
      {open && (
        <div style={{
          position: 'absolute', top: '70px', left: 0, right: 0,
          background: 'rgba(17,17,19,0.95)', padding: '1rem',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        }}>
          {navItems.map(it => {
            const isActive = active === it.name;
            return (
              <a key={it.name} href={it.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: isActive ? 'var(--text)' : 'var(--text-dim)',
                  textDecoration: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '999px',
                  background: isActive ? 'rgba(226,185,111,0.1)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(226,185,111,0.15)' : 'transparent'}`,
                  transition: 'all 0.2s',
                }}>
                {it.name}
              </a>
            );
          })}
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