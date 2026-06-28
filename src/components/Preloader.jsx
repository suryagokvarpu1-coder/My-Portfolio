import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingTexts = [
  "COLLECTING PORTFOLIO ASSETS",
  "COMPILING INTERACTIVE LAYER",
  "INITIALIZING THREE.JS NODES",
  "TRANSITING NEON GLSL LAYER",
  "READY FOR ORCHESTRATION"
];

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2400; // ms
    const intervalTime = 16;
    const step = 100 / (duration / intervalTime);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 600); // Wait at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 450);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  // Screen split animations
  const panelVariants = {
    exitTop: {
      y: '-100%',
      transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.1 }
    },
    exitBottom: {
      y: '100%',
      transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.1 }
    }
  };

  const textContainerVariants = {
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
        >
          {/* Top Panel */}
          <motion.div
            variants={panelVariants}
            exit="exitTop"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50.5%',
              backgroundColor: '#020204',
              borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
              pointerEvents: 'auto'
            }}
          />

          {/* Bottom Panel */}
          <motion.div
            variants={panelVariants}
            exit="exitBottom"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50.5%',
              backgroundColor: '#020204',
              borderTop: '1px solid rgba(255, 255, 255, 0.03)',
              pointerEvents: 'auto'
            }}
          />

          {/* Loading Content */}
          <motion.div
            variants={textContainerVariants}
            exit="exit"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100000,
              pointerEvents: 'auto',
              textAlign: 'center',
              padding: '0 2rem'
            }}
          >
            {/* Ambient glowing orb behind percentage */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(20px)',
                pointerEvents: 'none'
              }}
            />

            {/* Huge numeric counter */}
            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(5rem, 12vw, 10rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  background: 'linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.05) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                  letterSpacing: '-0.04em'
                }}
              >
                {Math.round(progress)}
              </span>
              <span
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '-1.5rem',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: '#10b981'
                }}
              >
                %
              </span>
            </div>

            {/* Project Brand */}
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.4em',
                color: '#f8fafc',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                opacity: 0.8
              }}
            >
              YASWANTH GOKAVARAPU
            </h1>

            {/* Dynamic cycling statuses */}
            <div style={{ minHeight: '24px', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    color: '#94a3b8',
                    textTransform: 'uppercase'
                  }}
                >
                  {loadingTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Mini Progress Bar Line */}
            <div
              style={{
                width: '180px',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                marginTop: '2rem',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  background: 'linear-gradient(90deg, #6366f1, #10b981)',
                  width: `${progress}%`,
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
                  transition: 'width 0.1s linear'
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
