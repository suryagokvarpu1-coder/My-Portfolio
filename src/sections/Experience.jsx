import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

export const Experience = () => {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader
          index="04"
          title="Experience"
          subtitle="A roadmap of my technical skills, engineering roles, and AI explorations."
        />

        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="timeline-item"
            >
              {/* Dot & Line connector */}
              <div className="timeline-connector">
                <div className="timeline-dot" />
                {idx < experiences.length - 1 && <div className="timeline-line" />}
              </div>

              {/* Card content */}
              <div className="timeline-card">
                <span className="timeline-duration">{exp.duration}</span>
                <h3 className="timeline-role">{exp.title}</h3>
                <span className="timeline-company">{exp.company}</span>
                <p className="timeline-desc">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .experience-timeline {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timeline-item {
          display: flex;
          gap: 2rem;
        }

        .timeline-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-lime);
          border: 3px solid var(--bg);
          z-index: 2;
          box-shadow: 0 0 10px rgba(232, 255, 107, 0.4);
        }

        .timeline-line {
          width: 2px;
          background: var(--border);
          position: absolute;
          top: 12px;
          bottom: -2rem;
          z-index: 1;
        }

        .timeline-card {
          flex-grow: 1;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 2rem;
          transition: border-color 0.2s ease;
        }

        .timeline-card:hover {
          border-color: var(--border-hover);
        }

        .timeline-duration {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-lime);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .timeline-role {
          font-family: var(--font-display);
          font-size: 1.25rem;
          fontWeight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .timeline-company {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 1rem;
        }

        .timeline-desc {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }
      `}</style>
    </section>
  );
};
