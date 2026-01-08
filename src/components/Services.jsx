import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, LandPlot, Route, Spade } from 'lucide-react';

const Services = () => {
    return (
        <section id="services">
            <h2>Our Services</h2>
            <div className="services">
                <div className="card">
                    <Link to="/plantation">
                        <div style={{ marginBottom: '15px', color: 'var(--primary)' }}>
                            <TreePine size={48} />
                        </div>
                        <h3>Plantation</h3>
                        <p>Professional plantation services for your land.</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/plantation">
                        <div style={{ marginBottom: '15px', color: 'var(--primary)' }}>
                            <LandPlot size={48} />
                        </div>
                        <h3>Real Estate</h3>
                        <p>Enhance your real estate with beautiful plants.</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/plantation">
                        <div style={{ marginBottom: '15px', color: 'var(--primary)' }}>
                            <Route size={48} />
                        </div>
                        <h3>Roadside</h3>
                        <p>Beautify roadsides with eco-friendly greenery.</p>
                    </Link>
                </div>
                <div className="card">
                    <Link to="/plantation">
                        <div style={{ marginBottom: '15px', color: 'var(--primary)' }}>
                            <Spade size={48} />
                        </div>
                        <h3>Landscaping</h3>
                        <p>Transform spaces with stunning landscaping designs.</p>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
