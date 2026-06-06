import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Sparkle, Building2, Cake, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { io } from 'socket.io-client';

const iconMap = {
  wedding: Heart,
  shoot: Camera,
  photography: Camera,
  engagement: Sparkle,
  proposal: Sparkle,
  corporate: Building2,
  gala: Building2,
  party: Cake,
  birthday: Cake,
  anniversary: Cake,
  small: Cake,
};

const getIcon = (title) => {
  const key = title.toLowerCase();
  for (const [pattern, icon] of Object.entries(iconMap)) {
    if (key.includes(pattern)) {
      return icon;
    }
  }
  return Sparkles;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services');
      const activeServices = data.filter(service => service.isActive);
      setServices(activeServices);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('services_update', () => {
      fetchServices();
    });

    return () => socket.disconnect();
  }, []);

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

  if (loading) {
    return (
      <div className="py-24 bg-white flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (services.length === 0) {
    return null; // hide section if no active services
  }

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-[5%] text-accent/8 text-6xl select-none sparkle-float">✦</div>
      <div className="absolute bottom-20 right-[8%] text-accent/8 text-5xl select-none sparkle-float-delayed">✦</div>
      <div className="absolute top-1/2 left-[90%] text-primary/5 text-8xl select-none sparkle-float-slow">✦</div>
      
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #3B1E54 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

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
            WHAT WE DO
            <span className="section-label-line"></span>
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
          {services.map((service, index) => {
            const Icon = getIcon(service.title);
            return (
              <motion.div
                key={service._id || index}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-3xl p-8 text-center shadow-[0_10px_40px_rgba(41,26,57,0.06)] border border-gray-100 hover:shadow-[0_25px_60px_rgba(200,158,98,0.18)] hover:border-accent/20 transition-all duration-500 group flex flex-col items-center cursor-default relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent-hover group-hover:shadow-[0_8px_25px_rgba(200,158,98,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={28} className="text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl text-primary mb-3 font-heading font-semibold line-clamp-1">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-3">
                    {service.description}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      to={`/contact?eventType=${encodeURIComponent(service.title)}&message=I want to enquire about the ${encodeURIComponent(service.title)} service.`} 
                      className="inline-flex items-center gap-2 text-xs font-bold text-accent tracking-widest uppercase group-hover:text-primary transition-colors duration-300 group/link"
                    >
                      Enquire Now <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
