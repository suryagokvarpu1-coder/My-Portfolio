import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !ring) return;

    // Set initial positions offscreen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(ring, { scale: 1 });
    gsap.set(dot, { scale: 1 });

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // 中央のドットは素早く追従
      gsap.to(dot, { x, y, duration: 0.1, overwrite: "auto" });
      
      // 外側のリングはイージングで追従
      gsap.to(ring, { x, y, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.15 });
      gsap.to(ring, { scale: 0.85, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(ring, { scale: 1, duration: 0.2 });
    };

    const onMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    // Event selectors
    const clickablesSelector = 'a, button, .clickable, .btn, .nav-item';
    const dragablesSelector = '[data-cursor="drag"]';

    const onMouseEnterClickable = () => {
      gsap.to(ring, {
        scale: 1.8,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.9)',
        duration: 0.25
      });
      gsap.to(dot, {
        scale: 0.4,
        backgroundColor: '#10b981',
        duration: 0.25
      });
    };

    const onMouseLeaveClickable = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.25
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#6366f1',
        duration: 0.25
      });
    };

    const onMouseEnterDrag = () => {
      setCursorText('DRAG');
      gsap.to(ring, {
        scale: 2.8,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#6366f1',
        borderStyle: 'dashed',
        duration: 0.3
      });
      gsap.to(dot, {
        opacity: 0,
        scale: 0.1,
        duration: 0.2
      });
    };

    const onMouseLeaveDrag = () => {
      setCursorText('');
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderStyle: 'solid',
        duration: 0.3
      });
      gsap.to(dot, {
        opacity: 1,
        scale: 1,
        backgroundColor: '#6366f1',
        duration: 0.2
      });
    };

    // Helper to bind events dynamically
    const attachCursorEvents = () => {
      const clickables = document.querySelectorAll(clickablesSelector);
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterClickable);
        el.addEventListener('mouseleave', onMouseLeaveClickable);
      });

      const dragables = document.querySelectorAll(dragablesSelector);
      dragables.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterDrag);
        el.addEventListener('mouseleave', onMouseLeaveDrag);
      });
    };

    attachCursorEvents();

    // Observe body mutations for new elements
    const observer = new MutationObserver(attachCursorEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      observer.disconnect();

      const clickables = document.querySelectorAll(clickablesSelector);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterClickable);
        el.removeEventListener('mouseleave', onMouseLeaveClickable);
      });

      const dragables = document.querySelectorAll(dragablesSelector);
      dragables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterDrag);
        el.removeEventListener('mouseleave', onMouseLeaveDrag);
      });
    };
  }, []);

  return (
    <>
      {/* Central Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          zIndex: 99999,
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)'
        }}
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backgroundColor: 'transparent',
          zIndex: 99998,
          pointerEvents: 'none',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Dynamic Inner Text (e.g. "DRAG") */}
        {cursorText && (
          <span
            ref={textRef}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '8px',
              fontWeight: 700,
              color: '#f8fafc',
              letterSpacing: '0.15em'
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
