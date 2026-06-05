import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { io } from 'socket.io-client';

const Hero = () => {
  const [hero, setHero] = useState({
    leftImageUrl: '',
    rightImageUrl: '',
    badgeText: '✨ WE DESIGN. YOU CELEBRATE.',
    title: 'Where Every <br />Event Becomes a <span class="text-accent italic font-serif">Story</span>',
    subtitle: 'Weddings • Engagements • Birthdays • Anniversaries • Corporate Events',
    ctaPrimaryText: 'Start Planning',
    ctaPrimaryLink: '#contact',
    ctaSecondaryText: 'View Packages',
    ctaSecondaryLink: '/packages',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await api.get('/hero');
        if (data) {
          setHero(data);
        }
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
      }
    });

    return () => socket.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
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

  const imageContainerVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Top Gradient for navbar visibility */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-20 pointer-events-none"></div>

      {/* Split Background */}
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        {isLoading ? (
          // Skeleton shimmer while Cloudinary URLs are being fetched
          <>
            <div className="flex-1 relative overflow-hidden bg-primary/80 animate-pulse" />
            <div className="flex-1 relative overflow-hidden bg-primary/60 animate-pulse" />
          </>
        ) : (
          <>
            <motion.div 
              key={`left-${hero.leftImageUrl}`}
              variants={imageContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 relative group overflow-hidden"
            >
              {hero.leftImageUrl && (
                <img
                  src={hero.leftImageUrl}
                  alt="Left Celebration"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-primary/45 group-hover:bg-primary/30 transition-colors duration-500"></div>
            </motion.div>
            <motion.div 
              key={`right-${hero.rightImageUrl}`}
              variants={imageContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 relative group overflow-hidden"
            >
              {hero.rightImageUrl && (
                <img
                  src={hero.rightImageUrl}
                  alt="Right Celebration"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-primary/45 group-hover:bg-primary/30 transition-colors duration-500"></div>
            </motion.div>
          </>
        )}
      </div>

      {/* Content Overlay */}
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
            {hero.ctaPrimaryLink.startsWith('/') ? (
              <Link to={hero.ctaPrimaryLink} className="btn bg-accent text-white hover:bg-accent-hover px-10 py-4 text-lg shadow-gold transition-all duration-300 group">
                {hero.ctaPrimaryText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <a href={hero.ctaPrimaryLink} className="btn bg-accent text-white hover:bg-accent-hover px-10 py-4 text-lg shadow-gold transition-all duration-300 group">
                {hero.ctaPrimaryText} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {hero.ctaSecondaryLink.startsWith('/') ? (
              <Link to={hero.ctaSecondaryLink} className="btn border-2 border-white text-white hover:bg-white/10 hover:border-accent hover:text-white px-10 py-4 text-lg backdrop-blur-sm transition-all duration-300">
                {hero.ctaSecondaryText}
              </Link>
            ) : (
              <a href={hero.ctaSecondaryLink} className="btn border-2 border-white text-white hover:bg-white/10 hover:border-accent hover:text-white px-10 py-4 text-lg backdrop-blur-sm transition-all duration-300">
                {hero.ctaSecondaryText}
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient for smoothness */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
