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

  const faqs = [
    {
      question: "Do you service properties in the Ferry Landing riverfront area?",
      answer: "Absolutely! Ferry Landing properties require special attention due to Connecticut River proximity. We prevent leaf debris from entering the river, clear drainage features proactively, and schedule multiple passes to manage wind-blown leaves from riverside vegetation. Properties with river views get premium treatment matching the area's high standards."
    },
    {
      question: "Can you handle the Dividend neighborhood?",
      answer: "Yes! Dividend is one of our core service areas. We're familiar with the neighborhood's mature trees, curved streets, and mix of property sizes. Crews adjust equipment and techniques based on each lot's specific needs - from compact yards to larger estate properties with extensive landscaping."
    },
    {
      question: "What about properties along Silas Deane Highway commercial corridor?",
      answer: "Silas Deane Highway businesses receive professional commercial service including retail centers, office parks, and mixed-use developments. We offer flexible scheduling including overnight and early morning service to ensure parking lots, entrances, and sidewalks are clean before business hours. Property managers receive completion documentation."
    },
    {
      question: "Do you work around Glastonberry properties and Corporate Ridge?",
      answer: "Absolutely. Corporate Ridge office parks and nearby residential areas get dedicated route attention. Commercial properties receive business-hours or after-hours service as needed. We understand the importance of maintaining professional appearances for office buildings that receive client visits and ensure consistent quality."
    },
    {
      question: "Can you navigate the hillside properties in West Rocky Hill?",
      answer: "Yes! West Rocky Hill has challenging elevation changes that require specialized techniques. We use self-propelled equipment, strategic containment, and hillside-specific methods to manage leaves on steep terrain. Our crews are trained in slope safety and prevent erosion or damage to retaining walls and drainage features."
    },
    {
      question: "What's your approach for properties near Dinosaur State Park?",
      answer: "Properties near Dinosaur State Park often collect wind-blown leaves from the park's wooded areas. We clear these accumulations and schedule visits to account for the additional leaf volume. Park-adjacent properties typically benefit from an extra mid-season cleanup to prevent thick matting from the park's extensive tree canopy."
    },
    {
      question: "Do you service Old Main Street historic properties?",
      answer: "Yes! Old Main Street properties receive careful treatment appropriate for historic homes. We work around mature plantings, stone walls, and period landscaping features. Our crews use equipment sized for these properties and understand the importance of preserving historic character while delivering thorough modern cleanup service."
    },
    {
      question: "Can you handle multi-family properties and apartment complexes?",
      answer: "Absolutely. Rocky Hill has numerous multi-family properties that receive our professional service. Property managers get detailed documentation, photo updates, and scheduled maintenance plans. We coordinate common area cleanup, parking lot service, and individual unit yards with timing that minimizes resident disruption."
    }
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

      faqs={faqs}

      />
  );
};

export default FallCleanupRockyHillPage;
