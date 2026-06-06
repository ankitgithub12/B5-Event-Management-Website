import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/team');
        // Filter only active mastermind members
        const activeMasterminds = response.data
          .filter((member) => member.type === 'mastermind' && member.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setTeam(activeMasterminds);
      } catch (err) {
        console.error('Failed to fetch team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

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
      {/* Background floating sparkles */}
      <div className="absolute top-10 left-[5%] text-accent/8 text-5xl select-none sparkle-float">✦</div>
      <div className="absolute bottom-10 right-[5%] text-accent/8 text-5xl select-none sparkle-float-delayed">✦</div>
      <div className="absolute top-1/2 right-[15%] text-accent/5 text-7xl select-none sparkle-float-slow">✦</div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            <span className="section-label-line" />
            THE TEAM
            <span className="section-label-line" />
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={40} className="text-accent animate-spin" />
            <p className="text-gray-400 font-medium text-sm">Meet the team is loading...</p>
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No team members registered yet.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member._id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(41,26,57,0.07)] border border-gray-100 hover:border-accent/25 hover:shadow-[0_25px_60px_rgba(200,158,98,0.18)] transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] sm:aspect-auto sm:h-64 lg:h-72 overflow-hidden">
                  <img
                    src={member.imageUrl || member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Social icons on hover — brand colors */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {member.instagramUrl && (
                      <a 
                        href={member.instagramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent transition-all duration-300 cursor-pointer hover:scale-110"
                      >
                        <FaInstagram size={16} />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a 
                        href={member.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white hover:bg-[#0077b5] hover:border-transparent transition-all duration-300 cursor-pointer hover:scale-110"
                      >
                        <FaLinkedin size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative">
                  {/* Gold accent line under image */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent/60 transition-all duration-500" />

                  {member.specialty && (
                    <span className="inline-block bg-gradient-to-r from-accent/12 to-accent/6 text-accent text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 rounded-full mb-3 w-fit border border-accent/15 shimmer-sweep">
                      {member.specialty}
                    </span>
                  )}
                  <h3 className="text-lg font-heading text-primary mb-0.5">{member.name}</h3>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{member.bio}</p>

                  {member.events && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent glow-pulse" />
                      <span className="text-xs font-bold text-primary">{member.events}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-full font-bold hover:from-accent hover:to-[#d4ad6e] hover:text-primary-dark transition-all duration-500 shadow-lg hover:shadow-[0_12px_35px_rgba(200,158,98,0.35)] hover:-translate-y-1 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Meet Our Event Crews
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default TeamSection;
