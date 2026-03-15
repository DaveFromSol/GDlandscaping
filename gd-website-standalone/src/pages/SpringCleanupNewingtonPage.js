import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupNewingtonPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Newington Local Crews',
      description: 'Teams cover Newington Center, Willard Avenue, and residential neighborhoods efficiently each spring.'
    },
    {
      icon: '🌿',
      title: 'Suburban Specialists',
      description: "Newington's established suburban neighborhoods get thorough debris removal and bed prep every spring."
    },
    {
      icon: '📅',
      title: 'Reliable Scheduling',
      description: 'Route alerts keep you informed — we show up when we say we will, every time.'
    }
  ];

  const areas = [
    'Newington Center', 'Willard Avenue area', 'Cedar Mountain', 'Robbins Avenue',
    'Church Street corridor', 'Grantmoor area', 'Merry Lane', 'Folly Brook area'
  ];

  const overviewHighlights = [
    'Newington lawns cleared of winter debris and salt damage before the growing season begins.',
    'Bed edging and mulch applications available to refresh Newington\'s well-maintained suburban properties.',
    'Cedar Mountain and wooded Newington areas get extra debris and branch removal attention.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '10+', label: 'Newington crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "When do you start spring cleanups in Newington?",
      answer: "Newington spring cleanups typically begin in late March or early April. Newington's suburban layout and good street access means we can often start earlier than more rural areas. We recommend booking in February for April availability."
    },
    {
      question: "Do you service all Newington neighborhoods?",
      answer: "Yes. We have established routes covering all of Newington including the center, Willard Avenue corridor, Cedar Mountain area, and the neighborhoods near Folly Brook. Our Newington crews are very familiar with the local roads and property types."
    },
    {
      question: "Can you handle properties near Cedar Mountain with wooded lots?",
      answer: "Yes. Cedar Mountain properties often have heavier debris loads from surrounding trees. We bring high-capacity equipment for wooded Newington lots and make sure all branches, fallen limbs, and leaf accumulation are thoroughly cleared."
    },
    {
      question: "Do you remove salt damage from Newington driveways and beds?",
      answer: "Yes. Salt residue along Newington's suburban driveways and walkways can damage turf edges and bed plants. We clear salt-damaged mulch, flush out residue, and replace with fresh material as part of our spring cleanup add-ons."
    },
    {
      question: "Can I bundle spring cleanup with regular mowing in Newington?",
      answer: "Absolutely. Many Newington customers bundle spring cleanup with our weekly mowing program and save on both services. It's the most convenient way to start the season and ensure your lawn gets consistent care all summer."
    },
    {
      question: "Do you offer spring mulch installation in Newington?",
      answer: "Yes. Fresh spring mulch is very popular with Newington homeowners. We remove old matted mulch, edge beds cleanly, and apply fresh material in your choice of type and color. Most Newington beds look dramatically better with a spring mulch refresh."
    },
    {
      question: "How long does a typical Newington spring cleanup take?",
      answer: "Most Newington residential properties take 2–4 hours depending on size and debris volume. Properties near wooded areas may take slightly longer. We'll estimate your specific cleanup time when we provide your quote."
    },
    {
      question: "Do you offer spring aeration for Newington lawns?",
      answer: "Yes. Spring core aeration helps Newington lawns recover from winter compaction. We recommend combining aeration with overseeding to fill in bare or thin spots before the summer growing season begins."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Newington, CT"
      seoTitle="Spring Cleanup Newington CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Newington, CT. Debris removal, bed edging, mulching, and lawn prep for Newington Center, Cedar Mountain, and surrounding neighborhoods."
      seoKeywords="spring cleanup Newington CT, yard cleanup Newington, spring lawn prep Newington Connecticut, debris removal Newington CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-newington-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Newington CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep services for Newington, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'Newington' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Newington, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Newington, CT',
        title: 'Spring Cleanup Newington CT',
        subtitle: 'Give your Newington property a fresh start this spring with professional debris removal, bed cleanup, and lawn prep.',
        addressPrompt: 'Type your Newington address for a spring cleanup quote',
        ctaPrimaryText: 'Book Newington Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: "Newington's well-maintained suburban neighborhoods deserve a professional spring cleanup that sets every lawn up for a healthy, beautiful season.",
        snapshotCopy: 'Newington crews are locally staged and ready to mobilize as soon as spring conditions allow.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep across Newington neighborhoods."
      quoteConfig={{
        title: 'Plan Your Newington Spring Cleanup',
        subtitle: "Tell us about your property and we'll respond with a same-day estimate.",
        locationName: 'Newington Spring Cleanup',
        source: 'Newington Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in Newington?',
        body: 'Book your spring cleanup before routes fill up. Packages for every Newington property.',
        primaryText: 'Get Newington Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupNewingtonPage;
