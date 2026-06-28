import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const DURATION = 1200;
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
            }, 500);
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
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#111827',
                letterSpacing: '-0.03em',
              }}
            >
              Yaswanth<span style={{ color: '#DC2626' }}>.G</span>
            </span>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#9CA3AF', letterSpacing: '0.1em' }}>
              {Math.round(progress)}%
            </span>

            <div
              style={{
                width: '140px',
                height: '3px',
                background: '#F3F4F6',
                borderRadius: '999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #991B1B, #DC2626)',
                  transition: 'width 0.1s linear',
                  borderRadius: '999px',
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
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#FFFFFF',
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
};
