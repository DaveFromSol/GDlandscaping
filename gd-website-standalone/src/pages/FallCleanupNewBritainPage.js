import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupNewBritainPage = () => {

  const serviceHighlights = [
    {
      icon: '🏘️',
      title: 'Neighborhood Pros',
      description: 'We know every downtown alley and condo courtyard, so crews move quickly without missing details.'
    },
    {
      icon: '🧺',
      title: 'Full Disposal',
      description: 'Leaf haul-away, sweeping, and final mow leave properties ready for winter.'
    },
    {
      icon: '📲',
      title: 'Easy Updates',
      description: 'Route notifications let homeowners and property managers know when crews are on the way.'
    }
  ];

  const areas = [
    'Downtown New Britain',
    'Little Poland',
    'Belvedere',
    'Sloper',
    'West End',
    'East Side',
    'South End',
    'Hardware City industrial zone'
  ];

  const overviewHighlights = [
    'Compact crews handle tight city lots while larger teams service Belvedere and suburban neighborhoods.',
    'Leaf vacuums and sweepers manage storefront sidewalks along Broad Street and Main Street overnight.',
    'Industrial and condo clients receive scheduled follow-ups to keep drains clear before freeze-up.'
  ];

  const serviceStats = [
    { value: '25', label: 'City blocks serviced daily' },
    { value: '6', label: 'Dedicated crews' },
    { value: '4.9/5', label: 'Local rating' }
  ];

  const faqs = [
    {
      question: "Do you service properties in Little Poland neighborhood?",
      answer: "Absolutely! Little Poland is one of our core service areas. We're familiar with the neighborhood's tight streets, on-street parking patterns, and mix of single-family and multi-family properties. Our crews work efficiently around the area's unique character while delivering thorough cleanup service."
    },
    {
      question: "Can you handle downtown storefronts along Broad Street and Main Street?",
      answer: "Yes! We service commercial properties throughout downtown New Britain including retail stores, restaurants, and office buildings. We work overnight or early morning (typically 4-6 AM) to ensure sidewalks, entrances, and parking areas are spotless before businesses open. Storefronts receive priority attention to maintain professional appearances."
    },
    {
      question: "What about properties in Belvedere and Sloper neighborhoods?",
      answer: "Belvedere and Sloper properties get dedicated residential service with equipment sized for suburban lots. These neighborhoods have mature trees that produce significant leaf volume, so we typically recommend 2-3 cleanup visits throughout fall. Properties with mixed hardwoods benefit from staggered visits as different species drop leaves on different schedules."
    },
    {
      question: "Do you work around CCSU campus and student housing areas?",
      answer: "Yes! We service properties near Central Connecticut State University including student housing, faculty residences, and nearby apartment buildings. We coordinate around academic schedules and work with property managers to ensure minimal disruption to residents during busy periods like move-in, exams, and semester transitions."
    },
    {
      question: "Can you service the Hardware City industrial zone?",
      answer: "Absolutely. We handle commercial and light industrial properties including warehouse facilities, manufacturing sites, and office/warehouse combinations. We understand the importance of maintaining professional appearances for client visits and ensure parking areas, loading zones, and building entrances stay clean year-round."
    },
    {
      question: "How do you handle the steep streets in West End and South End?",
      answer: "West End and South End have challenging terrain with steep slopes and elevation changes. We use self-propelled equipment, strategic leaf containment, and hillside-specific techniques. Our crews are trained in slope safety and ensure thorough cleanup without leaves sliding into streets, storm drains, or neighboring properties."
    },
    {
      question: "What's your approach for multi-family buildings and condo complexes?",
      answer: "Multi-family properties receive comprehensive service with detailed documentation. Property managers get before/after photos, completion reports, and scheduled maintenance plans. We handle common areas, parking lots, individual unit yards, and courtyard spaces. Our crews coordinate timing to minimize resident disruption."
    },
    {
      question: "Do you coordinate with New Britain's parking ban schedule?",
      answer: "Yes! We monitor New Britain's winter parking ban calendar and schedule cleanups accordingly. For properties with street parking, we communicate 24-48 hours in advance about our arrival time and work efficiently to minimize any parking restrictions. Most residential cleanups happen during daytime hours when street parking is typically available."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="New Britain, CT"
      seoTitle="Fall Cleanup New Britain CT | Leaf Removal & Seasonal Cleanup | GD Landscaping"
      seoDescription="Leaf removal and fall cleanups across New Britain, CT. Serving Little Poland, Belvedere, Sloper, and downtown corridors."
      seoKeywords="fall cleanup New Britain CT, leaf removal New Britain, yard cleanup New Britain Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-new-britain-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup New Britain CT - GD Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization for homes and businesses throughout New Britain, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'New Britain'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving New Britain, CT',
        title: 'Fall Cleanup New Britain CT',
        subtitle:
          'Leaf removal, pruning, and cleanup for downtown apartments, Little Poland storefronts, Belvedere homes, and more.',
        addressPrompt: 'Type your New Britain address for instant fall cleanup options',
        ctaPrimaryText: 'Book New Britain Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Hardware City properties vary from tight city lots to sprawling neighborhoods. We tailor crews for each street.',
        snapshotCopy: 'Supervisors keep crews rotating through the city for quick follow-ups after windy nights.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal and cleanup projects across Little Poland, Belvedere, and downtown."
      quoteConfig={{
        title: 'Plan Your New Britain Fall Cleanup',
        subtitle: 'Send us your property details and preferred timing—we’ll reply with a precise quote.',
        locationName: 'New Britain Fall Cleanup',
        source: 'New Britain Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free New Britain Property?',
        body: 'Reserve your cleanup slot before schedules fill up. Perfect for homes, condos, and storefronts.',
        primaryText: 'Get New Britain Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default FallCleanupNewBritainPage;
