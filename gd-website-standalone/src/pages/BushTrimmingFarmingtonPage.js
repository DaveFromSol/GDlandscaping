import React from 'react';
import BushTrimmingTemplate from './BushTrimmingTemplate';

const phoneNumber = '(860) 526-7583';

const BushTrimmingFarmingtonPage = () => {
  const overviewHighlights = [
    'Route-based crews trim Unionville, Devonwood, and Farmington Village hedges on consistent schedules.',
    'Seasonal programs combine trimming with fertilization and pest monitoring for healthy shrubs.',
    'Every visit ends with a full cleanup: beds blown clean, walkways swept, and debris removed.'
  ];

  const serviceStats = [
    { value: '48 hrs', label: 'Max response time' },
    { value: '12+', label: 'Farmington neighborhoods served' },
    { value: '4.9/5', label: 'Client rating' }
  ];

  const serviceHighlights = [
    { icon: '🚛', title: 'Farmington-Based Crews', description: 'Equipment and trailers are staged locally for dependable scheduling.' },
    { icon: '🪚', title: 'Sharp Equipment', description: 'Blades are sharpened daily for clean cuts that protect plant health.' },
    { icon: '📆', title: 'Easy Scheduling', description: 'Subscription or one-time trimming options tailored to your property.' }
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

  return (
    <BushTrimmingTemplate
      townName="Farmington, CT"
      seo={{
        title: 'Bush Trimming Farmington CT | Hedge & Shrub Care | GD Landscaping',
        description:
          'Professional bush trimming and hedge shaping in Farmington, CT. Serving Unionville, Devonwood, Talcott Mountain, and surrounding neighborhoods.',
        keywords: 'bush trimming Farmington CT, hedge trimming Farmington, shrub pruning Farmington Connecticut',
        canonicalUrl: 'https://gdlandscapingllc.com/bush-trimming-farmington-ct',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Bush Trimming Farmington CT - GD Landscaping',
          areaServed: { '@type': 'City', name: 'Farmington' },
          provider: { '@type': 'LocalBusiness', name: 'GD Landscaping', telephone: phoneNumber },
          serviceType: 'Bush & Hedge Trimming',
          description: 'Shrub and hedge trimming services for residential and commercial properties in Farmington, CT.'
        }
      }}
      hero={{
        badge: '🌿 Serving Farmington, CT',
        title: 'Bush Trimming Farmington CT',
        subtitle: 'Keep Unionville, Devonwood, and Talcott Mountain hedges shaped, healthy, and camera-ready all season.',
        addressPrompt: 'Type your Farmington address for instant trimming availability',
        ctaPrimaryText: 'Book Farmington Trimming',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'Farmington landscapes mix manicured hedges, privacy plantings, and historic shrubs. We trim each property based on growth habits and neighborhood guidelines.',
        snapshotCopy: 'Dedicated Farmington crews keep blades sharp and routes consistent, so your hedges never overgrow.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Hedge shaping and shrub pruning across Farmington Village, Unionville, and Talcott Mountain."
      quoteConfig={{
        title: 'Plan Your Farmington Hedge Trimming',
        subtitle: 'Send us your property details and preferred schedule—we’ll handle the rest.',
        locationName: 'Farmington Bush Trimming',
        source: 'Farmington Bush Trimming Page'
      }}
      cta={{
        title: 'Ready for Crisp, Clean Farmington Hedges?',
        body: 'Reserve trimming before growth gets out of control. Seasonal and one-time visits available.',
        primaryText: 'Get Farmington Trimming Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
    />
  );
};

export default BushTrimmingFarmingtonPage;
