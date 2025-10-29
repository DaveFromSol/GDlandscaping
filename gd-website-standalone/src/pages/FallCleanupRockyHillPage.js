import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupRockyHillPage = () => {

  const serviceHighlights = [
    { icon: '🌊', title: 'Riverfront Ready', description: 'Extra passes near the Connecticut River keep soggy leaves from matting and freezing.' },
    { icon: '🚛', title: 'Staged Equipment', description: 'Crews and vacuums are staged along Route 3 and Cromwell Avenue for rapid deployment.' },
    { icon: '🔁', title: 'Follow-Up Visits', description: 'Late-season winds trigger automatic cleanup revisits so piles never linger.' }
  ];

  const areas = [
    'Dividend',
    'West Rocky Hill',
    'Ferry Landing',
    'Silas Deane Highway corridor',
    'Old Main Street',
    'Corporate Ridge',
    'Cromwell Avenue',
    'Riverview Estates'
  ];

  const overviewHighlights = [
    'Leaf vacs and trailers stage along Cromwell Avenue for quick turnarounds between neighborhoods.',
    'Corporate parks receive large crews with loader support to clear parking stalls and entrances overnight.',
    'Drain checks near the river prevent refreeze and flooding once temperatures drop.'
  ];

  const serviceStats = [
    { value: '3:45 AM', label: 'Storm monitoring' },
    { value: '9', label: 'Rocky Hill routes' },
    { value: '2+', label: 'Cleanup passes per visit' }
  ];

  return (
    <FallCleanupTemplate
      townName="Rocky Hill, CT"
      seoTitle="Fall Cleanup Rocky Hill CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Leaf removal, pruning, and seasonal cleanup services for Rocky Hill neighborhoods including Dividend, Ferry Landing, and Cromwell Avenue districts."
      seoKeywords="fall cleanup Rocky Hill CT, leaf removal Rocky Hill, yard cleanup Rocky Hill Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-rocky-hill-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Rocky Hill CT - GD Landscaping',
        description:
          'Professional fall cleanup, leaf removal, and property winterization in Rocky Hill, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Rocky Hill'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Rocky Hill, CT',
        title: 'Fall Cleanup Rocky Hill CT',
        subtitle:
          'Leaf removal, pruning, and haul-away for Dividend, West Rocky Hill, Corporate Ridge, and riverfront estates.',
        addressPrompt: 'Type your Rocky Hill address for fall cleanup scheduling',
        ctaPrimaryText: 'Book Rocky Hill Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'River winds and steep cul-de-sacs require flexible crews. We keep equipment staged throughout Rocky Hill.',
        snapshotCopy: 'Resident alerts and property-manager updates keep everyone informed during the busy season.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Seasonal cleanups across Dividend, Ferry Landing, and Cromwell Avenue."
      quoteConfig={{
        title: 'Plan Your Rocky Hill Fall Cleanup',
        subtitle: 'Share your property priorities and we’ll lock in the next available route slot.',
        locationName: 'Rocky Hill Fall Cleanup',
        source: 'Rocky Hill Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Rocky Hill Property?',
        body: 'Reserve your cleanup and winter prep before schedules fill. Perfect for residences, HOAs, and businesses.',
        primaryText: 'Get Rocky Hill Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupRockyHillPage;
