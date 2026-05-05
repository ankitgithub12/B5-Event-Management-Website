import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    { id: 1, title: 'Grand Wedding Reception', category: 'wedding', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Tech Corporate Gala', category: 'corporate', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'College Cultural Fest', category: 'college', image: 'https://i.pinimg.com/1200x/0f/e9/84/0fe984a1e10c7394f44b6b396cea17a5.jpg' },
    { id: 4, title: 'Luxury Birthday Bash', category: 'party', image: 'https://i.pinimg.com/1200x/9d/5b/e4/9d5be4eb8bea1c525e7a1868ef731a95.jpg' },
    { id: 5, title: 'Smartphone Launch Event', category: 'product', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Elegant Engagement', category: 'wedding', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80' },
    { id: 7, title: 'Annual Sports Meet', category: 'college', image: 'https://images.unsplash.com/photo-1502945015378-0e284ca1c5be?auto=format&fit=crop&w=800&q=80' },
    { id: 8, title: 'Startup Networking Night', category: 'corporate', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80' },
    { id: 9, title: 'Theme Anniversary Party', category: 'party', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80' },
  ];

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'college', name: 'College' },
    { id: 'party', name: 'Parties' },
    { id: 'product', name: 'Product Launches' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-heading text-primary mb-6">Our Portfolio</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A showcase of unforgettable experiences we've crafted for our clients. 
                From intimate gatherings to large-scale productions.
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-semibold ${
                  filter === cat.id 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/5] cursor-pointer shadow-xl"
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {project.category}
                    </span>
                    <h3 className="text-white text-2xl font-heading font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {project.title}
                    </h3>
                    <div className="w-12 h-1 bg-accent mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-300"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-2xl text-gray-400">No projects found in this category yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
