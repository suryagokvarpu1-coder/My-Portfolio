import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
  'linear-gradient(135deg, rgba(232, 255, 107, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)',
  'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(232, 255, 107, 0.1) 100%)',
  'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(232, 255, 107, 0.1) 100%)',
  'linear-gradient(135deg, rgba(232, 255, 107, 0.1) 0%, rgba(6, 182, 212, 0.15) 100%)',
];

export const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          title="Featured Projects"
          subtitle="A selection of AI-driven applications and full-stack websites I have built."
        />

        <div className="projects-grid">
          {projects.map((proj, idx) => {
            const gradient = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="project-card"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
              >
                {/* Visual Header / Mockup representation */}
                <div
                  style={{
                    height: '150px',
                    background: gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid var(--border)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(10, 11, 16, 0.85)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '0.75rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Sparkles size={14} color="var(--accent-lime)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {proj.id.toUpperCase()} MOCKUP
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  {/* Tech stack list */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                      flexGrow: 1,
                    }}
                  >
                    {proj.desc}
                  </p>

                  {/* Action links */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: 'var(--accent-lime)',
                        }}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .project-card:hover {
          border-color: var(--border-hover) !important;
          transform: translateY(-2px);
        }

        .proj-link {
          transition: opacity 0.2s ease;
        }

        .proj-link:hover {
          opacity: 0.8;
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
      `}</style>
    </section>
  );
};
