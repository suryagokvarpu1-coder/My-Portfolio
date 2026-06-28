import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';

const CountUp = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;
    const duration = 1800;
    const interval = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) { clearInterval(timer); setCount(end); }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const About = () => {
  const { paragraphs, stats } = portfolioData.aboutMe;
  const cardsRef = useRef([]);

  // Spotlight hover
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

  const fadeVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
    }),
  };

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          index="01"
          title="About Story"
          subtitle="Deciphering the balance between systemic backend code and high-end interactive visual logic."
          align="left"
        />

        <div className="about-layout">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="about-image-col"
          >
            <div className="about-frame">
              <img
                src="assets/images/profile.png"
                alt="Yaswanth Gokavarapu"
                className="about-img"
                loading="lazy"
              />
              <div className="about-frame-overlay" />

              {/* Corner brackets */}
              <span className="corner-bracket corner-tl" aria-hidden="true" />
              <span className="corner-bracket corner-br" aria-hidden="true" />

              {/* Floating available badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="available-badge"
              >
                <span className="available-dot" />
                <span>Available for work</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="about-content-col">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
            >
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    fontSize: '1.05rem',
                    color: '#7a7a8c',
                    lineHeight: 1.75,
                    marginBottom: '1.5rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {i === 0 ? (
                    <>
                      <span style={{ color: '#f0f0f5', fontWeight: 500 }}>
                        I am a software engineer and creative technologist
                      </span>{' '}
                      {para.substring('I am a software engineer and creative technologist'.length)}
                    </>
                  ) : para}
                </motion.p>
              ))}

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  margin: '2.5rem 0',
                }}
              />

              {/* Stats */}
              <div className="about-stats-row">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.id}
                    ref={el => (cardsRef.current[i] = el)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.7 }}
                    className="stat-block surface-spotlight"
                    style={{
                      background: 'rgba(11,12,18,0.5)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px',
                      padding: '1.5rem 1.25rem',
                      textAlign: 'center',
                      backdropFilter: 'blur(12px)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Spotlight radial */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(400px circle at var(--x, -999px) var(--y, -999px), rgba(232,255,107,0.04), transparent 50%)',
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                    />
                    <span
                      style={{
                        display: 'block',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        color: i === 0 ? '#e8ff6b' : i === 1 ? '#7c6af7' : '#4cc9f0',
                        lineHeight: 1,
                        marginBottom: '0.4rem',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.68rem',
                        fontWeight: 400,
                        color: '#3a3a4a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .about-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-image-col {
          display: flex;
          justify-content: center;
        }

        .about-frame {
          position: relative;
          width: 100%;
          max-width: 400px;
          border-radius: 20px;
          overflow: visible;
        }

        .about-img {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          background: #0b0c12;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }

        .about-frame:hover .about-img {
          transform: scale(1.04);
        }

        .about-frame-overlay {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(180deg, transparent 50%, rgba(5,5,8,0.6) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .corner-bracket {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 2px solid rgba(232,255,107,0.5);
          z-index: 5;
          pointer-events: none;
          transition: all 0.4s ease;
        }

        .corner-tl {
          top: 12px;
          left: 12px;
          border-right: none;
          border-bottom: none;
          border-radius: 4px 0 0 0;
        }

        .corner-br {
          bottom: 12px;
          right: 12px;
          border-left: none;
          border-top: none;
          border-radius: 0 0 4px 0;
        }

        .about-frame:hover .corner-bracket {
          width: 30px;
          height: 30px;
          border-color: #e8ff6b;
        }

        .available-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(5,5,8,0.85);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 0.35rem 0.75rem;
          backdrop-filter: blur(12px);
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: #7a7a8c;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .available-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-dot 2s ease-in-out infinite;
          display: block;
        }

        .about-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        @media (max-width: 560px) {
          .about-stats-row {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 1024px) {
          .about-layout {
            grid-template-columns: 4fr 6fr;
            gap: 6rem;
          }
        }
      `}</style>
    </section>
  );
};
