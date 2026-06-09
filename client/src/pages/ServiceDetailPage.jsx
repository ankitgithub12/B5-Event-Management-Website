import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
import { CheckCircle, ArrowLeft, ArrowRight, Sparkles, Loader2, Calendar, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';

const slideVariants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.5, ease: "easeInOut" } }
};

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchServiceDetail = async () => {
      try {
        const { data } = await api.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError(err.response?.data?.message || 'Failed to load service details.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]);

  const slides = service?.images && service.images.length > 0 
    ? service.images 
    : [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'
      ];

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page, slides.length]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFCFB]">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-20 gap-3 pt-32">
          <Loader2 size={48} className="text-accent animate-spin" />
          <p className="text-gray-500 font-medium text-lg tracking-wide">Assembling details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFCFB]">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 max-w-3xl py-20 pt-32 text-center">
          <div className="bg-white rounded-[2rem] p-12 border border-gray-100 shadow-xl">
            <Sparkles className="mx-auto mb-4 text-accent animate-bounce" size={48} />
            <h2 className="text-3xl font-heading text-primary mb-4">Service Unreachable</h2>
            <p className="text-gray-600 mb-8">{error || 'This service not found or is currently inactive.'}</p>
            <Link to="/services" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors shadow-md">
              <ArrowLeft size={18} /> Back to Services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getBookingLink = () => {
    const params = new URLSearchParams();
    params.append('eventType', service.title);
    params.append('message', `I am interested in booking the "${service.title}" service.`);
    return `/contact?${params.toString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFB]">
      <SEO 
        title={`${service.title} - Luxury Event Planning | B5 Eventory`}
        description={service.description}
        canonicalUrl={`/services/${id}`}
      />
      <Navbar />

      <main className="flex-grow pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb / Back Link */}
          <Link to="/services" className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors mb-8 group text-sm md:text-base">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Back to Services Catalog
          </Link>
          
          {/* Main Showcase Card */}
          <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(41,26,57,0.06)] border border-gray-100/80 grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
            
            {/* Left Column: Premium Slideshow */}
            <div className="lg:col-span-6 h-80 sm:h-[450px] lg:h-auto min-h-[380px] lg:min-h-[600px] relative overflow-hidden bg-primary/[0.02] group">
              
              {/* Slideshow image container */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={page}
                    src={slides[slideIndex]}
                    alt={`${service.title} Showcase Slide ${slideIndex + 1}`}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Luxury dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent pointer-events-none" />

              {/* Price Indicator (Clean, No Dollar Sign) */}
              {service.priceRange && (
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full text-primary font-bold shadow-lg border border-accent/20 flex items-center gap-2 z-10 transition-transform hover:scale-105">
                  <Sparkles size={16} className="text-accent animate-pulse" />
                  <span className="text-sm font-semibold tracking-wide">Est. Price: {service.priceRange}</span>
                </div>
              )}

              {/* Left Arrow Button */}
              {slides.length > 1 && (
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 active:bg-white/50 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20 transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shadow-md cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Right Arrow Button */}
              {slides.length > 1 && (
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 active:bg-white/50 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20 transition-all hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 shadow-md cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Navigation Indicators */}
              {slides.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPage([idx, idx > slideIndex ? 1 : -1])}
                      className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === slideIndex ? 'bg-accent scale-125 shadow-md shadow-accent/50' : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information & CTAs */}
            <div className="lg:col-span-6 p-8 md:p-14 lg:p-16 flex flex-col justify-between bg-white relative">
              <div>
                <div className="flex items-center gap-2 text-accent font-semibold text-xs tracking-[3px] uppercase mb-4">
                  <span className="w-8 h-px bg-accent"></span>
                  Signature Service
                </div>
                <h1 className="text-3xl md:text-5xl font-heading text-primary mb-6 leading-tight font-bold">
                  {service.title}
                </h1>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 italic">
                  "{service.description}"
                </p>

                {/* Inclusions Grid */}
                {service.includes && service.includes.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-xs uppercase tracking-widest text-primary/70 font-bold mb-4 flex items-center gap-2.5">
                      <CheckCircle size={16} className="text-accent" />
                      What's Included in this Experience
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50/50 hover:bg-gray-50 p-4 rounded-xl border border-gray-100/60 shadow-sm transition-all hover:translate-x-0.5">
                          <CheckCircle size={16} className="text-accent shrink-0" />
                          <span className="text-sm font-semibold text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Add-on Highlight Box */}
                {service.popularAddOn && (
                  <div className="bg-accent/[0.04] p-5 rounded-2xl border border-accent/15 mb-10 flex items-start gap-4 shadow-sm shadow-accent/5 transition-colors hover:bg-accent/[0.06]">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent shrink-0">
                      <Gift size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-accent font-black mb-1">Recommended Signature Add-on</h4>
                      <p className="text-primary font-bold text-sm md:text-base">{service.popularAddOn}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Call-to-actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link 
                  to={getBookingLink()} 
                  className="flex-grow bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-accent/20 active:scale-[0.98] cursor-pointer text-center text-base"
                >
                  <Calendar size={18} />
                  Book This Service
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/planner" 
                  className="sm:w-auto px-8 bg-white border border-gray-200 text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer text-center text-base"
                >
                  Custom Planner
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic CTA Banner */}
        <div className="container mx-auto px-4 max-w-7xl mt-20 md:mt-28">
          <div className="bg-primary rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-6 relative z-10 font-bold">Need a fully bespoke proposal?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg relative z-10">
              Our master planners will tailor the {service.title} service to match your guest size, style theme, and destination perfectly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to={getBookingLink()} className="bg-accent text-primary px-12 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors cursor-pointer text-center shadow-lg">Start Planning Now</Link>
              <Link to="/services" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-4 rounded-full font-bold text-lg transition-colors cursor-pointer text-center">Explore Other Offerings</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetailPage;
