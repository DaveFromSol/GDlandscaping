import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'mulch-edging-curb-appeal');

const sections = [
  {
    heading: 'Choose the Right Mulch Texture and Color',
    paragraphs: [
      'Dark brown or black mulch delivers the strongest contrast against Connecticut greenery, while shredded bark locks in moisture longer than nuggets. Aim for a two-inch layer—anything deeper suffocates roots. Refresh high-traffic beds every spring and color-intensive display beds twice per season.',
      'GD Landscaping sources mulch from local mills and blows it in place for a uniform, never-streaky finish.'
    ],
    points: [
      'Avoid dyed mulch near vegetable beds or play areas',
      'Keep mulch three inches away from tree trunks to prevent rot',
      'Use stone in drainage zones where mulch might wash out'
    ]
  },
  {
    heading: 'Edge Beds Like a Pro',
    paragraphs: [
      'A crisp edge is the difference between tidy and chaotic. Use a steel edging spade or mechanical bed edger to cut a 4-inch-deep trench, then slope the lawn side slightly. This keeps mulch locked in, defines the bed, and guides string trimmers along a predictable line.',
      'Our crews edge before mulching, blow debris away, and finish with a quick turf touch-up so the line stays razor sharp.'
    ]
  },
  {
    heading: 'Layer Plant Material for Instant Dimension',
    paragraphs: [
      'Combine evergreen anchors, mid-height flowering shrubs, and seasonal color to create depth. Repeat plant groupings in odd numbers for a designer look, and leave space for annual color pots near walkways and entry stoops.',
      'If design isn’t your thing, GD Landscaping’s enhancement team can create a phased plan so you can upgrade beds gradually without sacrificing curb appeal.'
    ],
    points: [
      'Add low-voltage lighting to highlight clean edges at night',
      'Use drip irrigation or soaker hoses beneath mulch to reduce evaporation',
      'Plan fall bulb plantings while beds are already open'
    ]
  }
];

const BlogMulchEdgingCurbAppealPage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="mulch edging tips, curb appeal landscaping, bed edging guide"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogMulchEdgingCurbAppealPage;
