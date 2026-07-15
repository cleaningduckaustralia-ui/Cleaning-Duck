import SEOHead from '../components/common/SEOHead';
import QuoteFormSection from '../components/home/QuoteFormSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema } from '../utils/seoData';
import { motion } from 'framer-motion';

const RequestQuotePage = () => {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Request Quote', path: '/request-quote' },
  ]);

  return (
    <>
      <SEOHead
        title="Request a Free Quote | Cleaning Duck Australia Brisbane"
        description="Get your free, no-obligation cleaning quote from Cleaning Duck Australia. Bond cleaning, carpet, roof, upholstery & more across Brisbane, Logan, Gold Coast & Sunshine Coast."
        keywords={['free cleaning quote Brisbane', 'carpet cleaning quote', 'bond cleaning quote Brisbane', 'roof cleaning quote Brisbane']}
        canonical="/request-quote"
        structuredData={[breadcrumb]}
      />

      <div className="page-hero">
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            Request a Free Quote
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-white/70 text-lg max-w-lg mx-auto">
            Fill in your details and our team will send you a personalised quote within 2 business hours.
          </motion.p>
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-white/80">Request Quote</li>
            </ol>
          </nav>
        </div>
      </div>

      <QuoteFormSection />
    </>
  );
};

export default RequestQuotePage;
