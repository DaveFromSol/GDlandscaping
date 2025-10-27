import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import blogPosts from '../data/blogPosts';

const BlogPage = () => {
  return (
    <>
      <SEOHead
        title="Landscaping Tips & Seasonal Guides | GD Landscaping Blog"
        description="Actionable lawn care, snow removal, and landscaping advice for Connecticut property owners. Brought to you by GD Landscaping in Berlin, CT."
        canonicalUrl="https://www.gdlandscapingllc.com/blog"
        keywords="Connecticut landscaping blog, lawn care tips CT, snow removal advice"
      />

      <section className="blog-landing-hero">
        <div className="container">
          <p className="blog-hero-overline">GD LANDSCAPING BLOG</p>
          <h1>Landscaping Advice Built for Connecticut Properties</h1>
          <p>
            Seasonal checklists, pro strategies, and design ideas to keep your property looking polished year-round. Every article comes straight from the GD
            Landscaping crews serving Hartford County.
          </p>
        </div>
      </section>

      <section className="blog-list container">
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-card">
            <p className="blog-card-overline">{post.heroOverline}</p>
            <h2>{post.title}</h2>
            <p className="blog-card-meta">
              <span>{post.publishDate}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </p>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="blog-card-link">
              Read Article →
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default BlogPage;
