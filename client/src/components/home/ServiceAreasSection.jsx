import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { BRAND } from '../../utils/constants';

const areas = [
  { name: 'Brisbane', desc: 'All suburbs including CBD, Southside, Northside, Eastern & Western suburbs' },
  { name: 'Logan',    desc: 'Logan Central, Springwood, Beenleigh, Loganholme, Marsden & surrounds' },
  { name: 'Ipswich',  desc: 'Ipswich CBD, Springfield, Redbank Plains, Goodna & surrounding areas' },
  { name: 'Gold Coast', desc: 'Surfers Paradise, Broadbeach, Robina, Coomera & northern Gold Coast' },
  { name: 'Sunshine Coast', desc: 'Noosa, Maroochydore, Caloundra, Nambour & surrounding suburbs' },
];

const ServiceAreasSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section bg-white" aria-label="Service areas" id="service-areas" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Where We Work</span>
          <h2 className="section-title mt-2">Serving All of All over QLD</h2>
          <p className="section-subtitle mx-auto mt-4">
            From Brisbane to the Gold Coast and up to the Sunshine Coast — our professional
            cleaning teams are ready to serve you across All over QLD.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {areas.map((area, i) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-card transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-1 group-hover:text-accent transition-colors">{area.name}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{area.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 flex-wrap"
        >
          <a href={BRAND.phoneHref.primary} className="btn-primary">Call {BRAND.phone.primary}</a>
          <a href={BRAND.phoneHref.secondary} className="btn-primary">Call {BRAND.phone.secondary}</a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
