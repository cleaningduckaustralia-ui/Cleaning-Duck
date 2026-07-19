import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { publicAsset } from '../../utils/pathHelpers';

const INTERIOR_SERVICES = [
  {
    slug: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    subtitle: 'Steam & Dry Clean',
    shortDescription:
      'Professional steam carpet cleaning that removes deep stains, allergens, and odours — leaving carpets fresh and like new.',
    icon: '🧹',
    image: publicAsset('/images/Carpet cleaning/PHOTO-2026-02-09-16-12-53.jpg'),
    color: 'from-amber-500 to-orange-500',
  },
  {
    slug: 'upholstery-cleaning',
    title: 'Upholstery Cleaning',
    subtitle: 'Sofas & Fabrics',
    shortDescription:
      'Restore your sofas, lounges, chairs and fabric surfaces with our safe, deep-clean upholstery service.',
    icon: '🛋️',
    image: publicAsset('/images/Upholstery/PHOTO-2026-02-09-16-11-51.jpg'),
    color: 'from-orange-400 to-amber-500',
  },
];

const EXTERIOR_SERVICES = [
  {
    slug: 'exterior-house-washing',
    title: 'Exterior House Washing',
    subtitle: 'Full House Wash',
    shortDescription:
      'Complete exterior house wash that removes mould, mildew, dirt, and stains from walls, eaves, and pathways.',
    icon: '🏡',
    image: publicAsset('/images/exterior-house.jpg'),
    color: 'from-blue-500 to-teal-500',
  },
  {
    slug: 'roof-cleaning',
    title: 'Roof Cleaning',
    subtitle: 'Soft & Pressure Wash',
    shortDescription:
      'Professional roof cleaning to remove lichen, moss and algae — extending the life of your roof and improving curb appeal.',
    icon: '🏗️',
    image: publicAsset('/images/Exterior Roof/IMG_2788.PNG'),
    color: 'from-slate-500 to-blue-500',
  },
  {
    slug: 'pressure-cleaning',
    title: 'Pressure Cleaning',
    subtitle: 'Driveways & Paths',
    shortDescription:
      'High-pressure wash for driveways, patios, decks, fences, and concrete — blasting away years of grime and grease.',
    icon: '💦',
    image: publicAsset('/images/Exterior Drivwway/80fff1e8-5098-4dde-ad47-45b979652525.JPG'),
    color: 'from-cyan-500 to-blue-500',
  },
  {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    subtitle: 'Flush & Clear',
    shortDescription:
      'Keep your gutters flowing freely. We clear leaves, debris and blockages to protect your home from water damage.',
    icon: '🌿',
    image: publicAsset('/images/Exterior Gutter/29768303-e678-4624-aba9-ed2acb7d2dd7.JPG'),
    color: 'from-green-500 to-teal-500',
  },
  {
    slug: 'solar-panel-cleaning',
    title: 'Solar Panel Cleaning',
    subtitle: 'Maximise Output',
    shortDescription:
      'Restore your solar panel efficiency with our specialist cleaning service — removing dust, bird droppings, and grime.',
    icon: '☀️',
    image: publicAsset('/images/Exterior Solar/f8492476-0ba0-4e1d-8d3e-55a102139a7b.JPG'),
    color: 'from-yellow-400 to-orange-400',
  },
];

// ─── Card Component ───────────────────────────────────────────────────────────
const ServiceCard = ({ service, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

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
        className="flex flex-col h-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 border border-neutral-100 bg-white"
        aria-label={`Learn about ${service.title}`}
      >
        {/* Image with overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.parentElement.classList.add('image-fallback');
              e.target.style.display = 'none';
            }}
          />
          {/* Clean photos - gradient overlay removed */}
          {/* Icon */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl border border-white/30">
            {service.icon}
          </div>
          {/* Subtitle badge */}
          <div className="absolute top-4 right-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20">
              {service.subtitle}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-bold text-neutral-800 mb-2 group-hover:text-orange-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed flex-1 mb-4">
            {service.shortDescription}
          </p>
          <div className="flex items-center gap-1.5 text-orange-500 text-sm font-semibold group-hover:gap-3 transition-all">
            Learn More
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CategoryHeader = ({ icon, title, subtitle, accent }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-5 mb-8 bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-neutral-100"
    >
      <div className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl text-3xl shadow-md flex-shrink-0 ${accent}`}>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-800 tracking-tight">{title}</h2>
        <p className="text-neutral-500 text-sm mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
};

// ─── Main ServicesGrid ────────────────────────────────────────────────────────
const ServicesGrid = () => (
  <section className="py-24 bg-background relative overflow-hidden" id="services">
    {/* Background blobs for visual interest */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-orange-50/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

    <div className="container-custom relative z-10">
      {/* Section heading */}
      <div className="text-center mb-14">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title mt-2">Comprehensive Cleaning Services</h2>
        <p className="section-subtitle mx-auto mt-4">
          From carpet steam cleaning to roof washing — we cover every inch of your property
          with professional-grade equipment and expertise.
        </p>
      </div>

      {/* ── Interior Cleaning ── */}
      <div className="mb-16">
        <CategoryHeader
          icon="🏠"
          title="Interior Cleaning"
          subtitle="Deep clean every surface inside your home"
          accent="bg-orange-100"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTERIOR_SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* ── Exterior Cleaning ── */}
      <div className="mb-12">
        <CategoryHeader
          icon="🏡"
          title="Exterior Cleaning"
          subtitle="Restore your home's curb appeal from the outside"
          accent="bg-blue-100"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXTERIOR_SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link to="/services" className="btn-secondary btn-lg inline-flex">
          View All Services
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesGrid;
