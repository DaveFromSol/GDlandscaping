import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupCromwellPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Cromwell-Ready Crews',
      description: 'Teams cover Cromwell Center, South Cromwell, and River Road corridor properties efficiently each spring.'
    },
    {
      icon: '🌿',
      title: 'River Property Experts',
      description: 'Experienced handling Connecticut River-adjacent properties with heavy spring debris and moisture issues.'
    },
    {
      icon: '📅',
      title: 'Fast Spring Turnaround',
      description: 'Cromwell routes book quickly — secure your slot in February for April availability.'
    }
  ];

  const areas = [
    'Cromwell Center', 'South Cromwell', 'River Road', 'Coles Road',
    'West Street', 'Main Street corridor', 'industrial park area', 'Airline Road'
  ];

  const overviewHighlights = [
    'Winter debris, matted leaves, and dead growth removed before your Cromwell lawn wakes up.',
    'Bed edging and fresh mulch available to complete the spring transformation.',
    'River Road and Connecticut River-adjacent properties get extra attention for flood debris and moisture damage.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '10+', label: 'Cromwell crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "Do you handle spring cleanup for properties along the Connecticut River in Cromwell?",
      answer: "Yes. River Road and riverside properties in Cromwell often accumulate extra debris from spring flooding and wind. We're experienced with these conditions and bring appropriate equipment to handle heavier-than-normal debris loads near the river."
    },
    {
      question: "When do you start spring cleanups in Cromwell?",
      answer: "Cromwell spring cleanups typically begin in late March or early April. The area near the river may stay wetter longer, so we schedule riverside properties slightly later to avoid rutting lawns. We'll confirm timing based on your specific location."
    },
    {
      question: "Can you service both residential and light commercial properties in Cromwell?",
      answer: "Yes. We serve both residential neighborhoods and light commercial properties in Cromwell's industrial park and Main Street corridor. Commercial spring cleanups are priced per property and include curb appeal cleanup before the busy season."
    },
    {
      question: "Do you clear debris from around drainage areas and culverts?",
      answer: "Absolutely. Cromwell properties near low-lying areas and drainage culverts get special attention. We clear debris from drainage swales and catch basins to prevent spring flooding from blocking critical infrastructure."
    },
    {
      question: "Can I bundle spring cleanup with lawn mowing in Cromwell?",
      answer: "Yes, and we encourage it. Customers who bundle spring cleanup with our weekly mowing service get priority scheduling and a discounted rate on the cleanup. It's the best way to start the season strong in Cromwell."
    },
    {
      question: "Do you remove winter mulch and replace it with fresh material?",
      answer: "Yes. We remove salt-damaged and matted winter mulch from beds, edge cleanly, and apply fresh mulch in your preferred style. This is one of our most popular Cromwell spring add-ons and gives properties an immediate curb appeal boost."
    },
    {
      question: "How long does a Cromwell spring cleanup take?",
      answer: "Most Cromwell residential properties take 2–4 hours. River Road properties with heavier debris loads may take longer. We'll give you an accurate time estimate when we confirm your quote."
    },
    {
      question: "Do you offer spring aeration and overseeding in Cromwell?",
      answer: "Yes. Core aeration and overseeding in spring is very effective for Cromwell lawns damaged by winter salt, heavy snow, or foot traffic. We recommend combining aeration with your spring cleanup for the best lawn health results going into summer."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Cromwell, CT"
      seoTitle="Spring Cleanup Cromwell CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Cromwell, CT. Debris removal, bed edging, mulching, and lawn prep for Cromwell Center, River Road, and South Cromwell neighborhoods."
      seoKeywords="spring cleanup Cromwell CT, yard cleanup Cromwell, spring lawn prep Cromwell Connecticut, debris removal Cromwell CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-cromwell-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Cromwell CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep services for Cromwell, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'Cromwell' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Cromwell, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Cromwell, CT',
        title: 'Spring Cleanup Cromwell CT',
        subtitle: 'Start your Cromwell property fresh this spring with professional debris removal, bed cleanup, and lawn prep services.',
        addressPrompt: 'Type your Cromwell address for a spring cleanup quote',
        ctaPrimaryText: 'Book Cromwell Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: 'Cromwell properties range from riverside estates to compact residential lots. We bring the right equipment and expertise for each.',
        snapshotCopy: 'Cromwell crews are locally staged for rapid spring scheduling from Cromwell Center to South Cromwell.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep across Cromwell neighborhoods."
      quoteConfig={{
        title: 'Plan Your Cromwell Spring Cleanup',
        subtitle: "Share your property details and we'll respond with a same-day estimate.",
        locationName: 'Cromwell Spring Cleanup',
        source: 'Cromwell Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in Cromwell?',
        body: 'Book your Cromwell spring cleanup before the season rush. Packages for every property size.',
        primaryText: 'Get Cromwell Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupCromwellPage;
