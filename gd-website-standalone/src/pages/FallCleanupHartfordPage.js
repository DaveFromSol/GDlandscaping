import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupHartfordPage = () => {

  const serviceHighlights = [
    {
      icon: '🏙️',
      title: 'Urban Ready',
      description: 'Compact crews maneuver through tight Hartford drives, alleys, and courtyards.'
    },
    {
      icon: '🧼',
      title: 'Clean Finish',
      description: 'Sidewalks, stairs, and storefronts are blown clean and left spotless.'
    },
    {
      icon: '📋',
      title: 'Compliance Focused',
      description: 'We coordinate with property managers to meet city guidelines and HOA standards.'
    }
  ];

  const areas = [
    'Downtown Hartford',
    'Asylum Hill',
    'Parkville',
    'West End',
    'South End',
    'Frog Hollow',
    'Sheldon Charter Oak',
    'Barry Square'
  ];

  const overviewHighlights = [
    'Route plans prioritize parking restrictions, ensuring crews can service downtown lots before cars return.',
    'West End & South End properties receive combined leaf removal, pruning, and bed winterization for a manicured look.',
    'Property managers receive photos + status updates so multi-tenant buildings stay compliant and attractive.'
  ];

  const serviceStats = [
    { value: '3:30 AM', label: 'Route monitoring' },
    { value: '8', label: 'Dedicated Hartford crews' },
    { value: '2 hr', label: 'Max callback window' }
  ];

  const faqs = [
    {
      question: "How do you work around Hartford's parking ban schedule?",
      answer: "We monitor Hartford's parking ban calendar closely and schedule cleanup visits accordingly. For downtown and Asylum Hill properties, we often work early morning (6-8 AM) before vehicles return to the streets. Our dispatch team coordinates with building managers to ensure clear access to all areas."
    },
    {
      question: "Can you service multi-family buildings in Parkville and Frog Hollow?",
      answer: "Absolutely! We specialize in multi-family properties throughout Hartford. Our crews handle common areas, individual units' yard spaces, courtyards, and parking lots. Property managers receive detailed photo documentation and status updates for tenant communication and compliance records."
    },
    {
      question: "Do you clean up leaves from downtown storefronts and commercial properties?",
      answer: "Yes, we service commercial properties including retail storefronts, office buildings, and mixed-use developments. We work early morning or after-hours to avoid disrupting business operations. Our crews ensure entrances, sidewalks, and customer parking areas are pristine before opening hours."
    },
    {
      question: "What about properties near Bushnell Park with heavy tree coverage?",
      answer: "Properties adjacent to Bushnell Park and other tree-lined streets get extra attention. The mature elms and oaks in these areas produce significant leaf volume. We typically recommend 2-3 visits for these properties - once in mid-October, again in early November, and a final cleanup in late November or December."
    },
    {
      question: "Can you navigate the narrow streets and alleys in South End and Barry Square?",
      answer: "Yes! We use compact equipment specifically sized for Hartford's narrow streets, tight driveways, and alley access. Our crews are experienced with urban maneuvering and work efficiently in confined spaces without damaging vehicles, fences, or neighboring properties."
    },
    {
      question: "Do you coordinate with HOAs in the West End historic district?",
      answer: "Absolutely. West End properties often have historic home ordinances and HOA guidelines. We're familiar with these requirements and ensure our cleanup methods preserve historic landscaping features, avoid damage to mature plantings, and maintain the neighborhood's aesthetic standards."
    },
    {
      question: "What's your approach for properties with limited street parking?",
      answer: "For properties with no driveway or limited parking, we schedule specific time windows and communicate 24 hours in advance. Our equipment is trailer-based and can be parked temporarily in legal zones. We work quickly to minimize disruption and coordinate with neighbors when needed."
    },
    {
      question: "Can you handle emergency cleanup after urban windstorms?",
      answer: "Yes! Hartford's urban canyon effect can create powerful wind tunnels that bring down branches and debris. We offer emergency storm cleanup with priority response for safety hazards. Call us at (860) 526-7583 for urgent situations, and we'll dispatch a crew within 4-6 hours during business hours."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="Hartford, CT"
      seoTitle="Fall Cleanup Hartford CT | Leaf Removal & Seasonal Cleanup | GD Landscaping"
      seoDescription="Full-service fall cleanup in Hartford, CT. Leaf removal, pruning, and cleanup for downtown, Asylum Hill, Parkville, and West End properties."
      seoKeywords="fall cleanup Hartford CT, leaf removal Hartford, Hartford yard cleanup, fall landscaping Hartford"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-hartford-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Hartford CT - GD Landscaping',
        description:
          'Professional fall cleanup, leaf removal, and property winterization services throughout Hartford, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Hartford'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Hartford, CT',
        title: 'Fall Cleanup Hartford CT',
        subtitle:
          'Leaf removal, pruning, and property winterization for every Hartford neighborhood—from downtown storefronts to West End estates.',
        addressPrompt: 'Type your Hartford address for instant fall cleanup options',
        ctaPrimaryText: 'Book Hartford Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Hartford’s dense streets require flexible cleanup crews. We coordinate around parking bans, events, and school schedules.',
        snapshotCopy: 'Supervisors send ETA texts so residents and managers always know when crews arrive.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Urban fall cleanup work throughout Downtown, Asylum Hill, and the West End."
      quoteConfig={{
        title: 'Plan Your Hartford Fall Cleanup',
        subtitle: 'Send property details and timing preferences—our coordinators will handle the rest.',
        locationName: 'Hartford Fall Cleanup',
        source: 'Hartford Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Spotless Hartford Property?',
        body: 'Reserve your cleanup slot now. We keep downtown, residential, and commercial properties leaf-free.',
        primaryText: 'Get Hartford Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default FallCleanupHartfordPage;
