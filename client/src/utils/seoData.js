import { BRAND } from './constants';

// ─── LocalBusiness Schema (AI SEO — enables Google AI answers) ────────────────
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://cleaningduckaustralia.com.au/#business',
  name: 'Cleaning Duck Australia',
  alternateName: 'Cleaning Duck',
  description: 'Professional cleaning services in Brisbane & All over QLD. Carpet cleaning, bond cleaning, roof cleaning, upholstery, pressure cleaning, gutter cleaning, solar panel cleaning and more.',
  url: 'https://cleaningduckaustralia.com.au',
  telephone: ['+61412664540', '+61430614643'],
  email: 'cleaningduckaustralia@gmail.com',
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
    name: 'Cleaning Services Brisbane',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bond Cleaning / End of Lease Cleaning', url: 'https://cleaningduckaustralia.com.au/services/end-of-lease-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carpet Steam Cleaning', url: 'https://cleaningduckaustralia.com.au/services/carpet-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Upholstery Cleaning', url: 'https://cleaningduckaustralia.com.au/services/upholstery-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Roof Cleaning', url: 'https://cleaningduckaustralia.com.au/services/roof-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pressure Cleaning', url: 'https://cleaningduckaustralia.com.au/services/pressure-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gutter Cleaning', url: 'https://cleaningduckaustralia.com.au/services/gutter-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Solar Panel Cleaning', url: 'https://cleaningduckaustralia.com.au/services/solar-panel-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior House Washing', url: 'https://cleaningduckaustralia.com.au/services/exterior-house-washing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Post Construction Cleaning', url: 'https://cleaningduckaustralia.com.au/services/post-construction-cleaning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pre Sale Cleaning', url: 'https://cleaningduckaustralia.com.au/services/pre-sale-cleaning' } },
    ],
  },
  sameAs: [
    BRAND.social.facebook,
    BRAND.social.instagram,
    BRAND.social.tiktok,
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
  description: 'Professional cleaning services in Brisbane & All over QLD',
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

// ─── BlogPosting Schema (for blog article pages — enables Rich Results) ───────
export const generateBlogPostingSchema = (blog, imageUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: blog.title,
  description: blog.excerpt || blog.title,
  image: imageUrl || 'https://cleaningduckaustralia.com.au/images/exterior-house.jpg',
  datePublished: blog.createdAt || new Date().toISOString(),
  dateModified: blog.updatedAt || blog.createdAt || new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: 'Cleaning Duck Australia',
    url: 'https://cleaningduckaustralia.com.au',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Cleaning Duck Australia',
    url: 'https://cleaningduckaustralia.com.au',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cleaningduckaustralia.com.au/wp-content/uploads/2025/12/cropped-Untitled-design23-270x270.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://cleaningduckaustralia.com.au/blog/${blog.slug}`,
  },
  keywords: (blog.tags || []).join(', '),
  articleSection: 'Cleaning Tips & Guides',
  inLanguage: 'en-AU',
});

// ─── Service Page Schema (rich result for individual service pages) ────────────
export const generateDetailedServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  serviceType: service.title,
  description: service.shortDescription || service.longDescription,
  provider: {
    '@type': 'LocalBusiness',
    name: 'Cleaning Duck Australia',
    '@id': 'https://cleaningduckaustralia.com.au/#business',
    telephone: '+61412664540',
    url: 'https://cleaningduckaustralia.com.au',
  },
  areaServed: [
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'City', name: 'Logan' },
    { '@type': 'City', name: 'Ipswich' },
    { '@type': 'City', name: 'Gold Coast' },
    { '@type': 'City', name: 'Sunshine Coast' },
  ],
  url: `https://cleaningduckaustralia.com.au/services/${service.slug}`,
  image: service.image,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} Packages`,
    itemListElement: (service.features || []).map((f) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: f },
    })),
  },
});

