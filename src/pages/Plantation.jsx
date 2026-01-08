import React from 'react';
import '../styles/plantation.css';

const Plantation = () => {
    return (
        <div className="plantation-page-wrapper">
            <div className="plantation-contact-container">
                <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
                    <div className="contact-left-title">
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                    <input type="hidden" name="access_key" value="4193fb93-a6ed-4fbc-81b2-24bc1ddc3765" />

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="contact-inputs"
                        required
                    />
                    <input
                        type="text"
                        name="contact"
                        placeholder="Email or Phone"
                        className="contact-inputs"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        className="contact-inputs"
                        required
                    ></textarea>
                    <button type="submit">Quote your requirements</button>
                    <div style={{ marginTop: '20px' }}>
                        <a href="/" style={{ textDecoration: 'none', color: '#333' }}>← Back to Home</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Plantation;
