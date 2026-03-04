import React, { useEffect, useState } from 'react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,200;1,9..144,400;1,9..144,700&family=Outfit:wght@300;400;500;600&display=swap');

  :root {
    --cream:  #F7F2E8;
    --dark:   #0D1A0C;
    --forest: #1C3A18;
    --grove:  #2F5C29;
    --leaf:   #72B85C;
    --sage:   #A8C898;
    --gold:   #C8842E;
    --gold-l: #E0A84A;
    --ink:    #1A1710;
  }

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  .h-root {
    font-family: 'Outfit', sans-serif;
    height: 100svh; min-height: 640px;
    background: var(--cream);
    display: flex; flex-direction: column;
    overflow: hidden;
  }

  /* ── Split body ── */
  .h-body { flex: 1; display: flex; min-height: 0; }

  /* ══════════════════════════════════════
     LEFT PANEL — fully filled, no dead air
  ══════════════════════════════════════ */
  .h-left {
    width: 38%; flex-shrink: 0;
    background: var(--forest);
    position: relative;
    display: flex; flex-direction: column;
    padding: 36px 40px 36px;
    overflow: hidden;
    gap: 0;
  }

  /* Dot-grid texture */
  .h-left-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(168,200,152,0.10) 1.2px, transparent 1.2px);
    background-size: 28px 28px;
  }

  /* Concentric arcs — bottom-right corner accent */
  .h-arc { position: absolute; border-radius: 50%; pointer-events: none; }
  .h-arc-1 { width: 420px; height: 420px; right: -160px; bottom: -160px; border: 1px solid rgba(255,255,255,0.05); }
  .h-arc-2 { width: 280px; height: 280px; right: -80px;  bottom: -80px;  border: 1px solid rgba(114,184,92,0.10); }
  .h-arc-3 { width: 150px; height: 150px; right: -20px;  bottom: -20px;  border: 1px solid rgba(114,184,92,0.18); }

  /* ── Location badge ── */
  .h-loc-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
    border-radius: 100px; padding: 6px 14px;
    width: fit-content; margin-bottom: 28px;
    opacity: 0; animation: fadeIn 0.6s ease 0.25s forwards;
  }
  .h-loc-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--leaf); box-shadow: 0 0 8px rgba(114,184,92,1);
    animation: locPulse 2.2s ease-in-out infinite;
  }
  @keyframes locPulse {
    0%,100% { box-shadow: 0 0 6px rgba(114,184,92,0.9); }
    50%      { box-shadow: 0 0 14px rgba(114,184,92,0.45), 0 0 28px rgba(114,184,92,0.15); }
  }
  .h-loc-text {
    font-size: 10.5px; font-weight: 600;
    letter-spacing: 0.17em; text-transform: uppercase;
    color: rgba(168,200,152,0.95);
  }

  /* ── Brand statement block ── */
  .h-left-intro {
    opacity: 0; animation: slideUp 0.6s ease 0.35s forwards;
    margin-bottom: 28px;
  }
  .h-left-intro-label {
    font-size: 9.5px; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(168,200,152,0.55); margin-bottom: 10px;
  }
  .h-left-intro-heading {
    font-family: 'Fraunces', serif;
    font-size: clamp(26px, 2.8vw, 38px);
    font-weight: 700; line-height: 1.12;
    color: rgba(245,240,230,0.97);
    letter-spacing: -0.02em; margin-bottom: 12px;
  }
  .h-left-intro-heading em {
    font-style: italic; font-weight: 300;
    color: var(--sage);
    display: block;
  }
  .h-left-intro-body {
    font-size: 13px; font-weight: 400; line-height: 1.75;
    color: rgba(200,215,190,0.82);
    letter-spacing: 0.01em;
  }

  /* ── Quick stats row ── */
  .h-left-stats {
    display: flex; gap: 0;
    padding: 18px 0;
    border-top: 1px solid rgba(255,255,255,0.08);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 28px;
    opacity: 0; animation: slideUp 0.6s ease 0.48s forwards;
  }
  .h-ls-stat { flex: 1; text-align: center; }
  .h-ls-stat + .h-ls-stat { border-left: 1px solid rgba(255,255,255,0.08); }
  .h-ls-n {
    font-family: 'Fraunces', serif;
    font-size: 26px; font-weight: 700;
    color: var(--gold-l); line-height: 1; margin-bottom: 4px;
    letter-spacing: -0.025em;
  }
  .h-ls-sup { font-size: 15px; font-weight: 300; color: rgba(224,168,74,0.75); }
  .h-ls-l {
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.17em; text-transform: uppercase;
    color: rgba(168,200,152,0.60);
  }

  /* ── Species list ── */
  .h-species {
    flex: 1; display: flex; flex-direction: column;
    opacity: 0; animation: slideUp 0.6s ease 0.60s forwards;
  }
  .h-species-hd {
    font-size: 9.5px; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(168,200,152,0.55); margin-bottom: 10px;
    display: flex; align-items: center; gap: 10px;
  }
  .h-species-hd::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.08); }

  .h-sp-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 0;
    border-top: 1px solid rgba(255,255,255,0.07);
    transition: background 0.2s;
  }
  .h-sp-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.07); }
  .h-sp-left { display: flex; align-items: center; gap: 10px; }
  .h-sp-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--leaf); opacity: 0.7; flex-shrink: 0; }
  .h-sp-name {
    font-family: 'Fraunces', serif;
    font-size: 14.5px; font-weight: 400; font-style: italic;
    color: rgba(245,240,230,0.90);
    letter-spacing: 0.01em;
  }
  .h-sp-tag {
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(168,200,152,0.80);
    background: rgba(114,184,92,0.12);
    border: 1px solid rgba(114,184,92,0.20);
    padding: 3px 10px; border-radius: 100px;
  }

  /* ── CTA inside left panel ── */
  .h-left-cta {
    margin-top: 24px;
    opacity: 0; animation: slideUp 0.6s ease 0.75s forwards;
  }
  .h-left-cta-btn {
    width: 100%;
    padding: 13px 0;
    background: rgba(114,184,92,0.12);
    border: 1.5px solid rgba(114,184,92,0.28);
    border-radius: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(168,200,152,0.95);
    cursor: pointer; transition: background 0.22s, border-color 0.22s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .h-left-cta-btn:hover {
    background: rgba(114,184,92,0.20);
    border-color: rgba(114,184,92,0.45);
  }
  .h-left-cta-arrow { font-size: 16px; line-height: 1; }

  /* ══════════════════════════════════════
     RIGHT PANEL — max readability
  ══════════════════════════════════════ */
  .h-right {
    flex: 1; position: relative;
    display: flex; flex-direction: column; justify-content: center;
    padding: 48px 60px; overflow: hidden;
  }
  .h-grid-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(26,23,16,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26,23,16,0.028) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  /* Watermark — very subtle so it never competes */
  .h-wm {
    position: absolute; right: -8px; bottom: 4px;
    font-family: 'Fraunces', serif;
    font-size: clamp(80px, 10vw, 136px);
    font-weight: 900; font-style: italic;
    color: rgba(26,23,16,0.030);
    line-height: 1; pointer-events: none; user-select: none;
    letter-spacing: -0.04em; white-space: nowrap;
  }
  .h-corner {
    position: absolute; top: 0; right: 0;
    width: 80px; height: 80px; pointer-events: none;
  }
  .h-corner::before, .h-corner::after {
    content: ''; position: absolute; background: var(--gold); opacity: 0.55;
  }
  .h-corner::before { top: 0; right: 36px; width: 1px; height: 42px; }
  .h-corner::after  { top: 36px; right: 0; width: 42px; height: 1px; }

  .h-rc { position: relative; z-index: 2; }

  /* Eyebrow */
  .h-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 20px;
    opacity: 0; animation: slideUp 0.5s ease 0.22s forwards;
  }
  .h-eyebrow-rule { width: 30px; height: 2.5px; background: var(--gold); border-radius: 2px; }
  .h-eyebrow-text {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold);
  }

  /* 3-weight headline — full black for maximum contrast */
  .h-headline {
    margin-bottom: 24px;
    opacity: 0; animation: slideUp 0.65s ease 0.35s forwards;
  }
  .h-hl-1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(52px, 6.5vw, 96px);
    font-weight: 900; letter-spacing: -0.04em;
    color: #1A1710;
    display: block; line-height: 0.9;
  }
  .h-hl-2 {
    font-family: 'Fraunces', serif;
    font-size: clamp(52px, 6.5vw, 96px);
    font-weight: 200; font-style: italic;
    letter-spacing: -0.03em;
    color: var(--grove);
    display: block; line-height: 0.94;
  }
  .h-hl-3 {
    font-family: 'Fraunces', serif;
    font-size: clamp(52px, 6.5vw, 96px);
    font-weight: 900; letter-spacing: -0.04em;
    color: transparent; -webkit-text-stroke: 2px #1A1710;
    display: block; line-height: 0.9;
  }

  /* Tagline — full readable contrast */
  .h-tagline {
    font-size: 15.5px; font-weight: 400; line-height: 1.85;
    color: rgba(26,23,16,0.72);
    max-width: 420px; letter-spacing: 0.005em;
    margin-bottom: 26px;
    opacity: 0; animation: slideUp 0.65s ease 0.48s forwards;
  }

  /* Typewriter */
  .h-tw {
    display: flex; align-items: flex-start;
    margin-bottom: 28px;
    opacity: 0; animation: slideUp 0.65s ease 0.58s forwards;
  }
  .h-tw-bar {
    width: 3.5px; flex-shrink: 0;
    background: var(--gold); border-radius: 2px;
    margin-right: 16px; align-self: stretch; min-height: 50px;
  }
  .h-tw-label {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(26,23,16,0.50); margin-bottom: 7px;
  }
  .h-tw-text {
    font-family: 'Fraunces', serif;
    font-size: clamp(17px, 1.85vw, 23px);
    font-weight: 400; font-style: italic;
    color: #1A1710;
    min-height: 1.4em; line-height: 1.4;
  }
  .h-cursor {
    display: inline-block; width: 2px; height: 0.9em;
    background: var(--gold); margin-left: 2px; vertical-align: middle;
    animation: blink 0.9s step-end infinite;
  }
  @keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:0; } }

  /* CTAs */
  .h-actions {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    margin-bottom: 36px;
    opacity: 0; animation: slideUp 0.65s ease 0.68s forwards;
  }
  .h-cta-p {
    display: inline-flex; align-items: center; gap: 14px;
    padding: 13px 30px;
    background: var(--forest); color: #F5F0E6;
    font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
    border: 1.5px solid var(--forest); border-radius: 7px;
    cursor: pointer; text-decoration: none;
    transition: background 0.22s, transform 0.18s;
  }
  .h-cta-p:hover { background: var(--grove); border-color: var(--grove); transform: translateY(-2px); }
  .h-cta-arrow { width: 18px; height: 1.5px; background: currentColor; border-radius: 1px; transition: width 0.22s; }
  .h-cta-p:hover .h-cta-arrow { width: 26px; }
  .h-cta-s {
    display: inline-flex; align-items: center;
    padding: 12px 26px;
    background: transparent; color: #1A1710;
    font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
    border: 1.5px solid rgba(26,23,16,0.22); border-radius: 7px;
    cursor: pointer; text-decoration: none;
    transition: border-color 0.22s, background 0.22s;
  }
  .h-cta-s:hover { border-color: rgba(26,23,16,0.5); background: rgba(26,23,16,0.04); }

  /* ── Marquee ── */
  .h-mq-wrap {
    background: var(--dark); padding: 13px 0; overflow: hidden;
    flex-shrink: 0;
    opacity: 0; animation: fadeIn 0.7s ease 1.0s forwards;
  }
  .h-mq-track {
    display: flex; width: max-content;
    animation: mqScroll 30s linear infinite;
  }
  .h-mq-track:hover { animation-play-state: paused; }
  @keyframes mqScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .h-mq-item { display:flex; align-items:center; padding: 0 30px; white-space: nowrap; }
  .h-mq-text {
    font-family: 'Fraunces', serif;
    font-size: 16px; font-weight: 300; font-style: italic;
    letter-spacing: 0.07em;
    color: #FFFFFF;
    transition: color 0.25s;
  }
  .h-mq-track:hover .h-mq-text { color: rgba(255, 255, 255, 1); }
  .h-mq-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--leaf); opacity: 0.50; margin-left: 30px; }

  /* ── Keyframes ── */
  @keyframes slideUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .h-left { width: 36%; padding: 30px 32px; }
    .h-right { padding: 40px 44px; }
  }
  @media (max-width: 860px) {
    .h-body { flex-direction: column; }
    .h-left { width: 100%; flex-direction: row; flex-wrap: wrap; padding: 18px 24px; gap: 0; }
    .h-left-intro,.h-species,.h-left-cta { display: none; }
    .h-left-stats { width: 100%; margin-bottom: 0; border-bottom: none; }
    .h-right { padding: 28px 24px; }
    .h-hl-1,.h-hl-2,.h-hl-3 { font-size: clamp(40px, 12vw, 64px); }
  }
  @media (max-width: 540px) {
    .h-right { padding: 22px 18px; }
    .h-cta-s { display: none; }
    .h-tagline { font-size: 14px; }
  }
`;

const PHRASES = [
  'Looking for premium forestry plants?',
  'Explore Mahogany & Sandalwood',
  'Your one-stop plantation solution',
  'Trusted by 500+ farms across Karnataka',
  'Invest in a greener tomorrow',
];

const MARQUEE = [
  'Mahogany', 'Sandalwood', 'Teak', 'Rosewood',
  'Silver Oak', 'Neem', 'Bamboo', 'Jackfruit',
  'Mango', 'Moringa', 'Eucalyptus', 'Casuarina',
];

const SPECIES = [
  { name: 'Mahogany', tag: 'Hardwood' },
  { name: 'Sandalwood', tag: 'Aromatic' },
  { name: 'Teak', tag: 'Premium' },
  { name: 'Rosewood', tag: 'Rare' },
  { name: 'Silver Oak', tag: 'Shade' },
  { name: 'Neem', tag: 'Medicinal' },
];

export default function Hero() {
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(100);
  const PAUSE = 2600;

  useEffect(() => {
    const tick = setInterval(() => {
      const full = PHRASES[loopNum % PHRASES.length];
      const next = deleting
        ? full.substring(0, text.length - 1)
        : full.substring(0, text.length + 1);
      setText(next);
      if (!deleting && next === full) { setDeleting(true); setDelta(PAUSE); }
      else if (deleting && next === '') { setDeleting(false); setLoopNum(n => n + 1); setDelta(100); }
      else setDelta(deleting ? 38 : 95 - Math.random() * 45);
    }, delta);
    return () => clearInterval(tick);
  }, [text, delta, deleting, loopNum]);

  const go = id => e => { e.preventDefault(); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const mq = [...MARQUEE, ...MARQUEE];

  return (
    <>
      <style>{STYLES}</style>
      <div className="h-root" id="home">

        {/* Nav
        <nav className="h-nav">
          <div className="h-nav-brand">
            <div className="h-brand-hex"><div className="h-brand-hex-inner" /></div>
            <div>
              <span className="h-brand-name">Namitha</span>
              <span className="h-brand-sub">Forestry &amp; Plantations</span>
            </div>
          </div>
          <div className="h-nav-links">
            {['Services', 'Categories', 'About', 'Contact'].map(l => (
              <button key={l} className="h-nav-link" onClick={go('#' + l.toLowerCase())}>{l}</button>
            ))}
          </div>
          <div className="h-nav-end">
            <button className="h-nbtn h-nbtn-ghost">Sign In</button>
            <button className="h-nbtn h-nbtn-solid" onClick={go('#contact')}>Get a Quote</button>
          </div>
        </nav> */}

        <div className="h-body">

          {/* ── LEFT PANEL ── */}
          <aside className="h-left">
            <div className="h-left-dots" />
            <div className="h-arc h-arc-1" /><div className="h-arc h-arc-2" /><div className="h-arc h-arc-3" />

            {/* Location */}
            <div className="h-loc-badge">
              <div className="h-loc-dot" />
              <span className="h-loc-text">Nandi Hills · Karnataka, India</span>
            </div>

            {/* Brand intro */}
            <div className="h-left-intro">
              <div className="h-left-intro-label">About Us</div>
              <div className="h-left-intro-heading">
                Rooted in the land,<em>grown with purpose.</em>
              </div>
              <p className="h-left-intro-body">
                Since 2004, Namitha Forestry has cultivated premium plantation species across Karnataka's highlands — combining traditional knowledge with modern agro-forestry practices.
              </p>
            </div>

            {/* Left-side mini stats */}
            <div className="h-left-stats">
              {[
                { n: '20', sup: '+', l: 'Years' },
                { n: '500', sup: '+', l: 'Farms' },
                { n: '8', sup: '', l: 'Districts' },
              ].map(s => (
                <div className="h-ls-stat" key={s.l}>
                  <div className="h-ls-n">{s.n}<span className="h-ls-sup">{s.sup}</span></div>
                  <div className="h-ls-l">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Species list */}
            <div className="h-species">
              <div className="h-species-hd">Featured Species</div>
              {SPECIES.map(s => (
                <div className="h-sp-row" key={s.name}>
                  <div className="h-sp-left">
                    <div className="h-sp-dot" />
                    <span className="h-sp-name">{s.name}</span>
                  </div>
                  <span className="h-sp-tag">{s.tag}</span>
                </div>
              ))}
            </div>

            {/* Left CTA */}
            <div className="h-left-cta">
              <button className="h-left-cta-btn" onClick={go('#categories')}>
                <span>Browse All Species</span>
                <span className="h-left-cta-arrow">→</span>
              </button>
            </div>
          </aside>

          {/* ── RIGHT PANEL ── */}
          <main className="h-right">
            <div className="h-grid-bg" />
            <div className="h-wm" aria-hidden="true">Grow</div>
            <div className="h-corner" />

            <div className="h-rc">
              <div className="h-eyebrow">
                <div className="h-eyebrow-rule" />
                <span className="h-eyebrow-text">Premium Forestry Cultivation</span>
              </div>

              <div className="h-headline">
                <span className="h-hl-1">Namitha</span>
                <span className="h-hl-2">Forestry</span>
                <span className="h-hl-3">Plantations</span>
              </div>

              <p className="h-tagline">
                Cultivating premium, resilient plantation species that enrich
                landscapes, sustain ecosystems, and build legacies worth
                growing into — from Nandi Hills to the horizon.
              </p>

              <div className="h-tw">
                <div className="h-tw-bar" />
                <div>
                  <div className="h-tw-label">What are you looking for?</div>
                  <div className="h-tw-text">{text}<span className="h-cursor" /></div>
                </div>
              </div>

              <div className="h-actions">
                <a href="#categories" className="h-cta-p" onClick={go('#categories')}>
                  <span>Explore Plants</span>
                  <div className="h-cta-arrow" />
                </a>
                <a href="#contact" className="h-cta-s" onClick={go('#contact')}>View Catalogue</a>
              </div>


            </div>
          </main>
        </div>

        {/* Marquee */}
        <div className="h-mq-wrap">
          <div className="h-mq-track">
            {mq.map((name, i) => (
              <div className="h-mq-item" key={i}>
                <span className="h-mq-text">{name}</span>
                <div className="h-mq-dot" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}