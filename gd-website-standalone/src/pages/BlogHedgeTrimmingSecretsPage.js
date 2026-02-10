import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'hedge-trimming-secrets');

const sections = [
  {
    heading: 'Timing and Growth Cycles Matter',
    paragraphs: [
      'Deciduous hedges prefer a heavy cut in late winter and a light touch-up mid-summer. Evergreens do best with two lighter trims once new growth flushes out. Always start cuts at the base and work upward, keeping the hedge slightly wider at the bottom so sunlight reaches every branch.',
      'G&D Landscaping trains crews on each species so lilacs, privet, and boxwood all get the technique they deserve.'
    ]
  },
  {
    heading: 'Use the Right Tools for the Job',
    paragraphs: [
      'Long-reach shears are perfect for crisp tops, while articulated hedge trimmers shape curves and taller screens. Keep blades razor sharp and disinfect between properties to prevent disease spread. For large reductions, pair trimmers with pole saws so you’re not tearing branches.',
      'Our trucks carry on-board blade sharpeners and cleaning kits so every cut stays clean.'
    ],
    points: [
      'Wear safety glasses and hearing protection',
      'Start with rough cuts, then finish with detail shears',
      'Collect clippings immediately to avoid matting turf'
    ]
  },
  {
    heading: 'Finish with Pro-Level Cleanup and Care',
    paragraphs: [
      'Blow debris from beds, re-edge the drip line, and inspect irrigation heads that sit inside hedges. Apply a slow-release shrub fertilizer in spring and a dose of anti-desiccant on exposed evergreens before winter winds arrive.',
      'Want turnkey care? G&D Landscaping bundles trimming, feeding, and seasonal spraying so your hedges stay dense and lush without the DIY learning curve.'
    ]
  }
];

const BlogHedgeTrimmingSecretsPage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://www.gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="hedge trimming tips, shrub trimming secrets, evergreen pruning"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogHedgeTrimmingSecretsPage;
