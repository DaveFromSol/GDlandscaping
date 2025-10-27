import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'sustainable-landscaping-connecticut');

const sections = [
  {
    heading: 'Prioritize Pollinator-Ready Planting',
    paragraphs: [
      'Swap a portion of traditional turf for native meadows or pollinator strips. Coneflower, milkweed, and bee balm thrive in Connecticut and invite beneficial insects. Layer these beds with stone edging and drip irrigation for a clean, low-maintenance finish.',
      'GD Landscaping designs pollinator habitats that still fit within HOA and municipal guidelines so you enjoy ecology and elegance.'
    ]
  },
  {
    heading: 'Cut Fossil Fuels Out of Maintenance',
    paragraphs: [
      'Battery-powered blowers, trimmers, and mowers run quieter and cleaner than gas gear. Upgrade equipment gradually or hire a contractor who already invested in electric fleets. Pair that with robotic mowers for large estates and you’ll slash emissions without sacrificing quality.',
      'Our crews deploy electric handhelds in noise-sensitive neighborhoods and offer robotic mower leasing for acreage clients.'
    ],
    points: [
      'Schedule charging during off-peak electric rates',
      'Store batteries indoors to maximize life span',
      'Track decibel reductions to share with neighbors or boards'
    ]
  },
  {
    heading: 'Smarter Water Management = Healthier Plants',
    paragraphs: [
      'Install smart controllers, soil moisture sensors, and rainwater harvesting barrels to reduce potable water use. In planting beds, use subsurface drip or micro emitters to deliver water directly to roots. Mulch and compost improve soil health so plants need fewer resources overall.',
      'GD Landscaping’s irrigation techs can retrofit systems and connect them to weather-based controllers that update automatically.'
    ],
    points: [
      'Audit irrigation zones every spring for leaks',
      'Collect roof runoff in barrels for garden use',
      'Choose drought-tolerant turf blends for sunny slopes'
    ]
  }
];

const BlogSustainableLandscapingPage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://www.gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="sustainable landscaping CT, pollinator gardens Connecticut, electric lawn equipment"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogSustainableLandscapingPage;
