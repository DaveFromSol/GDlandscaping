import React from 'react';
import FertilizationWeedControlTemplate from './FertilizationWeedControlTemplate';

const phoneNumber = '(860) 526-7583';
const heroImage = '/IMG_5152.jpeg';
const galleryImage = '/IMG_5078 (1).avif';

const createStructuredData = (town, slug) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `GD Landscaping - Fertilization & Weed Control ${town}`,
  url: `https://www.gdlandscapingllc.com/fertilization-weed-control-${slug}-ct`,
  telephone: phoneNumber,
  serviceType: 'Fertilization & Weed Control',
  areaServed: `${town}, CT`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: town,
    addressRegion: 'CT',
    addressCountry: 'US'
  }
});

const createPrograms = (town) => [
  {
    id: `${town.toLowerCase().replace(/\s+/g, '-')}-foundation`,
    name: `${town} Foundation Program`,
    price: '$79 / visit',
    description: `Establishes balanced nutrients for ${town} lawns coming out of winter.`,
    features: [
      `Soil testing calibrated to ${town} lawns`,
      'Pre-emergent crabgrass barrier with slow-release nitrogen',
      'Targeted broadleaf control on each visit',
      'Micro-nutrient package for color and density',
      'Service notes after every application'
    ]
  },
  {
    id: `${town.toLowerCase().replace(/\s+/g, '-')}-seasonal`,
    name: `${town} Season Shield`,
    price: '$92 / visit',
    description: `Six-round program tuned to seasonal pressure in ${town}, CT.`,
    features: [
      'Early spring feeding with soil conditioners',
      'Summer stress guard with liquid iron and spot weed control',
      'Grub monitoring with preventative treatment',
      'Broadleaf and nutsedge suppression as needed',
      'Late-fall winterizer to push root reserves'
    ],
    popular: true
  },
  {
    id: `${town.toLowerCase().replace(/\s+/g, '-')}-revive`,
    name: `${town} Lawn Revival`,
    price: 'Custom Quote',
    description: `For thin or weed-heavy turf areas that need a complete reset.`,
    features: [
      'Core aeration + overseeding options',
      'Soil amendments for pH balance',
      'Starter fertilizer with organic matter',
      'Post-seeding weed suppression',
      'Follow-up visit to review germination'
    ]
  }
];

const baseBenefits = (town) => [
  {
    icon: '🧪',
    title: 'Soil-First Planning',
    description: `We adjust formulas to match ${town} soil tests, humidity, and mowing patterns.`
  },
  {
    icon: '🌱',
    title: 'Weed Pressure Monitoring',
    description: 'Each visit includes spot treatments so clover, crabgrass, and dandelions never settle in.'
  },
  {
    icon: '📆',
    title: 'Seasonal Timing',
    description: `Routing keeps ${town} lawns on a consistent schedule even during peak growing stretches.`
  },
  {
    icon: '📸',
    title: 'Service Reporting',
    description: 'Photo notes and application summaries land in your inbox after each treatment.'
  }
];

const baseStats = (town) => [
  { value: '6', label: `Annual visits planned for ${town}` },
  { value: '48 hrs', label: 'Guaranteed weed breakthrough call-back' },
  { value: '98%', label: 'Customer satisfaction across Hartford County' }
];

const configs = [
  {
    slug: 'berlin',
    townName: 'Berlin, CT',
    heroSubtitle: 'Tailored nutrition and weed control that keeps Berlin lawns dense, green, and storm-ready.',
    introHeading: 'Berlin Turf Programs Built on Soil Data',
    introCopy:
      'Berlin lawns see compact glacial soils and steady foot traffic. Our technicians test, balance, and feed each yard so roots run deep and weeds never get a foothold.',
    introSupporting:
      'From Worthington Ridge to East Berlin, we adjust product blends to match sunlight exposure, irrigation schedules, and mowing patterns.',
    highlights: [
      'Granular and liquid applications dialed to Berlin’s clay-loam mix',
      'Storm-follow monitoring after heavy New England rains',
      'Text reminders before each visit so gates stay open and pets stay safe'
    ],
    neighborhoods: [
      'Worthington Ridge',
      'Kensington',
      'East Berlin',
      'Ragged Mountain area',
      'Berlin Center',
      'Timberlin Drive',
      'Christian Lane corridor',
      'Farmington Avenue'
    ],
    seasonalTitle: 'Seasonal Notes for Berlin Lawns',
    seasonalTips: [
      'Pre-emergent goes down early to block crabgrass along sunbaked drives.',
      'Summer applications include soil conditioners to resist compaction.',
      'Late-fall feed targets snow mold prevention and winter color.'
    ],
    galleryTitle: 'Berlin Lawn Revival',
    galleryCaption:
      'Soil testing + balanced feeding turned this Berlin backyard from pale and weedy to a dense, deep-green play space.',
    ctaTitle: 'Ready to tune your Berlin lawn?'
  },
  {
    slug: 'hartford',
    townName: 'Hartford, CT',
    heroSubtitle: 'Balanced lawn nutrition for historic Hartford properties, office campuses, and city greenspaces.',
    introHeading: 'Hartford Lawn Care With Downtown Attention',
    introCopy:
      'Hartford lawns see shade from mature trees, city heat, and mixed soils. We build programs that keep turf healthy curbside and in back courtyards alike.',
    introSupporting:
      'From Asylum Hill to South End, our crews navigate permit schedules and coordinate with irrigation techs so treatments stay efficient.',
    highlights: [
      'Liquid feed options for shaded Capitol-area lawns',
      'Broadleaf suppression tailored to Connecticut River humidity',
      'Pet- and pedestrian-friendly applications with posted signage'
    ],
    neighborhoods: [
      'West End',
      'Asylum Hill',
      'South End',
      'Frog Hollow',
      'Downtown Hartford',
      'Sheldon/Charter Oak',
      'Blue Hills',
      'Parkville'
    ],
    seasonalTitle: 'Seasonal Notes for Hartford Lawns',
    seasonalTips: [
      'Spring applications focus on soil structure where tree roots compete for nutrients.',
      'Summer visits include liquid iron to combat heat stress on exposed city turf.',
      'Fall feed schedules sync with leaf drop to prevent smothered patches.'
    ],
    galleryTitle: 'Hartford Townhome Transformation',
    galleryCaption:
      'Consistent fertilization and weed prevention brought this Hartford townhouse common area back to life after years of neglect.',
    ctaTitle: 'Give your Hartford lawn an edge'
  },
  {
    slug: 'new-britain',
    townName: 'New Britain, CT',
    heroSubtitle: 'Targeted fertilization and weed control for Hardware City homeowners and commercial sites.',
    introHeading: 'Feeding New Britain Turf the Right Way',
    introCopy:
      'Neighborhoods across New Britain see dense soils and sun-baked slopes. We tailor each nutrient plan so lawns stay thick, resilient, and weed-free.',
    introSupporting:
      'Our team rotates products through Little Poland, CCSU areas, and suburban neighborhoods to match turf varieties and irrigation schedules.',
    highlights: [
      'Selective weed control ideal for New Britain’s mixed turf types',
      'Soil aeration pairing to relieve compaction on sloped streets',
      'Detailed service notes outlining each application and next steps'
    ],
    neighborhoods: [
      'Little Poland',
      'CCSU Campus Area',
      'Stanley Quarter',
      'Farmington Avenue corridor',
      'Belvidere',
      'Corbin Heights',
      'Willow Brook',
      'Slater Road'
    ],
    seasonalTitle: 'Seasonal Notes for New Britain Lawns',
    seasonalTips: [
      'Pre-emergent targets crabgrass along concrete-heavy drives.',
      'Mid-summer visits add micronutrients that help lawns handle heat.',
      'Fall applications focus on rooting and winter color retention.'
    ],
    galleryTitle: 'New Britain Backyard Boost',
    galleryCaption:
      'After a full-season program and overseeding, this New Britain backyard shows rich color and noticeably thicker turf.',
    ctaTitle: 'Kickstart your New Britain lawn'
  },
  {
    slug: 'west-hartford',
    townName: 'West Hartford, CT',
    heroSubtitle: 'Premium lawn nutrition and weed prevention for West Hartford’s classic neighborhoods.',
    introHeading: 'West Hartford Fertilization Crafted for Curb Appeal',
    introCopy:
      'From Blue Back Square to suburban cul-de-sacs, West Hartford lawns deserve lush color without weeds peeking through brick walkways.',
    introSupporting:
      'Our licensed techs schedule around school pickups, kids’ play schedules, and irrigation cycles to keep your lawn thriving.',
    highlights: [
      'Organic-based options for family- and pet-friendly yards',
      'Precision spot treatments to keep ornamental beds weed-free',
      'Communication before and after every visit with photo recaps'
    ],
    neighborhoods: [
      'Blue Back Square',
      'Park Road',
      'Elmwood',
      'Bishops Corner',
      'Buena Vista',
      'Morley District',
      'Noah Webster area',
      'Westmoor Park'
    ],
    seasonalTitle: 'Seasonal Notes for West Hartford Lawns',
    seasonalTips: [
      'Spring feed focuses on recovery from winter plow damage near busy drives.',
      'Summer treatments include drought support for elevated lots.',
      'Late fall applications prep turf for holiday lighting and heavy foot traffic.'
    ],
    galleryTitle: 'West Hartford Front Lawn Upgrade',
    galleryCaption:
      'A consistent fertilization plan transformed this West Hartford front yard into a dense, deep-green welcome mat.',
    ctaTitle: 'Protect your West Hartford curb appeal'
  },
  {
    slug: 'east-hartford',
    townName: 'East Hartford, CT',
    heroSubtitle: 'Healthy turf programs that stand up to river valley weather and sports-heavy yards.',
    introHeading: 'East Hartford Lawn Plans With Staying Power',
    introCopy:
      'East Hartford lawns face river humidity and active play. We pair nutrients and weed control to keep turf durable through every season.',
    introSupporting:
      'Programs flex between Glastonbury line properties and dense neighborhood lots with different sunlight and soil needs.',
    highlights: [
      'Balanced feeding that resists fungus in river-adjacent neighborhoods',
      'Preventative grub and surface insect monitoring each visit',
      'Communication with homeowners about watering adjustments'
    ],
    neighborhoods: [
      'Hockanum',
      'Goodwin Park area',
      'Forbes Street',
      'Rentschler Field',
      'Silver Lane',
      'Burnside',
      'Nauset Beach neighborhood',
      'Mayberry Village'
    ],
    seasonalTitle: 'Seasonal Notes for East Hartford Lawns',
    seasonalTips: [
      'Spring focus on crabgrass prevention along sidewalks.',
      'Summer visits include disease watchlist updates for humid stretches.',
      'Fall applications balance nutrients before frost and leaf drop.'
    ],
    galleryTitle: 'East Hartford Sports Lawn',
    galleryCaption:
      'Targeted weed control and timed feeding helped this family field recover from heavy play in just one season.',
    ctaTitle: 'Strengthen your East Hartford lawn'
  },
  {
    slug: 'newington',
    townName: 'Newington, CT',
    heroSubtitle: 'Professional feeding and weed suppression that keeps Newington yards guest-ready.',
    introHeading: 'Newington Lawns Built for Backyard Gatherings',
    introCopy:
      'Newington neighborhoods mix sun and shade. Our programs keep turf lush, even across tightly landscaped lots.',
    introSupporting:
      'From Cedar Mountain to Churchill Park, we tailor schedules around irrigation and family routines for consistent results.',
    highlights: [
      'Seasonal product rotation to outsmart local weed pressure',
      'Soil conditioning that reduces compaction near walkways',
      'Friendly, uniformed technicians with text and email follow-ups'
    ],
    neighborhoods: [
      'Cedar Mountain',
      'Churchill Park',
      'Town Center',
      'Newington Junction',
      'Foxboro Drive',
      'Maple Hill',
      'Steele Road area',
      'Elm Hill'
    ],
    seasonalTitle: 'Seasonal Notes for Newington Lawns',
    seasonalTips: [
      'Spring feeding delivers root growth before lilac season.',
      'Summer visits include spot nutsedge control for damp areas.',
      'Fall applications load turf with carbohydrates for winter durability.'
    ],
    galleryTitle: 'Newington Backyard Refresh',
    galleryCaption:
      'With consistent fertilization and weed control, this Newington yard now hosts gatherings without bare spots or weeds.',
    ctaTitle: 'Keep your Newington lawn gathering-ready'
  },
  {
    slug: 'wethersfield',
    townName: 'Wethersfield, CT',
    heroSubtitle: 'Seasonal fertilization programs tailored to Wethersfield’s historic properties and river climate.',
    introHeading: 'Wethersfield Fertilization Rooted in History',
    introCopy:
      'Wethersfield lawns hug the Connecticut River and feature established trees. We craft programs that protect roots and repel weeds without harming heritage plantings.',
    introSupporting:
      'Our technicians know Old Wethersfield brick walks and modern subdivisions alike, adjusting equipment to move carefully.',
    highlights: [
      'Gentle application choices for historic district properties',
      'Weed control that protects ornamental beds and garden borders',
      'Consistent scheduling so waterfront lawns stay healthy season-long'
    ],
    neighborhoods: [
      'Old Wethersfield',
      'Highcrest',
      'Griswoldville',
      'Nott Street',
      'Amherst Street area',
      'Country Club neighborhood',
      'Goff Brook',
      'Rocky Hill line'
    ],
    seasonalTitle: 'Seasonal Notes for Wethersfield Lawns',
    seasonalTips: [
      'Spring feed supports lawns shaded by mature maples.',
      'Summer treatments monitor humidity-driven fungus risk.',
      'Late fall applications prepare riverfront turf for winter winds.'
    ],
    galleryTitle: 'Wethersfield Heritage Lawn',
    galleryCaption:
      'Proper feeding brought this Wethersfield colonial lawn back to a classic, even green from curb to doorstep.',
    ctaTitle: 'Preserve your Wethersfield lawn'
  },
  {
    slug: 'rocky-hill',
    townName: 'Rocky Hill, CT',
    heroSubtitle: 'Balanced lawn nutrition designed for Rocky Hill’s mix of river plain and hillside properties.',
    introHeading: 'Rocky Hill Lawns With Reliable Color',
    introCopy:
      'Rocky Hill’s elevations and river proximity create unique lawn challenges. Our programs deliver color and density across every block.',
    introSupporting:
      'We monitor soil moisture near Dividend Park and glacial ridges alike, adjusting feeds to avoid burn and washout.',
    highlights: [
      'Granular blends that resist washout on sloped sites',
      'Broadleaf control tuned to Rocky Hill’s parkway weeds',
      'Digital visit reports with watering recommendations'
    ],
    neighborhoods: [
      'Dividend',
      'Old Main Street',
      'River Highlands',
      'West Hill',
      'Elm Ridge Park',
      'Brook Street corridor',
      'Cold Spring Road',
      'Silas Deane Highway'
    ],
    seasonalTitle: 'Seasonal Notes for Rocky Hill Lawns',
    seasonalTips: [
      'Spring program protects low-lying lawns from crabgrass invasion.',
      'Summer rounds add soil conditioners for high-traffic yards.',
      'Fall feed prepares turf for winter winds off the river.'
    ],
    galleryTitle: 'Rocky Hill Hillside Lawn',
    galleryCaption:
      'Our slow-release plan stabilized color on this Rocky Hill slope, preventing the patchiness homeowners battled for years.',
    ctaTitle: 'Stabilize your Rocky Hill turf'
  },
  {
    slug: 'glastonbury',
    townName: 'Glastonbury, CT',
    heroSubtitle: 'Premium fertilization and weed management for Glastonbury’s estate lots and village properties.',
    introHeading: 'Glastonbury Lawns With Estate-Level Care',
    introCopy:
      'Fruit orchard soils, rolling hills, and irrigation systems make Glastonbury lawns unique. We tailor premium programs to keep them perfectly manicured.',
    introSupporting:
      'From South Glastonbury farms to Addison Park cul-de-sacs, we time treatments with irrigation schedules and entertaining season.',
    highlights: [
      'Organic-based fertilization options for high-end landscapes',
      'Pre- and post-emergent programs controlling crabgrass and broadleaf weeds',
      'Detailed service summaries for homeowners and property managers'
    ],
    neighborhoods: [
      'South Glastonbury',
      'Addison',
      'Hebron Avenue',
      'Fox Run',
      'Glastonbury Hills',
      'Buttonball Lane',
      'Eastbury',
      'Buckingham'
    ],
    seasonalTitle: 'Seasonal Notes for Glastonbury Lawns',
    seasonalTips: [
      'Spring feeding aligns with ornamental bloom schedules.',
      'Summer visits include soil moisture checks for hillside estates.',
      'Fall applications strengthen turf before winter events and lighting.'
    ],
    galleryTitle: 'Glastonbury Estate Lawn',
    galleryCaption:
      'Consistent fertilization and weed control elevated this Glastonbury estate lawn to country-club caliber.',
    ctaTitle: 'Give your Glastonbury lawn concierge care'
  },
  {
    slug: 'manchester',
    townName: 'Manchester, CT',
    heroSubtitle: 'Season-long weed control and turf feeding for Manchester neighborhoods and business corridors.',
    introHeading: 'Manchester Fertilization Programs With Staying Power',
    introCopy:
      'From Cheney mansions to modern subdivisions, Manchester lawns need steady nutrition and weed vigilance. Our programs deliver both.',
    introSupporting:
      'Technicians rotate blends through Highland Park, Keeney, and Buckland to match turf types and irrigation setups.',
    highlights: [
      'Broadleaf treatments tuned to Manchester’s parkway weeds',
      'Slow-release feeding for multi-family communities and HOAs',
      'Detailed communication before and after every visit'
    ],
    neighborhoods: [
      'Highland Park',
      'Buckland Hills',
      'Verplanck',
      'Waddell',
      'Manchester Green',
      'Spencer Street',
      'Keeney Street',
      'North End'
    ],
    seasonalTitle: 'Seasonal Notes for Manchester Lawns',
    seasonalTips: [
      'Spring applications fight crabgrass along commuter routes.',
      'Summer rounds add micronutrients to handle heat islands.',
      'Fall feeding thickens turf before holiday lighting and traffic.'
    ],
    galleryTitle: 'Manchester Multi-Family Lawn',
    galleryCaption:
      'Our program keeps this Manchester community lawn even, weed-free, and safe for residents year-round.',
    ctaTitle: 'Strengthen your Manchester turf'
  },
  {
    slug: 'south-windsor',
    townName: 'South Windsor, CT',
    heroSubtitle: 'Healthy, resilient lawns to match South Windsor’s family neighborhoods and athletic yards.',
    introHeading: 'South Windsor Treatment Plans For Busy Yards',
    introCopy:
      'Active families put South Windsor lawns to the test. We create feeding schedules that keep grass thick even under constant play.',
    introSupporting:
      'Our crews coordinate with irrigation and sports schedules in Avery Park, Pleasant Valley, and Rye Street neighborhoods.',
    highlights: [
      'Preventative weed control that keeps play areas safe and lush',
      'Soil conditioning to relieve compaction from sports use',
      'Text alerts before service so pets and kids stay clear'
    ],
    neighborhoods: [
      'Avery Park',
      'Pleasant Valley',
      'Rye Street',
      'Ellington Road',
      'Sullivan Avenue',
      'Governor’s Highway',
      'Strawberry Fields',
      'Nutmeg Road area'
    ],
    seasonalTitle: 'Seasonal Notes for South Windsor Lawns',
    seasonalTips: [
      'Spring focus on crabgrass along sidewalks and driveways.',
      'Summer visits add organic matter to withstand backyard games.',
      'Fall feeding locks in color for late-season get-togethers.'
    ],
    galleryTitle: 'South Windsor Family Lawn',
    galleryCaption:
      'After one full program, this South Windsor yard now handles sports practices without bare spots.',
    ctaTitle: 'Keep your South Windsor lawn game-ready'
  },
  {
    slug: 'farmington',
    townName: 'Farmington, CT',
    heroSubtitle: 'Fertilization and weed control programs that match Farmington’s upscale curb appeal.',
    introHeading: 'Farmington Turf Care With Elevated Standards',
    introCopy:
      'Historic homes and modern communities alike expect pristine lawns. Our Farmington programs deliver even color without weeds.',
    introSupporting:
      'From Unionville to the Highlands, we schedule around entertaining calendars and irrigation timing for perfect results.',
    highlights: [
      'Premium fertilizer blends with iron for deep Farmington green',
      'Spot weed control protecting ornamental landscaping',
      'Service recaps with recommendations after every visit'
    ],
    neighborhoods: [
      'Unionville',
      'Farmington Village',
      'Farmington Highlands',
      'Devonwood',
      'Talcott Mountain',
      'Route 10 corridor',
      'Burlington line',
      'Scott Swamp Road'
    ],
    seasonalTitle: 'Seasonal Notes for Farmington Lawns',
    seasonalTips: [
      'Spring feed timed with flowering ornamental schedules.',
      'Summer rounds include moisture retainers for hillside lawns.',
      'Fall fertilization prepares turf for holiday lighting and events.'
    ],
    galleryTitle: 'Farmington Estate Lawn',
    galleryCaption:
      'Balanced feeding and precise weed control keeps this Farmington estate lawn photo-ready all season.',
    ctaTitle: 'Elevate your Farmington lawn'
  },
  {
    slug: 'plainville',
    townName: 'Plainville, CT',
    heroSubtitle: 'Reliable fertilization and weed control that keeps Plainville lawns weekend-ready.',
    introHeading: 'Plainville Lawns Ready for Relaxing Weekends',
    introCopy:
      'Plainville’s compact lots and busy schedules call for dependable lawn programs. We deliver lush grass that requires less worry.',
    introSupporting:
      'From Metacomet Ridge views to downtown blocks, we adapt feed blends to microclimates and tree cover.',
    highlights: [
      'Balanced seasonal feeding tailored to Plainville soils',
      'Broadleaf and crabgrass control to keep edges clean',
      'Clear communication before and after every treatment'
    ],
    neighborhoods: [
      'Downtown Plainville',
      'Metacomet Ridge',
      'Broad Street',
      'East Street',
      'Cooke Street',
      'Rosemont Park',
      'Tomlinson Avenue',
      'Farmington Avenue'
    ],
    seasonalTitle: 'Seasonal Notes for Plainville Lawns',
    seasonalTips: [
      'Early-season visit protects against crabgrass along sidewalks.',
      'Summer rounds add micronutrients that combat drought stress.',
      'Late fall feeding builds thick roots for winter weather.'
    ],
    galleryTitle: 'Plainville Pocket Lawn',
    galleryCaption:
      'Our fertilization and weed control package turned this Plainville pocket yard into a dense, inviting space.',
    ctaTitle: 'Dial in your Plainville lawn'
  },
  {
    slug: 'bristol',
    townName: 'Bristol, CT',
    heroSubtitle: 'Targeted lawn feeding and weed control for Bristol’s busy neighborhoods and large lots.',
    introHeading: 'Bristol Fertilization Built for Hardware City Lawns',
    introCopy:
      'Bristol lawns take on sun, shade, and weekend gatherings. We deliver nutrition and weed control that keep turf full across every block.',
    introSupporting:
      'Whether you’re near Forestville, Federal Hill, or downtown, we adapt to soil, irrigation, and play patterns.',
    highlights: [
      'Slow-release feeding that keeps color through heat waves',
      'Spot herbicide treatments to eliminate stubborn broadleaf patches',
      'Follow-up notes with watering and mowing tips after every visit'
    ],
    neighborhoods: [
      'Forestville',
      'Federal Hill',
      'Chippens Hill',
      'Cedar Lake',
      'Sherwood',
      'Birge Pond',
      'Lake Avenue',
      'Stafford Avenue'
    ],
    seasonalTitle: 'Seasonal Notes for Bristol Lawns',
    seasonalTips: [
      'Spring visits focus on crabgrass along sunny driveways.',
      'Summer rounds include iron to maintain deep color.',
      'Fall feed promotes strong roots before snow season.'
    ],
    galleryTitle: 'Bristol BBQ-Ready Lawn',
    galleryCaption:
      'Consistent feeding and weed control brought this Bristol lawn back to the centerpiece of weekend get-togethers.',
    ctaTitle: 'Keep your Bristol lawn weekend-ready'
  },
  {
    slug: 'southington',
    townName: 'Southington, CT',
    heroSubtitle: 'Balanced fertilization and weed suppression for Southington’s rolling neighborhoods.',
    introHeading: 'Southington Turf That Keeps Pace With Your Schedule',
    introCopy:
      'Southington lawns cover hills, cul-de-sacs, and large play spaces. Our programs build turf that stays green without constant oversight.',
    introSupporting:
      'From Plantsville to Milldale, we tune applications to sunlight, irrigation, and traffic patterns.',
    highlights: [
      'Seasonal feeding that supports hillsides and low areas alike',
      'Weed suppression plan that targets crabgrass and broadleaf invaders',
      'Client updates after every visit with action items, if needed'
    ],
    neighborhoods: [
      'Plantsville',
      'Milldale',
      'Queen Street',
      'Summit Street',
      'Southington Mountain',
      'Kensington Road',
      'Meriden Avenue',
      'Atwater Street'
    ],
    seasonalTitle: 'Seasonal Notes for Southington Lawns',
    seasonalTips: [
      'Spring applications balance nutrients on sloped driveways.',
      'Summer rounds include moisture managers to combat heat.',
      'Late fall feeding builds a strong winter canopy.'
    ],
    galleryTitle: 'Southington Hillside Lawn',
    galleryCaption:
      'After consistent treatments, this Southington hillside lawn now holds color from street to playset.',
    ctaTitle: 'Keep your Southington lawn shining'
  },
  {
    slug: 'avon',
    townName: 'Avon, CT',
    heroSubtitle: 'Premium fertilization and weed control for Avon’s estate homes and golf course communities.',
    introHeading: 'Avon Lawns With Country Club Finish',
    introCopy:
      'Avon lawns expect luxury-level care. We deliver thick turf, minimal weeds, and exceptional communication.',
    introSupporting:
      'Our crews coordinate with irrigation systems and landscape designers from Avon Old Farms to Talcott Mountain.',
    highlights: [
      'Custom nutrient blends that keep premium turf varieties thriving',
      'Careful weed control near ornamental beds and stonework',
      'Detailed reports with photos for homeowners and managers'
    ],
    neighborhoods: [
      'Talcott Mountain',
      'Avon Old Farms',
      'Secret Lake',
      'Fox Hollow',
      'Farmington Woods',
      'Huckleberry Hill',
      'Avon Center',
      'West Avon Road'
    ],
    seasonalTitle: 'Seasonal Notes for Avon Lawns',
    seasonalTips: [
      'Spring feeding aligns with ornamental bloom cycles.',
      'Summer visits include iron for deep green color.',
      'Fall applications prepare turf for winter entertaining.'
    ],
    galleryTitle: 'Avon Estate Lawn',
    galleryCaption:
      'Our fertilization program keeps this Avon estate lawn velvety and weed-free year-round.',
    ctaTitle: 'Match your Avon lawn to your home'
  },
  {
    slug: 'windsor',
    townName: 'Windsor, CT',
    heroSubtitle: 'Healthy Windsor lawns from Wilson to Poquonock with dependable feeding and weed management.',
    introHeading: 'Windsor Fertilization Focused on Neighborhood Pride',
    introCopy:
      'Windsor lawns span historic villages and modern subdivisions. We tailor programs that keep every yard neat and weed-free.',
    introSupporting:
      'Our technicians schedule routes around family routines and Windsor Locks airport winds to protect applications.',
    highlights: [
      'Balanced fertilizers that handle Windsor’s riverfront humidity',
      'Weed control that protects pollinator gardens and beds',
      'Visit summaries with clear watering and mowing guidance'
    ],
    neighborhoods: [
      'Poquonock',
      'Wilson',
      'Rainbow',
      'Hayden Station',
      'Deerfield',
      'Kennedy Road',
      'Windsor Center',
      'Macktown'
    ],
    seasonalTitle: 'Seasonal Notes for Windsor Lawns',
    seasonalTips: [
      'Spring feeding helps lawns recover from winter plow damage.',
      'Summer visits track fungus risk in humid river climates.',
      'Fall fertilization builds winter hardiness and early spring color.'
    ],
    galleryTitle: 'Windsor River Valley Lawn',
    galleryCaption:
      'After a year of consistent feedings, this Windsor river valley lawn now holds color even through humid summers.',
    ctaTitle: 'Keep your Windsor lawn picture-perfect'
  },
  {
    slug: 'bloomfield',
    townName: 'Bloomfield, CT',
    heroSubtitle: 'Custom fertilization and weed control for Bloomfield’s mix of estates and suburban neighborhoods.',
    introHeading: 'Bloomfield Lawn Care That Adapts to Every Block',
    introCopy:
      'Bloomfield lawns move from estates to urban edges. Our programs handle tree shade, open terrain, and everything between.',
    introSupporting:
      'From Gillette Ridge to Blue Hills, we time rounds with irrigation and seasonal activities to keep grass thriving.',
    highlights: [
      'Nutrient plans tailored to Bloomfield’s varied soil profiles',
      'Weed control protecting pollinator and perennial beds',
      'Friendly technicians who provide updates after each visit'
    ],
    neighborhoods: [
      'Gillette Ridge',
      'Blue Hills',
      'Cottage Grove',
      'Bloomfield Center',
      'Brookdale',
      'Duncaster',
      'Tunxis Avenue',
      'Tariffville line'
    ],
    seasonalTitle: 'Seasonal Notes for Bloomfield Lawns',
    seasonalTips: [
      'Spring feeding balances shade and sun areas for even growth.',
      'Summer rounds include micronutrients for drought resistance.',
      'Fall applications prepare turf for winter winds off the ridge.'
    ],
    galleryTitle: 'Bloomfield Ridge Lawn',
    galleryCaption:
      'After scheduled treatments, this Bloomfield ridge property now has thick, uniform turf across the entire lot.',
    ctaTitle: 'Refresh your Bloomfield lawn'
  },
  {
    slug: 'canton',
    townName: 'Canton, CT',
    heroSubtitle: 'Fertilization and weed programs suited to Canton’s hillside and river valley properties.',
    introHeading: 'Canton Lawns That Hold Up On Every Slope',
    introCopy:
      'Canton terrain ranges from Collinsville riverbanks to scenic hilltops. We craft programs that keep turf healthy wherever you call home.',
    introSupporting:
      'Technicians adjust applications for sloped sites, drainage patterns, and irrigation rates throughout Canton.',
    highlights: [
      'Slow-release feeds that won’t wash away on slopes',
      'Spot treatments for weeds that creep in along stone walls',
      'Detailed recaps so you know how the lawn responded each visit'
    ],
    neighborhoods: [
      'Collinsville',
      'Secret Lake',
      'Cherry Brook',
      'Canton Center',
      'Route 44 corridor',
      'Albany Turnpike',
      'Barbourtown',
      'Shady Brook'
    ],
    seasonalTitle: 'Seasonal Notes for Canton Lawns',
    seasonalTips: [
      'Spring treatments stabilize nutrients on hillside drives.',
      'Summer visits add soil conditioners for high-traffic yards.',
      'Fall feeding builds roots ahead of winter winds.'
    ],
    galleryTitle: 'Canton Hillside Lawn',
    galleryCaption:
      'Consistent feeding keeps this Canton hillside property greener, thicker, and less prone to erosion.',
    ctaTitle: 'Protect your Canton lawn'
  },
  {
    slug: 'enfield',
    townName: 'Enfield, CT',
    heroSubtitle: 'Reliable fertilization and weed management addressing Enfield’s diverse neighborhoods.',
    introHeading: 'Enfield Turf Programs For Every Neighborhood',
    introCopy:
      'Enfield lawns stretch across Thompsonville, Hazardville, and Shaker Pines. We keep each property healthy with consistent feeding and weed control.',
    introSupporting:
      'Our crews align schedules with homeowner routines and weather rolling across the Connecticut River valley.',
    highlights: [
      'Fertilizer blends responsive to Enfield’s sandy and loamy soils',
      'Broadleaf suppression that keeps sidewalks and edges clean',
      'Clear communication before and after every visit'
    ],
    neighborhoods: [
      'Hazardville',
      'Thompsonville',
      'Shaker Pines',
      'King Street',
      'Enfield Street',
      'Scitico',
      'Southwood Acres',
      'Cranbrook'
    ],
    seasonalTitle: 'Seasonal Notes for Enfield Lawns',
    seasonalTips: [
      'Spring pre-emergent prevents crabgrass along busy streets.',
      'Summer visits include iron for color during dry spells.',
      'Fall feeding strengthens roots for snow season.'
    ],
    galleryTitle: 'Enfield Family Lawn',
    galleryCaption:
      'This Enfield lawn now stands up to kids, pets, and cookouts thanks to our season-long program.',
    ctaTitle: 'Keep your Enfield lawn healthy'
  }
];

const createPage = (config) => () => (
  <FertilizationWeedControlTemplate
    seo={{
      title: `Fertilization & Weed Control ${config.townName} | GD Landscaping`,
      description: config.introCopy,
      keywords: `lawn fertilization ${config.townName.split(',')[0]} CT, weed control ${config.townName.split(',')[0]} CT, lawn care programs ${config.townName.split(',')[0]}, weed prevention ${config.townName.split(',')[0]} CT`,
      canonicalUrl: `https://www.gdlandscapingllc.com/fertilization-weed-control-${config.slug}-ct`,
      structuredData: [
        createStructuredData(config.townName.split(',')[0], config.slug)
      ]
    }}
    townName={config.townName}
    hero={{
      badge: `🌾 Serving ${config.townName}`,
      title: `Fertilization & Weed Control ${config.townName}`,
      subtitle: config.heroSubtitle,
      backgroundImage: heroImage
    }}
    intro={{
      heading: config.introHeading,
      copy: config.introCopy,
      supporting: config.introSupporting
    }}
    highlights={config.highlights}
    programs={createPrograms(config.townName.split(',')[0])}
    benefits={baseBenefits(config.townName.split(',')[0])}
    stats={baseStats(config.townName.split(',')[0])}
    serviceAreas={config.neighborhoods}
    seasonalTips={{
      title: config.seasonalTitle,
      tips: config.seasonalTips
    }}
    gallery={{
      image: galleryImage,
      alt: `${config.townName} lawn after fertilization and weed control program`,
      title: config.galleryTitle,
      caption: config.galleryCaption
    }}
    cta={{
      title: config.ctaTitle,
      subtitle: 'Share a few property details and our licensed technicians will build a fertilization and weed control plan for your lawn.'
    }}
  />
);

export const FertilizationWeedControlBerlinPage = createPage(configs[0]);
export const FertilizationWeedControlHartfordPage = createPage(configs[1]);
export const FertilizationWeedControlNewBritainPage = createPage(configs[2]);
export const FertilizationWeedControlWestHartfordPage = createPage(configs[3]);
export const FertilizationWeedControlEastHartfordPage = createPage(configs[4]);
export const FertilizationWeedControlNewingtonPage = createPage(configs[5]);
export const FertilizationWeedControlWethersfieldPage = createPage(configs[6]);
export const FertilizationWeedControlRockyHillPage = createPage(configs[7]);
export const FertilizationWeedControlGlastonburyPage = createPage(configs[8]);
export const FertilizationWeedControlManchesterPage = createPage(configs[9]);
export const FertilizationWeedControlSouthWindsorPage = createPage(configs[10]);
export const FertilizationWeedControlFarmingtonPage = createPage(configs[11]);
export const FertilizationWeedControlPlainvillePage = createPage(configs[12]);
export const FertilizationWeedControlBristolPage = createPage(configs[13]);
export const FertilizationWeedControlSouthingtonPage = createPage(configs[14]);
export const FertilizationWeedControlAvonPage = createPage(configs[15]);
export const FertilizationWeedControlWindsorPage = createPage(configs[16]);
export const FertilizationWeedControlBloomfieldPage = createPage(configs[17]);
export const FertilizationWeedControlCantonPage = createPage(configs[18]);
export const FertilizationWeedControlEnfieldPage = createPage(configs[19]);
