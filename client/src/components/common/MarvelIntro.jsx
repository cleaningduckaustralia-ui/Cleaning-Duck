import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { publicAsset } from '../../utils/pathHelpers';

const MarvelIntro = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);
  const transitionTriggeredRef = useRef(false);

  useEffect(() => {
    // Check if user already saw the intro in this tab session
    const seen = sessionStorage.getItem('cleaning_duck_intro_seen');
    if (seen === 'true') {
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

  // Attempt to autoplay UNMUTED by default
  useEffect(() => {
    if (!isVisible) return;

    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      video.play()
        .then(() => setHasStarted(true))
        .catch(() => {
          // If browser policy blocks unmuted autoplay without prior user interaction,
          // fallback to muted playback so the intro doesn't freeze, and allow tap anywhere to unmute
          setIsMuted(true);
          video.muted = true;
          video.play().then(() => setHasStarted(true)).catch(() => {});
        });
    }
  }, [isVisible]);

  // Listen for replay requests
  useEffect(() => {
    const handleReplay = () => {
      sessionStorage.removeItem('cleaning_duck_intro_seen');
      transitionTriggeredRef.current = false;
      setIsZooming(false);
      setProgress(0);
      setIsMuted(false);
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    };

    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  const triggerZoomAndFinish = () => {
    if (transitionTriggeredRef.current) return;
    transitionTriggeredRef.current = true;

    // Trigger Marvel-style dramatic camera zoom into the logo
    setIsZooming(true);

    // After the zoom & flash effect (approx 900ms), reveal the website
    setTimeout(() => {
      sessionStorage.setItem('cleaning_duck_intro_seen', 'true');
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

    // Trigger the Marvel zoom into the logo ~1.2s before the end of the video
    if (video.duration > 3 && video.currentTime >= video.duration - 1.2) {
      triggerZoomAndFinish();
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('cleaning_duck_intro_seen', 'true');
    setIsVisible(false);
    document.body.style.overflow = '';
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (onFinish) onFinish();
    window.dispatchEvent(new CustomEvent('intro-completed'));
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleContainerClick = (e) => {
    // If clicked anywhere on the intro while muted, unmute
    if (isMuted && videoRef.current && !e.target.closest('button')) {
      videoRef.current.muted = false;
      setIsMuted(false);
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
        onClick={handleContainerClick}
        className="fixed inset-0 z-[9999] bg-neutral-950 flex items-center justify-center overflow-hidden select-none cursor-pointer"
      >
        {/* Dynamic Ambient Background Blur for Desktop screens */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 blur-3xl scale-125">
          <video
            src={publicAsset('/videos/intro.mp4')}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

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
              className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 hover:border-orange-500/60 backdrop-blur-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 shadow-lg"
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
                  scale: [1, 1.35, 6, 18],
                  rotate: [0, 0.5, -0.5, 0],
                  filter: [
                    'brightness(1) contrast(1)',
                    'brightness(1.5) contrast(1.2) blur(0px)',
                    'brightness(2.5) contrast(1.5) blur(4px)',
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
          <div className="relative w-full h-full max-w-[440px] max-h-[880px] sm:rounded-2xl sm:overflow-hidden sm:shadow-[0_0_60px_rgba(249,115,22,0.3)] sm:border sm:border-white/10 flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={publicAsset('/videos/intro.mp4')}
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={triggerZoomAndFinish}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Marvel Light Flash Burst (Triggers during zoom) */}
        {isZooming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 1, 0] }}
            transition={{ duration: 0.9, times: [0, 0.4, 0.7, 1] }}
            className="absolute inset-0 z-40 bg-gradient-to-tr from-orange-400 via-white to-amber-200 pointer-events-none mix-blend-screen"
          />
        )}

        {/* Unmute prompt if browser policy forced muted state */}
        {isMuted && !isZooming && (
          <div
            onClick={toggleSound}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
          >
            <div className="bg-orange-600/90 hover:bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-xl border border-white/20 animate-bounce transition-transform hover:scale-105">
              <span>🔊 Tap anywhere for Sound</span>
            </div>
          </div>
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
