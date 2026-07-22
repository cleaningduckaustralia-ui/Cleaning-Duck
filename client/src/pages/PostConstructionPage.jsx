import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SEOHead from '../components/common/SEOHead';
import { BRAND } from '../utils/constants';
import galleryImages from '../data/galleryImages.json';
import { publicAsset } from '../utils/pathHelpers';

const features = [
  { icon: '🏗️', title: 'Dust & Debris Removal', desc: 'We remove all post-construction dust, plaster, sawdust and fine particles from every surface.' },
  { icon: '🪟', title: 'Window & Glass Cleaning', desc: 'Remove paint splatters, stickers, concrete dust and smears from all glass surfaces and frames.' },
  { icon: '🧱', title: 'Floor Cleaning & Polish', desc: 'Tiles, timber, concrete and vinyl floors cleaned, grout lines cleared of grout haze and residue.' },
  { icon: '🚿', title: 'Bathroom & Wet Areas', desc: 'Full sanitisation of new bathrooms including grout sealing residue, fixtures, and silicone areas.' },
  { icon: '🍳', title: 'Kitchen & Joinery', desc: 'Inside and outside of all new cabinetry, benchtops, splashbacks, and appliances cleaned.' },
  { icon: '🎨', title: 'Paint & Adhesive Removal', desc: 'Careful removal of paint overspray, adhesive labels, silicone smears, and construction tape.' },
];

const process = [
  { step: '01', title: 'Initial Inspection', desc: 'We assess the property and identify all areas requiring specialist post-construction treatment.' },
  { step: '02', title: 'Heavy Debris Clear', desc: 'We remove coarse dust, rubble and large debris before detailed surface cleaning begins.' },
  { step: '03', title: 'Detailed Surface Clean', desc: 'Every surface is wiped, scrubbed, and sanitised — room by room, from ceiling to floor.' },
  { step: '04', title: 'Final Polish & Handover', desc: 'A final inspection ensures the property is spotless and ready for handover or occupation.' },
];

const PostConstructionPage = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <SEOHead
        title="Post Construction Cleaning Brisbane | Cleaning Duck Australia"
        description="Professional post-construction cleaning in Brisbane & All over QLD. We remove dust, debris, paint and adhesives — leaving your new build or renovation spotless. Call 0412 664 540."
        keywords={['post construction cleaning Brisbane', 'builder clean Brisbane', 'after renovation cleaning Brisbane', 'new build cleaning Brisbane']}
        canonical="/services/post-construction-cleaning"
      />

      {/* Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={publicAsset('/images/Post construction/IMG_3252.jpg')}
            alt="Post construction cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mb-4">
            <img src={BRAND.logoUrl} alt="Cleaning Duck" className="w-16 h-16 rounded-full object-cover ring-4 ring-orange-400/60" />
          </motion.div>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-5 py-2 mb-5 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 text-orange-300 text-sm font-medium">
            🏗️ Builder Clean Specialists
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-4">
            Post Construction Cleaning
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            Transform your freshly built or renovated property from a construction site to a move-in ready home. Specialist builder clean services across Brisbane & All over QLD.
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
              <li className="text-white/80">Post Construction Cleaning</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">What We Handle</span>
            <h2 className="section-title mt-2">Specialist Builder Clean Services</h2>
            <p className="section-subtitle mx-auto mt-4">
              Post-construction cleaning requires specialist knowledge and equipment. Our team is trained to handle every type of construction residue safely and effectively.
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
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-bold text-neutral-800 mb-2">{f.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="section-label">Who We Work With</span>
              <h2 className="section-title mt-2">For Builders, Renovators & Homeowners</h2>
              <p className="text-neutral-600 leading-relaxed mt-4 mb-6">
                Whether you're a builder preparing a new home for handover, a homeowner finishing a renovation, or a developer completing a commercial project — our post-construction cleaning team delivers results you can be proud of.
              </p>
              <ul className="space-y-3">
                {['New home builds ready for handover', 'Kitchen & bathroom renovations', 'Extension & addition completions', 'Commercial fitouts & offices', 'Investment property renovations'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-700">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img
                src={publicAsset('/images/Post construction/IMG_3241.jpg')}
                alt="Post construction clean property"
                className="rounded-3xl shadow-2xl w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label">Our Process</span>
            <h2 className="section-title mt-2">From Construction Chaos to Spotless</h2>
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
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
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
            <h2 className="text-3xl font-bold text-neutral-800">Our Post-Construction Work</h2>
            <p className="text-neutral-500 mt-3">See the pristine finish we deliver after the builders leave.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages
              .filter((img) => img.category === 'Post construction')
              .map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-xl shadow-sm group">
                  <img 
                    src={img.src} 
                    alt={`Post construction cleaning example ${idx + 1}`} 
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
      <section className="section bg-gradient-to-br from-slate-700 to-blue-900 text-white">
        <div className="container-custom text-center" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-4xl mb-4 block">🏗️</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Build?</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Contact us today for a free, no-obligation quote. We work around builder timelines and can often accommodate same-week bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/request-quote" className="bg-white text-blue-900 font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-50 transition-colors">
                Book a Builder Clean
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

export default PostConstructionPage;
