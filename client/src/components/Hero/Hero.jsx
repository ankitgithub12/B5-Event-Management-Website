import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import { io } from 'socket.io-client';

const SLIDE_INTERVAL = 5000; // ms between auto-advance

const Hero = () => {
  const [hero, setHero] = useState({
    slideshowImages: [],
    badgeText: '✨ WE DESIGN. YOU CELEBRATE.',
    title: 'Where Every <br />Event Becomes a <span class="text-accent italic font-serif">Story</span>',
    subtitle: 'Weddings • Engagements • Birthdays • Anniversaries • Corporate Events',
    ctaPrimaryText: 'Start Planning',
    ctaPrimaryLink: '#contact',
    ctaSecondaryText: 'View Packages',
    ctaSecondaryLink: '/packages',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Sort slides by order field
  const slides = [...(hero.slideshowImages || [])].sort((a, b) => a.order - b.order);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await api.get('/hero');
        if (data) setHero(data);
      } catch (err) {
        console.error('Error fetching hero content:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('hero_update', (updatedHero) => {
      if (updatedHero) {
        setHero(updatedHero);
        setCurrentIndex(0);
      }
    });
    return () => socket.disconnect();
  }, []);

  // Auto-advance timer
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(slides.length, 1));
    }, SLIDE_INTERVAL);
  }, [slides.length]);

  useEffect(() => {
    if (!isPaused && slides.length > 1) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, slides.length, startTimer]);

  const goTo = (idx) => {
    setCurrentIndex(idx);
    startTimer(); // reset timer on manual nav
  };

  const goPrev = () => goTo((currentIndex - 1 + slides.length) % slides.length);
  const goNext = () => goTo((currentIndex + 1) % slides.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Top Gradient for navbar readability ── */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />

      {/* ── Slideshow Background ── */}
      <div className="absolute inset-0">
        {isLoading ? (
          <div className="w-full h-full bg-primary/80 animate-pulse" />
        ) : slides.length === 0 ? (
          <div className="w-full h-full bg-primary" />
        ) : (
          <AnimatePresence mode="sync">
            <motion.div
              key={`slide-${currentIndex}-${slides[currentIndex]?._id}`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentIndex]?.url}
                alt={`Hero slide ${currentIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Ken Burns subtle zoom via CSS */}
              <div className="absolute inset-0 bg-primary/50" />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ── Slide Navigation Arrows ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* ── Slide Progress Dots ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-400 rounded-full ${
                idx === currentIndex
                  ? 'w-8 h-2.5 bg-accent shadow-gold'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Auto-play Progress Bar ── */}
      {slides.length > 1 && !isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 z-30 bg-white/10">
          <motion.div
            key={`progress-${currentIndex}`}
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
          />
        </div>
      )}

      {/* ── Content Overlay ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 py-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent font-semibold text-xs md:text-sm tracking-[3px] uppercase mb-8 shadow-lg"
          >
            {hero.badgeText}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-8 leading-tight drop-shadow-2xl font-bold"
            dangerouslySetInnerHTML={{ __html: hero.title }}
          />

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-light tracking-wide"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {hero.ctaPrimaryLink?.startsWith('/') ? (
              <Link to={hero.ctaPrimaryLink} className="btn bg-accent text-white hover:bg-accent-hover px-10 py-4 text-lg shadow-gold transition-all duration-300 group">
                {hero.ctaPrimaryText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <a href={hero.ctaPrimaryLink} className="btn bg-accent text-white hover:bg-accent-hover px-10 py-4 text-lg shadow-gold transition-all duration-300 group">
                {hero.ctaPrimaryText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {hero.ctaSecondaryLink?.startsWith('/') ? (
              <Link to={hero.ctaSecondaryLink} className="btn border-2 border-white text-white hover:bg-white/10 hover:border-accent px-10 py-4 text-lg backdrop-blur-sm transition-all duration-300">
                {hero.ctaSecondaryText}
              </Link>
            ) : (
              <a href={hero.ctaSecondaryLink} className="btn border-2 border-white text-white hover:bg-white/10 hover:border-accent px-10 py-4 text-lg backdrop-blur-sm transition-all duration-300">
                {hero.ctaSecondaryText}
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom Fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default Hero;
