import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

export const Resume = () => {
  const education = portfolioData.education;

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader
          index="06"
          title="Education"
          subtitle="My academic foundation in Computer Science Engineering and early schooling milestones."
        />

        <div className="education-grid">
          {education.map((edu, idx) => {
            const isLatest = idx === 0;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`education-card ${isLatest ? 'is-latest' : ''}`}
                style={{
                  background: 'var(--bg-card)',
                  border: isLatest ? '1px solid rgba(220, 38, 38, 0.2)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem 2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isLatest ? '0 10px 30px rgba(220, 38, 38, 0.06)' : 'none',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Visual marker for latest */}
                {isLatest && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'var(--accent)',
                    }}
                  />
                )}

                {/* Badge icon */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: isLatest ? 'rgba(220, 38, 38, 0.06)' : 'var(--bg-subtle)',
                    border: `1px solid ${isLatest ? 'rgba(220, 38, 38, 0.2)' : 'var(--border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  {idx === 0 ? (
                    <GraduationCap size={20} color="var(--accent)" />
                  ) : idx === 1 ? (
                    <Award size={20} color="var(--accent-sec)" />
                  ) : (
                    <BookOpen size={20} color="var(--accent)" />
                  )}
                </div>

                <span className="edu-duration">{edu.duration}</span>
                <h3 className="edu-degree">{edu.degree}</h3>
                <span className="edu-institution" style={{ marginBottom: 0 }}>{edu.institution}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .education-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .education-card:hover {
          border-color: var(--border-hover) !important;
        }

        .edu-duration {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }

        .edu-degree {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
          margin-bottom: 0.35rem;
        }

        .edu-institution {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: block;
        }

        @media (min-width: 768px) {
          .education-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
