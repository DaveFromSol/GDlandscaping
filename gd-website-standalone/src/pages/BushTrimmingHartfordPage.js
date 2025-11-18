import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingHartfordPage = () => {
    const overviewHighlights = [
    'Crews coordinate around city parking bans and sidewalk regulations to keep hedges trimmed without disruption.',
    'West End and South End neighborhoods receive seasonal shape-ups plus health pruning for ornamentals.',
    'Commercial and multi-family clients get scheduled trims to maintain curb appeal and compliance.'
  ];

  const serviceStats = [
    { value: '3:30 AM', label: 'City route planning' },
    { value: '20+', label: 'Neighborhoods served' },
    { value: '2 hrs', label: 'Average response' }
  ];

  const serviceHighlights = [
    { icon: '🧱', title: 'Urban Expertise', description: 'Tight spaces, courtyards, and on-street parking are handled smoothly.' },
    { icon: '🧽', title: 'Clean Finish', description: 'Walks, storefronts, and stoops are spotless before we leave.' },
    { icon: '📋', title: 'Manager Friendly', description: 'Photo updates + logs for property managers and associations.' }
  ];

  const areas = [
    'Downtown Hartford',
    'Asylum Hill',
    'Parkville',
    'West End',
    'South End',
    'Frog Hollow',
    'South Green',
    'Blue Hills'
  ];

  return (
    <BushTrimmingTemplate
      townName="Hartford, CT"
      seo={{
        title: 'Bush Trimming Hartford CT - GD Landscaping',
        description:
          'Professional hedge and shrub trimming in Hartford, CT. Serving downtown, Parkville, Asylum Hill, West End, and South End neighborhoods.',
        keywords: 'bush trimming Hartford CT, hedge trimming Hartford, shrub trimming Hartford Connecticut',
        canonicalUrl: 'https://www.gdlandscapingllc.com/bush-trimming-hartford-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Hartford CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Hartford' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming for residential, commercial, and multifamily properties across Hartford, CT.'
        }
      }}
      hero={{
        badge: '🌿 Serving Hartford, CT',
        title: 'Bush Trimming Hartford CT',
        subtitle: 'Downtown storefronts, historic West End estates, and South End homes all get pro hedge care.',
        addressPrompt: 'Type your Hartford address for trimming availability',
        ctaPrimaryText: 'Book Hartford Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Busy city streets demand flexible schedules. We trim early, work around events, and keep every property photo-ready.',
        snapshotCopy: 'Clients receive live updates plus before/after photos for each visit.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Urban hedge shaping and shrub care across Hartford neighborhoods."
      quoteConfig={{
        title: 'Plan Your Hartford Hedge Trimming',
        subtitle: 'Send property details and priorities—our coordinators will align the best route.',
        locationName: 'Hartford Bush Trimming',
        source: 'Hartford Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Sharp Hartford Hedges?',
        body: 'Reserve recurring or one-time trimming to keep your property flawless year-round.',
        primaryText: 'Get Hartford Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingHartfordPage;
