import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchSection from '../components/SearchSection';
import Services from '../components/Services';
import CategorySection from '../components/CategorySection';
import ContactFooter from '../components/ContactFooter';
import { Phone } from 'lucide-react';

const Home = () => {
    return (
        <div>

            <Navbar />
            <Hero />
            <SearchSection />
            <a href="tel:9900897449" className="call-now-btn">
                <Phone size={24} /> Call Now
            </a>
            <Services />
            <CategorySection />
            <ContactFooter />
        </div>
    );
};

export default Home;
