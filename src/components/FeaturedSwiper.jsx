import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { plants } from '../data/plants';
import { Trees, Flower, Apple, ArrowRight, X } from 'lucide-react';

const CATEGORY_ICONS = {
  'Forestry Plants': Trees,
  'Aerial Flowering Plants': Flower,
  'Fruit Plants': Apple,
};

const CATEGORY_ACCENTS = {
  'Forestry Plants': '#4a7c59',
  'Aerial Flowering Plants': '#8a5c6b',
  'Fruit Plants': '#7a6b3a',
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  /* ── Section wrapper ── */
  .fs-section {
    background: #1c2b1e;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(74,124,89,0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(107,143,78,0.08) 0%, transparent 50%);
    padding: 100px 0 80px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Subtle dot pattern */
  .fs-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%234a7c59' fill-opacity='0.08'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Top & bottom edge fades */
  .fs-section::after {
    content: '';
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 80px;
    background: linear-gradient(to bottom, #f5f0e8, transparent);
    pointer-events: none;
  }

  .fs-bottom-fade {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 80px;
    background: linear-gradient(to top, #f5f0e8, transparent);
    pointer-events: none;
  }

  /* ── Header ── */
  .fs-header {
    text-align: center;
    margin-bottom: 60px;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  .fs-eyebrow {
    display: block;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(90,158,94,0.9);
    margin-bottom: 14px;
  }

  .fs-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 4.5vw, 3.6rem);
    font-weight: 600;
    color: rgba(245,240,232,0.95);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 16px;
  }

  .fs-title em {
    font-style: italic;
    color: rgba(90,158,94,0.9);
  }

  .fs-subtitle {
    font-size: 0.9rem;
    color: rgba(245,240,232,0.35);
    font-weight: 300;
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.75;
  }

  .fs-divider {
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(90,158,94,0.6), transparent);
    margin: 20px auto 0;
  }

  /* ── Swiper container ── */
  .fs-swiper-wrap {
    position: relative;
    z-index: 1;
    padding: 0 0 64px;
  }

  .fs-swiper {
    padding: 20px 40px 56px !important;
  }

  /* ── Plant Card ── */
  .fs-card {
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid rgba(74,124,89,0.1);
    transition:
      transform 0.4s cubic-bezier(0.22,1,0.36,1),
      box-shadow 0.4s ease;
    cursor: pointer;
  }

  .fs-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 56px rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(74,124,89,0.15);
  }

  .fs-card:hover .fs-card-img {
    transform: scale(1.06);
  }

  .fs-card-img-wrap {
    position: relative;
    height: 200px;
    overflow: hidden;
    background: #e8e3d8;
  }

  .fs-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
  }

  .fs-card-cat-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(28,43,30,0.75);
    color: rgba(245,240,232,0.9);
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
    backdrop-filter: blur(8px);
  }

  .fs-card-body {
    padding: 20px 18px 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .fs-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1c2b1e;
    margin: 0 0 4px;
    line-height: 1.2;
  }

  .fs-card-info {
    font-size: 0.8rem;
    color: #6b7c6e;
    line-height: 1.65;
    margin: 0 0 14px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 300;
  }

  .fs-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid rgba(74,124,89,0.1);
    margin-top: auto;
  }

  .fs-card-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1c2b1e;
  }

  .fs-card-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: none;
    border: 1px solid;
    border-radius: 20px;
    padding: 6px 13px;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease, gap 0.25s ease;
  }

  .fs-card-btn:hover { gap: 9px; }

  /* ── Navigation ── */
  .fs-swiper .swiper-button-prev,
  .fs-swiper .swiper-button-next {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    color: #f5f0e8;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    transition:
      background 0.35s cubic-bezier(0.22,1,0.36,1),
      color 0.35s ease,
      border-color 0.35s ease,
      box-shadow 0.35s ease,
      transform 0.35s cubic-bezier(0.22,1,0.36,1);
  }

  .fs-swiper .swiper-button-prev::after,
  .fs-swiper .swiper-button-next::after { content: ''; }

  .fs-swiper .swiper-button-prev::before,
  .fs-swiper .swiper-button-next::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-top: 1.8px solid currentColor;
    border-right: 1.8px solid currentColor;
    transition: transform 0.3s ease;
  }

  .fs-swiper .swiper-button-prev::before {
    transform: rotate(-135deg) translate(-1px, 1px);
  }
  .fs-swiper .swiper-button-next::before {
    transform: rotate(45deg) translate(-1px, 1px);
  }

  .fs-swiper .swiper-button-prev:hover,
  .fs-swiper .swiper-button-next:hover {
    background: #4a7c59;
    color: #f5f0e8;
    border-color: #4a7c59;
    transform: scale(1.12);
    box-shadow: 0 12px 30px rgba(74,124,89,0.4);
  }

  .fs-swiper .swiper-button-prev:hover::before {
    transform: rotate(-135deg) translate(-3px, 3px);
  }
  .fs-swiper .swiper-button-next:hover::before {
    transform: rotate(45deg) translate(-3px, 3px);
  }

  .fs-swiper .swiper-button-prev:active,
  .fs-swiper .swiper-button-next:active {
    transform: scale(0.95);
    transition-duration: 0.1s;
  }

  .fs-swiper .swiper-button-disabled {
    opacity: 0 !important;
    pointer-events: none;
    transform: scale(0.85) !important;
  }

  .fs-swiper .swiper-button-prev { left: 8px; }
  .fs-swiper .swiper-button-next { right: 8px; }

  /* ── Pagination ── */
  .fs-swiper .swiper-pagination {
    bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .fs-swiper .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(245,240,232,0.3);
    opacity: 1;
    margin: 0 !important;
    transition:
      width 0.4s cubic-bezier(0.22,1,0.36,1),
      background 0.4s ease,
      border-radius 0.4s ease;
  }

  .fs-swiper .swiper-pagination-bullet-active {
    width: 24px;
    height: 6px;
    border-radius: 3px;
    background: #5a9e5e;
    box-shadow: 0 2px 8px rgba(90,158,94,0.4);
  }

  /* ── Modal ── */
  .fs-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 18, 11, 0.65);
    backdrop-filter: blur(12px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
    animation: fsMFadeIn 0.25s ease forwards;
  }

  .fs-modal-box {
    background: #f9f5ee;
    border-radius: 8px;
    width: 100%;
    max-width: 740px;
    max-height: 88vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 32px 72px rgba(0,0,0,0.35);
    animation: fsMScaleUp 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  .fs-modal-img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
  }

  .fs-modal-img-overlay {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(249,245,238,0.6) 0%, transparent 100%);
    pointer-events: none;
  }

  .fs-modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(249,245,238,0.9);
    border: 1px solid rgba(74,124,89,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    color: #1c2b1e;
    transition: background 0.2s ease, transform 0.2s ease;
    backdrop-filter: blur(8px);
  }

  .fs-modal-close:hover {
    background: #1c2b1e;
    color: #f9f5ee;
    transform: scale(1.1);
  }

  .fs-modal-body {
    padding: 32px 36px 36px;
  }

  .fs-modal-meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .fs-modal-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 600;
    color: #1c2b1e;
    margin: 0 0 4px;
    line-height: 1.1;
  }

  .fs-modal-cat {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9aab9d;
    margin: 0;
  }

  .fs-modal-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem;
    font-weight: 600;
    color: #4a7c59;
    white-space: nowrap;
  }

  .fs-modal-info {
    font-size: 0.93rem;
    color: #4a5c4d;
    line-height: 1.85;
    margin: 0;
    font-weight: 300;
  }

  @keyframes fsMFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes fsMScaleUp {
    from { opacity: 0; transform: scale(0.96) translateY(14px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }

  @media (max-width: 768px) {
    .fs-section { padding: 72px 0 60px; }
    .fs-swiper { padding: 16px 16px 52px !important; }
    .fs-modal-body { padding: 24px; }
    .fs-modal-name { font-size: 1.7rem; }
    .fs-modal-img { height: 200px; }
  }

  @media (max-width: 480px) {
    .fs-swiper .swiper-button-prev,
    .fs-swiper .swiper-button-next {
      width: 36px;
      height: 36px;
    }
  }
`;

const FeaturedSwiper = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Use all plants
  const allPlants = plants;

  React.useEffect(() => {
    document.body.style.overflow = selectedPlant ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedPlant]);

  return (
    <>
      <style>{CSS}</style>

      <section className="fs-section">
        <div className="fs-bottom-fade" />

        {/* Header */}
        <div className="fs-header">
          <span className="fs-eyebrow">Our full collection</span>
          <h2 className="fs-title">
            Browse <em>all plants</em>
          </h2>
          <p className="fs-subtitle">
            Discover our complete range — from premium forestry trees to flowering beauties and fruiting wonders.
          </p>
          <div className="fs-divider" />
        </div>

        {/* Swiper */}
        <div className="fs-swiper-wrap">
          <Swiper
            className="fs-swiper"
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={allPlants.length > 4}
            autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 18 },
              1100: { slidesPerView: 4, spaceBetween: 20 },
              1400: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {allPlants.map((plant, pi) => {
              const Icon = CATEGORY_ICONS[plant.category] || Trees;
              const accent = CATEGORY_ACCENTS[plant.category] || '#4a7c59';
              return (
                <SwiperSlide key={`fs-${plant.name}-${pi}`}>
                  <article
                    className="fs-card"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    <div className="fs-card-img-wrap">
                      <img
                        className="fs-card-img"
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200/e8e3d8/9aab9d?text=Plant'; }}
                      />
                      <span className="fs-card-cat-badge">
                        <Icon size={10} strokeWidth={2} />
                        {plant.category.replace(' Plants', '').replace(' Flowering', '')}
                      </span>
                    </div>

                    <div className="fs-card-body">
                      <h4 className="fs-card-name">{plant.name}</h4>
                      {plant.info && (
                        <p className="fs-card-info">{plant.info}</p>
                      )}
                      <div className="fs-card-footer">
                        <span className="fs-card-price">{plant.price}</span>
                        <button
                          className="fs-card-btn"
                          style={{ color: accent, borderColor: accent }}
                          aria-label={`View details for ${plant.name}`}
                        >
                          Details
                          <ArrowRight size={11} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* Modal */}
      {selectedPlant && (
        <div className="fs-modal-overlay" onClick={() => setSelectedPlant(null)}>
          <div className="fs-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="fs-modal-close"
              onClick={() => setSelectedPlant(null)}
              aria-label="Close"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <img
              className="fs-modal-img"
              src={selectedPlant.image}
              alt={selectedPlant.name}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/740x280/e8e3d8/9aab9d?text=Plant'; }}
            />

            <div className="fs-modal-body">
              <div className="fs-modal-meta">
                <div>
                  <h2 className="fs-modal-name">{selectedPlant.name}</h2>
                  <p className="fs-modal-cat">{selectedPlant.category}</p>
                </div>
                <span className="fs-modal-price">{selectedPlant.price}</span>
              </div>
              <p className="fs-modal-info">
                {selectedPlant.info || selectedPlant.description || 'Detailed information about this plant is currently unavailable. Please contact us for more details.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedSwiper;
