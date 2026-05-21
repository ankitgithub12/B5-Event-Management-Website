import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Camera, Video, Music, Tent, Users, Briefcase, PartyPopper, CheckCircle, Check, ArrowRight, Heart, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const [selectedServices, setSelectedServices] = useState({
    'Exotic Floral & Decor': false,
    'Gourmet Catering & Bar': false,
    'Cinematic Photography': false,
    'Celebrity Entertainment': false,
    'Seamless Logistics': false
  });

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

  const mainServices = [
    {
      icon: <Heart size={40} className="text-primary" />,
      title: 'Wedding Planning',
      priceRange: '₹6L – ₹50L+',
      description: 'End-to-end wedding management – venue, decor, catering, guest coordination, and more.',
      includes: ['Venue booking', 'Catering', 'Decor', 'Makeup', 'Entertainment', 'Transport'],
      popularAddOn: 'Drone cinematography',
      ctaText: 'Explore Wedding',
      link: '/packages',
      pastEvent: 'Anjali & Rohit – Udaipur Wedding (Premium Package)',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Camera size={40} className="text-primary" />,
      title: 'Pre-Wedding Shoot',
      priceRange: '₹25k – ₹3L',
      description: 'Capture your love story before the big day. Local, destination, or cinematic.',
      includes: ['Photographer', 'HD photos', 'Drone (optional)', 'Album design'],
      popularAddOn: 'Behind-the-scenes reel',
      ctaText: 'Explore Pre-Wedding',
      link: '/packages',
      pastEvent: 'Neha & Vikram – Jaipur Pre-Wedding (Drone included)',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Sparkles size={40} className="text-primary" />,
      title: 'Engagement Ceremony',
      priceRange: '₹3L – ₹12L',
      description: 'Ring ceremonies, surprise proposals, and roka celebrations.',
      includes: ['Venue', 'Photography', 'Catering', 'Decor', 'Return gifts'],
      popularAddOn: 'Surprise proposal coordination',
      ctaText: 'Explore Engagement',
      link: '/packages',
      pastEvent: 'Priya & Karan – Surprise Rooftop Proposal',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Briefcase size={40} className="text-primary" />,
      title: 'Corporate Events',
      priceRange: '₹5L – ₹25L+',
      description: 'Product launches, annual galas, conferences, and team offsites.',
      includes: ['AV setup', 'Stage design', 'Catering', 'Guest management', 'Branding'],
      popularAddOn: 'Celebrity speaker booking',
      ctaText: 'Explore Corporate',
      link: '/packages',
      pastEvent: 'TechCorp Annual Gala – 800 guests',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <PartyPopper size={40} className="text-primary" />,
      title: 'Small Functions',
      priceRange: '₹1L – ₹8L',
      description: 'Birthdays, anniversaries, baby showers, and retirement parties.',
      includes: ['Theme decor', 'Cake', 'Photography', 'Return gifts', 'Entertainment'],
      popularAddOn: 'Themed Photo Booth',
      ctaText: 'Explore Small Functions',
      link: '/packages',
      pastEvents: [
        "Rohan's 1st Birthday – Jungle Theme (45 guests, ₹3.2L)",
        "Raj & Priya – 25th Ruby Anniversary (120 guests, ₹7.5L)",
        "Surprise 40th Birthday (70 guests, ₹4.5L)"
      ],
      image: 'https://media.istockphoto.com/id/583736396/photo/wedding-hall-or-other-function-facility-set-for-fine-dining.jpg?s=612x612&w=0&k=20&c=gPoRBCkB-wGxvb_BI1vUyjiVryaOjnHhB8RSS4EZmog='
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium text-lg flex items-center gap-2">
                      Starting from <span className="text-accent font-bold">{service.priceRange.split(' – ')[0]}</span>
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-primary font-bold shadow-md">
                    {service.priceRange}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg absolute -top-8 left-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-heading text-primary mb-3 mt-6">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-8 flex-grow">
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

                    <div className="bg-accent/5 p-4 rounded-xl border border-accent/10">
                      <h4 className="text-xs uppercase tracking-wider text-accent font-bold mb-1">Popular Add-on</h4>
                      <p className="text-primary font-medium text-sm">{service.popularAddOn}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2 flex items-center gap-2">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        Past Event Example
                      </h4>
                      {service.pastEvents ? (
                        <ul className="space-y-1">
                          {service.pastEvents.map((event, i) => (
                            <li key={i} className="text-xs text-gray-600 italic font-medium border-l-2 border-accent pl-2 py-1">
                              "{event}"
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-600 italic font-medium border-l-2 border-accent pl-2 py-1">
                          "{service.pastEvent}"
                        </p>
                      )}
                    </div>
                  </div>

                  <Link to={service.link} className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-accent transition-colors duration-300 cursor-pointer">
                    {service.ctaText}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Service Selector - UNIQUE SECTION */}
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


