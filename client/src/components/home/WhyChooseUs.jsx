import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Fast Booking Process',
    description: 'Schedule your cleaning service online or by phone in just minutes. No complicated forms, no waiting.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexible Time Slots',
    description: 'Morning, evening, or weekend — we work around your schedule, not the other way around.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'No Hidden Charges',
    description: 'Clear, upfront pricing with no surprise fees or extra costs. What we quote is what you pay.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Fully Insured Team',
    description: 'Every technician is fully insured and background-checked. Your home and belongings are protected.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Commercial-Grade Equipment',
    description: 'We use industrial-strength cleaning machines and eco-friendly products for outstanding results every time.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Satisfaction Guarantee',
    description: 'Not happy? We come back and fix it at no cost. Your complete satisfaction is our commitment.',
  },
];

const WhyChooseUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section bg-white relative overflow-hidden" aria-label="Why choose Cleaning Duck Australia" id="why-choose-us" ref={ref}>
      {/* Subtle graphic decorations */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-50 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/70 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — image/visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
          <div className="relative rounded-3xl overflow-hidden shadow-card-lg aspect-[4/3]">
              <img
                src="https://cleaningduckaustralia.com.au/wp-content/uploads/2026/02/6-1.png"
                alt="Professional cleaning technician at work"
                className="w-full h-full object-cover"
                loading="lazy"
                width="600" height="450"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />

              {/* Floating stat card — inside image to prevent mobile overflow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-4 right-4 glass-dark rounded-2xl px-4 py-3 shadow-lg border border-white/10"
              >
                <div className="text-2xl font-bold text-white">700+</div>
                <div className="text-white/60 text-xs">Satisfied Clients</div>
                <div className="flex gap-0.5 mt-1">
                  {'★★★★★'.split('').map((s, i) => <span key={i} className="text-yellow-400 text-sm">{s}</span>)}
                </div>
              </motion.div>

              {/* Experience badge — inside image to prevent mobile overflow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-4 left-4 bg-accent text-white rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="text-xl font-bold">10+</div>
                <div className="text-white/80 text-xs">Expert Technicians</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title mt-2 mb-4">
              Experienced cleaners right in your area!
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8" data-speakable="true">
              At Cleaning Duck, we cater to both residential and commercial clients, offering
              comprehensive cleaning solutions for every need. Our primary focus is delivering
              top-quality services at competitive prices while fostering long-term relationships
              with our valued customers.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex gap-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-sm mb-1">{feature.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/request-quote" className="btn-primary text-center">Get Free Quote</Link>
              <Link to="/about" className="btn-outline-primary text-center">Learn More</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
