import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../components/common/SEOHead';
import { BRAND } from '../utils/constants';

const PACKAGES = [
  {
    id: 'p1',
    name: 'The High Duck',
    tagline: 'Exterior & Roof Focus',
    emoji: '🏗️',
    color: 'from-slate-600 to-blue-700',
    accentColor: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-600',
    popular: false,
    includes: [
      'Roof Washing (Soft Wash)',
      'Exterior House Washing',
      'Gutter Cleaning & Flush',
      'Before & After Photos',
      'Free Inspection Report',
    ],
    description:
      'Perfect for homeowners focused on the exterior and roof of their property. Combine roof washing, house washing and gutter cleaning for a complete top-to-bottom exterior clean.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    id: 'p2',
    name: 'The Ground Duck',
    tagline: 'Driveways, Paths & Solar',
    emoji: '☀️',
    color: 'from-amber-500 to-orange-600',
    accentColor: 'bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-500',
    popular: false,
    includes: [
      'Driveway Pressure Washing',
      'Pathway & Patio Cleaning',
      'Solar Panel Cleaning',
      'Fence & Surround Wash',
      'Before & After Photos',
    ],
    description:
      'Revitalise the ground-level exterior of your property. From oil-stained driveways to grimy solar panels — this package puts the shine back in everything at ground level and above.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80',
  },
  {
    id: 'p3',
    name: 'The Full Duck',
    tagline: 'Complete Interior Clean',
    emoji: '🏠',
    color: 'from-orange-500 to-red-600',
    accentColor: 'bg-red-50 border-red-200',
    badgeColor: 'bg-orange-600',
    popular: true,
    includes: [
      'Carpet Steam Cleaning (all rooms)',
      'Upholstery Cleaning (sofa & chairs)',
      'Mattress Deep Clean & Sanitise',
      'Window Sill & Skirting Wipe Down',
      'Odour Neutralisation Treatment',
      'Before & After Photos',
    ],
    description:
      'Our most popular interior package — a thorough top-to-bottom clean of the inside of your home. Great for spring cleans, after moving in, or preparing a property for sale.',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
  },
  {
    id: 'p4',
    name: 'The Total Duck',
    tagline: 'Full Interior + Exterior Bundle',
    emoji: '🦆',
    color: 'from-emerald-600 to-teal-700',
    accentColor: 'bg-emerald-50 border-emerald-200',
    badgeColor: 'bg-emerald-600',
    popular: false,
    includes: [
      'Everything in The Full Duck',
      'Roof Washing (Soft Wash)',
      'Exterior House Washing',
      'Gutter Cleaning & Flush',
      'Driveway Pressure Washing',
      'Solar Panel Cleaning',
      'Before & After Photos',
      'Priority Scheduling',
    ],
    description:
      'The ultimate whole-property clean. Combine our best interior and exterior services into one bundled package and save. Perfect for pre-sale preparation, end-of-lease or annual deep cleans.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  },
];

const PackageCard = ({ pkg, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 });

  return (
    <motion.div
      ref={ref}
      id={pkg.id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative rounded-3xl border-2 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 bg-white ${pkg.accentColor} ${pkg.popular ? 'scale-105 z-10' : ''}`}
    >
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center text-xs font-bold py-2 tracking-widest uppercase z-10">
          ⭐ Most Popular
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-75`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-5xl mb-2">{pkg.emoji}</span>
          <h3 className="text-2xl font-black">{pkg.name}</h3>
          <p className="text-white/80 text-sm mt-1">{pkg.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${pkg.popular ? 'pt-6' : ''}`}>
        <p className="text-neutral-600 text-sm leading-relaxed mb-5">{pkg.description}</p>

        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">What's Included</h4>
        <ul className="space-y-2 mb-6">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <Link
          to="/request-quote"
          className="btn-primary w-full text-center block py-3 rounded-2xl"
        >
          Get a Quote for This Package
        </Link>
      </div>
    </motion.div>
  );
};

const PackagesPage = () => (
  <>
    <SEOHead
      title="Cleaning Packages Brisbane — The Duck Packages | Cleaning Duck Australia"
      description="Choose from our 4 signature cleaning packages: The High Duck, The Ground Duck, The Full Duck, and The Total Duck. Interior & exterior bundles for every Brisbane home."
      keywords={['cleaning packages Brisbane', 'cleaning bundle Brisbane', 'home cleaning package', 'carpet and roof cleaning bundle Brisbane']}
      canonical="/packages"
    />

    {/* Page Hero */}
    <div className="page-hero">
      <div className="container-custom relative z-10 text-center text-white">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mb-4">
          <img src={BRAND.logoUrl} alt="Cleaning Duck" className="w-16 h-16 rounded-full ring-4 ring-orange-400/60" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 text-orange-300 text-sm font-medium">
            🦆 Bundle & Save
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-4">
          The Duck Packages
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/70 text-lg max-w-2xl mx-auto">
          Bundle our most popular services and save. Designed for every type of Brisbane home — inside, outside, or both.
        </motion.p>
        <nav aria-label="Breadcrumb" className="mt-4">
          <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li className="text-white/30">/</li>
            <li className="text-white/80">Packages</li>
          </ol>
        </nav>
      </div>
    </div>

    {/* Package anchor nav */}
    <div className="bg-white border-b border-neutral-100 sticky top-16 z-30 shadow-sm">
      <div className="container-custom overflow-x-auto">
        <div className="flex gap-1 py-3 min-w-max mx-auto justify-center">
          {PACKAGES.map((pkg) => (
            <a
              key={pkg.id}
              href={`#${pkg.id}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-neutral-600 hover:bg-orange-50 hover:text-orange-600 transition-all whitespace-nowrap"
            >
              <span>{pkg.emoji}</span>
              {pkg.name}
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Packages Grid */}
    <section className="section bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="section-label">Our Packages</span>
          <h2 className="section-title mt-2">Choose Your Duck</h2>
          <p className="section-subtitle mx-auto mt-4">
            All packages include professional-grade equipment, fully insured technicians, and satisfaction guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Custom package CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl bg-gradient-to-br from-orange-600 to-orange-800 p-10 text-center text-white"
        >
          <span className="text-4xl mb-4 block">🦆</span>
          <h2 className="text-3xl font-bold mb-3">Need a Custom Package?</h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Don't see exactly what you need? We can build a custom cleaning package tailored to your property and budget. Contact us for a personalised quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/request-quote" className="bg-white text-orange-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-50 transition-colors inline-flex items-center gap-2">
              Get a Custom Quote
            </Link>
            <a href={BRAND.phoneHref.primary} className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-white/10 transition-colors inline-flex items-center gap-2">
              📞 {BRAND.phone.primary}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

export default PackagesPage;
