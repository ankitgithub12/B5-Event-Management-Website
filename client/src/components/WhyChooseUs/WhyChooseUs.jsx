import { PiggyBank, Palette, Clock, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <PiggyBank size={32} className="text-accent" />,
      title: 'Budget Friendly',
      description: 'Premium experiences that fit your budget.',
    },
    {
      icon: <Palette size={32} className="text-accent" />,
      title: 'Creative Designs',
      description: 'Unique ideas tailored to your vision.',
    },
    {
      icon: <Clock size={32} className="text-accent" />,
      title: 'On-Time Execution',
      description: 'We value your time as much as you do.',
    },
    {
      icon: <Handshake size={32} className="text-accent" />,
      title: 'End-to-End Management',
      description: 'Relax, we take care of every little detail.',
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #241235 0%, #3B1E54 40%, #2a1540 70%, #1a0e2e 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 12s ease-in-out infinite'
    }}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white text-sm tracking-[3px] uppercase mb-12 font-semibold"
        >
          WHY CHOOSE US?
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-6 py-6 sm:py-0 text-center sm:text-left group cursor-default transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center shrink-0 bg-accent/5 group-hover:border-accent group-hover:bg-accent/15 group-hover:shadow-[0_0_25px_rgba(200,158,98,0.2)] transition-all duration-500 relative">
                {feature.icon}
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-md transition-all duration-500" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Animated floating sparkles */}
      <div className="absolute top-10 left-[10%] text-accent/15 text-4xl sparkle-float">✦</div>
      <div className="absolute bottom-10 right-[10%] text-accent/15 text-4xl sparkle-float-delayed">✦</div>
      <div className="absolute top-20 right-[30%] text-accent/8 text-2xl sparkle-float-slow">✦</div>
      <div className="absolute bottom-1/3 left-[25%] text-accent/6 text-3xl animate-twinkle-delayed">✦</div>
    </section>
  );
};

export default WhyChooseUs;
