import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupNewingtonPage = () => {

  const serviceHighlights = [
    { icon: '📍', title: 'Neighborhood Routes', description: 'Crews run dedicated loops for Newington Center, Maple Hill, and Willard.' },
    { icon: '🧺', title: 'Full Service', description: 'Leaf removal, pruning, and final mowing leave properties winter ready.' },
    { icon: '🧊', title: 'Ice Prevention', description: 'We clear curb lines and drains so meltwater doesn’t refreeze across driveways.' }
  ];

  const areas = [
    'Newington Center',
    'Maple Hill',
    'Willard District',
    'Cedar Mountain',
    'Church Street Corridor',
    'DiCenzo Area',
    'Berlin Turnpike Business District',
    'North End'
  ];

  const overviewHighlights = [
    'Maple Hill + Willard neighborhoods receive combined leaf removal and winter pruning so lawns stay healthy.',
    'Berlin Turnpike plazas get overnight cleanups with sweepers and loaders for zero daytime disruption.',
    'Cedar Mountain slopes receive extra passes to manage heavy woods and keep storm drains open.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'Routes begin' },
    { value: '10', label: 'Neighborhood loops' },
    { value: '2x', label: 'Average visits each fall' }
  ];

  return (
    <FallCleanupTemplate
      townName="Newington, CT"
      seoTitle="Fall Cleanup Newington CT | Leaf Removal & Seasonal Cleanup | GD Landscaping"
      seoDescription="Leaf removal, pruning, and yard cleanups for Newington Center, Maple Hill, Cedar Mountain, and Berlin Turnpike corridors."
      seoKeywords="fall cleanup Newington CT, leaf removal Newington, yard cleanup Newington Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-newington-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Newington CT - GD Landscaping',
        description:
          'Professional fall cleanup and leaf removal services for residential and commercial properties throughout Newington, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Newington'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Newington, CT',
        title: 'Fall Cleanup Newington CT',
        subtitle: 'Leaf removal, pruning, and property cleanup across Newington Center, Maple Hill, and Cedar Mountain.',
        addressPrompt: 'Type your Newington address for instant fall cleanup scheduling',
        ctaPrimaryText: 'Book Newington Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'From tree-lined cul-de-sacs to busy Berlin Turnpike plazas, we tailor cleanup crews for every Newington property.',
        snapshotCopy: 'Customers receive live updates when crews are en route or when storms adjust the schedule.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal and cleanup work throughout Newington Center, Maple Hill, and Cedar Mountain."
      quoteConfig={{
        title: 'Plan Your Newington Fall Cleanup',
        subtitle: 'Share your property details and must-have services—we’ll send a tailored quote.',
        locationName: 'Newington Fall Cleanup',
        source: 'Newington Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Newington Property?',
        body: 'Reserve your fall cleanup now to lock in the window that works best for your schedule.',
        primaryText: 'Get Newington Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupNewingtonPage;
