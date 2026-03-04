import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';

const Roadside = () => {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
    if (res.ok) setSubmitted(true);
  };

  const ACCENT = '#8a7d55';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        .rd-wrapper {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh; background: #f5f0e8;
          background-image:
            radial-gradient(ellipse at 15% 20%, rgba(138,125,85,0.09) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 80%, rgba(107,143,78,0.06) 0%, transparent 50%);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 60px 24px; position: relative; overflow: hidden;
        }
        .rd-wrapper::before {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238a7d55' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .rd-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: #9aab9d; text-decoration: none;
          margin-bottom: 28px; align-self: flex-start;
          max-width: 480px; width: 100%; position: relative; z-index: 1;
          transition: color 0.25s ease, gap 0.25s ease;
        }
        .rd-back:hover { color: ${ACCENT}; gap: 11px; }
        .rd-card {
          background: #ffffff; width: 100%; max-width: 480px;
          border-radius: 4px; border: 1px solid rgba(138,125,85,0.12);
          box-shadow: 0 24px 56px rgba(28,43,30,0.08), 0 4px 14px rgba(28,43,30,0.05);
          position: relative; z-index: 1; overflow: hidden;
          animation: rdCardEnter 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        @keyframes rdCardEnter {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .rd-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, ${ACCENT}, transparent);
        }
        .rd-header { padding: 44px 44px 0; text-align: center; margin-bottom: 36px; }
        .rd-eyebrow {
          display: block; font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: ${ACCENT}; margin-bottom: 14px;
        }
        .rd-title {
          font-family: 'Cormorant Garamond', serif; font-size: 2.6rem;
          font-weight: 600; color: #1c2b1e; letter-spacing: -0.02em;
          line-height: 1.1; margin: 0 0 12px;
        }
        .rd-title em { font-style: italic; color: ${ACCENT}; }
        .rd-subtitle { font-size: 0.88rem; color: #6b7c6e; font-weight: 300; line-height: 1.7; margin: 0; }
        .rd-divider {
          width: 40px; height: 1px; margin: 18px auto 0;
          background: linear-gradient(90deg, transparent, ${ACCENT}, transparent);
        }
        .rd-form { padding: 0 44px 44px; }
        .rd-field { position: relative; margin-bottom: 14px; }
        .rd-field-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #9aab9d; pointer-events: none; transition: color 0.25s ease;
        }
        .rd-field.rd-focused .rd-field-icon { color: ${ACCENT}; }
        .rd-field-icon--textarea { top: 16px; transform: none; }
        .rd-input {
          width: 100%; padding: 13px 16px 13px 42px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; font-weight: 300; color: #1c2b1e;
          background: #faf8f4; border: 1px solid rgba(138,125,85,0.18);
          border-radius: 4px; box-sizing: border-box; outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .rd-input::placeholder { color: #9aab9d; font-weight: 300; }
        .rd-input:focus { background: #fff; border-color: ${ACCENT}; box-shadow: 0 0 0 3px rgba(138,125,85,0.1), 0 2px 8px rgba(138,125,85,0.08); }
        textarea.rd-input { padding-top: 14px; resize: vertical; min-height: 120px; line-height: 1.65; }
        .rd-submit {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px;
          background: #1c2b1e; border: none; border-radius: 4px; color: #f5f0e8;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 24px; cursor: pointer; margin-top: 8px;
          transition: background 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }
        .rd-submit:hover { background: ${ACCENT}; transform: translateY(-3px); box-shadow: 0 14px 32px rgba(28,43,30,0.2); }
        .rd-submit:active { transform: translateY(0); box-shadow: none; }
        .rd-success {
          padding: 52px 44px; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .rd-success-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(138,125,85,0.1); display: flex; align-items: center;
          justify-content: center; color: ${ACCENT}; margin-bottom: 6px;
          animation: rdCheckPop 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }
        @keyframes rdCheckPop {
          from { transform: scale(0.5); opacity: 0; }
          50%  { transform: scale(1.15); }
          to   { transform: scale(1); opacity: 1; }
        }
        .rd-success-title {
          font-family: 'Cormorant Garamond', serif; font-size: 2rem;
          font-weight: 600; color: #1c2b1e; letter-spacing: -0.02em; margin: 0;
        }
        .rd-success-text {
          font-size: 0.9rem; color: #6b7c6e; font-weight: 300;
          line-height: 1.75; max-width: 300px; margin: 0;
        }
        .rd-success-back {
          display: inline-flex; align-items: center; gap: 7px; margin-top: 12px;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: ${ACCENT}; text-decoration: none;
          transition: gap 0.25s ease;
        }
        .rd-success-back:hover { gap: 11px; }
        @media (max-width: 540px) {
          .rd-wrapper { padding: 40px 16px; }
          .rd-header { padding: 36px 28px 0; }
          .rd-form { padding: 0 28px 36px; }
          .rd-title { font-size: 2rem; }
          .rd-success { padding: 44px 28px; }
        }
      `}</style>

      <div className="rd-wrapper">
        {!submitted && (
          <Link to="/" className="rd-back">
            <ArrowLeft size={13} strokeWidth={2} />
            Back to home
          </Link>
        )}
        <div className="rd-card">
          {submitted ? (
            <div className="rd-success">
              <div className="rd-success-icon"><CheckCircle size={28} strokeWidth={1.5} /></div>
              <h2 className="rd-success-title">We'll be in touch</h2>
              <p className="rd-success-text">
                Thank you for reaching out. Our roadside greening team will get back to you with a tailored plan shortly.
              </p>
              <Link to="/" className="rd-success-back">
                <ArrowLeft size={13} strokeWidth={2} /> Return home
              </Link>
            </div>
          ) : (
            <>
              <div className="rd-header">
                <span className="rd-eyebrow">Roadside greening</span>
                <h2 className="rd-title">Beautify every<br /><em>corridor</em></h2>
                <p className="rd-subtitle">
                  Eco-friendly greenery solutions for highways, streets, and public corridors.
                </p>
                <div className="rd-divider" />
              </div>
              <form className="rd-form" onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="4193fb93-a6ed-4fbc-81b2-24bc1ddc3765" />
                <input type="hidden" name="subject" value="Roadside Greening Enquiry" />
                <div className={'rd-field' + (focused === 'name' ? ' rd-focused' : '')}>
                  <User size={15} className="rd-field-icon" strokeWidth={1.5} />
                  <input type="text" name="name" placeholder="Your name" className="rd-input" required
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                </div>
                <div className={'rd-field' + (focused === 'contact' ? ' rd-focused' : '')}>
                  <Mail size={15} className="rd-field-icon" strokeWidth={1.5} />
                  <input type="text" name="contact" placeholder="Email or phone" className="rd-input" required
                    onFocus={() => setFocused('contact')} onBlur={() => setFocused(null)} />
                </div>
                <div className={'rd-field' + (focused === 'message' ? ' rd-focused' : '')}>
                  <MessageSquare size={15} className="rd-field-icon rd-field-icon--textarea" strokeWidth={1.5} />
                  <textarea name="message" placeholder="Describe the road stretch, length, and your greening requirements…"
                    className="rd-input" required
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                </div>
                <button type="submit" className="rd-submit">
                  <Send size={13} strokeWidth={2} /> Get your custom quote
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Roadside;
