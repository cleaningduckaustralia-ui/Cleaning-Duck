import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { publicAsset } from '../../utils/pathHelpers';
import { BRAND } from '../../utils/constants';

// In-memory flag so navigating between pages within the SPA doesn't repeatedly trigger the pop-up
let hasShownInCurrentSession = false;

const AnniversaryModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Clear any previous persistent session suppression so all users see it on entrance/refresh
    try {
      sessionStorage.removeItem('cleaning_duck_anniversary_seen');
    } catch {
      // Ignore if storage is inaccessible
    }

    const showModal = () => {
      if (!hasShownInCurrentSession) {
        return setTimeout(() => {
          setIsOpen(true);
        }, 300);
      }
    };

    // Listen for event from IntroVideoModal (when user closes video or video ends)
    const handleOpen = () => {
      showModal();
    };

    window.addEventListener('open-anniversary-modal', handleOpen);
    return () => window.removeEventListener('open-anniversary-modal', handleOpen);
  }, []);

  const handleClose = () => {
    hasShownInCurrentSession = true;
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="3rd Anniversary Special Offer"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-200/50 z-[101] my-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close anniversary announcement"
              className="absolute top-3 right-3 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Banner Image with link to Request Quote */}
            <Link
              to="/request-quote"
              onClick={handleClose}
              className="block group relative overflow-hidden focus:outline-none"
            >
              <img
                src={publicAsset('/images/anniversary-banner.jpg')}
                alt="Cleaning Duck Australia 3rd Anniversary Special — Up to 20% OFF on any cleaning services"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                loading="eager"
              />
            </Link>

            {/* Bottom Actions Bar */}
            <div className="p-3.5 sm:p-5 bg-gradient-to-r from-orange-50 via-white to-orange-50 border-t border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                  🎉 Limited Time Celebration
                </p>
                <p className="text-sm font-bold text-neutral-800">
                  Enjoy up to 20% OFF on all cleaning services!
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  to="/request-quote"
                  onClick={handleClose}
                  className="btn-primary text-sm py-2 px-4 sm:px-5 flex-1 sm:flex-initial text-center whitespace-nowrap shadow-md hover:shadow-lg font-bold"
                >
                  Book Now & Save
                </Link>
                <a
                  href={BRAND.phoneHref.primary}
                  className="btn-outline text-sm py-2 px-3 text-neutral-700 border-neutral-300 hover:border-orange-500 hover:text-orange-600 flex items-center justify-center gap-1.5 whitespace-nowrap"
                  title="Call for instant booking"
                >
                  📞 {BRAND.phone.primary}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnniversaryModal;
