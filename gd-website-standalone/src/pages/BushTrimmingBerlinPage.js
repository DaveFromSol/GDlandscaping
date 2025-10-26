import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingBerlinPage = () => {
  const services = [
    {
      icon: '✂️',
      title: 'Precision Hedge Shaping',
      description: 'Tight, level cuts for front hedges, foundation shrubs, and property borders.'
    },
    {
      icon: '🌳',
      title: 'Shrub Health Pruning',
      description: 'Seasonal thinning to improve airflow and keep evergreen shrubs dense and green.'
    },
    {
      icon: '🧹',
      title: 'Debris & Cleanup',
      description: 'All clippings and debris are hauled away or neatly bagged for pickup.'
    }
  ];

  const overviewHighlights = [
    'Route-based crews trim Kensington, East Berlin, and Worthington Ridge hedges on consistent schedules.',
    'Seasonal programs combine trimming with fertilization and pest monitoring for healthy shrubs.',
    'Every visit ends with a full cleanup: beds blown clean, walkways swept, and debris removed.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max response time' },
    { value: '12+', label: 'Berlin neighborhoods served' },
    { value: '4.9/5', label: 'Client rating' }
  ];

  const serviceHighlights = [
    { icon: '🚛', title: 'Berlin-Based Crews', description: 'Equipment and trailers are staged locally for dependable scheduling.' },
    { icon: '🪚', title: 'Sharp Equipment', description: 'Blades are sharpened daily for clean cuts that protect plant health.' },
    { icon: '📆', title: 'Easy Scheduling', description: 'Subscription or one-time trimming options tailored to your property.' }
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

  return (
    <BushTrimmingTemplate
      townName="Berlin, CT"
      seo={{
        title: 'Bush Trimming Berlin CT | Hedge & Shrub Care | GD Landscaping',
        description:
          'Professional bush trimming and hedge shaping in Berlin, CT. Serving Kensington, East Berlin, Worthington Ridge, and surrounding neighborhoods.',
        keywords: 'bush trimming Berlin CT, hedge trimming Berlin, shrub pruning Berlin Connecticut',
        canonicalUrl: 'https://gdlandscapingllc.com/bush-trimming-berlin-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Berlin CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Berlin' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming services for residential and commercial properties in Berlin, CT.'
        }
      }}
      hero={{
        badge: '🌿 Serving Berlin, CT',
        title: 'Bush Trimming Berlin CT',
        subtitle: 'Keep Kensington, East Berlin, and Worthington Ridge hedges shaped, healthy, and camera-ready all season.',
        addressPrompt: 'Type your Berlin address for instant trimming availability',
        ctaPrimaryText: 'Book Berlin Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Berlin landscapes mix manicured hedges, privacy plantings, and historic shrubs. We trim each property based on growth habits and neighborhood guidelines.',
        snapshotCopy: 'Dedicated Berlin crews keep blades sharp and routes consistent, so your hedges never overgrow.'
      }}
      services={services}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Hedge shaping and shrub pruning across Berlin, Kensington, and East Berlin."
      quoteConfig={{
        title: 'Plan Your Berlin Hedge Trimming',
        subtitle: 'Send us your property details and preferred schedule—we’ll handle the rest.',
        locationName: 'Berlin Bush Trimming',
        source: 'Berlin Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Crisp, Clean Berlin Hedges?',
        body: 'Reserve trimming before growth gets out of control. Seasonal and one-time visits available.',
        primaryText: 'Get Berlin Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingBerlinPage;
