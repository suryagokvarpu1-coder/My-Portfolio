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
    
    const offset = 100;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        backgroundColor: '#010103',
        padding: '5rem 0 4rem 0',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container footer-grid">
        {/* Left: Copyright */}
        <div className="footer-copyright-col">
          <p style={{ fontSize: '0.88rem', color: '#64748b', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
            &copy; {new Date().getFullYear()} {name}. Built from scratch.
          </p>
        </div>

        {/* Center: Quick Links Capsule */}
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
          font-family: var(--font-title);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.3s ease;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .footer-link:hover {
          color: var(--accent-purple);
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
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
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
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-to-top-btn:hover {
          background: var(--gradient-purple);
          border-color: transparent;
          color: white;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
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
