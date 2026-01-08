import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { plants } from '../data/plants';
import { Trees, Flower, Apple } from 'lucide-react';

const CategorySection = () => {
    const categories = [
        {
            name: "Forestry Plants",
            description: "Hardy trees and shrubs perfect for landscapes",
            icon: <Trees size={32} />
        },
        {
            name: "Aerial Flowering Plants",
            description: "Beautiful blooms that elevate any garden",
            icon: <Flower size={32} />
        },
        {
            name: "Fruit Plants",
            description: "Fresh, organic produce from your own garden",
            icon: <Apple size={32} />
        }
    ];

    const styles = {
        categoriesSection: {
            padding: '60px 20px',
            backgroundColor: 'oklch(0.96 0.01 40)',
        },
        sectionHeader: {
            textAlign: 'center',
            marginBottom: '50px',
        },
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'oklch(0.15 0.02 40)',
            marginBottom: '12px',
        },
        sectionSubtitle: {
            fontSize: '1.1rem',
            color: 'oklch(0.4 0.02 40)',
            maxWidth: '600px',
            margin: '0 auto',
        },
        categoriesContainer: {
            maxWidth: '1400px',
            margin: '0 auto',
        },
        categoryWrapper: {
            marginBottom: '60px',
        },
        categoryHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: 'oklch(0.96 0.01 40)',
            border: '1px solid oklch(0.85 0.02 40)',
            borderRadius: '0rem',
        },
        categoryIcon: {
            fontSize: '2.5rem',
            flexShrink: 0,
        },
        categoryInfo: {
            flex: 1,
        },
        categoryTitle: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'oklch(0.15 0.02 40)',
            margin: '0 0 4px 0',
        },
        categoryDescription: {
            fontSize: '0.95rem',
            color: 'oklch(0.4 0.02 40)',
            margin: 0,
        },
        categoryCount: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'oklch(0.25 0.04 140)',
            backgroundColor: 'oklch(0.92 0.02 40)',
            padding: '6px 12px',
            borderRadius: '20px',
            flexShrink: 0,
        },
        categorySwiper: {
            padding: '10px 5px 50px',
        },
        plantCard: {
            backgroundColor: 'oklch(0.96 0.01 40)',
            border: '1px solid oklch(0.85 0.02 40)',
            borderRadius: '0rem',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        plantCardHover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
        },
        plantImageWrapper: {
            position: 'relative',
            width: '100%',
            height: '200px',
            overflow: 'hidden',
            backgroundColor: 'oklch(0.92 0.02 40)',
        },
        plantImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
        },
        plantBadge: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'oklch(0.25 0.04 140)',
            color: 'oklch(0.96 0.01 40)',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '4px 10px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        },
        plantContent: {
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        plantName: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'oklch(0.15 0.02 40)',
            margin: '0 0 4px 0',
        },
        plantScientific: {
            fontSize: '0.85rem',
            color: 'oklch(0.4 0.02 40)',
            fontStyle: 'italic',
            margin: '0 0 8px 0',
        },
        plantDescription: {
            fontSize: '0.9rem',
            color: 'oklch(0.4 0.02 40)',
            lineHeight: '1.5',
            margin: '0 0 16px 0',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        },
        plantFooter: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid oklch(0.85 0.02 40)',
        },
        plantPrice: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'oklch(0.25 0.04 140)',
        },
        plantCta: {
            backgroundColor: 'oklch(0.25 0.04 140)',
            color: 'oklch(0.96 0.01 40)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '0rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
        },
    };

    const [hoveredCard, setHoveredCard] = React.useState(null);

    const renderCategory = (category) => {
        const categoryPlants = plants.filter(p => p.category === category.name);

        if (categoryPlants.length === 0) return null;

        return (
            <div key={category.name} style={styles.categoryWrapper}>
                <div style={styles.categoryHeader}>
                    <span style={styles.categoryIcon} aria-hidden="true">{category.icon}</span>
                    <div style={styles.categoryInfo}>
                        <h3 style={styles.categoryTitle}>{category.name}</h3>
                        <p style={styles.categoryDescription}>{category.description}</p>
                    </div>
                    <span style={styles.categoryCount}>{categoryPlants.length} plants</span>
                </div>

                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={categoryPlants.length > 3}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 15 },
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                        1280: { slidesPerView: 4, spaceBetween: 20 }
                    }}
                    style={styles.categorySwiper}
                >
                    {categoryPlants.map((plant, index) => (
                        <SwiperSlide key={`${plant.name}-${index}`}>
                            <article
                                style={{
                                    ...styles.plantCard,
                                    ...(hoveredCard === `${category.name}-${index}` ? styles.plantCardHover : {})
                                }}
                                onMouseEnter={() => setHoveredCard(`${category.name}-${index}`)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={styles.plantImageWrapper}>
                                    <img
                                        src={plant.image}
                                        alt={plant.name}
                                        loading="lazy"
                                        style={styles.plantImage}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200/f5f5f5/666?text=Plant+Image';
                                        }}
                                    />
                                    {plant.featured && (
                                        <span style={styles.plantBadge}>Featured</span>
                                    )}
                                </div>
                                <div style={styles.plantContent}>
                                    <h4 style={styles.plantName}>{plant.name}</h4>
                                    {plant.scientificName && (
                                        <p style={styles.plantScientific}>{plant.scientificName}</p>
                                    )}
                                    {plant.description && (
                                        <p style={styles.plantDescription}>{plant.description}</p>
                                    )}
                                    <div style={styles.plantFooter}>
                                        <span style={styles.plantPrice}>{plant.price}</span>
                                        <button
                                            style={styles.plantCta}
                                            aria-label={`View details for ${plant.name}`}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = 'oklch(0.25 0.04 140)';
                                                e.target.style.transform = 'translateY(-1px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'oklch(0.25 0.04 140)';
                                                e.target.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    };

    return (
        <section id="categories" style={styles.categoriesSection}>
            <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Browse Our Collection</h2>
                <p style={styles.sectionSubtitle}>
                    Discover premium plants carefully selected for your garden
                </p>
            </div>

            <div style={styles.categoriesContainer}>
                {categories.map(cat => renderCategory(cat))}
            </div>

            <style>{`
                /* Pagination Bullets (Inactive) */
                .swiper-pagination-bullet {
                    background-color: var(--muted-foreground);
                    opacity: 0.4;
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s ease;
                }

                .swiper-button-next,
                .swiper-button-prev {
                    color: oklch(0.25 0.04 140);
                    background: linear-gradient(135deg, oklch(0.98 0.01 40) 0%, oklch(0.96 0.01 40) 100%);
                    width: 52px;
                    height: 52px;
                    border-radius: 12px;
                    border: 2px solid oklch(0.88 0.02 40);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(12px);
                    opacity: 0.95;
                    z-index: 50; /* Ensure on top */
                }
                
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 22px;
                    font-weight: 900;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }
                
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    background: linear-gradient(135deg, oklch(0.25 0.04 140) 0%, oklch(0.22 0.05 140) 100%);
                    color: oklch(0.98 0.01 40);
                    transform: translateY(-2px) scale(1.08);
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.08);
                    border-color: oklch(0.25 0.04 140);
                    opacity: 1;
                }
                
                .swiper-button-next:active,
                .swiper-button-prev:active {
                    transform: translateY(-1px) scale(1.02);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
                }
                
                .swiper-pagination-bullet-active {
                    background-color: var(--primary);
                    opacity: 1;
                    width: 24px;
                    border-radius: 5px;
                }
                
                @media (max-width: 768px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        display: flex; /* Show buttons on mobile but smaller */
                        width: 40px;
                        height: 40px;
                    }

                    .swiper-button-next:after,
                    .swiper-button-prev:after {
                        font-size: 16px;
                    }

                    .section-title {
                        font-size: 2rem !important;
                    }
                    .section-subtitle {
                        font-size: 1rem !important;
                        padding: 0 16px;
                    }
                    .category-header {
                        flex-direction: column;
                        text-align: center;
                        gap: 12px !important;
                        padding: 24px !important;
                    }
                    .category-info {
                        text-align: center;
                    }
                    .category-count {
                        margin-top: 8px;
                    }
                }
            `}</style>
        </section>
    );
};

export default CategorySection;