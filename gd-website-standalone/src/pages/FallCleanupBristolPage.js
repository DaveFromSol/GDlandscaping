import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupBristolPage = () => {

  const serviceHighlights = [
    {
      icon: '🧹',
      title: 'Detail Focused',
      description: 'Beds, decks, patios, and stairs are blown clean so Bristol homes look market-ready.'
    },
    {
      icon: '🚛',
      title: 'On-Route Crews',
      description: 'Dedicated trucks loop through Bristol each day during peak season to keep curb appeal dialed in.'
    },
    {
      icon: '🕓',
      title: 'Rapid Follow-Ups',
      description: 'High winds or late storms trigger automatic revisits so piles never linger.'
    }
  ];

  const areas = [
    'Downtown Bristol',
    'Forestville',
    'Edgewood',
    'Federal Hill',
    'Stafford Ave. corridor',
    'Lake Avenue',
    'Birge Pond area',
    'Chippens Hill'
  ];

  const overviewHighlights = [
    'Tight downtown lots and spacious yards alike receive crews matched to the property layout.',
    'Comprehensive leaf removal, shrub trimming, and bed winterization keep Bristol landscapes ready for winter.',
    'Commercial clients downtown receive after-hours cleanup so sidewalks and parking lots open on time.'
  ];

  const serviceStats = [
    { value: '30 min', label: 'Average ETA updates' },
    { value: '5', label: 'Dedicated Bristol crews' },
    { value: '100%', label: 'Haul-away included' }
  ];

  const faqs = [
    {
      question: "Do you service both Forestville and downtown Bristol?",
      answer: "Yes! We have routes covering all Bristol neighborhoods from Forestville to Federal Hill to downtown. Forestville properties often have larger lots and mature trees, while downtown properties are more compact. We adjust our equipment and crew size to match each area's specific needs."
    },
    {
      question: "Can you handle cleanup around Birge Pond and lake-front properties?",
      answer: "Absolutely. Properties near Birge Pond and other water features receive special attention. We're careful to prevent leaf debris from entering waterways and drainage systems. Our crews clear shoreline areas, docks, and water-adjacent beds to prevent algae buildup and maintain clean lake access."
    },
    {
      question: "What about properties on Federal Hill with steep slopes?",
      answer: "Federal Hill's elevation changes require specialized techniques. We use self-propelled equipment and tarping systems to control leaf movement on slopes. Our crews are trained in hillside safety and ensure thorough cleanup without erosion or lawn damage on Bristol's hilly terrain."
    },
    {
      question: "Do you coordinate with local events and ESP production schedules?",
      answer: "Yes, we're familiar with Bristol's active event calendar. We schedule around major events and coordinate timing with property managers for commercial properties. For downtown businesses, we offer flexible scheduling to avoid disrupting customer access during peak hours."
    },
    {
      question: "Can you service properties along the Farmington Canal Trail?",
      answer: "Definitely! Properties adjacent to the trail often collect wind-blown leaves from trail users and adjacent wooded areas. We clear these accumulations and ensure your property maintains curb appeal despite the higher leaf traffic from the trail corridor."
    },
    {
      question: "What's your approach for Edgewood neighborhood with mature trees?",
      answer: "Edgewood has beautiful mature hardwoods that produce significant leaf volume. We recommend 2-3 cleanup visits for these properties - an early-season cleanup in October, a mid-season visit in November, and a final cleanup in December after oaks complete their drop. This prevents thick matting that can damage lawns."
    },
    {
      question: "Do you handle cleanup for Chippens Hill properties?",
      answer: "Yes! Chippens Hill properties get full-service cleanup including steep driveway clearing, hillside leaf removal, and careful attention to retaining walls and drainage features. Our crews know the area well and adjust techniques for the neighborhood's unique topography."
    },
    {
      question: "Can you service commercial properties on Stafford Avenue?",
      answer: "Absolutely. We service retail centers, office parks, and commercial properties along the Stafford Avenue corridor. We work early morning or after-hours to ensure parking lots, entrances, and sidewalks are clean before business hours. Property managers receive photo documentation and completion reports."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="Bristol, CT"
      seoTitle="Fall Cleanup Bristol CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Bristol CT fall cleanup services: leaf removal, gutter policing, shrub cutbacks, and haul-away from attentive local crews."
      seoKeywords="fall cleanup Bristol CT, leaf removal Bristol, yard cleanups Bristol Connecticut, fall landscaping Bristol"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-bristol-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Bristol CT - GD Landscaping',
        description:
          'Professional leaf removal, yard cleanups, and seasonal prep for residential and commercial properties throughout Bristol, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Bristol'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Bristol, CT',
        title: 'Fall Cleanup Bristol CT',
        subtitle:
          'Leaf removal, shrub pruning, and seasonal prep for Bristol homes and businesses with full-service crews.',
        addressPrompt: 'Type your Bristol address for instant fall cleanup scheduling',
        ctaPrimaryText: 'Book Bristol Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'We tailor equipment, crew size, and timing for every Bristol property so cleanups finish efficiently.',
        snapshotCopy: 'Our Hardware City teams stay routed nearby for fast follow-ups when late storms roll through.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Freshly cleared lawns and beds across Bristol."
      quoteConfig={{
        title: 'Plan Your Bristol Fall Cleanup',
        subtitle: 'Send property details and we’ll confirm the next opening on your preferred route.',
        locationName: 'Bristol Fall Cleanup',
        source: 'Bristol Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Bristol Property?',
        body: 'Reserve your fall cleanup window before schedules fill up. Seasonal packages for every lot size.',
        primaryText: 'Get Bristol Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default FallCleanupBristolPage;
