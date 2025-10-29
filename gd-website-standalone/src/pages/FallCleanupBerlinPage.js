import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupBerlinPage = () => {

  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Local Crews',
      description: 'Berlin-based teams move quickly between Kensington, East Berlin, and Worthington Ridge streets.'
    },
    {
      icon: '🧹',
      title: 'Thorough Finish',
      description: 'Beds, patios, decks, and driveways are blown clean so properties look market ready.'
    },
    {
      icon: '📅',
      title: 'Pro Scheduling',
      description: 'Route alerts + follow-up visits keep lawns clear even when late-season winds return.'
    }
  ];

  const areas = [
    'Downtown Berlin',
    'Kensington',
    'East Berlin',
    'Worthington Ridge',
    'Berlin Center',
    'Country Club Road',
    'Mill Street',
    'Christian Lane'
  ];

  const overviewHighlights = [
    'Leaf vacuums and high-capacity trailers based in Berlin keep cleanup windows tight before the next storm.',
    'Seasonal plans combine final mow/stripe, selective pruning, and perennial cutbacks for curb-ready beds.',
    'Crews revisit drain inlets along Worthington Ridge after major storms to prevent icy refreeze on aprons.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '15+', label: 'Berlin crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  return (
    <FallCleanupTemplate
      townName="Berlin, CT"
      seoTitle="Fall Cleanup Berlin CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Professional fall cleanup in Berlin, CT. Leaf removal, gutter policing, perennial cutbacks, and haul-away service for Kensington, East Berlin, and Worthington Ridge."
      seoKeywords="fall cleanup Berlin CT, leaf removal Berlin, fall yard cleanup Berlin Connecticut, gutter cleaning Berlin CT"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-berlin-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Berlin CT - GD Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization services for Berlin, Connecticut homeowners and businesses.',
        areaServed: {
          '@type': 'City',
          name: 'Berlin'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber,
          areaServed: 'Berlin, CT'
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Berlin, CT',
        title: 'Fall Cleanup Berlin CT',
        subtitle:
          'Keep Kensington, East Berlin, and Worthington Ridge properties spotless with proactive leaf removal, pruning, and winter prep.',
        addressPrompt: 'Type your Berlin address for instant fall cleanup options',
        ctaPrimaryText: 'Book Berlin Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Berlin lawns range from hilly Worthington Ridge estates to compact downtown lots. We tailor equipment and cleanup order for each neighborhood.',
        snapshotCopy: 'Our Berlin crews stay staged within town limits for rapid follow-ups after windy nights.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal, pruning, and haul-away from Kensington to East Berlin."
      quoteConfig={{
        title: 'Plan Your Berlin Fall Cleanup',
        subtitle: 'Send us your address and priorities—we’ll respond with a same-day estimate.',
        locationName: 'Berlin Fall Cleanup',
        source: 'Berlin Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Berlin Lawn?',
        body: 'Reserve your cleanup slot before schedules fill up. Seasonal packages for every property type.',
        primaryText: 'Get Berlin Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupBerlinPage;
