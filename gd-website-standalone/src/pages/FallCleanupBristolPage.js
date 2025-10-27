import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupBristolPage = () => {
  const packages = [
    {
      id: 'bristol-basic',
      name: 'Bristol Leaf Sweep',
      price: '$295 / visit',
      description: 'Perfect for Bristol properties that benefit from recurring pickup appointments.',
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
      description: 'Complete seasonal cleanup for Bristol properties that expect full curb appeal.',
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
      description: 'Dedicated trucks loop through Bristol each day during peak season to keep curb appeal dialed in.'
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
    'Tight downtown lots and spacious yards alike receive crews matched to the property layout.',
    'Comprehensive leaf removal, shrub trimming, and bed winterization keep Bristol landscapes ready for winter.',
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
      seoDescription="Bristol CT fall cleanup services: leaf removal, gutter policing, shrub cutbacks, and haul-away from attentive local crews."
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
          'Leaf removal, shrub pruning, and seasonal prep for Bristol homes and businesses with full-service crews.',
        addressPrompt: 'Type your Bristol address for instant fall cleanup scheduling',
        ctaPrimaryText: 'Book Bristol Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'We tailor equipment, crew size, and timing for every Bristol property so cleanups finish efficiently.',
        snapshotCopy: 'Our Hardware City teams stay routed nearby for fast follow-ups when late storms roll through.'
      }}
      packages={packages}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Freshly cleared lawns and beds across Bristol."
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
