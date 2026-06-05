import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/testimonials`);
      setTestimonials(response.data);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('testimonial_update', () => {
      fetchTestimonials();
    });

    return () => socket.disconnect();
  }, []);

  if (loading || testimonials.length === 0) {
    return null;
  }

  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const starVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4"
          >
            <span className="w-8 h-px bg-accent"></span>
            LOVE NOTES
            <span className="w-8 h-px bg-accent"></span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl text-primary mb-4"
          >
            What our families say
          </motion.h2>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative mt-8">
        {/* Fading Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none hidden md:block"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none hidden md:block"></div>

        <div className="flex overflow-hidden">
          <div
            className={`flex gap-8 py-8 px-4 animate-marquee ${isPaused ? 'pause-marquee' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ width: "fit-content" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[450px] flex-shrink-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="bg-white h-full rounded-3xl p-10 shadow-[0_10px_40px_rgba(41,26,57,0.06)] border border-gray-50 relative group hover:border-accent/30 transition-all duration-300 flex flex-col cursor-default"
                >
                  <div className="text-6xl text-accent/10 font-heading leading-none absolute top-6 left-6 group-hover:text-accent/20 transition-colors">"</div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex mb-4 gap-1"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        variants={starVariants}
                        whileHover={{
                          scale: 1.3,
                          rotate: 15,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Star
                          size={14}
                          className={`${i < testimonial.rating ? 'fill-accent text-accent' : 'text-gray-300'}`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  <p className="text-gray-600 mb-8 relative z-10 pt-2 italic leading-relaxed">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-primary text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

