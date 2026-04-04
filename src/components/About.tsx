import React, { useRef, useEffect, useState } from 'react';

const terminalLines = [
  { indent: 0, content: <><span className="t-punct">{'{'}</span></> },
  { indent: 1, content: <><span className="t-key">"name"</span><span className="t-punct">: </span><span className="t-str">"Pavan Kumar K M"</span><span className="t-punct">,</span></> },
  { indent: 1, content: <><span className="t-key">"role"</span><span className="t-punct">: </span><span className="t-str">"CS + AI/ML Student"</span><span className="t-punct">,</span></> },
  { indent: 1, content: <><span className="t-key">"college"</span><span className="t-punct">: </span><span className="t-str">"NIE, Mysore"</span><span className="t-punct">,</span></> },
  { indent: 1, content: <><span className="t-key">"batch"</span><span className="t-punct">: </span><span className="t-str">"2024–2028"</span><span className="t-punct">,</span></> },
  { indent: 1, content: <><span className="t-key">"languages"</span><span className="t-punct">: [</span><span className="t-str">"Python"</span><span className="t-punct">, </span><span className="t-str">"C++"</span><span className="t-punct">, </span><span className="t-str">"C#"</span><span className="t-punct">, </span><span className="t-str">"JS"</span><span className="t-punct">],</span></> },
  { indent: 1, content: <><span className="t-key">"frameworks"</span><span className="t-punct">: [</span><span className="t-str">"PyTorch"</span><span className="t-punct">, </span><span className="t-str">"Django"</span><span className="t-punct">, </span><span className="t-str">"React"</span><span className="t-punct">],</span></> },
  { indent: 1, content: <><span className="t-key">"available"</span><span className="t-punct">: </span><span className="t-bool">true</span></> },
  { indent: 0, content: <><span className="t-punct">{'}'}</span></> },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">About Me</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>Who I Am</h2>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start',
        }} className="about-grid">

          {/* Left: bio */}
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
          }}>
            {[
              "I'm Pavan Kumar K M, a passionate and driven Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at NIE, Mysore (Batch: 2024–2028). My journey in tech is fueled by curiosity, problem-solving, and a desire to create real-world impact through innovative solutions.",
              "I'm proficient in Python, C++, and C#, with a strong focus on Data Structures and Algorithms (DSA). I also work with HTML, CSS, and JavaScript, and I'm exploring frameworks like Django and PyTorch while gaining hands-on experience in tools like NumPy and Pandas.",
              "I believe in skill-based learning over just theoretical knowledge and continuously push myself to grow through consistent practice, project development, and staying updated with industry trends. Whether it's AI, web development, or core programming, I'm always ready to dive deeper and build something meaningful.",
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-body)', color: 'var(--text-dim)',
                lineHeight: 1.8, fontSize: '0.95rem',
                marginBottom: i < 2 ? '1.25rem' : 0,
              }}>{para}</p>
            ))}

            {/* Links */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a href="https://github.com/Pavan04pp" target="_blank" rel="noopener noreferrer" className="pill-btn">
                ↗ GitHub
              </a>
              <a href="https://www.linkedin.com/in/pavankumarkm/" target="_blank" rel="noopener noreferrer" className="pill-btn">
                ↗ LinkedIn
              </a>
              <a href="mailto:pavankumarkm@gmail.com" className="pill-btn">
                ✉ Email
              </a>
            </div>
          </div>

          {/* Right: terminal JSON */}
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.65s ease 0.25s, transform 0.65s ease 0.25s',
          }}>
            <div className="terminal">
              <div className="terminal-bar">
                <div className="terminal-dot" style={{ background: '#ff5f57' }} />
                <div className="terminal-dot" style={{ background: '#febc2e' }} />
                <div className="terminal-dot" style={{ background: '#28c840' }} />
                <span style={{
                  marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  color: 'var(--muted)', letterSpacing: '0.05em'
                }}>pavan.json</span>
              </div>
              <div className="terminal-body">
                {terminalLines.map((line, i) => (
                  <div key={i} style={{ paddingLeft: line.indent * 16 }}>{line.content}</div>
                ))}
                <div><span className="cursor-blink" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
};

export default About;