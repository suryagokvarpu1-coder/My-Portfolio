import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';

// CountUp Component with high-end physics easing
const CountUp = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    const totalDuration = 2000; // ms
    const incrementTime = Math.max(Math.floor(totalDuration / end), 24);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const About = () => {
  const { paragraphs, stats } = portfolioData.aboutMe;
  const cardsRef = useRef([]);

  // Spotlight mouse track handler for bento stats cards
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

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader index="01" title="About Story" align="left" subtitle="Deciphering the balance between systemic backend code structures and high-end interactive visual logic." />

        <div className="about-grid">
          {/* Left: Cinematic Image Bento Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="about-image-container"
          >
            <div className="about-image-frame">
              <img
                src="assets/images/profile.png"
                alt="Yaswanth Gokavarapu Creative Technologist"
                className="about-img"
              />
              <div className="about-image-overlay" />
              {/* Outer decorative glowing elements */}
              <div className="corner-decor top-left" />
              <div className="corner-decor bottom-right" />
            </div>
          </motion.div>

          {/* Right: Narrative Description & Spotlight Stats Cards */}
          <div className="about-content">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 }
                }
              }}
            >
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                  }}
                  style={{
                    fontSize: '1.05rem',
                    color: '#94a3b8',
                    lineHeight: 1.75,
                    marginBottom: '1.8rem',
                    fontWeight: 300,
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Bento Stats Spotlight Container */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                className="stats-container"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    variants={{
                      hidden: { opacity: 0, y: 25 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    className="stat-card glass-card"
                  >
                    <span className="stat-value">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-image-container {
          position: relative;
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
        }

        .about-image-frame {
          position: relative;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          aspect-ratio: 4 / 5;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          background-color: #0b0b10;
        }

        .about-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .about-image-container:hover .about-img {
          transform: scale(1.08);
        }

        .about-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(360deg, rgba(3, 3, 6, 0.8) 0%, rgba(99, 102, 241, 0.08) 100%);
          pointer-events: none;
        }

        /* Decorative brackets */
        .corner-decor {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #10b981;
          pointer-events: none;
          z-index: 5;
          opacity: 0.6;
          transition: all 0.4s ease;
        }
        .top-left {
          top: 15px;
          left: 15px;
          border-right: none;
          border-bottom: none;
        }
        .bottom-right {
          bottom: 15px;
          right: 15px;
          border-left: none;
          border-top: none;
        }
        .about-image-container:hover .corner-decor {
          opacity: 1;
          width: 25px;
          height: 25px;
          border-color: #6366f1;
        }

        .about-content {
          width: 100%;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 3.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 2.5rem;
        }

        .stat-card {
          padding: 1.5rem !important;
          border-radius: var(--border-radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-value {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: clamp(1.8rem, 4.5vw, 3rem);
          line-height: 1;
          background: linear-gradient(135deg, #6366f1 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        @media (max-width: 576px) {
          .stats-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 4.2fr 5.8fr;
            gap: 6rem;
          }
        }
      `}</style>
    </section>
  );
};
