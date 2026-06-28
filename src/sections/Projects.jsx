import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from '../components/MagneticButton';

const PROJECT_GRADIENTS = [
  'linear-gradient(135deg, #7c6af720 0%, #4cc9f020 100%)',
  'linear-gradient(135deg, #e8ff6b18 0%, #7c6af720 100%)',
  'linear-gradient(135deg, #ff5e6218 0%, #7c6af720 100%)',
  'linear-gradient(135deg, #4cc9f020 0%, #e8ff6b18 100%)',
  'linear-gradient(135deg, #7c6af720 0%, #e8ff6b18 100%)',
  'linear-gradient(135deg, #ff5e6218 0%, #4cc9f020 100%)',
];

const TAG_COLORS = ['#e8ff6b', '#7c6af7', '#4cc9f0', '#ff5e62'];

export const Projects = () => {
  const projects = portfolioData.projects;
  const [activeProject, setActiveProject] = useState(null);
  const cardsRef = useRef([]);
  const featuredProject = projects[0];
  const gridProjects = projects.slice(1);

  useEffect(() => {
    const move = (e) => {
      cardsRef.current.forEach(card => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - r.left}px`);
        card.style.setProperty('--y', `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Close on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActiveProject(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  const tagColor = (i) => TAG_COLORS[i % TAG_COLORS.length];

  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          index="03"
          title="Featured Projects"
          subtitle="Engineered systems built for performance, aesthetics, and real-world impact."
          align="left"
        />

        {/* ── Featured Project ── */}
        <motion.div
          className="featured-project"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            background: 'rgba(11,12,18,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '4rem',
            backdropFilter: 'blur(12px)',
            display: 'grid',
            gridTemplateColumns: '1fr',
          }}
        >
          {/* Image / Gradient preview */}
          <div
            className="featured-img-side"
            style={{
              background: featuredProject.image
                ? `url(${featuredProject.image}) center/cover`
                : PROJECT_GRADIENTS[0],
              minHeight: '280px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          />

          {/* Info side */}
          <div style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#e8ff6b',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Featured
              </span>
              <span style={{ width: '24px', height: '1px', background: '#e8ff6b', opacity: 0.4 }} />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#3a3a4a',
                  letterSpacing: '0.1em',
                }}
              >
                01
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#f0f0f5',
                marginBottom: '0.75rem',
              }}
            >
              {featuredProject.title}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.95rem',
                color: '#7a7a8c',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {featuredProject.desc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {featuredProject.tags.map((tag, i) => (
                <span key={tag} className="tag" style={{ borderColor: `${tagColor(i)}30`, color: tagColor(i), background: `${tagColor(i)}08` }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <MagneticButton>
                <button
                  onClick={() => setActiveProject(featuredProject)}
                  className="btn btn-lime"
                  style={{ fontSize: '0.85rem', padding: '0.7rem 1.5rem' }}
                >
                  <ArrowUpRight size={15} />
                  Case Study
                </button>
              </MagneticButton>

              {featuredProject.githubUrl && featuredProject.githubUrl !== '#' && (
                <MagneticButton>
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.85rem', padding: '0.7rem 1.25rem' }}
                  >
                    <Github size={15} />
                    Source
                  </a>
                </MagneticButton>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Grid Projects ── */}
        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {gridProjects.map((proj, index) => (
            <motion.div
              key={proj.id}
              ref={el => (cardsRef.current[index + 1] = el)}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="project-card"
              onClick={() => setActiveProject(proj)}
              style={{
                background: 'rgba(11,12,18,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'none',
                position: 'relative',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.3s ease',
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              data-cursor="hover"
            >
              {/* Spotlight */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(400px circle at var(--x, -999px) var(--y, -999px), rgba(232,255,107,0.04), transparent 50%)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Image or gradient */}
              <div
                style={{
                  height: '180px',
                  background: proj.image
                    ? `url(${proj.image}) center/cover`
                    : PROJECT_GRADIENTS[index + 1],
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Hover overlay */}
                <div
                  className="proj-hover-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(5,5,8,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#e8ff6b',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    VIEW CASE STUDY <ArrowUpRight size={14} />
                  </span>
                </div>

                {/* Project number */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {String(index + 2).padStart(2, '0')}
                </span>
              </div>

              {/* Info */}
              <div style={{ padding: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  {proj.tags.map((tag, i) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.62rem',
                        color: tagColor(i),
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tag}{i < proj.tags.length - 1 && <span style={{ color: '#3a3a4a', margin: '0 0.3rem' }}>·</span>}
                    </span>
                  ))}
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: '#f0f0f5',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {proj.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    color: '#7a7a8c',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {proj.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Full-screen overlay ── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="project-overlay-bg"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '700px',
                background: '#0b0c12',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem 2rem',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem',
                    color: '#e8ff6b',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  Case Study
                </span>
                <button
                  onClick={() => setActiveProject(null)}
                  aria-label="Close"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#7a7a8c',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Preview image */}
              <div
                style={{
                  height: '240px',
                  background: activeProject.image
                    ? `url(${activeProject.image}) center/cover`
                    : PROJECT_GRADIENTS[projects.findIndex(p => p.id === activeProject.id)],
                }}
              />

              {/* Body */}
              <div style={{ padding: '2rem' }}>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#f0f0f5',
                    marginBottom: '0.75rem',
                  }}
                >
                  {activeProject.title}
                </h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {activeProject.tags.map((tag, i) => (
                    <span key={tag} className="tag" style={{ borderColor: `${tagColor(i)}30`, color: tagColor(i), background: `${tagColor(i)}08` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1rem',
                    color: '#7a7a8c',
                    lineHeight: 1.75,
                    marginBottom: '2rem',
                  }}
                >
                  {activeProject.desc}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {activeProject.demoUrl && activeProject.demoUrl !== '#' && (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-lime"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                  {activeProject.githubUrl && activeProject.githubUrl !== '#' && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <Github size={15} /> Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .featured-project {
          grid-template-columns: 1fr !important;
        }

        @media (min-width: 860px) {
          .featured-project {
            grid-template-columns: 1fr 1fr !important;
          }

          .featured-img-side {
            border-bottom: none !important;
            border-right: 1px solid rgba(255,255,255,0.06) !important;
          }
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .project-card:hover {
          border-color: rgba(255,255,255,0.12) !important;
        }

        .project-card:hover .proj-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};
