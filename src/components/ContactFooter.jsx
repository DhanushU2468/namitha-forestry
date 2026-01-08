import React from 'react';
import { Mail, MessageSquare, Phone, Facebook, Twitter, Linkedin, MapPin, User } from 'lucide-react';

const ContactFooter = () => {
    const [hoveredButton, setHoveredButton] = React.useState(null);
    const [hoveredSocial, setHoveredSocial] = React.useState(null);

    const handleEmail = () => {
        window.location.href = 'mailto:danushumesh79@gmail.com';
    };

    const handleSMS = () => {
        window.location.href = 'sms:9900897449?body=Hello%20Namitha%20Forestry';
    };

    const styles = {
        contactSection: {
            padding: '80px 20px',
            background: 'linear-gradient(135deg, var(--primary) 0%, oklch(0.20 0.05 140) 100%)',
            position: 'relative',
            overflow: 'hidden',
        },
        backgroundPattern: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            pointerEvents: 'none',
        },
        contactContainer: {
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
        },
        contactLabel: {
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--muted)',
            marginBottom: '16px',
        },
        contactBox: {
            backgroundColor: 'var(--card)',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2)',
            border: '1px solid var(--border)',
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
            paddingBottom: '24px',
            borderBottom: '2px solid var(--border)',
        },
        companyName: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--primary)',
            marginBottom: '8px',
        },
        tagline: {
            fontSize: '0.95rem',
            color: 'var(--muted-foreground)',
            fontStyle: 'italic',
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
        },
        infoCard: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '20px',
            backgroundColor: 'var(--background)',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
        },
        iconWrapper: {
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary) 0%, oklch(0.22 0.05 140) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        infoContent: {
            flex: 1,
        },
        infoLabel: {
            fontSize: '0.8rem',
            fontWeight: '600',
            color: 'var(--muted-foreground)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '4px',
        },
        infoText: {
            fontSize: '0.95rem',
            color: 'var(--foreground)',
            lineHeight: '1.5',
            margin: 0,
        },
        callButton: {
            marginBottom: '24px',
        },
        callLink: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '18px 32px',
            background: 'linear-gradient(135deg, var(--primary) 0%, oklch(0.22 0.05 140) 100%)',
            color: 'var(--primary-foreground)',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '700',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '2px solid transparent',
        },
        contactActions: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
        },
        actionButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '16px 24px',
            border: '2px solid var(--primary)',
            backgroundColor: 'var(--card)',
            color: 'var(--primary)',
            borderRadius: '12px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        },
        shareSection: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            paddingTop: '32px',
            borderTop: '2px solid var(--border)',
        },
        shareLabel: {
            fontSize: '0.95rem',
            fontWeight: '600',
            color: 'var(--muted-foreground)',
        },
        socialLinks: {
            display: 'flex',
            gap: '12px',
        },
        socialLink: {
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--card)',
            border: '2px solid var(--border)',
            color: 'var(--muted-foreground)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            textDecoration: 'none',
        },
        footer: {
            backgroundColor: 'var(--primary)',
            padding: '24px 20px',
            textAlign: 'center',
        },
        footerText: {
            color: 'var(--primary-foreground)',
            fontSize: '0.9rem',
            margin: 0,
        },
        '@media (max-width: 768px)': {
            contactBox: {
                padding: '32px 24px',
                borderRadius: '16px',
            },
            infoGrid: {
                gridTemplateColumns: '1fr',
            },
            contactActions: {
                gridTemplateColumns: '1fr',
            },
        },
    };

    const getButtonStyle = (buttonName) => ({
        ...styles.actionButton,
        ...(hoveredButton === buttonName && {
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }),
    });

    const getSocialStyle = (socialName) => ({
        ...styles.socialLink,
        ...(hoveredSocial === socialName && {
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            transform: 'translateY(-3px) scale(1.05)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        }),
    });

    return (
        <>
            <section id="contact" style={styles.contactSection}>
                <div style={styles.backgroundPattern}></div>
                <div style={styles.contactContainer}>
                    <div style={styles.contactLabel}>
                        Get in Touch
                    </div>

                    <div style={styles.contactBox}>
                        <div style={styles.header}>
                            <h2 style={styles.companyName}>Namitha Forestry</h2>
                            <p style={styles.tagline}>Growing Green, Growing Together</p>
                        </div>

                        <div style={styles.infoGrid}>
                            <div style={styles.infoCard}>
                                <div style={styles.iconWrapper}>
                                    <User size={20} color="oklch(0.98 0.01 40)" />
                                </div>
                                <div style={styles.infoContent}>
                                    <div style={styles.infoLabel}>Managing Director</div>
                                    <p style={styles.infoText}>Umesh S N</p>
                                </div>
                            </div>

                            <div style={styles.infoCard}>
                                <div style={styles.iconWrapper}>
                                    <MapPin size={20} color="oklch(0.98 0.01 40)" />
                                </div>
                                <div style={styles.infoContent}>
                                    <div style={styles.infoLabel}>Location</div>
                                    <p style={styles.infoText}>
                                        Nandi (Post), Chikkaballapur<br />
                                        Karnataka - 562103, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={styles.callButton}>
                            <a
                                href="tel:9900897449"
                                style={styles.callLink}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                <Phone size={22} />
                                <span>Call: 9900897449</span>
                            </a>
                        </div>

                        <div style={styles.contactActions}>
                            <button
                                style={getButtonStyle('email')}
                                onClick={handleEmail}
                                onMouseEnter={() => setHoveredButton('email')}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                <Mail size={18} />
                                <span>Send Email</span>
                            </button>

                            <button
                                style={getButtonStyle('sms')}
                                onClick={handleSMS}
                                onMouseEnter={() => setHoveredButton('sms')}
                                onMouseLeave={() => setHoveredButton(null)}
                            >
                                <MessageSquare size={18} />
                                <span>Send SMS</span>
                            </button>
                        </div>

                        <div style={styles.shareSection}>
                            <span style={styles.shareLabel}>Connect With Us:</span>
                            <div style={styles.socialLinks}>
                                <a
                                    href="#"
                                    style={getSocialStyle('facebook')}
                                    onMouseEnter={() => setHoveredSocial('facebook')}
                                    onMouseLeave={() => setHoveredSocial(null)}
                                    aria-label="Facebook"
                                >
                                    <Facebook size={20} />
                                </a>
                                <a
                                    href="#"
                                    style={getSocialStyle('twitter')}
                                    onMouseEnter={() => setHoveredSocial('twitter')}
                                    onMouseLeave={() => setHoveredSocial(null)}
                                    aria-label="Twitter"
                                >
                                    <Twitter size={20} />
                                </a>
                                <a
                                    href="#"
                                    style={getSocialStyle('linkedin')}
                                    onMouseEnter={() => setHoveredSocial('linkedin')}
                                    onMouseLeave={() => setHoveredSocial(null)}
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={styles.footer}>
                <p style={styles.footerText}>
                    &copy; 2025 Namitha Forestry. All rights reserved.
                </p>
            </footer>

            <style>{`
                @media (max-width: 768px) {
                    section[id="contact"] > div > div:last-child {
                        padding: 32px 24px !important;
                        border-radius: 16px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default ContactFooter;