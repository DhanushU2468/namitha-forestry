import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <a href="#home" onClick={(e) => handleScroll(e, '#home')}>Namitha Forestry</a>
                </div>

                <div className="mobile-menu-btn" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <a href="#home" onClick={(e) => handleScroll(e, '#home')}>Home</a>
                    <a href="#services" onClick={(e) => handleScroll(e, '#services')}>Services</a>
                    <a href="#categories" onClick={(e) => handleScroll(e, '#categories')}>Categories</a>
                    <a href="#contact" onClick={(e) => handleScroll(e, '#contact')}>Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
