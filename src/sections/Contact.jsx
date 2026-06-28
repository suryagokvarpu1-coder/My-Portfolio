import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, AlertTriangle, CheckCircle2, Github, Linkedin, Instagram } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';

export const Contact = () => {
  const { email, location, githubUrl, linkedinUrl, instagramUrl } = portfolioData.personalInfo;

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject_meta: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name / Company is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please input a valid email.";
    }
    if (!formData.subject_meta.trim()) tempErrors.subject_meta = "Subject is required.";
    if (!formData.message.trim()) tempErrors.message = "Message content is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    const payload = {
      access_key: "YOUR_ACCESS_KEY_HERE",
      from_name: "Portfolio Contact System",
      subject: "New Contact Form Submission",
      ...formData
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject_meta: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader
          index="07"
          title="Get In Touch"
          subtitle="Feel free to reach out to discuss internship opportunities, project collaborations, or tech inquiries."
        />

        <div className="contact-layout">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-info"
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}
            >
              Contact Details
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              I am always open to discussing new ideas, AI workflow designs, full-stack applications, or internship positions.
            </p>

            <div className="contact-details-list">
              <div className="contact-item">
                <Mail size={18} color="var(--accent)" />
                <div>
                  <span className="contact-lbl">Email</span>
                  <a href={`mailto:${email}`} className="contact-val">{email}</a>
                </div>
              </div>

              <div className="contact-item">
                <MapPin size={18} color="var(--accent)" />
                <div>
                  <span className="contact-lbl">Location</span>
                  <span className="contact-val">{location}</span>
                </div>
              </div>
            </div>

            {/* Social Connect Icons */}
            <div className="contact-social-row" style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="contact-form-wrap"
          >
            <form onSubmit={handleSubmit} noValidate>
              <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name" className="form-label-float">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input-base"
                  placeholder="Enter your name"
                  required
                />
                {errors.name && <span className="form-error-text">{errors.name}</span>}
              </div>

              <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email" className="form-label-float">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input-base"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <span className="form-error-text">{errors.email}</span>}
              </div>

              <div className={`form-field ${errors.subject_meta ? 'has-error' : ''}`}>
                <label htmlFor="subject_meta" className="form-label-float">Subject</label>
                <input
                  type="text"
                  id="subject_meta"
                  name="subject_meta"
                  value={formData.subject_meta}
                  onChange={handleChange}
                  className="form-input-base"
                  placeholder="Topic of discussion"
                  required
                />
                {errors.subject_meta && <span className="form-error-text">{errors.subject_meta}</span>}
              </div>

              <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message" className="form-label-float">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea-base"
                  placeholder="Write your message details..."
                  required
                />
                {errors.message && <span className="form-error-text">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-lime"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <Send size={15} /> {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="alert alert-success"
                  >
                    <CheckCircle2 size={16} />
                    <span>Your message has been sent successfully!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="alert alert-error"
                  >
                    <AlertTriangle size={16} />
                    <span>Failed to send. Please check your network and try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-lbl {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }

        .contact-val {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .contact-val:hover {
          color: var(--accent);
        }

        .contact-social-link {
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .contact-social-link:hover {
          color: var(--accent);
        }

        @media (min-width: 860px) {
          .contact-layout {
            grid-template-columns: 4.5fr 5.5fr;
            gap: 5rem;
          }
        }
      `}</style>
    </section>
  );
};
