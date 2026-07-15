import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ─── Reliable Unsplash gallery images ─────────────────────────────────────────
const galleryImages = [
  {
    src: '/images/BondEnd of lease/IMG_3016.jpg',
    alt: 'Professional carpet steam cleaning result',
    label: 'Carpet Cleaning',
  },
  {
    src: '/images/Exterior Roof/IMG_2788.PNG',
    alt: 'Roof tile cleaning Brisbane home',
    label: 'Roof Washing',
  },
  {
    src: '/images/Exterior Drivwway/80fff1eb-6638-4e08-ba90-af25c6dc8b09.PNG',
    alt: 'Pressure washing driveway concrete',
    label: 'Driveway Pressure Washing',
  },
  {
    src: '/images/BondEnd of lease/IMG_3259.jpg',
    alt: 'Sofa upholstery steam cleaning',
    label: 'Upholstery Cleaning',
  },
  {
    src: '/images/Exterior Solar/3741b6fc-ddf2-49ce-a193-f111beaf82ad.PNG',
    alt: 'Solar panel cleaning service Brisbane',
    label: 'Solar Panel Cleaning',
  },
  {
    src: '/images/BondEnd of lease/IMG_3067.jpg',
    alt: 'Bond cleaning spotless kitchen',
    label: 'End of Lease Cleaning',
  },
  {
    src: '/images/Presale/IMG_3457.jpg',
    alt: 'Exterior house washing Brisbane',
    label: 'House Washing',
  },
  {
    src: '/images/Exterior Gutter/29768303-1250-48ee-a0f5-50280eb4c207.PNG',
    alt: 'Gutter cleaning clearing debris',
    label: 'Gutter Cleaning',
  },
  {
    src: '/images/Presale/IMG_3623.jpg',
    alt: 'Pre-sale cleaning spotless home',
    label: 'Pre Sale Cleaning',
  },
  {
    src: '/images/Post con/IMG_3240.jpg',
    alt: 'Post construction cleaning new build',
    label: 'Post Construction Cleaning',
  },
];

// Double list for seamless infinite scroll
const row1 = [...galleryImages, ...galleryImages];
const row2 = [...galleryImages.slice(4), ...galleryImages, ...galleryImages.slice(0, 4)];

const GalleryCard = ({ image }) => (
  <div
    className="gallery-card group flex-shrink-0 relative overflow-hidden rounded-2xl cursor-zoom-in"
    style={{ width: 280, height: 200 }}
  >
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      loading="lazy"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <span className="text-white text-sm font-semibold">{image.label}</span>
    </div>
  </div>
);

const MarqueeRow = ({ images, reverse = false, speed = 40 }) => {
  const duration = `${images.length * speed}s`;
  return (
    <div className="marquee-outer overflow-hidden relative">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, white, transparent)' }}
      />
      <div
        className={`marquee-track flex gap-4 ${reverse ? 'marquee-reverse' : 'marquee-forward'}`}
        style={{ '--duration': duration }}
      >
        {images.map((img, i) => (
          <GalleryCard key={i} image={img} />
        ))}
      </div>
    </div>
  );
};

const GalleryMarquee = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="section bg-white overflow-hidden"
      aria-label="Our work gallery"
      id="gallery"
      ref={ref}
    >
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-title mt-2">Real Results, Real Homes</h2>
          <p className="section-subtitle mx-auto mt-4">
            A glimpse of the transformations we deliver across Brisbane and South East Queensland.
          </p>
        </motion.div>
      </div>

      {/* Two marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        <MarqueeRow images={row1} reverse={false} speed={35} />
        <MarqueeRow images={row2} reverse={true} speed={45} />
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="container-custom mt-10 text-center"
      >
        <a
          href="https://cleaningduckaustralia.com.au/gallery/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-primary inline-flex"
        >
          View Full Gallery ↗
        </a>
      </motion.div>
    </section>
  );
};

export default GalleryMarquee;
