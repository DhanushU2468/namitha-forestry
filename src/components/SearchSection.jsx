import React, { useState } from 'react';
import { plants } from '../data/plants';
import { Search, Phone } from 'lucide-react';

const SearchSection = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPlants = searchTerm
        ? plants.filter(plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    const contactSeller = (plantName) => {
        const message = `Hello, I am interested in ${plantName}.`;
        window.open(`https://wa.me/9900897449?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section id="search-section">
            <h2>Search for a Plant</h2>
            <div className="search-container" style={{ position: 'relative', maxWidth: '400px', margin: '0 auto 20px' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                <input
                    type="text"
                    id="plant-search"
                    placeholder="Search for a plant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '40px', width: '100%' }}
                />
            </div>
            <div id="search-results">
                {searchTerm && filteredPlants.length === 0 && <p>No plants found.</p>}
                {filteredPlants.map((plant, index) => (
                    <div key={index} className="card">
                        <img src={plant.image} alt={plant.name} />
                        <h3>{plant.name}</h3>
                        <p><strong>Price:</strong> {plant.price}</p>
                        <p>{plant.info}</p>
                        <div className="contact-icon" onClick={() => contactSeller(plant.name)} title="Contact Seller">
                            <Phone size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SearchSection;
