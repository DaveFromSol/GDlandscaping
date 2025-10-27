import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'seasonal-lawn-care-schedule');

const sections = [
  {
    heading: 'Spring: Reboot the Soil Before Growth Explodes',
    paragraphs: [
      'Connecticut soils stay saturated well into April, so rushing onto the lawn with heavy equipment only compacts the surface. Start with debris removal and a light rake to wake dormant turf without tearing new shoots. Once the ground firms up, schedule core aeration and an organic starter fertilizer so nutrients reach the root zone.',
      'GD Landscaping crews follow a soil test-first approach in Farmington Valley. That lets us tailor products, dial in pre-emergent weed control, and time the first mow when grass hits 3.5 inches—not a day sooner.'
    ],
    points: [
      'Keep mower blades at 3 to 3.5 inches on the first few passes',
      'Use pre-emergent before the soil hits 55°F for five days',
      'Spot seed bare areas after aeration for faster fill-in'
    ]
  },
  {
    heading: 'Summer: Protect Against Heat, Foot Traffic, and Weeds',
    paragraphs: [
      'Summer schedules are all about consistency. Deep, infrequent watering keeps roots chasing moisture, while weekly mowing prevents the shredded tips that invite disease. Edge hardscapes every other visit, and inspect irrigation zones to make sure spray heads aren’t painting the sidewalk.',
      'Our GD Landscaping maintenance plans include mid-season blade sharpening, irrigation tune-ups, and optional grub control so lawns stay thick and tournament-ready even through August humidity.'
    ],
    points: [
      'Water 1 inch per week before dawn to reduce evaporation',
      'Alternate mowing patterns to avoid ruts and scorch marks',
      'Feed with a slow-release fertilizer to maintain color without surge growth'
    ]
  },
  {
    heading: 'Fall + Winter: Store Energy and Clear the Canvas',
    paragraphs: [
      'September through November is prime time for topdressing, overseeding, and fall fertilizer. Tackle leaves weekly so turf can keep photosynthesizing, then plan a final high cut paired with core aeration to relieve compaction. Before the first freeze, winterize irrigation lines and mark driveway edges for the snow crew.',
      'Want a shortcut? GD Landscaping bundles fall cleanup, irrigation blowouts, and snow staking so you only make one call and enjoy a seamless handoff into winter.'
    ],
    points: [
      'Apply balanced fertilizer 4-6 weeks before the ground freezes',
      'Prioritize gutter cleaning to prevent ice dams spilling into beds',
      'Schedule snow removal early to lock in preferred time slots'
    ]
  }
];

const BlogSeasonalLawnCarePage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://www.gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="seasonal lawn care CT, spring lawn schedule, summer mowing tips"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogSeasonalLawnCarePage;
