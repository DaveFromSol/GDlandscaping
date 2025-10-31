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
    <div
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...(aspectRatio && {
          paddingBottom: `${aspectRatio}%`,
        }),
        ...(width && !aspectRatio && { width }),
        ...(height && !aspectRatio && { height }),
      }}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="optimized-image-placeholder" />
      )}

      {/* Actual image - only load when in view or priority */}
      {isInView && (
        <picture>
          {/* WebP source with priority */}
          <source srcSet={webpSrc} type="image/webp" />

          {/* Fallback to original format */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
            style={{
              objectFit,
              position: aspectRatio ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;
