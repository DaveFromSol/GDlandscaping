import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupMiddletownPage = () => {

  const serviceHighlights = [
    {
      icon: '🎓',
      title: 'Campus Friendly',
      description: 'Crews coordinate around Wesleyan events and on-street parking to keep student housing tidy.'
    },
    {
      icon: '🚤',
      title: 'River Savvy',
      description: 'South Farms and riverfront homes receive extra passes to prevent soggy leaf mats.'
    },
    {
      icon: '📸',
      title: 'Photo Updates',
      description: 'Property managers receive before/after shots for condos, HOAs, and commercial sites.'
    }
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

  const overviewHighlights = [
    'Leaf vacuums and trailers stage near Main Street for quick turnaround between downtown properties.',
    'Highland and Westlake lawns receive combined leaf removal, shrub pruning, and perennial cutbacks.',
    'Commercial clients on Saybrook Road get overnight service so lots and sidewalks open on time.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'Route kickoff' },
    { value: '6', label: 'Dedicated crews' },
    { value: '2x', label: 'Average passes/storm' }
  ];

  return (
    <FallCleanupTemplate
      townName="Middletown, CT"
      seoTitle="Fall Cleanup Middletown CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Middletown fall cleanup pros. Leaf removal, pruning, and disposal for downtown, Wesleyan, and riverfront properties."
      seoKeywords="fall cleanup Middletown CT, leaf removal Middletown, yard cleanup Middletown Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-middletown-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Middletown CT - GD Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization for Middletown, Connecticut homeowners and businesses.',
        areaServed: {
          '@type': 'City',
          name: 'Middletown'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Middletown, CT',
        title: 'Fall Cleanup Middletown CT',
        subtitle:
          'Leaf removal, pruning, and yard cleanups for Wesleyan, South Farms, Highland, and every Middletown neighborhood.',
        addressPrompt: 'Type your Middletown address for instant fall cleanup options',
        ctaPrimaryText: 'Book Middletown Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'College-town lawns require flexible scheduling and detailed cleanup. We keep every Middletown property camera ready before winter.',
        snapshotCopy: 'Dispatch texts and photo recaps keep homeowners and managers in the loop.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Seasonal cleanup projects from Wesleyan Hill to South Farms."
      quoteConfig={{
        title: 'Plan Your Middletown Fall Cleanup',
        subtitle: 'Tell us about your property and goals—we’ll line up the perfect service window.',
        locationName: 'Middletown Fall Cleanup',
        source: 'Middletown Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Spotless Middletown Yard?',
        body: 'Reserve your cleanup slot before schedules fill up. Flexible options for residential, campus, and commercial sites.',
        primaryText: 'Get Middletown Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupMiddletownPage;
