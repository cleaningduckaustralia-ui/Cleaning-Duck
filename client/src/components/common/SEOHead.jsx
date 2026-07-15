import { Helmet } from 'react-helmet-async';
import { localBusinessSchema, websiteSchema } from '../../utils/seoData';
import { BRAND } from '../../utils/constants';

const SEOHead = ({
  title,
  description,
  keywords = [],
  ogImage,
  canonical,
  noIndex = false,
  structuredData = [],
  type = 'website',
  speakableSelectors = [],
}) => {
  const fullTitle = title
    ? `${title} | Cleaning Duck Australia`
    : 'Professional Cleaning Services In Brisbane | Cleaning Duck Australia';
  const metaDesc = description ||
    'Need reliable cleaning services in Brisbane? We offer carpet, roof, upholstery & house cleaning. Get your free quote today. Call 0412 664 540.';
  const ogImg = ogImage || BRAND.logoUrl;
  const canonicalUrl = canonical
    ? `https://cleaningduckaustralia.com.au${canonical}`
    : typeof window !== 'undefined' ? window.location.href : '';

  // Combine all schemas
  const allSchemas = [localBusinessSchema, websiteSchema, ...structuredData];

  // Add speakable schema if selectors provided
  if (speakableSelectors.length > 0) {
    allSchemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: speakableSelectors,
      },
      url: canonicalUrl,
    });
  }

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content="Cleaning Duck Australia" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Cleaning Duck Australia" />
      <meta property="og:locale" content="en_AU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImg} />

      {/* Geo Meta (local SEO) */}
      <meta name="geo.region" content="AU-QLD" />
      <meta name="geo.placename" content="Brisbane" />
      <meta name="geo.position" content="-27.4705;153.0260" />
      <meta name="ICBM" content="-27.4705, 153.0260" />

      {/* AI SEO — Language & Content */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="content-language" content="en-AU" />

      {/* Business Info for AI crawlers */}
      <meta name="business:contact_data:phone_number" content="+61412664540" />
      <meta name="business:contact_data:locality" content="Brisbane" />
      <meta name="business:contact_data:region" content="QLD" />
      <meta name="business:contact_data:country_name" content="Australia" />

      {/* Structured Data (all schemas) */}
      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
