import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import profileImg from '../assets/images/profile.png';


const ROLES = [
  "Computer Science Engineering Student",
  "Full Stack Developer",
  "AI Enthusiast",
  "Prompt Engineer"
];

export const Hero = () => {
  const { name, tagline, githubUrl, linkedinUrl, email } = portfolioData.personalInfo;
  
  // Typewriter effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const fullText = ROLES[roleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80);
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          return;
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const handleCtaClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '120px 0 60px',
      }}
    >
      {/* Subtle background radial gradients */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 10% 20%, rgba(220, 38, 38, 0.04) 0%, transparent 60%), radial-gradient(circle at 90% 80%, rgba(239, 68, 68, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-flex">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ maxWidth: '680px' }}
          >
            {/* Top Eyebrow */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: '0.8rem',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Hi there, my name is
            </span>

            {/* Name */}
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: '1.25rem',
                color: 'var(--text-primary)',
              }}
            >
              {name}
            </h1>

            {/* Dynamic typewriter roles */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(1.25rem, 3.5vw, 2rem)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span>{currentText}</span>
              <span className="typewriter-cursor">|</span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                fontWeight: 300,
              }}
            >
              {tagline}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              <a
                href="#contact"
                onClick={(e) => handleCtaClick(e, '#contact')}
                className="btn btn-primary"
              >
                Contact Me
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("CV asset generation complete. Ready to link real PDF document.");
                }}
                className="btn btn-secondary"
              >
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hero-social-link"
              >
                <Github size={20} />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hero-social-link"
              >
                <Linkedin size={20} />
              </a>

              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="hero-social-link"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hero-image-container"
          >
            <div className="hero-photo-wrap">
              <img
                src={profileImg}
                alt="Gokavarapu Yaswanth"
                className="hero-photo"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </div>

      <style>{`
        .hero-flex {
          display: flex;
          flex-direction: column-reverse;
          gap: 3rem;
          align-items: center;
        }

        .hero-image-container {
          width: 240px;
          height: 240px;
          flex-shrink: 0;
        }

        .hero-photo-wrap {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          background: var(--bg-card);
        }

        .hero-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-social-link {
          color: var(--accent);
        }

        .hero-social-link:hover {
          color: var(--accent);
        }

        .typewriter-cursor {
          color: var(--accent);
          margin-left: 2px;
          animation: blink 0.8s infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @media (min-width: 860px) {
          .hero-flex {
            flex-direction: row;
            justify-content: space-between;
            gap: 5rem;
          }

          .hero-image-container {
            width: 320px;
            height: 320px;
          }
        }
      `}</style>
    </section>
  );
};
