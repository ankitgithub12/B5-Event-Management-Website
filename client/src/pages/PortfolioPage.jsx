import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
import { Loader2, ArrowRight } from 'lucide-react';
import SocialGrid from '../components/SocialGrid/SocialGrid';
import api from '../utils/api';
import { io } from 'socket.io-client';

const PortfolioPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  const setFilter = (newFilter) => {
    if (newFilter === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', newFilter);
    }
    setSearchParams(searchParams);
  };

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const { data } = await api.get('/portfolio');
      setProjects(data);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPortfolio();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('portfolio_update', () => {
      fetchPortfolio();
    });

    return () => socket.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'college', name: 'College' },
    { id: 'party', name: 'Parties' },
    { id: 'product', name: 'Product Launches' },
    { id: 'exhibition', name: 'Exhibitions' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO 
        title="Our Portfolio - Past Events & Work"
        description="View our extensive portfolio of past events, weddings, corporate galas, and parties. Discover how B5 EVENTORY brings visions to life."
        canonicalUrl="/portfolio"
      />
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
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-semibold cursor-pointer ${
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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={40} className="text-accent animate-spin" />
              <p className="text-gray-500 font-medium">Loading our portfolios...</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode='popLayout'>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/5] cursor-pointer shadow-xl"
                  >
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      loading="lazy"
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
          )}

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-24">
              <p className="text-2xl text-gray-400">No projects found in this category yet.</p>
            </div>
          )}

          {/* Signature Style - UNIQUE SECTION */}
          <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-accent font-bold text-xs tracking-[3px] uppercase mb-4 block">OUR PHILOSOPHY</span>
              <h2 className="text-4xl md:text-5xl font-heading text-primary mb-8">The <span className="font-body">B5</span> Signature</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We don't just plan events; we curate atmospheres. Our signature style blends <strong className="text-primary font-bold">timeless elegance</strong> with <strong className="text-primary font-bold">modern editorial precision</strong>. 
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="text-primary font-bold text-lg mb-2">Bespoke Design</h4>
                  <p className="text-gray-500 text-sm">Every element is custom-crafted to reflect your unique personality.</p>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-lg mb-2">Seamless Flow</h4>
                  <p className="text-gray-500 text-sm">We choreograph the event so every moment transitions perfectly.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              {projects[0]?.imageUrl && (
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src={projects[0].imageUrl} 
                    alt="B5 Signature Style" 
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-accent/20 rounded-full -z-10"></div>
            </div>
          </div>

          {/* Event Spotlight (Case Study) - UNIQUE SECTION */}
          <div className="mt-40">
            <div className="bg-gray-900 rounded-[4rem] overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 md:p-20 flex flex-col justify-center">
                  <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase self-start mb-6">EVENT SPOTLIGHT</span>
                  <h2 className="text-4xl md:text-5xl font-heading text-white mb-8">The Udaipur Heritage Gala</h2>
                  
                  <div className="space-y-8 mb-10">
                    <div>
                      <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-2">The Challenge</h4>
                      <p className="text-white/70 text-sm">Transforming a 400-year-old palace courtyard into a modern tech-integrated gala while preserving heritage integrity.</p>
                    </div>
                    <div>
                      <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-2">The Solution</h4>
                      <p className="text-white/70 text-sm">Custom 3D mapping on palace walls, invisible sound engineering, and a floating stage that didn't touch a single historic stone.</p>
                    </div>
                  </div>
                  
                  <Link to="/gallery" className="inline-block border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold transition-all self-start text-center">
                    View Full Gallery
                  </Link>
                </div>
                {projects[1]?.imageUrl && (
                  <div className="h-[400px] lg:h-auto">
                    <img 
                      src={projects[1].imageUrl} 
                      alt="Udaipur Gala Case Study" 
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="mt-32 text-center bg-accent/5 rounded-[3rem] p-12 border border-accent/20">
            <h2 className="text-3xl font-heading text-primary mb-6">Inspired by our work?</h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto">Let's collaborate to create your next unforgettable experience. Our team is ready to bring your vision to life.</p>
            <a href="/contact" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-accent transition-colors shadow-lg">Start Your Project</a>
          </div>
        </div>
      </main>

      <SocialGrid />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
