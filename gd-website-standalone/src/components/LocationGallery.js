import React from 'react';

const galleryImages = [
  {
    src: '/IMG_8872.jpeg',
    label: 'Weekly mowing & crisp striping'
  },
  {
    src: '/IMG_5407.jpeg',
    label: 'Clean garden bed edging'
  },
  {
    src: '/IMG_8868.jpeg',
    label: 'Commercial property care'
  }
];

const LocationGallery = ({ townName, subtitle }) => {
  const gallerySubtitle = subtitle || `Snapshots from our crews keeping ${townName} properties sharp.`;

  return (
    <section className="location-gallery">
      <div className="container">
        <div className="section-header">
          <h2>{townName} Lawn Care Gallery</h2>
          <p className="section-subtitle">{gallerySubtitle}</p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <figure key={`${townName}-${image.src}`} className="gallery-card">
              <img
                src={image.src}
                alt={`${image.label} in ${townName}`}
                loading="lazy"
              />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationGallery;
