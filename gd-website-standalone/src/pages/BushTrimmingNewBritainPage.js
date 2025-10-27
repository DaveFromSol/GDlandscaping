import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingNewBritainPage = () => {
    const overviewHighlights = [
    'Route-based crews handle tight downtown alleys and larger suburban lots.',
    'Belvedere and Sloper neighborhoods get seasonal shaping plus deep pruning for mature hedges.',
    'Commercial corridors along Broad Street and Stanley Street receive storefront-ready trims.'
  ];

  const serviceStats = [
    { value: '25', label: 'Routes across Hardware City' },
    { value: '4.9/5', label: 'Customer rating' },
    { value: '2 hr', label: 'Typical response time' }
  ];

  const serviceHighlights = [
    { icon: '🏙️', title: 'Urban Friendly', description: 'Crews navigate on-street parking and compact side yards with ease.' },
    { icon: '🔧', title: 'Pro Tools', description: 'Commercial trimmers, pole saws, and handhelds sharpened daily.' },
    { icon: '📲', title: 'Status Alerts', description: 'Text updates before/after trimming keep owners informed.' }
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

  return (
    <BushTrimmingTemplate
      townName="New Britain, CT"
      seo={{
        title: 'Bush Trimming New Britain CT | Hedge & Shrub Care | GD Landscaping',
        description:
          'Professional bush trimming and shrub care in New Britain, CT. Serving Little Poland, Belvedere, Sloper, and surrounding neighborhoods.',
        keywords: 'bush trimming New Britain CT, hedge trimming New Britain, shrub pruning New Britain Connecticut',
        canonicalUrl: 'https://www.gdlandscapingllc.com/bush-trimming-new-britain-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming New Britain CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'New Britain' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming services for residential and commercial properties in New Britain, CT.'
        }
      }}
      hero={{
        badge: '🌿 Serving New Britain, CT',
        title: 'Bush Trimming New Britain CT',
        subtitle: 'Keep Hardware City hedges tidy with local crews who understand each neighborhood’s landscape.',
        addressPrompt: 'Type your New Britain address for trimming availability',
        ctaPrimaryText: 'Book New Britain Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'From downtown townhomes to Belvedere colonials, we tailor trimming techniques for every property style.',
        snapshotCopy: 'Crews provide precise cuts, cleanup, and haul-away so curb appeal stays high.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Hedge shaping and shrub care throughout Little Poland, Belvedere, and downtown."
      quoteConfig={{
        title: 'Plan Your New Britain Hedge Trimming',
        subtitle: 'Tell us the plants you need trimmed and your preferred timing—we’ll handle scheduling.',
        locationName: 'New Britain Bush Trimming',
        source: 'New Britain Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Sharp New Britain Hedges?',
        body: 'Reserve your trim before growth gets unruly. Seasonal and one-time visits available.',
        primaryText: 'Get New Britain Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingNewBritainPage;
