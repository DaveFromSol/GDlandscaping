const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.gdlandscapingllc.com';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Get current date in W3C format
const getCurrentDate = () => {
  return new Date().toISOString();
};

// Define all routes categorized
const mainPages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/services', priority: 0.9, changefreq: 'monthly' },
  { url: '/portfolio', priority: 0.8, changefreq: 'monthly' },
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.9, changefreq: 'monthly' },
  { url: '/quote', priority: 0.9, changefreq: 'weekly' },
  { url: '/instant-quote', priority: 0.95, changefreq: 'weekly' },
];

const blogPages = [
  { url: '/blog', priority: 0.8, changefreq: 'weekly' },
  { url: '/blog/core-aeration-benefits', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/drought-resistant-landscaping-ideas', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/fall-cleanup-checklist', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/hoa-grounds-management', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/hedge-trimming-secrets', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/mulch-edging-curb-appeal', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/seasonal-lawn-care-schedule', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/snow-readiness-commercial-lots', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/sustainable-landscaping-connecticut', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/winterize-irrigation-systems', priority: 0.7, changefreq: 'monthly' },
];

// Location-specific pages
const cities = [
  'berlin',
  'hartford',
  'farmington',
  'new-britain',
  'cromwell',
  'middletown',
  'rocky-hill',
  'newington',
  'west-hartford',
  'bristol'
];

// Additional cities for fertilization/weed control
const fertilizationCities = [
  'berlin',
  'hartford',
  'new-britain',
  'west-hartford',
  'east-hartford',
  'newington',
  'wethersfield',
  'rocky-hill',
  'glastonbury',
  'manchester',
  'south-windsor',
  'farmington',
  'plainville',
  'bristol',
  'southington',
  'avon',
  'windsor',
  'bloomfield',
  'canton',
  'enfield'
];

const services = [
  { slug: 'lawn-care', priority: 0.85 },
  { slug: 'snow-removal', priority: 0.85 },
  { slug: 'bush-trimming', priority: 0.8 },
  { slug: 'fall-cleanup', priority: 0.8 }
];

// Generate location pages
const locationPages = [];
locationPages.push({ url: '/snow-removal', priority: 0.9, changefreq: 'weekly' });

// Generate standard service location pages
services.forEach(service => {
  cities.forEach(city => {
    locationPages.push({
      url: `/${service.slug}-${city}-ct`,
      priority: service.priority,
      changefreq: 'monthly'
    });
  });
});

// Generate fertilization/weed control pages (has more cities)
fertilizationCities.forEach(city => {
  locationPages.push({
    url: `/fertilization-weed-control-${city}-ct`,
    priority: 0.85,
    changefreq: 'monthly'
  });
});

// Generate XML for a sitemap
const generateSitemapXML = (routes, filename) => {
  const currentDate = getCurrentDate().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  const filePath = path.join(PUBLIC_DIR, filename);
  fs.writeFileSync(filePath, xml, 'utf8');

  return routes.length;
};

// Generate sitemap index
const generateSitemapIndex = () => {
  const currentDate = getCurrentDate();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const sitemaps = [
    'sitemap-pages.xml',
    'sitemap-blog.xml',
    'sitemap-locations.xml'
  ];

  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${BASE_URL}/${sitemap}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });

  xml += '</sitemapindex>';

  const filePath = path.join(PUBLIC_DIR, 'sitemap-index.xml');
  fs.writeFileSync(filePath, xml, 'utf8');
};

// Generate all sitemaps
const generateAll = () => {
  try {
    console.log('🚀 Generating sitemaps...\n');

    // Generate individual sitemaps
    const pagesCount = generateSitemapXML(mainPages, 'sitemap-pages.xml');
    console.log(`✅ sitemap-pages.xml - ${pagesCount} URLs`);

    const blogCount = generateSitemapXML(blogPages, 'sitemap-blog.xml');
    console.log(`✅ sitemap-blog.xml - ${blogCount} URLs`);

    const locationsCount = generateSitemapXML(locationPages, 'sitemap-locations.xml');
    console.log(`✅ sitemap-locations.xml - ${locationsCount} URLs`);

    // Generate main sitemap (all combined)
    const allRoutes = [...mainPages, ...blogPages, ...locationPages];
    const totalCount = generateSitemapXML(allRoutes, 'sitemap.xml');
    console.log(`✅ sitemap.xml (combined) - ${totalCount} URLs`);

    // Generate sitemap index
    generateSitemapIndex();
    console.log(`✅ sitemap-index.xml\n`);

    console.log(`📍 Location: ${PUBLIC_DIR}`);
    console.log(`📊 Total URLs: ${totalCount}`);
    console.log(`📅 Last modified: ${getCurrentDate().split('T')[0]}`);
    console.log('\n✨ All sitemaps generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
};

// Run the script
generateAll();
