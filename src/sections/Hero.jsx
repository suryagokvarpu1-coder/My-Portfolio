import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { portfolioData } from '../data/portfolioData';

export const Hero = () => {
  const { name, subtitle, githubUrl, linkedinUrl, experienceYears, projectsCompleted } = portfolioData.personalInfo;
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  // Gentle mouse parallax on name rows
  useEffect(() => {
    const first = firstNameRef.current;
    const last = lastNameRef.current;
    if (!first || !last) return;

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 18;
      const ny = (e.clientY / window.innerHeight - 0.5) * 8;
      first.style.transform = `translate(${nx * 0.6}px, ${ny * 0.4}px)`;
      last.style.transform = `translate(${nx * 0.35}px, ${ny * 0.25}px)`;
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const handleScroll = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  };

  const wordReveal = {
    hidden: { y: '110%' },
    visible: (i) => ({
      y: 0,
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 + i * 0.12 },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 + i * 0.1 },
    }),
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        padding: '120px 0 80px',
      }}
    >
      {/* Decorative grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(232,255,107,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(232,255,107,0.015) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          zIndex: 0,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Ambient glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,106,247,0.08) 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,255,107,0.05) 0%, transparent 70%)',
            bottom: '10%',
            right: '5%',
          }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left: Text content */}
          <div>
            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                background: 'rgba(232,255,107,0.06)',
                border: '1px solid rgba(232,255,107,0.2)',
                borderRadius: '100px',
                marginBottom: '2.5rem',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#e8ff6b',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                  display: 'block',
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  color: '#e8ff6b',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Creative Technologist
              </span>
            </motion.div>

            {/* Giant headline */}
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                marginBottom: '2rem',
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
              }}
            >
              {/* First name — solid */}
              <div style={{ overflow: 'hidden', display: 'block' }}>
                <motion.span
                  ref={firstNameRef}
                  custom={0}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(4.5rem, 12vw, 10rem)',
                    fontWeight: 700,
                    color: '#f0f0f5',
                    willChange: 'transform',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  Yaswanth
                </motion.span>
              </div>

              {/* Last name — outline */}
              <div style={{ overflow: 'hidden', display: 'block' }}>
                <motion.span
                  ref={lastNameRef}
                  custom={1}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(4.5rem, 12vw, 10rem)',
                    fontWeight: 700,
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(240,240,245,0.35)',
                    paddingLeft: 'clamp(1rem, 3vw, 2.5rem)',
                    willChange: 'transform',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  Gokavarapu
                </motion.span>
              </div>
            </h1>

            {/* Subtitle */}
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#7a7a8c',
                lineHeight: 1.7,
                maxWidth: '540px',
                marginBottom: '3rem',
                fontWeight: 400,
              }}
            >
              {subtitle}
            </motion.p>

            {/* CTA Row */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={(e) => handleScroll(e, '#projects')}
                  className="btn btn-lime"
                >
                  View My Work
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  onClick={(e) => handleScroll(e, '#contact')}
                  className="btn btn-outline"
                >
                  Get in Touch
                </a>
              </MagneticButton>

              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.6rem', marginLeft: '0.5rem' }}>
                <MagneticButton range={20}>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7a7a8c',
                      transition: 'all 0.25s ease',
                    }}
                    data-cursor="hover"
                  >
                    <Github size={16} />
                  </a>
                </MagneticButton>

                <MagneticButton range={20}>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7a7a8c',
                      transition: 'all 0.25s ease',
                    }}
                    data-cursor="hover"
                  >
                    <Linkedin size={16} />
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right: Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-stats-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {[
              { value: experienceYears, label: 'Years of\nExperience', color: '#e8ff6b' },
              { value: projectsCompleted, label: 'Projects\nCompleted', color: '#7c6af7' },
              { value: '99%', label: 'Client\nSatisfaction', color: '#4cc9f0' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.1, duration: 0.6 }}
                style={{
                  background: 'rgba(11, 12, 18, 0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    color: stat.color,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    minWidth: '70px',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.8rem',
                    color: '#7a7a8c',
                    lineHeight: 1.4,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => handleScroll(e, '#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 3,
          color: '#3a3a4a',
        }}
        aria-label="Scroll to about section"
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            writingMode: 'horizontal-lr',
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 300px !important;
          }
        }
        @media (max-width: 1023px) {
          .hero-stats-panel {
            flex-direction: row !important;
            flex-wrap: wrap;
          }
          .hero-stats-panel > div {
            flex: 1 1 140px;
          }
        }
      `}</style>
    </section>
  );
};
