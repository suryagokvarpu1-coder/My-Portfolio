import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download, Loader2, Terminal, Code2, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ROLES = [
  "Frontend Developer (UI/UX) Intern",
  "Full Stack Web Developer",
  "AI Engineer & Prompt Architect"
];

export const Hero = () => {
  const { name, tagline, githubUrl, linkedinUrl, email } = portfolioData.personalInfo;
  
  // Typewriter effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownloadResume = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/assets/Gokavarapu_Yaswanth_Resume.pdf';
      link.download = 'Gokavarapu_Yaswanth_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1000);
  };

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
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
        background: 'linear-gradient(135deg, #0A0D14 0%, #140505 50%, #06080C 100%)',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* Soft glowing ambient radial gradients */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-flex">
          {/* Left Block: Animated Info & Glassmorphism Introduction */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Top Eyebrow */}
            <motion.span
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: '0.8rem',
                color: '#EF4444',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              Hi there, my name is
            </motion.span>

            {/* Name - Animates small to large with soft fade-in */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                textShadow: '0 0 40px rgba(220, 38, 38, 0.15)',
              }}
            >
              Gokavarapu<br/>
              <span style={{
                background: 'linear-gradient(90deg, #FFFFFF, #EF4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Yaswanth</span>
            </motion.h1>

            {/* Staggered Role reveal */}
            <motion.div
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
                fontWeight: 600,
                color: '#EF4444',
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span>{currentText}</span>
              <span className="typewriter-cursor">|</span>
            </motion.div>

            {/* Premium Glassmorphism Card containing Introduction */}
            <motion.div
              variants={itemVariants}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '16px',
                padding: '2rem',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              }}
            >
              <p
                style={{
                  fontSize: '1rem',
                  color: '#D1D5DB',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  margin: 0
                }}
              >
                {tagline}
              </p>
            </motion.div>

            {/* CTAs - Slide up with fade-in */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}
            >
              <a
                href="#projects"
                onClick={(e) => handleCtaClick(e, '#projects')}
                className="btn btn-primary"
                style={{
                  background: '#DC2626',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(220,38,38,0.3)',
                  border: '2px solid transparent'
                }}
              >
                View Projects
              </a>

              <button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: isDownloading ? 'not-allowed' : 'pointer',
                  border: '2px solid #DC2626',
                  color: '#FFFFFF',
                  background: 'transparent'
                }}
              >
                {isDownloading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Download Resume</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginTop: '0.5rem' }}
            >
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
            </motion.div>
          </motion.div>

          {/* Right Block: Clean Developer Console Mockup showcasing skills/projects */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-right-console"
          >
            <div className="console-window">
              {/* Window Header */}
              <div className="console-header">
                <div className="console-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="console-title">
                  <Terminal size={12} style={{ marginRight: '4px' }} />
                  <span>developer@yaswanth: ~</span>
                </div>
              </div>
              
              {/* Window Body */}
              <div className="console-body">
                <div className="console-line">
                  <span className="prompt">yaswanth ~ %</span> <span className="cmd">npm run load-skills</span>
                </div>
                <div className="console-output lang-list">
                  <div className="lang-item"><Code2 size={12} /> React.js & JavaScript (ES6+)</div>
                  <div className="lang-item"><Cpu size={12} /> Generative AI & LLM Workflows</div>
                  <div className="lang-item"><Terminal size={12} /> Firebase & Full Stack Architecture</div>
                </div>
                
                <div className="console-line" style={{ marginTop: '12px' }}>
                  <span className="prompt">yaswanth ~ %</span> <span className="cmd">git show-stats</span>
                </div>
                <div className="console-output stats-list">
                  <div><span>Status:</span> <font color="#22C55E">Active Intern (Yudi AI Labs)</font></div>
                  <div><span>Featured Projects:</span> <font color="#EF4444">BeatFlow, Qubic Council, Agri AI</font></div>
                  <div><span>Main Technologies:</span> <font color="#D1D5DB">HTML5, CSS3, Vercel, Figma</font></div>
                </div>
                
                <div className="console-line animate-cursor" style={{ marginTop: '12px' }}>
                  <span className="prompt">yaswanth ~ %</span> <span className="cursor-block" />
                </div>
              </div>
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
          color: '#9CA3AF',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} color="#EF4444" />
        </motion.div>
      </div>

      <style>{`
        .hero-flex {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-social-link {
          color: #9CA3AF;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .hero-social-link:hover {
          color: #EF4444;
          transform: translateY(-2px);
        }

        .typewriter-cursor {
          color: #EF4444;
          margin-left: 2px;
          animation: blink 0.8s infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Console styling */
        .hero-right-console {
          width: 100%;
          max-width: 460px;
          flex-shrink: 0;
        }

        .console-window {
          background: rgba(10, 15, 30, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(220, 38, 38, 0.05);
          backdrop-filter: blur(12px);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          line-height: 1.5;
        }

        .console-header {
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          position: relative;
        }

        .console-dots {
          display: flex;
          gap: 6px;
        }

        .console-dots .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .console-dots .dot.red { background: #FF5F56; }
        .console-dots .dot.yellow { background: #FFBD2E; }
        .console-dots .dot.green { background: #27C93F; }

        .console-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: #9CA3AF;
          font-size: 0.72rem;
          display: flex;
          align-items: center;
        }

        .console-body {
          padding: 18px;
          color: #E5E7EB;
        }

        .console-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .console-line .prompt {
          color: #EF4444;
        }

        .console-line .cmd {
          color: #FFFFFF;
        }

        .console-output {
          padding-left: 14px;
          margin-top: 6px;
          color: #9CA3AF;
        }

        .console-output.lang-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lang-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #E5E7EB;
        }

        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .stats-list span {
          color: #6B7280;
          display: inline-block;
          width: 140px;
        }

        .cursor-block {
          width: 8px;
          height: 14px;
          background: #EF4444;
          animation: blink 0.8s infinite;
        }

        @media (min-width: 860px) {
          .hero-flex {
            flex-direction: row;
            justify-content: space-between;
            gap: 5rem;
            align-items: center;
          }

          .hero-right-console {
            max-width: 480px;
            width: 45%;
          }
        }
      `}</style>
    </section>
  );
};
