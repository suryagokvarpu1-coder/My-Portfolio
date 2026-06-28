import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Box, Database, Cpu } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

// All tech skills for marquee
const ALL_TECHS = [
  'React', 'Next.js', 'Three.js', 'GSAP', 'WebGL', 'GLSL', 'Node.js',
  'TypeScript', 'MongoDB', 'Firebase', 'Docker', 'FastAPI', 'Stripe',
  'Tailwind', 'Vite', 'Framer Motion', 'Lenis', 'Canvas API', 'Python',
  'Blender 3D', 'WebSockets', 'Figma', 'REST APIs', 'GraphQL',
];

const IconMap = ({ name, size = 20, color = '#e8ff6b' }) => {
  const props = { size, color };
  if (name === 'layout') return <Layout {...props} />;
  if (name === 'box') return <Box {...props} />;
  if (name === 'database') return <Database {...props} />;
  return <Cpu {...props} />;
};

const SkillBar = ({ proficiency }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="skill-bar-track">
      <div
        className="skill-bar-fill"
        style={{
          width: `${proficiency}%`,
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transition: inView ? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
};

export const Skills = () => {
  const skills = portfolioData.skills;
  const cardsRef = useRef([]);

  // Spotlight on each card
  useEffect(() => {
    const move = (e) => {
      cardsRef.current.forEach(card => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - r.left}px`);
        card.style.setProperty('--y', `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const ACCENT_COLORS = ['#e8ff6b', '#7c6af7', '#4cc9f0', '#ff5e62'];

  // Double the array so marquee loops seamlessly
  const doubledTechs = [...ALL_TECHS, ...ALL_TECHS];

  return (
    <section id="skills" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <SectionHeader
          index="02"
          title="Expertise Grid"
          subtitle="Specialized frameworks, APIs, and technical utilities composing my full-stack architecture."
          align="center"
        />
      </div>

      {/* ── Marquee Strip ── */}
      <div
        className="marquee-wrap"
        aria-label="Technologies"
        style={{ margin: '0 0 5rem', overflow: 'hidden', userSelect: 'none' }}
      >
        {/* Row 1: left */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div
            className="marquee-track go-left"
            style={{ display: 'flex', gap: '1.25rem', padding: '0.25rem 0' }}
          >
            {doubledTechs.map((tech, i) => (
              <span
                key={`t1-${i}`}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: i % 7 === 0 ? '#e8ff6b' : i % 7 === 3 ? '#7c6af7' : '#3a3a4a',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '100px',
                  padding: '0.4rem 1rem',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: 'rgba(255,255,255,0.01)',
                  flexShrink: 0,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2: right */}
        <div>
          <div
            className="marquee-track go-right"
            style={{ display: 'flex', gap: '1.25rem', padding: '0.25rem 0' }}
          >
            {[...doubledTechs].reverse().map((tech, i) => (
              <span
                key={`t2-${i}`}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: i % 5 === 0 ? '#4cc9f0' : i % 5 === 2 ? '#e8ff6b' : '#3a3a4a',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '100px',
                  padding: '0.4rem 1rem',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: 'rgba(255,255,255,0.01)',
                  flexShrink: 0,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bento Skill Cards ── */}
      <div className="container">
        <motion.div
          className="skills-bento"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          {skills.map((skill, index) => {
            const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];
            return (
              <motion.div
                key={skill.category}
                ref={el => (cardsRef.current[index] = el)}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="skill-card"
                style={{
                  background: 'rgba(11,12,18,0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.3s ease, transform 0.4s ease',
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {/* Spotlight glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(500px circle at var(--x, -999px) var(--y, -999px), ${accentColor}06, transparent 50%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />

                {/* Big background number */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '1rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '6rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.02)',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Icon + Title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: `${accentColor}10`,
                        border: `1px solid ${accentColor}25`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconMap name={skill.icon} color={accentColor} size={18} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#f0f0f5',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {skill.category}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.9rem',
                      color: '#7a7a8c',
                      lineHeight: 1.65,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {skill.desc}
                  </p>

                  {/* Proficiency bar */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '0.65rem',
                          color: '#3a3a4a',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Proficiency
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '0.72rem',
                          color: accentColor,
                          fontWeight: 500,
                        }}
                      >
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: '3px',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '100px',
                        overflow: 'hidden',
                      }}
                    >
                      <SkillBar proficiency={skill.proficiency} />
                    </div>
                  </div>

                  {/* Tech chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {skill.techs.map(tech => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          color: '#7a7a8c',
                          padding: '0.25rem 0.65rem',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          borderRadius: '100px',
                          letterSpacing: '0.03em',
                          transition: 'all 0.2s ease',
                        }}
                        className="tech-chip-hover"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .skills-bento {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .skills-bento {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .skills-bento {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .tech-chip-hover:hover {
          color: #f0f0f5;
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
        }

        .skill-card:hover {
          border-color: rgba(255,255,255,0.12) !important;
        }
      `}</style>
    </section>
  );
};
