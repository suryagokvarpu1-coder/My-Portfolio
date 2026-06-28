import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll trigger for navbar contraction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to sync active links with viewport position
  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach(sec => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach(sec => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    const offset = 100; // height offset
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: scrolled ? '1.25rem' : '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: scrolled ? '820px' : '1020px',
          zIndex: 1000,
          transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '0.6rem 1.6rem' : '1rem 2.2rem',
            borderRadius: '100px',
            backgroundColor: scrolled ? 'rgba(7, 7, 10, 0.7)' : 'rgba(7, 7, 10, 0.25)',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(255, 255, 255, 0.02)',
            boxShadow: scrolled ? '0 20px 40px rgba(0, 0, 0, 0.4)' : 'none',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Logo */}
          <MagneticButton>
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '0.15em',
                background: 'linear-gradient(90deg, #ffffff 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              YASWANTH.G
            </a>
          </MagneticButton>

          {/* Desktop Navigation */}
          <nav>
            <ul
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '1.8rem',
                listStyle: 'none',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href} style={{ position: 'relative' }}>
                    <MagneticButton>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          color: isActive ? '#f8fafc' : '#94a3b8',
                          padding: '0.5rem 1rem',
                          transition: 'color 0.4s ease',
                          display: 'block',
                          zIndex: 2,
                          position: 'relative'
                        }}
                      >
                        {link.label}
                      </a>
                    </MagneticButton>
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.15))',
                          border: '1px solid rgba(99, 102, 241, 0.25)',
                          borderRadius: '50px',
                          zIndex: 1,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Action */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f8fafc',
                cursor: 'pointer',
                display: 'block',
                zIndex: 1002,
                position: 'relative',
                padding: '4px'
              }}
              className="mobile-nav-toggle"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </header>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>

      {/* Screen Curtain Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.75, ease: [0.85, 0, 0.15, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#020204',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Ambient Floating Glow Orb */}
            <div
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            <ul
              style={{
                listStyle: 'none',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.06, duration: 0.45, ease: "easeOut" }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: '2.2rem',
                        color: isActive ? '#6366f1' : '#f8fafc',
                        letterSpacing: '0.05em',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
