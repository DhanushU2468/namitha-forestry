import React, { useEffect, useState, useRef } from 'react';

/* ─────────────────────────────────────────
   Design: Editorial Botanical Magazine
   Dark forest + gold + massive serif type
   The memory: a wall-size headline with
   floating botanical orbs and a live marquee
───────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Plus+Jakarta+Sans:wght@200;300;400;500&display=swap');

  :root {
    --ink:    #060d07;
    --forest: #0d1f0f;
    --grove:  #1a3320;
    --canopy: #2d5a30;
    --moss:   #4a8c4e;
    --leaf:   #6aab4f;
    --gold:   #c9a84c;
    --gold-l: #e8d47e;
    --cream:  #f5f0e8;
  }

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  /* ── Root ── */
  .h-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100svh;
    background: var(--ink);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── Gradient mesh background ── */
  .h-mesh {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 55% 65% at 18%  75%, rgba(29,58,32,0.55)  0%, transparent 70%),
      radial-gradient(ellipse 40% 50% at 82%  20%, rgba(45,90,48,0.28)  0%, transparent 65%),
      radial-gradient(ellipse 30% 40% at 55%  90%, rgba(201,168,76,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 60% 40% at 50%  50%, rgba(13,31,15,0.8)   0%, transparent 80%);
  }

  /* ── Animated floating orbs ── */
  .h-orb {
    position: absolute; border-radius: 50%; pointer-events: none;
    filter: blur(72px);
    animation: orbFloat ease-in-out infinite alternate;
  }
  .h-orb-1 {
    width: 520px; height: 520px;
    left: -120px; bottom: -80px;
    background: radial-gradient(circle, rgba(45,90,48,0.45) 0%, transparent 70%);
    animation-duration: 11s; animation-delay: 0s;
  }
  .h-orb-2 {
    width: 380px; height: 380px;
    right: 5%; top: -60px;
    background: radial-gradient(circle, rgba(74,140,78,0.22) 0%, transparent 70%);
    animation-duration: 14s; animation-delay: -4s;
  }
  .h-orb-3 {
    width: 280px; height: 280px;
    right: 28%; bottom: 20%;
    background: radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%);
    animation-duration: 17s; animation-delay: -8s;
  }
  @keyframes orbFloat {
    from { transform: translate(0, 0)    scale(1); }
    to   { transform: translate(30px, -40px) scale(1.08); }
  }

  /* ── Grain ── */
  .h-grain {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E");
    opacity: 0.6;
  }

  /* ── Giant ghost letterform ── */
  .h-ghost-word {
    position: absolute;
    right: -2%;
    top: 50%;
    transform: translateY(-52%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(180px, 22vw, 320px);
    font-weight: 600;
    font-style: italic;
    line-height: 1;
    letter-spacing: -0.04em;
    color: transparent;
    -webkit-text-stroke: 1px rgba(74,140,78,0.13);
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    z-index: 1;
    animation: ghostDrift 20s ease-in-out infinite alternate;
  }
  @keyframes ghostDrift {
    from { transform: translateY(-52%) translateX(0); opacity: 0.7; }
    to   { transform: translateY(-48%) translateX(-12px); opacity: 1; }
  }

  /* ── Top bar ── */
  .h-topbar {
    position: relative; z-index: 20;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 56px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    opacity: 0; animation: fadeIn 0.8s ease 0.1s forwards;
  }
  .h-topbar-left {
    display: flex; align-items: center; gap: 10px;
  }
  .h-topbar-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--leaf);
    box-shadow: 0 0 8px rgba(106,171,79,0.8);
    animation: pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 6px rgba(106,171,79,0.7); }
    50%      { box-shadow: 0 0 16px rgba(106,171,79,0.4), 0 0 32px rgba(106,171,79,0.15); }
  }
  .h-topbar-loc {
    font-size: 10px; font-weight: 400;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(245,240,232,0.5);
  }
  .h-topbar-right {
    display: flex; align-items: center; gap: 32px;
  }
  .h-topbar-link {
    font-size: 10px; font-weight: 300;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(245,240,232,0.45);
    text-decoration: none;
    transition: color 0.25s ease;
    cursor: pointer; background: none; border: none;
  }
  .h-topbar-link:hover { color: rgba(245,240,232,0.6); }

  /* ── Main content ── */
  .h-main {
    position: relative; z-index: 10;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 56px 0;
    min-height: 0;
  }

  /* ── Issue / index label ── */
  .h-index {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 32px;
    opacity: 0; animation: fadeUp 0.7s ease 0.3s forwards;
  }
  .h-index-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px; font-weight: 300;
    color: var(--gold); letter-spacing: 0.1em;
  }
  .h-index-rule { flex: 0 0 40px; height: 1px; background: var(--gold); opacity: 0.4; }
  .h-index-label {
    font-size: 10px; font-weight: 400;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(245,240,232,0.45);
  }

  /* ── Hero headline ── */
  .h-headline {
    opacity: 0; animation: fadeUp 0.9s ease 0.45s forwards;
  }
  .h-hl-pre {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.5vw, 28px);
    font-weight: 300; font-style: italic;
    color: rgba(245,240,232,0.38);
    letter-spacing: 0.02em;
    display: block;
    margin-bottom: 4px;
  }
  .h-hl-main {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(72px, 11vw, 160px);
    font-weight: 600;
    line-height: 0.88;
    letter-spacing: -0.03em;
    color: var(--cream);
    display: block;
  }
  .h-hl-main em {
    font-style: italic;
    display: block;
    background: linear-gradient(110deg, var(--gold) 0%, var(--gold-l) 45%, var(--gold) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Two-column lower section ── */
  .h-lower {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-top: 48px;
    padding-bottom: 0;
    opacity: 0; animation: fadeUp 0.9s ease 0.7s forwards;
  }

  .h-lower-left {
    display: flex; flex-direction: column; gap: 24px;
    border-top: 1px solid rgba(255,255,255,0.07);
    padding-top: 28px;
  }
  .h-body-text {
    font-size: 14px; font-weight: 400; line-height: 1.85;
    color: rgba(245,240,232,0.65);
    max-width: 340px; letter-spacing: 0.01em;
  }
  .h-actions {
    display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
  }

  /* Primary CTA — angled parallelogram */
  .h-btn-primary {
    display: inline-flex; align-items: center; gap: 14px;
    padding: 14px 34px;
    background: var(--gold);
    color: var(--ink);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.24em; text-transform: uppercase;
    text-decoration: none; border: none; cursor: pointer;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    position: relative; overflow: hidden;
    transition: color 0.3s ease;
  }
  .h-btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--gold-l);
    transform: translateX(-101%);
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .h-btn-primary:hover::before { transform: translateX(0); }
  .h-btn-primary > * { position: relative; z-index: 1; }
  .h-btn-arrow {
    width: 20px; height: 1px; background: currentColor;
    transition: width 0.3s ease; flex-shrink: 0;
  }
  .h-btn-primary:hover .h-btn-arrow { width: 30px; }

  .h-btn-ghost {
    font-size: 10px; font-weight: 300;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(245,240,232,0.5);
    text-decoration: none; cursor: pointer; background: none; border: none;
    position: relative; padding-bottom: 3px;
    transition: color 0.3s ease;
  }
  .h-btn-ghost::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: rgba(245,240,232,0.15);
    transition: background 0.3s ease;
  }
  .h-btn-ghost:hover { color: rgba(245,240,232,0.65); }
  .h-btn-ghost:hover::after { background: rgba(245,240,232,0.45); }

  /* ── Right lower: typewriter + stats ── */
  .h-lower-right {
    border-top: 1px solid rgba(255,255,255,0.07);
    padding-top: 28px;
    display: flex; flex-direction: column; gap: 28px;
  }
  .h-tw-row {
    display: flex; align-items: flex-start; gap: 16px;
  }
  .h-tw-bar {
    width: 1px; flex-shrink: 0; margin-top: 4px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    align-self: stretch; min-height: 40px; opacity: 0.4;
  }
  .h-tw-label {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(245,240,232,0.4); margin-bottom: 8px; font-weight: 400;
  }
  .h-tw-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.2vw, 26px);
    font-weight: 300; font-style: italic;
    color: rgba(245,240,232,0.85);
    min-height: 1.4em; line-height: 1.4; letter-spacing: 0.01em;
  }
  .h-cursor {
    display: inline-block; width: 1.5px; height: 0.85em;
    background: var(--gold); margin-left: 2px; vertical-align: middle;
    animation: blink 0.85s step-end infinite;
  }
  @keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:0; } }

  /* Stats */
  .h-stats {
    display: flex; gap: 0;
  }
  .h-stat {
    flex: 1;
    padding-right: 20px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .h-stat:last-child { border-right: none; padding-right: 0; padding-left: 20px; }
  .h-stat:not(:first-child):not(:last-child) { padding: 0 20px; }
  .h-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 300;
    color: var(--gold); line-height: 1; margin-bottom: 5px;
  }
  .h-stat-lbl {
    font-size: 8.5px; font-weight: 400;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(245,240,232,0.4);
  }

  /* ── Marquee strip ── */
  .h-marquee-wrap {
    position: relative; z-index: 10;
    margin-top: 48px;
    padding: 14px 0;
    border-top:    1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    overflow: hidden;
    background: rgba(255,255,255,0.015);
    opacity: 0; animation: fadeIn 1s ease 1.1s forwards;
  }
  .h-marquee-track {
    display: flex; gap: 0;
    width: max-content;
    animation: marqueeScroll 28s linear infinite;
  }
  .h-marquee-track:hover { animation-play-state: paused; }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .h-marquee-item {
    display: flex; align-items: center; gap: 0;
    white-space: nowrap; padding: 0 28px;
  }
  .h-marquee-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-weight: 300; font-style: italic;
    letter-spacing: 0.06em;
    color: rgba(245,240,232,0.5);
    transition: color 0.3s ease;
  }
  .h-marquee-track:hover .h-marquee-text { color: rgba(245,240,232,0.75); }
  .h-marquee-sep {
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--gold); opacity: 0.3;
    flex-shrink: 0; margin-left: 28px;
  }

  /* ── Scroll indicator (bottom left) ── */
  .h-scroll-hint {
    position: absolute; bottom: 88px; left: 56px;
    display: flex; align-items: center; gap: 14px;
    z-index: 20;
    opacity: 0; animation: fadeIn 1s ease 1.4s forwards;
  }
  .h-scroll-line {
    width: 1px; height: 56px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    transform-origin: top;
    animation: scrollDrop 2.4s ease-in-out infinite;
  }
  @keyframes scrollDrop {
    0%,100% { transform: scaleY(0); opacity: 0; }
    35%,65% { transform: scaleY(1); opacity: 1; }
  }
  .h-scroll-txt {
    font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(245,240,232,0.4); writing-mode: vertical-rl;
  }

  /* ── Diagonal decorative line ── */
  .h-diag {
    position: absolute; z-index: 2; pointer-events: none;
    top: 0; right: 38%;
    width: 1px; height: 100%;
    background: linear-gradient(to bottom,
      transparent 0%,
      rgba(201,168,76,0.08) 25%,
      rgba(201,168,76,0.12) 50%,
      rgba(201,168,76,0.05) 75%,
      transparent 100%);
    transform: rotate(12deg) translateX(-50%);
    transform-origin: top;
  }

  /* ── Keyframes ── */
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }

  /* ═══════════ RESPONSIVE ═══════════ */

  @media (max-width: 1024px) {
    .h-topbar { padding: 22px 36px; }
    .h-main   { padding: 32px 36px 0; }
    .h-hl-main { font-size: clamp(60px, 10vw, 120px); }
    .h-lower  { gap: 36px; margin-top: 36px; }
    .h-scroll-hint { left: 36px; }
    .h-ghost-word { font-size: clamp(140px, 18vw, 240px); }
  }

  @media (max-width: 768px) {
    .h-topbar-right { display: none; }
    .h-main   { padding: 24px 24px 0; }
    .h-topbar { padding: 20px 24px; }

    .h-lower {
      grid-template-columns: 1fr;
      gap: 28px;
      margin-top: 28px;
    }

    .h-hl-main { font-size: clamp(52px, 14vw, 90px); }
    .h-ghost-word { display: none; }
    .h-diag       { display: none; }
    .h-scroll-hint { display: none; }

    .h-lower-right { border-top: none; padding-top: 0; }
    .h-stats .h-stat:last-child { padding-left: 16px; }
    .h-stats .h-stat:not(:first-child):not(:last-child) { padding: 0 16px; }

    .h-marquee-wrap { margin-top: 32px; }
  }

  @media (max-width: 480px) {
    .h-main { padding: 20px 18px 0; }
    .h-topbar { padding: 18px; }
    .h-index  { margin-bottom: 20px; }
    .h-hl-pre { font-size: clamp(14px, 4vw, 20px); }
    .h-hl-main { font-size: clamp(44px, 16vw, 72px); }
    .h-lower { margin-top: 24px; }
    .h-body-text { font-size: 12px; }
    .h-btn-ghost { display: none; }
  }
`;

const PHRASES = [
  'Looking for premium forestry plants?',
  'Explore Mahogany & Sandalwood',
  'Your one-stop plantation solution',
  'Trusted by 500+ farms across Karnataka',
  'Invest in a greener tomorrow',
];

const MARQUEE_ITEMS = [
  'Mahogany', 'Sandalwood', 'Teak', 'Rosewood',
  'Silver Oak', 'Neem', 'Bamboo', 'Jackfruit',
  'Mango', 'Moringa', 'Eucalyptus', 'Casuarina',
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
      else setDelta(deleting ? 38 : 100 - Math.random() * 50);
    }, delta);
    return () => clearInterval(tick);
  }, [text, delta, deleting, loopNum]);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Duplicate marquee for seamless loop */
  const marqueeContent = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <style>{STYLES}</style>
      <section className="h-root" id="home">

        {/* Background layers */}
        <div className="h-mesh" />
        <div className="h-grain" />
        <div className="h-orb h-orb-1" />
        <div className="h-orb h-orb-2" />
        <div className="h-orb h-orb-3" />
        <div className="h-diag" />

        {/* Ghost letterform */}
        <div className="h-ghost-word" aria-hidden="true">Forestry</div>

        {/* ── Top bar ── */}
        <header className="h-topbar">
          <div className="h-topbar-left">
            <div className="h-topbar-dot" />
            <span className="h-topbar-loc">Nandi Hills · Karnataka · India</span>
          </div>
          <nav className="h-topbar-right">
            {['Services', 'Categories', 'Contact'].map(l => (
              <button
                key={l}
                className="h-topbar-link"
                onClick={scrollTo('#' + l.toLowerCase())}
              >{l}</button>
            ))}
          </nav>
        </header>

        {/* ── Main ── */}
        <main className="h-main">

          {/* Index label */}
          <div className="h-index">
            <span className="h-index-num">01 / 04</span>
            <div className="h-index-rule" />
            <span className="h-index-label">Premium Forestry Cultivation</span>
          </div>

          {/* Headline */}
          <div className="h-headline">
            <span className="h-hl-pre">Welcome to</span>
            <h1 className="h-hl-main">
              Namitha
              <em>Forestry</em>
            </h1>
          </div>

          {/* Lower two-column */}
          <div className="h-lower">

            {/* Left: copy + CTA */}
            <div className="h-lower-left">
              <p className="h-body-text">
                Cultivating premium, resilient plantation species that enrich
                landscapes, sustain ecosystems, and build legacies worth
                growing into — from Nandi Hills to the horizon.
              </p>
              <div className="h-actions">
                <a href="#categories" className="h-btn-primary" onClick={scrollTo('#categories')}>
                  <span>Explore Plants</span>
                  <div className="h-btn-arrow" />
                </a>
                <button className="h-btn-ghost" onClick={scrollTo('#contact')}>
                  Get a Quote
                </button>
              </div>
            </div>

            {/* Right: typewriter + stats */}
            <div className="h-lower-right">
              <div className="h-tw-row">
                <div className="h-tw-bar" />
                <div>
                  <div className="h-tw-label">What are you looking for?</div>
                  <div className="h-tw-text">
                    {text}<span className="h-cursor" />
                  </div>
                </div>
              </div>

              <div className="h-stats">
                {[
                  { num: '50+', lbl: 'Species' },
                  { num: '12K', lbl: 'Hectares' },
                  { num: '98%', lbl: 'Survival Rate' },
                ].map(s => (
                  <div className="h-stat" key={s.lbl}>
                    <div className="h-stat-num">{s.num}</div>
                    <div className="h-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        {/* ── Marquee ── */}
        <div className="h-marquee-wrap">
          <div className="h-marquee-track">
            {marqueeContent.map((name, i) => (
              <div className="h-marquee-item" key={i}>
                <span className="h-marquee-text">{name}</span>
                <div className="h-marquee-sep" />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="h-scroll-hint">
          <div className="h-scroll-line" />
          <span className="h-scroll-txt">Scroll</span>
        </div>

      </section>
    </>
  );
}