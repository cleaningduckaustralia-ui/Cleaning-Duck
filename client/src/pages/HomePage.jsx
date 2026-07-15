import SEOHead from '../components/common/SEOHead';
import Hero from '../components/home/Hero';
import StatsCounter from '../components/home/StatsCounter';
import ServicesGrid from '../components/home/ServicesGrid';
import WhyChooseUs from '../components/home/WhyChooseUs';
import GalleryMarquee from '../components/home/GalleryMarquee';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import ServiceAreasSection from '../components/home/ServiceAreasSection';
import FAQAccordion from '../components/home/FAQAccordion';
import QuoteFormSection from '../components/home/QuoteFormSection';
import CTABanner from '../components/home/CTABanner';
import { generateBreadcrumbSchema } from '../utils/seoData';

const HomePage = () => {
  const breadcrumb = generateBreadcrumbSchema([{ name: 'Home', path: '/' }]);

  return (
    <>
      <SEOHead
        title={null}
        description="Professional cleaning services in Brisbane & South East QLD. Carpet cleaning, bond cleaning, roof washing, upholstery, gutter & pressure cleaning. 5-star rated. Call 0412 664 540 for a free quote."
        keywords={['cleaning services Brisbane', 'carpet cleaning Brisbane', 'bond cleaning Brisbane', 'roof cleaning Brisbane', 'pressure cleaning Brisbane', 'upholstery cleaning Brisbane', 'gutter cleaning Brisbane']}
        canonical="/"
        structuredData={[breadcrumb]}
        speakableSelectors={['.hero-headline', '[data-speakable="true"]', '.section-title']}
      />
      <main>
        <Hero />
        <StatsCounter />
        <ServicesGrid />
        <WhyChooseUs />
        <GalleryMarquee />
        <TestimonialsSlider />
        <ServiceAreasSection />
        <FAQAccordion limit={6} featured />
        <QuoteFormSection />
        <CTABanner />
      </main>
    </>
  );
};

export default HomePage;
