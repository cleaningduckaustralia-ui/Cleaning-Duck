import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { publicAsset } from '../../utils/pathHelpers';

// In-memory flag so navigating between pages doesn't replay the intro,
// but refreshing/entering the site will show it
let hasPlayedInAppSession = false;

const MarvelIntro = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const transitionTriggeredRef = useRef(false);

  useEffect(() => {
    try {
      sessionStorage.removeItem('cleaning_duck_intro_seen');
    } catch {}

    if (hasPlayedInAppSession) {
      setIsVisible(false);
      if (onFinish) onFinish();
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  const attemptPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    // Try unmuted play first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setIsBuffering(false);
        })
        .catch(() => {
          // If browser autoplay policy blocks audio without user gesture,
          // play with mute enabled so playback is 100% fluid and doesn't freeze
          video.muted = true;
          setIsMuted(true);
          video.play()
            .then(() => setIsBuffering(false))
            .catch(() => {});
        });
    }
  };

  // Listen for replay requests from the floating 🎬 button
  useEffect(() => {
    const handleReplay = () => {
      hasPlayedInAppSession = false;
      transitionTriggeredRef.current = false;
      setIsZooming(false);
      setIsBuffering(true);
      setIsVisible(true);
      document.body.style.overflow = 'hidden';

      if (progressBarRef.current) {
        progressBarRef.current.style.width = '0%';
      }

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          attemptPlay();
        }
      }, 50);
    };

    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  const triggerZoomAndFinish = () => {
    if (transitionTriggeredRef.current) return;
    transitionTriggeredRef.current = true;

    // GPU-accelerated Marvel zoom
    setIsZooming(true);

    setTimeout(() => {
      hasPlayedInAppSession = true;
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onFinish) onFinish();
      window.dispatchEvent(new CustomEvent('intro-completed'));
    }, 850);
  };

  // Direct DOM manipulation for progress bar to eliminate React re-render lag!
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const pct = (video.currentTime / video.duration) * 100;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${pct}%`;
    }

    // Trigger zoom ~1.1s before end
    if (video.duration > 3 && video.currentTime >= video.duration - 1.1) {
      triggerZoomAndFinish();
    }
  };

  const handleSkip = (e) => {
    if (e) e.stopPropagation();
    hasPlayedInAppSession = true;
    setIsVisible(false);
    document.body.style.overflow = '';
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (onFinish) onFinish();
    window.dispatchEvent(new CustomEvent('intro-completed'));
  };

  const toggleSound = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleScreenClick = (e) => {
    if (e.target.closest('button')) return;

    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
      }
      if (video.muted) {
        video.muted = false;
        setIsMuted(false);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="marvel-intro-container"
        initial={{ opacity: 1 }}
        animate={{ opacity: isZooming ? [1, 1, 0] : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={handleScreenClick}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden select-none cursor-pointer transform-gpu"
        style={{ willChange: 'opacity' }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12)_0%,rgba(0,0,0,0.95)_70%)]" />

        {/* Top Control Bar */}
        <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className="text-white/80 text-xs font-semibold tracking-widest uppercase drop-shadow">
              Cleaning Duck Intro
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-orange-500 text-xs font-medium transition-transform active:scale-95 flex items-center gap-1.5 shadow-lg"
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <>
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <span>Sound On</span>
                </>
              )}
            </button>

            {/* Skip Intro */}
            <button
              onClick={handleSkip}
              type="button"
              className="px-4 py-1.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white border border-orange-400/50 text-xs font-bold tracking-wide uppercase transition-transform shadow-lg hover:scale-105 active:scale-95"
            >
              Skip Intro ✕
            </button>
          </div>
        </div>

        {/* Video Player Box with GPU-Accelerated Zoom */}
        <motion.div
          animate={
            isZooming
              ? {
                  scale: [1, 1.3, 5, 16],
                }
              : { scale: 1 }
          }
          transition={{
            duration: 0.85,
            ease: [0.7, 0, 0.3, 1],
          }}
          className="relative z-20 w-full h-full flex items-center justify-center origin-center transform-gpu"
          style={{ willChange: 'transform' }}
        >
          <div className="relative w-full h-full max-w-[420px] max-h-[840px] sm:rounded-2xl sm:overflow-hidden sm:shadow-[0_0_60px_rgba(249,115,22,0.3)] sm:border sm:border-white/10 flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={publicAsset('/videos/intro.mp4')}
              autoPlay
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onCanPlay={attemptPlay}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onTimeUpdate={handleTimeUpdate}
              onEnded={triggerZoomAndFinish}
              className="w-full h-full object-cover object-center"
            />

            {/* Loading/Buffering Spinner */}
            {isBuffering && !isZooming && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none">
                <div className="w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Unmute floating banner if browser autoplay policy forced mute */}
        {isMuted && !isZooming && !isBuffering && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="bg-orange-600 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 shadow-2xl border border-white/25 animate-bounce">
              <span>🔊 Tap anywhere for sound</span>
            </div>
          </div>
        )}

        {/* Marvel Golden Flash Burst on Zoom */}
        {isZooming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.3, 0.6, 1] }}
            className="absolute inset-0 z-40 bg-gradient-to-tr from-orange-400 via-white to-amber-200 pointer-events-none transform-gpu"
          />
        )}

        {/* Bottom Progress Bar (Direct DOM update - 0% React re-render overhead) */}
        <div className="absolute bottom-0 inset-x-0 z-30 h-1 bg-white/10">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 transition-[width] duration-75"
            style={{ width: '0%' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MarvelIntro;
