import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingRockyHillPage = () => {
    const overviewHighlights = [
    'River breezes and clay soils require flexible trimming schedules across Rocky Hill.',
    'Corporate Ridge clients receive off-hour trims to keep signage and entrances sharp.',
    'Seasonal plans integrate trimming with fertilization for lush, green hedges year-round.'
  ];

  const serviceStats = [
    { value: '9', label: 'Dedicated trimming crews' },
    { value: '24/7', label: 'Weather monitoring' },
    { value: '100%', label: 'Cleanup included' }
  ];

  const serviceHighlights = [
    { icon: '🌊', title: 'Riverfront Ready', description: 'Special attention for properties along the river to prevent disease.' },
    { icon: '🧰', title: 'Pro Gear', description: 'Commercial trimmers and pole saws keep everything crisp.' },
    { icon: '📆', title: 'Flexible Plans', description: 'One-time, seasonal, or subscription trimming options.' }
  ];

  const areas = [
    'Dividend',
    'West Rocky Hill',
    'Ferry Landing',
    'Silas Deane Hwy corridor',
    'Corporate Ridge',
    'Old Main Street',
    'Cromwell Avenue',
    'Riverview Estates'
  ];

  return (
    <BushTrimmingTemplate
      townName="Rocky Hill, CT"
      seo={{
        title: 'Bush Trimming Rocky Hill CT | Hedge & Shrub Care | GD Landscaping',
        description:
          'Professional hedge and shrub trimming in Rocky Hill, CT. Serving Dividend, Ferry Landing, West Rocky Hill, and Cromwell Avenue districts.',
        keywords: 'bush trimming Rocky Hill CT, hedge trimming Rocky Hill, shrub pruning Rocky Hill Connecticut',
        canonicalUrl: 'https://gdlandscapingllc.com/bush-trimming-rocky-hill-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Rocky Hill CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Rocky Hill' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming services across Rocky Hill, Connecticut.'
        }
      }}
      hero={{
        badge: '🌿 Serving Rocky Hill, CT',
        title: 'Bush Trimming Rocky Hill CT',
        subtitle: 'Keep Dividend, Ferry Landing, and Corporate Ridge hedges tailored with local crews.',
        addressPrompt: 'Type your Rocky Hill address for trimming availability',
        ctaPrimaryText: 'Book Rocky Hill Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'River humidity + upland winds demand an adaptable trimming plan. Our crews monitor growth and schedule accordingly.',
        snapshotCopy: 'Trimming visits include full cleanup, so sidewalks and entries stay guest-ready.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Hedge shaping projects across Dividend, Ferry Landing, and Cromwell Ave."
      quoteConfig={{
        title: 'Plan Your Rocky Hill Hedge Trimming',
        subtitle: 'Share your property details and desired cadence to receive a fast quote.',
        locationName: 'Rocky Hill Bush Trimming',
        source: 'Rocky Hill Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Crisp Rocky Hill Hedges?',
        body: 'Reserve one-time or seasonal trims today for worry-free curb appeal.',
        primaryText: 'Get Rocky Hill Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingRockyHillPage;
