import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupFarmingtonPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Farmington Local Crews',
      description: 'Teams cover Unionville, Farmington Center, and Devonwood neighborhoods with efficient spring routes.'
    },
    {
      icon: '🌿',
      title: 'Estate-Level Cleanup',
      description: "Farmington's larger properties get commercial-grade equipment for thorough winter debris removal."
    },
    {
      icon: '📅',
      title: 'Priority Scheduling',
      description: 'Book early — Farmington spring routes fill up fast. February booking gets April priority.'
    }
  ];

  const areas = [
    'Farmington Center', 'Unionville', 'Devonwood', 'Garden Street corridor',
    'Cope Farm Road area', 'Scott Swamp Road', 'Farmington River area', 'Mountain Road'
  ];

  const overviewHighlights = [
    'Larger Farmington lots require high-capacity equipment — we bring the right tools for every property.',
    'Bed edging, mulch, and perennial cutbacks complete the spring transformation for Farmington estates.',
    'Farmington River-adjacent properties get extra debris attention after spring snowmelt and runoff.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '12+', label: 'Farmington crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "Can you handle large Farmington estate properties for spring cleanup?",
      answer: "Absolutely. Farmington has some of Hartford County's larger residential properties, and we bring commercial-grade leaf vacuums, high-capacity trailers, and large crews for estate-level spring cleanups. We've handled everything from compact Unionville yards to multi-acre Devonwood properties."
    },
    {
      question: "Do you service Unionville and Farmington Center separately?",
      answer: "We cover all of Farmington including Unionville and Farmington Center on the same routes. Both areas are well within our service zone and receive the same high-quality spring cleanup service."
    },
    {
      question: "What about properties near the Farmington River?",
      answer: "River-adjacent Farmington properties often accumulate extra spring debris from flooding and seasonal runoff. We're experienced handling these conditions and bring appropriate equipment for heavier debris loads near the river corridor."
    },
    {
      question: "Do you offer spring mulch installation in Farmington?",
      answer: "Yes, and it's very popular among Farmington homeowners. We remove old mulch, cleanly edge beds, and apply fresh material. Garden Street and Devonwood properties especially benefit from a polished spring mulch application that complements their established landscapes."
    },
    {
      question: "When do you start spring cleanups in Farmington?",
      answer: "Farmington spring cleanups typically begin in late March or early April, once ground conditions allow safe access without lawn damage. We recommend booking in February to secure your preferred week."
    },
    {
      question: "Can you cut back ornamental grasses on Farmington properties?",
      answer: "Yes. Cutting back ornamental grasses and perennials is a standard part of our spring cleanup. Farmington's landscape-forward properties often have extensive ornamental plantings that benefit from a thorough spring cutback."
    },
    {
      question: "Do you offer spring aeration for Farmington lawns?",
      answer: "Yes. Core aeration is especially beneficial for Farmington's larger lawns that experience compaction from winter snow equipment and heavy foot traffic. We recommend bundling spring cleanup with aeration and overseeding for the best results."
    },
    {
      question: "Can I get a recurring lawn care plan starting with spring cleanup?",
      answer: "Absolutely. Many Farmington customers start with spring cleanup and transition into our weekly mowing and maintenance program. We offer discounted spring cleanup pricing when you commit to a seasonal lawn care plan."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Farmington, CT"
      seoTitle="Spring Cleanup Farmington CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Farmington, CT. Debris removal, bed edging, mulching, and lawn prep for Farmington Center, Unionville, and Devonwood. Call G&D today."
      seoKeywords="spring cleanup Farmington CT, yard cleanup Farmington, spring lawn prep Farmington Connecticut, debris removal Farmington CT"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-farmington-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Farmington CT - G&D Landscaping',
        description: 'Professional spring yard cleanup and lawn prep services for Farmington, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'Farmington' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Farmington, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Farmington, CT',
        title: 'Spring Cleanup Farmington CT',
        subtitle: 'Give your Farmington property a fresh start this spring with professional debris removal, bed cleanup, and lawn prep.',
        addressPrompt: 'Type your Farmington address for a spring cleanup quote',
        ctaPrimaryText: 'Book Farmington Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: 'tel:8605267583',
        overviewIntro: "Farmington's larger estates and established neighborhoods require the right equipment and expertise for a thorough spring cleanup.",
        snapshotCopy: 'Our Farmington crews bring commercial-grade equipment for every property size — from compact Unionville yards to expansive Devonwood estates.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal and lawn prep for Farmington properties."
      quoteConfig={{
        title: 'Plan Your Farmington Spring Cleanup',
        subtitle: "Share your property details and we'll respond with a same-day estimate.",
        locationName: 'Farmington Spring Cleanup',
        source: 'Farmington Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for Spring in Farmington?',
        body: 'Book your spring cleanup before routes fill up. Packages for every Farmington property size.',
        primaryText: 'Get Farmington Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupFarmingtonPage;
