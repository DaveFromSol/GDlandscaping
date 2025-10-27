import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingNewingtonPage = () => {
    const overviewHighlights = [
    'Crews service Maple Hill, Willard, and Cedar Mountain on consistent loops with sharp equipment.',
    'Berlin Turnpike businesses receive off-hour trimming for storefronts, entry beds, and signage.',
    'Subscription programs combine trimming with fertilization and pest monitoring for healthy shrubs.'
  ];

  const serviceStats = [
    { value: '10', label: 'Neighborhood routes' },
    { value: '2 weeks', label: 'Typical trim cycle' },
    { value: '4.9/5', label: 'Customer rating' }
  ];

  const serviceHighlights = [
    { icon: '📍', title: 'Local Crews', description: 'Newington-based teams know HOA rules and neighborhood expectations.' },
    { icon: '🪒', title: 'Clean Cuts', description: 'Commercial-grade trimmers keep hedges healthy and uniform.' },
    { icon: '📲', title: 'Simple Scheduling', description: 'Text reminders + confirmations for every visit.' }
  ];

  const areas = [
    'Newington Center',
    'Maple Hill',
    'Willard District',
    'Cedar Mountain',
    'Church Street Corridor',
    'DiCenzo Area',
    'Berlin Turnpike',
    'North End'
  ];

  return (
    <BushTrimmingTemplate
      townName="Newington, CT"
      seo={{
        title: 'Bush Trimming Newington CT | Hedge & Shrub Care | GD Landscaping',
        description:
          'Professional bush trimming and hedge shaping in Newington, CT. Serving Newington Center, Maple Hill, Cedar Mountain, and Berlin Turnpike corridors.',
        keywords: 'bush trimming Newington CT, hedge trimming Newington, shrub pruning Newington Connecticut',
        canonicalUrl: 'https://gdlandscapingllc.com/bush-trimming-newington-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Newington CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Newington' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming for homes, HOAs, and businesses throughout Newington, CT.'
        }
      }}
      hero={{
        badge: '🌿 Serving Newington, CT',
        title: 'Bush Trimming Newington CT',
        subtitle: 'Keep Maple Hill, Cedar Mountain, and Berlin Turnpike properties polished with pro trimming.',
        addressPrompt: 'Type your Newington address for trimming availability',
        ctaPrimaryText: 'Book Newington Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Newington hedges range from tight foundation plantings to tall privacy rows. We match crews and tools for every style.',
        snapshotCopy: 'Subscription plans keep hedges tidy all season with easy reminders and updates.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Hedge trimming work across Newington Center, Maple Hill, and Cedar Mountain."
      quoteConfig={{
        title: 'Plan Your Newington Hedge Trimming',
        subtitle: 'Send plant details and scheduling preferences to receive a same-day quote.',
        locationName: 'Newington Bush Trimming',
        source: 'Newington Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Clean Newington Hedges?',
        body: 'Reserve your trimming slot or enroll in a maintenance plan today.',
        primaryText: 'Get Newington Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingNewingtonPage;
