import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/common/SEOHead';
import { BRAND } from '../../utils/constants';
import { publicAsset } from '../../utils/pathHelpers';

const FullDuckPage = () => {
  return (
    <>
      <SEOHead
        title="Full Duck Package | Cleaning Duck Australia"
        description="One visit, complete exterior transformation. From your roof to your driveway, solar panels to gutters, we restore your home to its pristine condition."
        canonical="/packages/full-duck"
      />

      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={publicAsset('/images/BondEnd of lease/IMG_3398.jpg')}
            alt="Full Duck Cleaning"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-400/40 text-red-300 text-sm font-medium">
              🏠 Complete Exterior Clean
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6">
            The Full Duck Package
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            One Visit, Complete Exterior Transformation
          </motion.p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Your home deserves a refresh inside and out.</h2>
              <div className="prose prose-lg text-slate-600 mb-8">
                <p>
                  Over time, dirt, mould, algae, grime, and clogged gutters can make your home look worn and tired. Cleaning Duck, trusted for years with carpet and couch cleaning, now brings premium exterior cleaning services to your property.
                </p>
                <p>
                  The Full Duck package is our most comprehensive exterior cleaning solution, designed for homeowners who want everything done in a single visit — saving time, effort, and money. From your roof to your driveway, solar panels to gutters, we restore your home to its pristine, like-new condition.
                </p>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-3xl p-8 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">What’s Included in the Full Duck Package:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Roof soft wash + manual scrubbing:</strong> Removes lichen, algae, and deep stains.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Biodegradable mould & algae treatment:</strong> Paint-safe solutions to prevent regrowth.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Front pathways rotary clean:</strong> High pressure washing for front paths using rotary surface cleaners.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Solar Panel & Gutter Cleaning:</strong> Maintain efficiency and prevent blockages.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Quality Inspection:</strong> A final walk-through to ensure all surfaces are streak-free and the property is restored.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Benefits of the Full Duck Package</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center gap-3"><span className="text-2xl">✨</span> Restore curb appeal and make your home look like new</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">🛡️</span> Protect roof, walls, and driveways from mould, algae, and grime</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">⚡</span> Increase solar panel efficiency and protect gutters from blockages</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">💰</span> Save money compared to booking services individually</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">🦆</span> Hassle-free, one-visit complete exterior cleaning</li>
                </ul>
              </div>

              <div className="bg-slate-900 text-white rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready for a total transformation?</h3>
                <p className="text-white/80 mb-8">Get a fast and free quote for the Full Duck Package today.</p>
                <Link to="/request-quote" className="btn-primary w-full block text-center py-4 rounded-xl text-lg font-bold">
                  Get a Free Quote
                </Link>
                <p className="mt-4 text-sm text-white/60">Or call us directly: <a href={BRAND.phoneHref.primary} className="text-orange-400 hover:text-orange-300">{BRAND.phone.primary}</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FullDuckPage;
