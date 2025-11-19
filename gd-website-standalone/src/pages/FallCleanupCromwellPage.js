import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupCromwellPage = () => {

  const serviceHighlights = [
    {
      icon: '🌊',
      title: 'Riverfront Expertise',
      description: 'Extra passes along River Highlands and Main Street keep moisture-heavy leaves from matting.'
    },
    {
      icon: '⏱️',
      title: 'Fast Dispatch',
      description: 'Crews are staged minutes away in Berlin for quick response when storms change.'
    },
    {
      icon: '🧤',
      title: 'Thorough Detailing',
      description: 'Beds, patios, and walkways are cleaned so homes and storefronts stay guest-ready.'
    }
  ];

  const areas = [
    'Cromwell Center',
    'North Cromwell',
    'South Cromwell',
    'West Street corridor',
    'Nooks Hill',
    'Main Street District',
    'River Highlands',
    'Industrial Park'
  ];

  const overviewHighlights = [
    'Riverfront neighborhoods receive pre-planned cleanup windows before high winds push leaves downstream.',
    'Golf-adjacent properties get combined leaf removal, shrub pruning, and ornamental grass cutbacks.',
    'Business parks along Route 372 receive after-hours service to protect curb appeal and parking access.'
  ];

  const serviceStats = [
    { value: '4:15 AM', label: 'Storm monitoring begins' },
    { value: '12', label: 'Routes across Cromwell' },
    { value: '2', label: 'Passes per cleanup' }
  ];

  const faqs = [
    {
      question: "Do you service properties in the River Highlands golf community?",
      answer: "Absolutely! River Highlands properties receive premium treatment given the community's high standards. We coordinate with HOA requirements, work around golf course views, and ensure properties maintain the neighborhood's immaculate appearance. Our crews are familiar with the community's guidelines and landscaping expectations."
    },
    {
      question: "How do you handle riverfront properties along the Connecticut River?",
      answer: "Properties along the Connecticut River require special attention due to increased moisture and wind exposure. We schedule cleanups to prevent leaf matting from river humidity, clear drainage areas to prevent flooding, and remove debris that could wash into the river. Multiple visits are often needed due to wind bringing additional leaves from upstream areas."
    },
    {
      question: "Can you service businesses along Main Street and Route 372?",
      answer: "Yes! We service commercial properties, retail centers, and office parks throughout Cromwell's business districts. We offer flexible scheduling including after-hours and early morning service to ensure parking lots, entrances, and sidewalks are clean before business hours. Property managers receive completion documentation and photos."
    },
    {
      question: "What about properties on Nooks Hill with steep terrain?",
      answer: "Nooks Hill's elevation changes require specialized equipment and techniques. Our crews use self-propelled blowers, tarping systems, and careful staging to prevent leaves from sliding down slopes. We're experienced with hillside properties and ensure thorough cleanup without erosion or damage to retaining walls and drainage features."
    },
    {
      question: "Do you handle cleanup for the industrial park area?",
      answer: "Absolutely. We service commercial and industrial properties including warehouse facilities, office complexes, and light manufacturing sites. We understand the importance of maintaining professional appearances for client visits and ensure parking areas, loading docks, and entrances stay clear of debris year-round."
    },
    {
      question: "How do you work around TPC River Highlands event schedules?",
      answer: "We're familiar with major events at TPC River Highlands and schedule our routes to avoid traffic congestion during tournaments and events. For properties near the course, we can adjust timing to ensure your property looks its best during peak visitor times when the neighborhood gets extra attention."
    },
    {
      question: "Can you clear leaves from properties near Pierson Park?",
      answer: "Yes! Properties adjacent to Pierson Park often receive wind-blown leaves from the park's mature trees. We clear these accumulations and ensure drainage areas near the park stay functional. Our crews prevent leaf buildup that could impact your property's storm water management."
    },
    {
      question: "What's your approach for properties along West Street corridor?",
      answer: "West Street properties get dedicated route attention given the mix of residential and commercial buildings. We adjust equipment size and timing based on property type - residential cleanups happen during daytime hours while commercial properties can be serviced early morning or after-hours to minimize disruption."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="Cromwell, CT"
      seoTitle="Fall Cleanup Cromwell CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Cromwell fall cleanup pros. Leaf removal, bed cutbacks, and disposal for River Highlands, Nooks Hill, and Cromwell Center properties."
      seoKeywords="fall cleanup Cromwell CT, leaf removal Cromwell, yard cleanup Cromwell Connecticut, fall landscaping Cromwell"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-cromwell-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Cromwell CT - GD Landscaping',
        description:
          'Professional fall cleanup, leaf removal, and property winterization services for Cromwell, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Cromwell'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Cromwell, CT',
        title: 'Fall Cleanup Cromwell CT',
        subtitle:
          'Keep Main Street, River Highlands, and Nooks Hill properties spotless with professional leaf removal and seasonal prep.',
        addressPrompt: 'Type your Cromwell address for instant fall cleanup availability',
        ctaPrimaryText: 'Book Cromwell Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Cromwell’s riverfront weather demands flexible fall cleanup routes. We tune schedules around wind, tide, and neighborhood needs.',
        snapshotCopy: 'Supervisors coordinate with HOAs and property managers for seamless cleanups.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal and seasonal prep across Main Street, Riverport, and Nooks Hill."
      quoteConfig={{
        title: 'Plan Your Cromwell Fall Cleanup',
        subtitle: 'Send us your checklist and we’ll tailor a cleanup plan with precise timing.',
        locationName: 'Cromwell Fall Cleanup',
        source: 'Cromwell Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Cromwell Property?',
        body: 'Reserve your cleanup slot before schedules fill. Seasonal packages for homes, HOAs, and businesses.',
        primaryText: 'Get Cromwell Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default FallCleanupCromwellPage;
