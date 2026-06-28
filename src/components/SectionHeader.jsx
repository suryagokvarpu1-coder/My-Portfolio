import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ index, title, subtitle, align = 'center' }) => {
  const isLeft = align === 'left';

  return (
    <div
      style={{
        marginBottom: '4rem',
        textAlign: isLeft ? 'left' : 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-start' : 'center',
      }}
    >
      {/* Index Tag */}
      {index && (
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#10b981',
            marginBottom: '0.75rem',
            display: 'block'
          }}
        >
          // {index}
        </motion.span>
      )}

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 40%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: subtitle ? '1rem' : '0'
        }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            color: '#94a3b8',
            maxWidth: '600px',
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
