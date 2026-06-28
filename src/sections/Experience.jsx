import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

const ACCENT_COLORS = ['#e8ff6b', '#7c6af7', '#4cc9f0'];

export const Experience = () => {
  const experiences = portfolioData.experience;
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section" ref={sectionRef} style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          index="04"
          title="Timeline Journey"
          subtitle="Professional contributions, architectural roles, and engineering milestones."
          align="left"
        />

        <div className="exp-timeline-wrap">
          {/* Animated vertical line */}
          <div className="exp-line-track" aria-hidden="true">
            <motion.div
              className="exp-line-fill"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Entries */}
          <div className="exp-entries">
            {experiences.map((exp, index) => {
              const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
              return (
                <motion.div
                  key={`${exp.company}-${exp.title}`}
                  className="exp-entry"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
                >
                  {/* Node on the line */}
                  <div
                    className="exp-node"
                    aria-hidden="true"
                    style={{
                      borderColor: accent,
                      boxShadow: `0 0 12px ${accent}50`,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="exp-card"
                    style={{
                      background: 'rgba(11,12,18,0.5)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '18px',
                      padding: '2rem',
                      backdropFilter: 'blur(12px)',
                      borderLeft: `2px solid ${accent}30`,
                      transition: 'border-color 0.3s ease',
                    }}
                  >
                    {/* Duration tag */}
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.68rem',
                        fontWeight: 500,
                        color: accent,
                        letterSpacing: '0.1em',
                        padding: '0.25rem 0.65rem',
                        background: `${accent}0e`,
                        border: `1px solid ${accent}25`,
                        borderRadius: '100px',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {exp.duration}
                    </span>

                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#f0f0f5',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {exp.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.78rem',
                        color: accent,
                        marginBottom: '1rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      @ {exp.company}
                    </p>

                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.92rem',
                        color: '#7a7a8c',
                        lineHeight: 1.7,
                      }}
                    >
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .exp-timeline-wrap {
          position: relative;
          max-width: 800px;
        }

        .exp-line-track {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.04);
          border-radius: 2px;
          overflow: hidden;
        }

        .exp-line-fill {
          width: 100%;
          background: linear-gradient(180deg, #e8ff6b 0%, #7c6af7 50%, #4cc9f0 100%);
          transform-origin: top;
        }

        .exp-entries {
          padding-left: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .exp-entry {
          position: relative;
        }

        .exp-node {
          position: absolute;
          left: -2.72rem;
          top: 1.5rem;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #050508;
          border: 2.5px solid #e8ff6b;
          z-index: 2;
        }

        .exp-card:hover {
          border-color: rgba(255,255,255,0.12) !important;
        }
      `}</style>
    </section>
  );
};
