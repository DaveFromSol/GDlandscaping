import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupBristolPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Bristol-Based Crews',
      description: 'Local crews cover Federal Hill, Forestville, and Pine Lake neighborhoods with efficient spring routes.'
    },
    {
      icon: '🌿',
      title: 'Complete Winter Cleanup',
      description: 'Dead growth, matted leaves, salt residue, and broken branches removed and hauled away.'
    },
    {
      icon: '📅',
      title: 'Flexible Scheduling',
      description: 'One-time spring cleanup or bundle with ongoing lawn care — your choice.'
    }
  ];

  const areas = [
    'Federal Hill', 'Forestville', 'Pine Lake', 'West Bristol',
    'East Bristol', 'Chippens Hill', 'downtown Bristol', 'Rockwell Avenue corridor'
  ];

  const overviewHighlights = [
    'Thorough removal of winter debris from Bristol properties before lawn care season begins.',
    'Bed edging, perennial cutbacks, and fresh mulch applications available as add-ons.',
    'Experienced with Bristol\'s mix of hillside properties and flat residential neighborhoods.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '10+', label: 'Bristol crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "When do you start spring cleanups in Bristol?",
      answer: "We typically begin Bristol spring cleanups in late March through early April, once ground conditions allow. Bristol's elevation variation means some areas thaw slightly later than others — we monitor conditions and schedule accordingly."
    },
    {
      question: "Do you service both Federal Hill and Forestville?",
      answer: "Yes, we have dedicated routes covering all Bristol neighborhoods including Federal Hill, Forestville, Pine Lake, and downtown Bristol. Our crews are familiar with the area's varied terrain and property sizes."
    },
    {
      question: "Can you handle the larger properties near Chippens Hill?",
      answer: "Absolutely. We use high-capacity equipment for larger Chippens Hill and West Bristol properties, including tow-behind vacuums and large debris trailers. Bigger lots get the commercial-grade treatment at residential pricing."
    },
    {
      question: "Do you remove debris left from winter storms?",
      answer: "Yes — fallen branches, storm debris, winter-killed annuals, and matted leaves are all part of our standard spring cleanup. Bristol saw significant wind events this past winter, so we expect heavier than usual debris removal this spring."
    },
    {
      question: "Can I bundle spring cleanup with regular mowing?",
      answer: "Absolutely. Many Bristol customers start the season with a spring cleanup then move into our weekly or bi-weekly mowing program. Bundling services gets you a discounted rate and guaranteed scheduling priority throughout the season."
    },
    {
      question: "Do you offer mulching for Bristol properties?",
      answer: "Yes, fresh mulch application is very popular in Bristol's established neighborhoods. We remove old mulch, edge beds cleanly, and apply fresh material. Pine Lake and Federal Hill properties especially benefit from a polished spring mulch application."
    },
    {
      question: "How long does a typical Bristol spring cleanup take?",
      answer: "Most Bristol residential properties take 2–5 hours depending on size and debris volume. Larger lots or properties adding mulching and aeration may require a full day. We'll give you a time estimate when we provide your quote."
    },
    {
      question: "Do you haul everything away or leave it curbside?",
      answer: "We haul everything away directly. Bristol customers won't need to bag leaves, make transfer station trips, or deal with curbside piles. Our trucks and trailers carry everything off-site in a single visit."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Bristol, CT"
      seoTitle="Spring Cleanup Bristol CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Bristol, CT. Debris removal, bed edging, mulching, and lawn prep for Federal Hill, Forestville, and Pine Lake neighborhoods."
      seoKeywords="spring cleanup Bristol CT, yard cleanup Bristol, spring lawn prep Bristol Connecticut, debris removal Bristol CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-bristol-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Bristol CT - G&D Landscaping',
        description: 'Professional spring yard cleanup, debris removal, and lawn prep services for Bristol, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'Bristol' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Bristol, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Bristol, CT',
        title: 'Spring Cleanup Bristol CT',
        subtitle: 'Get your Bristol property fresh and clean this spring with professional debris removal, bed cleanup, and lawn prep.',
        addressPrompt: 'Type your Bristol address for a spring cleanup quote',
        ctaPrimaryText: 'Book Bristol Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: 'From Federal Hill to Forestville, our Bristol crews handle every property size and terrain with professional spring cleanup services.',
        snapshotCopy: 'Bristol crews are locally staged for fast scheduling as soon as spring conditions allow.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep across Bristol neighborhoods."
      quoteConfig={{
        title: 'Plan Your Bristol Spring Cleanup',
        subtitle: "Tell us about your property and we'll respond with a same-day estimate.",
        locationName: 'Bristol Spring Cleanup',
        source: 'Bristol Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in Bristol?',
        body: 'Book your Bristol spring cleanup before slots fill up. Packages available for every property size.',
        primaryText: 'Get Bristol Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupBristolPage;
