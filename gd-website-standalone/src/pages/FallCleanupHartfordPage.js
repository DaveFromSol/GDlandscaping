import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupHartfordPage = () => {
  const packages = [
    {
      id: 'hartford-basic',
      name: 'Hartford Urban Sweep',
      price: '$340 / visit',
      description: 'Leaf and debris removal tailored for compact city lots.',
      features: [
        'Leaf + litter removal from turf',
        'Sidewalk + curb cleanup',
        'Bagging for city pickup',
        'Rear-courtyard blow-out',
        'On-street parking coordination'
      ]
    },
    {
      id: 'hartford-premium',
      name: 'Capital City Cleanup',
      price: '$595 / visit',
      description: 'Full-property fall cleanup for Asylum Hill, West End, and South End homes.',
      features: [
        'Full yard leaf + debris removal',
        'Bed cutbacks + shrub shaping',
        'Gutter policing (single story)',
        'Final trim + mow',
        'Haul-away + disposal',
        'Priority scheduling'
      ],
      popular: true
    },
    {
      id: 'hartford-commercial',
      name: 'Downtown & Institutional',
      price: 'Custom Quote',
      description: 'For municipal, campus, and commercial properties downtown.',
      features: [
        'Sidewalk + plaza clearing',
        'Loader + sweeper support',
        'Storm drain inspection',
        'Planter + bed winterization',
        'After-hours availability',
        'Detailed compliance reporting'
      ]
    }
  ];

  const serviceHighlights = [
    {
      icon: '🏙️',
      title: 'Urban Ready',
      description: 'Compact crews maneuver through tight Hartford drives, alleys, and courtyards.'
    },
    {
      icon: '🧼',
      title: 'Clean Finish',
      description: 'Sidewalks, stairs, and storefronts are blown clean and left spotless.'
    },
    {
      icon: '📋',
      title: 'Compliance Focused',
      description: 'We coordinate with property managers to meet city guidelines and HOA standards.'
    }
  ];

  const areas = [
    'Downtown Hartford',
    'Asylum Hill',
    'Parkville',
    'West End',
    'South End',
    'Frog Hollow',
    'Sheldon Charter Oak',
    'Barry Square'
  ];

  const overviewHighlights = [
    'Route plans prioritize parking restrictions, ensuring crews can service downtown lots before cars return.',
    'West End & South End properties receive combined leaf removal, pruning, and bed winterization for a manicured look.',
    'Property managers receive photos + status updates so multi-tenant buildings stay compliant and attractive.'
  ];

  const serviceStats = [
    { value: '3:30 AM', label: 'Route monitoring' },
    { value: '8', label: 'Dedicated Hartford crews' },
    { value: '2 hr', label: 'Max callback window' }
  ];

  return (
    <FallCleanupTemplate
      townName="Hartford, CT"
      seoTitle="Fall Cleanup Hartford CT | Leaf Removal & Seasonal Cleanup | GD Landscaping"
      seoDescription="Full-service fall cleanup in Hartford, CT. Leaf removal, pruning, and cleanup for downtown, Asylum Hill, Parkville, and West End properties."
      seoKeywords="fall cleanup Hartford CT, leaf removal Hartford, Hartford yard cleanup, fall landscaping Hartford"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-hartford-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Hartford CT - GD Landscaping',
        description:
          'Professional fall cleanup, leaf removal, and property winterization services throughout Hartford, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Hartford'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Hartford, CT',
        title: 'Fall Cleanup Hartford CT',
        subtitle:
          'Leaf removal, pruning, and property winterization for every Hartford neighborhood—from downtown storefronts to West End estates.',
        addressPrompt: 'Type your Hartford address for instant fall cleanup options',
        ctaPrimaryText: 'Book Hartford Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Hartford’s dense streets require flexible cleanup crews. We coordinate around parking bans, events, and school schedules.',
        snapshotCopy: 'Supervisors send ETA texts so residents and managers always know when crews arrive.'
      }}
      packages={packages}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Urban fall cleanup work throughout Downtown, Asylum Hill, and the West End."
      quoteConfig={{
        title: 'Plan Your Hartford Fall Cleanup',
        subtitle: 'Send property details and timing preferences—our coordinators will handle the rest.',
        locationName: 'Hartford Fall Cleanup',
        source: 'Hartford Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Spotless Hartford Property?',
        body: 'Reserve your cleanup slot now. We keep downtown, residential, and commercial properties leaf-free.',
        primaryText: 'Get Hartford Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupHartfordPage;
