import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupWestHartfordPage = () => {

  const serviceHighlights = [
    { icon: '🏙️', title: 'Center Ready', description: 'We coordinate with parking bans and retail hours in West Hartford Center and Blue Back Square.' },
    { icon: '🌳', title: 'Tree Canopy Experts', description: 'Prospect Hill + Sunset Ridge streets with mature trees get extra passes and vacuum support.' },
    { icon: '📞', title: 'Concierge Updates', description: 'Homeowners and property managers receive real-time notifications before and after service.' }
  ];

  const areas = [
    'West Hartford Center',
    'Elmwood',
    'Bishop’s Corner',
    'Blue Back Square',
    'Prospect Hill',
    'Sunset Ridge',
    'Fern Street corridor',
    'Conard / Hall neighborhoods'
  ];

  const overviewHighlights = [
    'Leaf vacuums and compact crews navigate tight West End drives while larger teams manage estate lots.',
    'Retail + dining areas get overnight cleanup so parking lots, plazas, and sidewalks open spotless each morning.',
    'HOAs and schools receive scheduled follow-ups to keep drains and walkways safe throughout the season.'
  ];

  const serviceStats = [
    { value: '3:30 AM', label: 'Crew dispatch' },
    { value: '12', label: 'Neighborhood loops' },
    { value: '98%', label: 'On-time completion' }
  ];

  return (
    <FallCleanupTemplate
      townName="West Hartford, CT"
      seoTitle="Fall Cleanup West Hartford CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Leaf removal, pruning, and seasonal cleanup for West Hartford Center, Elmwood, Bishop's Corner, and Blue Back Square neighborhoods."
      seoKeywords="fall cleanup West Hartford CT, leaf removal West Hartford, West Hartford yard cleanup"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-west-hartford-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup West Hartford CT - GD Landscaping',
        description:
          'Professional fall cleanup, leaf removal, and property winterization across West Hartford, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'West Hartford'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving West Hartford, CT',
        title: 'Fall Cleanup West Hartford CT',
        subtitle:
          'Luxury-level leaf removal and seasonal cleanup for West Hartford Center, Elmwood, Bishop’s Corner, and surrounding neighborhoods.',
        addressPrompt: 'Type your West Hartford address for instant fall cleanup options',
        ctaPrimaryText: 'Book West Hartford Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Mature trees and busy retail corridors demand proactive fall cleanups. We stage crews throughout West Hartford for seamless service.',
        snapshotCopy: 'Clients receive concierge-level communication from booking to completion.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Premium cleanup work across West Hartford Center, Elmwood, and Blue Back Square."
      quoteConfig={{
        title: 'Plan Your West Hartford Fall Cleanup',
        subtitle: 'Share property specifics and scheduling preferences—we’ll coordinate the rest.',
        locationName: 'West Hartford Fall Cleanup',
        source: 'West Hartford Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free West Hartford Property?',
        body: 'Reserve your cleanup slot now for immaculate lawns, beds, and entryways before winter.',
        primaryText: 'Get West Hartford Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default FallCleanupWestHartfordPage;
