import React, { useEffect, useRef, useState, useCallback } from 'react';
import { plants } from '../data/plants';
import { Trees, Flower, Apple, X, ArrowRight, ArrowUpRight, Phone, Pause, Play } from 'lucide-react';

const CATEGORIES = [
  { name: 'Forestry Plants', desc: 'Hardy trees & shrubs for landscapes', icon: Trees, accent: '#4a7c59', accentDark: '#3d6b4a' },
  { name: 'Aerial Flowering Plants', desc: 'Beautiful blooms for any garden', icon: Flower, accent: '#8a5c6b', accentDark: '#74485a' },
  { name: 'Fruit Plants', desc: 'Organic produce from your own land', icon: Apple, accent: '#7a6b3a', accentDark: '#66592f' },
];

const ROTATE_MS = 3500; // auto-advance interval
const GRID_LIMIT = 6;    // mini cards shown beside featured

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  .cs-section {
    background: #f5f0e8;
    background-image:
      radial-gradient(ellipse at 10% 15%, rgba(74,124,89,0.06) 0%, transparent 55%),
      radial-gradient(ellipse at 90% 85%, rgba(107,143,78,0.05) 0%, transparent 50%);
    padding: 100px 0 0;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .cs-section::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a7c59' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
  }

  /* ── Header ── */
  .cs-header {
    text-align: center; padding: 0 48px; margin-bottom: 64px;
    position: relative; z-index: 1;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .cs-header.cs-in { opacity: 1; transform: none; }
  .cs-eyebrow {
    display: block; font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: #4a7c59; margin-bottom: 14px;
  }
  .cs-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.6rem, 5vw, 4rem); font-weight: 600;
    color: #1c2b1e; line-height: 1.08; margin: 0 0 16px; letter-spacing: -0.025em;
  }
  .cs-title em { font-style: italic; color: #4a7c59; }
  .cs-subtitle {
    font-size: 0.92rem; color: #6b7c6e; font-weight: 300;
    max-width: 460px; margin: 0 auto; line-height: 1.75;
  }
  .cs-divider {
    width: 48px; height: 1px; margin: 20px auto 0;
    background: linear-gradient(90deg, transparent, #4a7c59, transparent);
  }

  /* ── Tabs ── */
  .cs-tabs {
    display: flex; align-items: stretch; padding: 0 48px;
    border-bottom: 1px solid rgba(74,124,89,0.14);
    position: relative; z-index: 2; gap: 4px;
    overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
  }
  .cs-tabs::-webkit-scrollbar { display: none; }
  .cs-tab {
    display: flex; align-items: center; gap: 10px;
    padding: 18px 24px 20px; background: none; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 400;
    color: #9aab9d; cursor: pointer; position: relative;
    white-space: nowrap; transition: color 0.25s ease; flex-shrink: 0;
  }
  .cs-tab::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
    height: 2px; background: var(--tab-accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .cs-tab.cs-active { color: #1c2b1e; font-weight: 500; }
  .cs-tab.cs-active::after { transform: scaleX(1); }
  .cs-tab:hover:not(.cs-active) { color: #4a5c4d; }
  .cs-tab-icon {
    width: 30px; height: 30px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    background: rgba(74,124,89,0.08); transition: background 0.25s ease; flex-shrink: 0;
  }
  .cs-tab-count {
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.05em;
    padding: 2px 8px; border-radius: 10px;
    background: rgba(74,124,89,0.1); color: #4a7c59;
    transition: background 0.25s ease, color 0.25s ease;
  }
  .cs-tab.cs-active .cs-tab-count { background: var(--tab-accent-bg); color: var(--tab-accent); }

  /* ── Panel ── */
  .cs-panel {
    padding: 52px 48px 80px; position: relative; z-index: 1;
    opacity: 0; transform: translateY(14px);
    transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
  }
  .cs-panel.cs-panel-in { opacity: 1; transform: none; }

  /* ── Main layout ── */
  .cs-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 1200px; margin: 0 auto;
  }

  /* ══════════════════════════════
     FEATURED CARD
  ══════════════════════════════ */
  .cs-featured {
    grid-column: 1; position: relative;
    background: #fff;
    border: 1px solid rgba(74,124,89,0.1);
    border-radius: 4px; overflow: hidden;
    cursor: pointer; display: flex; flex-direction: column;
    transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .cs-featured:hover {
    transform: translateY(-5px);
    box-shadow: 0 24px 56px rgba(28,43,30,0.12), 0 6px 16px rgba(28,43,30,0.07);
  }

  /* image crossfade wrapper */
  .cs-feat-img-wrap {
    position: relative; height: 320px; overflow: hidden;
    background: #e4e0d6; flex-shrink: 0;
  }
  /* each image is absolute, we fade between them */
  .cs-feat-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover; display: block;
    opacity: 0;
    transform: scale(1.04);
    transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1);
    will-change: opacity, transform;
  }
  .cs-feat-img.cs-feat-img--active {
    opacity: 1; transform: scale(1);
  }
  .cs-feat-img.cs-feat-img--prev {
    opacity: 0; transform: scale(0.97);
  }

  .cs-feat-badge-wrap {
    position: absolute; top: 16px; left: 16px; z-index: 2;
    display: flex; gap: 8px; flex-wrap: wrap;
  }
  .cs-feat-badge {
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 5px 12px; border-radius: 20px;
    background: rgba(245,240,232,0.92); backdrop-filter: blur(6px);
  }
  .cs-feat-badge--featured { background: #1c2b1e; color: #f5f0e8; }

  /* Progress bar */
  .cs-feat-progress {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px; background: rgba(0,0,0,0.15); z-index: 3;
  }
  .cs-feat-progress-bar {
    height: 100%; background: var(--card-accent);
    transform-origin: left;
    transition: none;
  }
  .cs-feat-progress-bar.cs-progressing {
    transition: width linear;
  }

  /* play/pause control */
  .cs-feat-controls {
    position: absolute; bottom: 12px; right: 12px; z-index: 4;
    display: flex; align-items: center; gap: 6px;
  }
  .cs-feat-ctrl-btn {
    width: 28px; height: 28px; border-radius: 50%;
    background: rgba(245,240,232,0.88); backdrop-filter: blur(6px);
    border: 1px solid rgba(74,124,89,0.2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #1c2b1e;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .cs-feat-ctrl-btn:hover { background: #1c2b1e; color: #f5f0e8; transform: scale(1.1); }

  /* dot nav */
  .cs-feat-dots {
    display: flex; align-items: center; gap: 5px;
  }
  .cs-feat-dot {
    width: 6px; height: 6px; border-radius: 3px;
    background: rgba(245,240,232,0.45);
    border: none; cursor: pointer; padding: 0;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease;
  }
  .cs-feat-dot.cs-feat-dot--active {
    width: 18px; background: rgba(245,240,232,0.95);
  }

  /* card body */
  .cs-feat-body {
    padding: 28px 28px 24px; flex: 1;
    display: flex; flex-direction: column;
    border-top: 3px solid var(--card-accent);
    position: relative; overflow: hidden;
  }

  /* text crossfade */
  .cs-feat-text {
    position: absolute; inset: 28px 28px 24px;
    display: flex; flex-direction: column;
    opacity: 0; transform: translateY(10px);
    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
    pointer-events: none;
  }
  .cs-feat-text.cs-feat-text--active {
    opacity: 1; transform: none; pointer-events: all;
    position: relative; inset: auto;
  }

  .cs-feat-label {
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--card-accent); margin-bottom: 10px;
  }
  .cs-feat-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 2.3vw, 2.1rem); font-weight: 600;
    color: #1c2b1e; margin: 0 0 6px; line-height: 1.1; letter-spacing: -0.02em;
  }
  .cs-feat-sci {
    font-size: 0.8rem; font-style: italic; color: #9aab9d; margin: 0 0 12px;
  }
  .cs-feat-desc {
    font-size: 0.87rem; color: #6b7c6e; line-height: 1.75; font-weight: 300;
    flex: 1; margin: 0 0 20px;
    display: -webkit-box; -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .cs-feat-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 16px; border-top: 1px solid rgba(74,124,89,0.1);
  }
  .cs-feat-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.7rem; font-weight: 600; color: #1c2b1e; line-height: 1;
  }
  .cs-feat-idx {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.9rem; font-weight: 300; color: #9aab9d;
    letter-spacing: 0.05em;
  }
  .cs-feat-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; background: #1c2b1e; color: #f5f0e8;
    font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: none; border-radius: 2px; cursor: pointer;
    transition: background 0.25s ease, gap 0.25s ease;
  }
  .cs-feat-cta:hover { background: var(--card-accent); gap: 12px; }

  /* ── Mini grid ── */
  .cs-grid {
    grid-column: 2; display: grid;
    grid-template-columns: 1fr 1fr; gap: 20px; align-content: start;
  }
  .cs-mcard {
    background: #fff; border: 1px solid rgba(74,124,89,0.1);
    border-radius: 4px; overflow: hidden; cursor: pointer;
    display: flex; flex-direction: column; position: relative;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease;
  }
  .cs-mcard::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--card-accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1); z-index: 1;
  }
  .cs-mcard:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(28,43,30,0.1); border-color: rgba(74,124,89,0.22); }
  .cs-mcard:hover::before { transform: scaleX(1); }
  .cs-mcard:hover .cs-mcard-img { transform: scale(1.06); }

  /* Highlight the mini card matching the featured plant */
  .cs-mcard.cs-mcard--active {
    border-color: var(--card-accent) !important;
    box-shadow: 0 0 0 2px var(--card-accent-ring), 0 8px 24px rgba(28,43,30,0.08);
  }

  .cs-mcard-img-wrap { position: relative; height: 140px; overflow: hidden; background: #e4e0d6; flex-shrink: 0; }
  .cs-mcard-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.55s cubic-bezier(0.22,1,0.36,1); }
  .cs-mcard-body { padding: 14px 14px 12px; flex: 1; display: flex; flex-direction: column; }
  .cs-mcard-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem; font-weight: 600; color: #1c2b1e; margin: 0 0 3px; line-height: 1.2;
  }
  .cs-mcard-sci { font-size: 0.72rem; font-style: italic; color: #b0bdb2; margin: 0 0 8px; }
  .cs-mcard-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(74,124,89,0.08);
  }
  .cs-mcard-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-weight: 600; color: #1c2b1e;
  }
  .cs-mcard-btn {
    width: 28px; height: 28px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    border: 1px solid currentColor; background: none; cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }
  .cs-mcard-btn:hover { background: var(--card-accent); color: #fff; border-color: var(--card-accent); transform: scale(1.1); }

  .cs-mcard--more {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 8px; min-height: 160px;
    background: rgba(74,124,89,0.04);
    border: 1px dashed rgba(74,124,89,0.22);
    transition: background 0.25s ease, border-color 0.25s ease;
    cursor: pointer;
  }
  .cs-mcard--more:hover { background: rgba(74,124,89,0.08); border-color: rgba(74,124,89,0.4); }
  .cs-mcard--more-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 300; color: #4a7c59; line-height: 1;
  }
  .cs-mcard--more-label {
    font-size: 0.7rem; font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; color: #9aab9d;
  }
  .cs-mcard--more-arrow {
    width: 32px; height: 32px; border-radius: 50%;
    border: 1px solid rgba(74,124,89,0.3);
    display: flex; align-items: center; justify-content: center;
    color: #4a7c59; margin-top: 4px;
    transition: background 0.25s ease, border-color 0.25s ease;
  }
  .cs-mcard--more:hover .cs-mcard--more-arrow { background: #4a7c59; border-color: #4a7c59; color: #fff; }

  /* ── Modal ── */
  .cs-modal-overlay {
    position: fixed; inset: 0; background: rgba(10,18,11,0.65);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; padding: 20px;
    animation: moFade 0.25s ease forwards;
  }
  @keyframes moFade { from { opacity: 0; } to { opacity: 1; } }
  .cs-modal {
    background: #f9f5ee; border-radius: 4px;
    width: 100%; max-width: 820px; max-height: 92vh;
    overflow-y: auto; position: relative;
    box-shadow: 0 40px 80px rgba(10,18,11,0.35);
    animation: moSlide 0.35s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  @keyframes moSlide {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: none; }
  }
  .cs-modal-close {
    position: absolute; top: 16px; right: 16px; width: 36px; height: 36px;
    border-radius: 50%; background: rgba(249,245,238,0.9);
    border: 1px solid rgba(74,124,89,0.18);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; z-index: 10; color: #1c2b1e; backdrop-filter: blur(8px);
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .cs-modal-close:hover { background: #1c2b1e; color: #f9f5ee; transform: scale(1.08); }
  .cs-modal-img-wrap { position: relative; height: 340px; overflow: hidden; background: #e4e0d6; flex-shrink: 0; }
  .cs-modal-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cs-modal-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,18,11,0.55) 0%, transparent 55%);
  }
  .cs-modal-img-title { position: absolute; bottom: 28px; left: 32px; right: 32px; }
  .cs-modal-img-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 600;
    color: #f5f0e8; line-height: 1.05; margin: 0 0 6px;
  }
  .cs-modal-img-sci { font-size: 0.9rem; font-style: italic; color: rgba(245,240,232,0.55); margin: 0; }
  .cs-modal-body { padding: 32px 36px 36px; }
  .cs-modal-meta {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap; margin-bottom: 24px;
    padding-bottom: 20px; border-bottom: 1px solid rgba(74,124,89,0.12);
  }
  .cs-modal-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 600; color: #1c2b1e; line-height: 1;
  }
  .cs-modal-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .cs-modal-tag {
    font-size: 0.66rem; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 5px 12px; border-radius: 20px;
    border: 1px solid rgba(74,124,89,0.22); color: #4a7c59;
  }
  .cs-modal-tag--dark { background: #1c2b1e; color: #f5f0e8; border-color: transparent; }
  .cs-modal-info { font-size: 0.93rem; color: #4a5c4d; line-height: 1.85; font-weight: 300; margin: 0 0 28px; }
  .cs-modal-actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .cs-modal-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 13px 28px; background: #1c2b1e; color: #f5f0e8;
    font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: none; border-radius: 2px; cursor: pointer;
    transition: background 0.25s ease, gap 0.25s ease;
  }
  .cs-modal-btn-primary:hover { background: #4a7c59; gap: 14px; }
  .cs-modal-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 24px; background: none; color: #4a7c59;
    font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    border: 1px solid rgba(74,124,89,0.3); border-radius: 2px; cursor: pointer;
    transition: background 0.25s ease, border-color 0.25s ease;
  }
  .cs-modal-btn-ghost:hover { background: rgba(74,124,89,0.08); border-color: rgba(74,124,89,0.5); }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .cs-layout { grid-template-columns: 1fr; }
    .cs-featured { grid-row: auto; }
    .cs-feat-img-wrap { height: 260px; }
    .cs-grid { grid-column: 1; grid-row: auto; grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .cs-section { padding-top: 72px; }
    .cs-header { padding: 0 20px; margin-bottom: 44px; }
    .cs-tabs { padding: 0 20px; }
    .cs-panel { padding: 36px 20px 60px; }
    .cs-grid { grid-template-columns: 1fr 1fr; }
    .cs-modal-img-wrap { height: 240px; }
    .cs-modal-body { padding: 24px 20px; }
    .cs-modal-img-title { left: 20px; right: 20px; bottom: 20px; }
  }
  @media (max-width: 480px) {
    .cs-grid { grid-template-columns: 1fr 1fr; }
    .cs-mcard-img-wrap { height: 110px; }
    .cs-tab { padding: 14px 16px 16px; }
    .cs-feat-img-wrap { height: 200px; }
  }
`;

export default function CategorySection() {
  const [activeTab, setActiveTab] = useState(0);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [panelIn, setPanelIn] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const headerRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const cat = CATEGORIES[activeTab];
  const catPlants = plants.filter(p => p.category === cat.name);
  const featured = catPlants[featuredIdx] || catPlants[0];
  const miniPlants = catPlants.slice(0, GRID_LIMIT).filter((_, i) => i !== featuredIdx);
  const overflow = catPlants.length - (GRID_LIMIT + 1);

  /* Header fade-in */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('cs-in'); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Auto-advance featured ── */
  const advance = useCallback(() => {
    if (!catPlants.length) return;
    setFeaturedIdx(prev => {
      const next = (prev + 1) % catPlants.length;
      setPrevIdx(prev);
      return next;
    });
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [catPlants.length]);

  /* Smooth progress bar via rAF */
  useEffect(() => {
    if (paused) { cancelAnimationFrame(progressRef.current); return; }
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / ROTATE_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [featuredIdx, paused, activeTab]);

  /* Interval */
  useEffect(() => {
    if (paused) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(advance, ROTATE_MS);
    return () => clearInterval(timerRef.current);
  }, [advance, paused, activeTab]);

  /* Reset on tab switch */
  useEffect(() => {
    clearInterval(timerRef.current);
    setFeaturedIdx(0);
    setPrevIdx(null);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [activeTab]);

  /* Manual dot / mini-card click */
  const goTo = (idx) => {
    clearInterval(timerRef.current);
    setPrevIdx(featuredIdx);
    setFeaturedIdx(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
    if (!paused) {
      timerRef.current = setInterval(advance, ROTATE_MS);
    }
  };

  /* Tab switch */
  const switchTab = (i) => {
    if (i === activeTab) return;
    setPanelIn(false);
    setTimeout(() => { setActiveTab(i); setPanelIn(true); }, 240);
  };

  /* Modal scroll lock */
  useEffect(() => {
    document.body.style.overflow = selectedPlant ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedPlant]);

  const enquire = (name) => {
    const msg = 'Hello, I am interested in ' + name + '.';
    window.open('https://wa.me/9900897449?text=' + encodeURIComponent(msg), '_blank');
  };

  return (
    <>
      <style>{CSS}</style>

      <section id="categories" className="cs-section">

        {/* Header */}
        <div className="cs-header" ref={headerRef}>
          <span className="cs-eyebrow">Our collection</span>
          <h2 className="cs-title">Browse plants by<br /><em>nature's own categories</em></h2>
          <p className="cs-subtitle">Premium specimens, carefully selected for every environment and purpose.</p>
          <div className="cs-divider" />
        </div>

        {/* Tabs */}
        <div className="cs-tabs" role="tablist">
          {CATEGORIES.map((c, i) => {
            const Icon = c.icon;
            const count = plants.filter(p => p.category === c.name).length;
            const isActive = i === activeTab;
            return (
              <button
                key={c.name} role="tab" aria-selected={isActive}
                className={'cs-tab' + (isActive ? ' cs-active' : '')}
                style={{ '--tab-accent': c.accent, '--tab-accent-bg': c.accent + '14' }}
                onClick={() => switchTab(i)}
              >
                <span className="cs-tab-icon" style={isActive ? { background: c.accent + '18' } : {}}>
                  <Icon size={14} color={isActive ? c.accent : '#9aab9d'} strokeWidth={1.8} />
                </span>
                {c.name}
                <span className="cs-tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          className={'cs-panel' + (panelIn ? ' cs-panel-in' : '')}
          style={{ '--card-accent': cat.accent, '--card-accent-ring': cat.accent + '40' }}
        >
          {!catPlants.length ? (
            <p style={{ textAlign: 'center', color: '#9aab9d', padding: '40px 0', fontSize: '0.9rem' }}>
              No plants in this category yet.
            </p>
          ) : (
            <div className="cs-layout">

              {/* ══ Featured Card ══ */}
              <article
                className="cs-featured"
                style={{ '--card-accent': cat.accent }}
                onClick={() => setSelectedPlant(featured)}
              >
                {/* Image crossfade stack */}
                <div
                  className="cs-feat-img-wrap"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  {catPlants.map((plant, i) => (
                    <img
                      key={plant.name + i}
                      className={
                        'cs-feat-img' +
                        (i === featuredIdx ? ' cs-feat-img--active' :
                          i === prevIdx ? ' cs-feat-img--prev' : '')
                      }
                      src={plant.image}
                      alt={plant.name}
                      onError={e => { e.target.src = 'https://via.placeholder.com/600x320/e4e0d6/9aab9d?text=Plant'; }}
                    />
                  ))}

                  {/* Featured badge */}
                  <div className="cs-feat-badge-wrap">
                    <span className="cs-feat-badge" style={{ color: cat.accent }}>
                      {'0' + (featuredIdx + 1)} / {'0' + catPlants.length}
                    </span>
                    {featured?.featured && (
                      <span className="cs-feat-badge cs-feat-badge--featured">Editor's Pick</span>
                    )}
                  </div>

                  {/* Dot nav + play/pause */}
                  <div className="cs-feat-controls" onClick={e => e.stopPropagation()}>
                    <div className="cs-feat-dots">
                      {catPlants.map((_, i) => (
                        <button
                          key={i}
                          className={'cs-feat-dot' + (i === featuredIdx ? ' cs-feat-dot--active' : '')}
                          onClick={() => goTo(i)}
                          aria-label={'Go to plant ' + (i + 1)}
                        />
                      ))}
                    </div>
                    <button
                      className="cs-feat-ctrl-btn"
                      onClick={() => setPaused(p => !p)}
                      aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                    >
                      {paused
                        ? <Play size={11} strokeWidth={2} />
                        : <Pause size={11} strokeWidth={2} />
                      }
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="cs-feat-progress">
                    <div
                      className={'cs-feat-progress-bar' + (!paused ? ' cs-progressing' : '')}
                      style={{
                        width: progress + '%',
                        transitionDuration: !paused ? '100ms' : '0ms',
                      }}
                    />
                  </div>
                </div>

                {/* Text — crossfade per plant */}
                <div
                  className="cs-feat-body"
                  style={{ borderTopColor: cat.accent }}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  {catPlants.map((plant, i) => (
                    <div
                      key={plant.name + i}
                      className={'cs-feat-text' + (i === featuredIdx ? ' cs-feat-text--active' : '')}
                    >
                      <span className="cs-feat-label" style={{ color: cat.accent }}>
                        {cat.name}
                      </span>
                      <h3 className="cs-feat-name">{plant.name}</h3>
                      {plant.scientificName && <p className="cs-feat-sci">{plant.scientificName}</p>}
                      {(plant.info || plant.description) && <p className="cs-feat-desc">{plant.info || plant.description}</p>}
                      <div className="cs-feat-footer">
                        <div>
                          <span className="cs-feat-price">{plant.price}</span>
                        </div>
                        <button
                          className="cs-feat-cta"
                          onClick={e => { e.stopPropagation(); setSelectedPlant(plant); }}
                        >
                          View Details <ArrowRight size={13} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* ══ Mini grid ══ */}
              <div className="cs-grid" style={{ '--card-accent': cat.accent }}>
                {miniPlants.map((plant) => {
                  const realIdx = catPlants.indexOf(plant);
                  const isActive = realIdx === featuredIdx;
                  return (
                    <article
                      key={plant.name}
                      className={'cs-mcard' + (isActive ? ' cs-mcard--active' : '')}
                      style={{ '--card-accent': cat.accent }}
                      onClick={() => goTo(realIdx)}
                    >
                      <div className="cs-mcard-img-wrap">
                        <img
                          className="cs-mcard-img"
                          src={plant.image} alt={plant.name} loading="lazy"
                          onError={e => { e.target.src = 'https://via.placeholder.com/300x140/e4e0d6/9aab9d?text=Plant'; }}
                        />
                      </div>
                      <div className="cs-mcard-body">
                        <h4 className="cs-mcard-name">{plant.name}</h4>
                        {plant.scientificName && <p className="cs-mcard-sci">{plant.scientificName}</p>}
                        <div className="cs-mcard-footer">
                          <span className="cs-mcard-price">{plant.price}</span>
                          <button
                            className="cs-mcard-btn"
                            style={{ color: cat.accent }}
                            aria-label={'View ' + plant.name}
                            onClick={e => { e.stopPropagation(); setSelectedPlant(plant); }}
                          >
                            <ArrowUpRight size={13} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {overflow > 0 && (
                  <div className="cs-mcard cs-mcard--more" onClick={() => window.open('https://wa.me/9900897449', '_blank')}>
                    <span className="cs-mcard--more-num">+{overflow}</span>
                    <span className="cs-mcard--more-label">More plants</span>
                    <div className="cs-mcard--more-arrow">
                      <ArrowRight size={14} strokeWidth={2} />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedPlant && (
        <div className="cs-modal-overlay" onClick={() => setSelectedPlant(null)}>
          <div className="cs-modal" onClick={e => e.stopPropagation()}>
            <button className="cs-modal-close" onClick={() => setSelectedPlant(null)} aria-label="Close">
              <X size={16} strokeWidth={2} />
            </button>
            <div className="cs-modal-img-wrap">
              <img className="cs-modal-img" src={selectedPlant.image} alt={selectedPlant.name}
                onError={e => { e.target.src = 'https://via.placeholder.com/820x340/e4e0d6/9aab9d?text=Plant'; }} />
              <div className="cs-modal-img-overlay" />
              <div className="cs-modal-img-title">
                <h2 className="cs-modal-img-name">{selectedPlant.name}</h2>
                {selectedPlant.scientificName && <p className="cs-modal-img-sci">{selectedPlant.scientificName}</p>}
              </div>
            </div>
            <div className="cs-modal-body">
              <div className="cs-modal-meta">
                <span className="cs-modal-price">{selectedPlant.price}</span>
                <div className="cs-modal-tags">
                  <span className="cs-modal-tag">{selectedPlant.category}</span>
                  {selectedPlant.featured && <span className="cs-modal-tag cs-modal-tag--dark">Editor's Pick</span>}
                </div>
              </div>
              <p className="cs-modal-info">
                {selectedPlant.info || selectedPlant.description || 'Contact us for detailed information about this plant.'}
              </p>
              <div className="cs-modal-actions">
                <button className="cs-modal-btn-primary" onClick={() => enquire(selectedPlant.name)}>
                  <Phone size={13} strokeWidth={1.5} />
                  Enquire on WhatsApp
                  <ArrowRight size={13} strokeWidth={2} />
                </button>
                <button className="cs-modal-btn-ghost" onClick={() => setSelectedPlant(null)}>
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}