import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingWestHartfordPage = () => {
    const overviewHighlights = [
    'High-end neighborhoods receive white-glove service with attention to symmetry and detail.',
    'Retail + dining corridors get overnight trims so storefronts stay welcoming for shoppers.',
    'Subscription programs keep hedges camera-ready throughout the growing season.'
  ];

  const serviceStats = [
    { value: '12', label: 'Neighborhood loops' },
    { value: '3.5 hrs', label: 'Average visit duration' },
    { value: '100%', label: 'Cleanup + haul-away' }
  ];

  const serviceHighlights = [
    { icon: '🏙️', title: 'Center Ready', description: 'Crews coordinate with parking bans and HOA guidelines in West Hartford Center.' },
    { icon: '🪒', title: 'Sharp Tools', description: 'Fine-tuned equipment leaves crisp edges on formal hedges.' },
    { icon: '📞', title: 'Concierge Updates', description: 'Text + photo updates before and after each trimming session.' }
  ];

  const areas = [
    'West Hartford Center',
    'Elmwood',
    'Bishop’s Corner',
    'Blue Back Square',
    'Prospect Hill',
    'Sunset Ridge',
    'Fern Street corridor',
    'Conard / Hall neighborhoods'
  ];

  return (
    <BushTrimmingTemplate
      townName="West Hartford, CT"
      seo={{
        title: 'Bush Trimming West Hartford CT | Hedge & Shrub Care | GD Landscaping',
        description:
          'Premium bush trimming and hedge shaping in West Hartford, CT. Serving West Hartford Center, Elmwood, Bishop’s Corner, and beyond.',
        keywords: 'bush trimming West Hartford CT, hedge trimming West Hartford, shrub pruning West Hartford Connecticut',
        canonicalUrl: 'https://gdlandscapingllc.com/bush-trimming-west-hartford-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming West Hartford CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'West Hartford' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Luxury-level hedge and shrub trimming services in West Hartford, Connecticut.'
        }
      }}
      hero={{
        badge: '🌿 Serving West Hartford, CT',
        title: 'Bush Trimming West Hartford CT',
        subtitle: 'White-glove hedge and shrub maintenance for the Center, Elmwood, Bishop’s Corner, and luxury homes.',
        addressPrompt: 'Type your West Hartford address for trimming availability',
        ctaPrimaryText: 'Book West Hartford Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'West Hartford landscapes demand polish. We deliver precise shaping, plant health care, and meticulous cleanup every visit.',
        snapshotCopy: 'Clients enjoy concierge-level communication and consistent crews.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="High-end hedge shaping throughout West Hartford Center, Elmwood, and Bishop’s Corner."
      quoteConfig={{
        title: 'Plan Your West Hartford Hedge Trimming',
        subtitle: 'Tell us about your hedges and scheduling needs—we’ll tailor a concierge plan.',
        locationName: 'West Hartford Bush Trimming',
        source: 'West Hartford Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Flawless West Hartford Hedges?',
        body: 'Reserve recurring or one-time trimming with crews that treat your property like their own.',
        primaryText: 'Get West Hartford Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingWestHartfordPage;
