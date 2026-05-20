import { Camera, Sparkle, Building2, Cake, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Wedding Planning',
      description: 'From roka to vidaai – we handle it all',
    },
    {
      icon: Camera,
      title: 'Pre-Wedding Shoot',
      description: 'Capture love before the big day',
    },
    {
      icon: Sparkle,
      title: 'Engagement Ceremony',
      description: 'Surprise proposals & intimate celebrations',
    },
    {
      icon: Building2,
      title: 'Corporate Events',
      description: 'Launches, galas, and team offsites',
    },
    {
      icon: Cake,
      title: 'Small Functions',
      description: 'Birthdays, anniversaries, and baby showers',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="services" className="py-24 bg-white relative">
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
            WHAT WE DO
            <span className="w-8 h-px bg-accent"></span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl text-primary mb-4"
          >
            End-to-end event solutions under one roof
          </motion.h2>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl p-8 text-center shadow-[0_10px_40px_rgba(41,26,57,0.06)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(200,158,98,0.15)] transition-all duration-300 group flex flex-col items-center cursor-default"
            >
              <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <service.icon size={28} className="text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl text-primary mb-3 font-heading font-semibold">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {service.description}
              </p>
              <div className="mt-auto">
                <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-accent tracking-widest uppercase group-hover:text-primary transition-colors duration-300">
                  Enquire Now <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;

