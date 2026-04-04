import React, { useRef, useEffect, useState } from 'react';
import { SiPython, SiCplusplus, SiSharp, SiJavascript, SiHtml5, SiCss3, SiDjango, SiPytorch, SiNumpy, SiPandas } from 'react-icons/si';

interface Skill {
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  name: string;
  description: string;
  tagType: 'blue' | 'purple' | 'green';
  tagLabel: string;
}

const SKILLS: Skill[] = [
  { Icon: SiPython, name: 'Python', description: 'Primary language for AI/ML, scripting, and automation', tagType: 'blue', tagLabel: 'Core Language' },
  { Icon: SiCplusplus, name: 'C++', description: 'Strong foundation in DSA, OOP, and systems programming', tagType: 'blue', tagLabel: 'Core Language' },
  { Icon: SiSharp, name: 'C#', description: 'Object-oriented development and .NET ecosystem', tagType: 'blue', tagLabel: 'Core Language' },
  { Icon: SiJavascript, name: 'JavaScript', description: 'Web interactivity, async logic, and full-stack development', tagType: 'blue', tagLabel: 'Core Language' },
  { Icon: SiPytorch, name: 'PyTorch', description: 'Deep learning model training and neural network research', tagType: 'purple', tagLabel: 'AI / ML' },
  { Icon: SiNumpy, name: 'NumPy', description: 'High-performance numerical computing and array operations', tagType: 'purple', tagLabel: 'AI / ML' },
  { Icon: SiPandas, name: 'Pandas', description: 'Data wrangling, analysis, and exploratory data science', tagType: 'purple', tagLabel: 'AI / ML' },
  { Icon: SiDjango, name: 'Django', description: 'Backend web framework for scalable Python applications', tagType: 'green', tagLabel: 'Web / MLOps' },
  { Icon: SiHtml5, name: 'HTML5', description: 'Semantic markup and modern web structure standards', tagType: 'green', tagLabel: 'Web / MLOps' },
  { Icon: SiCss3, name: 'CSS3', description: 'Responsive layouts, animations, and design systems', tagType: 'green', tagLabel: 'Web / MLOps' },
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">What I Work With</span>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '3rem',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>Skills & Tools</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{
                opacity: vis ? 1 : 0,
                transform: vis ? 'none' : 'translateY(28px)',
                transition: `opacity 0.55s ease ${0.05 + i * 0.06}s, transform 0.55s ease ${0.05 + i * 0.06}s`,
              }}
            >
              {/* Icon + Tag row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <skill.Icon style={{ fontSize: '1.8rem', color: 'var(--accent)', flexShrink: 0 }} />
                <span className={`tag tag-${skill.tagType}`}>{skill.tagLabel}</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem',
                color: 'var(--text)', marginBottom: '0.4rem'
              }}>{skill.name}</h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                color: 'var(--text-dim)', lineHeight: 1.6
              }}>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;