const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.gdlandscapingllc.com';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Define all routes with their priorities and change frequencies
const routes = [
  // Main pages
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/services', priority: 0.9, changefreq: 'monthly' },
  { url: '/portfolio', priority: 0.8, changefreq: 'monthly' },
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.9, changefreq: 'monthly' },

  // Quote pages
  { url: '/quote', priority: 0.9, changefreq: 'weekly' },
  { url: '/instant-quote', priority: 0.95, changefreq: 'weekly' },

  // Blog pages
  { url: '/blog', priority: 0.8, changefreq: 'weekly' },
  { url: '/blog/core-aeration-benefits', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/drought-resistant-landscaping', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/fall-cleanup-checklist', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/hoa-grounds-management', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/hedge-trimming-secrets', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/mulch-edging-curb-appeal', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/seasonal-lawn-care', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/snow-readiness-commercial', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/sustainable-landscaping', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/winterize-irrigation', priority: 0.7, changefreq: 'monthly' },
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

const services = [
  { slug: 'lawn-care', priority: 0.85 },
  { slug: 'snow-removal', priority: 0.85 },
  { slug: 'bush-trimming', priority: 0.8 },
  { slug: 'fall-cleanup', priority: 0.8 }
];

// Add main service pages
routes.push({ url: '/snow-removal', priority: 0.9, changefreq: 'weekly' });

// Generate location-specific service pages
services.forEach(service => {
  cities.forEach(city => {
    routes.push({
      url: `/${service.slug}-${city}-ct`,
      priority: service.priority,
      changefreq: 'monthly'
    });
  });
});

// Generate XML sitemap
const generateSitemap = () => {
  const currentDate = getCurrentDate();

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

  return xml;
};

// Write sitemap to file
const writeSitemap = () => {
  try {
    const sitemap = generateSitemap();
    fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Location: ${SITEMAP_PATH}`);
    console.log(`📊 Total URLs: ${routes.length}`);
    console.log(`📅 Last modified: ${getCurrentDate()}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Run the script
writeSitemap();
