import React from 'react';

const Footer: React.FC = () => (
  <footer style={{
    padding: '2rem 1.5rem',
    borderTop: '1px solid rgba(79,142,247,0.08)',
    textAlign: 'center',
    position: 'relative', zIndex: 1,
  }}>
    <p style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
      letterSpacing: '0.1em', color: 'var(--muted)',
    }}>
      Pavan Kumar K M &nbsp;·&nbsp; AI &amp; Full-Stack Developer &nbsp;·&nbsp; Mysore, India
    </p>
    <p style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
      color: 'rgba(107,127,168,0.5)', marginTop: '0.4rem',
    }}>
      © {new Date().getFullYear()} — Built with React & TypeScript
    </p>
  </footer>
);

export default Footer;