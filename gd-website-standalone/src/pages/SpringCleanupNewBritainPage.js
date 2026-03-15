import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupNewBritainPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'New Britain Crews',
      description: 'Local teams cover Shuttle Meadow, Elmwood, and residential neighborhoods with efficient spring routes.'
    },
    {
      icon: '🌿',
      title: 'Affordable Spring Packages',
      description: "New Britain's diverse housing stock gets transparent, competitive spring cleanup pricing."
    },
    {
      icon: '📅',
      title: 'Quick Turnaround',
      description: 'Most New Britain spring cleanups completed within 48 hours of booking confirmation.'
    }
  ];

  const areas = [
    'Shuttle Meadow', 'Elmwood', 'downtown New Britain', 'Walnut Hill',
    'East Side', 'West Side', 'South New Britain', 'Chesley Street area'
  ];

  const overviewHighlights = [
    'New Britain properties cleared of winter debris and ready for spring before your neighbors.',
    'Competitive pricing for New Britain homeowners — transparent quotes with no hidden fees.',
    'Multi-family and commercial properties welcome throughout New Britain.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '12+', label: 'New Britain crew members' },
    { value: '4.9/5', label: 'Customer rating' }
  ];

  const faqs = [
    {
      question: "Do you offer affordable spring cleanup options in New Britain?",
      answer: "Yes. We offer transparent, competitive pricing for New Britain homeowners with no hidden fees. Basic spring cleanups start with debris removal and can be customized with add-ons like mulching and edging to fit your budget."
    },
    {
      question: "Do you service all New Britain neighborhoods?",
      answer: "Yes. We serve all New Britain neighborhoods including Shuttle Meadow, Elmwood, Walnut Hill, East Side, West Side, South New Britain, and downtown. Our crews have regular routes throughout the city."
    },
    {
      question: "Can you handle multi-family properties in New Britain?",
      answer: "Absolutely. We work with New Britain landlords and property managers on multi-family spring cleanups. We coordinate access, minimize tenant disruption, and handle volume debris removal efficiently."
    },
    {
      question: "When do you start spring cleanups in New Britain?",
      answer: "New Britain spring cleanups typically begin in late March or early April. We monitor ground conditions and weather closely and will confirm your start window when you book."
    },
    {
      question: "Do you remove salt damage from New Britain properties?",
      answer: "Yes. Road salt and winter treatment residue can damage turf and beds. We clear salt-damaged mulch from beds, flush out salt deposits near driveways and walkways, and help prep damaged lawn areas for spring recovery."
    },
    {
      question: "Can I get a spring cleanup quote for my New Britain property quickly?",
      answer: `Yes. Call us at ${phoneNumber} or fill out our online form for a same-day spring cleanup quote. New Britain properties are a priority for our spring scheduling.`
    },
    {
      question: "Do you offer spring lawn care after cleanup in New Britain?",
      answer: "Yes. We offer spring cleanup bundled with ongoing lawn maintenance at a discounted rate. Many New Britain customers start with spring cleanup and transition into our bi-weekly mowing program."
    },
    {
      question: "Do you haul debris away or leave it for trash pickup?",
      answer: "We haul everything away. New Britain customers won't need to bag debris, call for bulk pickup, or make transfer station trips. Our trucks carry all material off-site in one visit."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="New Britain, CT"
      seoTitle="Spring Cleanup New Britain CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in New Britain, CT. Debris removal, bed edging, and lawn prep for Shuttle Meadow, Elmwood, and all New Britain neighborhoods."
      seoKeywords="spring cleanup New Britain CT, yard cleanup New Britain, spring lawn prep New Britain Connecticut, debris removal New Britain CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-new-britain-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup New Britain CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep services for New Britain, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'New Britain' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'New Britain, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving New Britain, CT',
        title: 'Spring Cleanup New Britain CT',
        subtitle: 'Get your New Britain property cleaned up and ready for spring with affordable, professional debris removal and lawn prep.',
        addressPrompt: 'Type your New Britain address for a spring cleanup quote',
        ctaPrimaryText: 'Book New Britain Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: "New Britain's diverse residential neighborhoods benefit from professional spring cleanup that clears winter damage and gets lawns ready for a healthy season.",
        snapshotCopy: 'Local New Britain crews complete most spring cleanups within 48 hours of booking.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep across New Britain neighborhoods."
      quoteConfig={{
        title: 'Plan Your New Britain Spring Cleanup',
        subtitle: "Share your property details and we'll respond with a same-day estimate.",
        locationName: 'New Britain Spring Cleanup',
        source: 'New Britain Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in New Britain?',
        body: 'Book your spring cleanup now. Competitive pricing for every New Britain property size.',
        primaryText: 'Get New Britain Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupNewBritainPage;
