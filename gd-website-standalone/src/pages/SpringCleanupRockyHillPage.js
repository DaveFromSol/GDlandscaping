import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupRockyHillPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Rocky Hill Crews',
      description: 'Teams cover West Street, Dividend Road, and residential neighborhoods with spring-ready equipment.'
    },
    {
      icon: '🌿',
      title: 'River Valley Expertise',
      description: 'Connecticut River valley properties handled with care — extra debris removal for flood-adjacent lots.'
    },
    {
      icon: '📅',
      title: 'Early Season Slots',
      description: 'Rocky Hill spring routes book fast. February booking guarantees April availability.'
    }
  ];

  const areas = [
    'Rocky Hill Center', 'West Street area', 'Dividend Road', 'Old Main Street',
    'Elm Street', 'Connecticut River waterfront', 'Corporate Ridge area', 'Glastonbury Avenue corridor'
  ];

  const overviewHighlights = [
    'Rocky Hill properties cleared of winter debris before the spring growing season.',
    'River valley and low-lying areas get extra debris and drainage cleanup attention.',
    'Competitive suburban rates for Rocky Hill homeowners — transparent quotes every time.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '10+', label: 'Rocky Hill crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "Do you service Connecticut River waterfront properties in Rocky Hill?",
      answer: "Yes. Rocky Hill's river waterfront properties often accumulate extra debris from spring flooding and snowmelt. We're experienced handling these conditions and clear drainage areas and low-lying zones near the river with appropriate equipment."
    },
    {
      question: "When do you start spring cleanups in Rocky Hill?",
      answer: "Rocky Hill spring cleanups start in late March or early April. Low-lying and river-adjacent properties may need to wait until ground conditions firm up in early April. We'll confirm your specific start window when you book."
    },
    {
      question: "Do you service the Dividend Road and Corporate Ridge areas?",
      answer: "Yes. Both residential and light commercial properties along Dividend Road and Corporate Ridge are within our Rocky Hill service area. We service everything from small residential lots to larger commercial grounds."
    },
    {
      question: "Do you remove winter salt residue from Rocky Hill properties?",
      answer: "Yes. Salt residue from Rocky Hill's well-maintained road network can damage turf edges and bed plants. We clear salt-damaged mulch and flush out residue near driveways and walkways as part of our spring prep."
    },
    {
      question: "Can I bundle spring cleanup with mowing in Rocky Hill?",
      answer: "Yes and we recommend it. Rocky Hill customers who bundle spring cleanup with weekly mowing get discounted rates on both and priority scheduling throughout the season."
    },
    {
      question: "Do you offer spring mulching in Rocky Hill?",
      answer: "Yes. Fresh spring mulch is a top add-on for Rocky Hill properties. We remove old mulch, edge cleanly, and apply fresh material. Most Rocky Hill beds look significantly better with a spring mulch refresh."
    },
    {
      question: "How long does a typical Rocky Hill spring cleanup take?",
      answer: "Most Rocky Hill residential properties take 2–4 hours. River-adjacent properties with heavier debris may take slightly longer. We'll give you an accurate estimate when we confirm your quote."
    },
    {
      question: "Do you offer spring aeration in Rocky Hill?",
      answer: "Yes. Spring core aeration is very effective for Rocky Hill lawns that experienced winter compaction or salt damage. Combining aeration with overseeding gives Rocky Hill lawns a strong start to the growing season."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Rocky Hill, CT"
      seoTitle="Spring Cleanup Rocky Hill CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Rocky Hill, CT. Debris removal, bed edging, mulching, and lawn prep for Rocky Hill Center, Dividend Road, and Connecticut River neighborhoods."
      seoKeywords="spring cleanup Rocky Hill CT, yard cleanup Rocky Hill, spring lawn prep Rocky Hill Connecticut, debris removal Rocky Hill CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-rocky-hill-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Rocky Hill CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep for Rocky Hill, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'Rocky Hill' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Rocky Hill, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Rocky Hill, CT',
        title: 'Spring Cleanup Rocky Hill CT',
        subtitle: 'Get your Rocky Hill property cleaned up and ready for spring with professional debris removal, bed cleanup, and lawn prep.',
        addressPrompt: 'Type your Rocky Hill address for a spring cleanup quote',
        ctaPrimaryText: 'Book Rocky Hill Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: "Rocky Hill's Connecticut River valley setting and suburban neighborhoods benefit from a thorough spring cleanup that removes winter damage and preps lawns for summer.",
        snapshotCopy: 'Rocky Hill crews are staged locally for fast spring scheduling as soon as conditions allow.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep across Rocky Hill neighborhoods."
      quoteConfig={{
        title: 'Plan Your Rocky Hill Spring Cleanup',
        subtitle: "Share your property details and we'll respond with a same-day estimate.",
        locationName: 'Rocky Hill Spring Cleanup',
        source: 'Rocky Hill Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in Rocky Hill?',
        body: 'Book your spring cleanup before routes fill. Packages for every Rocky Hill property size.',
        primaryText: 'Get Rocky Hill Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupRockyHillPage;
