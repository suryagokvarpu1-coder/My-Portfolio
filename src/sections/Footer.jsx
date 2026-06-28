import React from 'react';
import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from '../components/MagneticButton';

export const Footer = () => {
  const { name, githubUrl, linkedinUrl } = portfolioData.personalInfo;

  const handleFooterLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 90;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: '#050508',
        padding: '6rem 0 3rem 0',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Background Ghost Text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(5rem, 16vw, 15rem)',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.015)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        YASWANTH
      </div>

      <div className="container footer-grid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left: Brand / Tagline */}
        <div className="footer-brand-col">
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#f0f0f5',
              marginBottom: '1rem',
            }}
          >
            Yaswanth Gokavarapu
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#7a7a8c', maxWidth: '280px', lineHeight: 1.6 }}>
            Designing immersive digital narratives by blending futuristic interfaces with robust software architecture.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="footer-links-col">
          <ul className="footer-links-row">
            <li>
              <a href="#hero" onClick={(e) => handleFooterLinkClick(e, '#hero')} className="footer-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleFooterLinkClick(e, '#about')} className="footer-link">
                About
              </a>
            </li>
            <li>
              <a href="#skills" onClick={(e) => handleFooterLinkClick(e, '#skills')} className="footer-link">
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" onClick={(e) => handleFooterLinkClick(e, '#projects')} className="footer-link">
                Projects
              </a>
            </li>
            <li>
              <a href="#experience" onClick={(e) => handleFooterLinkClick(e, '#experience')} className="footer-link">
                Experience
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Social & Navigation */}
        <div className="footer-actions-col">
          <div className="footer-social-row">
            <MagneticButton range={15}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </MagneticButton>
            
            <MagneticButton range={15}>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            </MagneticButton>
          </div>

          <MagneticButton range={20}>
            <button
              onClick={(e) => handleFooterLinkClick(e, '#hero')}
              className="back-to-top-btn"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.03)' }}>
        <p style={{ fontSize: '0.78rem', color: '#3a3a4a', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} {name}. All Rights Reserved. Crafted with passion.
        </p>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          text-align: center;
        }

        .footer-links-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          list-style: none;
        }

        .footer-link {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.3s ease;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .footer-link:hover {
          color: var(--lime);
        }

        .footer-actions-col {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
        }

        .footer-social-row {
          display: flex;
          gap: 0.8rem;
        }

        .footer-social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .footer-social-link:hover {
          color: var(--lime);
          border-color: rgba(232, 255, 107, 0.2);
          background: var(--lime-dim);
          box-shadow: var(--shadow-lime);
        }

        .back-to-top-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: none;
          transition: all 0.3s ease;
        }

        .back-to-top-btn:hover {
          background: var(--lime);
          border-color: transparent;
          color: var(--text-inverse);
          box-shadow: var(--shadow-lime);
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 3.5fr 5fr 3.5fr;
            text-align: left;
          }

          .footer-links-row {
            justify-content: center;
          }

          .footer-actions-col {
            justify-content: flex-end;
          }
        }
      `}</style>
    </footer>
  );
};
