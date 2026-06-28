import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const DURATION = 1200; // Recruiter friendly fast load
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
            }, 600);
          }, 200);
        }
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {!exiting ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#0a0b10',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
              }}
            >
              Yaswanth<span style={{ color: 'var(--accent-lime)' }}>.G</span>
            </span>

            {/* Percentage indicator */}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {Math.round(progress)}%
            </span>

            {/* Micro loading line */}
            <div
              style={{
                width: '120px',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'var(--accent-lime)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          key="exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#0a0b10',
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
};
