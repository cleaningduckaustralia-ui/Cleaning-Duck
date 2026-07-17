import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import QuoteFormSection from '../components/home/QuoteFormSection';
import { BRAND } from '../utils/constants';
import { generateBreadcrumbSchema } from '../utils/seoData';

const milestones = [
  { year: '2024', event: 'Founded Cleaning Duck Australia in Brisbane' },
  { year: '2024', event: 'Completed our first 500 jobs across Brisbane and Logan' },
  { year: '2025', event: 'Expanded to Gold Coast and Sunshine Coast' },
  { year: '2025', event: 'Reached 2,000 completed jobs and 500+ satisfied clients' },
  { year: '2026', event: 'Growing team of 10+ certified cleaning technicians' },
];

const values = [
  { icon: '🏆', title: 'Excellence', desc: 'We use commercial-grade equipment and proven techniques to deliver outstanding results every time.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparent pricing, honest communication, and no hidden fees — ever.' },
  { icon: '🌿', title: 'Care', desc: 'Eco-friendly products, careful handling of your belongings, and a team that genuinely cares.' },
  { icon: '⚡', title: 'Reliability', desc: 'On time, every time. We respect your schedule and your home.' },
];

const AboutPage = () => {
  const breadcrumb = generateBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }]);

  return (
    <>
      <SEOHead
        title="About Cleaning Duck Australia | Brisbane Cleaning Experts"
        description="Learn about Cleaning Duck Australia — a Brisbane-based professional cleaning company serving All over QLD since 2024. Meet our team, our values, and our mission."
        keywords={['about cleaning duck australia', 'Brisbane cleaning company', 'professional cleaners Brisbane']}
        canonical="/about"
        structuredData={[breadcrumb]}
      />

      {/* Hero */}
      <div className="page-hero">
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            About Cleaning Duck Australia
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-xl mx-auto">
            Brisbane's trusted cleaning professionals — committed to excellence since 2024.
          </motion.p>
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-white/80">About Us</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Our Story */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="section-label">Our Story</span>
              <h2 className="section-title mt-2 mb-6">Passionate About Clean</h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed" data-speakable="true">
                <p>
                  Cleaning Duck Australia was founded with one simple mission: to provide reliable,
                  high-quality cleaning services that homeowners and businesses across Brisbane and
                  All over QLD can count on.
                </p>
                <p>
                  Starting from humble beginnings in 2024, we've grown into a team of over 10
                  certified cleaning technicians, serving thousands of satisfied clients across
                  Brisbane, Logan, Ipswich, Gold Coast, and the Sunshine Coast.
                </p>
                <p>
                  We believe that a clean home is a happy home. Whether you're moving out of a rental
                  and need your bond back, or simply want fresh carpets and spotless upholstery — we
                  bring the same dedication and professional-grade equipment to every job.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <Link to="/request-quote" className="btn-primary">Get Free Quote</Link>
                <Link to="/contact" className="btn-outline-primary">Contact Us</Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card-lg">
                <img
                  src="https://cleaningduckaustralia.com.au/wp-content/uploads/2026/02/6-1.png"
                  alt="Cleaning Duck Australia team at work"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'; }}
                />
                {/* ABN badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow">
                  <div className="text-xs text-neutral-500">Registered Australian Business</div>
                  <div className="text-sm font-bold text-primary">ABN {BRAND.abn}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="section-label">Our Values</span>
            <h2 className="section-title mt-2">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card text-center group"
              >
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors">{v.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3 px-4 py-1.5 rounded-full bg-accent/20">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Growing From Strength to Strength</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs flex-shrink-0">{m.year.slice(2)}</div>
                  {i < milestones.length - 1 && <div className="w-0.5 h-full bg-white/20 mt-2" />}
                </div>
                <div className="pb-8">
                  <div className="text-accent text-sm font-bold mb-1">{m.year}</div>
                  <p className="text-white/80 text-sm leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteFormSection />
    </>
  );
};

export default AboutPage;
