import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupWestHartfordPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'West Hartford Crews',
      description: 'Local teams cover Bishops Corner, West Hartford Center, and Elmwood with efficient spring routes.'
    },
    {
      icon: '🌿',
      title: 'Upscale Property Care',
      description: "West Hartford's established neighborhoods get meticulous spring cleanup with attention to detail."
    },
    {
      icon: '📅',
      title: 'Premium Scheduling',
      description: 'West Hartford routes book very fast — February booking is strongly recommended.'
    }
  ];

  const areas = [
    'West Hartford Center', 'Bishops Corner', 'Elmwood', 'Quaker Lane area',
    'Trout Brook', 'Prospect Avenue corridor', 'Fern Street area', 'Buena Vista Road'
  ];

  const overviewHighlights = [
    "West Hartford's meticulously maintained properties deserve a spring cleanup that matches their standards.",
    'High-demand neighborhoods like Bishops Corner and Prospect Avenue get priority scheduling.',
    'Mature tree canopy means heavier spring debris loads — we bring the right volume equipment.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '15+', label: 'West Hartford crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "When should I book spring cleanup for my West Hartford property?",
      answer: "We recommend booking in February for West Hartford spring cleanups. West Hartford is one of our most in-demand markets and April slots fill up quickly. Early booking guarantees your preferred week and priority crew assignment."
    },
    {
      question: "Do you service all West Hartford neighborhoods including Bishops Corner and Elmwood?",
      answer: "Yes. We have dedicated routes covering all West Hartford neighborhoods — West Hartford Center, Bishops Corner, Elmwood, Quaker Lane, Trout Brook, and Prospect Avenue. Our crews are very familiar with West Hartford's streets and property styles."
    },
    {
      question: "Can you handle the mature tree debris on West Hartford properties?",
      answer: "Yes. West Hartford's mature oak, maple, and beech trees create heavy spring debris loads. We bring high-capacity leaf vacuums and volume trailers for properties with significant mature canopy cover. The Prospect Avenue and Fern Street areas are well known for their beautiful but debris-heavy trees."
    },
    {
      question: "Do you offer premium spring cleanup packages for larger West Hartford properties?",
      answer: "Yes. For larger West Hartford estates we offer comprehensive spring packages that include debris removal, full bed edging, fresh mulch, perennial cutbacks, lawn dethatching, and aeration. We'll customize a package to match your property's specific needs."
    },
    {
      question: "Can you clean up after winter damage to my West Hartford landscape?",
      answer: "Yes. Winter salt damage, broken branches, and dead annuals are all part of our spring cleanup scope. We assess damage during the cleanup and can recommend additional repair services like overseeding or shrub replacement if needed."
    },
    {
      question: "Do you offer spring mulching in West Hartford?",
      answer: "Yes, and it's extremely popular in West Hartford. Fresh spring mulch instantly elevates curb appeal and is one of the most impactful improvements you can make in a single visit. We work with your preferred mulch type and color."
    },
    {
      question: "Can I get ongoing lawn care starting with spring cleanup in West Hartford?",
      answer: "Absolutely. Many West Hartford customers start with spring cleanup and transition into our weekly lawn care program. Bundling cleanup with ongoing service gets you discounted pricing and guaranteed scheduling priority throughout the season."
    },
    {
      question: "Do you offer spring aeration and overseeding in West Hartford?",
      answer: "Yes. Spring aeration is highly recommended for West Hartford lawns that experienced compaction from snow plowing or heavy winter foot traffic. Combined with overseeding, it gives West Hartford lawns the thick, lush look homeowners expect."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="West Hartford, CT"
      seoTitle="Spring Cleanup West Hartford CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in West Hartford, CT. Debris removal, bed edging, mulching, and lawn prep for Bishops Corner, West Hartford Center, and Elmwood."
      seoKeywords="spring cleanup West Hartford CT, yard cleanup West Hartford, spring lawn prep West Hartford Connecticut, debris removal West Hartford CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-west-hartford-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup West Hartford CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep for West Hartford, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'West Hartford' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'West Hartford, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving West Hartford, CT',
        title: 'Spring Cleanup West Hartford CT',
        subtitle: "Give your West Hartford property a polished spring start with professional debris removal, bed edging, mulching, and lawn prep.",
        addressPrompt: 'Type your West Hartford address for a spring cleanup quote',
        ctaPrimaryText: 'Book West Hartford Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: "West Hartford's beautiful, well-established neighborhoods deserve a spring cleanup that meets their high standards — meticulous debris removal, crisp bed edging, and fresh mulch.",
        snapshotCopy: "West Hartford crews bring the premium equipment West Hartford properties expect — every spring, every time."
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Premium spring cleanup for West Hartford's most beautiful neighborhoods."
      quoteConfig={{
        title: 'Plan Your West Hartford Spring Cleanup',
        subtitle: "Share your property details and we'll respond with a same-day estimate.",
        locationName: 'West Hartford Spring Cleanup',
        source: 'West Hartford Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in West Hartford?',
        body: "Book early — West Hartford spring routes fill fast. Premium packages for every property size.",
        primaryText: 'Get West Hartford Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupWestHartfordPage;
