import React from 'react';

const Footer: React.FC = () => (
  <footer style={{
    padding: '3rem 1.5rem 2.5rem',
    position: 'relative', zIndex: 1,
  }}>
    {/* Top border */}
    <div style={{
      position: 'absolute', top: 0, left: '5%', right: '5%', height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
    }} />

    <div style={{ textAlign: 'center' }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem',
        background: 'linear-gradient(135deg, var(--accent), var(--rose))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
      }}>PK</div>

      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
        letterSpacing: '0.1em', color: 'var(--muted)',
      }}>
        Pavan Kumar K M &nbsp;·&nbsp; AI &amp; Full-Stack Developer &nbsp;·&nbsp; Mysore, India
      </p>

      {/* Social links */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.25rem',
      }}>
        {[
          { label: 'GitHub', href: 'https://github.com/Pavan04pp' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pavankumarkm/' },
          { label: 'Email', href: 'mailto:pavankumarkm@gmail.com' },
        ].map(link => (
          <a key={link.label} href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--muted)', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
          >{link.label}</a>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
        color: 'rgba(113,113,122,0.5)', marginTop: '1.5rem',
      }}>
        © {new Date().getFullYear()} — Built with React & TypeScript
      </p>
    </div>
  </footer>
);

export default Footer;