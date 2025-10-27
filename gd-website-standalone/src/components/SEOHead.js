import { useEffect } from 'react';

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/GD.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author = 'GD Landscaping',
  robots = 'index, follow',
  structuredData,
  geoRegion = 'US-CT',
  geoPlacename = 'Berlin, Connecticut',
  geoPosition = '41.6219;-72.7553'
}) => {
  useEffect(() => {
    // Helper function to update or create meta tags
    const updateMetaTag = (attr, attrValue, content) => {
      let tag = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, attrValue);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update document title
    document.title = title;

    // Update standard meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', author);
    updateMetaTag('name', 'robots', robots);

    // Add viewport if not exists
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
      document.head.appendChild(viewport);
    }

    // Geo-location tags for local SEO
    updateMetaTag('name', 'geo.region', geoRegion);
    updateMetaTag('name', 'geo.placename', geoPlacename);
    updateMetaTag('name', 'geo.position', geoPosition);
    updateMetaTag('name', 'ICBM', geoPosition)
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    
    // Update Open Graph tags (complete set)
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://www.gdlandscapingllc.com${ogImage}`;

    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:image', fullOgImage);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:site_name', 'GD Landscaping');
    updateMetaTag('property', 'og:locale', 'en_US');
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:alt', 'GD Landscaping - Professional Lawn Care and Snow Removal Services');

    // Update Twitter Card tags (complete set)
    updateMetaTag('name', 'twitter:card', twitterCard);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', fullOgImage);
    updateMetaTag('name', 'twitter:image:alt', 'GD Landscaping - Professional Lawn Care and Snow Removal Services');
    
    // Add structured data
    if (structuredData) {
      let script = document.querySelector('#structured-data');
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Add favicon if not present
    if (!document.querySelector('link[rel="icon"]')) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = '/GD.png';
      document.head.appendChild(favicon);
    }

    // Add apple-touch-icon for iOS
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = '/GD.png';
      document.head.appendChild(appleTouchIcon);
    }

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, twitterCard, author, robots, structuredData, geoRegion, geoPlacename, geoPosition]);
  
  return null; // This component doesn't render anything
};

export default SEOHead;