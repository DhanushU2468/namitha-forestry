import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Categories', href: '#categories' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');

    /* Shrink nav on scroll */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Close menu on resize to desktop */
    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 768) setIsOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleScroll = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        setActiveLink(href);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <style>{`
        .nb-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          background: rgba(245,240,232,0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(74,124,89,0.1);
        }

        .nb-nav.nb-scrolled {
          background: rgba(245,240,232,0.95);
          box-shadow: 0 4px 24px rgba(28,43,30,0.07);
          border-bottom-color: rgba(74,124,89,0.16);
        }

        .nb-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          height: 68px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: height 0.35s ease;
        }

        .nb-nav.nb-scrolled .nb-inner { height: 60px; }

        /* ── Logo ── */
        .nb-logo a {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
        }

        .nb-logo-img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(74,124,89,0.25);
          transition: transform 0.35s ease, border-color 0.35s ease;
        }

        .nb-logo a:hover .nb-logo-img {
          transform: rotate(-6deg) scale(1.06);
          border-color: rgba(74,124,89,0.55);
        }

        .nb-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #1c2b1e;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .nb-logo-text em {
          font-style: italic;
          color: #4a7c59;
        }

        /* ── Desktop links ── */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nb-link {
          position: relative;
          font-size: 0.82rem;
          font-weight: 400;
          color: #3d6b4a;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 50px;
          letter-spacing: 0.02em;
          transition: color 0.25s ease, background 0.25s ease;
        }

        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #4a7c59;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .nb-link:hover,
        .nb-link.nb-active {
          color: #4a7c59;
          background: rgba(74,124,89,0.07);
        }

        .nb-link:hover::after,
        .nb-link.nb-active::after {
          width: 55%;
        }

        /* ── Mobile toggle ── */
        .nb-toggle {
          display: none;
          background: none;
          border: 1px solid rgba(74,124,89,0.2);
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          color: #1c2b1e;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nb-toggle:hover {
          background: rgba(74,124,89,0.08);
          border-color: rgba(74,124,89,0.4);
        }

        /* ── Mobile drawer ── */
        @media (max-width: 768px) {
          .nb-inner  { padding: 0 20px; }
          .nb-toggle { display: flex; align-items: center; justify-content: center; }

          .nb-links {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(245,240,232,0.98);
            backdrop-filter: blur(16px);
            padding: 16px 0 20px;
            border-bottom: 1px solid rgba(74,124,89,0.14);
            box-shadow: 0 12px 32px rgba(28,43,30,0.1);
            gap: 2px;
            /* hidden state */
            opacity: 0;
            transform: translateY(-8px);
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1);
          }

          .nb-links.nb-open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: all;
          }

          .nb-link {
            width: calc(100% - 32px);
            margin: 0 16px;
            text-align: center;
            padding: 12px 16px;
            font-size: 0.9rem;
            border-radius: 4px;
          }

          .nb-link::after { display: none; }
        }
      `}</style>

            <nav className={'nb-nav' + (scrolled ? ' nb-scrolled' : '')}>
                <div className="nb-inner">

                    <div className="nb-logo">
                        <a href="#home" onClick={(e) => handleScroll(e, '#home')}>
                            <img className="nb-logo-img" src="/Logo.png" alt="Namitha Forestry" />
                            <span className="nb-logo-text">
                                Namitha <em>Forestry</em>
                            </span>
                        </a>
                    </div>

                    <button
                        className="nb-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                    </button>

                    <div className={'nb-links' + (isOpen ? ' nb-open' : '')}>
                        {NAV_LINKS.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                className={'nb-link' + (activeLink === href ? ' nb-active' : '')}
                                onClick={(e) => handleScroll(e, href)}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                </div>
            </nav >
        </>
    );
};

export default Navbar;