import React, { useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ companies }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const cloneFirstSet = () => {
      const items = track.children;
      for (let i = 0; i < companies.length; i++) {
        track.appendChild(items[i].cloneNode(true));
      }
    };

    cloneFirstSet();

    let scrollWidth = track.scrollWidth / 2;
    let currentScroll = 0;

    const animate = () => {
      currentScroll += 1;
      if (currentScroll >= scrollWidth) {
        currentScroll = 0;
      }
      track.style.transform = `translateX(${-currentScroll}px)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [companies]);

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef}>
        {companies.map((company, index) => (
          <div key={index} className="carousel-item">
            <img src={company.logo} alt={company.name} className="company-logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
