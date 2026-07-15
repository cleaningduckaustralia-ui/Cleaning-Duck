import { BRAND } from './constants';

// ─── LocalBusiness Schema (AI SEO — enables Google AI answers) ────────────────
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://cleaningduckaustralia.com.au/#business',
  name: 'Cleaning Duck Australia',
  alternateName: 'Cleaning Duck',
  description: 'Professional cleaning services in Brisbane & South East QLD. Carpet cleaning, bond cleaning, roof cleaning, upholstery, pressure cleaning, gutter cleaning, solar panel cleaning and more.',
  url: 'https://cleaningduckaustralia.com.au',
  telephone: ['+61412664540', '+61430614643'],
  email: 'info@cleaningduckaustralia.com.au',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.4705,
    longitude: 153.0260,
  },
  areaServed: [
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'City', name: 'Logan' },
    { '@type': 'City', name: 'Ipswich' },
    { '@type': 'City', name: 'Gold Coast' },
    { '@type': 'City', name: 'Sunshine Coast' },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '07:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '08:00', closes: '17:00' },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '18',
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bond Cleaning / End of Lease Cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carpet Steam Cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Upholstery Cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Cleaning', price: '999', priceCurrency: 'AUD' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pressure Cleaning', price: '333', priceCurrency: 'AUD' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gutter Cleaning', price: '169', priceCurrency: 'AUD' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Solar Panel Cleaning', price: '18', priceCurrency: 'AUD' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mattress Cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior House Washing', price: '599', priceCurrency: 'AUD' } },
    ],
  },
  sameAs: [
    'https://www.facebook.com/cleaningduckaustralia',
    'https://www.instagram.com/cleaningduckaustralia',
  ],
  foundingDate: '2024',
  taxID: '89383045240',
  identifier: { '@type': 'PropertyValue', name: 'ABN', value: '89 383 045 240' },
};

// ─── Generate Service Schema ──────────────────────────────────────────────────
export const generateServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.shortDescription,
  provider: { '@type': 'LocalBusiness', name: 'Cleaning Duck Australia', '@id': 'https://cleaningduckaustralia.com.au/#business' },
  areaServed: service.serviceAreas?.map((area) => ({ '@type': 'City', name: area })) || [],
  ...(service.pricing?.from && {
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      description: service.pricing.displayText,
      seller: { '@type': 'LocalBusiness', name: 'Cleaning Duck Australia' },
    },
  }),
  url: `https://cleaningduckaustralia.com.au/services/${service.slug}`,
});

// ─── Generate FAQ Schema ──────────────────────────────────────────────────────
export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

// ─── Generate Review Schema ───────────────────────────────────────────────────
export const generateReviewSchema = (testimonials) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://cleaningduckaustralia.com.au/#business',
  name: 'Cleaning Duck Australia',
  review: testimonials.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: '5' },
    reviewBody: t.review,
    datePublished: t.reviewDate || '2024-01-01',
  })),
});

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────
export const generateBreadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: `https://cleaningduckaustralia.com.au${crumb.path}`,
  })),
});

// ─── Speakable Schema (AI Search — Google SGE / Bing Copilot) ─────────────────
export const generateSpeakableSchema = (selectors = []) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: selectors.length > 0 ? selectors : ['.hero-headline', '.service-description', '.faq-question'],
  },
  url: typeof window !== 'undefined' ? window.location.href : '',
});

// ─── WebSite Schema (Sitelinks SearchBox) ────────────────────────────────────
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://cleaningduckaustralia.com.au',
  name: 'Cleaning Duck Australia',
  description: 'Professional cleaning services in Brisbane & South East Queensland',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://cleaningduckaustralia.com.au/search?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

// ─── HowTo Schema (for service pages) ────────────────────────────────────────
export const generateHowToSchema = (title, steps) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: title,
  step: steps.map((step, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: step.name,
    text: step.text,
  })),
});
