import React, { useState, useEffect, useRef } from 'react';
import './OptimizedImage.css';

/**
 * OptimizedImage Component
 *
 * A performance-optimized image component for React that provides:
 * - Automatic WebP format with fallback
 * - Lazy loading support
 * - Loading placeholder
 * - Proper width/height to prevent layout shift
 * - Priority loading for above-the-fold images
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
  quality = 75,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef();

  // Get WebP version of the image
  const getWebPSrc = (originalSrc) => {
    if (!originalSrc) return '';

    // If it's already a WebP, return as is
    if (originalSrc.endsWith('.webp')) return originalSrc;

    // Replace extension with .webp
    const parts = originalSrc.split('.');
    if (parts.length > 1) {
      parts[parts.length - 1] = 'webp';
      return parts.join('.');
    }

    return originalSrc;
  };

  const webpSrc = getWebPSrc(src);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const aspectRatio = width && height ? (height / width) * 100 : null;

  return (
    <picture
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={props.style}
    >
      {/* WebP source with priority */}
      {isInView && <source srcSet={webpSrc} type="image/webp" />}

      {/* Fallback to original format */}
      {isInView ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          className={`optimized-image ${isLoaded ? 'loaded' : ''} ${className}`}
          {...props}
        />
      ) : (
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
          alt={alt}
          width={width}
          height={height}
          className={`optimized-image-placeholder ${className}`}
          style={props.style}
        />
      )}
    </picture>
  );
};

export default OptimizedImage;
