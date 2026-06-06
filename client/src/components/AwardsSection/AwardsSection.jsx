import { motion } from 'framer-motion';
import { Trophy, Award, Star, Palette } from 'lucide-react';

const AwardsSection = () => {
  const awards = [
    {
      year: '2024',
      title: 'Best Wedding Planner',
      org: 'Rajasthan Tourism Awards',
      icon: Trophy
    },
    {
      year: '2023',
      title: 'Excellence in Corporate Events',
      org: 'Event Management Association',
      icon: Award
    },
    {
      year: '2023',
      title: 'Top 10 Emerging Planners',
      org: 'Luxury Living India',
      icon: Star
    },
    {
      year: '2022',
      title: 'Most Creative Decor',
      org: 'National Event Expo',
      icon: Palette
    }
  ];

  const publications = [
    'The Times of India', 'Vogue Weddings', 'YourStory', 'Economic Times', 'Hindustan Times'
  ];

  // Quadruple publications to ensure seamless infinite overflow loop on all screens
  const marqueePublications = [...publications, ...publications, ...publications, ...publications];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* As Seen In Strip - Infinite Marquee */}
        <div className="mb-24 relative">
          <p className="text-center text-gray-400 text-xs font-bold tracking-[3px] uppercase mb-10">AS SEEN IN</p>
          
          <div className="relative w-full overflow-hidden py-4">
            {/* Gradients on the side for depth */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
            
            <div className="flex w-max opacity-45 hover:opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex gap-16 md:gap-24 animate-marquee whitespace-nowrap">
                {marqueePublications.map((pub, i) => (
                  <span key={i} className="text-2xl md:text-3xl font-heading font-extrabold text-primary italic tracking-wide select-none">
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-gray-50 rounded-3xl p-8 text-center border border-gray-100 hover:border-accent/30 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-default"
            >
              <div className="flex justify-center mb-5 text-accent group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <award.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="text-accent font-bold text-xs tracking-wider mb-2">
                {award.year}
              </div>
              <h3 className="text-lg font-heading text-primary mb-2 leading-tight">
                {award.title}
              </h3>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-tighter">
                {award.org}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AwardsSection;
