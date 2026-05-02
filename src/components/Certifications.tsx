import React, { useRef, useEffect, useState } from 'react';

const certificationsData = [
  {
    title: '5-Day AI Agents Intensive Course',
    issuer: 'Google',
    date: '2026',
    image: '/Certifications/5-Day AI Agents Intensive Course with Google.png',
    link: '/Certifications/5-Day AI Agents Intensive Course with Google.png',
    type: 'image',
  },
  {
    title: 'Coursera Certification',
    issuer: 'Coursera',
    date: '2026',
    image: null,
    link: '/Certifications/Coursera JN9D771GS3SG.pdf',
    type: 'pdf',
  },
  {
    title: 'Pavan Kumar Certification',
    issuer: 'Pavan Kumar',
    date: '2026',
    image: '/Certifications/Pavan Kumar_page-0001.jpg',
    link: '/Certifications/Pavan Kumar_page-0001.jpg',
    type: 'image',
  },
];

const Certifications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label" style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>Licenses & Certifications</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}>
          Professional <span className="gradient-text">Certifications</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {certificationsData.map((cert, i) => (
            <div key={cert.title} className="glass" style={{
              padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
              opacity: vis ? 1 : 0,
              transform: vis ? 'none' : 'translateY(40px) scale(0.95)',
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`,
            }}>
              <div style={{
                width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                {cert.type === 'image' ? (
                  <img src={cert.link} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : cert.type === 'pdf' ? (
                  <iframe 
                    src={`${cert.link}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`} 
                    style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden' }} 
                    title={cert.title}
                  />
                ) : (
                  <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>📄</div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem',
                  color: 'var(--text)', marginBottom: '0.3rem'
                }}>{cert.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  color: 'var(--text-dim)', marginBottom: '1rem'
                }}>{cert.issuer}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="pill-btn">
                    View Credential ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
