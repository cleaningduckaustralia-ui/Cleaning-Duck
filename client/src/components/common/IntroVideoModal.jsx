import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { publicAsset } from '../../utils/pathHelpers';

// In-memory flag so internal route changes don't re-trigger the pop-up
let hasShownVideoModal = false;

const IntroVideoModal = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // If already seen in this session, don't re-open on simple page changes
    if (hasShownVideoModal) return;

    // Show video pop-up ~500ms after entering website
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    hasShownVideoModal = true;
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpen(false);
    setIsPlaying(false);

    // After video modal is closed, trigger the 3rd Anniversary banner pop-up
    setTimeout(() => {
      if (onComplete) onComplete();
      window.dispatchEvent(new CustomEvent('open-anniversary-modal'));
    }, 350);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  const handleVideoEnded = () => {
    // When video finishes, automatically close video modal and open anniversary banner
    handleClose();
  };

  // Listen for replay requests from floating 🎬 button
  useEffect(() => {
    const handleReplay = () => {
      setIsOpen(true);
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.muted = false;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    };

    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  // Listen for escape key
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Cleaning Duck Introduction Video"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md sm:max-w-lg bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-orange-500/40 z-[101] my-auto"
          >
            {/* Close Button ✕ */}
            <button
              onClick={handleClose}
              aria-label="Close video pop-up"
              className="absolute top-3 right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video / Poster Stage */}
            <div className="relative aspect-[9/14] sm:aspect-[9/13] max-h-[75vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src={publicAsset('/videos/intro.mp4')}
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                controls={isPlaying}
                onEnded={handleVideoEnded}
                className="w-full h-full object-cover object-center"
              />

              {/* Play Overlay if not playing */}
              {!isPlaying && (
                <div
                  onClick={handlePlayClick}
                  className="absolute inset-0 bg-black/40 hover:bg-black/20 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors p-6 text-center"
                >
                  {/* Glowing Play Circle */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:scale-110 active:scale-95 transition-transform">
                    <svg className="w-9 h-9 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-white text-lg sm:text-xl font-bold drop-shadow">
                      Watch Cleaning Duck Intro
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                      Tap to play with full sound &amp; motion
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-3.5 sm:p-4 bg-neutral-900 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-xs text-orange-400 font-semibold tracking-wider uppercase block">
                  🎬 Introduction
                </span>
                <span className="text-xs text-neutral-300">
                  Click play to watch, or close to continue
                </span>
              </div>

              <button
                onClick={handleClose}
                className="btn-secondary text-xs py-2 px-4 whitespace-nowrap bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl border border-white/10 transition-colors font-medium"
              >
                Close &amp; View Offer ✕
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideoModal;
