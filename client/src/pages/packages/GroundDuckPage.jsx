import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/common/SEOHead';
import { BRAND } from '../../utils/constants';

const GroundDuckPage = () => {
  return (
    <>
      <SEOHead
        title="Ground Duck Package | Cleaning Duck Australia"
        description="Bring your home exterior back to life with the Ground Duck Package. House washing, driveway pressure cleaning and more."
        canonical="/packages/ground-duck"
      />

      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1600&q=80"
            alt="Ground Duck Cleaning"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/40 text-orange-300 text-sm font-medium">
              ☀️ Driveways, Paths & House Wash
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6">
            The Ground Duck Package
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Bring Your Home Exterior Back to Life
          </motion.p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Your home’s exterior is the first thing guests notice.</h2>
              <div className="prose prose-lg text-slate-600 mb-8">
                <p>
                  Over time, dust, dirt, mould, and algae can make even the most beautiful house look tired and neglected. Cleaning Duck, trusted for years inside homes, now brings that same professional care to your home’s exterior.
                </p>
                <p>
                  The Ground Duck package is perfect for homeowners looking for a quick, cost-effective, and thorough refresh. It combines multiple exterior services in one convenient visit, saving you time, effort, and money while restoring your home’s curb appeal.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">What’s Included in the Ground Duck Package:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>House Exterior Soft Wash:</strong> Gentle cleaning of walls, eaves & gutters without high pressure.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Mould & Algae Treatment:</strong> Paint-safe solutions to prevent regrowth and maintain a fresh look.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Driveway & Paths Deep Pressure Clean:</strong> High pressure washing using rotary surface cleaners.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Oil & Black Mould Treatment:</strong> Targeted chemical applications for stubborn stains on concrete.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700"><strong>Final Rinse:</strong> A thorough rinse of all windows, flyscreens, and surrounding paths to ensure a sparkling finish.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Benefits of the Ground Duck Package</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center gap-3"><span className="text-2xl">✨</span> Restore curb appeal and make your home look like new</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">🛡️</span> Prevent paint damage caused by mould and algae</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">💰</span> Save money compared to booking each service separately</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">⏱️</span> Quick, efficient, and thorough — all in one visit</li>
                  <li className="flex items-center gap-3"><span className="text-2xl">🌱</span> Eco-friendly, safe, and professional service</li>
                </ul>
              </div>

              <div className="bg-slate-900 text-white rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to boost your curb appeal?</h3>
                <p className="text-white/80 mb-8">Get a fast and free quote for the Ground Duck Package today.</p>
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

export default GroundDuckPage;
