import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupFarmingtonPage = () => {
  const packages = [
    {
      id: 'farmington-basic',
      name: 'Farmington Leaf Sweep',
      price: '$335 / visit',
      description: 'Ideal for Unionville and Farmington Village properties that need recurring pickup.',
      features: [
        'Lawn and hardscape leaf cleanup',
        'Bagging and curbside placement',
        'Front entry blow-off',
        'Spot pruning for perennials',
        'Weekly route scheduling'
      ]
    },
    {
      id: 'farmington-premium',
      name: 'Farmington Complete Cleanup',
      price: '$585 / visit',
      description: 'Full-property fall cleanup for Devonwood, Talcott Mountain, and Unionville homes.',
      features: [
        'Comprehensive leaf + debris removal',
        'Landscape bed and hedge cleanup',
        'Gutter policing (single story)',
        'Final high cut + striping',
        'Haul-away and disposal included',
        'Priority weather window'
      ],
      popular: true
    },
    {
      id: 'farmington-estate',
      name: 'Farmington Estate & HOA',
      price: 'Custom Quote',
      description: 'Custom fall cleanup for estate lots, HOAs, private roads, and commercial properties.',
      features: [
        'Route planning with property managers',
        'Loader + vacuum truck support',
        'Storm drain clearing',
        'Shrub + ornamental grass cutbacks',
        'Ongoing leaf monitoring',
        'Detailed reporting'
      ]
    }
  ];

  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Local Crews',
      description: 'Farmington-based teams move quickly between Unionville, Devonwood, and Talcott Mountain streets.'
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
    'Farmington Village',
    'Unionville',
    'Devonwood',
    'Talcott Mountain',
    'Scott Swamp',
    'Tunxis / Route 4',
    'Farmington Woods',
    'Coppermine Road area'
  ];

  const overviewHighlights = [
    'Leaf vacuums and high-capacity trailers based in Farmington keep cleanup windows tight before the next storm.',
    'Seasonal plans combine final mow/stripe, selective pruning, and perennial cutbacks for curb-ready beds.',
    'Crews revisit drain inlets along Talcott Mountain and Unionville after major storms to prevent icy refreeze on aprons.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '15+', label: 'Farmington crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  return (
    <FallCleanupTemplate
      townName="Farmington, CT"
      seoTitle="Fall Cleanup Farmington CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Professional fall cleanup in Farmington, CT. Leaf removal, gutter policing, and haul-away service for Unionville, Devonwood, and Talcott Mountain."
      seoKeywords="fall cleanup Farmington CT, leaf removal Farmington, fall yard cleanup Farmington Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-farmington-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Farmington CT - GD Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization services for Farmington, Connecticut homeowners and businesses.',
        areaServed: {
          '@type': 'City',
          name: 'Farmington'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber,
          areaServed: 'Farmington, CT'
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Farmington, CT',
        title: 'Fall Cleanup Farmington CT',
        subtitle:
          'Keep Unionville, Devonwood, and Talcott Mountain properties spotless with proactive leaf removal, pruning, and winter prep.',
        addressPrompt: 'Type your Farmington address for instant fall cleanup options',
        ctaPrimaryText: 'Book Farmington Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Farmington lawns range from hillside estates to compact village lots. We tailor equipment and cleanup order for each neighborhood.',
        snapshotCopy: 'Our Farmington crews stay staged inside town limits for rapid follow-ups after windy nights.'
      }}
      packages={packages}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal, pruning, and haul-away from Unionville to Talcott Mountain."
      quoteConfig={{
        title: 'Plan Your Farmington Fall Cleanup',
        subtitle: 'Send us your address and priorities—we’ll respond with a same-day estimate.',
        locationName: 'Farmington Fall Cleanup',
        source: 'Farmington Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Farmington Lawn?',
        body: 'Reserve your cleanup slot before schedules fill up. Seasonal packages for every property type.',
        primaryText: 'Get Farmington Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupFarmingtonPage;
