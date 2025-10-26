import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';

const BlogPostTemplate = ({
  title,
  description,
  canonicalUrl,
  keywords,
  publishDate,
  readingTime,
  heroOverline,
  heroTitle,
  heroSubtitle,
  sections
}) => {
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        keywords={keywords}
      />

      <article className="blog-post">
        <header className="blog-hero">
          <div className="container">
            <p className="blog-hero-overline">{heroOverline}</p>
            <h1>{heroTitle}</h1>
            <p className="blog-hero-subtitle">{heroSubtitle}</p>
            <div className="blog-meta">
              <span>{publishDate}</span>
              <span>•</span>
              <span>{readingTime} read</span>
            </div>
          </div>
        </header>

        <div className="blog-content container">
          {sections.map((section, index) => (
            <section key={`${section.heading}-${index}`} className="blog-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, idx) => (
                <p key={`p-${index}-${idx}`}>{paragraph}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point, idx) => (
                    <li key={`li-${index}-${idx}`}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="blog-cta-card">
            <h3>Need help putting this into action?</h3>
            <p>
              GD Landscaping can handle the heavy lifting so you can relax and enjoy the results. From weekly lawn care to seasonal cleanup and snow removal, we
              treat your property like our own.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-primary">
                Book a Free Consultation
              </Link>
              <a href="tel:(860) 526-7583" className="cta-secondary">
                Call (860) 526-7583
              </a>
            </div>
          </section>
        </div>

        <QuoteSection
          title="Ready for Pro-Level Results?"
          subtitle="Send property details and goals—we'll build a plan tailored to your lawn, landscape, or snow needs."
          locationName="Blog CTA"
          source={`${title} Blog Post`}
        />
      </article>
    </>
  );
};

export default BlogPostTemplate;
