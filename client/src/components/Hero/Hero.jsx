import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import { io } from 'socket.io-client';

const SLIDE_INTERVAL = 5000; // ms between auto-advance

const FloatingParticles = () => (
  <div className="particles-container">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="particle" />
    ))}
  </div>
);

const DecorativeCorner = ({ position }) => {
  const cornerClasses = {
    'top-left': 'top-8 left-8 border-t-2 border-l-2',
    'top-right': 'top-8 right-8 border-t-2 border-r-2',
    'bottom-left': 'bottom-32 left-8 border-b-2 border-l-2',
    'bottom-right': 'bottom-32 right-8 border-b-2 border-r-2',
  };

  return (
    <div className={`absolute w-16 h-16 border-accent/20 z-20 pointer-events-none hidden lg:block ${cornerClasses[position]}`} />
  );
};

const Hero = () => {
  const [hero, setHero] = useState({
    slideshowImages: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
        order: 0,
        _id: 'default-lcp-slide',
      }
    ],
    badgeText: ' WE DESIGN. YOU CELEBRATE.',
    title: 'Where Every <br />Event Becomes a <span class="text-accent italic font-serif">Story</span>',
    subtitle: 'Weddings • Engagements • Birthdays • Anniversaries • Corporate Events',
    ctaPrimaryText: 'Start Planning',
    ctaPrimaryLink: '/contact',
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Top Gradient for navbar readability ── */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-20 pointer-events-none" />

      {/* ── Floating Sparkle Particles ── */}
      <FloatingParticles />

      {/* ── Decorative Corner Flourishes ── */}
      <DecorativeCorner position="top-left" />
      <DecorativeCorner position="top-right" />
      <DecorativeCorner position="bottom-left" />
      <DecorativeCorner position="bottom-right" />

      {/* ── Slideshow Background ── */}
      <div className="absolute inset-0">
        {slides.length === 0 ? (
          <div className="w-full h-full bg-primary" />
        ) : (
          <AnimatePresence mode="sync">
            <motion.div
              key={`slide-${currentIndex}-${slides[currentIndex]?._id || currentIndex}`}
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
                fetchPriority={currentIndex === 0 ? "high" : "auto"}
              />
              {/* Rich cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/40 to-primary-dark/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
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
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-accent/30 hover:border-accent/50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg group"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-accent/30 hover:border-accent/50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg group"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* ── Slide Progress Dots ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-400 rounded-full ${
                idx === currentIndex
                  ? 'w-8 h-2.5 bg-accent shadow-[0_0_12px_rgba(200,158,98,0.5)]'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
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
          {/* Badge with shimmer */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-accent font-semibold text-xs md:text-sm tracking-[3px] uppercase mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] shimmer-sweep"
          >
            {hero.badgeText}
          </motion.div>

          {/* Title with enhanced styling */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] text-white mb-8 leading-tight font-bold"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)' }}
            dangerouslySetInnerHTML={{ __html: hero.title }}
          />

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/85 mb-14 leading-relaxed max-w-2xl mx-auto font-light tracking-wide"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA — glowing gold */}
            {hero.ctaPrimaryLink?.startsWith('/') ? (
              <Link to={hero.ctaPrimaryLink} className="btn bg-gradient-to-r from-accent to-[#d4ad6e] text-white hover:from-accent-hover hover:to-accent px-10 py-4 text-lg shadow-[0_8px_30px_rgba(200,158,98,0.4)] hover:shadow-[0_12px_40px_rgba(200,158,98,0.55)] transition-all duration-400 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">{hero.ctaPrimaryText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </Link>
            ) : (
              <a href={hero.ctaPrimaryLink} className="btn bg-gradient-to-r from-accent to-[#d4ad6e] text-white hover:from-accent-hover hover:to-accent px-10 py-4 text-lg shadow-[0_8px_30px_rgba(200,158,98,0.4)] hover:shadow-[0_12px_40px_rgba(200,158,98,0.55)] transition-all duration-400 group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">{hero.ctaPrimaryText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </a>
            )}

            {/* Secondary CTA — glass effect */}
            {hero.ctaSecondaryLink?.startsWith('/') ? (
              <Link to={hero.ctaSecondaryLink} className="btn border-2 border-white/30 text-white hover:bg-white/10 hover:border-accent/60 px-10 py-4 text-lg backdrop-blur-md transition-all duration-400 hover:shadow-[0_0_30px_rgba(200,158,98,0.15)]">
                {hero.ctaSecondaryText}
              </Link>
            ) : (
              <a href={hero.ctaSecondaryLink} className="btn border-2 border-white/30 text-white hover:bg-white/10 hover:border-accent/60 px-10 py-4 text-lg backdrop-blur-md transition-all duration-400 hover:shadow-[0_0_30px_rgba(200,158,98,0.15)]">
                {hero.ctaSecondaryText}
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom Decorative Wave Divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto block" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
