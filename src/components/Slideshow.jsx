import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const slides = [
    { image: `/images/6.webp`, text: 'Welcome to Slide 1' },
    { image: `/images/10.webp`, text: 'Welcome to Slide 2' },
    { image: `/images/1.webp`, text: 'Welcome to Slide 3' },
    { image: `/images/2.webp`, text: 'Welcome to Slide 4' }
];

const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                    <img src={slide.image} alt={`Slide ${index}`} className="slide-image" />
                    <div className="slide-text">{}</div>
                </div>
            ))}
            <div className="indicators">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
