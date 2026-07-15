import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';

const NotFoundPage = () => (
  <>
    <SEOHead title="Page Not Found" noIndex />
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black text-primary/10 mb-4">404</div>
        <div className="text-6xl mb-6">🦆</div>
        <h1 className="text-3xl font-bold text-primary mb-4">Page Not Found</h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          Looks like this page has flown the coop. The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary btn-lg">Back to Home</Link>
          <Link to="/services" className="btn-outline-primary btn-lg">View Services</Link>
        </div>
      </div>
    </div>
  </>
);

export default NotFoundPage;
