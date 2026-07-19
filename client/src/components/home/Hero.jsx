import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND } from '../../utils/constants';
import { publicAsset } from '../../utils/pathHelpers';

const heroSlides = [
  {
    url: publicAsset('/images/exterior-house.jpg'),
    alt: 'Professional exterior house washing',
    link: '/services/exterior-house-washing',
  },
  {
    url: publicAsset('/images/BondEnd of lease/IMG_3067.jpg'),
    alt: 'Detailed end of lease cleaning',
    link: '/services/end-of-lease-cleaning',
  },
  {
    url: publicAsset('/images/Exterior Roof/IMG_2788.PNG'),
    alt: 'Pressure washing roof and solar panels',
    link: '/services/roof-cleaning',
  },
  {
    url: publicAsset('/images/Carpet cleaning/PHOTO-2026-02-09-16-12-53.jpg'),
    alt: 'Professional carpet steam cleaning',
    link: '/services/carpet-cleaning',
  },
  {
    url: publicAsset('/images/Exterior Drivwway/e8b10b9b-721e-4c77-b6ae-57bd5c2d8f42.JPG'),
    alt: 'Driveway pressure cleaning',
    link: '/services/pressure-cleaning',
  },
];

const trustBadges = [
  { icon: '⭐', text: '5-Star Google Rated' },
  { icon: '🛡️', text: 'Fully Insured' },
  { icon: '✅', text: '700+ Jobs Done' },
  { icon: '🦆', text: 'Trusted Since 2024' },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
      id="hero"
    >
      {/* Sliding background images with Ken Burns left-to-right */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08, x: '-3%' }}
            animate={{ opacity: 1, scale: 1.0, x: '0%' }}
            exit={{ opacity: 0, scale: 1.0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <img
              src={heroSlides[current].url}
              alt={heroSlides[current].alt}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              onError={(e) => { e.target.src = 'https://cleaningduckaustralia.com.au/wp-content/uploads/2026/02/Cleaning_Duck-01.jpg'; }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        {/* Orange brand accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-transparent to-black/60" />
        
        {/* Clickable overlay link */}
        <Link 
          to={heroSlides[current].link} 
          className="absolute inset-0 z-10" 
          aria-label={`View ${heroSlides[current].alt}`} 
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full ${
              i === current
                ? 'w-8 h-2 bg-orange-400'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10 text-center py-32">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <img
            src={BRAND.logoUrl}
            alt="Cleaning Duck Australia Logo"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-orange-400/60 shadow-2xl"
            loading="eager"
          />
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-5"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 text-orange-300 text-sm font-medium tracking-wide">
            🦆 Brisbane's Trusted Cleaning Experts
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-5xl mx-auto"
          data-speakable="true"
        >
          Professional{' '}
          <span className="text-orange-400">
            Cleaning Services
          </span>{' '}
          In Brisbane &amp; All over QLD
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          data-speakable="true"
        >
          Discover the difference our expert cleaning services can make. Commercial-grade
          equipment, proven results — no stain, dirt, or grime is too tough for us.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 flex-wrap"
        >
          <Link to="/request-quote" className="btn-primary btn-lg group w-full sm:w-auto">
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            Get Free Quote
          </Link>
          <a href={BRAND.phoneHref.primary} className="btn-outline btn-lg group w-full sm:w-auto">
            <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Call {BRAND.phone.primary}
          </a>
          <a href={BRAND.phoneHref.secondary} className="btn-outline btn-lg group w-full sm:w-auto">
            <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Call {BRAND.phone.secondary}
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {trustBadges.map(({ icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm font-medium"
            >
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
