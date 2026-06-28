import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, Zap } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

const AchievementIcon = ({ index }) => {
  const size = 20;
  if (index === 0) return <Trophy size={size} color="#fbbf24" />; // Gold
  if (index === 1) return <Code2 size={size} color="#818cf8" />;  // Purple
  return <Zap size={size} color="#06b6d4" />;                     // Cyan
};

export const Achievements = () => {
  const achievements = portfolioData.achievements;
  const cardsRef = useRef([]);

  // Spotlight mouse track
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: "easeOut" }
    }
  };

  return (
    <section id="achievements" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="06"
          title="Accolades"
          subtitle="Noteworthy hackathon podium finishes, open-source commits, and algorithm contest outcomes."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="achievements-grid"
        >
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.title}
              ref={(el) => (cardsRef.current[index] = el)}
              variants={itemVariants}
              className="glass-card achievement-card"
            >
              {/* Huge background index number */}
              <div className="achievement-bg-index">
                0{index + 1}
              </div>

              {/* Icon Box */}
              <div 
                className="achievement-icon-outer"
                style={{
                  borderColor: index === 0 ? '#fbbf24' : index === 1 ? '#818cf8' : '#06b6d4'
                }}
              >
                <AchievementIcon index={index} />
              </div>

              {/* Title & Description */}
              <h3 className="achievement-card-title">{ach.title}</h3>
              <p className="achievement-card-desc">{ach.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .achievements-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .achievement-card {
          position: relative;
          padding: 2.2rem !important;
          border-radius: var(--border-radius-lg);
          background: rgba(10, 10, 16, 0.35);
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }

        .achievement-bg-index {
          position: absolute;
          right: 1.5rem;
          top: 1rem;
          font-family: var(--font-display);
          font-size: 5.5rem;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.02);
          line-height: 1;
          user-select: none;
          pointer-events: none;
          transition: color 0.4s ease;
        }

        .achievement-card:hover .achievement-bg-index {
          color: rgba(255, 255, 255, 0.035);
        }

        .achievement-icon-outer {
          width: 44px;
          height: 44px;
          border-radius: var(--border-radius-sm);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.8rem;
          position: relative;
          z-index: 2;
        }

        .achievement-card-title {
          font-family: var(--font-title);
          font-weight: 600;
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 2;
          letter-spacing: -0.015em;
        }

        .achievement-card-desc {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
          font-weight: 300;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 768px) {
          .achievements-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
