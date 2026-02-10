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

  const faqs = [
    {
      question: "Do you service high-end properties in West Hartford Center?",
      answer: "Absolutely! West Hartford Center properties receive white-glove service matching the area's premium standards. We coordinate around shopping and dining district events, work efficiently in the area's compact lots, and maintain meticulous attention to detail. Storefronts and residential properties alike get concierge-level treatment."
    },
    {
      question: "Can you handle the upscale neighborhoods like Sedgwick and Prospect Hill?",
      answer: "Yes! Sedgwick, Prospect Hill, and other premium neighborhoods get estate-level service. We use commercial-grade equipment to handle large properties efficiently while maintaining meticulous attention to landscaping details. Our crews understand these neighborhoods' expectations for landscaping excellence and deliver accordingly."
    },
    {
      question: "What about properties near Blue Back Square and mixed-use developments?",
      answer: "Blue Back Square and mixed-use properties receive specialized urban cleanup service. We work around resident parking, coordinate with building management, and schedule service to avoid peak shopping and dining hours. Common areas, rooftop terraces, and ground-level landscaping all receive thorough attention."
    },
    {
      question: "Do you service properties along Fern Street corridor?",
      answer: "Absolutely! Fern Street residential and commercial properties get dedicated route service. We're familiar with the corridor's mix of housing styles and work efficiently around on-street parking. Properties with mature tree canopy typically benefit from 2-3 cleanup visits as different species drop leaves throughout fall."
    },
    {
      question: "Can you handle properties near Elizabeth Park?",
      answer: "Yes! Properties adjacent to Elizabeth Park often receive wind-blown leaves from the park's extensive gardens and wooded areas. We clear these accumulations, prevent debris from impacting your drainage systems, and schedule visits accounting for the park's significant tree canopy. Park-adjacent homes benefit from mid-season follow-up visits."
    },
    {
      question: "What's your approach for Conard and Hall High School area properties?",
      answer: "School-area properties receive service coordinated around academic schedules and traffic patterns. We work efficiently during school hours to avoid morning and afternoon traffic congestion. Properties near school campuses often collect additional leaves from campus trees and benefit from our multi-visit approach."
    },
    {
      question: "Do you coordinate with West Hartford HOAs and neighborhood associations?",
      answer: "Absolutely. We work with numerous HOAs throughout West Hartford and understand their landscaping standards and requirements. We coordinate timing, provide documentation for association records, and ensure all work meets or exceeds community guidelines. Many associations schedule us for annual seasonal contracts."
    },
    {
      question: "Can you service properties in Bishop's Corner area?",
      answer: "Yes! Bishop's Corner combines residential and commercial properties that all receive our professional service. We adjust scheduling and equipment based on property type - early morning for commercial areas, daytime for residential. The area's mature landscaping produces significant leaf volume requiring multiple seasonal visits."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="West Hartford, CT"
      seoTitle="Fall Cleanup West Hartford CT | Leaf Removal & Yard Cleanups | G&D Landscaping"
      seoDescription="Leaf removal, pruning, and seasonal cleanup for West Hartford Center, Elmwood, Bishop's Corner, and Blue Back Square neighborhoods."
      seoKeywords="fall cleanup West Hartford CT, leaf removal West Hartford, West Hartford yard cleanup"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-west-hartford-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup West Hartford CT - G&D Landscaping',
        description:
          'Professional fall cleanup, leaf removal, and property winterization across West Hartford, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'West Hartford'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
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

      faqs={faqs}

      />
  );
};

export default FallCleanupWestHartfordPage;
