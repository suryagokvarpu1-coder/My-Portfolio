import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

export const Certifications = () => {
  const certifications = portfolioData.certifications;
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
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section id="certifications" className="section" style={{ position: 'relative' }}>
      {/* Dynamic light glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-200px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.02) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="05"
          title="Certifications"
          subtitle="Validated credentials and badges certified by top industry cloud provider environments."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="certifications-grid"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              ref={(el) => (cardsRef.current[index] = el)}
              variants={itemVariants}
              className="glass-card cert-card"
            >
              <div className="cert-badge-outer">
                <Award size={22} color="#10b981" />
              </div>
              <div className="cert-content-block">
                <h3 className="cert-title-text">{cert.name}</h3>
                <div className="cert-meta-row">
                  <span className="cert-issuer-label">{cert.issuer}</span>
                  <span className="cert-split-dot">•</span>
                  <span className="cert-issue-date">{cert.date}</span>
                </div>
                {cert.credentialId && (
                  <span className="cert-credential-id">CREDENTIAL ID: {cert.credentialId}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .certifications-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .cert-card {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem !important;
          border-radius: var(--border-radius-md);
          background: rgba(10, 10, 16, 0.35);
        }

        .cert-badge-outer {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
        }

        .cert-content-block {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .cert-title-text {
          font-family: var(--font-title);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
          letter-spacing: -0.01em;
        }

        .cert-meta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.4rem;
        }

        .cert-issuer-label {
          font-weight: 500;
          color: var(--accent-purple);
        }

        .cert-split-dot {
          color: var(--text-muted);
        }

        .cert-issue-date {
          color: var(--text-secondary);
        }

        .cert-credential-id {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        @media (max-width: 576px) {
          .cert-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
