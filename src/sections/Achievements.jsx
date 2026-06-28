import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code, Zap } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

const IconMap = ({ index, size = 24 }) => {
  if (index === 0) return <Trophy size={size} color="#e8ff6b" />;
  if (index === 1) return <Code size={size} color="#7c6af7" />;
  return <Zap size={size} color="#4cc9f0" />;
};

export const Achievements = () => {
  const achievements = portfolioData.achievements;

  return (
    <section id="achievements" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="06"
          title="Accolades"
          subtitle="Noteworthy hackathon podium finishes, open-source contributions, and algorithm contest outcomes."
        />

        <div className="achievements-list">
          {achievements.map((ach, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className={`achievement-row ${isEven ? 'row-normal' : 'row-reverse'}`}
              >
                {/* Left: Giant Number & Icon */}
                <div className="achievement-num-box">
                  <span className="achievement-num">0{index + 1}</span>
                  <div className="achievement-icon-wrap">
                    <IconMap index={index} />
                  </div>
                </div>

                {/* Right: Text Content */}
                <div className="achievement-content">
                  <h3 className="achievement-title">{ach.title}</h3>
                  <p className="achievement-desc">{ach.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin-top: 4rem;
        }

        .achievement-row {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2.5rem;
          background: rgba(11, 12, 18, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-lg);
          backdrop-filter: var(--glass-blur);
          transition: border-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
        }

        .achievement-row:hover {
          border-color: rgba(232, 255, 107, 0.2);
          transform: translateY(-4px);
        }

        .achievement-num-box {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .achievement-num {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 700;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15);
          transition: -webkit-text-stroke var(--dur-base) var(--ease-out);
        }

        .achievement-row:hover .achievement-num {
          -webkit-text-stroke: 1.5px rgba(232, 255, 107, 0.8);
        }

        .achievement-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .achievement-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .achievement-title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .achievement-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 600px;
        }

        @media (min-width: 768px) {
          .achievement-row {
            flex-direction: row;
            align-items: center;
            gap: 4rem;
            padding: 3rem 4rem;
          }

          .row-reverse {
            flex-direction: row-reverse;
          }

          .row-reverse .achievement-num-box {
            flex-direction: row-reverse;
          }
        }
      `}</style>
    </section>
  );
};
