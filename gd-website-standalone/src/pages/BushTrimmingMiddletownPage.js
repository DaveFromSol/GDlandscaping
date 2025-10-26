import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingMiddletownPage = () => {
    const overviewHighlights = [
    'University-area schedules coordinate around events and on-street parking windows.',
    'Riverfront and South Farms properties receive humidity-aware trimming to prevent disease.',
    'Commercial corridors along Main Street and Saybrook Road stay sharp with off-hour trims.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'Route planning begins' },
    { value: '6', label: 'Dedicated trimming crews' },
    { value: '2 wks', label: 'Typical maintenance cycle' }
  ];

  const serviceHighlights = [
    { icon: '🎓', title: 'Campus Friendly', description: 'Crews work quietly around Wesleyan housing and narrow alleys.' },
    { icon: '🪒', title: 'Sharp Tools', description: 'Daily-sharpened blades keep cuts smooth for every shrub variety.' },
    { icon: '📲', title: 'Live Updates', description: 'Text alerts before/after service keep residents and managers in the loop.' }
  ];

  const areas = [
    'Downtown Middletown',
    'North End',
    'South Farms',
    'Westlake',
    'Highland',
    'East Side',
    'Wesleyan University area',
    'Industrial Park'
  ];

  return (
    <BushTrimmingTemplate
      townName="Middletown, CT"
      seo={{
        title: 'Bush Trimming Middletown CT | Hedge & Shrub Care | GD Landscaping',
        description:
          'Professional bush trimming, hedge shaping, and shrub care in Middletown, CT. Serving Wesleyan, South Farms, Highland, and more.',
        keywords: 'bush trimming Middletown CT, hedge trimming Middletown, shrub pruning Middletown Connecticut',
        canonicalUrl: 'https://gdlandscapingllc.com/bush-trimming-middletown-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Middletown CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Middletown' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming for residential and commercial properties in Middletown, CT.'
        }
      }}
      hero={{
        badge: '🌿 Serving Middletown, CT',
        title: 'Bush Trimming Middletown CT',
        subtitle: 'Keep downtown, South Farms, and Highland hedges manicured with professional crews.',
        addressPrompt: 'Type your Middletown address for trimming availability',
        ctaPrimaryText: 'Book Middletown Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Middletown mixes historic streets, university housing, and riverfront estates. We tailor trimming strategies for each property type.',
        snapshotCopy: 'Crews stage minutes from Main Street for dependable schedules and quick follow-ups.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Shrub shaping and hedge care across downtown, South Farms, and the Highlands."
      quoteConfig={{
        title: 'Plan Your Middletown Hedge Trimming',
        subtitle: 'Tell us about your plants and preferred schedule—we’ll craft a custom plan.',
        locationName: 'Middletown Bush Trimming',
        source: 'Middletown Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Polished Middletown Hedges?',
        body: 'Lock in seasonal or one-time trimming before growth ramps up.',
        primaryText: 'Get Middletown Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingMiddletownPage;
