import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Sparkles, Sliders, ArrowRight } from 'lucide-react';

const ContactForm = () => {
  return (
    <section id="contact-cta" className="py-24 bg-primary-dark relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between">
          
          {/* Left Content */}
          <div className="lg:w-5/12 text-center lg:text-left text-white">
            <div className="inline-block relative mb-6">
              <span className="absolute -left-8 -top-8 text-4xl text-accent/30">✦</span>
              <h2 className="text-4xl md:text-5xl font-heading mb-4 leading-tight">
                Let's Plan Your<br/>Next Event
              </h2>
              <span className="absolute -right-12 top-4 text-3xl text-accent/30">✦</span>
            </div>
            
            <p className="text-white/75 mb-10 text-lg leading-relaxed">
              Your dream event is just a click away. Connect with our expert coordinators to craft an experience that is uniquely yours.
            </p>

            <div className="flex flex-col gap-6 items-center lg:items-start">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                  <Phone size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Call Us</p>
                  <p className="font-semibold text-white">+91 9414644988</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                  <Mail size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Email Us</p>
                  <p className="font-semibold text-white">B5eventory@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark transition-all duration-300">
                  <MapPin size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Visit Us</p>
                  <p className="font-semibold text-white">Jaipur, Rajasthan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Menu */}
          <div className="lg:w-6/12 w-full">
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-2xl relative">
              <span className="absolute -right-6 top-1/2 text-4xl text-accent/20 hidden lg:block">✦</span>
              
              <h3 className="text-2xl font-heading text-white mb-2">Get Started</h3>
              <p className="text-white/60 text-sm mb-8">Choose how you'd like to begin planning your next unforgettable celebration.</p>

              <div className="space-y-4">
                
                {/* Option 1: Consultation */}
                <Link 
                  to="/contact" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent">
                    <MessageSquare size={22} className="stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-base group-hover:text-accent transition-colors">
                      Book Free Consultation
                    </h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      Chat with our planning experts to outline your custom layout, date, and ideas.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>

                {/* Option 2: Custom Planner */}
                <Link 
                  to="/planner" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent">
                    <Sliders size={22} className="stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-base group-hover:text-accent transition-colors">
                      Customize Your Package
                    </h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      Select specific vendor options and get an automated pricing quote instantly.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>

                {/* Option 3: Standard Packages */}
                <Link 
                  to="/packages" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent">
                    <Sparkles size={22} className="stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-base group-hover:text-accent transition-colors">
                      Browse Curated Packages
                    </h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      Explore our popular, pre-designed pricing plans for weddings and corporate galas.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
