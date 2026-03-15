import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupMiddletownPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Middletown Local Crews',
      description: 'Teams cover Westfield, South Farms, and the River Road corridor with efficient spring routes.'
    },
    {
      icon: '🌿',
      title: 'Full Debris Removal',
      description: 'Winter branches, matted leaves, dead annuals — all removed and hauled from your Middletown property.'
    },
    {
      icon: '📅',
      title: 'Spring Priority Booking',
      description: 'Middletown routes book up in March — secure your April slot now.'
    }
  ];

  const areas = [
    'Westfield', 'South Farms', 'River Road corridor', 'downtown Middletown',
    'Harbor area', 'Long Hill', 'Maromas', 'Staddle Hill'
  ];

  const overviewHighlights = [
    'Middletown lawns cleared of winter debris and prepped for a healthy spring growing season.',
    'Connecticut River corridor properties get extra debris attention after spring snowmelt.',
    'Wesleyan University area and downtown properties welcome — experienced with urban and suburban lots alike.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '12+', label: 'Middletown crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "Do you service the River Road area and properties near the Connecticut River in Middletown?",
      answer: "Yes. River Road and Connecticut River-adjacent Middletown properties often have extra spring debris from seasonal flooding and runoff. Our crews are experienced handling these heavier debris loads and clearing drainage areas near the river."
    },
    {
      question: "When do you start spring cleanups in Middletown?",
      answer: "Middletown spring cleanups typically begin in late March or early April. River-adjacent properties may need to wait until early April for optimal ground conditions. We'll confirm your specific window when you book."
    },
    {
      question: "Do you service the Westfield and South Farms neighborhoods?",
      answer: "Yes, both neighborhoods are on our regular Middletown routes. Westfield's larger lots and South Farms' established properties are well within our service area and receive the same professional spring cleanup service."
    },
    {
      question: "Can you handle spring cleanup for Middletown commercial properties?",
      answer: "Absolutely. We service commercial properties throughout Middletown including businesses along Washington Street and Route 9 corridor. Spring curb appeal cleanup is available for commercial and multi-family properties."
    },
    {
      question: "Do you offer spring mulch installation in Middletown?",
      answer: "Yes, fresh spring mulch is a popular add-on for Middletown properties. We remove old matted mulch, cleanly edge beds, and apply fresh material in your choice of type and color."
    },
    {
      question: "Can I get a quote for spring cleanup at my Middletown property?",
      answer: `Absolutely. Call us at ${phoneNumber} or fill out our contact form for a same-day spring cleanup quote. We'll need your address and a brief description of your property to give you an accurate estimate.`
    },
    {
      question: "Do you remove dead ornamental grasses and perennials in spring?",
      answer: "Yes. Cutting back ornamental grasses and dead perennials is a standard part of our spring cleanup. Middletown properties with established perennial gardens benefit from a thorough spring cutback to encourage healthy new growth."
    },
    {
      question: "Do you offer spring aeration in Middletown?",
      answer: "Yes. Core aeration in spring helps Middletown lawns recover from winter compaction and encourages thick, healthy growth heading into summer. We recommend combining aeration with your spring cleanup for best results."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Middletown, CT"
      seoTitle="Spring Cleanup Middletown CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Middletown, CT. Debris removal, bed edging, mulching, and lawn prep for Westfield, South Farms, and River Road neighborhoods."
      seoKeywords="spring cleanup Middletown CT, yard cleanup Middletown, spring lawn prep Middletown Connecticut, debris removal Middletown CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-middletown-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Middletown CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep services for Middletown, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'Middletown' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Middletown, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Middletown, CT',
        title: 'Spring Cleanup Middletown CT',
        subtitle: 'Start your Middletown spring right with professional debris removal, bed cleanup, and lawn prep from G&D Landscaping.',
        addressPrompt: 'Type your Middletown address for a spring cleanup quote',
        ctaPrimaryText: 'Book Middletown Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: "Middletown properties from Westfield to South Farms benefit from a professional spring cleanup that removes winter damage and sets the lawn up for a healthy season.",
        snapshotCopy: 'Middletown crews are staged locally for fast spring scheduling across all neighborhoods.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep across Middletown neighborhoods."
      quoteConfig={{
        title: 'Plan Your Middletown Spring Cleanup',
        subtitle: "Share your property details and we'll respond with a same-day estimate.",
        locationName: 'Middletown Spring Cleanup',
        source: 'Middletown Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in Middletown?',
        body: 'Book your spring cleanup before routes fill. Packages for every Middletown property size.',
        primaryText: 'Get Middletown Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupMiddletownPage;
