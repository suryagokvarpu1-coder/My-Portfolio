import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const MagneticButton = ({ children, range = 35, speed = 1, tolerance = 0.35 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse distance from center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Apply magnetic pull proportional to proximity
        const pullX = distanceX * tolerance;
        const pullY = distanceY * tolerance;
        
        gsap.to(container, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        // Return home if mouse is within element bounds but past magnetic range
        gsap.to(container, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        });
      }
    };

    const onMouseLeave = () => {
      // Elastic snap back to origin
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)",
        overwrite: "auto"
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [range, tolerance]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-block',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
