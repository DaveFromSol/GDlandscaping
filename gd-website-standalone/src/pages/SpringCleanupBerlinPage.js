import React from 'react';
import SpringCleanupTemplate from './SpringCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const SpringCleanupBerlinPage = () => {
  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Local Berlin Crews',
      description: 'Berlin-based teams tackle Kensington, East Berlin, and Worthington Ridge properties fast once the ground thaws.'
    },
    {
      icon: '🌿',
      title: 'Full Debris Removal',
      description: 'Winter branches, matted leaves, dead annuals, and salt-damaged mulch all hauled away in one visit.'
    },
    {
      icon: '📅',
      title: 'Early-Season Booking',
      description: 'Reserve your slot before the spring rush — Berlin routes fill up quickly in April.'
    }
  ];

  const areas = [
    'Downtown Berlin', 'Kensington', 'East Berlin', 'Worthington Ridge',
    'Berlin Center', 'Country Club Road', 'Mill Street', 'Christian Lane'
  ];

  const overviewHighlights = [
    'Crews remove winter debris, matted leaves, and dead growth before lawn season begins.',
    'Bed edging, fresh mulch, and perennial cutbacks leave every Berlin property looking sharp.',
    'We clear drainage areas along Worthington Ridge to prevent spring flooding and standing water.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '15+', label: 'Berlin crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "When does the ground thaw in Berlin CT so spring cleanup can begin?",
      answer: "Berlin's ground typically thaws enough for safe foot traffic and cleanup by late March to early April, depending on winter severity. We monitor conditions closely and schedule Berlin cleanups as soon as it's safe to work without rutting lawns."
    },
    {
      question: "Do you remove the winter sand and salt residue from driveways and beds?",
      answer: "Yes. We blow out sand and salt residue from bed edges and hard surfaces, and replace salt-damaged mulch in beds along driveways and walkways. This is especially important in Berlin where road salt can damage plant roots if left sitting through spring."
    },
    {
      question: "Can you handle both Kensington's larger lots and downtown Berlin's compact yards?",
      answer: "Absolutely. We size our equipment to the property — high-capacity vacuums and trailers for Kensington's expansive lawns, and compact walk-behind equipment for downtown Berlin's tighter spaces. Same crew quality, just right-sized tools."
    },
    {
      question: "Do you cut back ornamental grasses and perennials in spring?",
      answer: "Yes, cutting back ornamental grasses and perennials that weren't cut in fall is a key part of our spring cleanup. We leave a few inches of stem to protect the crown and encourage healthy new growth. Berlin's cold winters mean most perennials benefit from a fresh spring cut."
    },
    {
      question: "Can you clear the drainage areas near Mill Street and low-lying Berlin properties?",
      answer: "Yes. We pay special attention to drainage swales, storm drains, and low-lying areas around Mill Street to prevent spring flooding. Clearing debris from these areas early in the season is critical for Berlin properties near the Mattabesett River corridor."
    },
    {
      question: "What's your typical response time for spring cleanups in Berlin?",
      answer: "We aim to start within 48 hours of booking confirmation, weather permitting. Spring is our busiest season, so we recommend booking in late February or early March to secure your preferred week. Berlin customers who book early get priority scheduling."
    },
    {
      question: "Do you offer lawn aeration after spring cleanup in Berlin?",
      answer: "Yes, spring core aeration is one of our most popular add-ons. Berlin lawns that took a beating from winter salt, heavy foot traffic, or snow plowing benefit greatly from spring aeration and overseeding. Ask us about bundling cleanup with aeration for the best rate."
    },
    {
      question: "Can you add fresh mulch to my Berlin beds after the cleanup?",
      answer: "Absolutely. Fresh mulch is our most requested spring add-on in Berlin. We remove the old matted mulch, edge the beds cleanly, and apply fresh material in your choice of color and type. Country Club Road estates and Kensington properties especially benefit from a freshly mulched spring presentation."
    }
  ];

  return (
    <SpringCleanupTemplate
      townName="Berlin, CT"
      seoTitle="Spring Cleanup Berlin CT | Yard Cleanup & Lawn Prep | G&D Landscaping"
      seoDescription="Professional spring cleanup in Berlin, CT. Debris removal, bed edging, mulching, and lawn prep for Kensington, East Berlin, and Worthington Ridge. Call G&D Landscaping today."
      seoKeywords="spring cleanup Berlin CT, yard cleanup Berlin, spring lawn prep Berlin Connecticut, debris removal Berlin CT, spring landscaping Berlin"
      canonicalUrl="https://www.gdlandscapingllc.com/spring-cleanup-berlin-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Spring Cleanup Berlin CT - G&D Landscaping',
        description: 'Professional spring yard cleanup, debris removal, bed edging, and lawn prep services for Berlin, Connecticut homeowners.',
        areaServed: { '@type': 'City', name: 'Berlin' },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Berlin, CT'
        },
        serviceType: 'Spring Cleanup'
      }}
      hero={{
        badge: '🌱 Serving Berlin, CT',
        title: 'Spring Cleanup Berlin CT',
        subtitle: 'Clear out winter debris, refresh your beds, and get your Berlin property ready for a beautiful spring and summer.',
        addressPrompt: 'Type your Berlin address for a spring cleanup quote',
        ctaPrimaryText: 'Book Berlin Spring Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:8605267583`,
        overviewIntro: 'Berlin properties range from Worthington Ridge hillside estates to compact downtown lots. We tailor our spring cleanup approach to each neighborhood.',
        snapshotCopy: 'Our Berlin crews are staged locally for fast spring scheduling as soon as conditions allow.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Spring debris removal, bed edging, and lawn prep from Kensington to East Berlin."
      quoteConfig={{
        title: 'Plan Your Berlin Spring Cleanup',
        subtitle: "Send us your address and we'll respond with a same-day estimate.",
        locationName: 'Berlin Spring Cleanup',
        source: 'Berlin Spring Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Fresh Start This Spring in Berlin?',
        body: 'Reserve your cleanup slot before schedules fill up. Spring packages for every property type in Berlin.',
        primaryText: 'Get Berlin Spring Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default SpringCleanupBerlinPage;
