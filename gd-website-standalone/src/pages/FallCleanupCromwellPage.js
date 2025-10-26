import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupCromwellPage = () => {
  const packages = [
    {
      id: 'cromwell-basic',
      name: 'Cromwell Leaf Pass',
      price: '$310 / visit',
      description: 'Weekly or bi-weekly leaf pickup for Cromwell Center and North Cromwell homes.',
      features: [
        'Leaf + twig removal from turf',
        'Walkway and driveway blow-off',
        'Bagging or on-site composting',
        'Seasonal scheduling reminders',
        'Storm follow-up alerts'
      ]
    },
    {
      id: 'cromwell-premium',
      name: 'River Town Cleanup',
      price: '$560 / visit',
      description: 'Complete fall cleanup for Main Street, Nooks Hill, and River Highlands properties.',
      features: [
        'Full-property leaf + debris removal',
        'Bed cutbacks + ornamental pruning',
        'Final mowing + edging',
        'Gutter policing (single story)',
        'Haul-away & disposal included',
        'Priority slot after major storms'
      ],
      popular: true
    },
    {
      id: 'cromwell-commercial',
      name: 'Cromwell HOA & Commercial',
      price: 'Custom Quote',
      description: 'Tailored fall cleanup for HOAs, golf-adjacent communities, and businesses.',
      features: [
        'Multi-day cleanup plans',
        'Loader / vacuum truck support',
        'Storm drain clearing',
        'Mulch bed winterization',
        'Flexible off-hour scheduling',
        'Detailed completion reporting'
      ]
    }
  ];

  const serviceHighlights = [
    {
      icon: '🌊',
      title: 'Riverfront Expertise',
      description: 'Extra passes along River Highlands and Main Street keep moisture-heavy leaves from matting.'
    },
    {
      icon: '⏱️',
      title: 'Fast Dispatch',
      description: 'Crews are staged minutes away in Berlin for quick response when storms change.'
    },
    {
      icon: '🧤',
      title: 'Thorough Detailing',
      description: 'Beds, patios, and walkways are cleaned so homes and storefronts stay guest-ready.'
    }
  ];

  const areas = [
    'Cromwell Center',
    'North Cromwell',
    'South Cromwell',
    'West Street corridor',
    'Nooks Hill',
    'Main Street District',
    'River Highlands',
    'Industrial Park'
  ];

  const overviewHighlights = [
    'Riverfront neighborhoods receive pre-planned cleanup windows before high winds push leaves downstream.',
    'Golf-adjacent properties get combined leaf removal, shrub pruning, and ornamental grass cutbacks.',
    'Business parks along Route 372 receive after-hours service to protect curb appeal and parking access.'
  ];

  const serviceStats = [
    { value: '4:15 AM', label: 'Storm monitoring begins' },
    { value: '12', label: 'Routes across Cromwell' },
    { value: '2', label: 'Passes per cleanup' }
  ];

  return (
    <FallCleanupTemplate
      townName="Cromwell, CT"
      seoTitle="Fall Cleanup Cromwell CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Cromwell fall cleanup pros. Leaf removal, bed cutbacks, and disposal for River Highlands, Nooks Hill, and Cromwell Center properties."
      seoKeywords="fall cleanup Cromwell CT, leaf removal Cromwell, yard cleanup Cromwell Connecticut, fall landscaping Cromwell"
      canonicalUrl="https://gdlandscapingllc.com/fall-cleanup-cromwell-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Cromwell CT - GD Landscaping',
        description:
          'Professional fall cleanup, leaf removal, and property winterization services for Cromwell, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Cromwell'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Cromwell, CT',
        title: 'Fall Cleanup Cromwell CT',
        subtitle:
          'Keep Main Street, River Highlands, and Nooks Hill properties spotless with professional leaf removal and seasonal prep.',
        addressPrompt: 'Type your Cromwell address for instant fall cleanup availability',
        ctaPrimaryText: 'Book Cromwell Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Cromwell’s riverfront weather demands flexible fall cleanup routes. We tune schedules around wind, tide, and neighborhood needs.',
        snapshotCopy: 'Supervisors coordinate with HOAs and property managers for seamless cleanups.'
      }}
      packages={packages}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal and seasonal prep across Main Street, Riverport, and Nooks Hill."
      quoteConfig={{
        title: 'Plan Your Cromwell Fall Cleanup',
        subtitle: 'Send us your checklist and we’ll tailor a cleanup plan with precise timing.',
        locationName: 'Cromwell Fall Cleanup',
        source: 'Cromwell Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Cromwell Property?',
        body: 'Reserve your cleanup slot before schedules fill. Seasonal packages for homes, HOAs, and businesses.',
        primaryText: 'Get Cromwell Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupCromwellPage;
