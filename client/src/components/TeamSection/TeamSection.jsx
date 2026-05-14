import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TeamSection = () => {
  const team = [
    {
      name: 'Aarav Sharma',
      role: 'Founder & Lead Planner',
      bio: '12+ years orchestrating weddings and corporate galas across Rajasthan. Passionate about storytelling through events.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      specialty: 'Weddings & Destination Events',
      events: '200+ events',
    },
    {
      name: 'Priya Malhotra',
      role: 'Creative Director',
      bio: 'Former set designer turned event decorator. She turns any space into an immersive world your guests won\'t forget.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      specialty: 'Décor & Theming',
      events: '150+ themes',
    },
    {
      name: 'Rohan Mehta',
      role: 'Corporate Events Head',
      bio: 'MBA graduate who manages large-scale corporate events, product launches, and conferences with military precision.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      specialty: 'Corporate & Galas',
      events: '80+ corporate shows',
    },
    {
      name: 'Sneha Joshi',
      role: 'Photography & Media Lead',
      bio: 'Award-winning cinematographer specialising in emotion-driven films. Every frame she captures tells a love story.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      specialty: 'Photography & Films',
      events: '300+ shoots',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background accent sparkles */}
      <div className="absolute top-10 left-[5%] text-accent/10 text-5xl select-none">✦</div>
      <div className="absolute bottom-10 right-[5%] text-accent/10 text-5xl select-none">✦</div>
      <div className="absolute top-1/2 right-[15%] text-accent/5 text-7xl select-none">✦</div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4"
          >
            <span className="w-8 h-px bg-accent" />
            THE TEAM
            <span className="w-8 h-px bg-accent" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl text-primary mb-4"
          >
            Meet the <span className="text-accent italic">masterminds</span> behind your event
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed"
          >
            A passionate team of creative planners, designers, and coordinators — united by one mission: making your event unforgettable.
          </motion.p>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(41,26,57,0.07)] border border-gray-100 hover:border-accent/30 hover:shadow-[0_20px_50px_rgba(200,158,98,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] sm:aspect-auto sm:h-64 lg:h-72 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Social icons on hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-colors duration-300 cursor-pointer">
                    <FaInstagram size={15} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-colors duration-300 cursor-pointer">
                    <FaLinkedin size={15} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block bg-accent/10 text-accent text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full mb-3 w-fit">
                  {member.specialty}
                </span>
                <h3 className="text-lg font-heading text-primary mb-0.5">{member.name}</h3>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow">{member.bio}</p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-bold text-primary">{member.events}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Full Hospitality Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link 
            to="/hospitality" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
          >
            Meet Our Event Crews
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default TeamSection;
