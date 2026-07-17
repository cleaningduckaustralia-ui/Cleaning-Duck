import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import QuoteFormSection from '../components/home/QuoteFormSection';
import api from '../services/api';
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from '../utils/seoData';
import { BRAND } from '../utils/constants';
import { publicAsset } from '../utils/pathHelpers';
import galleryImages from '../data/galleryImages.json';

// ─── Static fallback service data (used when API unavailable) ─────────────────
const STATIC_SERVICES = {
  'bond-cleaning': {
    title: 'Bond Cleaning',
    slug: 'bond-cleaning',
    shortDescription: 'Thorough end-of-lease cleaning to get your full bond back — covering every room, appliance, skirting board, and surface.',
    longDescription: '<p>Our professional bond cleaning service is specifically designed to meet real estate agent requirements across Brisbane and All over QLD. We cover every area of your property from top to bottom, ensuring you get your full bond refund.</p><p>Our experienced team uses commercial-grade equipment and eco-friendly products to deliver spotless results that pass even the strictest property inspections.</p>',
    features: [
      'All rooms cleaned top-to-bottom', 'Kitchen — oven, stovetop, rangehood, cupboards',
      'Bathrooms & toilets scrubbed and sanitised', 'Windows, tracks & sills',
      'Skirting boards, light switches & power points', 'Carpet steam cleaning (optional add-on)',
      'Wall spot cleaning', 'Bond-back guarantee',
    ],
    benefits: ['Guaranteed bond refund', '100% satisfaction guarantee', 'Same-day service available', 'Fully insured team'],
    image: publicAsset('/images/BondEnd of lease/IMG_3067.jpg'),
    galleryCategories: ['BondEnd of lease'],
    faq: [
      { question: 'Do you offer a bond-back guarantee?', answer: 'Yes! If your agent finds any issues related to our cleaning, we come back and fix it free of charge.' },
      { question: 'How long does bond cleaning take?', answer: 'A standard 3-bedroom house takes approximately 4–6 hours depending on its condition.' },
      { question: 'Do I need to be present during the clean?', answer: 'No, you just need to provide us access. We can work independently and lock up when done.' },
    ],
  },
  'carpet-cleaning': {
    title: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    shortDescription: 'Professional steam carpet cleaning removing deep stains, allergens, pet odours — leaving carpets fresh, sanitised, and brand new.',
    longDescription: '<p>Our hot water extraction method penetrates deep into carpet fibres, loosening and removing dirt, bacteria, allergens, and stains that regular vacuuming can\'t reach. Safe for all carpet types including wool, nylon, and polyester.</p>',
    features: [
      'Hot water extraction (steam cleaning)', 'Pre-treatment of stains and high-traffic areas',
      'Pet odour & urine treatment', 'Deodorising & sanitising',
      'Fast dry time (2–4 hours)', 'All carpet types including wool',
      'Moves light furniture', 'Eco-friendly products',
    ],
    benefits: ['Removes 99% of bacteria', 'Allergy-friendly process', 'No harsh chemicals', 'Extends carpet life'],
    image: publicAsset('/images/Carpet cleaning/PHOTO-2026-02-09-16-12-53.jpg'),
    pricing: { from: 'Starts from $33', displayText: 'Starts from $33' },
    galleryCategories: ['Carpet cleaning'],
    faq: [
      { question: 'How long until carpets dry?', answer: 'Carpets typically dry within 2–4 hours depending on humidity and ventilation.' },
      { question: 'Can you remove pet urine stains?', answer: 'Yes, we have specialist enzyme treatments that neutralise pet urine odours and stains effectively.' },
    ],
  },
  'upholstery-cleaning': {
    title: 'Upholstery Cleaning',
    slug: 'upholstery-cleaning',
    shortDescription: 'Restore sofas, lounges, chairs and fabric surfaces with our safe deep-clean upholstery service.',
    longDescription: '<p>We clean all types of upholstery including fabric sofas, leather lounges, dining chairs, and car seats. Our gentle yet effective process removes stains, odours, dust mites and bacteria without damaging delicate fabrics.</p>',
    features: ['All fabric types — microfibre, velvet, cotton', 'Leather cleaning & conditioning', 'Stain pre-treatment', 'Deodorising', 'Safe for kids & pets', 'Dining chairs & ottomans'],
    benefits: ['Extends furniture life', 'Removes allergens', 'Restores original colour', 'Fast drying'],
    image: publicAsset('/images/Upholstery/PHOTO-2026-02-09-16-11-51.jpg'),
    pricing: { from: 'Starts from $33', displayText: 'Starts from $33' },
    galleryCategories: ['Upholstery'],
    faq: [{ question: 'Is cleaning safe for my leather sofa?', answer: 'Yes, we use specialist leather-safe cleaners and conditioners that clean and protect the leather.' }],
  },
  'mattress-cleaning': {
    title: 'Mattress Cleaning',
    slug: 'mattress-cleaning',
    shortDescription: 'Remove dust mites, allergens and stains for a healthier, more hygienic night\'s sleep.',
    longDescription: '<p>The average mattress harbours millions of dust mites and bacteria. Our specialist mattress cleaning uses UV sanitisation and hot extraction to create a healthier sleep environment for you and your family.</p>',
    features: ['UV sanitisation', 'Hot extraction cleaning', 'Dust mite treatment', 'Stain removal', 'Allergen reduction', 'Odour elimination', 'All mattress sizes', 'Same-day service available'],
    benefits: ['99% dust mite reduction', 'Better sleep quality', 'Allergy relief', 'Safe for all ages'],
    image: 'https://cleaningduckaustralia.com.au/wp-content/uploads/2025/04/mattress-cleaning.jpg',
    galleryCategories: ['BondEnd of lease'],
    faq: [{ question: 'How often should I have my mattress cleaned?', answer: 'We recommend every 6–12 months, especially if you have allergies or pets.' }],
  },
  'exterior-house-washing': {
    title: 'Exterior House Washing',
    slug: 'exterior-house-washing',
    shortDescription: 'Complete exterior house wash removing mould, mildew, dirt, and stains — restoring your home\'s original appearance.',
    longDescription: '<p>Our exterior house washing service uses a combination of soft washing and pressure washing techniques to safely remove mould, mildew, algae, dirt, and stains from all exterior surfaces including brick, render, weatherboard, and cladding.</p>',
    features: ['Walls, eaves & fascias', 'Driveway & paths', 'Fences & retaining walls', 'Soft wash for delicate surfaces', 'Mould & mildew treatment', 'Biodegradable detergents', 'Before & after photos', 'All house types'],
    benefits: ['Prevents long-term damage', 'Improves curb appeal', 'Removes health hazards', 'Protects paintwork'],
    image: publicAsset('/images/exterior-house.jpg'),
    galleryCategories: null,
    faq: [{ question: 'Will pressure washing damage my render?', answer: 'No — we use soft washing at low pressure for rendered surfaces to safely remove mould without causing damage.' }],
  },
  'roof-cleaning': {
    title: 'Roof Cleaning',
    slug: 'roof-cleaning',
    shortDescription: 'Professional roof cleaning to remove lichen, moss and algae — extending your roof\'s life and boosting curb appeal.',
    longDescription: '<p>Lichen, moss and algae don\'t just look bad — they can cause permanent damage to your roof tiles and shingles. Our specialist roof cleaning service uses safe, controlled techniques to restore your roof and prevent future regrowth.</p>',
    features: ['Lichen & moss removal', 'Algae treatment', 'Soft wash technique', 'All tile types — terracotta, concrete, metal', 'Preventative treatment', 'Gutter inspection included', 'Safe work practices', 'Fully insured'],
    benefits: ['Extends roof life by years', 'Prevents leaks', 'Improves home value', 'Regrowth prevention'],
    image: publicAsset('/images/Exterior Roof/IMG_2788.PNG'),
    galleryCategories: ['Exterior Roof'],
    faq: [{ question: 'How long does roof cleaning take?', answer: 'Most residential roofs take 3–5 hours. Larger or heavily affected roofs may take longer.' }],
  },
  'pressure-cleaning': {
    title: 'Pressure Cleaning',
    slug: 'pressure-cleaning',
    shortDescription: 'High-pressure wash for driveways, patios, decks and concrete — blasting away years of grime.',
    longDescription: '<p>Our commercial-grade pressure washing equipment delivers outstanding results on all hard surfaces. From oil-stained driveways to grimy patios, we restore surfaces to a like-new appearance safely and efficiently.</p>',
    features: ['Driveways & carports', 'Patios & entertaining areas', 'Decks & timber (soft wash)', 'Fences & walls', 'Pool surrounds', 'Oil & grease removal', 'Concrete & pavers', 'Commercial properties'],
    benefits: ['Removes years of buildup', 'Prevents slip hazards', 'Boosts property value', 'Fast results'],
    image: publicAsset('/images/Exterior Drivwway/80fff1e8-5098-4dde-ad47-45b979652525.JPG'),
    galleryCategories: ['Exterior Drivwway'],
    faq: [{ question: 'Can you remove oil stains from my driveway?', answer: 'Yes, we pre-treat oil and grease stains with specialist degreasers before pressure washing for best results.' }],
  },
  'gutter-cleaning': {
    title: 'Gutter Cleaning',
    slug: 'gutter-cleaning',
    shortDescription: 'Keep gutters flowing freely — we clear leaves, debris and blockages to protect your home from water damage.',
    longDescription: '<p>Blocked gutters cause serious water damage to your roof, walls, and foundations. Our comprehensive gutter cleaning service removes all debris, flushes downpipes, and inspects for damage — protecting your home year-round.</p>',
    features: ['Full debris removal', 'Downpipe flushing', 'Roof valley clearing', 'Gutter guard inspection', 'Damage report provided', 'Before & after photos', 'All roof heights', '2-storey specialists'],
    benefits: ['Prevents water damage', 'Protects foundations', 'Avoids pest nesting', 'Extends gutter life'],
    image: publicAsset('/images/Exterior Gutter/86d3155f-9481-4660-b028-61cbea3678af.JPG'),
    galleryCategories: ['Exterior Gutter'],
    faq: [{ question: 'How often should gutters be cleaned?', answer: 'At least twice a year — before and after storm season. Properties near trees may need more frequent cleaning.' }],
  },
  'solar-panel-cleaning': {
    title: 'Solar Panel Cleaning',
    slug: 'solar-panel-cleaning',
    shortDescription: 'Restore solar panel efficiency — removing dust, bird droppings and grime that can reduce output by up to 30%.',
    longDescription: '<p>Dirty solar panels can lose up to 30% of their power output. Our specialist cleaning service uses purified water and gentle brushes to safely clean all panel types, maximising your energy generation and ROI.</p>',
    features: ['Purified water system', 'No harsh chemicals', 'Soft brush technique', 'All panel brands', 'Single & multi-storey', 'Safety harness certified', 'Output report available', 'Regular maintenance plans'],
    benefits: ['Restore up to 30% lost output', 'Extends panel warranty', 'Chemical-free process', 'Maximises ROI'],
    image: publicAsset('/images/Exterior Solar/f8492476-0ba0-4e1d-8d3e-55a102139a7b.JPG'),
    galleryCategories: ['Exterior Solar'],
    faq: [{ question: 'Will cleaning damage my panels?', answer: 'No — we use a purified water and soft brush system specifically designed for solar panels with no harsh chemicals.' }],
  },
};

// ─── Service Detail Page ─────────────────────────────────────────────────────
const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/services/${slug}`)
      .then(({ data }) => setService(data.data))
      .catch(() => {
        // Fall back to static data if API unavailable
        if (STATIC_SERVICES[slug]) {
          setService(STATIC_SERVICES[slug]);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!service) return <Navigate to="/services" replace />;

  const serviceSchema = generateServiceSchema(service);
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ]);
  const faqSchema = service.faq?.length ? generateFAQSchema(service.faq.map((f, i) => ({ ...f, _id: i }))) : null;
  const schemas = [serviceSchema, breadcrumb, ...(faqSchema ? [faqSchema] : [])];
  const heroImage = service.image || STATIC_SERVICES[slug]?.image;

  return (
    <>
      <SEOHead
        title={service.seo?.title || service.title}
        description={service.seo?.description || service.shortDescription}
        keywords={service.seo?.keywords || []}
        canonical={`/services/${service.slug}`}
        structuredData={schemas}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative min-h-[480px] flex items-end overflow-hidden">
        {/* Background image */}
        {heroImage && (
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="container-custom relative z-10 pb-16 pt-36">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-orange-300">{service.title}</li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {service.pricing?.from && (
              <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold text-sm mb-4">
                {service.pricing.displayText || service.pricing.from}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl service-description mb-8" data-speakable="true">
              {service.shortDescription}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/request-quote" className="btn-primary btn-lg">Get Free Quote</Link>
              <a href={BRAND.phoneHref.primary} className="btn-outline btn-lg">
                📞 Call {BRAND.phone.primary}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Trust bar ──────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #7c3200, #c05411)' }} className="py-5">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { icon: '⭐', text: '5-Star Rated' },
              { icon: '🛡️', text: 'Fully Insured' },
              { icon: '✅', text: '2,000+ Jobs Done' },
              { icon: '⚡', text: 'Same-Day Available' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white text-sm font-medium">
                <span className="text-orange-300">{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left — Main content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Long description */}
              {service.longDescription && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">About This Service</h2>
                  <div
                    className="prose prose-lg max-w-none text-neutral-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: service.longDescription }}
                  />
                </div>
              )}

              {/* Features */}
              {service.features?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                    What's Included
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100"
                      >
                        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</span>
                        <span className="text-neutral-700 text-sm leading-relaxed">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-5">Key Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-neutral-100 shadow-soft bg-white">
                        <span className="text-2xl">⭐</span>
                        <span className="text-neutral-700 text-sm font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {service.faq?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {service.faq.map((f, i) => (
                      <div
                        key={i}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-orange-300 shadow-md' : 'border-neutral-200'}`}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full px-6 py-4 text-left font-semibold text-neutral-800 text-sm flex items-center justify-between gap-4"
                        >
                          {f.question}
                          <span className={`text-orange-500 text-xl flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                        </button>
                        {openFaq === i && (
                          <div className="px-6 pb-5 text-neutral-600 text-sm leading-relaxed border-t border-orange-100 pt-4 bg-orange-50/50">
                            {f.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Gallery Section */}
              {service.galleryCategories && (
                <div className="mt-12 border-t border-neutral-100 pt-10">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">Our Work Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {galleryImages
                      .filter((img) => service.galleryCategories.includes(img.category))
                      .slice(0, 6) // limit to 6 images on service detail page
                      .map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-xl shadow-sm group">
                          <img 
                            src={img.src} 
                            alt={`${service.title} example ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <Link 
                            to="/gallery"
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-medium text-sm"
                          >
                            View Full Gallery
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Sidebar */}
            <div className="space-y-5">

              {/* Quick quote */}
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #7c3200, #c05411)' }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={BRAND.logoUrl} alt="Cleaning Duck" className="w-12 h-12 rounded-full ring-2 ring-orange-300/50" />
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">Get a Free Quote</h3>
                      <p className="text-orange-200 text-xs">Reply within 2 hours</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-5">Tell us about your property and we'll send a personalised quote fast.</p>
                  <Link to="/request-quote" className="block w-full text-center bg-white text-orange-700 font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors">
                    Request Free Quote
                  </Link>
                  <a href={BRAND.phoneHref.primary} className="flex items-center justify-center gap-2 mt-3 text-white/70 hover:text-white text-sm transition-colors">
                    📞 {BRAND.phone.primary}
                  </a>
                  <a href={BRAND.phoneHref.secondary} className="flex items-center justify-center gap-2 mt-1.5 text-white/70 hover:text-white text-sm transition-colors">
                    📞 {BRAND.phone.secondary}
                  </a>
                  <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mt-1.5 text-white/70 hover:text-white text-sm transition-colors">
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Pricing */}
              {service.pricing && (
                <div className="card border border-orange-100">
                  <h3 className="text-lg font-bold text-neutral-800 mb-3">Pricing</h3>
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {service.pricing.from === 'Call for quote' ? 'Call for Quote' : service.pricing.from}
                  </div>
                  <p className="text-neutral-500 text-xs">Prices vary based on property size & condition. Get a free custom quote.</p>
                  {service.pricing.included?.length > 0 && (
                    <ul className="space-y-1.5 mt-4 border-t border-neutral-100 pt-4">
                      {service.pricing.included.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                          <span className="text-green-500 font-bold">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Service areas */}
              <div className="card border border-orange-100">
                <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
                  📍 Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {BRAND.serviceAreas.map((area) => (
                    <span key={area} className="text-xs font-medium px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related services */}
              <div className="card border border-neutral-100">
                <h3 className="font-bold text-neutral-800 mb-4 text-sm">Other Services You May Need</h3>
                <div className="space-y-2">
                  {Object.values(STATIC_SERVICES)
                    .filter((s) => s.slug !== slug)
                    .slice(0, 4)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-orange-50 transition-colors group text-sm"
                      >
                        <span className="text-neutral-700 group-hover:text-orange-700 font-medium">{s.title}</span>
                        <svg className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <QuoteFormSection />
    </>
  );
};

export default ServiceDetailPage;
