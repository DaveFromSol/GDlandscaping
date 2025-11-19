import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupNewingtonPage = () => {

  const serviceHighlights = [
    { icon: '📍', title: 'Neighborhood Routes', description: 'Crews run dedicated loops for Newington Center, Maple Hill, and Willard.' },
    { icon: '🧺', title: 'Full Service', description: 'Leaf removal, pruning, and final mowing leave properties winter ready.' },
    { icon: '🧊', title: 'Ice Prevention', description: 'We clear curb lines and drains so meltwater doesn’t refreeze across driveways.' }
  ];

  const areas = [
    'Newington Center',
    'Maple Hill',
    'Willard District',
    'Cedar Mountain',
    'Church Street Corridor',
    'DiCenzo Area',
    'Berlin Turnpike Business District',
    'North End'
  ];

  const overviewHighlights = [
    'Maple Hill + Willard neighborhoods receive combined leaf removal and winter pruning so lawns stay healthy.',
    'Berlin Turnpike plazas get overnight cleanups with sweepers and loaders for zero daytime disruption.',
    'Cedar Mountain slopes receive extra passes to manage heavy woods and keep storm drains open.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'Routes begin' },
    { value: '10', label: 'Neighborhood loops' },
    { value: '2x', label: 'Average visits each fall' }
  ];

  const faqs = [
    {
      question: "Do you service properties near Town Center and Cedar Street?",
      answer: "Absolutely! Town Center properties receive dedicated attention given the area's high visibility and community standards. We coordinate around shopping center events and work efficiently to keep parking lots, sidewalks, and landscaped areas pristine. Cedar Street residential properties get the same thorough treatment with flexible scheduling."
    },
    {
      question: "Can you handle the steep hills in Churchill Park area?",
      answer: "Yes! Churchill Park and surrounding hillside properties require specialized slope equipment. We use self-propelled blowers, strategic tarping, and careful staging to prevent leaves from sliding down inclines. Our crews are trained in hillside safety and ensure complete cleanup without erosion or damage to retaining walls."
    },
    {
      question: "What about properties near Mill Pond Park?",
      answer: "Properties adjacent to Mill Pond Park receive extra attention to prevent leaves from entering the pond ecosystem. We clear drainage areas, remove debris that could impact water quality, and ensure your property's storm water features function properly. Park-adjacent homes often benefit from multiple cleanup visits due to wind patterns."
    },
    {
      question: "Do you service multi-family properties and condo associations?",
      answer: "Absolutely. We service numerous condo associations and apartment complexes throughout Newington. Property managers receive detailed documentation, before/after photos, and scheduled maintenance plans. We handle common areas, parking lots, walkways, and individual unit yards with coordinated timing to minimize resident disruption."
    },
    {
      question: "Can you work around Newington's leaf collection schedule?",
      answer: "Yes, but you won't need to! We haul all leaves and debris directly from your property - no curbside piles or waiting for town pickup. This means no restrictions on timing, no heavy bags to move, and no unsightly leaf piles sitting at the curb for days. We handle 100% of disposal."
    },
    {
      question: "What's your approach for properties along Berlin Turnpike?",
      answer: "Berlin Turnpike corridor properties require careful timing to work safely around traffic. We schedule these cleanups during lower-traffic periods and use appropriate safety protocols for roadside work. Commercial properties along the corridor can request after-hours service to maintain professional appearances without disrupting business."
    },
    {
      question: "Do you handle cleanup for church and institutional properties?",
      answer: "Yes! We service churches, schools, and institutional properties throughout Newington. We coordinate around event schedules, Sunday services, and school activities. Large properties receive appropriately sized crews and equipment to handle significant acreage efficiently while maintaining meticulous attention to detail."
    },
    {
      question: "Can you service properties in the Orchard Hill neighborhood?",
      answer: "Absolutely! Orchard Hill properties get full residential service with equipment sized for suburban lots. The neighborhood's mature trees produce significant leaf volume, so we typically recommend 2-3 cleanup visits throughout fall - early-season for maples, mid-season for mixed species, and a final visit for late-dropping oaks."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="Newington, CT"
      seoTitle="Fall Cleanup Newington CT | Leaf Removal & Seasonal Cleanup | GD Landscaping"
      seoDescription="Leaf removal, pruning, and yard cleanups for Newington Center, Maple Hill, Cedar Mountain, and Berlin Turnpike corridors."
      seoKeywords="fall cleanup Newington CT, leaf removal Newington, yard cleanup Newington Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-newington-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Newington CT - GD Landscaping',
        description:
          'Professional fall cleanup and leaf removal services for residential and commercial properties throughout Newington, Connecticut.',
        areaServed: {
          '@type': 'City',
          name: 'Newington'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Newington, CT',
        title: 'Fall Cleanup Newington CT',
        subtitle: 'Leaf removal, pruning, and property cleanup across Newington Center, Maple Hill, and Cedar Mountain.',
        addressPrompt: 'Type your Newington address for instant fall cleanup scheduling',
        ctaPrimaryText: 'Book Newington Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'From tree-lined cul-de-sacs to busy Berlin Turnpike plazas, we tailor cleanup crews for every Newington property.',
        snapshotCopy: 'Customers receive live updates when crews are en route or when storms adjust the schedule.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal and cleanup work throughout Newington Center, Maple Hill, and Cedar Mountain."
      quoteConfig={{
        title: 'Plan Your Newington Fall Cleanup',
        subtitle: 'Share your property details and must-have services—we’ll send a tailored quote.',
        locationName: 'Newington Fall Cleanup',
        source: 'Newington Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Newington Property?',
        body: 'Reserve your fall cleanup now to lock in the window that works best for your schedule.',
        primaryText: 'Get Newington Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}

      faqs={faqs}

      />
  );
};

export default FallCleanupNewingtonPage;
