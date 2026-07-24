import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRAND } from '../../utils/constants';

const CTABanner = () => (
  <section className="section-sm bg-accent relative overflow-hidden" aria-label="Call to action">
    <div className="absolute inset-0 pattern-dots opacity-10" />
    <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10" />
    <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-white/10" />

    <div className="container-custom relative text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready for a Sparkling Clean?
        </h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
          Get your free, no-obligation quote today. We respond within 2 business hours.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/request-quote" className="btn bg-white text-accent hover:bg-neutral-100 shadow-lg font-bold btn-lg w-full sm:w-auto">
            Get Free Quote
          </Link>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href={BRAND.phoneHref.primary} className="btn border-2 border-white text-white hover:bg-white hover:text-accent btn-lg w-full sm:w-auto">
              Call {BRAND.phone.primary}
            </a>
            <a href={BRAND.phoneHref.secondary} className="btn border-2 border-white text-white hover:bg-white hover:text-accent btn-lg w-full sm:w-auto">
              Call {BRAND.phone.secondary}
            </a>
          </div>
        </div>
        <p className="text-white/60 text-sm mt-5">
          ABN {BRAND.abn} · Brisbane, Logan, Ipswich, Gold Coast, Sunshine Coast
        </p>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
