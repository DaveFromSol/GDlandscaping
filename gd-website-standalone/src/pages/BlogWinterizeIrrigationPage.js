import React from 'react';
import BlogPostTemplate from './BlogPostTemplate';
import blogPosts from '../data/blogPosts';

const meta = blogPosts.find((post) => post.slug === 'winterize-irrigation-systems');

const sections = [
  {
    heading: 'Start with Smart Timing and Water Shutoff',
    paragraphs: [
      'The first frost typically hits Hartford County in late October, but underground pipes can freeze even earlier. Shut off the irrigation supply inside your basement or mechanical room, then open the outdoor drain to relieve pressure. Label the valve so nobody accidentally turns it back on mid-winter.',
      'GD Landscaping techs photograph each step and tag valves for quick spring startups—no guesswork required.'
    ]
  },
  {
    heading: 'Blow Out Each Zone with Regulated Air Pressure',
    paragraphs: [
      'Professional contractors use tow-behind compressors with adjustable regulators. Too little pressure leaves water behind; too much pressure cracks fittings. We recommend 50–60 PSI for residential systems and purge zones one at a time until only mist exits the heads.',
      'Always remove backflow preventers before blowing out the system and store them indoors to protect the delicate internals.'
    ],
    points: [
      'Wear eye and ear protection during blowouts',
      'Purge drip zones last—they require the least pressure',
      'Document any damaged heads so repairs happen before spring'
    ]
  },
  {
    heading: 'Finish with Controller, Sensor, and Backflow Prep',
    paragraphs: [
      'Turn the controller to “off” or “rain mode,” remove controller batteries, and store rain sensors indoors. Wrap exposed pipes and backflow assemblies with insulated covers to block wind chill. Bonus: take photos of each zone map so you can hand them to your lawn crew next year.',
      'Prefer not to crawl around the basement? GD Landscaping offers turnkey irrigation winterization bundled with fall cleanup and snow staking.'
    ],
    points: [
      'Label wiring and valves for easy troubleshooting later',
      'Schedule spring start-up when you book the blowout to secure preferred dates',
      'Ask about smart controller upgrades that automate seasonal adjustments'
    ]
  }
];

const BlogWinterizeIrrigationPage = () => (
  <BlogPostTemplate
    title={meta.title}
    description={meta.excerpt}
    canonicalUrl={`https://www.gdlandscapingllc.com/blog/${meta.slug}`}
    keywords="winterize irrigation CT, sprinkler blowout tips, irrigation shutoff"
    publishDate={meta.publishDate}
    readingTime={meta.readingTime}
    heroOverline={meta.heroOverline}
    heroTitle={meta.title}
    heroSubtitle={meta.excerpt}
    sections={sections}
  />
);

export default BlogWinterizeIrrigationPage;
