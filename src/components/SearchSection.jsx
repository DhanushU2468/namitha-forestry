import React, { useState, useRef, useEffect } from 'react';
import { plants } from '../data/plants';
import { Search, Phone, X, ArrowRight } from 'lucide-react';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const sectionRef = useRef(null);

  const filtered = searchTerm.trim()
    ? plants.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : [];

  const contactSeller = (plantName) => {
    const msg = 'Hello, I am interested in ' + plantName + '.';
    window.open('https://wa.me/9900897449?text=' + encodeURIComponent(msg), '_blank');
  };

  /* Fade-in on mount */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        .ss-section {
          background: #fff;
          border-top:    1px solid rgba(114,184,92,0.12);
          border-bottom: 1px solid rgba(114,184,92,0.12);
          padding: 100px 48px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .ss-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2372b85c' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* ── Header ── */
        .ss-header {
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1);
          position: relative;
          z-index: 1;
        }

        .ss-header.ss-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ss-eyebrow {
          display: block;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #72b85c;
          margin-bottom: 14px;
        }

        .ss-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 600;
          color: #2f5c29;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }

        .ss-title em {
          font-style: italic;
          color: #72b85c;
        }

        .ss-subtitle {
          font-size: 0.95rem;
          color: #7a9e7e;
          font-weight: 300;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.75;
        }

        .ss-divider {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #72b85c, transparent);
          margin: 20px auto 0;
        }

        /* ── Popular tags ── */
        .ss-tags {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .ss-tags-label {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a8c898;
          margin-right: 4px;
        }

        .ss-tag {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: #72b85c;
          background: rgba(114,184,92,0.07);
          border: 1px solid rgba(114,184,92,0.18);
          border-radius: 20px;
          padding: 5px 14px;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }

        .ss-tag:hover {
          background: rgba(114,184,92,0.14);
          border-color: rgba(114,184,92,0.35);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(114,184,92,0.1);
        }

        .ss-tag.ss-tag--active {
          background: #72b85c;
          color: #f5f0e8;
          border-color: #72b85c;
        }

        /* ── Result count ── */
        .ss-result-count {
          text-align: center;
          margin-bottom: 24px;
          font-size: 0.82rem;
          color: #7a9e7e;
          font-weight: 400;
          position: relative;
          z-index: 1;
        }

        .ss-result-count strong {
          color: #72b85c;
          font-weight: 600;
        }

        /* ── Search bar ── */
        .ss-search-wrap {
          position: relative;
          max-width: 580px;
          margin: 0 auto 56px;
          z-index: 1;
        }

        .ss-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #72b85c;
          pointer-events: none;
          transition: color 0.25s ease;
        }

        .ss-clear {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(114,184,92,0.1);
          border: none;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #72b85c;
          transition: background 0.2s ease;
          padding: 0;
        }

        .ss-clear:hover { background: rgba(114,184,92,0.2); }

        .ss-input {
          width: 100%;
          padding: 15px 48px 15px 50px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: #2f5c29;
          background: #faf8f4;
          border: 1px solid rgba(114,184,92,0.18);
          border-radius: 4px;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }

        .ss-input::placeholder { color: #a8c898; }

        .ss-input:focus {
          background: #fff;
          border-color: #72b85c;
          box-shadow: 0 0 0 3px rgba(114,184,92,0.1);
        }

        /* ── Results grid ── */
        .ss-results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 22px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: left;
        }

        /* ── Empty / hint states ── */
        .ss-state {
          grid-column: 1 / -1;
          padding: 48px 24px;
          text-align: center;
          color: #a8c898;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.8;
        }

        .ss-state-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(114,184,92,0.07);
          margin: 0 auto 16px;
          color: #72b85c;
        }

        .ss-state strong {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #2f5c29;
          margin-bottom: 6px;
        }

        /* ── Plant card ── */
        .ss-card {
          background: #fff;
          border: 1px solid rgba(114,184,92,0.15);
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          animation: ssCardIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }

        .ss-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(47,92,41,0.1), 0 4px 12px rgba(47,92,41,0.06);
          border-color: rgba(114,184,92,0.35);
        }

        .ss-card:hover .ss-card-img { transform: scale(1.05); }

        .ss-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #e8e3d8;
          flex-shrink: 0;
        }

        .ss-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }

        .ss-card-cat {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(245,240,232,0.92);
          color: #72b85c;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(6px);
        }

        .ss-card-body {
          padding: 20px 18px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .ss-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #2f5c29;
          margin: 0 0 4px;
          line-height: 1.2;
        }

        .ss-card-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #72b85c;
          margin: 0 0 10px;
        }

        .ss-card-info {
          font-size: 0.82rem;
          color: #7a9e7e;
          line-height: 1.65;
          font-weight: 300;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0 0 16px;
        }

        .ss-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(114,184,92,0.15);
          margin-top: auto;
        }

        .ss-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: 1px solid rgba(114,184,92,0.3);
          border-radius: 20px;
          padding: 7px 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #72b85c;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, gap 0.25s ease;
        }

        .ss-contact-btn:hover {
          background: #72b85c;
          border-color: #72b85c;
          color: #f5f0e8;
          gap: 10px;
        }

        @keyframes ssCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .ss-section { padding: 72px 20px; }
          .ss-results  { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        }

        @media (max-width: 480px) {
          .ss-results { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="search-section" className="ss-section" ref={sectionRef}>

        {/* Header */}
        <div className={'ss-header' + (visible ? ' ss-visible' : '')}>
          <span className="ss-eyebrow">Plant catalog</span>
          <h2 className="ss-title">
            Find your <em>perfect plant</em>
          </h2>
          <p className="ss-subtitle">
            Search our extensive catalog of premium forestry, flowering, and fruiting plants.
          </p>
          <div className="ss-divider" />
        </div>

        {/* Popular tags */}
        <div className="ss-tags">
          <span className="ss-tags-label">Popular:</span>
          {['Mahogany', 'Sandalwood', 'Teak', 'Rosewood', 'Neem', 'Mango'].map(tag => (
            <button
              key={tag}
              className={'ss-tag' + (searchTerm === tag ? ' ss-tag--active' : '')}
              onClick={() => {
                setSearchTerm(tag);
                inputRef.current?.focus();
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="ss-search-wrap">
          <Search size={18} className="ss-search-icon" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            className="ss-input"
            placeholder="Search by name or category…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Search plants"
          />
          {searchTerm && (
            <button
              className="ss-clear"
              onClick={() => { setSearchTerm(''); inputRef.current?.focus(); }}
              aria-label="Clear search"
            >
              <X size={13} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Results */}
        {searchTerm && filtered.length > 0 && (
          <div className="ss-result-count">
            <strong>{filtered.length}</strong> plant{filtered.length !== 1 ? 's' : ''} found
          </div>
        )}
        <div className="ss-results">
          {!searchTerm && (
            <div className="ss-state">
              <div className="ss-state-icon">
                <Search size={22} strokeWidth={1.5} />
              </div>
              <strong>Start typing to search</strong>
              Browse by plant name or category
            </div>
          )}

          {searchTerm && filtered.length === 0 && (
            <div className="ss-state">
              <div className="ss-state-icon">
                <X size={22} strokeWidth={1.5} />
              </div>
              <strong>No plants found for “{searchTerm}”</strong>
              Try a different name or browse our categories below
            </div>
          )}

          {filtered.map((plant, i) => (
            <article
              className="ss-card"
              key={plant.name + i}
              style={{ animationDelay: (i * 0.05) + 's' }}
            >
              <div className="ss-img-wrap">
                <img
                  className="ss-card-img"
                  src={plant.image}
                  alt={plant.name}
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200/e8e3d8/9aab9d?text=Plant'; }}
                />
                {plant.category && (
                  <span className="ss-card-cat">{plant.category}</span>
                )}
              </div>

              <div className="ss-card-body">
                <h3 className="ss-card-name">{plant.name}</h3>
                {plant.price && <p className="ss-card-price">{plant.price}</p>}
                {plant.info && <p className="ss-card-info">{plant.info}</p>}

                <div className="ss-card-footer">
                  <button
                    className="ss-contact-btn"
                    onClick={() => contactSeller(plant.name)}
                    aria-label={'Contact seller about ' + plant.name}
                  >
                    <Phone size={12} strokeWidth={1.5} />
                    Enquire
                    <ArrowRight size={12} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>
    </>
  );
};

export default SearchSection;