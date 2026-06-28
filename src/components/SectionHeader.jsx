import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ index, title, subtitle, align = 'left' }) => {
  const isCenter = align === 'center';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className="section-header"
      style={{ textAlign: isCenter ? 'center' : 'left', marginBottom: '3.5rem' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
    >
      {/* Index badge + line */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          justifyContent: isCenter ? 'center' : 'flex-start',
          marginBottom: '0.75rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#DC2626',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            background: '#FEE2E2',
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
          }}
        >
          {index}
        </span>
        <div
          style={{
            flex: isCenter ? 'none' : 1,
            maxWidth: '48px',
            height: '2px',
            background: 'linear-gradient(90deg, #DC2626, transparent)',
            borderRadius: '2px',
          }}
        />
      </motion.div>

      {/* Title */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          variants={{
            hidden: { y: '105%' },
            visible: {
              y: 0,
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            },
          }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#111827',
          }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={itemVariants}
          style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#6B7280',
            lineHeight: 1.7,
            maxWidth: isCenter ? '560px' : '520px',
            marginLeft: isCenter ? 'auto' : 0,
            marginRight: isCenter ? 'auto' : 0,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
