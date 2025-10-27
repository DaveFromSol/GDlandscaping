import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingBristolPage = () => {
    const overviewHighlights = [
    'Dedicated Bristol crews keep hedges crisp with reliable visit schedules.',
    'Estate properties receive custom shaping for formal hedges, topiary, and ornamental shrubs.',
    'Commercial trim packages keep storefront plantings sharp before weekend traffic.'
  ];

  const serviceStats = [
    { value: '30 min', label: 'Average dispatch window' },
    { value: '18', label: 'Bristol trimming routes' },
    { value: '100%', label: 'Cleanup + haul-away' }
  ];

  const serviceHighlights = [
    { icon: '🚚', title: 'Local Crews', description: 'Bristol-based teams cycle through neighborhoods multiple times per week.' },
    { icon: '🪒', title: 'Sharp Blades', description: 'Daily sharpening ensures clean cuts that protect plant health.' },
    { icon: '📲', title: 'Easy Reminders', description: 'Text updates and photo recaps keep homeowners informed.' }
  ];

  const areas = [
    'Downtown Bristol',
    'Forestville',
    'Edgewood',
    'Federal Hill',
    'Chippens Hill',
    'Lake Avenue',
    'Bristol Center',
    'Stafford Avenue corridor'
  ];

  return (
    <BushTrimmingTemplate
      townName="Bristol, CT"
      seo={{
        title: 'Bush Trimming Bristol CT | Hedge & Shrub Trimming | GD Landscaping',
        description:
          'Professional bush trimming and hedge shaping in Bristol, CT with attentive crews and precision equipment.',
        keywords: 'bush trimming Bristol CT, hedge trimming Bristol, shrub trimming Bristol Connecticut',
        canonicalUrl: 'https://www.gdlandscapingllc.com/bush-trimming-bristol-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Bristol CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Bristol' },
          serviceType: 'Bush & Hedge Trimming',
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          description: 'Shrub and hedge trimming services across Bristol, Connecticut.'
        }
      }}
      hero={{
        badge: '🌿 Serving Bristol, CT',
        title: 'Bush Trimming Bristol CT',
        subtitle: 'Keep Bristol properties polished with meticulous hedge and shrub care built around your landscape.',
        addressPrompt: 'Type your Bristol address for instant trimming availability',
        ctaPrimaryText: 'Book Bristol Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Bristol lawns range from compact in-town lots to larger hillside properties. We tailor trimming schedules and equipment for every property.',
        snapshotCopy: 'Crews provide precise cuts and full cleanup, leaving hedges sharp and beds debris-free.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Hedge shaping and shrub care across Bristol."
      quoteConfig={{
        title: 'Plan Your Bristol Hedge Trimming',
        subtitle: 'Share the plants you need trimmed and your preferred schedule—we’ll handle the rest.',
        locationName: 'Bristol Bush Trimming',
        source: 'Bristol Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Sharp Bristol Hedges?',
        body: 'Seasonal subscriptions and one-time trims available. Reserve your visit today.',
        primaryText: 'Get Bristol Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingBristolPage;
