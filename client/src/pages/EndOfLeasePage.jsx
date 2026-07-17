import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../components/common/SEOHead';
import { BRAND } from '../utils/constants';
import galleryImages from '../data/galleryImages.json';

const features = [
  { icon: '🏠', title: 'All Rooms & Bathrooms', desc: 'Every room cleaned to real estate standard — bathrooms, kitchens, bedrooms, and living areas.' },
  { icon: '🍳', title: 'Oven & Appliances', desc: 'Deep-clean inside the oven, rangehood, dishwasher and all kitchen appliances.' },
  { icon: '🪟', title: 'Windows & Tracks', desc: 'Interior windows, frames, sills, and tracks thoroughly cleaned.' },
  { icon: '🧹', title: 'Skirting Boards & Walls', desc: 'Skirting boards, light switches, door frames, and spot-cleaned walls.' },
  { icon: '🛁', title: 'Tiles, Grout & Fixtures', desc: 'Bathroom tiles scrubbed, grout treated, toilets, sinks and showers sanitised.' },
  { icon: '✅', title: 'Bond-Back Guarantee', desc: "If your agent isn't satisfied, we'll return and re-clean at no extra charge." },
];

const process = [
  { step: '01', title: 'Book Online or Call', desc: 'Tell us your property size, date, and requirements. We provide a transparent upfront quote.' },
  { step: '02', title: 'Our Team Arrives', desc: 'Fully equipped, uniformed technicians arrive on time with all professional-grade equipment.' },
  { step: '03', title: 'Thorough Clean', desc: 'We work room by room to a strict end-of-lease checklist — no corner left untouched.' },
  { step: '04', title: 'Inspection Ready', desc: 'We do a final walkthrough, provide before & after photos, and leave the property inspection-ready.' },
];

const EndOfLeasePage = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <SEOHead
        title="End of Lease / Bond Cleaning Brisbane | Cleaning Duck Australia"
        description="Professional end-of-lease bond cleaning in Brisbane & All over QLD. 100% bond-back guarantee. Fully insured, real estate standard cleaning. Call 0412 664 540."
        keywords={['bond cleaning Brisbane', 'end of lease cleaning Brisbane', 'bond back cleaning Brisbane', 'exit cleaning Brisbane']}
        canonical="/services/end-of-lease-cleaning"
      />

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80"
            alt="End of lease cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mb-4">
            <img src={BRAND.logoUrl} alt="Cleaning Duck" className="w-16 h-16 rounded-full ring-4 ring-orange-400/60" />
          </motion.div>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-5 py-2 mb-5 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 text-orange-300 text-sm font-medium">
            ✅ Bond-Back Guaranteed
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-4">
            End of Lease / Bond Cleaning
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            Get your full bond back with our comprehensive end-of-lease cleaning service. We clean to real estate inspection standards — guaranteed.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-quote" className="btn-primary btn-lg">Get a Free Quote</Link>
            <a href={BRAND.phoneHref.primary} className="btn-outline btn-lg">📞 {BRAND.phone.primary}</a>
          </motion.div>
          <nav aria-label="Breadcrumb" className="mt-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li className="text-white/30">/</li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">End of Lease Cleaning</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">What We Cover</span>
            <h2 className="section-title mt-2">Complete Bond Cleaning Checklist</h2>
            <p className="section-subtitle mx-auto mt-4">
              Every item on your property manager's checklist — covered, cleaned, and ready for inspection.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-orange-50 border border-orange-100 hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-bold text-neutral-800 mb-2">{f.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">How It Works</span>
            <h2 className="section-title mt-2">Simple, Stress-Free Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {p.step}
                </div>
                <h3 className="font-bold text-neutral-800 mb-2">{p.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-800">Our Recent Work</h2>
            <p className="text-neutral-500 mt-3">See the results we deliver for our bond cleaning clients.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages
              .filter((img) => img.category === 'BondEnd of lease')
              .slice(0, 8)
              .map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-xl shadow-sm group">
                  <img 
                    src={img.src} 
                    alt={`End of lease cleaning example ${idx + 1}`} 
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
          <div className="text-center mt-8">
            <Link to="/gallery" className="btn-outline">View All Photos</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section bg-gradient-to-br from-orange-600 to-orange-800 text-white">
        <div className="container-custom text-center" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-4xl mb-4 block">🦆</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Your Bond Back?</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Book today and let Cleaning Duck Australia take care of the stress. Our bond-back guarantee means you can move out with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-quote" className="bg-white text-orange-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-orange-50 transition-colors">
                Book Your Bond Clean
              </Link>
              <a href={BRAND.phoneHref.primary} className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-white/10 transition-colors">
                📞 Call {BRAND.phone.primary}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default EndOfLeasePage;
