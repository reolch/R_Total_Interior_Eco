import React from 'react';
import ImageGallery from '../components/ImageGallery';

const images = [
  '/images/2.webp',
  '/images/1.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
  '/images/7.webp',
  '/images/8.webp',
  '/images/9.webp',
  '/images/10.webp',
  '/images/11.webp',
  '/images/12.webp',
];

const Gallery = () => {
  return (
    <div>
      <main>
        <section>
          <div className="container">
            <ImageGallery images={images} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Gallery;
