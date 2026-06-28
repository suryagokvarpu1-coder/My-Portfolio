import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.215, 0.61, 0.355, 1] // Custom easeOutCubic
      }
    }
  };

  const wordRevealVariants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const handleCtaClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const offset = 100;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  const subtitleText = "Designing immersive digital narratives by blending futuristic WebGL interfaces with robust, full-stack software architecture.";

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        padding: '120px 0 80px 0',
      }}
    >
      {/* Immersive background lighting grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 60%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '920px' }}
        >
          {/* Creative Label Tag */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ width: '32px', height: '1px', backgroundColor: '#10b981' }} />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#10b981',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              CREATIVE TECHNOLOGIST
            </span>
          </motion.div>

          {/* Premium Headline (Mask Reveal) */}
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
              marginBottom: '2rem',
              color: '#f8fafc',
            }}
          >
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <motion.span 
                variants={wordRevealVariants}
                style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Yaswanth
              </motion.span>
            </div>
            <div style={{ overflow: 'hidden', display: 'block' }}>
              <motion.span 
                variants={wordRevealVariants}
                style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Gokavarapu
              </motion.span>
            </div>
          </h1>

          {/* Tagline Paragraph (Fades up) */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '3.5rem',
              fontWeight: 300,
              maxWidth: '720px',
              letterSpacing: '-0.01em'
            }}
          >
            {subtitleText}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <MagneticButton>
              <a
                href="#projects"
                onClick={(e) => handleCtaClick(e, '#projects')}
                className="btn btn-primary"
              >
                Explore Creation
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => handleCtaClick(e, '#contact')}
                className="btn btn-secondary"
              >
                Transit Message
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic scroll down icon */}
      <motion.a
        href="#about"
        onClick={(e) => handleCtaClick(e, '#about')}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          color: '#94a3b8',
          fontSize: '0.75rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          zIndex: 3,
        }}
      >
        <span>SCROLL DOWN</span>
        <div
          style={{
            width: '20px',
            height: '32px',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: '3px',
              height: '7px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
            }}
          />
        </div>
      </motion.a>
    </section>
  );
};
