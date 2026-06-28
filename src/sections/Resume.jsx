import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, GraduationCap, Download, Eye, X, BookOpen } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from '../components/MagneticButton';

export const Resume = () => {
  const education = portfolioData.education;
  const [modalOpen, setModalOpen] = useState(false);
  const cardsRef = useRef([]);

  // Spotlight mouse track
  useEffect(() => {
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <section id="resume" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="07"
          title="Curriculum Vitae"
          subtitle="Explore academic achievements, technical proficiencies, and request official documents."
        />

        <div className="resume-grid">
          {/* Left Column: Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8 }}
            className="resume-column"
          >
            <div className="resume-section-title-row">
              <GraduationCap size={22} color="#7c6af7" />
              <h3 className="resume-column-title">Academic Pathway</h3>
            </div>

            <div className="resume-list">
              {education.map((edu, index) => (
                <div
                  key={edu.degree}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="resume-item surface-spotlight"
                  style={{
                    background: 'rgba(11, 12, 18, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(400px circle at var(--x, -999px) var(--y, -999px), rgba(124, 106, 247, 0.04), transparent 50%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <div className="resume-item-header">
                    <h4 className="resume-item-degree">{edu.degree}</h4>
                    <span className="resume-item-duration">{edu.duration}</span>
                  </div>
                  <span className="resume-item-institution">{edu.institution}</span>
                  <div className="resume-item-grade-row">
                    <span className="resume-item-grade-label">Result:</span>
                    <span className="resume-item-grade-val">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: CV Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="resume-column resume-download-col"
          >
            <div
              ref={(el) => (cardsRef.current[education.length] = el)}
              className="download-card surface-spotlight"
              style={{
                background: 'rgba(11, 12, 18, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem 2.5rem',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.5rem',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(500px circle at var(--x, -999px) var(--y, -999px), rgba(232, 255, 107, 0.04), transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
              <div className="download-icon-wrapper">
                <FileText size={38} color="#e8ff6b" />
              </div>
              <h3 className="download-card-title">Curriculum Vitae</h3>
              <p className="download-card-desc">
                Review technical milestones, full stack configurations, and structural engineering histories.
              </p>

              {/* Animated Document Preview (CSS Layout representation) */}
              <div className="cv-preview-lines" aria-hidden="true">
                <div className="cv-line-h" style={{ width: '40%', background: 'var(--lime)' }} />
                <div className="cv-line-h" style={{ width: '80%' }} />
                <div className="cv-line-h" style={{ width: '90%' }} />
                <div className="cv-line-h" style={{ width: '60%' }} />
                <div className="cv-line-h" style={{ width: '70%', background: 'var(--violet)' }} />
                <div className="cv-line-h" style={{ width: '50%' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
                <MagneticButton range={25}>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn btn-lime download-btn"
                    style={{ width: '220px' }}
                  >
                    <Eye size={16} style={{ marginRight: '0.6rem' }} />
                    Preview Resume
                  </button>
                </MagneticButton>

                <MagneticButton range={25}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("CV asset generation complete. Ready to link real PDF document.");
                    }}
                    className="btn btn-outline"
                    style={{ width: '220px' }}
                  >
                    <Download size={16} style={{ marginRight: '0.6rem' }} />
                    Download CV
                  </a>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive CV Viewer Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cv-modal-overlay"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="cv-modal-container"
              style={{
                background: '#0b0c12',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-lg)',
                padding: '0',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)',
                width: '100%',
                maxWidth: '680px',
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="cv-modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <BookOpen size={20} color="#7c6af7" />
                  <h3 className="cv-modal-title">Yaswanth Gokavarapu CV</h3>
                </div>
                <button className="cv-modal-close" onClick={() => setModalOpen(false)} aria-label="Close CV preview">
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable CV Document */}
              <div className="cv-modal-body">
                <div className="cv-doc-header">
                  <h2>Yaswanth Gokavarapu</h2>
                  <p>Creative Technologist | Hyderabad, India | yaswanthgokavarapu97@gmail.com</p>
                </div>

                <div className="cv-doc-section">
                  <h4 className="cv-sec-title">Core Statement</h4>
                  <p>
                    Software engineer sitting at the intersection of aesthetic design and logical systems. Specialize in architecting high-fidelity interactive canvas layers (Three.js/GLSL) backed by robust servers and clean RESTful infrastructures.
                  </p>
                </div>

                <div className="cv-doc-section">
                  <h4 className="cv-sec-title">Core Proficiencies</h4>
                  <p>
                    <strong>Frontend:</strong> React, Next.js, ES6+, Three.js, WebGL, GSAP, TailwindCSS, CSS Grid/Flexbox<br />
                    <strong>Backend & API:</strong> Node.js, Express, MongoDB, FastAPI, Firebase Hosting, Stripe Payment SDKs<br />
                    <strong>DevOps & Tools:</strong> Docker, Git, WebSockets, TypeScript, Vercel
                  </p>
                </div>

                <div className="cv-doc-section">
                  <h4 className="cv-sec-title">Professional Milestones</h4>
                  <div className="cv-milestone">
                    <div className="cv-mile-header">
                      <strong>Lead Software Engineer</strong>
                      <span>2024 — Present</span>
                    </div>
                    <em>Fictional Tech Labs</em>
                    <p>Spearheaded Next.js frontend deployments. Lowered background canvas GPU overhead by 25% using custom WebGL logic. Standardized complete accessibility models.</p>
                  </div>
                  <div className="cv-milestone">
                    <div className="cv-mile-header">
                      <strong>Full Stack Developer</strong>
                      <span>2022 — 2024</span>
                    </div>
                    <em>Global Digital Agency</em>
                    <p>Structured high-volume server integration pipelines handling 10k daily entries. Optimized loading metrics using headless APIs and serverless workflows.</p>
                  </div>
                </div>

                <div className="cv-doc-section" style={{ borderBottom: 'none' }}>
                  <h4 className="cv-sec-title">Education</h4>
                  <div className="cv-milestone">
                    <div className="cv-mile-header">
                      <strong>B.Tech in Computer Science</strong>
                      <span>2016 — 2020</span>
                    </div>
                    <em>National Institute of Technology</em>
                    <p>Graduated with a GPA of 9.2/10.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .resume-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }

        .resume-section-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .resume-column-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .resume-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .resume-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .resume-item-degree {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .resume-item-duration {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--lime);
          padding: 0.25rem 0.65rem;
          background: var(--lime-dim);
          border: 1px solid rgba(232, 255, 107, 0.2);
          border-radius: var(--radius-sm);
          flex-shrink: 0;
        }

        .resume-item-institution {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--violet);
          font-weight: 500;
          margin-bottom: 1.25rem;
          display: block;
          position: relative;
          z-index: 1;
        }

        .resume-item-grade-row {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          display: flex;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }

        .resume-item-grade-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .resume-item-grade-val {
          color: var(--text-primary);
          font-weight: 600;
        }

        .resume-download-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .download-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--lime-dim);
          border: 1px solid rgba(232, 255, 107, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(232, 255, 107, 0.08);
          z-index: 1;
        }

        .download-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-primary);
          z-index: 1;
        }

        .download-card-desc {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 400;
          z-index: 1;
        }

        .cv-preview-lines {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          width: 100%;
          max-width: 240px;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: var(--radius-md);
          z-index: 1;
        }

        .cv-line-h {
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
        }

        /* Modal styling */
        .cv-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(5, 5, 8, 0.8);
          backdrop-filter: blur(12px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .cv-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .cv-modal-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .cv-modal-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 4px;
        }

        .cv-modal-close:hover {
          color: var(--ember);
        }

        .cv-modal-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 2.5rem;
          text-align: left;
          font-family: var(--font-body);
        }

        .cv-doc-header {
          text-align: center;
          margin-bottom: 2rem;
          border-bottom: 2px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 1.5rem;
        }

        .cv-doc-header h2 {
          font-family: var(--font-display);
          font-size: 1.8rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .cv-doc-header p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .cv-doc-section {
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 1.5rem;
        }

        .cv-sec-title {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--violet);
          margin-bottom: 0.8rem;
        }

        .cv-doc-section p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .cv-milestone {
          margin-bottom: 1.25rem;
        }

        .cv-mile-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .cv-milestone em {
          font-size: 0.85rem;
          color: var(--lime);
          display: block;
          margin-bottom: 0.4rem;
        }

        @media (min-width: 992px) {
          .resume-grid {
            grid-template-columns: 5.5fr 4.5fr;
            gap: 5rem;
          }
        }
      `}</style>
    </section>
  );
};
