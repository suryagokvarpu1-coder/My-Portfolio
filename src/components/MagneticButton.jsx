import React, { useRef, useCallback } from 'react';

export const MagneticButton = ({ children, range = 40, strength = 0.35 }) => {
  const wrapRef = useRef(null);
  const animRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < range + 80) {
      const x = dx * strength;
      const y = dy * strength;
      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.transition = 'transform 0.1s ease';
      });
    }
  }, [range, strength]);

  const onMouseLeave = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    cancelAnimationFrame(animRef.current);
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-flex' }}
    >
      {children}
    </div>
  );
};
