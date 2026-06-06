import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Sparkles, Sliders, ArrowRight } from 'lucide-react';

const FloatingGoldParticles = () => (
  <div className="particles-container">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="particle" />
    ))}
  </div>
);

const ContactForm = () => {
  return (
    <section id="contact-cta" className="py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, #1a0e2e 0%, #241235 30%, #3B1E54 60%, #2d1645 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 12s ease-in-out infinite'
    }}>
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      {/* Floating particles */}
      <FloatingGoldParticles />

      {/* Floating sparkles */}
      <div className="absolute top-16 left-[8%] text-accent/15 text-3xl sparkle-float">✦</div>
      <div className="absolute bottom-16 right-[12%] text-accent/12 text-4xl sparkle-float-delayed">✦</div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between">
          
          {/* Left Content */}
          <div className="lg:w-5/12 text-center lg:text-left text-white">
            <div className="inline-block relative mb-6">
              <span className="absolute -left-8 -top-8 text-4xl text-accent/25 sparkle-float">✦</span>
              <h2 className="text-4xl md:text-5xl font-heading mb-4 leading-tight">
                Let's Plan Your<br/>Next Event
              </h2>
              <span className="absolute -right-12 top-4 text-3xl text-accent/25 sparkle-float-delayed">✦</span>
            </div>
            
            <p className="text-white/70 mb-10 text-lg leading-relaxed">
              Your dream event is just a click away. Connect with our expert coordinators to craft an experience that is uniquely yours.
            </p>

            <div className="flex flex-col gap-6 items-center lg:items-start">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark group-hover:shadow-[0_0_20px_rgba(200,158,98,0.3)] transition-all duration-500">
                  <Phone size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Call Us</p>
                  <p className="font-semibold text-white">+91 9414644988</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark group-hover:shadow-[0_0_20px_rgba(200,158,98,0.3)] transition-all duration-500">
                  <Mail size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Email Us</p>
                  <p className="font-semibold text-white">B5eventory@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary-dark group-hover:shadow-[0_0_20px_rgba(200,158,98,0.3)] transition-all duration-500">
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
            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative border border-white/10">
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
              
              <h3 className="text-2xl font-heading text-white mb-2">Get Started</h3>
              <p className="text-white/55 text-sm mb-8">Choose how you'd like to begin planning your next unforgettable celebration.</p>

              <div className="space-y-4">
                
                {/* Option 1: Consultation */}
                <Link 
                  to="/contact" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:shadow-[0_0_25px_rgba(200,158,98,0.08)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <MessageSquare size={22} className="stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-base group-hover:text-accent transition-colors">
                      Book Free Consultation
                    </h4>
                    <p className="text-white/50 text-xs mt-0.5">
                      Chat with our planning experts to outline your custom layout, date, and ideas.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </Link>

                {/* Option 2: Custom Planner */}
                <Link 
                  to="/planner" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:shadow-[0_0_25px_rgba(200,158,98,0.08)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Sliders size={22} className="stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-base group-hover:text-accent transition-colors">
                      Customize Your Package
                    </h4>
                    <p className="text-white/50 text-xs mt-0.5">
                      Select specific vendor options and get an automated pricing quote instantly.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </Link>

                {/* Option 3: Standard Packages */}
                <Link 
                  to="/packages" 
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all duration-500 group hover:shadow-[0_0_25px_rgba(200,158,98,0.08)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Sparkles size={22} className="stroke-[1.5]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-white text-base group-hover:text-accent transition-colors">
                      Browse Curated Packages
                    </h4>
                    <p className="text-white/50 text-xs mt-0.5">
                      Explore our popular, pre-designed pricing plans for weddings and corporate galas.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
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
