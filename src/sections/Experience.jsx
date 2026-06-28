import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

export const Experience = () => {
  const experiences = portfolioData.experience;
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Bind vertical progress line directly to scroll coordinates
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

  const cardVariants = {
    hidden: (isLeft) => ({
      opacity: 0,
      x: isLeft ? -45 : 45,
      scale: 0.95
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <section id="experience" className="section" ref={containerRef} style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          index="04"
          title="Timeline Journey"
          subtitle="My professional contributions, architectural roles, and engineering milestones."
        />

        <div className="experience-timeline">
          {/* Vertical progress line track */}
          <div className="timeline-line-track">
            <motion.div
              style={{ height: pathHeight }}
              className="timeline-line-fill"
            />
          </div>

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={exp.company + exp.title}
                className={`timeline-item-container ${isLeft ? 'left-item' : 'right-item'}`}
              >
                {/* Scroll-scale nodes on central line */}
                <div className="timeline-node-wrapper">
                  <motion.div
                    className="timeline-node"
                    style={{
                      borderColor: index % 2 === 0 ? '#6366f1' : '#10b981',
                      boxShadow: index % 2 === 0 ? '0 0 15px rgba(99,102,241,0.5)' : '0 0 15px rgba(16,185,129,0.5)',
                    }}
                  />
                </div>

                {/* Experience Detail Bento Card */}
                <motion.div
                  custom={isLeft}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="glass-card timeline-card"
                >
                  <div className="timeline-card-header">
                    <div>
                      <h3 className="timeline-role">{exp.title}</h3>
                      <span className="timeline-company">{exp.company}</span>
                    </div>
                    <span className="timeline-duration">{exp.duration}</span>
                  </div>
                  <p className="timeline-desc">{exp.desc}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .experience-timeline {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
          padding: 2.5rem 0;
        }

        .timeline-line-track {
          position: absolute;
          left: 18px;
          top: 0;
          height: 100%;
          width: 2px;
          background: rgba(255, 255, 255, 0.04);
          transform: translateX(-50%);
        }

        .timeline-line-fill {
          width: 100%;
          background: linear-gradient(180deg, #6366f1 0%, #06b6d4 50%, #10b981 100%);
          transform-origin: top;
        }

        .timeline-item-container {
          position: relative;
          width: 100%;
          padding-left: 48px;
          margin-bottom: 4rem;
          display: flex;
          justify-content: flex-start;
        }

        .timeline-node-wrapper {
          position: absolute;
          left: 18px;
          top: 36px;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .timeline-node {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #030306;
          border: 3px solid #6366f1;
        }

        .timeline-card {
          width: 100%;
          padding: 2.2rem !important;
          border-radius: var(--border-radius-lg);
          background: rgba(10, 10, 16, 0.35);
        }

        .timeline-card-header {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 1.25rem;
        }

        .timeline-role {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .timeline-company {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--accent-purple);
          font-weight: 500;
        }

        .timeline-item-container:nth-child(even) .timeline-company {
          color: var(--accent-mint);
        }

        .timeline-duration {
          font-family: var(--font-title);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          padding: 0.3rem 0.8rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50px;
          width: fit-content;
        }

        .timeline-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          font-weight: 300;
        }

        @media (min-width: 820px) {
          .timeline-line-track {
            left: 50%;
          }

          .timeline-node-wrapper {
            left: 50%;
          }

          .timeline-item-container {
            width: 50%;
            padding-left: 0;
          }

          .left-item {
            left: 0;
            padding-right: 50px;
            justify-content: flex-end;
            text-align: right;
          }

          .left-item .timeline-card-header {
            align-items: flex-end;
          }

          .right-item {
            left: 50%;
            padding-left: 50px;
            justify-content: flex-start;
          }

          .right-item .timeline-card-header {
            align-items: flex-start;
          }

          .timeline-card-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};
