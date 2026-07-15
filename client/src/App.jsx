import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingButtons from './components/common/FloatingButtons';
import './styles/index.css';

// Public pages (eager loaded for LCP)
import HomePage from './pages/HomePage';

// Lazy-loaded pages
const ServicesPage         = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage    = lazy(() => import('./pages/ServiceDetailPage'));
const PackagesPage         = lazy(() => import('./pages/PackagesPage'));
const EndOfLeasePage       = lazy(() => import('./pages/EndOfLeasePage'));
const PostConstructionPage = lazy(() => import('./pages/PostConstructionPage'));
const PreSalePage          = lazy(() => import('./pages/PreSalePage'));
const GalleryPage          = lazy(() => import('./pages/GalleryPage'));
const AboutPage            = lazy(() => import('./pages/AboutPage'));
const ContactPage          = lazy(() => import('./pages/ContactPage'));
const RequestQuotePage     = lazy(() => import('./pages/RequestQuotePage'));
const NotFoundPage         = lazy(() => import('./pages/NotFoundPage'));

// Admin pages
const AdminLoginPage    = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminMedia        = lazy(() => import('./pages/admin/AdminMedia'));
const AdminServices     = lazy(() => import('./pages/admin/AdminServices'));
import AdminDashboard, { AdminLayout } from './pages/admin/AdminDashboard';

// Loading fallback
const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-neutral-400 text-sm">Loading...</p>
    </div>
  </div>
);

// Layout wrapper for public pages
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <div>{children}</div>
    <Footer />
    <FloatingButtons />
  </>
);

const App = () => (
  <HelmetProvider>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/services/end-of-lease-cleaning" element={<PublicLayout><EndOfLeasePage /></PublicLayout>} />
            <Route path="/services/post-construction-cleaning" element={<PublicLayout><PostConstructionPage /></PublicLayout>} />
            <Route path="/services/pre-sale-cleaning" element={<PublicLayout><PreSalePage /></PublicLayout>} />
            <Route path="/services/:slug" element={<PublicLayout><ServiceDetailPage /></PublicLayout>} />
            <Route path="/packages" element={<PublicLayout><PackagesPage /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/request-quote" element={<PublicLayout><RequestQuotePage /></PublicLayout>} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="services" element={<AdminServices />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </HelmetProvider>
);

export default App;
