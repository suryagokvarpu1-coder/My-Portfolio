import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layout, Box, Database, Cpu } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

const IconMapper = ({ iconName, size = 22, color = '#6366f1' }) => {
  switch (iconName) {
    case 'layout': return <Layout size={size} color={color} />;
    case 'box': return <Box size={size} color={color} />;
    case 'database': return <Database size={size} color={color} />;
    case 'cpu': return <Cpu size={size} color={color} />;
    default: return <Cpu size={size} color={color} />;
  }
};

export const Skills = () => {
  const skills = portfolioData.skills;
  const cardsRef = useRef([]);

  // Spotlight mouse track effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  // Radial progress calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          index="02"
          title="Expertise Grid"
          subtitle="Specialized frameworks, APIs, development libraries, and technical utilities composing my software architecture stack."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="skills-grid"
        >
          {skills.map((skill, index) => {
            const strokeColor = index % 2 === 0 ? '#6366f1' : '#10b981';
            const strokeDashoffset = circumference - (skill.proficiency / 100) * circumference;

            return (
              <motion.div
                key={skill.category}
                ref={(el) => (cardsRef.current[index] = el)}
                variants={cardVariants}
                className="glass-card skill-card"
              >
                {/* Header: Icon, Category & Radial Chart */}
                <div className="skill-card-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="skill-icon-outer" style={{ borderColor: strokeColor }}>
                      <IconMapper iconName={skill.icon} color={strokeColor} />
                    </div>
                    <h3 className="skill-category-title">{skill.category}</h3>
                  </div>

                  {/* Circular Radial chart */}
                  <div className="radial-container">
                    <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="rgba(255, 255, 255, 0.04)"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 6px ${strokeColor}66)` }}
                      />
                    </svg>
                    <span className="radial-percentage">{skill.proficiency}%</span>
                  </div>
                </div>

                {/* Description */}
                <p className="skill-desc-para">{skill.desc}</p>

                {/* Tech Chips */}
                <div className="skill-chips-row">
                  {skill.techs.map((tech) => (
                    <span key={tech} className="skill-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }

        .skill-card {
          padding: 2.2rem !important;
          border-radius: var(--border-radius-lg);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .skill-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .skill-icon-outer {
          width: 44px;
          height: 44px;
          border-radius: var(--border-radius-sm);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skill-category-title {
          font-family: var(--font-title);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .radial-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
        }

        .radial-percentage {
          position: absolute;
          font-family: var(--font-title);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .skill-desc-para {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .skill-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-chip {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 0.35rem 0.8rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .skill-card:hover .skill-chip {
          border-color: rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }

        @media (min-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
