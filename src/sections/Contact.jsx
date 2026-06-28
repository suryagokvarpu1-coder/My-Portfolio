import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from '../components/MagneticButton';

export const Contact = () => {
  const { email, location } = portfolioData.personalInfo;
  const formCardRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject_meta: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation
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

  // Submit Handler
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

  // Spotlight mouse track
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = formCardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <div className="contact-layout">
          
          {/* Left Column: Context Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="contact-info-col"
          >
            <h2 className="contact-title-glow">Let's craft digital solutions</h2>
            <p className="contact-subtitle-para">
              Discussing WebGL interaction mechanics, serverless pipelines, cloud infrastructure design, or portfolio opportunities.
            </p>

            <div className="contact-channels-group">
              {/* Email channel */}
              <div className="contact-channel-block">
                <div className="contact-icon-wrapper">
                  <Mail size={18} color="#6366f1" />
                </div>
                <div className="contact-channel-details">
                  <span className="contact-details-label">Direct Inbox</span>
                  <a href={`mailto:${email}`} className="contact-details-value link-highlight">
                    {email}
                  </a>
                </div>
              </div>

              {/* Location channel */}
              <div className="contact-channel-block">
                <div className="contact-icon-wrapper">
                  <MapPin size={18} color="#10b981" />
                </div>
                <div className="contact-channel-details">
                  <span className="contact-details-label">Operational Hub</span>
                  <span className="contact-details-value">{location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Spotlight Glass Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="contact-form-col"
          >
            <div ref={formCardRef} className="glass-card contact-form-card">
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className={`form-group ${formData.name ? 'has-value' : ''} ${errors.name ? 'has-error' : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  <label htmlFor="name" className="form-label">Name / Company</label>
                  {errors.name && <span className="form-error-msg">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className={`form-group ${formData.email ? 'has-value' : ''} ${errors.email ? 'has-error' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  <label htmlFor="email" className="form-label">Email Address</label>
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                {/* Subject */}
                <div className={`form-group ${formData.subject_meta ? 'has-value' : ''} ${errors.subject_meta ? 'has-error' : ''}`}>
                  <input
                    type="text"
                    id="subject_meta"
                    name="subject_meta"
                    value={formData.subject_meta}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  <label htmlFor="subject_meta" className="form-label">Subject / Topic</label>
                  {errors.subject_meta && <span className="form-error-msg">{errors.subject_meta}</span>}
                </div>

                {/* Message */}
                <div className={`form-group ${formData.message ? 'has-value' : ''} ${errors.message ? 'has-error' : ''}`}>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    required
                  />
                  <label htmlFor="message" className="form-label">Your Message...</label>
                  {errors.message && <span className="form-error-msg">{errors.message}</span>}
                </div>

                {/* Action button */}
                <div style={{ marginTop: '2.5rem' }}>
                  <MagneticButton range={20}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      <Send size={16} style={{ marginRight: '0.6rem' }} />
                      {status === 'sending' ? 'Transmitting...' : 'Transmit Message'}
                    </button>
                  </MagneticButton>
                </div>

                {/* Alerts */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="alert-box alert-success"
                    >
                      <CheckCircle2 size={16} />
                      <span>Message successfully delivered to Yaswanth's inbox!</span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="alert-box alert-error"
                    >
                      <AlertTriangle size={16} />
                      <span>Failed to submit. Please verify details and try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        .contact-title-glow {
          font-family: var(--font-title);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.5rem;
        }

        .contact-subtitle-para {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 3.5rem;
          font-weight: 300;
          max-width: 540px;
        }

        .contact-channels-group {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-channel-block {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .contact-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--border-radius-sm);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-channel-details {
          display: flex;
          flex-direction: column;
        }

        .contact-details-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .contact-details-value {
          font-family: var(--font-title);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }

        .link-highlight:hover {
          color: var(--accent-purple);
        }

        .contact-form-card {
          padding: 3rem 2.5rem !important;
          border-radius: var(--border-radius-lg);
          background: rgba(10, 10, 16, 0.35);
        }

        /* Interactive line fields */
        .form-group {
          position: relative;
          margin-bottom: 2.2rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.6rem 0;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-primary);
          transition: all 0.3s ease;
          outline: none;
        }

        .form-textarea {
          height: 100px;
          resize: none;
        }

        .form-label {
          position: absolute;
          left: 0;
          top: 0.6rem;
          color: var(--text-muted);
          font-size: 0.95rem;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        /* Floating transformations */
        .form-input:focus ~ .form-label,
        .form-group.has-value .form-label {
          top: -1.25rem;
          font-size: 0.75rem;
          color: var(--accent-purple);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--accent-purple);
        }

        .form-group.has-error .form-input,
        .form-group.has-error .form-textarea {
          border-color: #ef4444;
        }

        .form-group.has-error .form-label {
          color: #ef4444 !important;
        }

        .form-error-msg {
          font-size: 0.72rem;
          color: #ef4444;
          display: block;
          margin-top: 0.35rem;
        }

        /* Alert notifications */
        .alert-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1rem;
          border-radius: var(--border-radius-sm);
          font-size: 0.85rem;
          margin-top: 1.5rem;
          font-weight: 500;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        @media (min-width: 992px) {
          .contact-layout {
            grid-template-columns: 5fr 5fr;
            gap: 5rem;
          }
        }
      `}</style>
    </section>
  );
};
