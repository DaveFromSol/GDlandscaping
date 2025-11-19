import React from 'react';
import FallCleanupTemplate from './FallCleanupTemplate';

const phoneNumber = '(860) 526-7583';

const FallCleanupMiddletownPage = () => {

  const serviceHighlights = [
    {
      icon: '🎓',
      title: 'Campus Friendly',
      description: 'Crews coordinate around Wesleyan events and on-street parking to keep student housing tidy.'
    },
    {
      icon: '🚤',
      title: 'River Savvy',
      description: 'South Farms and riverfront homes receive extra passes to prevent soggy leaf mats.'
    },
    {
      icon: '📸',
      title: 'Photo Updates',
      description: 'Property managers receive before/after shots for condos, HOAs, and commercial sites.'
    }
  ];

  const areas = [
    'Downtown Middletown',
    'North End',
    'South Farms',
    'Westlake',
    'Highland',
    'East Side',
    'Wesleyan University area',
    'Industrial Park'
  ];

  const overviewHighlights = [
    'Leaf vacuums and trailers stage near Main Street for quick turnaround between downtown properties.',
    'Highland and Westlake lawns receive combined leaf removal, shrub pruning, and perennial cutbacks.',
    'Commercial clients on Saybrook Road get overnight service so lots and sidewalks open on time.'
  ];

  const serviceStats = [
    { value: '4 AM', label: 'Route kickoff' },
    { value: '6', label: 'Dedicated crews' },
    { value: '2x', label: 'Average passes/storm' }
  ];

  const faqs = [
    {
      question: "Do you service properties near Wesleyan University campus?",
      answer: "Absolutely! We have dedicated routes for the Wesleyan area including student housing, faculty residences, and nearby commercial properties. We schedule around campus events and coordinate with parking restrictions common near High Street and Washington Street to ensure seamless service without disrupting the university community."
    },
    {
      question: "Can you handle river-front properties in South Farms?",
      answer: "Yes! South Farms riverfront properties receive special treatment due to Connecticut River humidity and wind patterns. We schedule multiple passes to prevent soggy leaf matting, clear drainage systems proactively, and remove debris before it can wash toward the river. Properties near Harbor Park get extra attention during windy periods."
    },
    {
      question: "What about properties in Highland and Westlake neighborhoods?",
      answer: "Highland and Westlake properties get comprehensive service including leaf removal, shrub pruning, and perennial cutbacks. These established neighborhoods have mature trees that produce significant volume, so we typically recommend 2-3 seasonal visits to keep lawns healthy and prevent thick leaf layers from damaging turf."
    },
    {
      question: "Do you service downtown Main Street businesses?",
      answer: "Yes! We service commercial properties, retail storefronts, and mixed-use buildings throughout downtown Middletown. We work early morning or after-hours to ensure sidewalks, parking areas, and entrances are clean before business hours. Our crews understand the importance of maintaining professional appearances for customer-facing businesses."
    },
    {
      question: "Can you navigate the steep terrain in the North End?",
      answer: "Absolutely. North End properties often have challenging slopes and elevation changes. We use self-propelled equipment, strategic tarping, and hillside-specific techniques to manage leaves on steep terrain. Our crews are trained in slope safety and ensure thorough cleanup without erosion or property damage."
    },
    {
      question: "What's your approach for East Side multi-family properties?",
      answer: "East Side apartments and multi-family buildings get professional treatment with detailed documentation. Property managers receive before/after photos, completion reports, and scheduled follow-ups. We handle common areas, parking lots, and individual unit yards, coordinating timing to minimize tenant disruption."
    },
    {
      question: "Do you work around industrial park schedules on Saybrook Road?",
      answer: "Yes! Industrial park properties receive flexible scheduling including overnight service when needed. We ensure loading docks, parking areas, and building entrances stay clear without interfering with business operations. Our crews work efficiently to maintain professional appearances for facilities that receive client and vendor visits."
    },
    {
      question: "Can you handle properties along Route 9 corridor with heavy traffic?",
      answer: "Absolutely. Route 9 corridor properties require strategic timing to work safely around traffic patterns. We schedule these cleanups during lower-traffic periods and use safety protocols for properties with high-speed road frontage. Our crews are experienced with roadside work and ensure thorough cleanup while maintaining safety standards."
    }
  ];

  return (
    <FallCleanupTemplate
      townName="Middletown, CT"
      seoTitle="Fall Cleanup Middletown CT | Leaf Removal & Yard Cleanups | GD Landscaping"
      seoDescription="Middletown fall cleanup pros. Leaf removal, pruning, and disposal for downtown, Wesleyan, and riverfront properties."
      seoKeywords="fall cleanup Middletown CT, leaf removal Middletown, yard cleanup Middletown Connecticut"
      canonicalUrl="https://www.gdlandscapingllc.com/fall-cleanup-middletown-ct"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fall Cleanup Middletown CT - GD Landscaping',
        description:
          'Leaf removal, yard cleanups, and property winterization for Middletown, Connecticut homeowners and businesses.',
        areaServed: {
          '@type': 'City',
          name: 'Middletown'
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'GD Landscaping',
          telephone: phoneNumber
        },
        serviceType: 'Fall Cleanup'
      }}
      hero={{
        badge: '🍂 Serving Middletown, CT',
        title: 'Fall Cleanup Middletown CT',
        subtitle:
          'Leaf removal, pruning, and yard cleanups for Wesleyan, South Farms, Highland, and every Middletown neighborhood.',
        addressPrompt: 'Type your Middletown address for instant fall cleanup options',
        ctaPrimaryText: 'Book Middletown Cleanup',
        ctaSecondaryText: `Call ${phoneNumber}`,
        ctaSecondaryHref: `tel:${phoneNumber}`,
        overviewIntro:
          'College-town lawns require flexible scheduling and detailed cleanup. We keep every Middletown property camera ready before winter.',
        snapshotCopy: 'Dispatch texts and photo recaps keep homeowners and managers in the loop.'
      }}
      overviewHighlights={overviewHighlights}
      serviceStats={serviceStats}
      serviceHighlights={serviceHighlights}
      areas={areas}
      gallerySubtitle="Seasonal cleanup projects from Wesleyan Hill to South Farms."
      quoteConfig={{
        title: 'Plan Your Middletown Fall Cleanup',
        subtitle: 'Tell us about your property and goals—we’ll line up the perfect service window.',
        locationName: 'Middletown Fall Cleanup',
        source: 'Middletown Fall Cleanup Page'
      }}
      cta={{
        title: 'Ready for a Spotless Middletown Yard?',
        body: 'Reserve your cleanup slot before schedules fill up. Flexible options for residential, campus, and commercial sites.',
        primaryText: 'Get Middletown Cleanup Quote',
        secondaryText: `Call ${phoneNumber}`
      }}
      faqs={faqs}
    />
  );
};

export default FallCleanupMiddletownPage;
