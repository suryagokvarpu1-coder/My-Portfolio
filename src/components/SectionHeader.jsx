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
      style={{ textAlign: isCenter ? 'center' : 'left' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
    >
      {/* Index + line */}
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
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem',
            fontWeight: 500,
            color: '#e8ff6b',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          {index}
        </span>
        <div
          style={{
            width: '32px',
            height: '1px',
            background: 'linear-gradient(90deg, #e8ff6b, transparent)',
          }}
        />
      </motion.div>

      {/* Title with mask reveal */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          variants={{
            hidden: { y: '105%' },
            visible: {
              y: 0,
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            },
          }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#f0f0f5',
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
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            color: '#7a7a8c',
            lineHeight: 1.7,
            maxWidth: isCenter ? '580px' : '520px',
            marginLeft: isCenter ? 'auto' : 0,
            marginRight: isCenter ? 'auto' : 0,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
