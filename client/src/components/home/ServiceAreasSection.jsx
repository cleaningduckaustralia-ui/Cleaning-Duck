import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { BRAND } from '../../utils/constants';

const areas = [
  {
    name: 'Brisbane',
    desc: 'CBD, Southside, Northside, Eastern & Western suburbs',
    suburbs: '130+ suburbs',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: 'Logan',
    desc: 'Logan Central, Springwood, Beenleigh, Loganholme & surrounds',
    suburbs: '40+ suburbs',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: 'Ipswich',
    desc: 'Ipswich CBD, Springfield, Redbank Plains, Goodna & surrounds',
    suburbs: '35+ suburbs',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: 'Gold Coast',
    desc: 'Surfers Paradise, Broadbeach, Robina, Coomera & northern GC',
    suburbs: '60+ suburbs',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: 'Sunshine Coast',
    desc: 'Noosa, Maroochydore, Caloundra, Nambour & surrounding suburbs',
    suburbs: '50+ suburbs',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '315+', label: 'Suburbs Covered' },
  { value: '700+', label: 'Jobs Completed' },
  { value: '5 ★', label: 'Google Rating' },
];

const ServiceAreasSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      className="relative overflow-hidden py-24"
      aria-label="Service areas"
      id="service-areas"
      ref={ref}
      style={{ background: 'linear-gradient(160deg, #fff8f3 0%, #fff3ea 50%, #ffeede 100%)' }}
    >
      {/* Decorative soft blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #fed7aa 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #fdba74 0%, transparent 70%)' }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(#ea580c 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="section-label">📍 Where We Work</span>

          <h2
            className="section-title mt-3 mb-0 max-w-4xl mx-auto leading-tight"
          >
            From Brisbane to the Gold Coast and up to the{' '}
            <span className="text-accent">Sunshine Coast</span> — our professional cleaning teams
            are ready to serve you{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">across All over QLD.</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-2 -z-0 rounded"
                style={{ background: 'rgba(234,88,12,0.12)' }}
              />
            </span>
          </h2>

          {/* Inline stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white shadow-sm border border-orange-100"
              >
                <span className="text-2xl font-extrabold text-accent">{s.value}</span>
                <span className="text-sm font-medium text-neutral-500">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Area Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {areas.map((area, i) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-orange-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start gap-4">
                {/* Pin icon */}
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-50 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  {area.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-primary text-base group-hover:text-accent transition-colors duration-200">
                      {area.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-50 text-accent border border-orange-200 whitespace-nowrap">
                      {area.suburbs}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed">{area.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-5"
        >
          {/* Primary button */}
          <Link
            to="/request-quote"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
              boxShadow: '0 6px 24px rgba(234,88,12,0.28)',
            }}
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            Get Your Free Quote
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-orange-200" />
            <span className="text-xs text-neutral-400">or call us directly</span>
            <div className="flex-1 h-px bg-orange-200" />
          </div>

          {/* Phone buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={BRAND.phoneHref.primary}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-primary bg-white border border-orange-200 shadow-sm hover:border-accent hover:text-accent hover:shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {BRAND.phone.primary}
            </a>
            <a
              href={BRAND.phoneHref.secondary}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-primary bg-white border border-orange-200 shadow-sm hover:border-accent hover:text-accent hover:shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {BRAND.phone.secondary}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
