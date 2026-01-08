import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(200);

    const toRotate = [
        "Hi, Looking for Forestry plants",
        "Your one stop solution to forestry plants",
        "looking for Mahogany plantation ",
        "interested in sandalwood plantation"
    ];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [text, delta]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullTxt = toRotate[i];
        let updatedText = isDeleting ? fullTxt.substring(0, text.length - 1) : fullTxt.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullTxt) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(200); // Reset speed
        } else {
            // Normal typing speed
            if (!isDeleting) setDelta(200 - Math.random() * 100);
        }
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <h1>Namitha Forestry</h1>
                <div className="typewriter-container">
                    <span className="typewrite">
                        <span className="wrap">{text}</span>
                    </span>
                </div>
                <p className="hero-subtitle">Quality forestry plants for a greener tomorrow.</p>
                <a href="#categories" className="hero-cta" onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#categories').scrollIntoView({ behavior: 'smooth' });
                }}>
                    Browse Catalogue
                </a>
            </div>
        </section>
    );
};

export default Hero;
