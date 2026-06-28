import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -999, y: -999 });
  const ringPosRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.1);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.1);
      if (ring) {
        ring.style.left = `${ringPosRef.current.x}px`;
        ring.style.top = `${ringPosRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', onMouseMove);

    const onMouseDown = () => ring?.classList.add('is-clicking');
    const onMouseUp = () => ring?.classList.remove('is-clicking');
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const addHover = () => ring?.classList.add('is-hovering');
    const removeHover = () => ring?.classList.remove('is-hovering');

    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea, .btn').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachHoverListeners();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};
