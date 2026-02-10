import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'core-aeration-benefits');

const sections = [
  {
    heading: 'Compaction Creeps In Faster Than You Think',
    paragraphs: [
      'Heavy rains, pets, and weekly mowing compress the top few inches of soil. Once pores close, air, water, and fertilizer stop reaching the roots and grass thins almost overnight. Core aeration pops out plugs, relieves that pressure, and lets the root zone breathe again.',
      'G&D Landscaping uses commercial aerators that pull 2- to 3-inch plugs, then cross-pattern each lawn. We follow up by dragging the plugs to redisperse topsoil, acting like a mini topdressing treatment.'
    ],
    points: [
      'Plan aeration at least once per year for cool-season turf',
      'Water lightly the night before so tines pull deeper cores',
      'Pair aeration with overseeding to thicken thin spots'
    ]
  },
  {
    heading: 'Feed the Roots, Not Just the Leaves',
    paragraphs: [
      'Aeration creates open channels that deliver fertilizer straight to hungry roots. Instead of burning the surface, nutrients soak in evenly and turf rebounds with deep color. It also accelerates microbial activity so thatch breaks down naturally.',
      'Need proof? Farms and golf courses aerate multiple times per season. If you want fairway-quality grass at home, this is the move.'
    ],
    points: [
      'Apply a balanced fertilizer or organic compost within 48 hours of aeration',
      'Water deeply after fertilizing to activate nutrients',
      'Consider soil amendments (lime, gypsum) once cores are open'
    ]
  },
  {
    heading: 'Let G&D Landscaping Handle the Mess',
    paragraphs: [
      'Aeration equipment is heavy, loud, and unforgiving on slopes. Our crews handle logistics, mark irrigation heads, and clean up plugs so you can enjoy the payoff without the mud.',
      'Bonus: book aeration with overseeding or topdressing and we’ll sync the schedules automatically. One call, three pro services, zero guesswork.'
    ],
    points: [
      'Call before utilities mark new lines or pet fences',
      'Bundle aeration with fall cleanup for maximum efficiency',
      'Ask about subscription plans that lock in prime dates each year'
    ]
  }
];

const BlogCoreAerationBenefitsPage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://www.gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="core aeration Connecticut, lawn aeration benefits, overseeding tips"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogCoreAerationBenefitsPage;
