import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from '../components/MagneticButton';

export const Projects = () => {
  const projects = portfolioData.projects;
  const carouselRef = useRef(null);
  const innerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [positionX, setPositionX] = useState(0);

  // Calculate carousel scroll width boundaries
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current && innerRef.current) {
        setWidth(innerRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [projects]);

  // Handle manual navigation arrows
  const slide = (direction) => {
    if (!carouselRef.current) return;
    const scrollStep = 320; // Size of single card slide
    let newX;
    
    if (direction === 'left') {
      newX = Math.min(positionX + scrollStep, 0);
    } else {
      newX = Math.max(positionX - scrollStep, -width);
    }
    
    setPositionX(newX);
  };

  return (
    <section id="projects" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative ambient neon background */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, rgba(0,0,0,0) 70%)',
          top: '20%',
          right: '-250px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <SectionHeader
            index="03"
            title="Featured Projects"
            subtitle="An interactive slider of engineered systems. Drag to explore details or view code repositories."
            align="left"
          />

          {/* Navigation Controls */}
          <div className="slider-controls" style={{ marginBottom: '4rem', display: 'flex', gap: '1rem' }}>
            <MagneticButton range={20}>
              <button 
                onClick={() => slide('left')}
                className="arrow-btn"
                aria-label="Slide Left"
                disabled={positionX === 0}
              >
                <ArrowLeft size={18} />
              </button>
            </MagneticButton>
            <MagneticButton range={20}>
              <button 
                onClick={() => slide('right')}
                className="arrow-btn"
                aria-label="Slide Right"
                disabled={positionX <= -width}
              >
                <ArrowRight size={18} />
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Drag Carousel Viewport */}
        <motion.div
          ref={carouselRef}
          className="carousel-viewport"
          data-cursor="drag"
          style={{ overflow: 'visible', cursor: 'grab' }}
        >
          <motion.div
            ref={innerRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            animate={{ x: positionX }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onDragStart={() => {
              // Custom Cursor handles drag state
            }}
            onDrag={(e, info) => {
              setPositionX(info.point.x - (carouselRef.current?.getBoundingClientRect().left || 0));
            }}
            className="carousel-inner"
          >
            {projects.map((proj) => {
              const hasImage = !!proj.image;
              
              return (
                <div key={proj.id} className="project-slide-card glass-card">
                  {/* Media Wrapper */}
                  <div className="project-image-box">
                    {hasImage ? (
                      <img
                        src={proj.image}
                        alt={`${proj.title} app UI`}
                        className="project-slide-img"
                        draggable="false"
                      />
                    ) : (
                      <div className="project-slide-fallback" />
                    )}
                    <div className="project-image-gradient" />
                  </div>

                  {/* Info Metadata */}
                  <div className="project-body-info">
                    <div className="project-tags-row">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="project-chip-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="project-slide-title">{proj.title}</h3>
                    <p className="project-slide-desc">{proj.desc}</p>

                    {/* Actions Link */}
                    <div className="project-slide-actions">
                      {proj.demoUrl && proj.demoUrl !== '#' && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-icon-link"
                          aria-label={`View live demo of ${proj.title}`}
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.githubUrl && proj.githubUrl !== '#' && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-icon-link"
                          aria-label={`View GitHub repository of ${proj.title}`}
                        >
                          <Github size={16} />
                          <span>Codebase</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .carousel-viewport {
          width: 100%;
          overflow: hidden;
          margin-top: 1rem;
        }

        .carousel-inner {
          display: flex;
          gap: 2rem;
          width: max-content;
          padding: 1rem 0;
        }

        .project-slide-card {
          width: 380px;
          height: 480px;
          display: flex;
          flex-direction: column;
          border-radius: var(--border-radius-lg);
          padding: 0 !important;
          overflow: hidden;
          background: rgba(12, 12, 20, 0.45);
          user-select: none;
        }

        .project-image-box {
          width: 100%;
          height: 200px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .project-slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .project-slide-fallback {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #10b98122 0%, #6366f122 100%);
        }

        .project-image-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(3, 3, 6, 0) 60%, rgba(3, 3, 6, 0.8) 100%);
        }

        .project-slide-card:hover .project-slide-img {
          transform: scale(1.08);
        }

        .project-body-info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }

        .project-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
        }

        .project-chip-tag {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          color: #06b6d4;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .project-slide-title {
          font-family: var(--font-title);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .project-slide-desc {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-slide-actions {
          display: flex;
          gap: 1.25rem;
          margin-top: auto;
        }

        .project-icon-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-title);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }

        .project-icon-link:hover {
          color: var(--accent-purple);
        }

        /* Slide Arrow styling */
        .arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .arrow-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-purple);
          color: var(--accent-purple);
        }

        .arrow-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 576px) {
          .project-slide-card {
            width: 290px;
            height: 450px;
          }
          .project-body-info {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};
