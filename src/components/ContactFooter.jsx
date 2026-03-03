import React from 'react';
import { Mail, MessageSquare, Phone, Facebook, Twitter, Linkedin, MapPin, User, ArrowRight } from 'lucide-react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  .cf-section {
    background: #1c2b1e;
    background-image:
      radial-gradient(ellipse at 20% 30%, rgba(74,124,89,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 70%, rgba(74,124,89,0.1) 0%, transparent 50%);
    padding: 100px 48px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .cf-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a7c59' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .cf-container {
    max-width: 860px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  .cf-header {
    text-align: center;
    margin-bottom: 64px;
  }

  .cf-eyebrow {
    display: block;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #7ab88f;
    margin-bottom: 16px;
  }

  .cf-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.6rem, 5vw, 4rem);
    font-weight: 600;
    color: #f5f0e8;
    line-height: 1.1;
    margin: 0 0 18px;
    letter-spacing: -0.02em;
  }

  .cf-title em {
    font-style: italic;
    color: #7ab88f;
  }

  .cf-tagline {
    font-size: 0.95rem;
    color: #7a8f7d;
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .cf-divider {
    width: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #4a7c59, transparent);
    margin: 22px auto 0;
  }

  /* ── Info row ── */
  .cf-info-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }

  .cf-info-card {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 20px 22px;
    background: rgba(245,240,232,0.04);
    border: 1px solid rgba(74,124,89,0.2);
    border-radius: 4px;
    transition: border-color 0.3s ease, background 0.3s ease;
  }

  .cf-info-card:hover {
    background: rgba(74,124,89,0.08);
    border-color: rgba(74,124,89,0.4);
  }

  .cf-info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(74,124,89,0.15);
    flex-shrink: 0;
  }

  .cf-info-label {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #7ab88f;
    margin-bottom: 5px;
  }

  .cf-info-text {
    font-size: 0.9rem;
    color: #c8d4c9;
    line-height: 1.55;
    margin: 0;
    font-weight: 300;
  }

  /* ── Call CTA ── */
  .cf-call {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 18px 32px;
    background: #4a7c59;
    color: #f5f0e8;
    text-decoration: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    margin-bottom: 16px;
    transition: background 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
    border: 1px solid rgba(122,184,143,0.3);
  }

  .cf-call:hover {
    background: #3d6b4a;
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.35);
  }

  .cf-call-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  /* ── Action row ── */
  .cf-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 48px;
  }

  .cf-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 14px 20px;
    background: transparent;
    border: 1px solid rgba(74,124,89,0.35);
    border-radius: 4px;
    color: #a8c4ab;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }

  .cf-action-btn:hover {
    background: rgba(74,124,89,0.15);
    border-color: rgba(74,124,89,0.6);
    color: #c8d4c9;
    transform: translateY(-2px);
  }

  /* ── Social / bottom bar ── */
  .cf-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 36px;
    border-top: 1px solid rgba(74,124,89,0.18);
    gap: 20px;
    flex-wrap: wrap;
  }

  .cf-social-label {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5a7a5d;
  }

  .cf-socials {
    display: flex;
    gap: 10px;
  }

  .cf-social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(74,124,89,0.25);
    color: #7a8f7d;
    text-decoration: none;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }

  .cf-social:hover {
    background: rgba(74,124,89,0.2);
    border-color: rgba(74,124,89,0.5);
    color: #c8d4c9;
    transform: translateY(-3px);
  }

  /* ── Footer bar ── */
  .cf-footer {
    background: #141f16;
    padding: 20px 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(74,124,89,0.12);
  }

  .cf-footer p {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 300;
    color: #4a6b4d;
    margin: 0;
    letter-spacing: 0.05em;
  }

  @media (max-width: 640px) {
    .cf-section { padding: 72px 24px; }
    .cf-info-row, .cf-actions { grid-template-columns: 1fr; }
    .cf-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
    .cf-footer { padding: 20px 24px; }
  }
`;

const ContactFooter = () => {
    return (
        <>
            <style>{CSS}</style>

            <section id="contact" className="cf-section">
                <div className="cf-container">

                    {/* Header */}
                    <div className="cf-header">
                        <span className="cf-eyebrow">Get in touch</span>
                        <h2 className="cf-title">
                            Namitha<br /><em>Forestry</em>
                        </h2>
                        <p className="cf-tagline">Growing Green, Growing Together</p>
                        <div className="cf-divider" />
                    </div>

                    {/* Info cards */}
                    <div className="cf-info-row">
                        <div className="cf-info-card">
                            <div className="cf-info-icon">
                                <User size={16} color="#7ab88f" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="cf-info-label">Managing Director</div>
                                <p className="cf-info-text">Umesh S N</p>
                            </div>
                        </div>
                        <div className="cf-info-card">
                            <div className="cf-info-icon">
                                <MapPin size={16} color="#7ab88f" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="cf-info-label">Location</div>
                                <p className="cf-info-text">Nandi (Post), Chikkaballapur<br />Karnataka – 562103, India</p>
                            </div>
                        </div>
                    </div>

                    {/* Call CTA */}
                    <a href="tel:9900897449" className="cf-call">
                        <Phone size={18} strokeWidth={1.5} />
                        <span className="cf-call-num">9900897449</span>
                        <ArrowRight size={16} strokeWidth={1.5} style={{ marginLeft: 4, opacity: 0.6 }} />
                    </a>

                    {/* Email / SMS */}
                    <div className="cf-actions">
                        <button
                            className="cf-action-btn"
                            onClick={() => window.location.href = 'mailto:danushumesh79@gmail.com'}
                        >
                            <Mail size={15} strokeWidth={1.5} />
                            Send Email
                        </button>
                        <button
                            className="cf-action-btn"
                            onClick={() => window.location.href = 'sms:9900897449?body=Hello%20Namitha%20Forestry'}
                        >
                            <MessageSquare size={15} strokeWidth={1.5} />
                            Send SMS
                        </button>
                    </div>

                    {/* Bottom bar */}
                    <div className="cf-bottom">
                        <span className="cf-social-label">Connect with us</span>
                        <div className="cf-socials">
                            <a href="#" className="cf-social" aria-label="Facebook"><Facebook size={16} strokeWidth={1.5} /></a>
                            <a href="#" className="cf-social" aria-label="Twitter"><Twitter size={16} strokeWidth={1.5} /></a>
                            <a href="#" className="cf-social" aria-label="LinkedIn"><Linkedin size={16} strokeWidth={1.5} /></a>
                        </div>
                    </div>

                </div>
            </section>

            <footer className="cf-footer">
                <p>&copy; 2025 Namitha Forestry. All rights reserved.</p>
            </footer>
        </>
    );
};

export default ContactFooter;