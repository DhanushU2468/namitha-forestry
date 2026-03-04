import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TreePine, LandPlot, Route, Spade } from 'lucide-react';


const services = [
  { icon: TreePine, title: 'Plantation', description: 'Professional plantation services crafted for your land and climate.', to: '/plantation', accent: '#4a7c59', label: '01', isRoute: true },
  { icon: LandPlot, title: 'Real Estate', description: 'Enhance property value with curated botanical landscaping.', to: '/real-estate', accent: '#6b8f4e', label: '02', isRoute: true },
  { icon: Route, title: 'Roadside', description: 'Eco-friendly greenery that beautifies every corridor.', to: '/roadside', accent: '#8a7d55', label: '03', isRoute: true },
  { icon: Spade, title: 'Landscaping', description: 'Transform any space into a living, breathing masterpiece.', to: '/landscaping', accent: '#5c7a6b', label: '04', isRoute: true },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.srv-card');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('srv-card--visible')),
      { threshold: 0.15 }
    );
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        .srv-section {
          background: #f5f0e8;
          background-image:
            radial-gradient(ellipse at 10% 20%, rgba(74,124,89,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 90% 80%, rgba(107,143,78,0.06) 0%, transparent 55%);
          padding: 100px 48px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .srv-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a7c59' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .srv-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .srv-eyebrow {
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #4a7c59;
          margin-bottom: 16px;
          display: block;
        }

        .srv-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 600;
          color: #1c2b1e;
          line-height: 1.1;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }

        .srv-title em {
          font-style: italic;
          color: #4a7c59;
        }

        .srv-subtitle {
          font-size: 1rem;
          color: #6b7c6e;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 300;
        }

        .srv-divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4a7c59, transparent);
          margin: 24px auto 0;
        }

        .srv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .srv-card {
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.34,1.56,0.64,1);
        }

        .srv-card:nth-child(1) { transition-delay: 0.0s; }
        .srv-card:nth-child(2) { transition-delay: 0.12s; }
        .srv-card:nth-child(3) { transition-delay: 0.24s; }
        .srv-card:nth-child(4) { transition-delay: 0.36s; }

        .srv-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .srv-card a {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid rgba(74,124,89,0.12);
          border-radius: 4px;
          padding: 40px 32px 36px;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.35s ease;
          height: 100%;
          box-sizing: border-box;
        }

        .srv-card a::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: var(--card-accent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
        }

        .srv-card a:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(28,43,30,0.1), 0 4px 12px rgba(28,43,30,0.06), 0 0 0 1px var(--card-accent), 0 8px 24px color-mix(in srgb, var(--card-accent) 15%, transparent);
          border-color: rgba(74,124,89,0.25);
        }

        .srv-card a:hover::before { transform: scaleX(1); }

        .srv-card a:active {
          transform: translateY(-2px) scale(0.98);
          transition-duration: 0.1s;
        }

        .srv-card a:focus-within {
          border-color: rgba(74,124,89,0.3);
          box-shadow: 0 0 0 3px rgba(74,124,89,0.15);
        }

        .srv-card a:hover .srv-icon-wrap {
          transform: scale(1.12) translateY(-3px) rotate(5deg);
          box-shadow: 0 6px 16px color-mix(in srgb, var(--card-accent) 20%, transparent);
        }

        /* Icon bounce-in when card becomes visible */
        .srv-card--visible .srv-icon-wrap {
          animation: srvIconBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .srv-card--visible:nth-child(1) .srv-icon-wrap { animation-delay: 0.15s; }
        .srv-card--visible:nth-child(2) .srv-icon-wrap { animation-delay: 0.27s; }
        .srv-card--visible:nth-child(3) .srv-icon-wrap { animation-delay: 0.39s; }
        .srv-card--visible:nth-child(4) .srv-icon-wrap { animation-delay: 0.51s; }

        @keyframes srvIconBounce {
          0%   { transform: scale(0); }
          65%  { transform: scale(1.18); }
          100% { transform: scale(1); }
        }

        .srv-card-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          color: rgba(74,124,89,0.35);
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          display: block;
        }

        .srv-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin-bottom: 24px;
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
          position: relative;
          z-index: 1;
        }

        .srv-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.65rem;
          font-weight: 600;
          color: #1c2b1e;
          margin: 0 0 12px;
          letter-spacing: -0.01em;
          line-height: 1.2;
          position: relative;
          z-index: 1;
        }

        .srv-card-desc {
          font-size: 0.88rem;
          color: #6b7c6e;
          line-height: 1.75;
          margin: 0 0 28px;
          font-weight: 300;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .srv-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--card-accent);
          position: relative;
          z-index: 1;
          transition: gap 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }

        .srv-card a:hover .srv-card-cta { gap: 14px; }

        .srv-card-cta-arrow {
          width: 14px;
          height: 14px;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }

        .srv-card a:hover .srv-card-cta-arrow {
          transform: translateX(5px);
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .srv-section {
            padding: 64px 16px 56px;
          }

          .srv-header {
            margin-bottom: 40px;
          }

          .srv-title {
            font-size: 2.2rem;
          }

          .srv-subtitle {
            font-size: 0.88rem;
          }

          /* 2-column compact grid */
          .srv-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          /* Compact card internals */
          .srv-card a {
            padding: 20px 16px 18px;
            border-radius: 6px;
          }

          .srv-card-num {
            font-size: 0.72rem;
            margin-bottom: 12px;
          }

          .srv-icon-wrap {
            width: 40px;
            height: 40px;
            margin-bottom: 14px;
          }

          .srv-card-title {
            font-size: 1.2rem;
            margin-bottom: 8px;
          }

          .srv-card-desc {
            font-size: 0.78rem;
            line-height: 1.55;
            margin-bottom: 16px;
            /* clamp desc to 3 lines to keep cards tight */
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .srv-card-cta {
            font-size: 0.68rem;
            letter-spacing: 0.06em;
          }

          .srv-card-cta-arrow {
            width: 11px;
            height: 11px;
          }
        }
      `}</style>

      <section id="services" className="srv-section" ref={sectionRef}>
        <div className="srv-header">
          <span className="srv-eyebrow">What we offer</span>
          <h2 className="srv-title">
            Services built on<br /><em>deep-rooted expertise</em>
          </h2>
          <p className="srv-subtitle">
            Expert plantation and landscaping solutions to transform your spaces — from soil to skyline.
          </p>
          <div className="srv-divider" />
        </div>

        <div className="srv-grid">
          {services.map(({ icon: Icon, title, description, to, accent, label, isRoute, enquiry }) => (
            <div className="srv-card" key={title}>
              {isRoute ? (
                <Link to={to} style={{ '--card-accent': accent }}>
                  <span className="srv-card-num">{label}</span>
                  <div className="srv-icon-wrap" style={{ background: `${accent}18` }}>
                    <Icon size={24} color={accent} strokeWidth={1.5} />
                  </div>
                  <h3 className="srv-card-title">{title}</h3>
                  <p className="srv-card-desc">{description}</p>
                  <span className="srv-card-cta">
                    Explore
                    <svg className="srv-card-cta-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ) : (
                <a
                  href={WHATSAPP + encodeURIComponent(enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--card-accent': accent }}
                >
                  <span className="srv-card-num">{label}</span>
                  <div className="srv-icon-wrap" style={{ background: `${accent}18` }}>
                    <Icon size={24} color={accent} strokeWidth={1.5} />
                  </div>
                  <h3 className="srv-card-title">{title}</h3>
                  <p className="srv-card-desc">{description}</p>
                  <span className="srv-card-cta">
                    Enquire
                    <svg className="srv-card-cta-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;