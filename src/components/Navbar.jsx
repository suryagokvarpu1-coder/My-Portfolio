import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-35% 0px -45% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          top: scrolled ? '1rem' : '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92%',
          maxWidth: scrolled ? '860px' : '1100px',
          zIndex: 1000,
          transition: 'top 0.4s ease, max-width 0.4s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '0.65rem 1.5rem' : '0.9rem 2rem',
            borderRadius: '100px',
            background: scrolled
              ? 'rgba(5, 5, 8, 0.85)'
              : 'rgba(5, 5, 8, 0.4)',
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Logo */}
          <MagneticButton>
            <a
              href="#hero"
              onClick={(e) => handleClick(e, '#hero')}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.08em',
                color: '#f0f0f5',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span style={{ color: '#e8ff6b' }}>YG</span>
              <span style={{ color: 'rgba(240,240,245,0.35)', fontWeight: 300, fontSize: '0.9rem' }}>·</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(240,240,245,0.5)', letterSpacing: '0.12em' }}>PORTFOLIO</span>
            </a>
          </MagneticButton>

          {/* Desktop Nav */}
          <nav aria-label="Primary navigation" className="desktop-nav-vm">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                listStyle: 'none',
              }}
            >
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <MagneticButton range={30}>
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          color: isActive ? '#f0f0f5' : '#7a7a8c',
                          padding: '0.5rem 0.9rem',
                          borderRadius: '100px',
                          display: 'block',
                          position: 'relative',
                          transition: 'color 0.25s ease',
                          background: isActive ? 'rgba(232,255,107,0.06)' : 'transparent',
                          border: `1px solid ${isActive ? 'rgba(232,255,107,0.15)' : 'transparent'}`,
                        }}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-pill"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              borderRadius: '100px',
                              background: 'rgba(232,255,107,0.06)',
                              border: '1px solid rgba(232,255,107,0.15)',
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
                      </a>
                    </MagneticButton>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => handleClick(e, '#contact')}
                className="btn btn-lime desktop-cta-vm"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.82rem' }}
              >
                Hire Me
              </a>
            </MagneticButton>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle-vm"
              aria-label="Toggle menu"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#f0f0f5',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 998,
              background: 'rgba(5, 5, 8, 0.97)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Decorative element */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,106,247,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <ul style={{ listStyle: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 'clamp(2rem, 7vw, 3rem)',
                        color: isActive ? '#e8ff6b' : 'rgba(240,240,245,0.7)',
                        letterSpacing: '-0.02em',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.65rem',
                color: '#3a3a4a',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              yaswanthgokavarapu97@gmail.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav-vm { display: none; }
        .desktop-cta-vm { display: none; }

        @media (min-width: 860px) {
          .desktop-nav-vm { display: block; }
          .desktop-cta-vm { display: inline-flex; }
          .mobile-toggle-vm { display: none !important; }
        }
      `}</style>
    </>
  );
};
