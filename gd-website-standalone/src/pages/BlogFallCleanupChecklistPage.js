import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'fall-cleanup-checklist');

const sections = [
  {
    heading: 'Step 1: Remove Leaves Before They Smother Turf',
    paragraphs: [
      'Leaves left more than a week trap moisture, block sunlight, and invite snow mold. Start with a high-mow to chop light debris, then break out backpack blowers or vacuums for heavier layers. Don’t forget decks, patios, and AC units.',
      'GD Landscaping runs weekly leaf routes in Hartford County so lawns stay breathable even during peak drop. We can haul debris away or stage it curbside per town rules.'
    ],
    points: [
      'Schedule cleanup every 7–10 days during peak fall',
      'Mulch mow thin layers to feed the soil naturally',
      'Keep curb drains clear to prevent street flooding'
    ]
  },
  {
    heading: 'Step 2: Cut Back, Edge, and Prep Beds',
    paragraphs: [
      'Perennials, ornamental grasses, and summer annuals need a clean cut to reduce disease pressure. Edge beds, top with fresh mulch, and inspect irrigation drip lines before winter. This protects the crown of the plant and keeps everything tidy until spring color returns.',
      'Our cleanup crews pair pruning with bed maintenance so homeowners only have to approve the design plan once each season.'
    ],
    points: [
      'Cut most grasses to 4–6 inches; leave seed heads on varieties that feed birds',
      'Trim shrubs after they finish blooming to avoid removing next year’s buds',
      'Touch up mulch with a light 1-inch layer for insulation'
    ]
  },
  {
    heading: 'Step 3: Final Mow, Gutter Check, and Equipment Winterization',
    paragraphs: [
      'Drop mowing height a half inch on the final pass to discourage matting, then blow out gutters so thawing snow doesn’t overflow onto walks. Winterize irrigation lines and fuel-stabilize small equipment so spring start-up is painless.',
      'Want the easy button? Bundle fall cleanup, gutter work, and irrigation blowouts with GD Landscaping and our project manager handles every appointment.'
    ],
    points: [
      'Mark driveway edges for the snow crew before the first storm',
      'Store patio furniture and planters in a dry space',
      'Book snow removal early to guarantee service windows'
    ]
  }
];

const BlogFallCleanupChecklistPage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://www.gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="fall cleanup checklist, Hartford fall cleanup, leaf removal tips"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogFallCleanupChecklistPage;
