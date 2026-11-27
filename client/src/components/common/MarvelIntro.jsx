import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { publicAsset } from '../../utils/pathHelpers';

// In-memory flag so internal route navigation doesn't re-trigger intro,
// but refreshing/opening the website always displays it
let hasPlayedInAppSession = false;

const MarvelIntro = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);
  const transitionTriggeredRef = useRef(false);

  useEffect(() => {
    // Clear any previous persistent session block
    try {
      sessionStorage.removeItem('cleaning_duck_intro_seen');
    } catch {}

    if (hasPlayedInAppSession) {
      setIsVisible(false);
      if (onFinish) onFinish();
      return;
    }

    // Lock body scroll while intro is playing
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted play first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setHasStarted(true);
        })
        .catch(() => {
          // If browser autoplay policy blocks unmuted audio without prior interaction,
          // play with mute enabled so video doesn't freeze
          video.muted = true;
          setIsMuted(true);
          video.play()
            .then(() => setHasStarted(true))
            .catch((err) => {
              console.warn('Playback error:', err);
            });
        });
    }
  };

  useEffect(() => {
    if (!isVisible) return;
    startPlayback();
  }, [isVisible]);

  // Listen for replay requests from floating button
  useEffect(() => {
    const handleReplay = () => {
      hasPlayedInAppSession = false;
      transitionTriggeredRef.current = false;
      setIsZooming(false);
      setProgress(0);
      setIsVisible(true);
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          startPlayback();
        }
      }, 100);
    };

    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  const triggerZoomAndFinish = () => {
    if (transitionTriggeredRef.current) return;
    transitionTriggeredRef.current = true;

    // Trigger Marvel-style dramatic camera zoom into the logo
    setIsZooming(true);

    // Reveal the website after zoom & flash effect (950ms)
    setTimeout(() => {
      hasPlayedInAppSession = true;
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onFinish) onFinish();
      window.dispatchEvent(new CustomEvent('intro-completed'));
    }, 950);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const pct = (video.currentTime / video.duration) * 100;
    setProgress(pct);

    // Trigger Marvel zoom ~1.2s before the end of the video
    if (video.duration > 3 && video.currentTime >= video.duration - 1.2) {
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
    // If clicked anywhere on the intro screen while muted, immediately unmute and ensure playing
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
        transition={{ duration: 0.6 }}
        onClick={handleScreenClick}
        className="fixed inset-0 z-[9999] bg-neutral-950 flex items-center justify-center overflow-hidden select-none cursor-pointer"
      >
        {/* Cinematic Ambient Glow Background (Ultra-light, No duplicate video) */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-10 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18)_0%,rgba(0,0,0,0.92)_75%)]" />

        {/* Top Control Bar */}
        <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between">
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
              className="px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 hover:border-orange-500/60 backdrop-blur-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 shadow-lg active:scale-95"
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
              className="px-4 py-1.5 rounded-full bg-orange-600/90 hover:bg-orange-500 text-white border border-orange-400/50 backdrop-blur-md text-xs font-bold tracking-wide uppercase transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
            >
              Skip Intro ✕
            </button>
          </div>
        </div>

        {/* Video Player Box with Marvel Zoom Effect */}
        <motion.div
          animate={
            isZooming
              ? {
                  scale: [1, 1.4, 6, 18],
                  filter: [
                    'brightness(1) contrast(1)',
                    'brightness(1.6) contrast(1.2) blur(0px)',
                    'brightness(2.8) contrast(1.5) blur(4px)',
                    'brightness(5) contrast(2) blur(12px)',
                  ],
                }
              : { scale: 1 }
          }
          transition={{
            duration: 0.95,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="relative z-20 w-full h-full flex items-center justify-center origin-center"
        >
          <div className="relative w-full h-full max-w-[440px] max-h-[880px] sm:rounded-2xl sm:overflow-hidden sm:shadow-[0_0_80px_rgba(249,115,22,0.35)] sm:border sm:border-white/10 flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={publicAsset('/videos/intro.mp4')}
              autoPlay
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={triggerZoomAndFinish}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Unmute floating banner if browser autoplay policy forced mute */}
        {isMuted && !isZooming && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="bg-orange-600/95 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 shadow-2xl border border-white/20 animate-bounce">
              <span>🔊 Tap anywhere to unmute sound</span>
            </div>
          </div>
        )}

        {/* Marvel Light Flash Burst */}
        {isZooming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 1, 0] }}
            transition={{ duration: 0.9, times: [0, 0.4, 0.7, 1] }}
            className="absolute inset-0 z-40 bg-gradient-to-tr from-orange-400 via-white to-amber-200 pointer-events-none mix-blend-screen"
          />
        )}

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 h-1.5 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MarvelIntro;
