import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Camera, Video, Music, Tent, Users, GraduationCap, Briefcase, PartyPopper, CheckCircle } from 'lucide-react';

const ServicesPage = () => {
  const mainServices = [
    {
      icon: <Users size={40} className="text-primary" />,
      title: 'Wedding Planning',
      description: 'End-to-end luxury wedding planning. We manage everything from venue selection to guest hospitality, ensuring your big day is flawless.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Camera size={40} className="text-primary" />,
      title: 'Pre-Wedding Shoot',
      description: 'Capture your love story in stunning locations. We offer concept styling, premium locations, and cinematic drone shoots.',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Tent size={40} className="text-primary" />,
      title: 'Engagement Ceremony',
      description: 'Intimate to grand engagement parties featuring beautiful floral decor, lighting, and perfect entertainment.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <Briefcase size={40} className="text-primary" />,
      title: 'Corporate Events',
      description: 'Professional conferences, product launches, and corporate galas executed with precision and brand alignment.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: <PartyPopper size={40} className="text-primary" />,
      title: 'Small Functions',
      description: 'Birthdays, anniversaries, and baby showers. We bring the same level of detail to your personal milestones.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8892bf30b5?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const preWeddingFeatures = [
    {
      level: 'Basic',
      features: ['Local City Locations', 'Standard Photography', 'Candid Shots', '1 Day Shoot', 'No Drone Coverage'],
      color: 'bg-gray-100'
    },
    {
      level: 'Medium',
      features: ['Premium Outstation Locations', 'Photography & Videography', 'Concept Styling', '2 Day Shoot', 'Basic Drone Shots'],
      color: 'bg-primary-light text-white',
      featured: true
    },
    {
      level: 'High',
      features: ['International/Destination Shoot', 'Cinematic Production Team', 'Makeup Artist Included', '3-4 Day Shoot', 'Advanced FPV Drone'],
      color: 'bg-gray-100'
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
            COMPREHENSIVE SOLUTIONS
            <span className="w-8 h-px bg-accent"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading text-primary mb-6">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From intimate gatherings to massive corporate galas, we provide complete event planning solutions tailored to your unique vision and budget.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 relative">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg absolute -top-8 right-8 text-primary group-hover:text-accent transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-heading text-primary mb-3 mt-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Wedding Focus Section */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading text-primary mb-4">Pre-Wedding Shoots</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Turn your love story into a cinematic masterpiece. Choose a tier that fits your dream aesthetic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {preWeddingFeatures.map((tier, index) => (
                <div 
                  key={index} 
                  className={`rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2 ${tier.color} ${tier.featured ? 'shadow-2xl scale-105 py-12' : 'shadow-lg border border-gray-200'}`}
                >
                  <h3 className={`text-3xl font-heading text-center mb-8 ${tier.featured ? 'text-accent' : 'text-primary'}`}>
                    {tier.level}
                  </h3>
                  <ul className="space-y-4">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle size={20} className={tier.featured ? 'text-accent' : 'text-primary/50'} />
                        <span className={tier.featured ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 text-center">
                    <a href="/packages" className={`btn w-full ${tier.featured ? 'btn-primary' : 'btn-outline'}`}>
                      View Pricing
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
