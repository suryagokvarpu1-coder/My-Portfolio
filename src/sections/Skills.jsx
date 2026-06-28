import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

export const Skills = () => {
  const { skills } = portfolioData;

  const categories = [
    { key: 'frontend', title: 'Frontend Development', color: 'var(--accent-lime)' },
    { key: 'backend', title: 'Backend Development', color: 'var(--accent-violet)' },
    { key: 'programming', title: 'Programming Languages', color: 'var(--accent-cyan)' },
    { key: 'tools', title: 'Tools & Platforms', color: 'var(--text-primary)' },
    { key: 'ai', title: 'AI & Research', color: 'var(--accent-lime)' },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          index="02"
          title="Technical Skills"
          subtitle="Specialized categories and tools I use to engineer modern digital products."
        />

        <div className="skills-grid">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="skill-category-card"
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: cat.color,
                    display: 'block',
                  }}
                />
                {cat.title}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {skills[cat.key].map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.4rem 0.85rem',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--text-secondary)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.2s ease',
                    }}
                    className="skill-badge"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .skill-category-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 2rem;
          transition: border-color 0.2s ease;
        }

        .skill-category-card:hover {
          border-color: var(--border-hover);
        }

        .skill-badge {
          display: inline-flex;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          padding: 0.4rem 0.85rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.01);
          transition: all 0.2s ease;
        }

        .skill-badge:hover {
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.04);
        }

        @media (min-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
