import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupHartfordPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Hartford City Crews',
      description: 'Experienced teams handle West End, Blue Hills, and South End properties with city-appropriate equipment.'
    },
    {
      icon: '🌿',
      title: 'Urban Property Experts',
      description: 'Compact city lots, tight access, and shared property lines — we know how to work them cleanly.'
    },
    {
      icon: '📅',
      title: 'Commercial & Residential',
      description: 'Spring cleanups for both Hartford homeowners and commercial property managers.'
    }
  ];

  const areas = [
    'West End', 'Blue Hills', 'South End', 'Asylum Hill',
    'Parkville', 'Frog Hollow', 'North End', 'downtown Hartford'
  ];

  const overviewHighlights = [
    'City properties cleared of winter debris, litter, and dead growth before the busy spring season.',
    'Compact equipment for tight Hartford lots — no access too tricky for our crews.',
    'Commercial and multi-family properties welcome — we handle volume accounts throughout Hartford.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '20+', label: 'Hartford crew members' },
    { value: '4.9/5', label: 'Customer rating' }
  ];

  const faqs = [
    {
      question: "Do you service Hartford city properties for spring cleanup?",
      answer: "Yes. We regularly service Hartford residential and commercial properties throughout the city. Our crews use compact equipment suited for urban lots with limited access and tight spaces between properties."
    },
    {
      question: "Can you handle multi-family and apartment building spring cleanups in Hartford?",
      answer: "Absolutely. We work with Hartford property managers and landlords on multi-family spring cleanups. We can coordinate access, work around tenant schedules, and handle high-volume debris removal for larger buildings."
    },
    {
      question: "Do you work in all Hartford neighborhoods including North End and South End?",
      answer: "Yes. We serve all Hartford neighborhoods including West End, Blue Hills, South End, Asylum Hill, Parkville, and Frog Hollow. Our crews are familiar with Hartford's neighborhoods and schedule efficient routes throughout the city."
    },
    {
      question: "What do you include in a Hartford spring cleanup?",
      answer: "For Hartford properties we typically include debris and litter removal, dead plant and leaf cleanup, bed edging, and optional mulching. We adapt our service list based on your specific property needs and budget."
    },
    {
      question: "Do you offer commercial spring cleanup for Hartford businesses?",
      answer: "Yes. Many Hartford businesses rely on us for spring curb appeal cleanup before their busy season. We handle parking lot perimeters, foundation beds, and entrance areas for commercial properties throughout Hartford."
    },
    {
      question: "When do you start spring cleanups in Hartford?",
      answer: "Hartford spring cleanups begin in late March or early April. City properties tend to be accessible earlier than suburban ones since streets are plowed promptly. We can often start Hartford cleanups a week or two before surrounding towns."
    },
    {
      question: "Can you remove winter debris from Hartford properties quickly?",
      answer: "Yes. Our Hartford crews are efficient with city lots. Most residential Hartford spring cleanups are completed in 1–3 hours. Commercial properties vary by size. We aim to minimize disruption and get in and out quickly."
    },
    {
      question: "Do you offer recurring lawn maintenance after spring cleanup in Hartford?",
      answer: "Yes. Many Hartford customers transition from spring cleanup into our bi-weekly or monthly maintenance programs. We offer discounted rates when you bundle spring cleanup with ongoing service."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Hartford, CT"
      seoTitle="Spring Cleanup Hartford CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Hartford, CT. Debris removal, bed edging, and lawn prep for West End, Blue Hills, South End, and all Hartford neighborhoods."
      seoKeywords="spring cleanup Hartford CT, yard cleanup Hartford, spring lawn prep Hartford Connecticut, debris removal Hartford CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-hartford-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Hartford CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep for Hartford, Connecticut residential and commercial properties.',
        areaServed: { '@type': 'City', name: 'Hartford' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Hartford, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Hartford, CT',
        title: 'Spring Cleanup Hartford CT',
        subtitle: 'Get your Hartford property cleaned up and ready for spring with professional debris removal, bed cleanup, and lawn prep.',
        addressPrompt: 'Type your Hartford address for a spring cleanup quote',
        ctaPrimaryText: 'Book Hartford Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: "Hartford's diverse mix of city lots, multi-family properties, and commercial spaces all benefit from a professional spring cleanup to start the season right.",
        snapshotCopy: 'Hartford crews are city-experienced and move efficiently through urban neighborhoods.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep for Hartford residential and commercial properties."
      quoteConfig={{
        title: 'Plan Your Hartford Spring Cleanup',
        subtitle: "Tell us about your Hartford property and we'll respond with a same-day estimate.",
        locationName: 'Hartford Spring Cleanup',
        source: 'Hartford Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in Hartford?',
        body: 'Book your Hartford spring cleanup before slots fill. Residential and commercial packages available.',
        primaryText: 'Get Hartford Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupHartfordPage;
