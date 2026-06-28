import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

export const About = () => {
  const { paragraphs, stats } = portfolioData.aboutMe;
  const { motto } = portfolioData.personalInfo;

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader
          index="01"
          title="About Me"
          subtitle="A perspective on software engineering, web technologies, and AI workflows."
        />

        <div className="about-grid">
          {/* Left Side: Short Summary/Motto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7 }}
            className="about-left"
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                marginBottom: '2rem',
              }}
            >
              "{motto}"
            </h3>

            {/* Quick stats grid */}
            <div className="about-stats-grid">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-lime)',
                      lineHeight: 1.1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {stat.value}{stat.suffix}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="about-right"
          >
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '1.5rem',
                  fontWeight: 300,
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: flex-start;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        @media (max-width: 560px) {
          .about-stats-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 860px) {
          .about-grid {
            grid-template-columns: 5fr 5fr;
            gap: 5rem;
          }
        }
      `}</style>
    </section>
  );
};
