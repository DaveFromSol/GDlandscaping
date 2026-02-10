import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupBerlinPage = () => {

  const serviceHighlights = [
    {
      icon: '🚚',
      title: 'Local Crews',
      description: 'Berlin-based teams move quickly between Kensington, East Berlin, and Worthington Ridge streets.'
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
    'Downtown Berlin',
    'Kensington',
    'East Berlin',
    'Worthington Ridge',
    'Berlin Center',
    'Country Club Road',
    'Mill Street',
    'Christian Lane'
  ];

  const overviewHighlights = [
    'Leaf vacuums and high-capacity trailers based in Berlin keep cleanup windows tight before the next storm.',
    'Seasonal plans combine final mow/stripe, selective pruning, and perennial cutbacks for curb-ready beds.',
    'Crews revisit drain inlets along Worthington Ridge after major storms to prevent icy refreeze on aprons.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max wait after booking' },
    { value: '15+', label: 'Berlin crew members' },
    { value: '4.9/5', label: 'Homeowner rating' }
  ];

  const faqs = [
    {
      question: "How do you handle the hilly terrain in Worthington Ridge during fall cleanup?",
      answer: "Worthington Ridge properties require specialized equipment and technique. We use self-propelled blowers and tarping systems that prevent leaves from sliding down slopes. Our crews are trained to work safely on inclines and ensure thorough cleanup of hillside properties without damaging lawns or landscape beds."
    },
    {
      question: "Do you service both downtown Berlin and Kensington neighborhoods?",
      answer: "Absolutely! We have dedicated routes for both downtown Berlin's compact properties and Kensington's larger lots. Our equipment is sized appropriately for each neighborhood - smaller machines for tight Berlin Center streets and high-capacity vacuums for Kensington's expansive lawns."
    },
    {
      question: "When do oak leaves typically drop in Berlin?",
      answer: "Berlin's abundant oak trees typically hold their leaves until late November or early December. We recommend scheduling an initial cleanup in late October for maples and other early-droppers, then a final visit in early December specifically for oak leaf removal. This two-visit approach ensures your lawn stays healthy all season."
    },
    {
      question: "Can you clear leaves from around the mill pond area and drainage systems?",
      answer: "Yes, we pay special attention to drainage areas, especially near Mill Street and low-lying properties. We clear storm drains, drainage swales, and pond perimeters to prevent flooding and ice dam issues. This is particularly important in Berlin where proper drainage prevents winter water damage."
    },
    {
      question: "Do you work around Berlin's town transfer station schedule?",
      answer: "We haul all debris directly from your property - you won't need to make any trips to the transfer station on Christian Lane. Our crews handle 100% of disposal, so you avoid the weekend crowds and heavy lifting completely."
    },
    {
      question: "What about properties near Country Club Road with mature trees?",
      answer: "Country Club Road estates with mature hardwoods get premium treatment. We use commercial-grade leaf vacuums that can handle heavy volume without multiple passes. These properties often need 2-3 visits as different tree species drop leaves on different schedules throughout fall."
    },
    {
      question: "Can you clean up after early season nor'easters?",
      answer: "Yes! Berlin often gets hit with October nor'easters that bring down leaves and branches before peak fall. We offer emergency cleanup after storms and can adjust your regular schedule to account for weather events. Call us at (860) 526-7583 if you need urgent storm cleanup."
    },
    {
      question: "Do you service the East Berlin side of town?",
      answer: "Absolutely. We have regular routes throughout East Berlin including properties along Route 372 and the neighborhoods east of Berlin Turnpike. Our crews are familiar with the area's mix of residential and light commercial properties and adjust our approach accordingly."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="Berlin, CT"
      seoTitle="Fall Cleanup Berlin CT | Leaf Removal & Yard Cleanups | G&D Landscaping"
      seoDescription="Professional fall cleanup in Berlin, CT. Leaf removal, gutter policing, perennial cutbacks, and haul-away service for Kensington, East Berlin, and Worthington Ridge."
      seoKeywords="fall cleanup Berlin CT, leaf removal Berlin, fall yard cleanup Berlin Connecticut, gutter cleaning Berlin CT"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-berlin-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Berlin CT - G&D Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization services for Berlin, Connecticut homeowners and businesses.',
        areaServed: {
          '@type': 'City',
          name: 'Berlin'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'G&D Landscaping',
          telephone: phoneNumber,
          areaServed: 'Berlin, CT'
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Berlin, CT',
        title: 'Fall Cleanup Berlin CT',
        subtitle:
          'Keep Kensington, East Berlin, and Worthington Ridge properties spotless with proactive leaf removal, pruning, and winter prep.',
        addressPrompt: 'Type your Berlin address for instant fall cleanup options',
        ctaPrimaryText: 'Book Berlin Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Berlin lawns range from hilly Worthington Ridge estates to compact downtown lots. We tailor equipment and cleanup order for each neighborhood.',
        snapshotCopy: 'Our Berlin crews stay staged within town limits for rapid follow-ups after windy nights.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Leaf removal, pruning, and haul-away from Kensington to East Berlin."
      quoteConfig={{
        title: 'Plan Your Berlin Fall Cleanup',
        subtitle: 'Send us your address and priorities—we’ll respond with a same-day estimate.',
        locationName: 'Berlin Fall Cleanup',
        source: 'Berlin Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Leaf-Free Berlin Lawn?',
        body: 'Reserve your cleanup slot before schedules fill up. Seasonal packages for every property type.',
        primaryText: 'Get Berlin Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default FallCleanupBerlinPage;
