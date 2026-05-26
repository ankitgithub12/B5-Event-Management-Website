import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Camera, Music, Briefcase, CheckCircle, Star, ArrowRight, Heart, Sparkle, Cake, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { io } from 'socket.io-client';

const iconMap = {
  wedding: Heart,
  shoot: Camera,
  photography: Camera,
  engagement: Sparkle,
  proposal: Sparkle,
  corporate: Briefcase,
  gala: Briefcase,
  party: Cake,
  birthday: Cake,
  anniversary: Cake,
  small: Cake,
};

const getIcon = (title) => {
  const key = title.toLowerCase();
  for (const [pattern, icon] of Object.entries(iconMap)) {
    if (key.includes(pattern)) {
      const IconComponent = icon;
      return <IconComponent size={40} className="text-primary group-hover:text-white transition-colors duration-300" />;
    }
  }
  return <Sparkles size={40} className="text-primary group-hover:text-white transition-colors duration-300" />;
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedServices, setSelectedServices] = useState({
    'Exotic Floral & Decor': false,
    'Gourmet Catering & Bar': false,
    'Cinematic Photography': false,
    'Celebrity Entertainment': false,
    'Seamless Logistics': false
  });

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
    window.scrollTo(0, 0);
    fetchServices();

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('services_update', () => {
      fetchServices();
    });

    return () => socket.disconnect();
  }, []);

  const handleServiceToggle = (label) => {
    setSelectedServices(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const getCustomizingLink = () => {
    const active = Object.keys(selectedServices).filter(key => selectedServices[key]);
    if (active.length === 0) return '/contact';
    
    const servicesStr = active.join(', ');
    const message = `I would like to customize my event with: ${servicesStr}.`;
    
    const params = new URLSearchParams();
    params.append('eventType', 'Custom Event');
    params.append('message', message);
    
    return `/contact?${params.toString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        
        {/* Page Header */}
        <div className="container mx-auto px-4 max-w-7xl mb-20 text-center">
          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-[2px] uppercase mb-4">
            <span className="w-8 h-px bg-accent"></span>
            OUR SERVICES
            <span className="w-8 h-px bg-accent"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading text-primary mb-6">Our Services</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            From intimate gatherings to massive corporate galas, we provide complete event planning solutions tailored to your unique vision and budget.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="container mx-auto px-4 max-w-7xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 size={40} className="text-accent animate-spin" />
              <p className="text-gray-500 font-medium">Loading our services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <Sparkles className="mx-auto mb-4 text-gray-300" size={48} />
              <p className="text-gray-500 text-lg">No services configured yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <div key={service._id || index} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image Section */}
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={service.imageUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-medium text-lg flex items-center gap-2">
                        Starting from <span className="text-accent font-bold">{(service.priceRange || 'Contact').split(' – ')[0]}</span>
                      </span>
                    </div>
                    {service.priceRange && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-bold shadow-md">
                        {service.priceRange}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg absolute -top-8 left-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {getIcon(service.title)}
                    </div>
                    
                    <h3 className="text-2xl font-heading text-primary mb-3 mt-6">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {service.description}
                    </p>

                    <div className="space-y-4 mb-8 flex-grow">
                      {service.includes && service.includes.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3 flex items-center gap-2">
                            <CheckCircle size={14} className="text-accent" />
                            What's Included
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.includes.map((item, i) => (
                              <span key={i} className="text-[10px] md:text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {service.popularAddOn && (
                        <div className="bg-accent/5 p-4 rounded-xl border border-accent/10">
                          <h4 className="text-xs uppercase tracking-wider text-accent font-bold mb-1">Popular Add-on</h4>
                          <p className="text-primary font-medium text-sm">{service.popularAddOn}</p>
                        </div>
                      )}

                      {service.pastEvent && (
                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2 flex items-center gap-2">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            Past Event Example
                          </h4>
                          <p className="text-xs text-gray-600 italic font-medium border-l-2 border-accent pl-2 py-1">
                            "{service.pastEvent}"
                          </p>
                        </div>
                      )}
                    </div>

                    <Link to="/packages" className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-accent transition-colors duration-300 cursor-pointer">
                      Explore {service.title}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Service Selector */}
        <div className="container mx-auto px-4 max-w-7xl mt-32">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent font-bold text-xs tracking-[3px] uppercase mb-4 block">FLEXIBLE SOLUTIONS</span>
                <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6">Build Your Perfect Event</h2>
                <p className="text-gray-600 text-lg mb-10">Select the priorities that matter most to you, and we'll show you how we can tailor our expertise to match.</p>
                
                <div className="space-y-4">
                  {[
                    { label: 'Exotic Floral & Decor', icon: <Sparkles size={20} /> },
                    { label: 'Gourmet Catering & Bar', icon: <CheckCircle size={20} /> },
                    { label: 'Cinematic Photography', icon: <Camera size={20} /> },
                    { label: 'Celebrity Entertainment', icon: <Music size={20} /> },
                    { label: 'Seamless Logistics', icon: <Briefcase size={20} /> },
                  ].map((item, idx) => {
                    const isChecked = selectedServices[item.label];
                    return (
                      <label 
                        key={idx} 
                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                          isChecked 
                            ? 'border-accent bg-accent/5 shadow-md shadow-accent/5' 
                            : 'border-gray-100 hover:border-accent hover:bg-accent/5'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleServiceToggle(item.label)}
                          className="w-5 h-5 accent-accent" 
                        />
                        <span className={`font-bold flex items-center gap-2 transition-colors ${
                          isChecked ? 'text-accent' : 'text-primary group-hover:text-accent'
                        }`}>
                          {item.icon} {item.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="relative">
                <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl">
                  <h3 className="text-2xl font-heading mb-6">Bespoke Proposal</h3>
                  <p className="text-white/70 mb-8">Tell us your vision and our experts will craft a personalized quote within 24 hours.</p>
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span>Response Time</span>
                      <span className="text-accent font-bold">Fast-Track</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span>Customization</span>
                      <span className="text-accent font-bold">Unlimited</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-4">
                      <span>Consultation</span>
                      <span className="text-accent font-bold">Complimentary</span>
                    </div>
                  </div>
                  <Link to={getCustomizingLink()} className="w-full bg-accent text-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all">
                    Start Customizing <ArrowRight size={18} />
                  </Link>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 max-w-7xl mt-24">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-6 relative z-10">Need a Custom Solution?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg relative z-10">
              Every event is unique. If you don't see what you're looking for, our expert planners will design a bespoke package just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to="/contact" className="bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors cursor-pointer">Book Free Consultation</Link>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-colors cursor-pointer">Download Brochure</button>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
