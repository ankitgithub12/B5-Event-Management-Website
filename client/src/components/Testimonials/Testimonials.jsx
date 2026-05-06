import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "BE5 planned our daughter's wedding and my 50th birthday in the same year. Flawless both times.",
      name: "Meera Sharma",
      role: "Mother of Bride",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "The pre-wedding shoot was magical. Drone shots took our breath away.",
      name: "Anjali & Rohit",
      role: "Wedding",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "Corporate gala for 800 people? They nailed it. Zero stress for us.",
      name: "Vikram Mehta",
      role: "TechCorp",
      rating: 4,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
    }
  ];

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
    <section id="testimonials" className="py-24 bg-white">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ 
                delay: index * 0.1,
                y: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_rgba(41,26,57,0.06)] border border-gray-50 relative group hover:border-accent/30 transition-all duration-300 flex flex-col cursor-default"
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
                />
                <div>
                  <h4 className="font-bold text-primary text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
            
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

