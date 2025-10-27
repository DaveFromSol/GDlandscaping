import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'drought-resistant-landscaping-ideas');

const sections = [
  {
    heading: 'Start with Soil Prep and Mulch',
    paragraphs: [
      'Drought resistance begins below the surface. Loosen soil with compost to boost water-holding capacity, then top every bed with mulch to keep roots cool. Consider biochar or wetting agents for notoriously sandy pockets around the Connecticut River Valley.',
      'GD Landscaping incorporates soil tests into every enhancement proposal so we fix the root problem, not just the symptoms.'
    ]
  },
  {
    heading: 'Choose the Right Plant Palette',
    paragraphs: [
      'Mix native grasses (little bluestem, switchgrass) with flowering perennials like echinacea, salvia, and rudbeckia. Add evergreen structure via juniper, boxwood, or inkberry. Group plants by water needs so irrigation zones can be tuned precisely.',
      'Need inspiration? Our designers build xeriscape-inspired palettes that still feel lush and traditional.'
    ],
    points: [
      'Use drip irrigation to deliver water directly to root zones',
      'Plant in fall so roots establish before summer heat',
      'Mix heights and textures for four-season interest'
    ]
  },
  {
    heading: 'Layer Smart Irrigation and Maintenance',
    paragraphs: [
      'Upgrade to Wi-Fi-enabled controllers with soil moisture sensors so watering adjusts automatically. Schedule deep, infrequent cycles before sunrise, and audit the system twice per year for leaks or overspray.',
      'GD Landscaping’s irrigation team can retrofit existing systems, add rain sensors, and tie everything into your lawn service plan.'
    ],
    points: [
      'Inspect emitters and spray heads monthly during peak season',
      'Flush drip lines annually to prevent mineral buildup',
      'Bundle irrigation service with landscaping to keep accountability in one place'
    ]
  }
];

const BlogDroughtResistantLandscapingPage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="drought resistant landscaping CT, xeriscape ideas, low water plants"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogDroughtResistantLandscapingPage;
