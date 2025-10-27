import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingCromwellPage = () => {
    const overviewHighlights = [
    'Riverfront humidity and wind patterns inform our trimming schedule along Main Street and Riverport.',
    'Golf-adjacent neighborhoods get detailed cuts for privet, boxwood, and formal plantings.',
    'Commercial accounts on Route 372 receive after-hours trimming to keep storefronts spotless.'
  ];

  const serviceStats = [
    { value: '20+', label: 'Neighborhoods covered' },
    { value: '4.9/5', label: 'Client rating' },
    { value: '2 wks', label: 'Typical trim frequency' }
  ];

  const serviceHighlights = [
    { icon: '🌊', title: 'River Town Savvy', description: 'Crews know when moisture and wind require extra attention.' },
    { icon: '🧰', title: 'Pro Equipment', description: 'Hedge trimmers, pole saws, and hand pruners kept razor sharp.' },
    { icon: '📅', title: 'Flexible Plans', description: 'One-time, seasonal, and subscription services available.' }
  ];

  const areas = [
    'Cromwell Center',
    'North Cromwell',
    'West Street corridor',
    'Nooks Hill',
    'Main Street District',
    'River Highlands',
    'Skyview Estates',
    'Industrial Park'
  ];

  return (
    <BushTrimmingTemplate
      townName="Cromwell, CT"
      seo={{
        title: 'Bush Trimming Cromwell CT | Hedge & Shrub Trimming | GD Landscaping',
        description: 'Professional bush and hedge trimming services in Cromwell, CT. Serving Main Street, River Highlands, Nooks Hill, and more.',
        keywords: 'bush trimming Cromwell CT, hedge trimming Cromwell, shrub pruning Cromwell Connecticut',
        canonicalUrl: 'https://www.gdlandscapingllc.com/bush-trimming-cromwell-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Cromwell CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Cromwell' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming services for residential and commercial properties in Cromwell, CT.'
        }
      }}
      hero={{
        badge: '🌿 Serving Cromwell, CT',
        title: 'Bush Trimming Cromwell CT',
        subtitle: 'Keep River Highlands, Nooks Hill, and Main Street hedges sharp with professional shrub care.',
        addressPrompt: 'Type your Cromwell address for trimming availability',
        ctaPrimaryText: 'Book Cromwell Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro: 'River town landscapes demand flexible trimming schedules. We match crews to each neighborhood’s plant palette.',
        snapshotCopy: 'Berlin-based crews travel minutes to Cromwell for reliable, polished results.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Hedge shaping and shrub care across Cromwell Center, Main Street, and Riverport."
      quoteConfig={{
        title: 'Plan Your Cromwell Hedge Trimming',
        subtitle: 'Tell us about your hedges and preferred schedule—we’ll handle the rest.',
        locationName: 'Cromwell Bush Trimming',
        source: 'Cromwell Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Tidy Cromwell Hedges?',
        body: 'Reserve your trim before growth gets out of hand. Flexible maintenance plans available.',
        primaryText: 'Get Cromwell Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingCromwellPage;
