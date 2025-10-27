import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupBristolPage = () => {
  const packages = [
    {
      id: 'bristol-basic',
      name: 'Bristol Leaf Sweep',
      price: '$295 / visit',
      description: 'Perfect for Forestville and Edgewood lots that need recurring pickup.',
      features: [
        'Lawn + hardscape leaf removal',
        'Front walkway + porch blow-off',
        'Bagging for town pickup',
        'Weekly or bi-weekly scheduling',
        'Storm follow-up check'
      ]
    },
    {
      id: 'bristol-premium',
      name: 'Bristol Premier Cleanup',
      price: '$545 / visit',
      description: 'Complete seasonal cleanup for Federal Hill, Edgewood, and Downtown neighborhoods.',
      features: [
        'Full-property leaf + debris removal',
        'Landscape bed detailing and cutbacks',
        'Final mow + edge + stripe',
        'Gutter policing (single story)',
        'Haul-away + disposal included',
        'Priority service windows'
      ],
      popular: true
    },
    {
      id: 'bristol-commercial',
      name: 'Hardware City Commercial',
      price: 'Custom Quote',
      description: 'Custom cleanup for downtown storefronts, HOAs, and commercial campuses.',
      features: [
        'Sidewalk + storefront detailing',
        'Loader / vacuum truck support',
        'Parking lot sweeping',
        'Drain + curb inlet clearing',
        'Flexible off-hours scheduling',
        'Detailed completion reporting'
      ]
    }
  ];

  const serviceHighlights = [
    {
      icon: '🧹',
      title: 'Detail Focused',
      description: 'Beds, decks, patios, and stairs are blown clean so Bristol homes look market-ready.'
    },
    {
      icon: '🚛',
      title: 'On-Route Crews',
      description: 'Dedicated trucks loop through Forestville, Edgewood, and Federal Hill daily during peak season.'
    },
    {
      icon: '🕓',
      title: 'Rapid Follow-Ups',
      description: 'High winds or late storms trigger automatic revisits so piles never linger.'
    }
  ];

  const areas = [
    'Downtown Bristol',
    'Forestville',
    'Edgewood',
    'Federal Hill',
    'Stafford Ave. corridor',
    'Lake Avenue',
    'Birge Pond area',
    'Chippens Hill'
  ];

  const overviewHighlights = [
    'Hard-to-access Federal Hill lots get smaller crews with compact vacuums to protect tight driveways.',
    'Edgewood + Forestville lawns receive combined leaf removal, shrub trimming, and bed winterization.',
    'Commercial clients downtown receive after-hours cleanup so sidewalks and parking lots open on time.'
  ];

  const serviceStats = [
    { value: '30 min', label: 'Average ETA updates' },
    { value: '5', label: 'Dedicated Bristol crews' },
    { value: '100%', label: 'Haul-away included' }
  ];

  return (
    <FallCleanupTemplate
      townName="Bristol, CT"
      seoTitle="Fall Cleanup Bristol CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Bristol CT fall cleanup services: leaf removal, gutter policing, shrub cutbacks, and haul-away for Forestville, Edgewood, and Federal Hill properties."
      seoKeywords="fall cleanup Bristol CT, leaf removal Bristol, yard cleanups Bristol Connecticut, fall landscaping Bristol"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-bristol-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Bristol CT - GD Landscaping',
        description:
          'Professional leaf removal, yard cleanups, and seasonal prep for residential and commercial properties throughout Bristol, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Bristol'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Bristol, CT',
        title: 'Fall Cleanup Bristol CT',
        subtitle:
          'Leaf removal, shrub pruning, and seasonal prep for homes and businesses across Forestville, Edgewood, and Federal Hill.',
        addressPrompt: 'Type your Bristol address for instant fall cleanup scheduling',
        ctaPrimaryText: 'Book Bristol Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'From Chippens Hill estates to compact downtown lots, we tailor crews and equipment for every Bristol property.',
        snapshotCopy: 'Our Hardware City teams stay routed nearby for fast follow-ups when late storms roll through.'
      }}
      packages={packages}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Freshly cleared lawns and beds across Bristol, Forestville, and Edgewood."
      quoteConfig={{
        title: 'Plan Your Bristol Fall Cleanup',
        subtitle: 'Send property details and we’ll confirm the next opening on your preferred route.',
        locationName: 'Bristol Fall Cleanup',
        source: 'Bristol Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Bristol Property?',
        body: 'Reserve your fall cleanup window before schedules fill up. Seasonal packages for every lot size.',
        primaryText: 'Get Bristol Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupBristolPage;
