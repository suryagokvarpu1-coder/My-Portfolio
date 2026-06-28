import React from 'react';
import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const { name, githubUrl, linkedinUrl, instagramUrl, tagline } = portfolioData.personalInfo;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        padding: '4rem 0 3rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        
        {/* Motto / Tagline */}
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.5,
              marginBottom: '0.5rem',
            }}
          >
            "{tagline}"
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Transforming ideas into digital applications.
          </p>
        </div>

        {/* Social Icons & Back to top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="footer-social-ico" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="footer-social-ico" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-social-ico" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-top-btn"
            aria-label="Back to Top"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Copyright Line */}
        <div style={{ borderTop: '1px solid var(--border)', width: '100%', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            &copy; {new Date().getFullYear()} {name}. Built from scratch with React & Framer Motion.
          </p>
        </div>
      </div>

      <style>{`
        .footer-social-ico {
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .footer-social-ico:hover {
          color: var(--accent);
        }

        .footer-top-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-light);
        }
      `}</style>
    </footer>
  );
};
