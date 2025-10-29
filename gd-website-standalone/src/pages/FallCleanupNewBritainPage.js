import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupNewBritainPage = () => {

  const serviceHighlights = [
    {
      icon: '🏘️',
      title: 'Neighborhood Pros',
      description: 'We know every downtown alley and condo courtyard, so crews move quickly without missing details.'
    },
    {
      icon: '🧺',
      title: 'Full Disposal',
      description: 'Leaf haul-away, sweeping, and final mow leave properties ready for winter.'
    },
    {
      icon: '📲',
      title: 'Easy Updates',
      description: 'Route notifications let homeowners and property managers know when crews are on the way.'
    }
  ];

  const areas = [
    'Downtown New Britain',
    'Little Poland',
    'Belvedere',
    'Sloper',
    'West End',
    'East Side',
    'South End',
    'Hardware City industrial zone'
  ];

  const overviewHighlights = [
    'Compact crews handle tight city lots while larger teams service Belvedere and suburban neighborhoods.',
    'Leaf vacuums and sweepers manage storefront sidewalks along Broad Street and Main Street overnight.',
    'Industrial and condo clients receive scheduled follow-ups to keep drains clear before freeze-up.'
  ];

  const serviceStats = [
    { value: '25', label: 'City blocks serviced daily' },
    { value: '6', label: 'Dedicated crews' },
    { value: '4.9/5', label: 'Local rating' }
  ];

  return (
    <FallCleanupTemplate
      townName="New Britain, CT"
      seoTitle="Fall Cleanup New Britain CT | Leaf Removal & Seasonal Cleanup | GD Landscaping"
      seoDescription="Leaf removal and fall cleanups across New Britain, CT. Serving Little Poland, Belvedere, Sloper, and downtown corridors."
      seoKeywords="fall cleanup New Britain CT, leaf removal New Britain, yard cleanup New Britain Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-new-britain-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup New Britain CT - GD Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization for homes and businesses throughout New Britain, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'New Britain'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving New Britain, CT',
        title: 'Fall Cleanup New Britain CT',
        subtitle:
          'Leaf removal, pruning, and cleanup for downtown apartments, Little Poland storefronts, Belvedere homes, and more.',
        addressPrompt: 'Type your New Britain address for instant fall cleanup options',
        ctaPrimaryText: 'Book New Britain Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Hardware City properties vary from tight city lots to sprawling neighborhoods. We tailor crews for each street.',
        snapshotCopy: 'Supervisors keep crews rotating through the city for quick follow-ups after windy nights.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal and cleanup projects across Little Poland, Belvedere, and downtown."
      quoteConfig={{
        title: 'Plan Your New Britain Fall Cleanup',
        subtitle: 'Send us your property details and preferred timing—we’ll reply with a precise quote.',
        locationName: 'New Britain Fall Cleanup',
        source: 'New Britain Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free New Britain Property?',
        body: 'Reserve your cleanup slot before schedules fill up. Perfect for homes, condos, and storefronts.',
        primaryText: 'Get New Britain Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupNewBritainPage;
