import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupFarmingtonPage = () => {

  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Local Crews',
      description: 'Farmington-based teams move quickly between Unionville, Devonwood, and Talcott Mountain streets.'
    },
    {
      icon: '🧹',
      title: 'Thorough Finish',
      description: 'Beds, patios, decks, and driveways are blown clean so properties look market ready.'
    },
    {
      icon: '📅',
      title: 'Pro Scheduling',
      description: 'Route alerts + follow-up visits keep lawns clear even when late-season winds return.'
    }
  ];

  const areas = [
    'Farmington Village',
    'Unionville',
    'Devonwood',
    'Talcott Mountain',
    'Scott Swamp',
    'Tunxis / Route 4',
    'Farmington Woods',
    'Coppermine Road area'
  ];

  const overviewHighlights = [
    'Leaf vacuums and high-capacity trailers based in Farmington keep cleanup windows tight before the next storm.',
    'Seasonal plans combine final mow/stripe, selective pruning, and perennial cutbacks for curb-ready beds.',
    'Crews revisit drain inlets along Talcott Mountain and Unionville after major storms to prevent icy refreeze on aprons.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '15+', label: 'Farmington crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "Do you service the upscale estates in Devonwood?",
      answer: "Absolutely! Devonwood properties receive white-glove treatment matching the neighborhood's premium standards. We use commercial-grade equipment to handle large estates efficiently while maintaining meticulous attention to detail. Our crews understand Devonwood's expectations for landscaping excellence and deliver accordingly."
    },
    {
      question: "How do you handle the steep slopes around Talcott Mountain?",
      answer: "Talcott Mountain properties require specialized hillside techniques. We use self-propelled equipment, strategic tarping, and careful staging to manage leaves on steep terrain. Our crews are trained in slope safety and ensure thorough cleanup without erosion, property damage, or safety risks on Farmington's challenging topography."
    },
    {
      question: "Can you service properties in Unionville's historic district?",
      answer: "Yes! Unionville's historic properties get special care to preserve their character. We work around mature plantings, historic stone walls, and period landscaping features. Our crews understand the village's aesthetic standards and use equipment sized appropriately for the narrow streets and compact lots common in Unionville's center."
    },
    {
      question: "What about properties along Scott Swamp and wetland areas?",
      answer: "Properties near Scott Swamp and other wetlands receive environmentally conscious service. We prevent leaf debris from entering sensitive wetland areas, clear drainage features to maintain water flow, and use techniques that protect native vegetation. Our crews understand wetland buffer requirements and work accordingly."
    },
    {
      question: "Do you handle cleanup for Farmington Woods neighborhood?",
      answer: "Absolutely! Farmington Woods has extensive mature tree canopy that produces significant leaf volume. We typically recommend 2-3 cleanup visits for this neighborhood - early-season for maples, mid-season for mixed hardwoods, and a final visit for late-dropping oaks. This prevents lawn damage from thick leaf layers."
    },
    {
      question: "Can you service properties along the Farmington River?",
      answer: "Yes! River-adjacent properties get extra attention to prevent leaves and debris from entering the Farmington River. We clear streambanks, remove debris that could impact water quality, and ensure drainage features function properly. Our environmental awareness protects both your property and the river ecosystem."
    },
    {
      question: "What's your approach for properties along Route 4 and Tunxis areas?",
      answer: "Route 4 corridor properties often combine residential and light commercial uses. We schedule these cleanups to avoid peak traffic times and work efficiently to minimize any impact on road access. Properties get the same thorough treatment as our residential-only routes, just with strategic timing."
    },
    {
      question: "Do you coordinate with Farmington's strict leaf disposal regulations?",
      answer: "Yes. We haul all leaves and debris directly from your property - you won't need to deal with curbside pickup schedules or bring anything to the transfer station. Our disposal methods comply with all Farmington environmental regulations, and you avoid any town-imposed restrictions or timing requirements."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="Farmington, CT"
      seoTitle="Fall Cleanup Farmington CT | Leaf Removal & Yard Cleanups | G&D Landscaping"
      seoDescription="Professional fall cleanup in Farmington, CT. Leaf removal, gutter policing, and haul-away service for Unionville, Devonwood, and Talcott Mountain."
      seoKeywords="fall cleanup Farmington CT, leaf removal Farmington, fall yard cleanup Farmington Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-farmington-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Farmington CT - G&D Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization services for Farmington, Connecticut homeowners and businesses.',
        areaServed: {
          '@type': 'City',
          name: 'Farmington'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Farmington, CT'
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Farmington, CT',
        title: 'Fall Cleanup Farmington CT',
        subtitle:
          'Keep Unionville, Devonwood, and Talcott Mountain properties spotless with proactive leaf removal, pruning, and winter prep.',
        addressPrompt: 'Type your Farmington address for instant fall cleanup options',
        ctaPrimaryText: 'Book Farmington Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Farmington lawns range from hillside estates to compact village lots. We tailor equipment and cleanup order for each neighborhood.',
        snapshotCopy: 'Our Farmington crews stay staged inside town limits for rapid follow-ups after windy nights.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal, pruning, and haul-away from Unionville to Talcott Mountain."
      quoteConfig={{
        title: 'Plan Your Farmington Fall Cleanup',
        subtitle: 'Send us your address and priorities—we’ll respond with a same-day estimate.',
        locationName: 'Farmington Fall Cleanup',
        source: 'Farmington Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Farmington Lawn?',
        body: 'Reserve your cleanup slot before schedules fill up. Seasonal packages for every property type.',
        primaryText: 'Get Farmington Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default FallCleanupFarmingtonPage;
