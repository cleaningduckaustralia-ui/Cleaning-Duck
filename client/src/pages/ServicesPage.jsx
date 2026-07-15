import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../components/common/SEOHead';
import { generateBreadcrumbSchema } from '../utils/seoData';
import { BRAND } from '../utils/constants';

// ─── Specialised services ─────────────────────────────────────────────────────
const SPECIALISED_SERVICES = [
  {
    slug: 'end-of-lease-cleaning',
    title: 'End of Lease / Bond Cleaning',
    subtitle: 'Bond-Back Guaranteed',
    description: 'Thorough end-of-lease cleaning to get your full bond back. Every room, appliance, surface and window cleaned to real estate inspection standards.',
    icon: '🏠',
    image: '/images/BondEnd of lease/IMG_2811.jpg',
    features: ['All rooms & bathrooms', 'Oven & appliances', 'Windows & skirting boards', 'Bond-back guarantee'],
    color: 'from-orange-500 to-red-500',
  },
  {
    slug: 'post-construction-cleaning',
    title: 'Post Construction Cleaning',
    subtitle: 'Builder Clean Specialists',
    description: 'Remove dust, debris, paint splatters, adhesive and construction residue from every surface. Get your new build or renovation handover-ready.',
    icon: '🏗️',
    image: '/images/Post con/IMG_3239.jpg',
    features: ['Dust & debris removal', 'Paint splatter removal', 'Floor & tile cleaning', 'Window & glass clean'],
    color: 'from-slate-600 to-blue-700',
  },
  {
    slug: 'pre-sale-cleaning',
    title: 'Pre Sale Cleaning',
    subtitle: 'Sell Faster & For More',
    description: 'Maximise your sale price with a presentation-ready clean. We prep your home for photography, open homes, and buyer inspections.',
    icon: '🏡',
    image: '/images/Presale/IMG_3341.jpg',
    features: ['Full interior deep clean', 'Carpet steam clean', 'Exterior & windows', 'Photo-ready finish'],
    color: 'from-emerald-600 to-teal-700',
  },
];

// ─── Packages summary ─────────────────────────────────────────────────────────
const PACKAGE_CARDS = [
  { id: 'p1', name: 'The High Duck', emoji: '🏗️', tagline: 'Roof + House + Gutters', color: 'from-slate-600 to-blue-700' },
  { id: 'p2', name: 'The Ground Duck', emoji: '☀️', tagline: 'Driveway + Solar + Paths', color: 'from-amber-500 to-orange-600' },
  { id: 'p3', name: 'The Full Duck', emoji: '🏠', tagline: 'Complete Interior Bundle', color: 'from-orange-500 to-red-600', popular: true },
  { id: 'p4', name: 'The Total Duck', emoji: '🦆', tagline: 'Full Interior + Exterior', color: 'from-emerald-600 to-teal-700' },
];

// ─── Static service data ──────────────────────────────────────────────────────
const INTERIOR_SERVICES = [
  {
    slug: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    subtitle: 'Steam & Dry Clean',
    description:
      'Professional steam carpet cleaning that removes deep stains, allergens, pet odours and bacteria — leaving carpets fresh, sanitised, and looking brand new.',
    icon: '🧹',
    image: '/images/BondEnd of lease/IMG_3016.jpg',
    features: ['Hot water extraction', 'Stain pre-treatment', 'Pet odour removal', 'Dry in 2–4 hours'],
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    slug: 'upholstery-cleaning',
    title: 'Upholstery Cleaning',
    subtitle: 'Sofas & Fabrics',
    description:
      'Restore your sofas, lounges, chairs and fabric surfaces with our safe deep-clean upholstery service. Safe for all fabric types including microfibre and velvet.',
    icon: '🛋️',
    image: '/images/BondEnd of lease/IMG_3259.jpg',
    features: ['All fabric types', 'Stain & odour removal', 'Safe for kids & pets', 'Fast drying'],
    color: 'from-orange-400 to-amber-500',
    bg: 'bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
  },
];

const EXTERIOR_SERVICES = [
  {
    slug: 'roof-cleaning',
    title: 'Roof Washing',
    subtitle: 'Soft & Pressure Wash',
    description:
      'Professional roof cleaning to remove lichen, moss and algae — extending the life of your roof and dramatically improving your home\'s curb appeal.',
    icon: '🏗️',
    image: '/images/Exterior Roof/IMG_2787.PNG',
    features: ['Lichen & moss removal', 'Soft wash technique', 'All roof types', 'Extends roof life'],
    color: 'from-slate-500 to-blue-500',
    bg: 'bg-slate-50',
    badge: 'bg-slate-100 text-slate-700',
  },
  {
    slug: 'exterior-house-washing',
    title: 'House Washing',
    subtitle: 'Full Exterior Wash',
    description:
      'Complete exterior house wash that removes mould, mildew, dirt, and stains from walls, eaves, fences and pathways — restoring your home\'s original look.',
    icon: '🏡',
    image: '/images/Presale/IMG_3456.jpg',
    features: ['Soft & pressure wash', 'Mould & mildew removal', 'Eaves & gutters', 'All surface types'],
    color: 'from-blue-500 to-teal-500',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'solar-panel-cleaning',
    title: 'Solar Cleaning',
    subtitle: 'Maximise Output',
    description:
      'Restore your solar panel efficiency with our specialist cleaning — removing dust, bird droppings and grime that reduce power output by up to 30%.',
    icon: '☀️',
    image: '/images/Exterior Solar/f8492476-0f73-4554-ba5e-85c13e51d454.PNG',
    features: ['Purified water system', 'No harsh chemicals', 'All panel types', 'Output optimised'],
    color: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    slug: 'pressure-cleaning',
    title: 'Driveway Pressure Washing',
    subtitle: 'Driveways & Paths',
    description:
      'High-pressure wash for driveways, patios, decks, fences and concrete — blasting away years of grime, oil stains, algae and discolouration.',
    icon: '💦',
    image: '/images/Exterior Drivwway/e8b10b98-b80c-4dd0-97eb-bd8eecdd9822.PNG',
    features: ['Driveways & patios', 'Decks & fences', 'Oil & grease removal', 'Concrete & pavers'],
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    badge: 'bg-cyan-100 text-cyan-700',
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    subtitle: 'Flush & Clear',
    description:
      'Keep your gutters flowing freely. We clear leaves, debris and blockages to protect your home from water damage, leaks and overflow.',
    icon: '🌿',
    image: '/images/Exterior Gutter/86d3155f-8706-4fcb-8914-cf9da4eef2eb.PNG',
    features: ['Leaf & debris removal', 'Downpipe flush', 'Damage inspection', 'Before & after photos'],
    color: 'from-green-500 to-teal-500',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({ service, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.07 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group"
    >
      <Link
        to={`/services/${service.slug}`}
        className="flex flex-col h-full rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 bg-white border border-neutral-100"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-70 group-hover:opacity-60 transition-opacity`} />
          <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-2xl">
            {service.icon}
          </div>
          <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20">
            {service.subtitle}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-orange-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
            {service.description}
          </p>

          {/* Features */}
          <ul className="grid grid-cols-2 gap-1.5 mb-5">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-xs text-neutral-600">
                <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-4 transition-all mt-auto">
            View Service
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ─── Category Section ─────────────────────────────────────────────────────────
const CategorySection = ({ icon, title, subtitle, accentClass, services }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <div className="mb-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl text-3xl shadow-lg ${accentClass}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">{title}</h2>
          <p className="text-neutral-500 text-sm mt-0.5">{subtitle}</p>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-neutral-200 to-transparent ml-4 hidden sm:block" />
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} service={s} index={i} />
        ))}
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const ServicesPage = () => {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <>
      <SEOHead
        title="All Cleaning Services Brisbane & South East QLD"
        description="Explore all professional cleaning services by Cleaning Duck Australia — bond, carpet, upholstery, roof, pressure, gutter, solar & more."
        keywords={['cleaning services Brisbane', 'professional cleaning Brisbane', 'bond cleaning', 'carpet cleaning', 'roof cleaning Brisbane']}
        canonical="/services"
        structuredData={[breadcrumb]}
      />

      {/* Page Hero */}
      <div className="page-hero">
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mb-4">
            <img src={BRAND.logoUrl} alt="Cleaning Duck" className="w-16 h-16 rounded-full ring-4 ring-orange-400/60" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            Our Cleaning Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/70 text-lg max-w-xl mx-auto">
            Comprehensive interior &amp; exterior cleaning solutions across South East Queensland.
          </motion.p>
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Services</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Services content */}
      <section className="section bg-neutral-50">
        <div className="container-custom">

          {/* Interior */}
          <CategorySection
            icon="🏠"
            title="Interior Cleaning"
            subtitle="Deep clean every surface inside your home"
            accentClass="bg-orange-100"
            services={INTERIOR_SERVICES}
          />

          {/* Exterior */}
          <CategorySection
            icon="🏡"
            title="Exterior Cleaning"
            subtitle="Restore your home's curb appeal from the outside"
            accentClass="bg-blue-100"
            services={EXTERIOR_SERVICES}
          />

          {/* Specialised Services */}
          <CategorySection
            icon="✨"
            title="Specialised Cleaning"
            subtitle="End of lease, post construction & pre-sale cleaning"
            accentClass="bg-emerald-100"
            services={SPECIALISED_SERVICES}
          />

          {/* Packages Banner */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl text-3xl shadow-lg bg-orange-100">
                📦
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">Packages — Bundle & Save</h2>
                <p className="text-neutral-500 text-sm mt-0.5">Combine services for better value across your whole property</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-neutral-200 to-transparent ml-4 hidden sm:block" />
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PACKAGE_CARDS.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                      ⭐ Most Popular
                    </div>
                  )}
                  <Link
                    to={`/packages#${pkg.id}`}
                    className="block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`h-32 bg-gradient-to-br ${pkg.color} flex flex-col items-center justify-center text-white text-center p-4`}>
                      <span className="text-4xl mb-1">{pkg.emoji}</span>
                      <span className="font-black text-lg leading-tight">{pkg.name}</span>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-neutral-500 text-sm mb-3">{pkg.tagline}</p>
                      <span className="flex items-center gap-1.5 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all">
                        View Package
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/packages" className="btn-secondary btn-lg inline-flex">
                See All Packages & Pricing
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-4">
            <Link to="/request-quote" className="btn-primary btn-lg inline-flex">
              Get a Free Quote for Any Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
