import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitPullRequest, Code2, Users, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';
import profileImg from '../assets/images/profile.png';


export const GitHubSection = () => {
  const { githubUrl } = portfolioData.personalInfo;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract username from githubUrl
    const username = githubUrl.split('/').pop();
    if (!username) return;

    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => {
        setProfileData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching github stats:", err);
        setLoading(false);
      });
  }, [githubUrl]);

  return (
    <section id="github" className="section">
      <div className="container">
        <SectionHeader
          index="05"
          title="GitHub Analytics"
          subtitle="Real-time repository counts, contribution activity, and top technologies."
        />

        <div className="github-layout">
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              Loading Github Analytics...
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="github-profile-card"
            >
              {/* Profile header */}
              <div className="profile-header">
                <img
                  src={profileData?.avatar_url || profileImg}
                  alt={profileData?.name || 'Gokavarapu Yaswanth'}
                  className="profile-avatar"
                />
                <div>
                  <h3 className="profile-name">{profileData?.name || 'Gokavarapu Yaswanth'}</h3>
                  <span className="profile-username">@{profileData?.login || 'suryagokvarpu1-coder'}</span>
                  <p className="profile-bio">{profileData?.bio || 'Computer Science Engineering Student & Full Stack Developer.'}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="github-stats-grid">
                <div className="github-stat-item">
                  <GitBranch size={20} color="var(--accent)" />
                  <div>
                    <span className="stat-num">{profileData?.public_repos || 25}</span>
                    <span className="stat-lbl">Public Repositories</span>
                  </div>
                </div>

                <div className="github-stat-item">
                  <Code2 size={20} color="var(--accent-sec)" />
                  <div>
                    <span className="stat-num">React & JS</span>
                    <span className="stat-lbl">Top Languages</span>
                  </div>
                </div>

                <div className="github-stat-item">
                  <GitPullRequest size={20} color="var(--accent)" />
                  <div>
                    <span className="stat-num">Active</span>
                    <span className="stat-lbl">Contribution Status</span>
                  </div>
                </div>

                <div className="github-stat-item">
                  <Users size={20} color="var(--text-primary)" />
                  <div>
                    <span className="stat-num">{profileData?.followers || 0}</span>
                    <span className="stat-lbl">Followers</span>
                  </div>
                </div>
              </div>

              {/* Link CTA */}
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <ExternalLink size={15} /> Visit GitHub Profile
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .github-layout {
          max-width: 800px;
          margin: 0 auto;
        }

        .github-profile-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          backdrop-filter: var(--glass-blur);
        }

        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .profile-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 2px solid var(--border);
          object-fit: cover;
        }

        .profile-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .profile-username {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent);
          display: block;
          margin-bottom: 1rem;
        }

        .profile-bio {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 500px;
          line-height: 1.6;
        }

        .github-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        .github-stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }

        .stat-num {
          display: block;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }

        .stat-lbl {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (min-width: 560px) {
          .github-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .profile-header {
            flex-direction: row;
            text-align: left;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
