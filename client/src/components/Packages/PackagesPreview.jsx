import React from 'react';
import { Check, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PackagesPreview = () => {
  const packages = [
    {
      name: 'Basic',
      price: '₹5–10 Lakhs',
      bestFor: 'Intimate weddings & birthdays',
      features: ['Basic Decor', 'Photography', 'Standard Sound System', 'Event Coordination'],
      popular: false,
    },
    {
      name: 'Medium',
      price: '₹15–20 Lakhs',
      bestFor: 'Engagement & family events',
      features: ['Premium Decor', 'Candid Photography', 'Professional Lighting', 'Hospitality Management', 'Catering Assistance'],
      popular: true,
    },
    {
      name: 'Premium',
      price: '₹25–30 Lakhs',
      bestFor: 'Grand weddings',
      features: ['Luxury Decor', 'Cinematic Videography', 'LED Stage Setup', 'Artist Management', 'Complete End-to-End Execution'],
      popular: false,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      {/* Subtle background accents */}
      <div className="absolute top-10 left-[5%] text-accent/6 text-7xl select-none sparkle-float">✦</div>
      <div className="absolute bottom-10 right-[5%] text-accent/6 text-6xl select-none sparkle-float-delayed">✦</div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            <span className="section-label-line"></span>
            MOST LOVED PACKAGES
            <span className="section-label-line"></span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl text-primary mb-4"
          >
            Trusted by 500+ families
          </motion.h2>
        </div>

        {/* Packages Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {packages.map((pkg, index) => {
            const isPopular = pkg.popular;
            return (
              <motion.div 
                key={index} 
                variants={cardVariants}
                whileHover={{ 
                  y: isPopular ? -12 : -8, 
                  scale: isPopular ? 1.03 : 1.01,
                  transition: { duration: 0.3 }
                }}
                className={`rounded-3xl p-10 transition-all duration-500 cursor-default relative overflow-hidden ${
                  isPopular 
                    ? 'bg-white border-2 border-accent shadow-[0_20px_60px_rgba(200,158,98,0.2)] scale-105 z-10' 
                    : 'bg-white border-2 border-gray-100 hover:border-accent/30 hover:shadow-[0_20px_50px_rgba(200,158,98,0.12)]'
                }`}
              >
                {/* Animated gradient border for popular card */}
                {isPopular && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-[#e8c88a] to-accent animate-gradient-shift" style={{ backgroundSize: '200% 100%' }} />
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
                  </>
                )}

                <div className="mb-8 relative z-10">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl text-primary font-heading font-bold mb-2">{pkg.name}</h3>
                    {isPopular && (
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-accent/15 to-accent/10 text-accent text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shimmer-sweep border border-accent/20">
                        <Crown size={12} /> Most Popular
                      </span>
                    )}
                  </div>
                  <div className={`text-3xl font-bold mb-4 ${isPopular ? 'text-gradient-gold' : 'text-accent'}`}>{pkg.price}</div>
                  <p className="text-sm text-gray-500 font-medium italic">Best for: {pkg.bestFor}</p>
                </div>

                <ul className="space-y-4 mb-10 relative z-10">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isPopular ? 'bg-accent/15 text-accent' : 'bg-accent/10 text-accent'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/packages" 
                  className={`btn w-full relative z-10 ${isPopular ? 'btn-primary' : 'btn-outline'}`}
                >
                  Learn More
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm italic">
            *Prices are indicative and may vary based on customization and guest count.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesPreview;
