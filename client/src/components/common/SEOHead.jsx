import { Helmet } from 'react-helmet-async';
import { localBusinessSchema, websiteSchema } from '../../utils/seoData';
import { BRAND } from '../../utils/constants';

const SITE_NAME = 'Cleaning Duck Australia';
const BASE_URL = 'https://cleaningduckaustralia.com.au';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/exterior-house.jpg`;
const DEFAULT_DESC = 'Professional cleaning services in Brisbane & All over QLD. Carpet cleaning, bond cleaning, roof washing, upholstery & pressure cleaning. 5-star rated. Free quote: 0412 664 540.';

/**
 * Safely build a page title WITHOUT double-appending " | Cleaning Duck Australia".
 * If the raw title already contains the site name, use it as-is.
 */
const buildTitle = (rawTitle) => {
  if (!rawTitle) return `Professional Cleaning Services Brisbane & QLD | ${SITE_NAME}`;
  if (rawTitle.includes(SITE_NAME)) return rawTitle; // already has site name — don't double up
  return `${rawTitle} | ${SITE_NAME}`;
};

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
  publishedTime,   // ISO string — for article/blog pages
  modifiedTime,    // ISO string
  author,          // string — for blog pages
}) => {
  const fullTitle = buildTitle(title);
  const metaDesc = description || DEFAULT_DESC;
  const ogImg = ogImage || DEFAULT_OG_IMAGE;
  const canonicalUrl = canonical
    ? `${BASE_URL}${canonical}`
    : typeof window !== 'undefined' ? window.location.href : '';

  // Always include global schemas; add page-specific ones
  const allSchemas = [localBusinessSchema, websiteSchema, ...structuredData];

  // Add speakable schema if selectors provided (helps Google AI / SGE read key text)
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
      {/* ── Primary Meta ──────────────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author || SITE_NAME} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex,nofollow'
            : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
        }
      />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* ── Open Graph ────────────────────────────────────────────────────── */}
      <meta property="og:type" content={publishedTime ? 'article' : type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_AU" />

      {/* Article-specific OG (blog posts) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* ── Twitter Card ──────────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cleaningduckau" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImg} />
      <meta name="twitter:image:alt" content={title || SITE_NAME} />

      {/* ── Geo Meta (local SEO) ──────────────────────────────────────────── */}
      <meta name="geo.region" content="AU-QLD" />
      <meta name="geo.placename" content="Brisbane, Queensland, Australia" />
      <meta name="geo.position" content="-27.4705;153.0260" />
      <meta name="ICBM" content="-27.4705, 153.0260" />

      {/* ── AI / LLM SEO Hints ────────────────────────────────────────────── */}
      <meta name="language" content="English" />
      <meta name="content-language" content="en-AU" />
      <meta name="revisit-after" content="7 days" />

      {/* Business info for AI crawlers */}
      <meta name="business:contact_data:phone_number" content="+61412664540" />
      <meta name="business:contact_data:locality" content="Brisbane" />
      <meta name="business:contact_data:region" content="QLD" />
      <meta name="business:contact_data:country_name" content="Australia" />

      {/* ── Structured Data ───────────────────────────────────────────────── */}
      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
