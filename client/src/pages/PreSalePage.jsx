import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../components/common/SEOHead';
import { BRAND } from '../utils/constants';
import galleryImages from '../data/galleryImages.json';
import { publicAsset } from '../utils/pathHelpers';

const features = [
  { icon: '✨', title: 'Deep Interior Clean', desc: 'Every room deep-cleaned to presentation standard — kitchens, bathrooms, living areas and bedrooms.' },
  { icon: '🪟', title: 'Windows & Glass', desc: 'All interior and exterior windows, sliding doors and mirrors cleaned streak-free.' },
  { icon: '🧹', title: 'Carpet Steam Clean', desc: 'Fresh, clean carpets make the biggest first impression — we use professional hot water extraction.' },
  { icon: '🏡', title: 'Exterior Wash', desc: 'First impressions start at the kerb. We wash walls, paths, and driveways to boost street appeal.' },
  { icon: '🌿', title: 'Gutter & Roof Clean', desc: 'A clean roof and clear gutters signal a well-maintained home to potential buyers.' },
  { icon: '📸', title: 'Photo-Ready Finish', desc: 'We prep the property for professional photography — the cleaner the home, the better the sale price.' },
];

const benefits = [
  { stat: '3–5%', label: 'Higher sale price achieved on professionally prepared homes' },
  { stat: '40%', label: 'Faster time on market for clean, presentation-ready properties' },
  { stat: '100%', label: 'Satisfaction guaranteed — or we return and re-clean for free' },
];

const PreSalePage = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <SEOHead
        title="Pre Sale Cleaning Brisbane | Sell Faster & For More | Cleaning Duck Australia"
        description="Professional pre-sale cleaning in Brisbane & All over QLD. Presentation-ready cleaning that helps sell your home faster and for a higher price. Call 0412 664 540."
        keywords={['pre sale cleaning Brisbane', 'house cleaning before sale Brisbane', 'property presentation cleaning Brisbane', 'real estate cleaning Brisbane']}
        canonical="/services/pre-sale-cleaning"
      />

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={publicAsset('/images/Presale/IMG_3623.jpg')}
            alt="Pre-sale property cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mb-4">
            <img src={BRAND.logoUrl} alt="Cleaning Duck" className="w-16 h-16 rounded-full ring-4 ring-orange-400/60" />
          </motion.div>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-5 py-2 mb-5 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/40 text-emerald-300 text-sm font-medium">
            🏡 Sell Faster. Sell For More.
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-4">
            Pre Sale Cleaning
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            Make your property irresistible to buyers. Our pre-sale cleaning service maximises your home's presentation — helping you sell faster and achieve a higher price.
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
              <li className="text-white/80">Pre Sale Cleaning</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Stats */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
            {benefits.map((b, i) => (
              <motion.div
                key={b.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-5xl font-black mb-2">{b.stat}</div>
                <p className="text-white/80 text-sm max-w-xs mx-auto">{b.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">What's Included</span>
            <h2 className="section-title mt-2">A Presentation-Ready Home, Inside & Out</h2>
            <p className="section-subtitle mx-auto mt-4">
              We tailor our pre-sale clean to your property and timeline — working around open homes, photography shoots, and settlement dates.
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
                className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-bold text-neutral-800 mb-2">{f.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split image section */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img
                src={publicAsset('/images/Presale/IMG_3341.jpg')}
                alt="Sparkling clean home ready for sale"
                className="rounded-3xl shadow-2xl w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="section-label">Why It Matters</span>
              <h2 className="section-title mt-2">First Impressions Sell Homes</h2>
              <p className="text-neutral-600 leading-relaxed mt-4 mb-6">
                Research consistently shows that a clean, well-presented home attracts more buyers, generates more competitive offers, and achieves a higher final sale price. Our pre-sale cleaning service is one of the best investments you can make before listing.
              </p>
              <ul className="space-y-3">
                {[
                  'We work around your real estate timeline',
                  'Available for photography prep (same-day)',
                  'Interior and exterior packages available',
                  'Carpet cleaning, upholstery & window cleaning included',
                  'Fully insured — no risk to your property',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-700">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-800">Our Pre-Sale Preparation Work</h2>
            <p className="text-neutral-500 mt-3">See the difference a professional pre-sale clean makes.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages
              .filter((img) => img.category === 'Presale')
              .map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-xl shadow-sm group">
                  <img 
                    src={img.src} 
                    alt={`Pre-sale cleaning example ${idx + 1}`} 
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

      {/* CTA */}
      <section className="section bg-gradient-to-br from-emerald-700 to-teal-900 text-white">
        <div className="container-custom text-center" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-4xl mb-4 block">🏡</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Maximise Your Sale Price?</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Book your pre-sale clean today. We can often accommodate last-minute bookings before open homes and photography sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-quote" className="bg-white text-emerald-800 font-bold px-8 py-3.5 rounded-2xl hover:bg-emerald-50 transition-colors">
                Book Pre Sale Clean
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

export default PreSalePage;
