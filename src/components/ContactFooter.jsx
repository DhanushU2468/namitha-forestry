import React, { useRef, useEffect, useState } from 'react';
import { Mail, MessageSquare, Phone, Facebook, Twitter, Linkedin, MapPin, User, ArrowRight } from 'lucide-react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --parchment:   #F7F2E8;
    --cream:       #F5F0E6;
    --terra:       #1C3A18;
    --terra-deep:  #2F5C29;
    --terra-light: #72B85C;
    --earth:       #0D1A0C;
    --earth-mid:   #1A1710;
    --gold:        #C8842E;
    --gold-light:  #E0A84A;
    --sage:        #A8C898;
    --ink:         #1A1710;
  }

  .cf-wrap {
    font-family: 'Outfit', sans-serif;
    background: var(--parchment);
    position: relative;
    overflow: hidden;
  }

  /* ── Decorative top border ── */
  .cf-border-bar {
    height: 6px;
    background: repeating-linear-gradient(
      90deg,
      var(--terra) 0px,
      var(--terra) 40px,
      var(--gold) 40px,
      var(--gold) 60px,
      var(--terra-deep) 60px,
      var(--terra-deep) 80px,
      var(--gold-light) 80px,
      var(--gold-light) 100px
    );
  }

  /* ── Main section ── */
  .cf-section {
    padding: 80px 48px 60px;
    position: relative;
  }

  /* Large decorative background text */
  .cf-bg-text {
    position: absolute;
    top: 40px;
    right: -20px;
    font-family: 'Fraunces', serif;
    font-size: clamp(80px, 14vw, 160px);
    font-weight: 700;
    color: rgba(28,58,24,0.06);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.04em;
  }

  /* Decorative circle */
  .cf-deco-ring {
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    border: 40px solid rgba(200,132,46,0.07);
    pointer-events: none;
  }

  .cf-container {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── Layout: two-column ── */
  .cf-layout {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 64px;
    align-items: start;
  }

  /* ── Left column ── */
  .cf-left {}

  .cf-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--terra);
    margin-bottom: 20px;
  }

  .cf-eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 1.5px;
    background: var(--terra);
  }

  .cf-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(2.8rem, 5vw, 4.2rem);
    font-weight: 700;
    color: var(--earth);
    line-height: 1.05;
    margin: 0 0 6px;
    letter-spacing: -0.03em;
  }

  .cf-title-italic {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(2rem, 4vw, 3.2rem);
    color: var(--terra);
    display: block;
    margin-bottom: 22px;
  }

  .cf-tagline {
    font-size: 0.88rem;
    color: var(--earth-mid);
    font-weight: 300;
    letter-spacing: 0.04em;
    margin-bottom: 36px;
    line-height: 1.6;
  }

  /* Info stacked */
  .cf-info-stack {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1.5px solid var(--cream);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 36px;
  }

  .cf-info-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    background: var(--cream);
    transition: background 0.25s ease, padding-left 0.35s cubic-bezier(0.34,1.56,0.64,1), border-left 0.25s ease;
    border-left: 3px solid transparent;
  }

  .cf-info-item + .cf-info-item {
    border-top: 1.5px solid rgba(28,58,24,0.12);
  }

  .cf-info-item:hover {
    background: rgba(28,58,24,0.06);
    padding-left: 26px;
    border-left-color: var(--terra);
  }

  .cf-info-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--terra);
    flex-shrink: 0;
    animation: cfDotPulse 2.5s ease-in-out infinite;
  }

  @keyframes cfDotPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(28,58,24,0); }
    50%     { box-shadow: 0 0 8px 3px rgba(28,58,24,0.15); }
  }

  .cf-info-label {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--terra);
    margin-bottom: 2px;
  }

  .cf-info-value {
    font-size: 0.88rem;
    color: var(--earth);
    font-weight: 400;
    line-height: 1.4;
  }

  /* Social row */
  .cf-social-label {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--earth-mid);
    margin-bottom: 12px;
    opacity: 0.6;
  }

  .cf-socials {
    display: flex;
    gap: 8px;
  }

  .cf-social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 2px;
    border: 1.5px solid rgba(28,58,24,0.25);
    color: var(--terra);
    background: transparent;
    text-decoration: none;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }

  .cf-social:hover {
    background: var(--terra);
    border-color: var(--terra);
    color: #fff;
    transform: translateY(-3px) rotate(360deg);
  }

  .cf-social:active {
    transform: translateY(0) scale(0.9);
    transition-duration: 0.08s;
  }

  /* Social stagger animation */
  .cf-socials .cf-social:nth-child(1) { animation: cfSocialIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }
  .cf-socials .cf-social:nth-child(2) { animation: cfSocialIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.4s both; }
  .cf-socials .cf-social:nth-child(3) { animation: cfSocialIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.5s both; }

  @keyframes cfSocialIn {
    from { opacity: 0; transform: translateY(10px) scale(0.7); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Right column: action panel ── */
  .cf-right {
    background: var(--terra);
    border-radius: 3px;
    padding: 40px 36px;
    position: relative;
    overflow: hidden;
  }

  .cf-right::before {
    content: '';
    position: absolute;
    top: -30px;
    right: -30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,132,46,0.2) 0%, transparent 70%);
  }

  .cf-panel-eyebrow {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 10px;
  }

  .cf-panel-title {
    font-family: 'Fraunces', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--parchment);
    letter-spacing: -0.02em;
    margin-bottom: 30px;
    line-height: 1.2;
  }

  /* Call CTA */
  .cf-call {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 24px;
    background: var(--terra);
    color: #fff;
    text-decoration: none;
    border-radius: 2px;
    margin-bottom: 12px;
    transition: background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    border: none;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
  }

  .cf-call:hover {
    background: var(--terra-deep);
    transform: translateX(6px);
    box-shadow: 6px 6px 0px rgba(200,132,46,0.3);
  }

  .cf-call:active {
    transform: translateX(2px) scale(0.98);
    transition-duration: 0.08s;
  }

  /* Shake animation on call icon */
  .cf-call:hover .cf-call-icon {
    animation: cfPhoneShake 0.5s ease-in-out;
  }

  @keyframes cfPhoneShake {
    0%,100% { transform: rotate(0); }
    15%     { transform: rotate(12deg); }
    30%     { transform: rotate(-10deg); }
    45%     { transform: rotate(8deg); }
    60%     { transform: rotate(-6deg); }
    75%     { transform: rotate(3deg); }
  }

  .cf-call-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cf-call-label {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    margin-bottom: 2px;
  }

  .cf-call-num {
    font-family: 'Fraunces', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.04em;
  }

  .cf-call-arrow {
    margin-left: auto;
    opacity: 0.5;
  }

  /* WhatsApp */
  .cf-whatsapp {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background: #1A3C2A;
    color: #4DD882;
    text-decoration: none;
    border-radius: 2px;
    margin-bottom: 20px;
    font-size: 0.88rem;
    font-weight: 500;
    border: 1px solid rgba(77,216,130,0.2);
    transition: background 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  .cf-whatsapp:hover {
    background: #1F4A33;
    transform: translateX(6px);
    box-shadow: 6px 6px 0px rgba(77,216,130,0.15), 0 0 18px rgba(77,216,130,0.15);
    color: #6FE89A;
  }

  .cf-whatsapp:active {
    transform: translateX(2px) scale(0.98);
    transition-duration: 0.08s;
  }

  /* Divider */
  .cf-panel-divider {
    height: 1px;
    background: rgba(250,243,231,0.1);
    margin: 20px 0;
    position: relative;
  }

  .cf-panel-divider::after {
    content: 'or';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: var(--terra);
    padding: 0 12px;
    font-size: 0.7rem;
    color: rgba(250,243,231,0.3);
    letter-spacing: 0.1em;
  }

  /* Email / SMS */
  .cf-panel-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .cf-panel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 14px;
    background: transparent;
    border: 1px solid rgba(250,243,231,0.15);
    border-radius: 2px;
    color: rgba(250,243,231,0.55);
    font-family: 'Outfit', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
  }

  .cf-panel-btn:hover {
    background: rgba(201,150,58,0.12);
    border-color: rgba(201,150,58,0.4);
    color: var(--gold-light);
  }

  .cf-panel-btn:active {
    transform: scale(0.93);
    transition-duration: 0.08s;
  }

  /* ── Entrance animations ── */
  .cf-fade {
    opacity: 0;
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1);
  }

  /* Left column slides from left */
  .cf-left.cf-fade {
    transform: translateX(-30px);
  }

  /* Right column slides from right */
  .cf-right.cf-fade {
    transform: translateX(30px);
  }

  .cf-fade.is-visible {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }

  .cf-fade:nth-child(1) { transition-delay: 0s; }
  .cf-fade:nth-child(2) { transition-delay: 0.15s; }

  /* ── Footer bar ── */
  .cf-footer {
    background: var(--terra);
    padding: 18px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .cf-footer-logo {
    font-family: 'Fraunces', serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--parchment);
    letter-spacing: -0.01em;
  }

  .cf-footer-logo span {
    font-style: italic;
    font-weight: 400;
    color: var(--gold);
  }

  .cf-footer-copy {
    font-size: 0.74rem;
    font-weight: 300;
    color: rgba(250,243,231,0.35);
    letter-spacing: 0.04em;
  }

  .cf-footer-tag {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--terra-light);
    opacity: 0.7;
  }

  /* ── Responsive ── */
  @media (max-width: 680px) {
    .cf-section { padding: 64px 24px 56px; }
    .cf-layout { grid-template-columns: 1fr; gap: 40px; }
    .cf-footer { padding: 16px 24px; flex-direction: column; align-items: flex-start; gap: 8px; }
    .cf-bg-text { right: -40px; font-size: 20vw; }
  }
`;

const ContactFooter = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const v = visible ? ' is-visible' : '';

  return (
    <>
      <style>{CSS}</style>

      <div className="cf-wrap" ref={sectionRef}>
        {/* Top decorative stripe */}
        {/* <div className="cf-border-bar" /> */}

        <section id="contact" className="cf-section">
          {/* Background decorative text */}
          <div className="cf-bg-text" aria-hidden="true">FOREST</div>
          {/* Decorative ring */}
          <div className="cf-deco-ring" aria-hidden="true" />

          <div className="cf-container">
            <div className="cf-layout">

              {/* ── Left column ── */}
              <div className={`cf-left cf-fade${v}`}>
                <div className="cf-eyebrow">Get in touch</div>
                <h2 className="cf-title">
                  Namitha
                  <span className="cf-title-italic">Forestry</span>
                </h2>
                <p className="cf-tagline">
                  Growing Green, Growing Together —<br />
                  rooted in Karnataka's land.
                </p>

                <div className="cf-info-stack">
                  <div className="cf-info-item">
                    <div className="cf-info-dot" />
                    <div>
                      <div className="cf-info-label">Managing Director</div>
                      <div className="cf-info-value">Umesh S N</div>
                    </div>
                  </div>
                  <div className="cf-info-item">
                    <div className="cf-info-dot" />
                    <div>
                      <div className="cf-info-label">Location</div>
                      <div className="cf-info-value">Nandi (Post), Chikkaballapur<br />Karnataka – 562103, India</div>
                    </div>
                  </div>
                </div>

                <div className="cf-social-label">Follow us</div>
                <div className="cf-socials">
                  <a href="#" className="cf-social" aria-label="Facebook"><Facebook size={15} strokeWidth={1.5} /></a>
                  <a href="#" className="cf-social" aria-label="Twitter"><Twitter size={15} strokeWidth={1.5} /></a>
                  <a href="#" className="cf-social" aria-label="LinkedIn"><Linkedin size={15} strokeWidth={1.5} /></a>
                </div>
              </div>

              {/* ── Right action panel ── */}
              <div className={`cf-right cf-fade${v}`} style={{ transitionDelay: '0.15s' }}>
                <div className="cf-panel-eyebrow">Reach out directly</div>
                <div className="cf-panel-title">Let's start a conversation</div>

                {/* Phone */}
                <a href="tel:9900897449" className="cf-call">
                  <div className="cf-call-icon">
                    <Phone size={16} strokeWidth={1.5} color="#fff" />
                  </div>
                  <div>
                    <div className="cf-call-label">Call us now</div>
                    <div className="cf-call-num">9900897449</div>
                  </div>
                  <ArrowRight size={16} strokeWidth={2} className="cf-call-arrow" color="#fff" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/9900897449?text=Hello%20Namitha%20Forestry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cf-whatsapp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                <div className="cf-panel-divider" />

                <div className="cf-panel-actions">
                  <button
                    className="cf-panel-btn"
                    onClick={() => window.location.href = 'mailto:danushumesh79@gmail.com'}
                  >
                    <Mail size={14} strokeWidth={1.5} />
                    Email
                  </button>
                  <button
                    className="cf-panel-btn"
                    onClick={() => window.location.href = 'sms:9900897449?body=Hello%20Namitha%20Forestry'}
                  >
                    <MessageSquare size={14} strokeWidth={1.5} />
                    SMS
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer bar */}
        <footer className="cf-footer">
          <div className="cf-footer-logo">Namitha <span>Forestry</span></div>
          <div className="cf-footer-copy">
            &copy; {new Date().getFullYear()} Namitha Forestry. All rights reserved.
          </div>
          <div className="cf-footer-tag">Karnataka, India</div>
        </footer>
      </div>
    </>
  );
};

export default ContactFooter;