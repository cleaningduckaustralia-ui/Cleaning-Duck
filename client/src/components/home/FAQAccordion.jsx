import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import api from '../../services/api';
import { generateFAQSchema } from '../../utils/seoData';
import { Helmet } from 'react-helmet-async';

const fallbackFAQs = [
  { _id: '1', question: 'What areas do you service?', answer: 'Cleaning Duck Australia provides cleaning services throughout Brisbane, Logan, Ipswich, Gold Coast, and the Sunshine Coast. Our team works with homeowners, tenants, landlords, and businesses across All over QLD.' },
  { _id: '2', question: 'How do I get a quote?', answer: 'Getting a quote is easy! Submit a request through our online quote form, call us on 0412 664 540 or 0430 614 643, or send us an email. We typically respond within 2 business hours.' },
  { _id: '3', question: 'Are you insured?', answer: 'Yes, Cleaning Duck Australia is fully insured with public liability insurance. Our team members are background-checked and professionally trained.' },
  { _id: '4', question: 'Do you charge extra for weekend or evening bookings?', answer: 'We offer flexible time slots including morning, evening, and weekends. Please contact us for weekend and after-hours pricing.' },
  { _id: '5', question: 'Do you bring your own cleaning equipment and products?', answer: "Yes! We arrive fully equipped with all professional cleaning products and commercial-grade equipment. You don't need to provide anything." },
  { _id: '6', question: 'How long have you been operating?', answer: 'Cleaning Duck Australia has been serving All over QLD since 2024. We are proud to be trusted by over 500 happy clients and have completed more than 2,000 jobs.' },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className={`faq-item ${isOpen ? 'open' : ''}`}>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-xl"
      aria-expanded={isOpen}
      id={`faq-q-${faq._id}`}
      aria-controls={`faq-a-${faq._id}`}
    >
      <span className={`font-semibold text-sm md:text-base faq-question transition-colors ${isOpen ? 'text-primary' : 'text-neutral-800'}`}>
        {faq.question}
      </span>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-45' : 'bg-neutral-100 text-neutral-500'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-a-${faq._id}`}
          role="region"
          aria-labelledby={`faq-q-${faq._id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-neutral-600 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQAccordion = ({ limit, featured }) => {
  const [faqs, setFaqs]   = useState(fallbackFAQs);
  const [open, setOpen]   = useState(null);
  const { ref, inView }   = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const params = new URLSearchParams();
    if (featured) params.set('featured', 'true');
    api.get(`/faqs?${params}`).then(({ data }) => {
      if (data.data?.length) setFaqs(data.data);
    }).catch(() => {});
  }, [featured]);

  const displayed = limit ? faqs.slice(0, limit) : faqs;
  const faqSchema = generateFAQSchema(displayed);

  return (
    <section className="section bg-neutral-50" aria-label="Frequently asked questions" id="faq" ref={ref}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">FAQ</span>
          <h2 className="section-title mt-2">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto mt-4">
            Everything you need to know about our cleaning services in Brisbane and All over QLD.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {displayed.map((faq) => (
            <FAQItem
              key={faq._id}
              faq={faq}
              isOpen={open === faq._id}
              onToggle={() => setOpen(open === faq._id ? null : faq._id)}
            />
          ))}
        </motion.div>

        {limit && (
          <div className="text-center mt-8">
            <a href="/contact" className="btn-outline-primary inline-flex">
              Have more questions? Contact us
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
