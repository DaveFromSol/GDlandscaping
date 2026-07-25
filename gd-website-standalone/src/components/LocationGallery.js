import React from 'react';

const galleryImages = [
  {
    src: '/snow-removal-trucks-gd-landscaping.jpeg',
    label: 'Snow removal fleet ready for winter'
  },
  {
    src: '/garden-design-gd-landscaping.jpeg',
    label: 'Custom garden design & planting'
  },
  {
    src: '/landscape-design-gd-landscaping.jpeg',
    label: 'Custom landscape construction'
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
