import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_PHRASES = [
  'INITIALIZING VOID',
  'RENDERING MERIDIAN',
  'LOADING EXPERIENCE',
  'COMPOSING INTERFACE',
  'CRAFTING MOMENTS',
];

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const DURATION = 2600;
    const INTERVAL = 16;
    const STEP = 100 / (DURATION / INTERVAL);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + STEP, 100);
        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => {
              setHidden(true);
              onComplete?.();
            }, 1000);
          }, 400);
        }
        return next;
      });
    }, INTERVAL);

    const phraseTimer = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % LOADING_PHRASES.length);
    }, 500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(phraseTimer);
    };
  }, [onComplete]);

  if (hidden) return null;

  const displayProgress = Math.round(progress);

  return (
    <AnimatePresence>
      {!exiting ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#050508',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Background subtle grid */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(rgba(232,255,107,0.02) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(232,255,107,0.02) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              zIndex: 0,
            }}
          />

          {/* Main content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {/* Huge progress number */}
            <div style={{ position: 'relative' }}>
              <motion.span
                key={displayProgress}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(6rem, 18vw, 14rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  color: '#f0f0f5',
                  userSelect: 'none',
                }}
              >
                {displayProgress}
              </motion.span>
              <span
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '-1.5rem',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#e8ff6b',
                }}
              >
                %
              </span>
            </div>

            {/* Name */}
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.35em',
                color: 'rgba(240, 240, 245, 0.5)',
                textTransform: 'uppercase',
              }}
            >
              YASWANTH GOKAVARAPU
            </div>

            {/* Cycling phrase */}
            <div style={{ height: '20px', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem',
                    fontWeight: 400,
                    letterSpacing: '0.25em',
                    color: '#3a3a4a',
                    textTransform: 'uppercase',
                  }}
                >
                  {LOADING_PHRASES[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: '160px',
                height: '1px',
                background: 'rgba(255,255,255,0.06)',
                position: 'relative',
                borderRadius: '999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7c6af7, #e8ff6b)',
                  transition: 'width 0.1s linear',
                  borderRadius: '999px',
                  boxShadow: '0 0 8px rgba(232,255,107,0.4)',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          key="exit"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            pointerEvents: 'none',
          }}
        >
          {/* Left panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
            style={{
              width: '50%',
              height: '100%',
              background: '#050508',
              transformOrigin: 'left',
            }}
          />
          {/* Right panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
            style={{
              width: '50%',
              height: '100%',
              background: '#050508',
              transformOrigin: 'right',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
