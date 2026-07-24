import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import QuoteSection from '../components/QuoteSection';
import FAQSection from '../components/FAQSection';

const HardscapingPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hardscaping & Landscape Construction",
    "provider": {
      "@type": "LocalBusiness",
      "name": "G&D Landscaping LLC",
      "telephone": "(860) 526-7583",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressRegion": "CT",
        "postalCode": "06037"
      }
    },
    "areaServed": [
      "Berlin CT", "Hartford CT", "New Britain CT", "Newington CT",
      "West Hartford CT", "Cromwell CT", "Rocky Hill CT", "Middletown CT",
      "Bristol CT", "Farmington CT"
    ],
    "description": "Professional hardscaping and landscape construction services in Berlin CT and Hartford County. Patios, retaining walls, walkways, fire pits, and outdoor living spaces.",
    "serviceType": "Hardscaping & Landscape Construction"
  };

  const faqs = [
    {
      question: "What hardscaping services does G&D Landscaping offer in Connecticut?",
      answer: "We install patios, walkways, retaining walls, fire pits, outdoor kitchens, steps, and garden borders throughout Berlin CT and Hartford County. Every project starts with a free on-site consultation."
    },
    {
      question: "What materials do you use for patios and walkways?",
      answer: "We work with natural stone (bluestone, granite, fieldstone), concrete pavers, brick, and tumbled block depending on your budget and aesthetic. We'll recommend the best fit for your soil conditions and climate."
    },
    {
      question: "How long does a patio installation take?",
      answer: "Most residential patio projects take 2–5 days depending on size and complexity. We handle all excavation, grading, base preparation, and installation in a single continuous crew visit when possible."
    },
    {
      question: "Do you pull permits for retaining walls?",
      answer: "Retaining walls over 4 feet tall typically require a permit in Connecticut municipalities. We handle the permit process for qualifying projects — just ask during your consultation."
    },
    {
      question: "How much does hardscaping cost in Connecticut?",
      answer: "Patio installation typically ranges from $15–$30 per square foot depending on material. Retaining walls range from $20–$50 per square foot. We provide free detailed quotes with no obligation."
    },
    {
      question: "Do you offer financing or payment plans for large projects?",
      answer: "Yes, we work with clients on phased project approaches and can discuss payment schedules for larger landscape construction jobs. Contact us to discuss your project and budget."
    }
  ];

  const services = [
    {
      icon: "🪨",
      name: "Patios & Outdoor Living",
      description: "Custom stone and paver patios designed for Connecticut's four-season climate. Natural bluestone, concrete pavers, and brick options available."
    },
    {
      icon: "🧱",
      name: "Retaining Walls",
      description: "Engineered retaining walls that manage slope, prevent erosion, and add usable outdoor space. Block, natural stone, and timber options."
    },
    {
      icon: "🚶",
      name: "Walkways & Steps",
      description: "Safe, attractive pathways from driveway to door. We match material to your home's style and handle all base preparation."
    },
    {
      icon: "🔥",
      name: "Fire Pits & Fireplaces",
      description: "Custom fire features that extend your outdoor season well into fall. Gas and wood-burning designs available."
    },
    {
      icon: "🌿",
      name: "Garden Borders & Edging",
      description: "Crisp stone and paver borders that define beds, reduce maintenance, and give your landscape a professional, finished look."
    },
    {
      icon: "🏗️",
      name: "Grading & Drainage",
      description: "Proper grading and French drain installation to keep water away from your foundation and off your lawn."
    }
  ];

  return (
    <>
      <SEOHead
        title="Hardscaping Berlin CT | Patios & Retaining Walls | G&D"
        description="Professional hardscaping and landscape construction in Berlin CT. Patios, retaining walls, walkways, fire pits, and outdoor living spaces throughout Hartford County. Free quotes."
        keywords="hardscaping Berlin CT, patio installation Connecticut, retaining wall contractor Hartford County, walkway installation Berlin CT, landscape construction CT, outdoor patio Berlin Connecticut, stone patio Hartford County, paver installation CT"
        canonicalUrl="https://www.gdlandscapingllc.com/hardscaping"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3a1a 0%, #2d5016 60%, #3d6b20 100%)',
        color: 'white',
        padding: '80px 0 60px',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ color: '#86efac', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Landscape Construction
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.2 }}>
            Hardscaping Services<br />in Berlin & Hartford County CT
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '620px', margin: '0 auto 36px', opacity: 0.9, lineHeight: 1.6 }}>
            We build outdoor spaces that last — patios, retaining walls, walkways, and fire features
            designed for Connecticut's climate and built to handle every season.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              background: '#10b981', color: 'white', padding: '14px 32px',
              borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem'
            }}>
              Get a Free Quote
            </Link>
            <a href="tel:8605267583" style={{
              background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 32px',
              borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              Call (860) 526-7583
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '70px 0', background: '#f9fafb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1f2937', marginBottom: '12px' }}>
              What We Build
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto' }}>
              From a simple garden border to a complete outdoor living transformation — we handle the design, materials, and installation.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {services.map((s, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '12px', padding: '28px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#1f2937', marginBottom: '10px', fontSize: '1.1rem' }}>{s.name}</h3>
                <p style={{ color: '#6b7280', lineHeight: 1.6, fontSize: '0.95rem' }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '70px 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#1f2937', marginBottom: '20px' }}>
                Built for Connecticut Weather
              </h2>
              <p style={{ color: '#4b5563', lineHeight: 1.7, marginBottom: '16px' }}>
                Connecticut freeze-thaw cycles destroy poorly built hardscaping. We use proper gravel base depths,
                polymeric sand, and materials rated for our climate so your patio or wall doesn't heave, shift,
                or crack after the first hard winter.
              </p>
              <p style={{ color: '#4b5563', lineHeight: 1.7, marginBottom: '28px' }}>
                Every project includes proper grading and drainage planning — because water management is the
                difference between hardscaping that lasts 5 years and hardscaping that lasts 25.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Free on-site consultations throughout Hartford County',
                  'Licensed & fully insured',
                  'All excavation, grading, and installation handled in-house',
                  'Serving Berlin CT and surrounding towns since day one'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#10b981', fontWeight: 700, marginTop: '2px' }}>✓</span>
                    <span style={{ color: '#374151' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
              borderRadius: '16px', padding: '40px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🪨</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                {[
                  { value: '500+', label: 'Projects completed' },
                  { value: 'Free', label: 'On-site quotes' },
                  { value: '25 mi', label: 'Service radius' },
                  { value: '4.9★', label: 'Average rating' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065f46' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" style={{
                display: 'block', background: '#10b981', color: 'white',
                padding: '14px', borderRadius: '8px', textDecoration: 'none',
                fontWeight: 700, fontSize: '1rem'
              }}>
                Schedule Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section style={{ padding: '50px 0', background: '#f0fdf4' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '20px' }}>
            Hardscaping Service Area — Hartford County CT
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            We serve Berlin and surrounding towns within 25 miles, including:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {['Berlin', 'Hartford', 'New Britain', 'Newington', 'West Hartford',
              'Cromwell', 'Rocky Hill', 'Middletown', 'Bristol', 'Farmington',
              'Southington', 'Meriden', 'Wethersfield', 'Glastonbury'].map(city => (
              <span key={city} style={{
                background: 'white', border: '1px solid #bbf7d0', borderRadius: '20px',
                padding: '6px 16px', fontSize: '0.9rem', color: '#065f46', fontWeight: 500
              }}>
                {city} CT
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Hardscaping FAQ — Connecticut" />

      {/* CTA */}
      <QuoteSection
        title="Ready to Build Something?"
        subtitle="Get a free on-site quote for your patio, retaining wall, or outdoor living project."
      />
    </>
  );
};

export default HardscapingPage;
