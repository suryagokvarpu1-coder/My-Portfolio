import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

const ACCENT_COLORS = ['#DC2626', '#EF4444', '#B91C1C'];
const ISSUER_COLORS = { 'Amazon Web Services': '#EF4444', 'Google Cloud': '#4285F4', 'Meta (Coursera)': '#0866FF' };

export const Certifications = () => {
  const certifications = portfolioData.certifications;
  const cardsRef = useRef([]);

  useEffect(() => {
    const move = (e) => {
      cardsRef.current.forEach(card => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - r.left}px`);
        card.style.setProperty('--y', `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section id="certifications" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          index="05"
          title="Certifications"
          subtitle="Validated credentials from top cloud and technology platforms."
          align="center"
        />

        <motion.div
          className="certs-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          {certifications.map((cert, index) => {
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
            const issuerColor = ISSUER_COLORS[cert.issuer] || accent;

            return (
              <motion.div
                key={cert.name}
                ref={el => (cardsRef.current[index] = el)}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="cert-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, transform 0.4s ease, box-shadow 0.3s ease',
                }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                {/* Spotlight hover effect */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(350px circle at var(--x, -999px) var(--y, -999px), rgba(220,38,38,0.05), transparent 50%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Top border accent stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${accent}, transparent)`,
                    borderRadius: '20px 20px 0 0',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Badge icon */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--accent-light)',
                      border: '1px solid rgba(220, 38, 38, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Award size={20} color={accent} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.3,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {cert.name}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: issuerColor,
                      }}
                    >
                      {cert.issuer}
                    </span>
                    <span style={{ color: 'var(--border)', fontSize: '0.7rem' }}>·</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {cert.date}
                    </span>
                  </div>

                  {cert.credentialId && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.3rem 0.65rem',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        width: 'fit-content',
                      }}
                    >
                      <CheckCircle size={11} color="#22C55E" />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          color: 'var(--text-muted)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {cert.credentialId}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .certs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 960px;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .certs-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .cert-card:hover {
          border-color: rgba(220, 38, 38, 0.3) !important;
          box-shadow: var(--shadow-red);
        }
      `}</style>
    </section>
  );
};
