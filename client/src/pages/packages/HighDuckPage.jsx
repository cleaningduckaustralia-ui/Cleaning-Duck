import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/common/SEOHead';
import { BRAND } from '../../utils/constants';
import { publicAsset } from '../../utils/pathHelpers';

const HighDuckPage = () => {
  return (
    <>
      <SEOHead
        title="High Duck Package | Cleaning Duck Australia"
        description="Refresh your roof, solar panels, and gutters in one visit with our High Duck Package. Professional exterior cleaning in Brisbane and All over QLD."
        canonical="/packages/high-duck"
      />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={publicAsset('/images/Exterior Roof/IMG_2789.PNG')}
            alt="High Duck Cleaning"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/40 text-blue-300 text-sm font-medium">
              🏗️ Exterior & Roof Focus
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6">
            The High Duck Package
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Refresh Your Roof, Solar Panels & Gutters in One Visit
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Your home’s exterior deserves the same attention as your interiors.</h2>
              <div className="prose prose-lg text-slate-600 mb-8">
                <p>
                  While Cleaning Duck has long been trusted for carpets and couches, we’ve expanded our expertise to complete exterior home cleaning. Our High Duck package is designed for homeowners who want to maintain a clean, safe, and efficient property while protecting their investment. 
                </p>
                <p>
                  This package is perfect for houses with roof mould, lichen, dirty solar panels, or clogged gutters. One visit is all it takes to restore the exterior of your home to a pristine, like-new condition.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">What’s Included in the High Duck Package:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Roof Soft Wash + Manual Lichen Scrubbing:</strong> Gentle yet effective cleaning to remove deep-rooted lichen and dirt.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Biodegradable Mould & Algae Treatment:</strong> Safe treatment to kill off mould spores and keep your roof cleaner for longer.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Solar Panel Cleaning:</strong> Professional cleaning using purified water to ensure maximum energy efficiency.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Gutter Clearing (Downpipes Flushed):</strong> Complete removal of leaves and debris, followed by flushing to ensure clear water flow.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Ground Rinse:</strong> Final rinse of house walls and surrounding pathways to ensure zero chemical residue remains.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Benefits of the High Duck Package</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center gap-3"><span className="text-2xl">🛡️</span> Protect your home from roof damage and water leaks</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">✨</span> Improve curb appeal with a clean, bright exterior</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">⚡</span> Increase solar panel efficiency</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">💰</span> Save time and money compared to booking services individually</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">🦆</span> One professional visit covers everything — hassle-free</li>
                </ul>
              </div>

              <div className="bg-slate-900 text-white rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready for a spotless roof?</h3>
                <p className="text-white/80 mb-8">Get a fast and free quote for the High Duck Package today.</p>
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

export default HighDuckPage;
