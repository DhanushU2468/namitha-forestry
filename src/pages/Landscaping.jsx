import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';

const Landscaping = () => {
    const [submitted, setSubmitted] = useState(false);
    const [focused, setFocused] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
        if (res.ok) setSubmitted(true);
    };

    const ACCENT = '#5c7a6b';

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        .ls-wrapper {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh; background: #f5f0e8;
          background-image:
            radial-gradient(ellipse at 15% 20%, rgba(92,122,107,0.09) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 80%, rgba(74,124,89,0.06) 0%, transparent 50%);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 60px 24px; position: relative; overflow: hidden;
        }
        .ls-wrapper::before {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c7a6b' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .ls-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: #9aab9d; text-decoration: none;
          margin-bottom: 28px; align-self: flex-start;
          max-width: 480px; width: 100%; position: relative; z-index: 1;
          transition: color 0.25s ease, gap 0.25s ease;
        }
        .ls-back:hover { color: ${ACCENT}; gap: 11px; }
        .ls-card {
          background: #ffffff; width: 100%; max-width: 480px;
          border-radius: 4px; border: 1px solid rgba(92,122,107,0.12);
          box-shadow: 0 24px 56px rgba(28,43,30,0.08), 0 4px 14px rgba(28,43,30,0.05);
          position: relative; z-index: 1; overflow: hidden;
        }
        .ls-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, ${ACCENT}, transparent);
        }
        .ls-header { padding: 44px 44px 0; text-align: center; margin-bottom: 36px; }
        .ls-eyebrow {
          display: block; font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: ${ACCENT}; margin-bottom: 14px;
        }
        .ls-title {
          font-family: 'Cormorant Garamond', serif; font-size: 2.6rem;
          font-weight: 600; color: #1c2b1e; letter-spacing: -0.02em;
          line-height: 1.1; margin: 0 0 12px;
        }
        .ls-title em { font-style: italic; color: ${ACCENT}; }
        .ls-subtitle { font-size: 0.88rem; color: #6b7c6e; font-weight: 300; line-height: 1.7; margin: 0; }
        .ls-divider {
          width: 40px; height: 1px; margin: 18px auto 0;
          background: linear-gradient(90deg, transparent, ${ACCENT}, transparent);
        }
        .ls-form { padding: 0 44px 44px; }
        .ls-field { position: relative; margin-bottom: 14px; }
        .ls-field-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: #9aab9d; pointer-events: none; transition: color 0.25s ease;
        }
        .ls-field.ls-focused .ls-field-icon { color: ${ACCENT}; }
        .ls-field-icon--textarea { top: 16px; transform: none; }
        .ls-input {
          width: 100%; padding: 13px 16px 13px 42px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; font-weight: 300; color: #1c2b1e;
          background: #faf8f4; border: 1px solid rgba(92,122,107,0.18);
          border-radius: 4px; box-sizing: border-box; outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .ls-input::placeholder { color: #9aab9d; font-weight: 300; }
        .ls-input:focus { background: #fff; border-color: ${ACCENT}; box-shadow: 0 0 0 3px rgba(92,122,107,0.1); }
        textarea.ls-input { padding-top: 14px; resize: vertical; min-height: 120px; line-height: 1.65; }
        .ls-submit {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px;
          background: #1c2b1e; border: none; border-radius: 4px; color: #f5f0e8;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; padding: 15px 24px; cursor: pointer; margin-top: 8px;
          transition: background 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }
        .ls-submit:hover { background: ${ACCENT}; transform: translateY(-3px); box-shadow: 0 14px 32px rgba(28,43,30,0.2); }
        .ls-submit:active { transform: translateY(0); box-shadow: none; }
        .ls-success {
          padding: 52px 44px; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .ls-success-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(92,122,107,0.1); display: flex; align-items: center;
          justify-content: center; color: ${ACCENT}; margin-bottom: 6px;
        }
        .ls-success-title {
          font-family: 'Cormorant Garamond', serif; font-size: 2rem;
          font-weight: 600; color: #1c2b1e; letter-spacing: -0.02em; margin: 0;
        }
        .ls-success-text {
          font-size: 0.9rem; color: #6b7c6e; font-weight: 300;
          line-height: 1.75; max-width: 300px; margin: 0;
        }
        .ls-success-back {
          display: inline-flex; align-items: center; gap: 7px; margin-top: 12px;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase; color: ${ACCENT}; text-decoration: none;
          transition: gap 0.25s ease;
        }
        .ls-success-back:hover { gap: 11px; }
        @media (max-width: 540px) {
          .ls-wrapper { padding: 40px 16px; }
          .ls-header { padding: 36px 28px 0; }
          .ls-form { padding: 0 28px 36px; }
          .ls-title { font-size: 2rem; }
          .ls-success { padding: 44px 28px; }
        }
      `}</style>

            <div className="ls-wrapper">
                {!submitted && (
                    <Link to="/" className="ls-back">
                        <ArrowLeft size={13} strokeWidth={2} />
                        Back to home
                    </Link>
                )}
                <div className="ls-card">
                    {submitted ? (
                        <div className="ls-success">
                            <div className="ls-success-icon"><CheckCircle size={28} strokeWidth={1.5} /></div>
                            <h2 className="ls-success-title">We'll be in touch</h2>
                            <p className="ls-success-text">
                                Thank you for reaching out. Our landscaping team will craft a customised design plan for your space shortly.
                            </p>
                            <Link to="/" className="ls-success-back">
                                <ArrowLeft size={13} strokeWidth={2} /> Return home
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="ls-header">
                                <span className="ls-eyebrow">Landscaping services</span>
                                <h2 className="ls-title">Transform your<br /><em>space</em></h2>
                                <p className="ls-subtitle">
                                    Living, breathing masterpieces — from residential gardens to commercial landscapes.
                                </p>
                                <div className="ls-divider" />
                            </div>
                            <form className="ls-form" onSubmit={handleSubmit}>
                                <input type="hidden" name="access_key" value="4193fb93-a6ed-4fbc-81b2-24bc1ddc3765" />
                                <input type="hidden" name="subject" value="Landscaping Enquiry" />
                                <div className={'ls-field' + (focused === 'name' ? ' ls-focused' : '')}>
                                    <User size={15} className="ls-field-icon" strokeWidth={1.5} />
                                    <input type="text" name="name" placeholder="Your name" className="ls-input" required
                                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                                </div>
                                <div className={'ls-field' + (focused === 'contact' ? ' ls-focused' : '')}>
                                    <Mail size={15} className="ls-field-icon" strokeWidth={1.5} />
                                    <input type="text" name="contact" placeholder="Email or phone" className="ls-input" required
                                        onFocus={() => setFocused('contact')} onBlur={() => setFocused(null)} />
                                </div>
                                <div className={'ls-field' + (focused === 'message' ? ' ls-focused' : '')}>
                                    <MessageSquare size={15} className="ls-field-icon ls-field-icon--textarea" strokeWidth={1.5} />
                                    <textarea name="message" placeholder="Describe your space, area size, and landscaping vision…"
                                        className="ls-input" required
                                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                                </div>
                                <button type="submit" className="ls-submit">
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

export default Landscaping;
